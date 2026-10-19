/**
 * The ScriptGenerator seam.
 *
 * A generator turns one `RadarItem` into a `VideoScript` plus the editorial
 * package that justifies it. The pipeline knows only this interface, so the
 * deterministic template writer, the Claude adapter and the test mock are
 * interchangeable and none of them can reach into the pipeline's internals.
 *
 * Nothing here touches the radar, `src/`, or `research/` — generators receive
 * material that has already been parsed and validated upstream.
 */
import type { ClipFormat, Confidence, RadarItem, RadarSource, VideoScript } from "../../types";

/** Why a generation attempt did not produce a usable script. */
export type RejectionReason =
  /** The source document has no narratable prose — a table or a stub. */
  | "insufficient-material"
  /** Not enough verifiable sources to carry a factual clip. */
  | "insufficient-sources"
  /** The model returned something that is not a valid script. */
  | "malformed-output"
  /** The script asserts something the source material does not support. */
  | "ungrounded-claim"
  /** The script could not be fitted into the format's duration band. */
  | "duration-out-of-band"
  /** The token/cost budget for this run was exhausted. */
  | "budget-exhausted"
  /** The provider did not answer within the timeout, after retries. */
  | "provider-timeout"
  /** The provider returned an error that retries did not clear. */
  | "provider-error"
  /** The provider's safety classifiers declined the request. */
  | "provider-refusal";

/** A generator's answer: either a script with its package, or a typed refusal. */
export type GenerationOutcome =
  | { ok: true; result: GenerationResult }
  | { ok: false; reason: RejectionReason; detail: string; usage?: TokenUsage };

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  /** Estimated list-price cost in USD, or null when the model has no price here. */
  estimatedCostUsd: number | null;
}

/**
 * One factual assertion the script makes, and what backs it.
 *
 * The distinction is the point of the whole package: a `verified` claim repeats
 * something the source document states, an `inference` is the generator's own
 * reading of it. Only `verified` claims may carry numbers, scores or dates.
 */
export interface Claim {
  text: string;
  kind: "verified" | "inference";
  /** Indices into the request's `evidence` array that support this claim. */
  evidenceIndices: number[];
}

/** A verbatim span of source material offered to the generator. */
export interface Evidence {
  /** Position in the request, referenced by `Claim.evidenceIndices`. */
  index: number;
  text: string;
  /** Where this sentence came from, for the audit trail. */
  origin: string;
}

/** Everything an editor needs to approve or reject a generated clip. */
export interface EditorialPackage {
  slug: string;
  format: ClipFormat;
  /** The script as narrated, scene by scene. */
  script: VideoScript;
  /** Repo-relative path of the briefing or research document. */
  sourcePath: string;
  /** `date`/`last_researched` of the source document. */
  sourceDate: string;
  /** When this package was generated (ISO date). */
  generatedAt: string;
  confidence: Confidence;
  /** Checkable assertions, split into verified and inferred. */
  claims: Claim[];
  /** The verbatim spans the claims point at. */
  evidence: Evidence[];
  references: RadarSource[];
  /** Licence posture of every asset the render will use. */
  mediaRights: { path: string; license: string; rightsHolder: string }[];
  /** Which generator and model produced this. */
  generator: string;
  model: string | null;
  promptVersion: string;
  usage: TokenUsage | null;
  /** Fingerprint of the narration, for semantic dedup. */
  scriptFingerprint: string;
  /** Stable identity of the underlying real-world event. */
  eventKey: string;
}

export interface GenerationResult {
  script: VideoScript;
  editorial: EditorialPackage;
}

/** What a generator is given. Pure data — no file handles, no network. */
export interface GenerationRequest {
  item: RadarItem;
  /** Verbatim source sentences the generator may draw on. */
  evidence: Evidence[];
  /** Target band in seconds, from the format spec. */
  minDurationSec: number;
  maxDurationSec: number;
  targetDurationSec: number;
  /** Words the narrator speaks per minute, for duration estimation. */
  wordsPerMinute: number;
}

/** Structured log line emitted by the generation layer. */
export interface GenerationLogEntry {
  at: string;
  generator: string;
  slug: string;
  event: string;
  [key: string]: unknown;
}

export type GenerationLogger = (entry: GenerationLogEntry) => void;

export interface ScriptGenerator {
  /** Stable identifier, recorded in the editorial package. */
  readonly id: string;
  /** Model identifier when one is involved, else null. */
  readonly model: string | null;
  /** False when the generator cannot run here (missing credentials, say). */
  available(): boolean;
  generate(request: GenerationRequest): Promise<GenerationOutcome>;
}
