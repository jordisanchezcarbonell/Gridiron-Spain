/**
 * The end-to-end pipeline: radar -> candidates -> script -> validation ->
 * MP4 -> ledger -> Buffer draft (never published).
 */
import fs from "node:fs";
import path from "node:path";
import type { ClipFormat, RadarItem, ValidationIssue, VideoScript } from "./types";
import { motion, paths, repoRoot, timing, video } from "./config";
import { listBriefings, readBriefing } from "./radar/parse";
import { readResearchDocs } from "./radar/research";
import { selectCandidates, type Selection } from "./radar/select";
import { narrationIsGrounded } from "./script/build";
import { createGenerator, DEFAULT_GENERATOR, type GeneratorId } from "./script/generator";
import { evidenceFor } from "./script/generator/assemble";
import type { EditorialPackage, GenerationRequest, ScriptGenerator } from "./script/generator/types";
import { Budget, jsonLogger, silentLogger } from "./script/generator/runtime";
import { evaluate, similarity, type EvaluationReport } from "./script/evaluate";
import { writePackage, writeRejection } from "./script/package";
import { attemptRepair, isRepairable } from "./script/repair";
import {
  readApproved,
  resolveApproved,
  withCurrentPacing,
  writeApproved,
} from "./script/approved";
import { findDuplicate, narrationOf } from "./script/dedupe";
import { formatSpec } from "./formats";
import { tts } from "./config";
import { loadLedger, recordEntry, saveLedger, type Ledger } from "./ledger";
import {
  report,
  validateBeforeRender,
  validateCueTiming,
  validateLegibility,
  validateOutput,
  type ValidationReport,
} from "./validate";
import { generatedAssets, render } from "./render/ffmpeg";
import { probeRender } from "./render/probe";
import type { TtsProvider } from "./tts";
import { buildDraft, writeDraft } from "./publish/buffer";

export interface GeneratorOptions {
  /** Which engine writes the scripts. Defaults to the template writer. */
  generator?: GeneratorId;
  /** Spend ceiling in USD for the whole run. */
  budgetUsd?: number;
  /** Per-generation wall clock. */
  timeoutMs?: number;
  /** Model override for provider-backed generators. */
  model?: string;
  /** Emit one JSON log line per generation step to stderr. */
  structuredLogs?: boolean;
  /** Fixed date for reproducible packages in tests. */
  now?: () => string;
  /** Parallel provider processes allowed (claude-cli). */
  concurrency?: number;
  /** Assistant-turn ceiling per generation (claude-cli). */
  maxTurns?: number;
  /**
   * Hard ceiling on provider calls per run.
   *
   * Without it the loop keeps generating until `limit` clips *succeed*, so a
   * run of eight candidates with `--limit=1` could make eight paid calls. The
   * cheap format gates do not count against this — only real provider calls do.
   */
  maxGenerations?: number;
  /** Directory for raw provider responses when parsing fails. */
  dumpTo?: string;
  /** Explicit `--max-budget-usd` forwarded to the CLI provider. */
  maxBudgetUsd?: number;
  /**
   * Allow one extra generation to rewrite a script the quality gate refused
   * for a wording problem. Off by default; costs a generation.
   */
  repair?: boolean;
}

export interface PipelineOptions extends GeneratorOptions {
  formats: ClipFormat[];
  limit: number;
  provider: TtsProvider;
  outDir?: string;
  ledgerPath?: string;
  /** Validate and report without rendering or touching the ledger. */
  dryRun?: boolean;
  /** Re-cut items whose content changed since they were produced. */
  allowUpdates?: boolean;
  /** Only consider radar items explicitly tagged for TikTok/Reels. */
  requireVideoTag?: boolean;
  /** Restrict news candidates to one briefing date. */
  briefingDate?: string;
  /** Word aligner for the subtitles. Defaults to the forced aligner. */
  aligner?: import("./align").AlignerId;
  /** Ignore the alignment cache and realign. */
  refreshAlignment?: boolean;
}

export interface ProducedClip {
  script: VideoScript;
  /** The editorial package backing this clip, when a generator produced one. */
  editorial?: EditorialPackage;
  /** Where the approved script was stored, so it can be rendered later. */
  approvedPath?: string;
  evaluation?: EvaluationReport;
  packagePath?: string;
  /** How the subtitle timings were obtained, for the run report. */
  alignment?: string;
  videoPath: string;
  srtPath: string;
  draftPath: string;
  durationSec: number;
  warnings: ValidationIssue[];
}

export interface RejectedClip {
  slug: string;
  title: string;
  format: ClipFormat;
  issues: ValidationIssue[];
}

export interface PipelineResult {
  scanned: { news: number; explainer: number };
  /** Which engine ran, and whether it had to fall back. */
  generator: { id: string; model: string | null; fellBackFrom?: GeneratorId; fallbackReason?: string };
  /** Token spend and cost, when the engine reports it. */
  spend: { inputTokens: number; outputTokens: number; spentUsd: number; limitUsd: number };
  /** Provider calls actually made, and the ceiling they were held to. */
  generations: { used: number; limit: number; stoppedAtLimit: boolean; repairs: number };
  selection: Selection;
  produced: ProducedClip[];
  rejected: RejectedClip[];
  dryRun: boolean;
}

/** Collects radar items for the requested formats. Read-only. */
export function collectItems(formats: ClipFormat[], briefingDate?: string): RadarItem[] {
  const items: RadarItem[] = [];
  if (formats.includes("news")) {
    for (const file of listBriefings()) {
      const briefing = readBriefing(file);
      if (briefingDate && briefing.date !== briefingDate) continue;
      items.push(
        ...briefing.items.map((item) => ({
          ...item,
          provenance: {
            ...item.provenance,
            briefingPath: path.relative(repoRoot, item.provenance.briefingPath),
          },
        })),
      );
    }
  }
  if (formats.includes("explainer")) items.push(...readResearchDocs());
  return items;
}

export async function runPipeline(options: PipelineOptions): Promise<PipelineResult> {
  const outDir = options.outDir ?? paths.outDir;
  const ledgerPath = options.ledgerPath ?? paths.ledger;
  let ledger: Ledger = loadLedger(ledgerPath);

  const items = collectItems(options.formats, options.briefingDate);
  const scanned = {
    news: items.filter((i) => i.format === "news").length,
    explainer: items.filter((i) => i.format === "explainer").length,
  };

  const selection = selectCandidates(items, ledger, {
    allowUpdates: options.allowUpdates,
    requireVideoTag: options.requireVideoTag,
  });

  const produced: ProducedClip[] = [];
  const rejected: RejectedClip[] = [];

  const budget = new Budget(options.budgetUsd ?? 5);
  const log = options.structuredLogs ? jsonLogger(true) : silentLogger;
  const { generator, fellBackFrom, fallbackReason } = createGenerator(options.generator ?? DEFAULT_GENERATOR, {
    budget,
    log,
    model: options.model,
    timeoutMs: options.timeoutMs,
    now: options.now,
    concurrency: options.concurrency,
    maxTurns: options.maxTurns,
    dumpTo: options.dumpTo,
    maxBudgetUsd: options.maxBudgetUsd,
  });
  if (fellBackFrom) {
    log({
      at: new Date().toISOString(),
      generator: generator.id,
      slug: "-",
      event: "generator.fallback",
      from: fellBackFrom,
      reason: fallbackReason,
    });
  }

  // A provider call is the unit that costs money or quota, so it is the unit
  // that gets budgeted — not the number of finished clips.
  const maxGenerations = Math.max(1, options.maxGenerations ?? options.limit * 2);
  let generationsUsed = 0;
  let repairsUsed = 0;
  let stoppedAtLimit = false;

  for (const candidate of selection.candidates) {
    if (produced.length >= options.limit) break;

    // Cheap gates first: they cost nothing, so a story the format cannot carry
    // must never consume a generation.
    const prefiltered = prefilter(candidate.item);
    if (prefiltered) {
      rejected.push({
        slug: candidate.item.slug,
        title: candidate.item.title,
        format: candidate.item.format,
        issues: [
          { rule: "generation", severity: "error", message: `[${prefiltered.reason}] ${prefiltered.detail}` },
        ],
      });
      continue;
    }

    if (generationsUsed >= maxGenerations) {
      stoppedAtLimit = true;
      log({
        at: new Date().toISOString(),
        generator: generator.id,
        slug: candidate.item.slug,
        event: "generations.limit-reached",
        used: generationsUsed,
        limit: maxGenerations,
      });
      break;
    }

    generationsUsed += 1;
    const generated = await generateFor(candidate.item, generator, log);
    if (!generated.ok) {
      rejected.push({
        slug: candidate.item.slug,
        title: candidate.item.title,
        format: candidate.item.format,
        issues: [{ rule: "generation", severity: "error", message: `[${generated.reason}] ${generated.detail}` }],
      });
      continue;
    }

    let { script, editorial } = generated.result;
    const pendingWarnings: ValidationIssue[] = [];

    // Editorial and linguistic quality, judged independently of whoever wrote
    // the words.
    let evaluation = evaluate(editorial, tts.rate);

    // One optional rewrite, when the findings are about wording rather than
    // about the material. It costs a generation and is revalidated in full.
    if (!evaluation.ok && options.repair && isRepairable(evaluation.findings)) {
      const repair = await attemptRepair({
        request: buildRequest(candidate.item),
        findings: evaluation.findings,
        generator,
        enabled: true,
        generationsRemaining: maxGenerations - generationsUsed,
      });
      if (repair.attempted) {
        generationsUsed += 1;
        repairsUsed += 1;
        log({
          at: new Date().toISOString(),
          generator: generator.id,
          slug: script.slug,
          event: "repair.attempted",
          ok: repair.outcome?.ok ?? false,
        });
        if (repair.outcome?.ok) {
          // Revalidate from scratch: the repaired script inherits nothing.
          const candidateEval = evaluate(repair.outcome.result.editorial, tts.rate);
          if (candidateEval.ok) {
            script = repair.outcome.result.script;
            editorial = repair.outcome.result.editorial;
            evaluation = candidateEval;
            pendingWarnings.push({
              rule: "quality",
              severity: "warning",
              message: "this script is a repaired second pass; read it before publishing",
            });
          }
        }
      }
    }

    if (!evaluation.ok) {
      // Keep what the model wrote, so a rejection can be diagnosed instead of
      // guessed at from a single log line.
      const rejectionFile = writeRejection(editorial, evaluation.findings, outDir);
      log({
        at: new Date().toISOString(),
        generator: generator.id,
        slug: script.slug,
        event: "quality.rejected",
        findings: evaluation.errors.length,
        saved: path.relative(repoRoot, rejectionFile),
      });
      rejected.push({
        slug: script.slug,
        title: script.title,
        format: script.format,
        issues: evaluation.errors.map((f) => ({
          rule: "quality" as const,
          severity: "error" as const,
          message: `[${f.dimension}] ${f.message}`,
        })),
      });
      continue;
    }
    for (const w of evaluation.warnings) {
      pendingWarnings.push({ rule: "quality", severity: "warning", message: `[${w.dimension}] ${w.message}` });
    }

    // Same event told twice, or the same script rewritten — neither is caught
    // by the slug gate.
    const duplicate = findDuplicate(ledger, {
      slug: script.slug,
      eventKey: editorial.eventKey,
      scriptFingerprint: editorial.scriptFingerprint,
      narration: narrationOf(script.scenes),
    });
    if (duplicate && !options.allowUpdates) {
      rejected.push({
        slug: script.slug,
        title: script.title,
        format: script.format,
        issues: [
          {
            rule: "duplicates",
            severity: "error",
            message:
              duplicate.kind === "same-event"
                ? `the same event was already published as "${duplicate.entry.slug}" on ${duplicate.entry.producedAt}`
                : `narration is ${(duplicate.score * 100).toFixed(0)}% similar to "${duplicate.entry.slug}"`,
          },
        ],
      });
      continue;
    }

    if (script.omittedBeats.length > 0) {
      // Coverage that the format could not fit must be visible in the run
      // report, never dropped quietly.
      pendingWarnings.push({
        rule: "duration",
        severity: "warning",
        message: `${script.omittedBeats.length} source sentence(s) did not fit the ${script.format} beat budget and were left out`,
      });
    }

    // Approval is the expensive moment, so it is the moment that is kept.
    // Written before the dry-run branch below: a plan run that proves a script
    // good used to discard it, forcing another paid generation to render it.
    const approvedFile = writeApproved(editorial, evaluation, outDir);
    log({
      at: new Date().toISOString(),
      generator: generator.id,
      slug: script.slug,
      event: "script.approved",
      saved: path.relative(repoRoot, approvedFile),
    });

    const assets = generatedAssets();
    const pre: ValidationReport = validateBeforeRender(script, ledger, assets);
    if (!pre.ok) {
      rejected.push({ slug: script.slug, title: script.title, format: script.format, issues: pre.errors });
      continue;
    }

    if (options.dryRun) {
      produced.push({
        script,
        editorial,
        evaluation,
        approvedPath: approvedFile,
        videoPath: "(dry run)",
        srtPath: "(dry run)",
        draftPath: "(dry run)",
        durationSec: 0,
        warnings: [...pre.warnings, ...pendingWarnings],
      });
      continue;
    }

    const outcome = await render({
      script,
      provider: options.provider,
      outDir,
      aligner: options.aligner,
      refreshAlignment: options.refreshAlignment,
    });
    // The opening and closing fades are legitimately dark, so they are excluded
    // from the blank-picture measurement.
    const probe = probeRender(outcome.videoPath, motion.openFadeSec, motion.closeFadeSec);
    const post = report([
      ...pre.warnings,
      ...pendingWarnings,
      ...validateOutput(script, probe),
      // The cards are what a viewer reads; the per-word cues behind them are
      // deliberately shorter than any reading floor.
      ...validateLegibility(outcome.cards),
      ...validateCueTiming(outcome.cards, timing.minCueSec),
      ...alignmentWarnings(outcome),
    ]);
    if (!post.ok) {
      // A clip that breaks the duration contract is not kept and not recorded,
      // so the next run can try again after the script is tightened.
      for (const file of [
        outcome.videoPath,
        outcome.srtPath,
        outcome.scriptPath,
        outcome.alignment.path,
      ]) {
        if (file && fs.existsSync(file)) fs.rmSync(file);
      }
      rejected.push({ slug: script.slug, title: script.title, format: script.format, issues: post.errors });
      continue;
    }

    const draft = buildDraft(script, outcome);
    const draftPath = writeDraft(draft, outDir, script.slug);

    const packageFile = writePackage(editorial, evaluation, outDir);

    ledger = recordEntry(ledger, {
      slug: script.slug,
      title: script.title,
      briefingDate: script.provenance.briefingDate,
      contentHash: script.contentHash,
      producedAt: options.now ? options.now() : new Date().toISOString().slice(0, 10),
      videoPath: path.relative(repoRoot, outcome.videoPath),
      format: script.format,
      eventKey: editorial.eventKey,
      scriptFingerprint: editorial.scriptFingerprint,
      narration: narrationOf(script.scenes),
      generator: generator.id,
    });
    saveLedger(ledger, ledgerPath);

    produced.push({
      script,
      editorial,
      evaluation,
      approvedPath: approvedFile,
      packagePath: packageFile,
      videoPath: outcome.videoPath,
      srtPath: outcome.srtPath,
      draftPath,
      durationSec: outcome.durationSec,
      alignment: outcome.alignment.summary,
      warnings: post.warnings,
    });
  }

  return {
    scanned,
    generator: { id: generator.id, model: generator.model, fellBackFrom, fallbackReason },
    spend: budget.totals(),
    generations: {
      used: generationsUsed,
      limit: maxGenerations,
      stoppedAtLimit,
      repairs: repairsUsed,
    },
    selection,
    produced,
    rejected,
    dryRun: options.dryRun === true,
  };
}

/**
 * Runs one item through the generator, after checking the format's own gates.
 *
 * A research document that is just a fact table has no narratable sentences,
 * and an under-sourced story cannot carry a factual clip; both are refused
 * here rather than paraphrased into something that looks finished.
 */
/** The request a generator is given for an item. Shared with the repair pass. */
export function buildRequest(item: import("./types").RadarItem): GenerationRequest {
  const spec = formatSpec(item.format);
  return {
    item,
    evidence: evidenceFor(item),
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
  };
}

export function prefilter(
  item: import("./types").RadarItem,
): { reason: string; detail: string } | undefined {
  const spec = formatSpec(item.format);
  const evidence = evidenceFor(item);

  if (evidence.length < spec.minEvidence) {
    return {
      reason: "insufficient-material",
      detail: `${evidence.length} narratable sentence(s); ${spec.label} needs ${spec.minEvidence}. A fact table is not a script.`,
    };
  }

  if (item.sources.length < spec.minSources) {
    return {
      reason: "insufficient-sources",
      detail: `${item.sources.length} source link(s); ${spec.label} needs ${spec.minSources} for corroboration`,
    };
  }

  return undefined;
}

async function generateFor(
  item: import("./types").RadarItem,
  generator: ScriptGenerator,
  log: ReturnType<typeof jsonLogger>,
): Promise<import("./script/generator/types").GenerationOutcome> {
  const spec = formatSpec(item.format);
  const evidence = evidenceFor(item);

  const request: GenerationRequest = {
    item,
    evidence,
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
  };

  log({
    at: new Date().toISOString(),
    generator: generator.id,
    slug: item.slug,
    event: "generate.start",
    format: item.format,
    evidence: evidence.length,
    sources: item.sources.length,
  });

  const outcome = await generator.generate(request);

  log({
    at: new Date().toISOString(),
    generator: generator.id,
    slug: item.slug,
    event: outcome.ok ? "generate.ok" : "generate.rejected",
    ...(outcome.ok ? {} : { reason: outcome.reason, detail: outcome.detail }),
  });

  // Independent of the generator's own checks: narration must trace back to
  // the radar item, whoever wrote it.
  if (outcome.ok && !narrationIsGroundedLoosely(outcome.result.script, item)) {
    return {
      ok: false,
      reason: "ungrounded-claim",
      detail: "narration could not be traced back to the source item",
    };
  }

  return outcome;
}

/**
 * The template writer copies sentences verbatim, so `narrationIsGrounded` fits
 * it exactly. A model rewrites, so verbatim matching would reject every good
 * script — here the test is that the clip is still *about* the source.
 */
function narrationIsGroundedLoosely(script: VideoScript, item: import("./types").RadarItem): boolean {
  if (narrationIsGrounded(script, item)) return true;
  const spoken = script.scenes
    .filter((s) => s.kind !== "outro")
    .map((s) => s.narration)
    .join(" ");
  return similarity(spoken, [item.title, ...item.body].join(" ")) >= 0.18;
}

/**
 * Turns the render's alignment state into validation output.
 *
 * A clip whose timings were apportioned rather than measured gets a warning
 * that says so in those words. It is a warning and not an error because such
 * a clip is still usable — it just has not earned the claim of word-accurate
 * subtitles, and the person publishing it should know which they have.
 */
function alignmentWarnings(outcome: {
  alignment: import("./render/ffmpeg").RenderOutcome["alignment"];
}): ValidationIssue[] {
  const { alignment } = outcome;
  if (!alignment.pendingReview) return [];
  return [{ rule: "legibility", severity: "warning", message: `PENDING REVIEW — ${alignment.pendingReview}` }];
}

/** Human-readable run report. */
export function formatReport(result: PipelineResult): string {
  const lines: string[] = [];
  lines.push(
    `Radar: ${result.scanned.news} news items, ${result.scanned.explainer} research items scanned.`,
  );
  lines.push(
    `Engine: ${result.generator.id}${result.generator.model ? ` (${result.generator.model})` : ""}` +
      (result.generator.fellBackFrom
        ? ` — fell back from ${result.generator.fellBackFrom}` +
          (result.generator.fallbackReason ? ` (${result.generator.fallbackReason})` : "")
        : ""),
  );
  lines.push(
    `Generations: ${result.generations.used} of ${result.generations.limit} allowed` +
      (result.generations.repairs > 0 ? ` (${result.generations.repairs} repair pass)` : "") +
      (result.generations.stoppedAtLimit ? " — STOPPED AT THE LIMIT" : ""),
  );
  if (result.spend.spentUsd > 0 || result.spend.inputTokens > 0) {
    lines.push(
      `Spend: ${result.spend.inputTokens} in / ${result.spend.outputTokens} out tokens · ` +
        `$${result.spend.spentUsd.toFixed(4)} of $${result.spend.limitUsd.toFixed(2)} budget`,
    );
  }
  lines.push(
    `Selected ${result.selection.candidates.length}, skipped ${result.selection.skipped.length}.`,
  );
  lines.push("");

  if (result.produced.length) {
    lines.push(result.dryRun ? "Would produce:" : "Produced:");
    for (const clip of result.produced) {
      lines.push(`  [${clip.script.format}] ${clip.script.slug}`);
      lines.push(`      ${clip.script.title}`);
      if (!result.dryRun) {
        lines.push(`      ${clip.durationSec.toFixed(1)}s  ${video.width}x${video.height}`);
        lines.push(`      video: ${path.relative(repoRoot, clip.videoPath)}`);
        lines.push(`      srt:   ${path.relative(repoRoot, clip.srtPath)}`);
        if (clip.alignment) lines.push(`      subtitles: ${clip.alignment}`);
        lines.push(`      draft: ${path.relative(repoRoot, clip.draftPath)} (not published)`);
      }
      lines.push(
        `      source: ${clip.script.provenance.briefingPath}:${clip.script.provenance.line} (${clip.script.confidence})`,
      );
      if (clip.editorial) {
        const verified = clip.editorial.claims.filter((c) => c.kind === "verified").length;
        const inferred = clip.editorial.claims.filter((c) => c.kind === "inference").length;
        lines.push(
          `      claims: ${verified} verified, ${inferred} inferred · refs ${clip.editorial.references.length} · prompt ${clip.editorial.promptVersion}`,
        );
        if (clip.evaluation) {
          lines.push(`      quality: ${clip.evaluation.score}/100`);
        }
        if (clip.packagePath) {
          lines.push(`      package: ${path.relative(repoRoot, clip.packagePath)}`);
        }
      }
      if (clip.approvedPath) {
        lines.push(`      approved: ${path.relative(repoRoot, clip.approvedPath)}`);
        if (result.dryRun) {
          lines.push(
            "               render it without another generation:" +
              ` npm run tiktok:render -- --from-approved=${clip.script.slug}`,
          );
        }
      }
      for (const w of clip.warnings) lines.push(`      warning [${w.rule}] ${w.message}`);
    }
    lines.push("");
  }

  if (result.rejected.length) {
    lines.push("Rejected:");
    for (const r of result.rejected) {
      lines.push(`  [${r.format}] ${r.slug}`);
      for (const i of r.issues) lines.push(`      [${i.rule}] ${i.message}`);
    }
    lines.push("");
  }

  const bySkipReason = new Map<string, number>();
  for (const s of result.selection.skipped) {
    bySkipReason.set(s.reason, (bySkipReason.get(s.reason) ?? 0) + 1);
  }
  if (bySkipReason.size) {
    lines.push("Skipped by reason:");
    for (const [reason, count] of [...bySkipReason].sort()) lines.push(`  ${reason}: ${count}`);
    lines.push("");
  }

  lines.push("Buffer publishing: DISABLED (drafts written to disk only).");
  return lines.join("\n");
}

/**
 * Renders a previously approved script, with **no provider involved**.
 *
 * The script is re-validated from scratch — the same gates in the same order —
 * because a file on disk can be edited and an approval is not a licence to
 * skip checks. What it skips is the radar, the selection and the generation.
 */
export interface RenderApprovedOptions {
  target: string;
  provider: TtsProvider;
  outDir?: string;
  ledgerPath?: string;
  /** Re-cut even when the ledger already carries this slug. */
  allowUpdates?: boolean;
  structuredLogs?: boolean;
  now?: () => string;
  /** Word aligner for the subtitles. Defaults to the forced aligner. */
  aligner?: import("./align").AlignerId;
  /** Ignore the alignment cache and realign. */
  refreshAlignment?: boolean;
}

export async function renderApproved(options: RenderApprovedOptions): Promise<PipelineResult> {
  const outDir = options.outDir ?? paths.outDir;
  const ledgerPath = options.ledgerPath ?? paths.ledger;
  const log = options.structuredLogs ? jsonLogger(true) : silentLogger;
  let ledger: Ledger = loadLedger(ledgerPath);

  const file = resolveApproved(options.target, outDir);
  // The words are replayed verbatim; the pacing follows today's config.
  const approved = withCurrentPacing(readApproved(file));
  const { editorial } = approved;
  const script = editorial.script;

  const emptyResult = (rejectedIssues: ValidationIssue[]): PipelineResult => ({
    scanned: { news: 0, explainer: 0 },
    generator: { id: "approved-replay", model: editorial.model },
    spend: { inputTokens: 0, outputTokens: 0, spentUsd: 0, limitUsd: 0 },
    generations: { used: 0, limit: 0, stoppedAtLimit: false, repairs: 0 },
    selection: { candidates: [], skipped: [] },
    produced: [],
    rejected: [
      { slug: script.slug, title: script.title, format: script.format, issues: rejectedIssues },
    ],
    dryRun: false,
  });

  log({
    at: new Date().toISOString(),
    generator: "approved-replay",
    slug: script.slug,
    event: "replay.start",
    from: path.relative(repoRoot, file),
    approvedAt: approved.approvedAt,
    originalGenerator: editorial.generator,
  });

  // Re-run the editorial gate against the stored evidence.
  const evaluation = evaluate(editorial, tts.rate);
  if (!evaluation.ok) {
    return emptyResult(
      evaluation.errors.map((f) => ({
        rule: "quality" as const,
        severity: "error" as const,
        message: `[${f.dimension}] ${f.message}`,
      })),
    );
  }

  const assets = generatedAssets();
  const pre = validateBeforeRender(script, ledger, assets);
  const blocking = options.allowUpdates
    ? pre.errors.filter((e) => e.rule !== "duplicates")
    : pre.errors;
  if (blocking.length > 0) return emptyResult(blocking);

  const outcome = await render({
    script,
    provider: options.provider,
    outDir,
    aligner: options.aligner,
    refreshAlignment: options.refreshAlignment,
  });
  const probe = probeRender(outcome.videoPath, motion.openFadeSec, motion.closeFadeSec);
  const post = report([
    ...pre.warnings,
    ...validateOutput(script, probe),
    ...validateLegibility(outcome.cards),
    ...validateCueTiming(outcome.cards, timing.minCueSec),
    ...alignmentWarnings(outcome),
  ]);

  if (!post.ok) {
    for (const f of [
      outcome.videoPath,
      outcome.srtPath,
      outcome.scriptPath,
      outcome.alignment.path,
    ]) {
      if (f && fs.existsSync(f)) fs.rmSync(f);
    }
    return emptyResult(post.errors);
  }

  const draftPath = writeDraft(buildDraft(script, outcome), outDir, script.slug);
  const packageFile = writePackage(editorial, evaluation, outDir);

  ledger = recordEntry(ledger, {
    slug: script.slug,
    title: script.title,
    briefingDate: script.provenance.briefingDate,
    contentHash: script.contentHash,
    producedAt: options.now ? options.now() : new Date().toISOString().slice(0, 10),
    videoPath: path.relative(repoRoot, outcome.videoPath),
    format: script.format,
    eventKey: editorial.eventKey,
    scriptFingerprint: editorial.scriptFingerprint,
    narration: narrationOf(script.scenes),
    generator: editorial.generator,
  });
  saveLedger(ledger, ledgerPath);

  return {
    scanned: { news: 0, explainer: 0 },
    generator: { id: `approved-replay (${editorial.generator})`, model: editorial.model },
    spend: { inputTokens: 0, outputTokens: 0, spentUsd: 0, limitUsd: 0 },
    generations: { used: 0, limit: 0, stoppedAtLimit: false, repairs: 0 },
    selection: { candidates: [], skipped: [] },
    produced: [
      {
        script,
        editorial,
        evaluation,
        approvedPath: file,
        packagePath: packageFile,
        videoPath: outcome.videoPath,
        srtPath: outcome.srtPath,
        draftPath,
        durationSec: outcome.durationSec,
        alignment: outcome.alignment.summary,
        warnings: post.warnings,
      },
    ],
    rejected: [],
    dryRun: false,
  };
}
