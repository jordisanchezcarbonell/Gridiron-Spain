/**
 * Module configuration. Paths resolve from the repo root so the CLI can run
 * from anywhere. Nothing here is read by the Next.js app.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
/** automation/src -> repo root */
export const repoRoot = path.resolve(here, "..", "..");

export const paths = {
  /** Read-only: the content radar's output directory. */
  radarDir: path.join(repoRoot, "research", "daily"),
  /** Read-only: long-form research the explainer format draws on. */
  researchDir: path.join(repoRoot, "research"),
  /** Generated artifacts. Gitignored. */
  outDir: path.join(repoRoot, "out", "tiktok"),
  /** Committed dedup ledger, so dedup survives clean checkouts. */
  ledger: path.join(repoRoot, "automation", "state", "produced.json"),
  /** Licence manifest for any non-generated media. */
  assetManifest: path.join(repoRoot, "automation", "assets", "manifest.json"),
} as const;

/** Vertical 9:16 for TikTok / Reels / Shorts. */
export const video = {
  width: 1080,
  height: 1920,
  fps: 30,
  /** Hard outer bounds; each format narrows this further. */
  maxDurationSec: 75,
  minDurationSec: 20,
  /**
   * Below this a clip is broken, not merely short, and is always rejected.
   * The format bands (NEWS 20-45s, EXPLAINER 30-75s) sit above it.
   */
  absoluteMinDurationSec: 15,
} as const;

/**
 * TikTok safe areas at 1080x1920.
 *
 * The app draws its own chrome over the video: the caption, username and music
 * ticker sit along the bottom, the like/comment/share rail runs up the right
 * edge, and the progress bar and "Following / For You" tabs cover the top.
 * Nothing that must be read may enter these bands.
 */
export const safeArea = {
  top: 240,
  bottom: 440,
  left: 80,
  /** Wider than `left` to clear the action-button rail. */
  right: 220,
} as const;

/** The readable box, derived from the safe areas. */
export const safeBox = {
  x: safeArea.left,
  y: safeArea.top,
  width: video.width - safeArea.left - safeArea.right,
  height: video.height - safeArea.top - safeArea.bottom,
  get centerX() {
    return this.x + this.width / 2;
  },
} as const;

/** Primer Down branding, signed by the editorial project. Colours only. */
export const branding = {
  background: "#0B1220",
  backgroundAlt: "#111B2E",
  accent: "#C8102E",
  accentAlt: "#1D7A8C",
  foreground: "#F5F7FA",
  muted: "#8B99AD",
  // Gridiron Spain is the lead identity, per GRIDIRON-TIKTOK-06 §5.2.
  wordmark: "GRIDIRON SPAIN",
  byline: "futbol americano en españa",
  handle: "primerdown.jordisanchezweb.es",
} as const;

export const typography = {
  stack: "Helvetica Neue, Helvetica, Arial, sans-serif",
  /** Hook headline, and how small it may shrink to fit a long compound word. */
  hookSize: 86,
  hookMinSize: 56,
  /** Body captions. */
  captionSize: 62,
  captionMinSize: 46,
  kickerSize: 38,
  wordmarkSize: 44,
  metaSize: 28,
  sourceSize: 30,
  lineHeightRatio: 1.22,
} as const;

/**
 * Characters that fit one line of the safe box at a given size.
 * Helvetica bold averages ~0.56em per character.
 */
export function charsPerLine(fontSize: number): number {
  return Math.floor(safeBox.width / (fontSize * 0.56));
}

export const captions = {
  /** Derived from the safe box, so wrapping and the legibility check agree. */
  wrapAt: charsPerLine(typography.captionSize),
  /**
   * Four lines, not three. The safe box is 1240px tall and four lines of body
   * type occupy under 310px, while a three-line cap forced long sentences to be
   * hard-split mid-phrase because no clause boundary fit the remaining room.
   */
  maxLines: 4,
  /** Hook cards get bigger type, so they wrap sooner. */
  hookWrapAt: charsPerLine(typography.hookSize),
  hookMaxLines: 4,
} as const;

/**
 * Screen time added around narration. This is what lets a 44-word news item
 * fill a 30s clip without inventing a single word: the hook card is held, beats
 * breathe, and the clip closes on a branded end card.
 */
export const timing = {
  /**
   * Silence before the first word. Short: the card animates in, it does not
   * need to be stared at.
   */
  leadInSec: 0.35,
  /**
   * Held after the hook's narration. The whole hook scene must land inside
   * 3-5s; v1 spent 6.0s on it and lost people before the first fact.
   */
  hookHoldSec: 0.7,
  /** Silence between body beats. Enough to breathe, not to drift. */
  beatGapSec: 0.3,
  /**
   * Held after the closing line. v1 sat 3.4s on a static end card, which read
   * as the video having already finished.
   */
  outroHoldSec: 1.2,
  /** Minimum time any single caption stays on screen. */
  minCueSec: 1.2,
} as const;

/** Motion and transitions. Subtle: the text must stay readable. */
export const motion = {
  /** Slow push-in across each scene, as a fraction of frame size. */
  zoomPerScene: 0.06,
  /**
   * Transition between cards.
   *
   * A slide was tried first, to avoid double-exposing text. But every cue is
   * rendered as one flat full-frame image, so sliding moved the *chrome* too:
   * for the length of the transition the viewer saw two accent bars and two
   * brand lockups stacked and travelling, which reads as a glitch rather than
   * as motion.
   *
   * A cross-dissolve leaves the chrome perfectly still — it is identical in
   * both frames, so it dissolves into itself and nothing appears to happen —
   * and only the caption crossfades. Kept short so that crossfade reads as a
   * soft cut rather than a smear.
   */
  transition: "fade",
  transitionSec: 0.2,
  /** How long a card's caption takes to settle into place. */
  entrySec: 0.32,
  /** Fade from/to black at the clip edges. */
  openFadeSec: 0.4,
  closeFadeSec: 0.5,
} as const;

/** Audio mastering targets. TikTok normalises to roughly -14 LUFS. */
export const audio = {
  targetLufs: -14,
  truePeakDb: -1.5,
  loudnessRange: 11,
  fadeInSec: 0.15,
  fadeOutSec: 0.4,
  sampleRate: 44100,
  /** Validation band for the finished mix's mean volume. */
  minMeanDb: -24,
  maxPeakDb: -0.5,
} as const;

export const tts = {
  /** macOS `say` voice. `say -v '?'` lists the installed ones. */
  voice: "Mónica",
  /** Words per minute. Slower than default: narration, not an announcement. */
  rate: 138,
} as const;

/**
 * Minimum confidence a radar item needs before it can become a clip.
 * RUMOR and UNKNOWN are never rendered (CLAUDE.md credibility rules).
 */
export const publishableConfidence = ["CONFIRMED", "REPORTED"] as const;

/**
 * Buffer publishing is DISABLED until the editor approves it in writing.
 *
 * Deliberately a hardcoded constant rather than an environment variable: no env
 * file, CLI flag or MCP call can turn publishing on. Enabling it takes a code
 * change plus a decision recorded in AGENTS.md.
 */
export const BUFFER_PUBLISHING_ENABLED = false as const;

/**
 * Fact-free closing line: contains no claims, so it is safe to append.
 *
 * It names the brand, so it has to track it. Earlier CTAs are listed below so
 * a script approved under a previous brand can have just this sentence
 * refreshed on replay — it is our own template text, never model output.
 */
export const ctaLine = "Lo seguimos en Gridiron Spain.";

/** CTAs this project has used, newest last. */
export const KNOWN_CTA_LINES = [
  "Lo seguimos en Primer Down.",
  "Lo seguimos en Gridiron Spain.",
] as const;
