import type { Source } from "@/types/common";

const TOKEN = /\[\[src:([a-z0-9-]+)\]\]/g;

export type TextPart =
  | { kind: "text"; value: string }
  | { kind: "cite"; sourceId: string; index: number };

/**
 * Split a paragraph into text and citation parts. `index` is the
 * 1-based position of the source in the article's ordered source list.
 */
export function splitCitations(text: string, orderedSources: Source[]): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ kind: "text", value: text.slice(last, start) });
    const sourceId = match[1];
    const index = orderedSources.findIndex((s) => s.id === sourceId) + 1;
    parts.push({ kind: "cite", sourceId, index });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ kind: "text", value: text.slice(last) });
  return parts;
}

/** Strip citation tokens (for excerpts, metadata, plain text). */
export function stripCitations(text: string): string {
  return text.replace(TOKEN, "").replace(/\s{2,}/g, " ").trim();
}

/** Rough reading time from article blocks. */
export function estimateReadingTime(words: number): number {
  return Math.max(1, Math.round(words / 220));
}
