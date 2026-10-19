/**
 * CLI entry point.
 *
 *   npm run tiktok:plan                       # dry run: what would be cut, and why not
 *   npm run tiktok:generate                   # render the top candidate
 *   npm run tiktok:generate -- --format=explainer --limit=2
 *
 * Flags:
 *   --format=news|explainer|all   default: news
 *   --limit=N                     default: 1
 *   --date=YYYY-MM-DD             restrict news to one briefing
 *   --dry-run                     validate and report, render nothing
 *   --allow-updates               re-cut a story whose content changed
 *   --require-video-tag           only items the radar flagged for TikTok/Reels
 *   --silent-voice                use the silent stub instead of macOS `say`
 *   --voice=say|elevenlabs|silent narration provider (default: say)
 *   --out=DIR                     override the output directory
 *   --generator=template|claude|claude-cli|mock
 *                                 script engine (default: template)
 *   --concurrency=N               parallel claude-cli processes (default: 1)
 *   --max-turns=N                 runaway turn ceiling (default: 4; a one-shot reports 2)
 *   --max-generations=N           hard cap on provider calls (default: limit x 2)
 *   --max-budget-usd=N            forwarded to claude-cli as --max-budget-usd
 *   --dump-cli-response=DIR       save the raw provider response when parsing fails
 *   --from-approved=SLUG|FILE     render a previously approved script with NO
 *                                 provider call (skips radar and generation)
 *   --repair                      allow ONE extra generation to rewrite a script
 *                                 the quality gate refused (off by default)
 *   --budget=USD                  spend ceiling for the run (default: 5)
 *   --timeout=MS                  per-generation wall clock (default: 90000)
 *   --model=ID                    model for provider-backed generators
 *   --aligner=torchaudio|none     word aligner for the subtitles
 *                                 (default: torchaudio; `none` apportions the
 *                                 timings and flags the clip for review)
 *   --refresh-alignment           ignore the alignment cache and realign
 *   --log-json                    one structured log line per step, to stderr
 */
import type { ClipFormat } from "./types";
import { paths } from "./config";
import { normalizeFormat } from "./formats";
import { parseAlignerId, type AlignerId } from "./align";
import { formatReport, renderApproved, runPipeline } from "./pipeline";
import { DEFAULT_GENERATOR, parseGeneratorId, type GeneratorId } from "./script/generator";
import { SayProvider } from "./tts/say";
import { SilentProvider } from "./tts/silent";
import { ElevenLabsProvider } from "./tts/elevenlabs";
import { ffmpegAvailable } from "./render/probe";
import { rasterizerAvailable } from "./render/svg";
import type { TtsProvider } from "./tts";

export interface CliFlags {
  formats: ClipFormat[];
  limit: number;
  dryRun: boolean;
  allowUpdates: boolean;
  requireVideoTag: boolean;
  silentVoice: boolean;
  /** Narration provider requested on the command line. */
  voice: "say" | "elevenlabs" | "silent";
  briefingDate?: string;
  outDir: string;
  generator: GeneratorId;
  budgetUsd: number;
  timeoutMs: number;
  model?: string;
  structuredLogs: boolean;
  concurrency: number;
  maxTurns: number;
  maxGenerations?: number;
  maxBudgetUsd?: number;
  dumpTo?: string;
  repair: boolean;
  fromApproved?: string;
  aligner: AlignerId;
  refreshAlignment: boolean;
}

export function parseArgs(argv: string[]): CliFlags {
  const get = (name: string): string | undefined => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : undefined;
  };
  const has = (name: string) => argv.includes(`--${name}`);

  const formatArg = (get("format") ?? "news").toLowerCase();
  const formats: ClipFormat[] =
    formatArg === "all" ? ["news", "explainer"] : [normalizeFormat(formatArg) ?? "news"];

  const limitRaw = Number.parseInt(get("limit") ?? "1", 10);
  return {
    formats,
    limit: Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 1,
    dryRun: has("dry-run"),
    allowUpdates: has("allow-updates"),
    requireVideoTag: has("require-video-tag"),
    silentVoice: has("silent-voice"),
    voice: ((): CliFlags["voice"] => {
      const raw = (get("voice") ?? "").toLowerCase();
      if (raw === "elevenlabs" || raw === "silent" || raw === "say") return raw;
      return has("silent-voice") ? "silent" : "say";
    })(),
    briefingDate: get("date"),
    outDir: get("out") ?? paths.outDir,
    generator: parseGeneratorId(get("generator")) ?? DEFAULT_GENERATOR,
    budgetUsd: positiveNumber(get("budget"), 5),
    timeoutMs: positiveNumber(get("timeout"), 90_000),
    model: get("model"),
    structuredLogs: has("log-json"),
    concurrency: Math.round(positiveNumber(get("concurrency"), 1)),
    maxTurns: Math.round(positiveNumber(get("max-turns"), 4)),
    maxGenerations: get("max-generations")
      ? Math.round(positiveNumber(get("max-generations"), 1))
      : undefined,
    maxBudgetUsd: get("max-budget-usd")
      ? positiveNumber(get("max-budget-usd"), 0)
      : undefined,
    dumpTo: get("dump-cli-response"),
    repair: has("repair"),
    fromApproved: get("from-approved"),
    aligner: parseAlignerId(get("aligner")) ?? "torchaudio",
    refreshAlignment: has("refresh-alignment"),
  };
}

/**
 * Narration provider. `say` is the default because it is local, offline and
 * needs no credentials; ElevenLabs is opt-in and falls back rather than failing
 * when its key is absent.
 */
export function positiveNumber(raw: string | undefined, fallback: number): number {
  const value = Number.parseFloat(raw ?? "");
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function pickProvider(flags: CliFlags): TtsProvider {
  if (flags.voice === "silent") return new SilentProvider();

  if (flags.voice === "elevenlabs") {
    const eleven = new ElevenLabsProvider();
    if (eleven.available()) return eleven;
    console.warn(
      "ElevenLabs was requested but ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID are not set; using macOS `say`.",
    );
  }

  const say = new SayProvider();
  if (say.available()) return say;
  console.warn("macOS `say` is unavailable; falling back to the silent narration stub.");
  return new SilentProvider();
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const flags = parseArgs(argv);

  if (!flags.dryRun) {
    if (!ffmpegAvailable()) {
      console.error("ffmpeg/ffprobe not found on PATH. Install ffmpeg, or run with --dry-run.");
      return 1;
    }
    if (!rasterizerAvailable()) {
      console.error("rsvg-convert not found on PATH (brew install librsvg). Subtitles cannot be drawn.");
      return 1;
    }
  }

  // Replaying an approved script never touches a provider, so the generator
  // availability checks above do not apply.
  if (flags.fromApproved) {
    const replay = await renderApproved({
      target: flags.fromApproved,
      provider: pickProvider(flags),
      outDir: flags.outDir,
      allowUpdates: flags.allowUpdates,
      structuredLogs: flags.structuredLogs,
      aligner: flags.aligner,
      refreshAlignment: flags.refreshAlignment,
    });
    console.log(formatReport(replay));
    return replay.produced.length === 0 ? 1 : 0;
  }

  const result = await runPipeline({
    formats: flags.formats,
    limit: flags.limit,
    provider: pickProvider(flags),
    outDir: flags.outDir,
    dryRun: flags.dryRun,
    allowUpdates: flags.allowUpdates,
    requireVideoTag: flags.requireVideoTag,
    briefingDate: flags.briefingDate,
    generator: flags.generator,
    budgetUsd: flags.budgetUsd,
    timeoutMs: flags.timeoutMs,
    model: flags.model,
    structuredLogs: flags.structuredLogs,
    concurrency: flags.concurrency,
    maxTurns: flags.maxTurns,
    maxGenerations: flags.maxGenerations,
    maxBudgetUsd: flags.maxBudgetUsd,
    dumpTo: flags.dumpTo,
    repair: flags.repair,
    aligner: flags.aligner,
    refreshAlignment: flags.refreshAlignment,
  });

  console.log(formatReport(result));
  return result.rejected.length > 0 && result.produced.length === 0 ? 1 : 0;
}

const invokedDirectly = process.argv[1]?.includes("automation");
if (invokedDirectly) {
  main().then(
    (code) => process.exit(code),
    (error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    },
  );
}
