/** ffprobe / ffmpeg measurement helpers used by the output validators. */
import { execFileSync, spawnSync } from "node:child_process";
import type { RenderProbe } from "../types";

export function ffmpegAvailable(): boolean {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "pipe" });
    execFileSync("ffprobe", ["-version"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function probeField(file: string, args: string[]): string {
  return execFileSync("ffprobe", ["-v", "error", ...args, file], { encoding: "utf8" }).trim();
}

/** Duration of a media file in seconds. */
export function durationOf(file: string): number {
  const out = probeField(file, ["-show_entries", "format=duration", "-of", "csv=p=0"]);
  const value = Number.parseFloat(out);
  if (!Number.isFinite(value)) throw new Error(`ffprobe returned no duration for ${file}`);
  return value;
}

/** True when the file carries at least one stream of the given kind. */
export function hasStream(file: string, kind: "video" | "audio" | "subtitle"): boolean {
  return probeField(file, [
    "-select_streams", kind[0],
    "-show_entries", "stream=index",
    "-of", "csv=p=0",
  ]).length > 0;
}

/** `widthxheight` of the first video stream. */
export function dimensionsOf(file: string): { width: number; height: number } {
  const out = probeField(file, [
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0:s=x",
  ]);
  const [w, h] = out.split("x").map((n) => Number.parseInt(n, 10));
  return { width: w, height: h };
}

function codecOf(file: string, kind: "v" | "a"): string {
  return probeField(file, [
    "-select_streams", `${kind}:0`,
    "-show_entries", "stream=codec_name",
    "-of", "csv=p=0",
  ]);
}

function fpsOf(file: string): number {
  const raw = probeField(file, [
    "-select_streams", "v:0",
    "-show_entries", "stream=r_frame_rate",
    "-of", "csv=p=0",
  ]);
  const [num, den] = raw.split("/").map(Number);
  return den ? num / den : num;
}

/**
 * ffmpeg writes filter reports to stderr, not stdout, so these measurements
 * have to be read from stderr — `execFileSync` would hand back an empty string.
 */
function ffmpegReport(args: string[]): string {
  const result = spawnSync("ffmpeg", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  return `${result.stderr ?? ""}${result.stdout ?? ""}`;
}

/** Mean and peak level of the audio track, in dBFS. */
export function volumeOf(file: string): { meanDb: number; maxDb: number } {
  const out = ffmpegReport(["-hide_banner", "-i", file, "-af", "volumedetect", "-f", "null", "-"]);
  const mean = /mean_volume:\s*(-?[\d.]+) dB/.exec(out);
  const max = /max_volume:\s*(-?[\d.]+) dB/.exec(out);
  return {
    meanDb: mean ? Number.parseFloat(mean[1]) : Number.NEGATIVE_INFINITY,
    maxDb: max ? Number.parseFloat(max[1]) : Number.NEGATIVE_INFINITY,
  };
}

/**
 * Fraction of sampled frames that are effectively blank.
 *
 * `blackdetect` reports stretches of near-black picture. A clip that opens or
 * closes on a dead frame, or drops one between transitions, shows up here —
 * the opening and closing fades are excluded from the measurement.
 */
export function blankFrameRatio(file: string, ignoreHeadSec: number, ignoreTailSec: number): number {
  const total = durationOf(file);
  const out = ffmpegReport([
    "-hide_banner", "-i", file,
    "-vf", "blackdetect=d=0.1:pic_th=0.98:pix_th=0.10",
    "-f", "null", "-",
  ]);

  let blank = 0;
  for (const m of out.matchAll(/black_start:([\d.]+) black_end:([\d.]+)/g)) {
    const start = Math.max(Number.parseFloat(m[1]), ignoreHeadSec);
    const end = Math.min(Number.parseFloat(m[2]), total - ignoreTailSec);
    if (end > start) blank += end - start;
  }
  const measured = Math.max(0.001, total - ignoreHeadSec - ignoreTailSec);
  return Math.min(1, blank / measured);
}

/** Every measurement the output validators need, in one pass. */
export function probeRender(file: string, ignoreHeadSec = 0, ignoreTailSec = 0): RenderProbe {
  const { width, height } = dimensionsOf(file);
  const { meanDb, maxDb } = volumeOf(file);
  return {
    durationSec: durationOf(file),
    width,
    height,
    videoCodec: codecOf(file, "v"),
    audioCodec: codecOf(file, "a"),
    hasSubtitleTrack: hasStream(file, "subtitle"),
    fps: fpsOf(file),
    meanVolumeDb: meanDb,
    maxVolumeDb: maxDb,
    blankFrameRatio: blankFrameRatio(file, ignoreHeadSec, ignoreTailSec),
  };
}
