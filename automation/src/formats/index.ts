/**
 * The two clip formats and their visual templates.
 *
 * A format decides only *shape*: how many beats, how long, which template, what
 * the opening and closing cards say. It never supplies facts — every factual
 * sentence in a clip comes from the radar briefing or the research document it
 * was built from.
 */
import type { ClipFormat, TemplateId } from "../types";
import { branding } from "../config";

export interface FormatSpec {
  id: ClipFormat;
  template: TemplateId;
  label: string;
  /** Where the material comes from, for the run report. */
  source: string;
  /** Target clip length; the duration validator enforces the band. */
  targetDurationSec: number;
  minDurationSec: number;
  maxDurationSec: number;
  /** Maximum narrated body beats between the hook and the conclusion. */
  maxBodyBeats: number;
  /** Words per beat before the builder splits a sentence group. */
  wordsPerBeat: number;
  /** Kicker printed on the chip. Contains no claims. */
  kicker: string;
  /**
   * Minimum distinct source links before a clip may be generated. EXPLAINER
   * draws on long-form research and must be corroborated; NEWS cites the
   * briefing's own link.
   */
  minSources: number;
  /** Minimum narratable sentences the source must supply. */
  minEvidence: number;
  /** Accent colour for the chip, rule and progress bar. */
  accent: string;
  /** Whether beats are numbered on screen (1/5, 2/5 …). */
  numberBeats: boolean;
}

export const FORMATS: Record<ClipFormat, FormatSpec> = {
  news: {
    id: "news",
    template: "news",
    label: "NEWS — noticias actuales",
    source: "research/daily/*.md (radar briefings)",
    // 20-45s: a radar briefing carries ~40 words per story, which narrates to
    // the high twenties. The old 30s floor forced either padding or a standing
    // warning on every news clip; this band is what the material supports.
    targetDurationSec: 32,
    minDurationSec: 20,
    maxDurationSec: 45,
    maxBodyBeats: 4,
    wordsPerBeat: 16,
    kicker: "AHORA",
    minSources: 1,
    minEvidence: 2,
    accent: branding.accent,
    numberBeats: false,
  },
  explainer: {
    id: "explainer",
    template: "explainer",
    label: "EXPLAINER — curiosidades e historias",
    source: "research/**/*.md (long-form research, excluding daily)",
    targetDurationSec: 50,
    minDurationSec: 30,
    maxDurationSec: 75,
    maxBodyBeats: 5,
    wordsPerBeat: 20,
    kicker: "HISTORIA",
    // A research document that is only a fact table yields no narratable
    // sentences and cannot become an honest explainer; it is rejected rather
    // than paraphrased into one.
    minSources: 2,
    minEvidence: 4,
    accent: branding.accentAlt,
    numberBeats: true,
  },
};

export function formatSpec(format: ClipFormat): FormatSpec {
  return FORMATS[format];
}

/** Accepts the old `curiosity` spelling so existing ledgers keep resolving. */
export function normalizeFormat(raw: string): ClipFormat | undefined {
  const value = raw.trim().toLowerCase();
  if (value === "news") return "news";
  // "curiosity" was the original id; ledgers and scripts written before the
  // rename must keep resolving.
  if (value === "explainer" || value === "curiosity") return "explainer";
  return undefined;
}
