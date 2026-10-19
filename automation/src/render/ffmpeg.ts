/**
 * Renders a script to a vertical 1080x1920 MP4 with narration and subtitles.
 *
 * Pipeline:
 *   1. narrate each scene separately and measure it with ffprobe
 *   2. force-align the approved words against the narration, so each word's
 *      moment is measured rather than apportioned
 *   3. rasterise one oversized frame per cue (background, branding, caption)
 *   4. animate each frame with a slow push-in and cross-dissolve between cues
 *   5. master the narration to a broadcast-style loudness target
 *   6. mux the narration and a `mov_text` subtitle track, and write a sidecar
 *      `.srt` for editors and for platforms that accept an upload
 *
 * All visuals are generated; no third-party media is read, so a default render
 * carries no rights exposure.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Cue, MediaAsset, RenderResult, Scene, VideoScript } from "../types";
import { audio, motion, video } from "../config";
import { classifyFreshness } from "../script/freshness";
import { formatSpec } from "../formats";
import { buildCues, toSrt } from "../script/srt";
import { buildWordCues, mergeForSubtitles } from "../script/wordcues";
import { createAligner, type AlignerId } from "../align";
import { alignNarration, alignmentSidecar } from "../align/narration";
import type { WordAligner } from "../align/types";
import type { TtsProvider } from "../tts";
import { frameSvg, rasterize, type FrameSpec } from "./svg";
import { durationOf } from "./probe";

function run(args: string[]): void {
  execFileSync("ffmpeg", args, { stdio: "pipe" });
}

/** Narrates every scene and attaches the measured duration. */
export async function narrateScenes(
  scenes: Scene[],
  provider: TtsProvider,
  workDir: string,
): Promise<Scene[]> {
  fs.mkdirSync(workDir, { recursive: true });
  const out: Scene[] = [];
  for (const scene of scenes) {
    const audioPath = path.join(workDir, `${scene.id}.aiff`);
    await provider.synthesize({ text: scene.narration, outPath: audioPath });
    out.push({ ...scene, audioPath, durationSec: durationOf(audioPath) });
  }
  return out;
}

/**
 * Re-encodes any audio to one canonical PCM shape.
 *
 * The concat demuxer requires every input to share stream parameters, and it
 * silently drops the ones that do not match. `say` writes 22.05 kHz AIFF while
 * a hosted voice returns 44.1 kHz MP3, so each piece is normalised before the
 * join rather than trusting the sources to agree.
 */
function toCanonicalWav(input: string, outPath: string): string {
  run([
    "-y", "-v", "error",
    "-i", input,
    "-ac", "1", "-ar", String(audio.sampleRate), "-c:a", "pcm_s16le",
    outPath,
  ]);
  return outPath;
}

function silence(seconds: number, outPath: string): string {
  run([
    "-y", "-v", "error",
    "-f", "lavfi", "-i", `anullsrc=r=${audio.sampleRate}:cl=mono`,
    "-t", seconds.toFixed(3),
    "-ac", "1", "-ar", String(audio.sampleRate), "-c:a", "pcm_s16le",
    outPath,
  ]);
  return outPath;
}

/**
 * Concatenates narration with the scene padding, then masters the result.
 *
 * `loudnorm` brings the mix to the target the platforms normalise to; without
 * it the raw `say` output sits around -17 dB mean and sounds thin next to
 * everything else in the feed.
 */
export function buildNarrationTrack(scenes: Scene[], workDir: string): string {
  const pieces: string[] = [];
  scenes.forEach((scene, i) => {
    if (scene.padBeforeSec > 0) {
      pieces.push(silence(scene.padBeforeSec, path.join(workDir, `pad-pre-${i}.wav`)));
    }
    pieces.push(toCanonicalWav(scene.audioPath!, path.join(workDir, `voice-${i}.wav`)));
    if (scene.padAfterSec > 0) {
      pieces.push(silence(scene.padAfterSec, path.join(workDir, `pad-post-${i}.wav`)));
    }
  });

  const listPath = path.join(workDir, "narration.txt");
  fs.writeFileSync(
    listPath,
    pieces.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"),
    "utf8",
  );

  const rawPath = path.join(workDir, "narration-raw.wav");
  run(["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listPath,
    "-ac", "1", "-ar", String(audio.sampleRate), "-c:a", "pcm_s16le", rawPath]);

  const expected = scenes.reduce(
    (t, s) => t + s.padBeforeSec + (s.durationSec ?? 0) + s.padAfterSec,
    0,
  );
  const actual = durationOf(rawPath);
  if (Math.abs(actual - expected) > 0.75) {
    throw new Error(
      `narration track is ${actual.toFixed(2)}s but the script plans ${expected.toFixed(2)}s; ` +
        "a concat input was dropped (mismatched audio parameters)",
    );
  }

  const masteredPath = path.join(workDir, "narration.wav");
  const chain = [
    `loudnorm=I=${audio.targetLufs}:TP=${audio.truePeakDb}:LRA=${audio.loudnessRange}`,
    `afade=t=in:st=0:d=${audio.fadeInSec}`,
    `afade=t=out:st=${Math.max(0, actual - audio.fadeOutSec).toFixed(3)}:d=${audio.fadeOutSec}`,
  ].join(",");
  run(["-y", "-v", "error", "-i", rawPath, "-af", chain,
    "-ar", String(audio.sampleRate), "-ac", "1", masteredPath]);

  return masteredPath;
}

/** Today, injectable so a render is reproducible in tests. */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface RenderOptions {
  script: VideoScript;
  provider: TtsProvider;
  /** Directory for the finished artefacts. */
  outDir: string;
  /** Scratch directory for intermediates. Defaults to `<outDir>/.work/<slug>`. */
  workDir?: string;
  /** Reference date for the freshness label. */
  now?: string;
  /**
   * Which word aligner to use. Defaults to the forced aligner; `none` renders
   * with apportioned card timings and flags the clip for review.
   */
  aligner?: AlignerId;
  /** An aligner instance, for tests. Takes precedence over `aligner`. */
  alignerInstance?: WordAligner;
  /** Ignore the alignment cache and realign. */
  refreshAlignment?: boolean;
}

export interface RenderOutcome extends RenderResult {
  /** One cue per word when aligned, one per card otherwise. Drives the frames. */
  cues: Cue[];
  /** The subtitle cards: what the SRT carries and what the validators judge. */
  cards: Cue[];
  scenes: Scene[];
  /** How the cue timings were obtained, and how well. */
  alignment: {
    method: "forced" | "apportioned";
    aligner?: string;
    coverage?: number;
    /** Path of the per-word JSON, when there is one. */
    path?: string;
    /** One line for the run report. */
    summary: string;
    /**
     * Set when the timings are not measured. A clip carrying this has not got
     * word-accurate subtitles and must be watched before it goes out.
     */
    pendingReview?: string;
  };
}

/** Human-readable source credit for the on-screen attribution. */
export function sourceLabel(script: VideoScript): string | undefined {
  if (script.sources.length === 0) return undefined;
  const names = script.sources.slice(0, 2).map((s) => {
    try {
      return new URL(s.url).hostname.replace(/^www\./, "");
    } catch {
      return s.label;
    }
  });
  const unique = [...new Set(names)];
  const extra = script.sources.length > unique.length ? ` +${script.sources.length - unique.length}` : "";
  return `Fuente: ${unique.join(" · ")}${extra}`;
}

export async function render(options: RenderOptions): Promise<RenderOutcome> {
  const { script, provider, outDir } = options;
  const workDir = options.workDir ?? path.join(outDir, ".work", script.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.rmSync(workDir, { recursive: true, force: true });
  fs.mkdirSync(workDir, { recursive: true });

  const scenes = await narrateScenes(script.scenes, provider, workDir);
  const narrationPath = buildNarrationTrack(scenes, workDir);
  const totalSec = durationOf(narrationPath);

  // Where each word actually falls, measured against the track that will be
  // muxed. Cards used to be given a share of the scene's time in proportion to
  // their length, which drifted audibly across every pause the narrator took.
  const aligned = await alignNarration({
    scenes,
    narrationPath,
    totalSec,
    cacheRoot: outDir,
    aligner: options.alignerInstance ?? createAligner(options.aligner ?? "torchaudio"),
    refresh: options.refreshAlignment,
  });

  let cues: Cue[];
  let cards: Cue[];
  const alignment: RenderOutcome["alignment"] = aligned.usable
    ? {
        method: "forced",
        aligner: aligned.result!.aligner,
        coverage: aligned.result!.coverage,
        summary: aligned.summary,
      }
    : {
        method: "apportioned",
        summary: aligned.summary,
        // Stated on the clip rather than glossed over: without measured
        // timings these subtitles are a reasonable guess, and calling them
        // word-accurate would be a claim nobody checked.
        pendingReview:
          `subtitle timings are apportioned, not measured: ${aligned.reason}. ` +
          "Watch the clip before publishing.",
      };

  if (aligned.usable) {
    cues = buildWordCues(scenes, aligned.wordsByScene, totalSec);
    cards = mergeForSubtitles(cues);
  } else {
    cues = buildCues(scenes);
    cards = cues;
  }

  if (aligned.result) {
    const alignmentPath = path.join(outDir, `${script.slug}.alignment.json`);
    fs.writeFileSync(alignmentPath, alignmentSidecar(aligned.result, script.slug), "utf8");
    alignment.path = alignmentPath;
  }

  const srtPath = path.join(outDir, `${script.slug}.srt`);
  fs.writeFileSync(srtPath, toSrt(cards), "utf8");

  const spec = formatSpec(script.format);
  const freshness = classifyFreshness(script.provenance.briefingDate, options.now ?? today());
  const frameSpec: FrameSpec = {
    template: spec.template,
    // The kicker states what the material *is*, not what we wish it were.
    kicker: spec.id === "news" ? freshness.kicker : spec.kicker,
    accent: spec.accent,
    meta: freshness.dateNote,
    sourceLabel: sourceLabel(script),
    numberBeats: spec.numberBeats,
    evidenceText: script.scenes.map((s) => s.narration).join(" "),
  };

  // Each cue is a short entry animation followed by a held frame. The chrome
  // is identical in every frame, so it never flickers; only the caption and
  // its graphic move. This replaced a cross-fade between whole flat frames,
  // which visibly doubled the accent bar and the brand lockup mid-transition.
  const entryFrames = Math.max(1, Math.round(motion.entrySec * video.fps));
  const listPath = path.join(workDir, "frames.txt");
  const listLines: string[] = [];
  let lastPng = "";

  cues.forEach((cue, i) => {
    const stem = String(i + 1).padStart(3, "0");
    const cueSeconds = Math.max(0.3, cue.endSec - cue.startSec);
    const animated = Math.min(entryFrames, Math.floor(cueSeconds * video.fps) - 1);

    for (let f = 0; f < animated; f++) {
      const png = rasterize(
        frameSvg(cue, frameSpec, { t: (f + 1) / animated }),
        path.join(workDir, `frame-${stem}-${String(f).padStart(2, "0")}.png`),
      );
      listLines.push(`file '${png.replace(/'/g, "'\\''")}'`);
      listLines.push(`duration ${(1 / video.fps).toFixed(4)}`);
      lastPng = png;
    }

    const held = rasterize(
      frameSvg(cue, frameSpec, { t: 1 }),
      path.join(workDir, `frame-${stem}-hold.png`),
    );
    const holdSeconds = Math.max(0.04, cueSeconds - animated / video.fps);
    listLines.push(`file '${held.replace(/'/g, "'\\''")}'`);
    listLines.push(`duration ${holdSeconds.toFixed(4)}`);
    lastPng = held;
  });

  // The concat demuxer drops the final entry's duration unless the last file
  // is repeated, which would otherwise cut the closing frame short.
  listLines.push(`file '${lastPng.replace(/'/g, "'\\''")}'`);
  fs.writeFileSync(listPath, `${listLines.join("\n")}\n`, "utf8");

  const videoPath = path.join(outDir, `${script.slug}.mp4`);
  const fadeOutStart = Math.max(0, totalSec - motion.closeFadeSec);
  run([
    "-y", "-hide_banner", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listPath,
    "-i", narrationPath,
    "-i", srtPath,
    "-map", "0:v", "-map", "1:a", "-map", "2:s",
    "-vf", [
      `fps=${video.fps}`,
      `fade=t=in:st=0:d=${motion.openFadeSec}`,
      `fade=t=out:st=${fadeOutStart.toFixed(3)}:d=${motion.closeFadeSec}`,
      "format=yuv420p",
    ].join(","),
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "20",
    "-profile:v", "high", "-level", "4.0",
    "-r", String(video.fps),
    "-c:a", "aac", "-b:a", "160k", "-ar", String(audio.sampleRate),
    "-c:s", "mov_text", "-metadata:s:s:0", "language=spa",
    "-movflags", "+faststart",
    "-t", totalSec.toFixed(3),
    videoPath,
  ]);

  const scriptPath = path.join(outDir, `${script.slug}.script.json`);
  fs.writeFileSync(
    scriptPath,
    `${JSON.stringify(
      { ...script, scenes, cues, cards, alignment, renderedWith: provider.id },
      null,
      2,
    )}\n`,
    "utf8",
  );

  return {
    slug: script.slug,
    format: script.format,
    videoPath,
    srtPath,
    scriptPath,
    durationSec: durationOf(videoPath),
    width: video.width,
    height: video.height,
    assets: generatedAssets(),
    cues,
    cards,
    scenes,
    alignment,
  };
}

/**
 * The assets a default render uses. Everything is synthesised here, which is
 * what lets the rights validator pass without any written permission on file.
 */
export function generatedAssets(): MediaAsset[] {
  return [
    { path: "generated:gradient-background", license: "generated", rightsHolder: "Gridiron Spain" },
    { path: "generated:field-motif", license: "generated", rightsHolder: "Gridiron Spain" },
    { path: "generated:brand-lockup", license: "generated", rightsHolder: "Gridiron Spain" },
    { path: "generated:caption-cards", license: "generated", rightsHolder: "Gridiron Spain" },
    // Sports graphics are our own geometry drawn from figures the grounding
    // check has already tied to the source — no photography, no club marks,
    // no broadcast stills, so nothing here needs a licence.
    { path: "generated:scoreboard", license: "generated", rightsHolder: "Gridiron Spain" },
    { path: "generated:rank-ladder", license: "generated", rightsHolder: "Gridiron Spain" },
  ];
}
