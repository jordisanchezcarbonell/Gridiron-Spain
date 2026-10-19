/**
 * Shared types for the TikTok module.
 *
 * The module is a read-only consumer of the content radar (`research/daily/*.md`,
 * produced by the `/football-daily` skill). Nothing here writes to `research/`,
 * `src/data/` or the skill definitions.
 */

/**
 * The two clip formats.
 *  - `news`: current news, sourced from the daily radar briefings.
 *  - `explainer`: evergreen stories, from long-form `research/**` docs.
 */
export type ClipFormat = "news" | "explainer";

/** Visual template used to draw the frames. */
export type TemplateId = "news" | "explainer";

/** What a scene is for, which decides how its frame is drawn. */
export type SceneKind = "hook" | "beat" | "outro";

/** Confidence vocabulary of the research system (see CLAUDE.md). */
export type Confidence = "CONFIRMED" | "REPORTED" | "RUMOR" | "UNKNOWN";

/** Which radar section a candidate was lifted from. */
export type RadarSection =
  | "top-stories"
  | "storylines"
  | "tiktok-ideas"
  | "detected-stories"
  | "research-doc";

/** A source link as printed by the radar. */
export interface RadarSource {
  label: string;
  url: string;
}

/** Where a candidate came from, so every clip can be traced back to the briefing. */
export interface Provenance {
  /** Repo-relative path of the briefing file. */
  briefingPath: string;
  /** `date` from the briefing front matter (YYYY-MM-DD). */
  briefingDate: string;
  /** 1-indexed line of the heading the candidate was parsed from. */
  line: number;
  section: RadarSection;
}

/**
 * One video candidate as found in a briefing. `body` holds the radar's own
 * sentences verbatim — the script builder never adds facts of its own.
 */
export interface RadarItem {
  /** Stable kebab-case identity, derived from the title. Dedup key. */
  slug: string;
  title: string;
  body: string[];
  confidence: Confidence;
  /** 1-5 editorial priority if the radar stated one. */
  priority?: number;
  /** True when the radar explicitly tagged the item for TikTok/Reels. */
  taggedForVideo: boolean;
  sources: RadarSource[];
  provenance: Provenance;
  /** Hash of title + body, so a materially changed story can be re-cut. */
  contentHash: string;
  format: ClipFormat;
}

/** Front matter + candidates of a single briefing file. */
export interface Briefing {
  path: string;
  date: string;
  generatedAt?: string;
  type?: string;
  scope: string[];
  items: RadarItem[];
}

/** One spoken beat of a clip. */
export interface Scene {
  id: string;
  kind: SceneKind;
  /** Narrated line. Always text that came from the radar (or a fact-free CTA). */
  narration: string;
  /** Short burned-in caption. Derived from `narration`, never new facts. */
  caption: string;
  /** 1-based position among body beats, for on-screen numbering. */
  beatIndex?: number;
  beatTotal?: number;
  /** Measured duration of the rendered narration audio, in seconds. */
  durationSec?: number;
  /** Silence held after the narration, so cards breathe. */
  padAfterSec: number;
  /** Silence before the narration. Used for the opening card. */
  padBeforeSec: number;
  /** Path of the rendered narration audio for this scene. */
  audioPath?: string;
}

/** A full clip script, ready to render. */
export interface VideoScript {
  slug: string;
  title: string;
  locale: "es" | "en";
  confidence: Confidence;
  format: ClipFormat;
  scenes: Scene[];
  /** Target length the format asks for, used by the duration validator. */
  targetDurationSec: number;
  /** Source sentences the format had no room for. Reported, never hidden. */
  omittedBeats: string[];
  sources: RadarSource[];
  provenance: Provenance;
  contentHash: string;
}

/** A subtitle cue with absolute timings. */
export interface Cue {
  index: number;
  startSec: number;
  endSec: number;
  text: string;
  /** The scene this cue belongs to, so the renderer can pick a template. */
  sceneId: string;
  kind: SceneKind;
  beatIndex?: number;
  beatTotal?: number;
  /** 0..1 position through the clip, for the progress bar. */
  progress: number;
  /** Type size chosen by the fitter for this card. */
  fontSize: number;
  /**
   * The word being spoken at this moment, highlighted on the card. Set only
   * when the cue came from measured word timings; absent for whole-card cues.
   */
  activeWord?: string;
  /**
   * Position of `activeWord` among the card's words. Carried separately
   * because a short card can repeat a word ("de ... de") and the renderer
   * must highlight the one actually being spoken, not the first match.
   */
  activeWordIndex?: number;
}

/** What a finished render produced on disk. */
export interface RenderResult {
  slug: string;
  format: ClipFormat;
  videoPath: string;
  srtPath: string;
  scriptPath: string;
  durationSec: number;
  width: number;
  height: number;
  assets: MediaAsset[];
}

/** Measurements taken from the finished file, used by the output validators. */
export interface RenderProbe {
  durationSec: number;
  width: number;
  height: number;
  videoCodec: string;
  audioCodec: string;
  hasSubtitleTrack: boolean;
  fps: number;
  /** Mean and peak of the mastered mix, in dBFS. */
  meanVolumeDb: number;
  maxVolumeDb: number;
  /** Fraction of sampled frames that are effectively blank. */
  blankFrameRatio: number;
}

/**
 * A media file used in a render. Every entry needs an explicit licence and
 * rights holder: the rights validator refuses anything it cannot attribute.
 */
export interface MediaAsset {
  /** Repo-relative path, or `generated:<kind>` for ffmpeg-synthesised visuals. */
  path: string;
  /** e.g. "CC BY 2.0", "own work", "generated". */
  license: string;
  rightsHolder: string;
  sourceUrl?: string;
  /** Set only when the editor holds written permission beyond the licence. */
  writtenPermission?: boolean;
}

/** Outcome of one validation rule. */
export interface ValidationIssue {
  rule:
    | "sources"
    | "duplicates"
    | "media-rights"
    | "duration"
    | "confidence"
    | "legibility"
    | "dimensions"
    | "codecs"
    | "audio"
    | "blank-frames"
    | "language"
    | "generation"
    | "quality";
  severity: "error" | "warning";
  message: string;
}

/** One line of the dedup ledger. */
export interface LedgerEntry {
  slug: string;
  title: string;
  briefingDate: string;
  contentHash: string;
  producedAt: string;
  videoPath: string;
  format: ClipFormat;
  /** Identity of the real-world event, so two wordings of one story collide. */
  eventKey?: string;
  /** Fingerprint of the narration, for near-duplicate detection. */
  scriptFingerprint?: string;
  /** Narration text kept for similarity comparison against future scripts. */
  narration?: string;
  /** Which engine wrote it. */
  generator?: string;
}
