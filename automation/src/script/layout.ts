/**
 * Text fitting.
 *
 * The frame renderer and the legibility validator must agree exactly on how a
 * caption is broken and at what size it is set, or one will draw text the other
 * rejects. Both call in here, and the result is stored on the cue.
 */
import { charsPerLine, captions, typography } from "../config";

export interface FittedText {
  lines: string[];
  fontSize: number;
}

/** Greedy word wrap at `width` characters. */
export function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line.length === 0) line = word;
    else if (`${line} ${word}`.length <= width) line = `${line} ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Longest unbreakable token, which sets the floor for the font size. */
export function longestWord(text: string): number {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((max, w) => Math.max(max, w.length), 0);
}

/**
 * Picks the largest size at or below `preferred` where the text fits: every
 * word inside one line, and the whole block inside `maxLines`.
 *
 * Without this a headline like "Navy busca el three-peat del
 * Commander-in-Chief's Trophy" overflows the safe box, because a single
 * 20-character word cannot be wrapped at any width the 86px size allows.
 */
export function fitText(text: string, preferred: number, minimum: number, maxLines: number): FittedText {
  const clean = text.replace(/\s+/g, " ").trim();
  for (let size = preferred; size >= minimum; size -= 2) {
    const width = charsPerLine(size);
    if (longestWord(clean) > width) continue;
    const lines = wrap(clean, width);
    if (lines.length <= maxLines) return { lines, fontSize: size };
  }
  // Nothing fit: set at the floor and let the validator report the overflow.
  const width = charsPerLine(minimum);
  return { lines: wrap(clean, width), fontSize: minimum };
}

/** Fits a hook headline, which is set large and may shrink a long way. */
export function fitHook(text: string): FittedText {
  return fitText(text, typography.hookSize, typography.hookMinSize, captions.hookMaxLines);
}

/** Fits a body or outro caption. */
export function fitCaption(text: string): FittedText {
  return fitText(text, typography.captionSize, typography.captionMinSize, captions.maxLines);
}
