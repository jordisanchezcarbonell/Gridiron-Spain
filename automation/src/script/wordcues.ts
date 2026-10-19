/**
 * Cues built from measured word timings.
 *
 * The proportional builder in `srt.ts` split a scene's duration across its
 * cards by character count. The words were right and their moments were a
 * guess, which showed up wherever the narrator paused: a card changed while
 * the voice was still on the previous sentence.
 *
 * Here a card holds a short group of words, it comes up when its first word is
 * spoken, and the word being spoken is tinted so the viewer's eye tracks the
 * voice.
 */
import type { Cue, Scene } from "../types";
import { captions, timing } from "../config";
import { fitCaption, fitHook } from "./layout";
import type { WordTiming } from "../align/types";

/** Words a card prefers to hold. Short enough to take in at a glance. */
export const WORDS_PER_GROUP = 4;

/**
 * Words a card will stretch to when the voice is fast.
 *
 * Four words at this narrator's rate can go by in half a second, which is
 * under any reading floor. A card therefore keeps taking words until it has
 * earned its time on screen, and this is the ceiling on that.
 */
export const MAX_WORDS_PER_GROUP = 8;

/** A gap at least this long is treated as a pause worth breaking a card on. */
export const PAUSE_SEC = 0.35;

/** A card: a few words and the window they occupy. */
export interface WordGroup {
  words: WordTiming[];
  startSec: number;
  endSec: number;
}

/**
 * Splits a scene's words into groups, breaking at sentence ends and at real
 * pauses so a card never straddles a silence.
 */
export function groupWords(
  words: WordTiming[],
  pauseSec: number = PAUSE_SEC,
  minCardSec: number = timing.minCueSec,
): WordGroup[] {
  const groups: WordGroup[] = [];
  let current: WordTiming[] = [];

  const bounds = (list: WordTiming[]) => {
    const located = list.filter((w) => w.located);
    return {
      startSec: located.length ? Math.min(...located.map((w) => w.startSec)) : 0,
      endSec: located.length ? Math.max(...located.map((w) => w.endSec)) : 0,
    };
  };

  const flush = () => {
    if (current.length === 0) return;
    groups.push({ words: current, ...bounds(current) });
    current = [];
  };

  for (const [i, word] of words.entries()) {
    current.push(word);

    const endsSentence = /[.!?:]["»]?$/.test(word.text);
    const full = current.length >= WORDS_PER_GROUP;
    const next = words[i + 1];
    const gap = word.located && next?.located ? next.startSec - word.endSec : 0;
    const pause = gap >= pauseSec;

    // How long this card would be on screen if it closed here. A card that
    // has not yet earned the reading floor keeps taking words, even across a
    // sentence end - a card the viewer cannot read is worse than a card that
    // holds two short sentences.
    const span = bounds(current);
    const earnedItsTime = span.endSec - span.startSec >= minCardSec;
    const atCeiling = current.length >= MAX_WORDS_PER_GROUP;

    // A real pause still breaks the card: holding words across a silence is
    // what put captions out of step with the voice in the first place.
    if (atCeiling || pause || (earnedItsTime && (endsSentence || full))) flush();
  }
  flush();

  // Only the final card can be left unearned: every earlier flush happened at
  // the ceiling, at a pause, or once the card had earned its time. A last word
  // or two flashed up for a fraction of a second is the unreadable card this
  // module exists to avoid, so it folds back into the card before it - unless
  // a pause separates them, the merge would break the word ceiling, or it
  // holds nothing located, because that card is dropped downstream and
  // dropping it must not take located words with it.
  if (groups.length >= 2) {
    const last = groups[groups.length - 1];
    const prev = groups[groups.length - 2];
    const earnedItsTime = last.endSec - last.startSec >= minCardSec;
    const located = (g: WordGroup) => g.words.some((x) => x.located);
    const merged = [...prev.words, ...last.words];
    if (
      !earnedItsTime &&
      located(last) &&
      located(prev) &&
      last.startSec - prev.endSec < pauseSec &&
      merged.length <= MAX_WORDS_PER_GROUP
    ) {
      groups.splice(groups.length - 2, 2, { words: merged, ...bounds(merged) });
    }
  }

  return groups.filter((g) => g.words.length > 0);
}

/**
 * One cue per word of a scene, timed from the audio.
 *
 * Word times are absolute on the clip timeline, because the aligner runs
 * against the finished narration track. A group no word of which could be
 * located is dropped: a card shown at an invented moment is exactly what this
 * module exists to avoid.
 */
export function cuesFromWords(scene: Scene, words: WordTiming[]): Cue[] {
  const cues: Cue[] = [];
  const shape = scene.kind === "hook" ? fitHook : fitCaption;
  const maxLines = scene.kind === "hook" ? captions.hookMaxLines : captions.maxLines;

  for (const group of groupWords(words)) {
    if (!group.words.some((w) => w.located)) continue;

    const fitted = shape(group.words.map((w) => w.text).join(" "));
    // A card that will not fit the safe box is split, never dropped: dropping
    // it would silently lose words the voice still says.
    if (fitted.lines.length > maxLines && group.words.length > 1) {
      const half = Math.ceil(group.words.length / 2);
      cues.push(
        ...cuesFromWords(scene, group.words.slice(0, half)),
        ...cuesFromWords(scene, group.words.slice(half)),
      );
      continue;
    }

    // Positions are counted over the fitted card, which is the same word
    // sequence the renderer draws, so the tint lands on the right token even
    // when the card wraps onto two lines.
    const cardWords = fitted.lines.join(" ").split(/\s+/).filter(Boolean);
    const text = fitted.lines.join("\n");

    for (const [i, word] of group.words.entries()) {
      if (!word.located) continue;
      const nextLocated = group.words.slice(i + 1).find((w) => w.located);
      const startSec = word.startSec;
      const endSec = nextLocated ? nextLocated.startSec : Math.max(word.endSec, group.endSec);

      cues.push({
        index: 0, // assigned by stitchTimeline, once the order is final

        startSec,
        endSec: Math.max(endSec, startSec + 0.08),
        text,
        fontSize: fitted.fontSize,
        sceneId: scene.id,
        kind: scene.kind,
        beatIndex: scene.beatIndex,
        beatTotal: scene.beatTotal,
        progress: 0,
        activeWord: word.text,
        activeWordIndex: cardWords[i] === word.text ? i : undefined,
      });
    }
  }

  return cues;
}

/**
 * Closes the gaps so the cue list covers the clip from 0 to `totalSec`.
 *
 * The renderer builds the frame list from the cues, so a hole in the timeline
 * is a hole in the video - every later card would land early and the sync this
 * module buys would be lost. Each card is therefore held until the next one
 * starts, which is also what reads best: during a pause the card stays up with
 * its last word lit rather than blinking away.
 */
export function stitchTimeline(cues: Cue[], totalSec: number): Cue[] {
  if (cues.length === 0) return [];

  const sorted = [...cues].sort((a, b) => a.startSec - b.startSec);
  const out = sorted.map((cue, i) => ({
    ...cue,
    startSec: i === 0 ? 0 : cue.startSec,
    endSec: i === sorted.length - 1 ? Math.max(totalSec, cue.endSec) : sorted[i + 1].startSec,
  }));

  // Progress is measured at each cue's midpoint across the finished clip.
  return out.map((cue, i) => ({
    ...cue,
    index: i + 1,
    progress: totalSec > 0 ? Math.min(1, (cue.startSec + cue.endSec) / 2 / totalSec) : 0,
  }));
}

/**
 * Builds the frame cues for a whole clip from per-scene word timings.
 *
 * `wordsByScene` is parallel to `scenes`; a scene with no usable timings
 * contributes nothing, and the caller reports the shortfall.
 */
export function buildWordCues(
  scenes: Scene[],
  wordsByScene: WordTiming[][],
  totalSec: number,
): Cue[] {
  const cues = scenes.flatMap((scene, i) => cuesFromWords(scene, wordsByScene[i] ?? []));
  return stitchTimeline(cues, totalSec);
}

/**
 * Collapses word cues into the cards a subtitle file should carry.
 *
 * The per-word JSON stays the source of truth for timing; an SRT with one
 * entry per word is unreadable in a player, so consecutive cues showing the
 * same card are merged back into one.
 */
export function mergeForSubtitles(cues: Cue[]): Cue[] {
  const merged: Cue[] = [];
  for (const cue of cues) {
    const previous = merged[merged.length - 1];
    if (previous && previous.text === cue.text && previous.sceneId === cue.sceneId) {
      previous.endSec = cue.endSec;
      continue;
    }
    merged.push({
      ...cue,
      index: merged.length + 1,
      activeWord: undefined,
      activeWordIndex: undefined,
    });
  }
  return merged;
}

/**
 * Cards that are on screen for less than the reading floor.
 *
 * Reported rather than fixed: the fix would be to hold a card past the words
 * it shows, which is the very thing measured timings are meant to end.
 */
export function shortCards(cards: Cue[], minSec = timing.minCueSec): Cue[] {
  return cards.filter((c) => c.endSec - c.startSec < minSec - 0.005);
}

/** Longest stretch with nothing being spoken, for the pacing report. */
export function longestSilenceSec(words: WordTiming[], audioSec: number): number {
  const located = words.filter((w) => w.located).sort((a, b) => a.startSec - b.startSec);
  if (located.length === 0) return audioSec;

  let longest = located[0].startSec;
  for (let i = 1; i < located.length; i++) {
    longest = Math.max(longest, located[i].startSec - located[i - 1].endSec);
  }
  return Math.max(longest, audioSec - located[located.length - 1].endSec);
}
