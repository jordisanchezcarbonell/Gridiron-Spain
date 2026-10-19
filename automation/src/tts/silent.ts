/**
 * Deterministic narration stub for tests and non-macOS machines.
 *
 * Produces real, probe-able silent audio whose length tracks the word count, so
 * the timing and subtitle code can be exercised without a speech engine.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { SynthesisRequest, TtsProvider } from "./index";

/** Seconds a narrator needs for `text` at `wpm` words per minute. */
export function estimateDuration(text: string, wpm = 170): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, (words / wpm) * 60);
}

export class SilentProvider implements TtsProvider {
  readonly id = "silent";

  available(): boolean {
    try {
      execFileSync("ffmpeg", ["-version"], { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }

  async synthesize({ text, outPath }: SynthesisRequest): Promise<void> {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const seconds = estimateDuration(text).toFixed(3);
    execFileSync(
      "ffmpeg",
      ["-y", "-f", "lavfi", "-i", `anullsrc=r=22050:cl=mono`, "-t", seconds, outPath],
      { stdio: "pipe" },
    );
  }
}
