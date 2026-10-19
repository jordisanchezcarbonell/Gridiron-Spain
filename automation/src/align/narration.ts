/**
 * Aligning a clip's narration track.
 *
 * The aligner runs once, against the finished narration, rather than once per
 * scene: one model load instead of a dozen, and the timings come back on the
 * clip's own timeline, so nothing has to be offset afterwards. The words are
 * then handed back to the caller split by scene, because that is how the
 * renderer draws them.
 */
import type { Scene } from "../types";
import { alignWords } from "./index";
import { writtenWords } from "./spoken";
import { describeAlignment } from "./validate";
import type { AlignmentResult, WordAligner, WordTiming } from "./types";

export interface NarrationAlignmentOptions {
  scenes: Scene[];
  /** The mastered narration track the clip is muxed with. */
  narrationPath: string;
  /** Measured length of that track. */
  totalSec: number;
  /** Directory the alignment cache lives under. */
  cacheRoot: string;
  aligner?: WordAligner;
  language?: string;
  refresh?: boolean;
}

export interface NarrationAlignment {
  /** The raw result, kept whether or not it was usable, for the report. */
  result?: AlignmentResult;
  /** Words per scene, parallel to `scenes`. Empty when unusable. */
  wordsByScene: WordTiming[][];
  usable: boolean;
  /** Why the timings cannot be used, when they cannot. */
  reason?: string;
  fromCache: boolean;
  /** One line for the run report. */
  summary: string;
}

export async function alignNarration(
  options: NarrationAlignmentOptions,
): Promise<NarrationAlignment> {
  const { scenes, narrationPath, totalSec, cacheRoot, aligner, refresh } = options;
  const language = options.language ?? "es";

  const perScene = scenes.map((scene) => writtenWords(scene.narration));
  const words = perScene.flat();

  const unusable = (reason: string, result?: AlignmentResult): NarrationAlignment => ({
    result,
    wordsByScene: [],
    usable: false,
    reason,
    fromCache: false,
    summary: result ? describeAlignment(result) : `no alignment: ${reason}`,
  });

  if (words.length === 0) return unusable("the script has no narration to align");

  const outcome = await alignWords({
    request: { audioPath: narrationPath, words, language, audioSec: totalSec },
    aligner,
    outDir: cacheRoot,
    refresh,
  });

  if (!outcome.result) return unusable(outcome.reason ?? "the aligner returned nothing");

  const result = outcome.result;
  if (!result.usable) {
    return { ...unusable(result.problems[0] ?? "the alignment did not validate", result) };
  }

  // A cache hit for a different script would be a different key, but the
  // partition below depends on the counts matching, so it is checked rather
  // than assumed.
  if (result.words.length !== words.length) {
    return unusable(
      `the alignment has ${result.words.length} words for a ${words.length}-word script`,
      result,
    );
  }

  const wordsByScene: WordTiming[][] = [];
  let cursor = 0;
  for (const sceneWords of perScene) {
    wordsByScene.push(result.words.slice(cursor, cursor + sceneWords.length));
    cursor += sceneWords.length;
  }

  return {
    result,
    wordsByScene,
    usable: true,
    fromCache: outcome.fromCache,
    summary: `${describeAlignment(result)}${outcome.fromCache ? " (cached)" : ""}`,
  };
}

/** The alignment, as the JSON sidecar that is the source of truth for timing. */
export function alignmentSidecar(
  result: AlignmentResult,
  slug: string,
): string {
  return `${JSON.stringify(
    {
      slug,
      method: result.method,
      aligner: result.aligner,
      version: result.version,
      language: result.language,
      audioSec: result.audioSec,
      coverage: result.coverage,
      usable: result.usable,
      problems: result.problems,
      words: result.words.map((w) => ({
        text: w.text,
        start: Number(w.startSec.toFixed(3)),
        end: Number(w.endSec.toFixed(3)),
        confidence: w.confidence === null ? null : Number(w.confidence.toFixed(3)),
        located: w.located,
      })),
    },
    null,
    2,
  )}\n`;
}
