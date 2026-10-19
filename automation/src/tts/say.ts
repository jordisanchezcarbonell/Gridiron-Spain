/**
 * macOS `say` narration provider. Local, offline, no credentials.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { SynthesisRequest, TtsProvider } from "./index";
import { tts } from "../config";

export class SayProvider implements TtsProvider {
  readonly id = "macos-say";

  constructor(
    private readonly voice: string = tts.voice,
    private readonly rate: number = tts.rate,
  ) {}

  available(): boolean {
    if (process.platform !== "darwin") return false;
    try {
      execFileSync("/usr/bin/say", ["-v", "?"], { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }

  /** True when the configured voice is installed. */
  voiceInstalled(): boolean {
    try {
      const list = execFileSync("/usr/bin/say", ["-v", "?"], { encoding: "utf8" });
      const fold = (s: string) =>
        s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
      return list.split("\n").some((line) => fold(line).startsWith(fold(this.voice)));
    } catch {
      return false;
    }
  }

  async synthesize({ text, outPath }: SynthesisRequest): Promise<void> {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const args = ["-r", String(this.rate), "-o", outPath, "--data-format=BEI16@22050"];
    if (this.voiceInstalled()) args.unshift("-v", this.voice);
    execFileSync("/usr/bin/say", [...args, text], { stdio: "pipe" });
  }
}
