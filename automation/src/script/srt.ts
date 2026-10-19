/**
 * Subtitle generation.
 *
 * Cue timings come from the *measured* duration of each rendered narration clip
 * (via ffprobe), never from an estimate, so the burned-in text stays in sync.
 *
 * Captions are split on sentence and clause boundaries, never mid-phrase. The
 * first version wrapped the whole beat to a fixed width and cut every N lines,
 * which produced cards reading "… Es el mayor" / "salto de la semana."
 */
import type { Cue, Scene } from "../types";
import { captions, charsPerLine, timing, typography } from "../config";
import { sentences } from "./build";
import { fitCaption, fitHook, wrap, type FittedText } from "./layout";

export { wrap };

/** Splits a long sentence at clause boundaries, keeping the punctuation. */
export function splitClauses(sentence: string): string[] {
  const parts = sentence.split(/(?<=[,;:])\s+/).map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [sentence];
}

/**
 * Splits a caption into cards that each hold whole sentences where possible.
 *
 * A card may hold several short sentences, but a sentence is only broken when
 * it cannot fit on its own — and then only at a clause boundary, so a card
 * never ends mid-phrase.
 */
export function chunkCaption(text: string, width: number, maxLines: number): string[] {
  const capacity = width * maxLines;
  const units: string[] = [];

  /** Last resort: a clause with no punctuation to break on, split by lines. */
  const hardSplit = (unit: string): string[] => {
    const lines = wrap(unit, width);
    if (lines.length <= maxLines) return [unit];
    const out: string[] = [];
    for (let i = 0; i < lines.length; i += maxLines) {
      out.push(lines.slice(i, i + maxLines).join(" "));
    }
    return out;
  };

  for (const sentence of sentences(text)) {
    if (wrap(sentence, width).length <= maxLines) {
      units.push(sentence);
      continue;
    }
    // Too long for one card: break it at clauses, merging neighbours that fit.
    let buffer = "";
    for (const clause of splitClauses(sentence)) {
      const prospective = buffer ? `${buffer} ${clause}` : clause;
      if (buffer && wrap(prospective, width).length > maxLines) {
        units.push(...hardSplit(buffer));
        buffer = clause;
      } else {
        buffer = prospective;
      }
    }
    if (buffer) units.push(...hardSplit(buffer));
  }

  // Pack consecutive whole sentences onto one card while they still fit.
  const cards: string[] = [];
  let current = "";
  for (const unit of units) {
    const prospective = current ? `${current} ${unit}` : unit;
    if (current && (prospective.length > capacity || wrap(prospective, width).length > maxLines)) {
      cards.push(current);
      current = unit;
    } else {
      current = prospective;
    }
  }
  if (current) cards.push(current);

  return finishCards(cards, width, maxLines, text);
}

/** True when a card begins a sentence rather than continuing one. */
function startsSentence(card: string): boolean {
  const first = card.trimStart().charAt(0);
  if (!first) return false;
  return first === first.toUpperCase() || /[0-9¿¡"«(]/.test(first);
}

/**
 * Applies the finishing passes that make a split readable:
 *
 *  - an orphan tail (a card of one or two words) is folded back when it fits,
 *    so a card never holds a stray "de la semana.";
 *  - a card that continues the previous sentence is marked with a leading
 *    ellipsis, and the card before it with a trailing one. Without this a
 *    viewer sees a card opening "junto con los otros equipos" and reads it as
 *    a sentence that lost its subject.
 *
 * The ellipsis is punctuation, not content: no word is added or removed.
 */
function finishCards(cards: string[], width: number, maxLines: number, fallback: string): string[] {
  if (cards.length === 0) return [fallback];

  // Fold an orphan tail back into its predecessor where there is room.
  const folded: string[] = [];
  for (const card of cards) {
    const previous = folded[folded.length - 1];
    const isOrphan = card.split(/\s+/).filter(Boolean).length <= 2;
    if (previous && isOrphan && wrap(`${previous} ${card}`, width).length <= maxLines) {
      folded[folded.length - 1] = `${previous} ${card}`;
    } else {
      folded.push(card);
    }
  }

  // Mark continuations so no card opens as a bare fragment.
  const marked = folded.map((card, i) => {
    const continuation = i > 0 && !startsSentence(card);
    return continuation ? `… ${card}` : card;
  });
  for (let i = 0; i < marked.length - 1; i++) {
    if (marked[i + 1].startsWith("… ") && !/[.!?…:,]$/.test(marked[i].trim())) {
      marked[i] = `${marked[i].trimEnd()}…`;
    }
  }

  return marked.map((c) => wrap(c, width).join("\n"));
}

/** `12.345` -> `00:00:12,345` (SRT) */
export function srtTimestamp(seconds: number): string {
  const ms = Math.max(0, Math.round(seconds * 1000));
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const rest = ms % 1000;
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(rest, 3)}`;
}

/**
 * Chunking must assume the *most* generous line width the fitter can reach,
 * i.e. the one at the smallest permitted type size. Chunking at the default
 * size and shrinking afterwards made the chunker break sentences that would
 * have fitted once the type came down — which is how a card ended on
 * "… tras aplastar a".
 */
function cardShape(scene: Scene): { width: number; maxLines: number } {
  return scene.kind === "hook"
    ? { width: charsPerLine(typography.hookMinSize), maxLines: captions.hookMaxLines }
    : { width: charsPerLine(typography.captionMinSize), maxLines: captions.maxLines };
}

/** Fits one card's text, shrinking the type when a long word demands it. */
function fitCard(scene: Scene, text: string): FittedText {
  return scene.kind === "hook" ? fitHook(text) : fitCaption(text);
}

/**
 * Splits a scene's narration time across its cards.
 *
 * Time is proportional to card length, but every card is guaranteed
 * `timing.minCueSec` so a short one does not flash past unread — the surplus is
 * taken from the longer cards. When the scene is too short to give every card
 * the floor, the split stays proportional and the validator reports it.
 */
export function allocateShares(chunks: string[], narrationSec: number): number[] {
  const weights = chunks.map((c) => Math.max(1, c.replace(/\n/g, " ").length));
  const weightTotal = weights.reduce((a, b) => a + b, 0);
  const proportional = weights.map((w) => (w / weightTotal) * narrationSec);

  if (chunks.length * timing.minCueSec > narrationSec) return proportional;

  const shares = [...proportional];
  const deficit = shares.reduce((d, v) => d + Math.max(0, timing.minCueSec - v), 0);
  if (deficit === 0) return shares;

  // Raise the short cards to the floor, then take the difference from the
  // cards that have room above it, in proportion to their surplus.
  const surplusTotal = shares.reduce((t, v) => t + Math.max(0, v - timing.minCueSec), 0);
  return shares.map((v) => {
    if (v < timing.minCueSec) return timing.minCueSec;
    const surplus = v - timing.minCueSec;
    return v - (surplusTotal > 0 ? (surplus / surplusTotal) * deficit : 0);
  });
}

/**
 * Builds cues from scenes whose `durationSec` has been measured.
 *
 * A scene's narration time is divided across its cards in proportion to their
 * length; the scene's trailing pad is given to the last card, so the closing
 * words stay on screen while the card is held.
 */
export function buildCues(scenes: Scene[]): Cue[] {
  const cues: Cue[] = [];
  const totalSec = scenes.reduce(
    (t, s) => t + s.padBeforeSec + (s.durationSec ?? 0) + s.padAfterSec,
    0,
  );
  let clock = 0;
  let index = 1;

  for (const scene of scenes) {
    const shape = cardShape(scene);
    const narrationSec = scene.durationSec ?? 0;
    // The lead-in belongs to the first card: the text is up before the voice.
    const cardStart = clock + (scene.kind === "hook" ? 0 : scene.padBeforeSec);
    const leadIn = scene.kind === "hook" ? scene.padBeforeSec : 0;
    const chunks = chunkCaption(scene.caption, shape.width, shape.maxLines);
    const shares = allocateShares(chunks, narrationSec);

    let offset = 0;
    chunks.forEach((raw, i) => {
      const fitted = fitCard(scene, raw.replace(/\n/g, " "));
      const text = fitted.lines.join("\n");
      const isLast = i === chunks.length - 1;
      const share = shares[i];
      const startSec = cardStart + (i === 0 ? 0 : leadIn + offset);
      const endSec = isLast
        ? cardStart + leadIn + narrationSec + scene.padAfterSec
        : cardStart + leadIn + offset + share;
      cues.push({
        index: index++,
        startSec,
        endSec: Math.max(endSec, startSec + timing.minCueSec * 0.25),
        text,
        fontSize: fitted.fontSize,
        sceneId: scene.id,
        kind: scene.kind,
        beatIndex: scene.beatIndex,
        beatTotal: scene.beatTotal,
        progress: 0,
      });
      offset += share;
    });

    clock += scene.padBeforeSec + narrationSec + scene.padAfterSec;
  }

  // Progress is measured at each cue's midpoint across the finished clip.
  return cues.map((cue) => ({
    ...cue,
    progress: totalSec > 0 ? Math.min(1, ((cue.startSec + cue.endSec) / 2) / totalSec) : 0,
  }));
}

export function toSrt(cues: Cue[]): string {
  return `${cues
    .map((c) => `${c.index}\n${srtTimestamp(c.startSec)} --> ${srtTimestamp(c.endSec)}\n${c.text}`)
    .join("\n\n")}\n`;
}
