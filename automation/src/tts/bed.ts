/**
 * Instrumental bed for voiceless (text-only) clips.
 *
 * Produces a soft, ffmpeg-synthesised chord pad whose length tracks the scene's
 * word count, exactly like a narration track. Nothing is sampled or downloaded,
 * so there is no asset to license: the pad is generated the same way the visuals
 * are. It exists so a text-only TikTok still clears the audio floor the renderer
 * enforces (a pure-silence track sits at ~-91 dB and is rejected); the mastering
 * stage then normalises this pad to the usual loudness.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { SynthesisRequest, TtsProvider } from "./index";
import { estimateDuration } from "./silent";

/** A quiet, sustained chord (G major: G3, B3, D4). Sines only, so no harshness. */
const CHORD_EXPR =
  "0.22*sin(2*PI*196.00*t)+0.18*sin(2*PI*246.94*t)+0.18*sin(2*PI*293.66*t)";

export class MusicBedProvider implements TtsProvider {
  readonly id = "bed";

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
    const seconds = Number(estimateDuration(text).toFixed(3));
    const fadeOut = Math.max(0, seconds - 0.6).toFixed(3);
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-f",
        "lavfi",
        "-i",
        `aevalsrc=${CHORD_EXPR}:s=22050:d=${seconds}`,
        "-af",
        `tremolo=f=0.25:d=0.5,lowpass=f=1100,afade=t=in:d=0.6,afade=t=out:st=${fadeOut}:d=0.6`,
        outPath,
      ],
      { stdio: "pipe" },
    );
  }
}
