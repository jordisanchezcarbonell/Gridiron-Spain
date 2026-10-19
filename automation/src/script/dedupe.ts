/**
 * Duplicate detection beyond the slug.
 *
 * The ledger already refuses a repeated slug. Two further collisions matter
 * once a model is writing the words:
 *
 *  - **same event, different wording** — two briefings describe one game, the
 *    headlines differ, the slugs differ, and the clip would ship twice;
 *  - **same script, different event** — a generator settles into a formula and
 *    produces near-identical narration for unrelated stories.
 *
 * Both are caught by comparing against what the ledger recorded, not by
 * trusting the generator to remember what it wrote last week.
 */
import type { LedgerEntry } from "../types";
import type { Ledger } from "../ledger";
import { similarity } from "./evaluate";

/** Narration overlap above this reads as the same clip rewritten. */
export const SIMILARITY_THRESHOLD = 0.55;

export interface DuplicateMatch {
  kind: "same-event" | "similar-script";
  entry: LedgerEntry;
  /** 0-1 for a similarity match; 1 for an exact event collision. */
  score: number;
}

export function findDuplicate(
  ledger: Ledger,
  candidate: { slug: string; eventKey: string; scriptFingerprint: string; narration: string },
): DuplicateMatch | undefined {
  for (const entry of ledger.entries) {
    if (entry.slug === candidate.slug) continue; // the slug gate already handles this

    if (entry.eventKey && entry.eventKey === candidate.eventKey) {
      return { kind: "same-event", entry, score: 1 };
    }

    if (entry.scriptFingerprint && entry.scriptFingerprint === candidate.scriptFingerprint) {
      return { kind: "similar-script", entry, score: 1 };
    }

    if (entry.narration) {
      const score = similarity(entry.narration, candidate.narration);
      if (score >= SIMILARITY_THRESHOLD) {
        return { kind: "similar-script", entry, score };
      }
    }
  }
  return undefined;
}

/** The narration text stored on the ledger for future comparisons. */
export function narrationOf(scenes: { narration: string; kind: string }[]): string {
  return scenes
    .filter((s) => s.kind !== "outro")
    .map((s) => s.narration)
    .join(" ");
}
