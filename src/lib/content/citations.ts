import type { Source } from "@/types/common";

const TOKEN = /\[\[src:([a-z0-9-]+)\]\]/g;

/**
 * Internal link: [[link:routeKey/segment/...|visible text]], e.g.
 * [[link:competitions/lnfa|la LNFA]]. The route key is resolved per locale
 * with href(), so the same token works in both languages.
 */
export const LINK_TOKEN = /\[\[link:([a-zA-Z]+)((?:\/[a-z0-9-]+)*)\|([^\]|]+)\]\]/g;
const ANY_TOKEN = new RegExp(`${TOKEN.source}|${LINK_TOKEN.source}`, "g");

export type TextPart =
  | { kind: "text"; value: string }
  | { kind: "cite"; sourceId: string; index: number }
  | { kind: "link"; route: string; segments: string[]; label: string };

/** Parse the route key and segments of a link token match. */
export function linkTarget(route: string, path: string): { route: string; segments: string[] } {
  return { route, segments: path.split("/").filter(Boolean) };
}

/**
 * Split a paragraph into text, citation and internal-link parts. `index` is
 * the 1-based position of the source in the article's ordered source list.
 */
export function splitCitations(text: string, orderedSources: Source[]): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;
  for (const match of text.matchAll(ANY_TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ kind: "text", value: text.slice(last, start) });
    if (match[1]) {
      const sourceId = match[1];
      const index = orderedSources.findIndex((s) => s.id === sourceId) + 1;
      parts.push({ kind: "cite", sourceId, index });
    } else {
      parts.push({ kind: "link", ...linkTarget(match[2], match[3] ?? ""), label: match[4] });
    }
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ kind: "text", value: text.slice(last) });
  return parts;
}

/** Strip citation tokens (for excerpts, metadata, plain text). */
export function stripCitations(text: string): string {
  return text.replace(TOKEN, "").replace(LINK_TOKEN, "$3").replace(/\s{2,}/g, " ").trim();
}

/** Rough reading time from article blocks. */
export function estimateReadingTime(words: number): number {
  return Math.max(1, Math.round(words / 220));
}
