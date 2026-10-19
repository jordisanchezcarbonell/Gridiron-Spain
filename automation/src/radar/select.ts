/**
 * Turns parsed radar items into a ranked, deduplicated work list.
 *
 * Two independent gates:
 *  - credibility: only CONFIRMED/REPORTED items with narratable prose can be cut
 *    (CLAUDE.md: nothing unverified gets published);
 *  - dedup: anything already in the ledger is skipped unless its content hash
 *    changed and the caller asked for updates.
 */
import type { Confidence, RadarItem } from "../types";
import { publishableConfidence } from "../config";
import { findEntry, type Ledger } from "../ledger";

export type SkipReason =
  | "confidence-not-publishable"
  | "no-narratable-body"
  | "already-produced"
  | "not-tagged-for-video";

export interface Candidate {
  item: RadarItem;
  /** Higher sorts first. */
  score: number;
}

export interface Skipped {
  item: RadarItem;
  reason: SkipReason;
  detail: string;
}

export interface Selection {
  candidates: Candidate[];
  skipped: Skipped[];
}

export function isPublishableConfidence(c: Confidence): boolean {
  return (publishableConfidence as readonly string[]).includes(c);
}

/** Minimum prose needed before narration can be written from the radar alone. */
export function hasNarratableBody(item: RadarItem): boolean {
  return item.body.join(" ").trim().length >= 40;
}

function score(item: RadarItem): number {
  const priority = item.priority ?? 3;
  const confidenceBonus = item.confidence === "CONFIRMED" ? 2 : 0;
  const videoBonus = item.taggedForVideo ? 2 : 0;
  const sourceBonus = item.sources.length > 0 ? 1 : 0;
  return priority * 2 + confidenceBonus + videoBonus + sourceBonus;
}

export interface SelectOptions {
  /** Only consider items the radar explicitly tagged for TikTok/Reels. */
  requireVideoTag?: boolean;
  /** Re-cut an item whose content hash changed since it was produced. */
  allowUpdates?: boolean;
}

export function selectCandidates(
  items: RadarItem[],
  ledger: Ledger,
  options: SelectOptions = {},
): Selection {
  const candidates: Candidate[] = [];
  const skipped: Skipped[] = [];

  for (const item of items) {
    if (!isPublishableConfidence(item.confidence)) {
      skipped.push({
        item,
        reason: "confidence-not-publishable",
        detail: `confidence is ${item.confidence}; the briefing must state CONFIRMED or REPORTED`,
      });
      continue;
    }
    if (!hasNarratableBody(item)) {
      skipped.push({
        item,
        reason: "no-narratable-body",
        detail: "the radar entry has no sourced prose to narrate without inventing facts",
      });
      continue;
    }
    if (options.requireVideoTag && !item.taggedForVideo) {
      skipped.push({
        item,
        reason: "not-tagged-for-video",
        detail: "the briefing did not flag this item for TikTok/Reels",
      });
      continue;
    }
    const seen = findEntry(ledger, item.slug);
    if (seen && (!options.allowUpdates || seen.contentHash === item.contentHash)) {
      skipped.push({
        item,
        reason: "already-produced",
        detail: `produced ${seen.producedAt} from the ${seen.briefingDate} briefing (${seen.videoPath})`,
      });
      continue;
    }
    candidates.push({ item, score: score(item) });
  }

  candidates.sort((a, b) =>
    b.score === a.score ? a.item.slug.localeCompare(b.item.slug) : b.score - a.score,
  );
  return { candidates, skipped };
}
