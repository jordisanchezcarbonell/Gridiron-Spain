/**
 * Read-only parser for the content radar.
 *
 * The radar is the `/football-daily` skill (`.claude/skills/football-daily.md`),
 * which writes one Markdown briefing per day to `research/daily/YYYY-MM-DD.md`.
 * The briefings in the repo use two shapes, so this parser accepts both:
 *
 *   - the full skill template (`research/daily/2026-10-02.md`): `## 🔥 TOP STORIES`
 *     with `### N. Title (CONFIDENCE)`, a `### TikTok / Reels Ideas` table inside
 *     `## 💡 CONTENT OPPORTUNITIES`, and `## 📊 DETECTED STORIES`;
 *   - the condensed shape (`research/daily/2026-10-14.md`): per-league
 *     `### Storylines` lists with `(Priority: N/5)` and `*Content: … TikTok.*`.
 *
 * Nothing in this file writes to disk. The radar's behaviour is untouched.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type {
  Briefing,
  Confidence,
  Provenance,
  RadarItem,
  RadarSection,
  RadarSource,
} from "../types";
import { paths } from "../config";

const CONFIDENCES: Confidence[] = ["CONFIRMED", "REPORTED", "RUMOR", "UNKNOWN"];
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const VIDEO_HINT = /\b(tiktok|reel|reels|short|shorts|v[íi]deo)\b/i;

/** `## 🔥 TOP STORIES` -> `top stories` (emoji and hashes stripped). */
function headingText(line: string): string {
  return line
    .replace(/^#{1,6}\s*/, "")
    .replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, "")
    .trim();
}

function headingLevel(line: string): number {
  const m = /^(#{1,6})\s/.exec(line);
  return m ? m[1].length : 0;
}

/** Strips accents and punctuation to a kebab-case identity. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

export function hashContent(title: string, body: string[]): string {
  const normalized = [title, ...body].join("\n").replace(/\s+/g, " ").trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 12);
}

/** Pulls a stated confidence out of arbitrary text, or undefined if absent. */
function statedConfidence(text: string): Confidence | undefined {
  return CONFIDENCES.find((c) => new RegExp(`\\b${c}\\b`).test(text));
}

function extractSources(lines: string[]): RadarSource[] {
  const out: RadarSource[] = [];
  const seen = new Set<string>();
  for (const line of lines) {
    for (const m of line.matchAll(LINK)) {
      const url = m[2];
      if (seen.has(url)) continue;
      seen.add(url);
      out.push({ label: m[1].trim(), url });
    }
  }
  return out;
}

/** `- **Why it matters:** foo` -> `foo` for the requested label. */
function bulletValue(lines: string[], label: RegExp): string | undefined {
  for (const line of lines) {
    const m = /^\s*[-*]\s*\*\*([^:*]+):?\*\*:?\s*(.*)$/.exec(line);
    if (m && label.test(m[1].trim())) return m[2].trim();
  }
  return undefined;
}

function parsePriority(text: string): number | undefined {
  const m = /(?:priority|prioridad)[:*\s]*(\d)\s*\/\s*5/i.exec(text);
  if (!m) return undefined;
  const n = Number(m[1]);
  return n >= 1 && n <= 5 ? n : undefined;
}

/** Drops markdown emphasis, links and citation markers from narratable prose. */
/**
 * Sentences that talk about the newsroom rather than about football.
 *
 * The radar's "Why it matters" bullet is rationale written for the editor —
 * sometimes viewer-facing ("Florida vuelve a ser relevante"), sometimes purely
 * internal ("Historia central para el proyecto editorial"). The internal kind
 * must never reach narration.
 */
const SELF_REFERENTIAL =
  /\b(proyecto|project|redacci[oó]n|newsroom|nuestra\s+cobertura|our\s+coverage|content potential|high priority|low priority|priority:)\b/i;

/** Research apparatus: confidence markers and bare links do not read aloud. */
const APPARATUS = /(https?:\/\/|\bUNKNOWN\b|\bCONFIRMED\b|\bREPORTED\b|\bRUMOR\b)/;

/**
 * A fragment left over from an earlier clause reads as a mistake when it opens
 * a clip. Spanish sentences start with a capital, a digit or opening
 * punctuation, so anything starting lowercase is a leftover, not a sentence.
 */
export function startsAsSentence(text: string): boolean {
  const first = text.trimStart().charAt(0);
  if (!first) return false;
  return first === first.toUpperCase() || /[0-9¿¡"«(]/.test(first);
}

/** Capitalises the first letter, leaving the rest of the wording untouched. */
export function capitalizeFirst(text: string): string {
  const trimmed = text.trimStart();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * True when a sentence is publishable narration rather than a desk note.
 *
 * This does not reject text that merely starts lowercase: a condensed
 * storyline reads `**Headline** — continues in lower case`, which is a complete
 * thought, not a fragment. Only `research.ts`, where prose is lifted paragraph
 * by paragraph, has to guard against genuine leftovers.
 */
export function isNarratable(text: string): boolean {
  return text.length > 0 && !SELF_REFERENTIAL.test(text) && !APPARATUS.test(text);
}

/** True for `---`, `***` and friends: layout, never prose. */
export function isHorizontalRule(line: string): boolean {
  return /^\s*([-*_])\s*(\1\s*){2,}$/.test(line);
}

export function plainText(markdown: string): string {
  return markdown
    .replace(LINK, "$1")
    .replace(/\[\[src:[a-z0-9-]+\]\]/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

interface Block {
  heading: string;
  level: number;
  line: number;
  lines: string[];
  /** Nearest enclosing heading chain, outermost first. */
  ancestors: string[];
}

/** Splits the body into heading blocks, remembering each block's ancestry. */
function blocks(lines: string[]): Block[] {
  const out: Block[] = [];
  const stack: Block[] = [];
  let current: Block | undefined;
  lines.forEach((raw, i) => {
    const level = headingLevel(raw);
    if (level === 0) {
      current?.lines.push(raw);
      return;
    }
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    current = {
      heading: headingText(raw),
      level,
      line: i + 1,
      lines: [],
      ancestors: stack.map((b) => b.heading),
    };
    stack.push(current);
    out.push(current);
  });
  return out;
}

/**
 * Resolves confidence honestly: an explicit tag on the item, else an explicit
 * `- **Confidence:**` bullet, else a tag on an enclosing heading, else UNKNOWN.
 * It is never guessed — an untagged item stays UNKNOWN and will not be rendered.
 */
function resolveConfidence(
  headingLine: string,
  body: string[],
  ancestors: string[],
): Confidence {
  const fromBullet = bulletValue(body, /^confidence|confianza$/i);
  return (
    statedConfidence(headingLine) ??
    (fromBullet ? statedConfidence(fromBullet) : undefined) ??
    ancestors.map(statedConfidence).find(Boolean) ??
    "UNKNOWN"
  );
}

function makeItem(
  title: string,
  body: string[],
  rawForMeta: string[],
  confidence: Confidence,
  section: RadarSection,
  line: number,
  briefingPath: string,
  briefingDate: string,
): RadarItem | undefined {
  const cleanTitle = plainText(title).replace(/^\d+\.\s*/, "").replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (!cleanTitle) return undefined;
  const cleanBody = body
    .filter((l) => !isHorizontalRule(l))
    .map(plainText)
    .filter(isNarratable);
  const metaText = [title, ...rawForMeta].join("\n");
  const provenance: Provenance = { briefingPath, briefingDate, line, section };
  return {
    slug: slugify(cleanTitle),
    title: cleanTitle,
    body: cleanBody,
    confidence,
    priority: parsePriority(metaText),
    taggedForVideo: VIDEO_HINT.test(metaText),
    sources: extractSources(rawForMeta),
    provenance,
    contentHash: hashContent(cleanTitle, cleanBody),
    format: "news",
  };
}

/** `## 🔥 TOP STORIES` -> `### N. Title (CONFIDENCE)` children. */
function fromTopStories(all: Block[], briefingPath: string, date: string): RadarItem[] {
  return all
    .filter((b) => /top stories/i.test(b.heading) === false)
    .filter((b) => b.ancestors.some((a) => /top stories/i.test(a)))
    .flatMap((b) => {
      const prose = b.lines.filter((l) => !/^\s*[-*]\s/.test(l));
      const whyItMatters = bulletValue(b.lines, /why it matters|por qu[ée]/i);
      const body = [...prose, ...(whyItMatters ? [whyItMatters] : [])];
      const item = makeItem(
        b.heading,
        body,
        b.lines,
        resolveConfidence(b.heading, b.lines, b.ancestors),
        "top-stories",
        b.line,
        briefingPath,
        date,
      );
      return item ? [item] : [];
    });
}

/** `## 📊 DETECTED STORIES` -> `### Label: Title` children. */
function fromDetectedStories(all: Block[], briefingPath: string, date: string): RadarItem[] {
  return all
    .filter((b) => b.ancestors.some((a) => /detected stories|historias detectadas/i.test(a)))
    .flatMap((b) => {
      const prose = b.lines.filter((l) => !/^\s*[-*]\s/.test(l));
      const whyItMatters = bulletValue(b.lines, /why it matters|por qu[ée]/i);
      const body = [...prose, ...(whyItMatters ? [whyItMatters] : [])];
      const item = makeItem(
        b.heading,
        body,
        b.lines,
        resolveConfidence(b.heading, b.lines, b.ancestors),
        "detected-stories",
        b.line,
        briefingPath,
        date,
      );
      return item ? [item] : [];
    });
}

/**
 * `### Storylines` -> numbered list items whose continuation lines are indented.
 * Shape: `1. **Title** (Priority: 5/5) — prose … *Content: …, TikTok.*`
 */
function fromStorylines(all: Block[], briefingPath: string, date: string): RadarItem[] {
  const out: RadarItem[] = [];
  for (const b of all) {
    if (!/^storylines$/i.test(b.heading) && !/storylines/i.test(b.heading)) continue;
    let buffer: string[] = [];
    let startLine = b.line;
    const flush = () => {
      if (!buffer.length) return;
      const first = buffer[0].replace(/^\s*\d+\.\s*/, "");
      const titleMatch = /^\*\*([^*]+)\*\*/.exec(first);
      const title = titleMatch ? titleMatch[1] : first.split(/\s[—–-]\s/)[0];
      const rest = titleMatch ? first.slice(titleMatch[0].length) : first;
      const prose = [rest, ...buffer.slice(1)]
        .join(" ")
        .replace(/^\s*\([^)]*\)\s*/, "")
        .replace(/^\s*[—–-]\s*/, "")
        .replace(/\*Content:[^*]*\*/gi, "")
        .trim();
      // A storyline's prose continues its own headline, so it starts lower
      // case by design; it is a sentence once it stands alone.
      const sentenceProse = prose ? capitalizeFirst(prose) : "";
      const item = makeItem(
        title,
        sentenceProse ? [sentenceProse] : [],
        buffer,
        resolveConfidence(buffer[0], buffer, [b.heading, ...b.ancestors]),
        "storylines",
        startLine,
        briefingPath,
        date,
      );
      if (item) out.push(item);
      buffer = [];
    };
    b.lines.forEach((raw, i) => {
      if (/^\s*\d+\.\s/.test(raw)) {
        flush();
        startLine = b.line + i + 1;
        buffer = [raw];
      } else if (buffer.length && /^\s+\S/.test(raw)) {
        buffer.push(raw.trim());
      } else if (raw.trim() === "") {
        // a blank line does not close the item: wrapped prose may continue
      } else {
        flush();
      }
    });
    flush();
  }
  return out;
}

/**
 * `### TikTok / Reels Ideas` — a hook table in the 2026-10-02 briefing, a
 * numbered list in the skill template. These are prompts without sourced bodies,
 * so they parse as UNKNOWN and are reported as ideas, not rendered.
 */
function fromTikTokIdeas(all: Block[], briefingPath: string, date: string): RadarItem[] {
  const out: RadarItem[] = [];
  for (const b of all) {
    if (!/tiktok|reels/i.test(b.heading)) continue;
    for (const [i, raw] of b.lines.entries()) {
      const line = raw.trim();
      if (!line.startsWith("|")) continue;
      const cells = line.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
      if (cells.length < 2) continue;
      if (/^[-:\s]+$/.test(cells[0])) continue;
      if (/^hook$/i.test(cells[0])) continue;
      const hook = plainText(cells[0]).replace(/^"|"$/g, "");
      const label = plainText(cells[1]);
      const item = makeItem(
        label || hook,
        hook ? [hook] : [],
        [raw],
        resolveConfidence(raw, [raw], [b.heading, ...b.ancestors]),
        "tiktok-ideas",
        b.line + i + 1,
        briefingPath,
        date,
      );
      if (item) out.push({ ...item, taggedForVideo: true });
    }
  }
  return out;
}

/** Minimal YAML front matter reader: flat scalars and `[a, b]` lists only. */
export function parseFrontMatter(raw: string): {
  data: Record<string, string>;
  body: string;
  /** Lines consumed by the front matter, so provenance stays absolute. */
  offset: number;
} {
  if (!raw.startsWith("---")) return { data: {}, body: raw, offset: 0 };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw, offset: 0 };
  const block = raw.slice(raw.indexOf("\n") + 1, end);
  const data: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line.trim());
    if (m) data[m[1]] = m[2].trim();
  }
  const bodyStart = raw.indexOf("\n", end + 1);
  const body = bodyStart === -1 ? "" : raw.slice(bodyStart + 1);
  const offset = raw.slice(0, raw.length - body.length).split("\n").length - 1;
  return { data, body, offset };
}

/** Parses one briefing file. Pure: takes content, touches no disk. */
export function parseBriefing(briefingPath: string, raw: string): Briefing {
  const { data, body, offset } = parseFrontMatter(raw);
  const lines = body.split("\n");
  const fileDate = path.basename(briefingPath).match(/(\d{4}-\d{2}-\d{2})/)?.[1];
  const date = data.date ?? fileDate ?? "";
  const all = blocks(lines);

  const items = [
    ...fromTopStories(all, briefingPath, date),
    ...fromDetectedStories(all, briefingPath, date),
    ...fromStorylines(all, briefingPath, date),
    ...fromTikTokIdeas(all, briefingPath, date),
  ].map((item) => ({
    ...item,
    provenance: { ...item.provenance, line: item.provenance.line + offset },
  }));

  // Same story can appear in several sections; keep the richest occurrence.
  const bySlug = new Map<string, RadarItem>();
  for (const item of items) {
    const prev = bySlug.get(item.slug);
    if (!prev || item.body.join(" ").length > prev.body.join(" ").length) {
      bySlug.set(item.slug, item);
    }
  }

  return {
    path: briefingPath,
    date,
    generatedAt: data.generated_at,
    type: data.type,
    scope: (data.scope ?? "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    items: [...bySlug.values()],
  };
}

/** Briefing files, newest first. */
export function listBriefings(dir: string = paths.radarDir): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && /\d{4}-\d{2}-\d{2}/.test(f))
    .sort()
    .reverse()
    .map((f) => path.join(dir, f));
}

/** Reads and parses one briefing from disk. */
export function readBriefing(briefingPath: string): Briefing {
  return parseBriefing(briefingPath, fs.readFileSync(briefingPath, "utf8"));
}
