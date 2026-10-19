/**
 * Read-only parser for the long-form research corpus (`research/**`, excluding
 * `research/daily/` which the briefing parser owns).
 *
 * These files already carry the contract the curiosities format needs in their
 * front matter — `id`, `name`, `confidence`, `url`, `last_researched` — so the
 * module reuses them instead of maintaining a second corpus.
 */
import fs from "node:fs";
import path from "node:path";
import type { Confidence, RadarItem, RadarSource } from "../types";
import { paths, repoRoot } from "../config";
import {
  hashContent,
  isHorizontalRule,
  parseFrontMatter,
  plainText,
  slugify,
  startsAsSentence,
} from "./parse";

const CONFIDENCES: Confidence[] = ["CONFIRMED", "REPORTED", "RUMOR", "UNKNOWN"];
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** Research doc `type:` values that describe a story rather than a data dump. */
const STORY_TYPES = [
  "source-review",
  "team",
  "team-spain",
  "competition-spain",
  "story",
  "game",
  "player",
  "history",
];

/** Least to most publishable. Used to resolve compound confidence values. */
const CONFIDENCE_RANK: Record<Confidence, number> = {
  UNKNOWN: 0,
  RUMOR: 1,
  REPORTED: 2,
  CONFIRMED: 3,
};

/**
 * Many research docs qualify confidence per claim, e.g.
 * `REPORTED (fundación) / CONFIRMED (competición)`. A clip may narrate any part
 * of the document, so the *weakest* stated confidence governs the whole thing.
 */
export function asConfidence(raw: string | undefined): Confidence {
  const text = (raw ?? "").toUpperCase();
  const found = CONFIDENCES.filter((c) => new RegExp(`\\b${c}\\b`).test(text));
  if (found.length === 0) return "UNKNOWN";
  return found.reduce((weakest, c) => (CONFIDENCE_RANK[c] < CONFIDENCE_RANK[weakest] ? c : weakest));
}

/** Headings whose contents are editorial notes, not material for a clip. */
const META_HEADING = /qu[eé]\s+hacer|pendiente|todo|siguientes pasos|notas? (para|de) redacci[oó]n|fuentes|sources|discrepancia/i;

/** Paragraphs that are editorial annotations rather than narration. */
const LABEL_PREFIX = /^(nota|notas|fuente|fuentes|pendiente|aviso|todo|ojo|estado|resumen editorial)\s*:/i;

/**
 * Paragraphs that talk about the repository rather than about football. These
 * research docs mix prose with notes to the desk; a sentence naming a source
 * file or a data path is plainly the latter.
 */
const REPO_INTERNALS = /(\bsrc\/|\bresearch\/|\bdocs\/|\.tsx?\b|\.json\b|verification_status|sourceIds)/i;

/**
 * Bare URLs, HTTP status chatter and the confidence vocabulary itself are
 * research apparatus. Narrating "UNKNOWN" or reading a link aloud is nonsense,
 * so these paragraphs are dropped rather than spoken.
 */
const APPARATUS = /(https?:\/\/|\b404\b|\bUNKNOWN\b|\bCONFIRMED\b|\bREPORTED\b|<slug>)/;

/** Lines that do not read aloud: tables, bullets, rules, code, quotes. */
function isProse(line: string): boolean {
  if (line === "") return false;
  if (isHorizontalRule(line)) return false;
  if (line.startsWith("|") || line.startsWith(">") || line.startsWith("```")) return false;
  if (/^[-*+]\s/.test(line) || /^\d+\.\s/.test(line)) return false;
  return true;
}

/**
 * Narratable prose, in document order, skipping fact tables, bullet lists and
 * editorial sections. Sentences are taken verbatim — the script builder is not
 * allowed to compose new ones. The cap is generous because the beat grouping in
 * `script/build.ts` is what finally bounds clip length, per format.
 */
export function narratableProse(body: string, maxParagraphs = 8): string[] {
  const lines = body.split("\n");
  const out: string[] = [];
  let buffer: string[] = [];
  let skipping = false;
  let started = false;
  let fenced = false;

  const flush = () => {
    if (buffer.length) {
      const joined = plainText(buffer.join(" "));
      // Editorial annotations and trailing-colon lead-ins read as notes to the
      // desk, not as narration, so they are dropped rather than spoken.
      const usable =
        joined.length >= 60 &&
        startsAsSentence(joined) &&
        !LABEL_PREFIX.test(joined) &&
        !REPO_INTERNALS.test(joined) &&
        !APPARATUS.test(joined) &&
        !joined.endsWith(":");
      if (usable) out.push(joined);
    }
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      fenced = !fenced;
      flush();
      continue;
    }
    if (fenced) continue;
    if (/^#{1,6}\s/.test(line)) {
      flush();
      const heading = line.replace(/^#{1,6}\s*/, "");
      if (/^#\s/.test(line)) {
        started = true;
        skipping = false;
      } else {
        skipping = META_HEADING.test(heading);
      }
      continue;
    }
    if (!started || skipping) continue;
    if (!isProse(line)) {
      flush();
      continue;
    }
    buffer.push(line);
    if (out.length >= maxParagraphs) break;
  }
  flush();
  return out.slice(0, maxParagraphs);
}

function h1Title(body: string, fallback: string): string {
  const m = /^#\s+(.+)$/m.exec(body);
  return plainText(m ? m[1] : fallback);
}

function extractSources(frontMatterUrl: string | undefined, body: string): RadarSource[] {
  const out: RadarSource[] = [];
  const seen = new Set<string>();
  const push = (label: string, url: string) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ label, url });
  };
  if (frontMatterUrl && /^https?:\/\//.test(frontMatterUrl)) push("fuente principal", frontMatterUrl);
  for (const m of body.matchAll(LINK)) push(m[1].trim(), m[2]);
  return out;
}

/** Parses one research document. Pure: takes content, touches no disk. */
export function parseResearchDoc(docPath: string, raw: string): RadarItem | undefined {
  const { data, body, offset } = parseFrontMatter(raw);
  if (!data.id && !data.name) return undefined;
  if (data.type && !STORY_TYPES.includes(data.type)) return undefined;

  const title = h1Title(body, data.name ?? data.id);
  const paragraphs = narratableProse(body);
  if (!title) return undefined;

  const h1Line = body.split("\n").findIndex((l) => /^#\s/.test(l));
  return {
    slug: slugify(data.id ?? title),
    title,
    body: paragraphs,
    confidence: asConfidence(data.confidence),
    priority: undefined,
    // Research docs are not flagged per-platform; the format decides.
    taggedForVideo: true,
    sources: extractSources(data.url?.replace(/^["']|["']$/g, ""), body),
    provenance: {
      briefingPath: path.relative(repoRoot, docPath),
      briefingDate: data.last_researched ?? "",
      line: (h1Line === -1 ? 0 : h1Line + 1) + offset,
      section: "research-doc",
    },
    contentHash: hashContent(title, paragraphs),
    format: "explainer",
  };
}

/** Research documents, excluding the daily briefings. */
export function listResearchDocs(dir: string = paths.researchDir): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "daily") continue;
        walk(full);
      } else if (entry.name.endsWith(".md")) {
        out.push(full);
      }
    }
  };
  walk(dir);
  return out.sort();
}

export function readResearchDocs(dir: string = paths.researchDir): RadarItem[] {
  return listResearchDocs(dir)
    .map((p) => parseResearchDoc(p, fs.readFileSync(p, "utf8")))
    .filter((item): item is RadarItem => item !== undefined);
}
