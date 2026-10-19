/**
 * Word-level alignment.
 *
 * Subtitle timings used to be a proportional share of each scene's narration:
 * the words were right, their moments were a guess. These types describe what
 * a real aligner returns and, as importantly, when it has *not* managed to
 * place a word — a timing nobody measured must never be presented as one.
 */

/** One word, located in the audio. */
export interface WordTiming {
  /** The word exactly as the approved script writes it. Never rewritten. */
  text: string;
  startSec: number;
  endSec: number;
  /** 0-1 from the aligner. `null` when the aligner reports no score. */
  confidence: number | null;
  /** False when the aligner could not place this word confidently. */
  located: boolean;
}

/** How the timings were obtained. The distinction is reported, never hidden. */
export type AlignmentMethod =
  /** A model placed each word in the audio. */
  | "forced"
  /** Word times were inferred from measured speech and silence, not located. */
  | "estimated";

export interface AlignmentResult {
  method: AlignmentMethod;
  /** Identifier of whatever produced this, recorded in the package. */
  aligner: string;
  /** Model or algorithm version, part of the cache key. */
  version: string;
  language: string;
  audioSec: number;
  words: WordTiming[];
  /** Fraction of words the aligner placed confidently, 0-1. */
  coverage: number;
  /** Problems found by validation. A non-empty list means review by hand. */
  problems: string[];
  /** True when the result is good enough to caption with. */
  usable: boolean;
}

export interface AlignmentRequest {
  /** PCM wav of the narration. */
  audioPath: string;
  /** Words as the approved script writes them, in spoken order. */
  words: string[];
  language: string;
  /** Measured length of the audio, for bounds checking. */
  audioSec: number;
}

export interface WordAligner {
  readonly id: string;
  readonly version: string;
  /** False when this aligner cannot run here. */
  available(): boolean;
  align(request: AlignmentRequest): Promise<AlignmentResult>;
}
