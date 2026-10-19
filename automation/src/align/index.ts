/**
 * Aligner selection and the cached entry point.
 *
 * There is deliberately no estimating fallback here. Spreading a scene's
 * duration across its words is what this replaced, and dressing that up as an
 * alignment is the one outcome worth avoiding: when no aligner can run, the
 * caller is told so and the clip is flagged for review rather than shipped
 * with timings nobody measured.
 */
import type { AlignmentRequest, AlignmentResult, WordAligner } from "./types";
import { cacheKey, readCache, writeCache } from "./cache";
import { TorchaudioAligner } from "./torchaudio";

export type AlignerId = "torchaudio" | "none";

export function parseAlignerId(raw: string | undefined): AlignerId | undefined {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "torchaudio" || value === "mms" || value === "forced") return "torchaudio";
  if (value === "none" || value === "off") return "none";
  return undefined;
}

/** The aligner for an id, or undefined when alignment is switched off. */
export function createAligner(id: AlignerId): WordAligner | undefined {
  if (id === "none") return undefined;
  return new TorchaudioAligner();
}

export interface AlignOptions {
  request: AlignmentRequest;
  aligner?: WordAligner;
  /** Directory holding the alignment cache. */
  outDir: string;
  /** Skip the cache and realign. */
  refresh?: boolean;
}

export interface AlignOutcome {
  result?: AlignmentResult;
  /** Why there is no usable alignment, when there is none. */
  reason?: string;
  fromCache: boolean;
}

/**
 * Aligns, through the cache.
 *
 * A cached entry is keyed on the audio bytes, the words, the language and the
 * aligner version, so it can only be served when every input matches.
 */
export async function alignWords(options: AlignOptions): Promise<AlignOutcome> {
  const { request, aligner, outDir, refresh } = options;

  if (!aligner) {
    return { reason: "word alignment is switched off for this run", fromCache: false };
  }
  if (!aligner.available()) {
    return {
      reason:
        `the ${aligner.id} aligner is not installed. ` +
        "See automation/README.md for the one-time setup, or pass --aligner=none.",
      fromCache: false,
    };
  }

  const key = cacheKey(request.audioPath, request.words, request.language, aligner.version);
  if (!refresh) {
    const cached = readCache(outDir, key);
    if (cached) return { result: cached, fromCache: true };
  }

  const result = await aligner.align(request);
  // Only a usable alignment is cached: a failure is usually environmental and
  // should be retried rather than remembered.
  if (result.usable) writeCache(outDir, key, result);

  return { result, fromCache: false };
}

export { TorchaudioAligner };
export * from "./types";
