/**
 * Validation of an alignment.
 *
 * An aligner can return a plausible-looking list that is quietly wrong: times
 * that go backwards, a word placed past the end of the audio, half the script
 * unlocated. Captioning from that is worse than not captioning at all, so the
 * result is checked before anything uses it.
 */
import type { AlignmentResult, WordTiming } from "./types";

/** Below this, a word is treated as not located rather than timed. */
export const MIN_CONFIDENCE = 0.4;

/** An alignment with less coverage than this is not used for captioning. */
export const MIN_COVERAGE = 0.8;

export interface ValidationOutcome {
  problems: string[];
  coverage: number;
  usable: boolean;
}

/**
 * Checks monotonicity, bounds and coverage.
 *
 * Words the aligner could not place keep their text and are marked unlocated;
 * they are never given invented times, and they count against coverage.
 */
export function validateAlignment(words: WordTiming[], audioSec: number): ValidationOutcome {
  const problems: string[] = [];
  const located = words.filter((w) => w.located);

  if (words.length === 0) {
    return { problems: ["the alignment contains no words"], coverage: 0, usable: false };
  }

  let previousEnd = -Infinity;
  for (const [i, word] of words.entries()) {
    if (!word.located) continue;

    if (!Number.isFinite(word.startSec) || !Number.isFinite(word.endSec)) {
      problems.push(`word ${i} ("${word.text}") has a non-finite timestamp`);
      continue;
    }
    if (word.endSec < word.startSec) {
      problems.push(`word ${i} ("${word.text}") ends before it starts`);
    }
    if (word.startSec < -0.01 || word.endSec > audioSec + 0.05) {
      problems.push(
        `word ${i} ("${word.text}") at ${word.startSec.toFixed(2)}-${word.endSec.toFixed(2)}s falls outside the ${audioSec.toFixed(2)}s audio`,
      );
    }
    if (word.startSec + 1e-6 < previousEnd) {
      problems.push(
        `word ${i} ("${word.text}") starts at ${word.startSec.toFixed(2)}s, before word ${i - 1} ended at ${previousEnd.toFixed(2)}s`,
      );
    }
    previousEnd = Math.max(previousEnd, word.endSec);
  }

  const coverage = located.length / words.length;
  if (coverage < MIN_COVERAGE) {
    problems.push(
      `only ${(coverage * 100).toFixed(0)}% of words were located; ${(MIN_COVERAGE * 100).toFixed(0)}% is the floor for captioning`,
    );
  }

  return { problems, coverage, usable: problems.length === 0 };
}

/** Applies the confidence floor, marking weak placements as unlocated. */
export function applyConfidenceFloor(words: WordTiming[], floor = MIN_CONFIDENCE): WordTiming[] {
  return words.map((word) =>
    word.confidence !== null && word.confidence < floor ? { ...word, located: false } : word,
  );
}

/** One line for the run report. */
export function describeAlignment(result: AlignmentResult): string {
  const pct = (result.coverage * 100).toFixed(0);
  const head = `${result.method} (${result.aligner}): ${pct}% of words located`;
  return result.usable ? head : `${head} - NOT USABLE: ${result.problems[0]}`;
}
