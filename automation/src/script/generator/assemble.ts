/**
 * Turns a generator's raw output into a validated script + editorial package.
 *
 * Every generator funnels through here, so the grounding check, the duration
 * fit and the package shape are identical no matter who wrote the words.
 */
import crypto from "node:crypto";
import type { Scene, VideoScript } from "../../types";
import { ctaLine, timing } from "../../config";
import { formatSpec } from "../../formats";
import { generatedAssets } from "../../render/ffmpeg";
import { sentences } from "../build";
import {
  describeKind,
  evidenceKeysOf,
  isBacked,
  numericMentions,
} from "../numeric";
import type {
  Claim,
  EditorialPackage,
  GenerationOutcome,
  GenerationRequest,
  TokenUsage,
} from "./types";

/** The raw shape a generator produces, before it becomes a script. */
export interface RawScript {
  hook: string;
  beats: string[];
  conclusion: string;
  claims: Claim[];
}

function words(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Spoken seconds for a block of narration at the configured rate. */
export function spokenSeconds(text: string, wordsPerMinute: number): number {
  return (words(text) / wordsPerMinute) * 60;
}

/**
 * Total screen time, narration plus the padding the renderer adds around each
 * scene. This has to match `render/ffmpeg.ts`, which builds the real track.
 */
export function estimateClipSeconds(scenes: Scene[], wordsPerMinute: number): number {
  return scenes.reduce(
    (total, scene) =>
      total + scene.padBeforeSec + spokenSeconds(scene.narration, wordsPerMinute) + scene.padAfterSec,
    0,
  );
}

/** Stable fingerprint of what the clip actually says, for semantic dedup. */
export function fingerprintNarration(scenes: Scene[]): string {
  const spoken = scenes
    .map((s) => s.narration)
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return crypto.createHash("sha256").update(spoken).digest("hex").slice(0, 16);
}

/** Normalises a sentence for substring comparison against the evidence. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Digits a claim asserts — the part that can never be invented. */
export function numericTokens(text: string): string[] {
  return (text.match(/\d+(?:[.,:\-–]\d+)*/g) ?? []).map((t) => t.replace(/[.,]$/, ""));
}

export interface GroundingProblem {
  claim: string;
  problem: string;
}

/**
 * Checks the claims against the evidence.
 *
 * One rule carries the weight: **every number a claim states must appear in
 * the evidence playing the same role.** Not the same digits — the same role.
 * `#8` in the source backs "el #8"; it does not back "ganaron por 8 puntos",
 * because a league position is not a winning margin.
 *
 * That single rule replaced an earlier pair that failed in both directions: a
 * blanket "an inference may not state figures", which rejected "Estar en el
 * Top 10 cambia el peso de cada partido" over a denomination the evidence had
 * already established; and a digit-string lookup, which accepted a fabricated
 * margin because the digit happened to occur elsewhere.
 *
 * Wording is deliberately not matched verbatim — rewriting is the generator's
 * job. Numbers are where invention shows up.
 */
export function checkGrounding(claims: Claim[], request: GenerationRequest): GroundingProblem[] {
  const problems: GroundingProblem[] = [];
  const evidenceTexts = request.evidence.map((e) => e.text);
  const allEvidence = normalize(evidenceTexts.join(" "));
  const evidenceKeys = evidenceKeysOf(evidenceTexts);

  for (const claim of claims) {
    for (const mention of numericMentions(claim.text)) {
      if (isBacked(mention, evidenceKeys, claim.kind)) continue;
      problems.push({
        claim: claim.text,
        problem:
          `"${mention.raw}" is used as ${describeKind(mention)}, which the evidence does not state` +
          ` (in "${mention.context}")`,
      });
    }

    if (claim.kind === "verified" && claim.evidenceIndices.length === 0) {
      problems.push({ claim: claim.text, problem: "a verified claim must cite evidence" });
    }

    for (const i of claim.evidenceIndices) {
      if (!request.evidence.some((e) => e.index === i)) {
        problems.push({ claim: claim.text, problem: `cites evidence [${i}], which does not exist` });
      }
    }

    // A verified claim should overlap the evidence lexically; a complete
    // mismatch means it is describing something that is not there.
    if (claim.kind === "verified") {
      const claimWords = normalize(claim.text).split(" ").filter((w) => w.length > 4);
      const overlap = claimWords.filter((w) => allEvidence.includes(w)).length;
      if (claimWords.length >= 3 && overlap / claimWords.length < 0.3) {
        problems.push({
          claim: claim.text,
          problem: "verified claim has almost no wording in common with the evidence",
        });
      }
    }
  }

  return problems;
}

/** Builds the scene list the renderer consumes. */
export function toScenes(raw: RawScript): Scene[] {
  const beats = raw.beats.map((b) => b.trim()).filter(Boolean);
  return [
    {
      id: "hook",
      kind: "hook",
      narration: raw.hook.trim(),
      caption: raw.hook.trim(),
      padBeforeSec: timing.leadInSec,
      padAfterSec: timing.hookHoldSec,
    },
    ...beats.map((narration, i) => ({
      id: `beat-${i + 1}`,
      kind: "beat" as const,
      narration,
      caption: narration,
      beatIndex: i + 1,
      beatTotal: beats.length,
      padBeforeSec: 0,
      padAfterSec: timing.beatGapSec,
    })),
    {
      id: "outro",
      kind: "outro" as const,
      narration: `${raw.conclusion.trim().replace(/[.!?…]?$/, ".")} ${ctaLine}`,
      caption: `${raw.conclusion.trim().replace(/[.!?…]?$/, ".")} ${ctaLine}`,
      padBeforeSec: 0,
      padAfterSec: timing.outroHoldSec,
    },
  ];
}

/** Structural checks on the raw output, before it costs anything to render. */
export function validateRaw(raw: RawScript): string | undefined {
  if (!raw.hook?.trim()) return "no hook";
  if (!raw.conclusion?.trim()) return "no conclusion";
  if (!Array.isArray(raw.beats) || raw.beats.filter((b) => b?.trim()).length === 0) {
    return "no body beats";
  }
  if (!Array.isArray(raw.claims) || raw.claims.length === 0) return "no claims declared";
  if (/\?\s*$/.test(raw.conclusion.trim())) return "the conclusion is a question";
  const seen = new Set<string>();
  for (const beat of raw.beats) {
    const key = normalize(beat);
    if (key && seen.has(key)) return "two beats repeat the same sentence";
    seen.add(key);
  }
  return undefined;
}

export interface AssembleOptions {
  request: GenerationRequest;
  raw: RawScript;
  generator: string;
  model: string | null;
  promptVersion: string;
  usage: TokenUsage | null;
  /** ISO date stamped on the package; injected so tests stay deterministic. */
  now: string;
}

/**
 * Validates and assembles. Returns the same `GenerationOutcome` union every
 * generator returns, so adapters never invent their own failure shapes.
 */
export function assemble(options: AssembleOptions): GenerationOutcome {
  const { request, raw, generator, model, promptVersion, usage, now } = options;
  const { item } = request;

  const structural = validateRaw(raw);
  if (structural) {
    return { ok: false, reason: "malformed-output", detail: structural, usage: usage ?? undefined };
  }

  const grounding = checkGrounding(raw.claims, request);
  if (grounding.length > 0) {
    return {
      ok: false,
      reason: "ungrounded-claim",
      detail: grounding.map((g) => `${g.problem}: "${g.claim}"`).join("; "),
      usage: usage ?? undefined,
    };
  }

  const scenes = toScenes(raw);
  const estimated = estimateClipSeconds(scenes, request.wordsPerMinute);
  // Tolerance at the band edge: rejecting 19.99s while the message rounds it
  // to "20.0s" is both wrong and impossible to act on.
  const EDGE_TOLERANCE_SEC = 0.05;
  if (
    estimated < request.minDurationSec - EDGE_TOLERANCE_SEC ||
    estimated > request.maxDurationSec + EDGE_TOLERANCE_SEC
  ) {
    return {
      ok: false,
      reason: "duration-out-of-band",
      detail: `script estimates ${estimated.toFixed(1)}s, outside ${request.minDurationSec}-${request.maxDurationSec}s`,
      usage: usage ?? undefined,
    };
  }

  const spec = formatSpec(item.format);
  const script: VideoScript = {
    slug: item.slug,
    title: item.title,
    locale: "es",
    confidence: item.confidence,
    format: item.format,
    scenes,
    sources: item.sources,
    provenance: item.provenance,
    contentHash: item.contentHash,
    targetDurationSec: spec.targetDurationSec,
    omittedBeats: [],
  };

  const editorial: EditorialPackage = {
    slug: item.slug,
    format: item.format,
    script,
    sourcePath: item.provenance.briefingPath,
    sourceDate: item.provenance.briefingDate,
    generatedAt: now,
    confidence: item.confidence,
    claims: raw.claims,
    evidence: request.evidence,
    references: item.sources,
    mediaRights: generatedAssets().map((a) => ({
      path: a.path,
      license: a.license,
      rightsHolder: a.rightsHolder,
    })),
    generator,
    model,
    promptVersion,
    usage,
    scriptFingerprint: fingerprintNarration(scenes),
    eventKey: eventKeyFor(item.title, item.provenance.briefingDate),
  };

  return { ok: true, result: { script, editorial } };
}

/**
 * Identity of the underlying event, independent of how a headline words it.
 *
 * Two briefings describing the same game on the same day produce the same key,
 * so the ledger can refuse the second clip even when the slugs differ.
 */
export function eventKeyFor(title: string, date: string): string {
  const STOP = new Set([
    "el", "la", "los", "las", "de", "del", "que", "y", "en", "con", "por", "para",
    "una", "un", "es", "su", "al", "se", "mas", "pero", "como", "tras", "este",
    "esta", "sus", "ya", "no", "sin", "sobre", "entre", "a", "the", "of", "and",
    "to", "in", "is", "for", "with", "on", "at", "by", "from",
  ]);
  const tokens = normalize(title)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w))
    .sort();
  const unique = [...new Set(tokens)].slice(0, 8);
  const digest = crypto.createHash("sha256").update(unique.join(" ")).digest("hex").slice(0, 10);
  return `${date || "undated"}:${digest}`;
}

/** Builds the evidence list a generator may draw on. */
export function evidenceFor(item: GenerationRequest["item"]): import("./types").Evidence[] {
  const origin = `${item.provenance.briefingPath}:${item.provenance.line}`;
  const parts = [item.title, ...item.body].flatMap((block) => sentences(block));
  return parts.map((text, index) => ({ index, text, origin }));
}
