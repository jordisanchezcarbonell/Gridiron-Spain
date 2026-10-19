/**
 * Editorial and linguistic quality evaluation.
 *
 * Deliberately independent of generation: it sees a finished script and the
 * evidence, never the prompt or the model that produced it, so the same bar
 * applies to the template writer, the mock and the Claude adapter alike. A
 * generator cannot talk its way past its own grader.
 */
import type { VideoScript } from "../types";
import type { EditorialPackage } from "./generator/types";
import { checkGrounding, spokenSeconds } from "./generator/assemble";
import type { GenerationRequest } from "./generator/types";
import {
  describeKind,
  evidenceKeysOf,
  isBacked,
  mentionKey,
  numericMentions,
} from "./numeric";
import { sentences } from "./build";

export type EvaluationDimension = "editorial" | "language" | "structure" | "grounding";

export interface EvaluationFinding {
  dimension: EvaluationDimension;
  severity: "error" | "warning";
  message: string;
}

export interface EvaluationReport {
  findings: EvaluationFinding[];
  errors: EvaluationFinding[];
  warnings: EvaluationFinding[];
  /** 0-100. Starts at 100; each error costs 25, each warning 6. */
  score: number;
  ok: boolean;
}

/** Marketing filler and AI tells that should never reach a Primer Down clip. */
const BANNED_PHRASES = [
  "sin duda alguna",
  "en el mundo del deporte",
  "prepárate para",
  "no te lo pierdas",
  "dale like",
  "suscríbete",
  "sígueme",
  "en este vídeo",
  "como ya sabrás",
  "la verdad es que",
  "es importante destacar",
  "cabe destacar",
];

/** Research apparatus that means a desk note leaked into narration. */
const APPARATUS = /(https?:\/\/|\bUNKNOWN\b|\bCONFIRMED\b|\bREPORTED\b|\bRUMOR\b|\bsrc\/|\.ts\b|\.json\b)/;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contentWords(text: string): string[] {
  const STOP = new Set([
    "el", "la", "los", "las", "de", "del", "que", "y", "en", "con", "por", "para",
    "una", "un", "es", "su", "al", "se", "mas", "pero", "como", "tras", "este",
    "esta", "sus", "ya", "no", "sin", "sobre", "entre", "a", "lo", "le", "ha",
  ]);
  return normalize(text).split(" ").filter((w) => w.length > 3 && !STOP.has(w));
}

/** Jaccard overlap of content words — a cheap stand-in for semantic distance. */
export function similarity(a: string, b: string): number {
  const setA = new Set(contentWords(a));
  const setB = new Set(contentWords(b));
  if (setA.size === 0 || setB.size === 0) return 0;
  let shared = 0;
  for (const w of setA) if (setB.has(w)) shared += 1;
  return shared / (setA.size + setB.size - shared);
}

/** Structure: a clip must open, develop and land. */
function evaluateStructure(script: VideoScript, wordsPerMinute: number): EvaluationFinding[] {
  const out: EvaluationFinding[] = [];
  const hook = script.scenes.find((s) => s.kind === "hook");
  const beats = script.scenes.filter((s) => s.kind === "beat");
  const outro = script.scenes.find((s) => s.kind === "outro");

  if (!hook) out.push({ dimension: "structure", severity: "error", message: "the clip has no hook" });
  if (!outro) {
    out.push({ dimension: "structure", severity: "error", message: "the clip has no conclusion" });
  }
  if (beats.length === 0) {
    out.push({ dimension: "structure", severity: "error", message: "the clip has no body" });
  }

  if (hook) {
    const hookSec = spokenSeconds(hook.narration, wordsPerMinute);
    if (hookSec > 6) {
      out.push({
        dimension: "structure",
        severity: "warning",
        message: `the hook runs ${hookSec.toFixed(1)}s; a hook should land in under 6s`,
      });
    }
    if (sentences(hook.narration).length > 2) {
      out.push({
        dimension: "structure",
        severity: "warning",
        message: "the hook is more than two sentences",
      });
    }
  }

  // Beats must not restate each other.
  for (let i = 0; i < beats.length; i++) {
    for (let j = i + 1; j < beats.length; j++) {
      const overlap = similarity(beats[i].narration, beats[j].narration);
      if (overlap > 0.6) {
        out.push({
          dimension: "structure",
          severity: "error",
          message: `beats ${i + 1} and ${j + 1} say the same thing (${(overlap * 100).toFixed(0)}% overlap)`,
        });
      }
    }
  }

  return out;
}

/** Language: Spanish prose a narrator can actually say. */
function evaluateLanguage(script: VideoScript): EvaluationFinding[] {
  const out: EvaluationFinding[] = [];

  for (const scene of script.scenes) {
    const text = scene.narration;

    for (const phrase of BANNED_PHRASES) {
      if (normalize(text).includes(normalize(phrase))) {
        out.push({
          dimension: "language",
          severity: "error",
          message: `${scene.id} uses filler: "${phrase}"`,
        });
      }
    }

    if (APPARATUS.test(text)) {
      out.push({
        dimension: "language",
        severity: "error",
        message: `${scene.id} narrates research apparatus (a URL, a confidence marker or a file path)`,
      });
    }

    // A sentence that starts lower case is a fragment of a previous one.
    const first = text.trimStart().charAt(0);
    if (first && first === first.toLowerCase() && !/[0-9¿¡"«(]/.test(first)) {
      out.push({
        dimension: "language",
        severity: "error",
        message: `${scene.id} starts mid-sentence: "${text.slice(0, 40)}…"`,
      });
    }

    for (const sentence of sentences(text)) {
      const wordCount = sentence.split(/\s+/).filter(Boolean).length;
      if (wordCount > 32) {
        out.push({
          dimension: "language",
          severity: "warning",
          message: `${scene.id} has a ${wordCount}-word sentence; long sentences are hard to follow aloud`,
        });
      }
    }
  }

  return out;
}

/** Editorial: the clip has to be worth watching and traceable. */
function evaluateEditorial(pkg: EditorialPackage): EvaluationFinding[] {
  const out: EvaluationFinding[] = [];

  if (pkg.references.length === 0 && pkg.format === "news") {
    out.push({
      dimension: "editorial",
      severity: "error",
      message: "a news clip carries no reference link",
    });
  }

  const verified = pkg.claims.filter((c) => c.kind === "verified");
  if (verified.length === 0) {
    out.push({
      dimension: "editorial",
      severity: "error",
      message: "the clip states nothing verifiable",
    });
  }

  const inferences = pkg.claims.filter((c) => c.kind === "inference");
  if (pkg.claims.length > 0 && inferences.length / pkg.claims.length > 0.5) {
    out.push({
      dimension: "editorial",
      severity: "warning",
      message: `${inferences.length} of ${pkg.claims.length} claims are inference rather than sourced fact`,
    });
  }

  // The hook has to actually be about the story.
  const hook = pkg.script.scenes.find((s) => s.kind === "hook");
  if (hook && similarity(hook.narration, pkg.script.title) < 0.15) {
    out.push({
      dimension: "editorial",
      severity: "warning",
      message: "the hook has little in common with the source headline",
    });
  }

  return out;
}

/**
 * Grounding, re-checked against the package rather than the raw output.
 *
 * This runs **the same rule** as the generation-side check, on the same inputs
 * (the declared claims and the evidence), both of which the package carries.
 * Independence here means not trusting the generator's self-report — not
 * applying a different contract.
 *
 * It used to apply a *stricter* one: narration was judged with the claim kind
 * hard-coded to `inference`, so a roleless number inside a `verified` claim
 * passed generation and was then refused by this gate. A live run hit exactly
 * that and lost a clip to a disagreement between two of our own validators.
 *
 * On top of the shared rule it adds one check generation cannot make: every
 * number the narration speaks must be covered by a declared claim, so the
 * script cannot assert a figure that was never audited.
 */
function evaluateGrounding(pkg: EditorialPackage): EvaluationFinding[] {
  const out: EvaluationFinding[] = [];

  // 1. The shared contract, re-run rather than re-implemented.
  const request: GenerationRequest = {
    item: {
      slug: pkg.slug,
      title: pkg.script.title,
      body: [],
      confidence: pkg.confidence,
      taggedForVideo: true,
      sources: pkg.references,
      provenance: pkg.script.provenance,
      contentHash: pkg.script.contentHash,
      format: pkg.format,
    },
    evidence: pkg.evidence,
    minDurationSec: 0,
    maxDurationSec: Number.MAX_SAFE_INTEGER,
    targetDurationSec: 0,
    wordsPerMinute: 1,
  };

  for (const problem of checkGrounding(pkg.claims, request)) {
    out.push({
      dimension: "grounding",
      severity: "error",
      message: `claim "${problem.claim.slice(0, 48)}…": ${problem.problem}`,
    });
  }

  // 2. Narration may not state a figure the evidence does not support.
  //
  //    Generation only ever sees the declared claims, so a beat carrying a
  //    figure the model forgot to declare would reach the render unchecked.
  //    The test is whether the *evidence* supports it — a figure that is
  //    sourced is fine whether or not a claim happens to quote it, which is
  //    what keeps the hook (usually the headline, rarely declared) from
  //    failing for a bookkeeping reason rather than a factual one.
  const evidenceKeys = evidenceKeysOf(pkg.evidence.map((e) => e.text));
  const declared = evidenceKeysOf(pkg.claims.map((c) => c.text));

  for (const scene of pkg.script.scenes) {
    if (scene.kind === "outro") continue; // the CTA is fixed, fact-free text
    for (const mention of numericMentions(scene.narration)) {
      if (isBacked(mention, evidenceKeys, "verified")) continue;
      if (declared.has(mentionKey(mention))) continue;
      out.push({
        dimension: "grounding",
        severity: "error",
        message:
          `${scene.id} uses "${mention.raw}" as ${describeKind(mention)}, ` +
          "which the evidence does not state and no claim declares",
      });
    }
  }

  return out;
}

export function evaluate(pkg: EditorialPackage, wordsPerMinute: number): EvaluationReport {
  const findings = [
    ...evaluateStructure(pkg.script, wordsPerMinute),
    ...evaluateLanguage(pkg.script),
    ...evaluateEditorial(pkg),
    ...evaluateGrounding(pkg),
  ];

  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");
  const score = Math.max(0, 100 - errors.length * 25 - warnings.length * 6);

  return { findings, errors, warnings, score, ok: errors.length === 0 };
}
