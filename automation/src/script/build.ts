/**
 * Builds a renderable script from a radar item.
 *
 * Hard rule (CLAUDE.md): the builder adds no facts. Narration is assembled from
 * sentences that already exist in the radar briefing or research document. The
 * only text the builder contributes is the fact-free closing line from config.
 *
 * Shape is hook -> beats -> conclusion:
 *  - the **hook** is the headline alone, held on a full-bleed card;
 *  - **beats** carry the sourced detail, one breath each;
 *  - the **conclusion** restates the headline and closes on the fixed CTA, so
 *    the clip lands instead of stopping mid-thought.
 */
import type { RadarItem, Scene, VideoScript } from "../types";
import { ctaLine, timing } from "../config";
import { formatSpec } from "../formats";

/** Splits prose into sentences without losing the terminator. */
export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Groups sentences into beats of roughly `wordsPerBeat` words, so each beat is
 * one comfortable breath of narration.
 */
export interface BeatGrouping {
  beats: string[];
  /** Sentences left out because the format ran out of beats. Never silent. */
  omitted: string[];
}

export function groupIntoBeats(
  parts: string[],
  wordsPerBeat: number,
  maxBeats: number,
): BeatGrouping {
  const beats: string[] = [];
  let current: string[] = [];
  const flush = () => {
    if (current.length) beats.push(current.join(" "));
    current = [];
  };
  for (const part of parts) {
    const prospective = [...current, part].join(" ");
    if (current.length > 0 && wordCount(prospective) > wordsPerBeat) {
      flush();
      current = [part];
    } else {
      current.push(part);
    }
  }
  flush();
  if (beats.length <= maxBeats) return { beats, omitted: [] };
  // Folding the remainder into the final beat made that beat unbounded: a
  // 201-word research document produced a single 80-second card. The overflow
  // is dropped instead, and the caller reports exactly what was left out.
  return { beats: beats.slice(0, maxBeats), omitted: beats.slice(maxBeats) };
}

/** A caption is the narration itself: same words on screen as in the ear. */
function caption(narration: string): string {
  return narration.replace(/\s+/g, " ").trim();
}

/**
 * The closing line. It repeats the headline — which is already sourced — and
 * then the fixed CTA, so the clip concludes without asserting anything new.
 */
export function conclusionFor(title: string): string {
  const trimmed = title.replace(/\s+/g, " ").trim();
  const stop = /[.!?…]$/.test(trimmed) ? "" : ".";
  return `${trimmed}${stop} ${ctaLine}`;
}

export function buildScript(item: RadarItem): VideoScript {
  const spec = formatSpec(item.format);
  const prose = item.body.flatMap(sentences);
  const { beats, omitted } = groupIntoBeats(prose, spec.wordsPerBeat, spec.maxBodyBeats);

  const scenes: Scene[] = [
    {
      id: "hook",
      kind: "hook",
      narration: item.title,
      caption: caption(item.title),
      padBeforeSec: timing.leadInSec,
      padAfterSec: timing.hookHoldSec,
    },
    ...beats.map((narration, i) => ({
      id: `beat-${i + 1}`,
      kind: "beat" as const,
      narration,
      caption: caption(narration),
      beatIndex: i + 1,
      beatTotal: beats.length,
      padBeforeSec: 0,
      padAfterSec: timing.beatGapSec,
    })),
    {
      id: "outro",
      kind: "outro",
      // The caption carries the whole conclusion, not just the CTA: subtitles
      // have to say what the voice says.
      narration: conclusionFor(item.title),
      caption: caption(conclusionFor(item.title)),
      padBeforeSec: 0,
      padAfterSec: timing.outroHoldSec,
    },
  ];

  return {
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
    omittedBeats: omitted,
  };
}

/**
 * Every narrated sentence other than the closing line must appear in the source
 * item. This is the guard that makes "never invent" checkable rather than a
 * promise, and it is asserted in the test suite.
 */
export function narrationIsGrounded(script: VideoScript, item: RadarItem): boolean {
  const haystack = [item.title, ...item.body].join(" ").replace(/\s+/g, " ").toLowerCase();
  const ctaWords = ctaLine.replace(/\s+/g, " ").toLowerCase();
  return script.scenes.every((scene) =>
    sentences(scene.narration).every((raw) => {
      const s = raw.replace(/\s+/g, " ").toLowerCase();
      // The conclusion is the headline plus the fixed CTA; both are allowed.
      if (s === ctaWords) return true;
      return haystack.includes(s) || haystack.includes(s.replace(/[.!?…]$/, ""));
    }),
  );
}

/** Total screen time a script will occupy once narrated, for planning. */
export function plannedDurationSec(scenes: Scene[]): number {
  return scenes.reduce(
    (total, s) => total + s.padBeforeSec + (s.durationSec ?? 0) + s.padAfterSec,
    0,
  );
}
