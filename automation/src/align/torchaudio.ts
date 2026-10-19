/**
 * Forced alignment through torchaudio's MMS_FA bundle.
 *
 * Chosen after WhisperX turned out not to be installable here: every current
 * WhisperX release caps at Python < 3.14 and this machine runs 3.14.7, and the
 * one version that resolves pins `ctranslate2==4.4.0`, which has no 3.14 wheel.
 * `torchaudio` does ship cp314 wheels, and its `MMS_FA` bundle is a
 * multilingual CTC forced aligner that covers Spanish.
 *
 * Forced alignment, not recognition: the word sequence comes from the approved
 * script and the model only decides where each word falls. It cannot rewrite a
 * figure, a name or a claim, because it is never asked what was said.
 *
 * Setup (about 2 GB, one time):
 *
 *   python3 -m venv ~/.cache/gridiron-spain/aligner-venv
 *   ~/.cache/gridiron-spain/aligner-venv/bin/pip install torch torchaudio soundfile numpy
 *
 * The model (~1.2 GB) downloads itself on first use into ~/.cache/torch.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { repoRoot } from "../config";
import { toSpokenForm } from "./spoken";
import { applyConfidenceFloor, validateAlignment } from "./validate";
import type { AlignmentRequest, AlignmentResult, WordAligner, WordTiming } from "./types";

/** Bumped when anything that changes the timings changes. Part of the cache key. */
export const TORCHAUDIO_ALIGNER_VERSION = "mms_fa-1";

/** Where the setup instructions put the virtualenv. */
export const DEFAULT_VENV = path.join(
  os.homedir(),
  ".cache",
  "gridiron-spain",
  "aligner-venv",
  "bin",
  "python",
);

export interface TorchaudioAlignerOptions {
  /** Python with torch, torchaudio and soundfile. */
  python?: string;
  /** The helper script. Defaults to the one in this repo. */
  script?: string;
  /** Wall clock for one alignment. The model load dominates. */
  timeoutMs?: number;
}

interface HelperResponse {
  ok: boolean;
  error?: string;
  audioSec?: number;
  model?: string;
  words?: { start: number; end: number; score: number }[];
}

export class TorchaudioAligner implements WordAligner {
  readonly id = "torchaudio-mms-fa";
  readonly version = TORCHAUDIO_ALIGNER_VERSION;

  private readonly python: string;
  private readonly script: string;
  private readonly timeoutMs: number;

  constructor(options: TorchaudioAlignerOptions = {}) {
    this.python = options.python ?? process.env.PRIMERDOWN_ALIGNER_PYTHON ?? DEFAULT_VENV;
    this.script = options.script ?? path.join(repoRoot, "automation", "aligner", "align.py");
    this.timeoutMs = options.timeoutMs ?? 300_000;
  }

  /** Both the interpreter and the helper must exist before this can run. */
  available(): boolean {
    return fs.existsSync(this.python) && fs.existsSync(this.script);
  }

  async align(request: AlignmentRequest): Promise<AlignmentResult> {
    const { tokens, owner, written } = toSpokenForm(request.words);

    const base: Omit<AlignmentResult, "words" | "coverage" | "problems" | "usable"> = {
      method: "forced",
      aligner: this.id,
      version: this.version,
      language: request.language,
      audioSec: request.audioSec,
    };

    if (tokens.length === 0) {
      return {
        ...base,
        words: unlocated(written),
        coverage: 0,
        problems: ["the script produced no pronounceable tokens"],
        usable: false,
      };
    }

    let response: HelperResponse;
    try {
      const stdout = execFileSync(this.python, [this.script], {
        input: JSON.stringify({ audio: request.audioPath, words: tokens }),
        encoding: "utf8",
        timeout: this.timeoutMs,
        maxBuffer: 32 * 1024 * 1024,
        // The helper writes progress to stderr; only stdout carries the result.
        stdio: ["pipe", "pipe", "ignore"],
      });
      response = JSON.parse(stdout) as HelperResponse;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        ...base,
        words: unlocated(written),
        coverage: 0,
        problems: [`the aligner did not run: ${message.slice(0, 200)}`],
        usable: false,
      };
    }

    if (!response.ok || !response.words) {
      return {
        ...base,
        words: unlocated(written),
        coverage: 0,
        problems: [response.error ?? "the aligner returned no words"],
        usable: false,
      };
    }

    if (response.words.length !== tokens.length) {
      return {
        ...base,
        words: unlocated(written),
        coverage: 0,
        problems: [
          `the aligner returned ${response.words.length} spans for ${tokens.length} tokens`,
        ],
        usable: false,
      };
    }

    // Fold the spoken tokens back onto the words the subtitles will show: a
    // written word spans from its first token's start to its last token's end,
    // and is only as trustworthy as its weakest token.
    const spans = response.words;
    const words: WordTiming[] = written.map((text, index) => {
      const mine = spans.filter((_, i) => owner[i] === index);
      if (mine.length === 0) {
        return { text, startSec: 0, endSec: 0, confidence: null, located: false };
      }
      return {
        text,
        startSec: Math.min(...mine.map((s) => s.start)),
        endSec: Math.max(...mine.map((s) => s.end)),
        confidence: Math.min(...mine.map((s) => s.score)),
        located: true,
      };
    });

    const audioSec = response.audioSec ?? request.audioSec;
    const floored = applyConfidenceFloor(words);
    const outcome = validateAlignment(floored, audioSec);

    return {
      ...base,
      audioSec,
      words: floored,
      coverage: outcome.coverage,
      problems: outcome.problems,
      usable: outcome.usable,
    };
  }
}

/** Words carried through with no timing, because none was measured. */
function unlocated(written: string[]): WordTiming[] {
  return written.map((text) => ({
    text,
    startSec: 0,
    endSec: 0,
    confidence: null,
    located: false,
  }));
}
