/**
 * Generator selection.
 *
 * The default stays `template` — the deterministic writer the module shipped
 * with — so adding this layer changes nothing until a run explicitly asks for
 * another engine.
 */
import type { Budget } from "./runtime";
import type { GenerationLogger, ScriptGenerator } from "./types";
import { TemplateScriptGenerator } from "./template";
import { MockScriptGenerator } from "./mock";
import { ClaudeScriptGenerator } from "./claude";
import { ClaudeCliScriptGenerator } from "./claude-cli";

/**
 * `claude` talks to the Messages API with an API key; `claude-cli` shells out
 * to the editor's existing Claude Code login. Both remain available.
 */
export type GeneratorId = "template" | "claude" | "claude-cli" | "mock";

export const DEFAULT_GENERATOR: GeneratorId = "template";

export function parseGeneratorId(raw: string | undefined): GeneratorId | undefined {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "template" || value === "claude" || value === "mock") return value;
  // Accept the spellings a person is likely to type.
  if (value === "claude-cli" || value === "cli" || value === "claude_cli") return "claude-cli";
  return undefined;
}

export interface GeneratorFactoryOptions {
  budget?: Budget;
  /** Explicit `--max-budget-usd` for the CLI provider, when the caller set one. */
  maxBudgetUsd?: number;
  log?: GenerationLogger;
  model?: string;
  timeoutMs?: number;
  now?: () => string;
  /** Parallel `claude -p` processes allowed. */
  concurrency?: number;
  /** Ceiling on assistant turns per generation. */
  maxTurns?: number;
  /** Directory for raw provider responses when parsing fails. */
  dumpTo?: string;
}

/**
 * Builds the requested generator. `claude` degrades to `template` when no
 * credentials are present, so a scheduled run never dies on a missing key —
 * it falls back and says so.
 */
export function createGenerator(
  id: GeneratorId,
  options: GeneratorFactoryOptions = {},
): { generator: ScriptGenerator; fellBackFrom?: GeneratorId; fallbackReason?: string } {
  if (id === "mock") return { generator: new MockScriptGenerator({ now: options.now?.() }) };

  if (id === "claude-cli") {
    const cli = new ClaudeCliScriptGenerator({
      log: options.log,
      model: options.model,
      timeoutMs: options.timeoutMs,
      concurrency: options.concurrency,
      maxTurns: options.maxTurns,
      dumpTo: options.dumpTo,
      // Only forwarded when the caller set one. On a subscription login the
      // flag is meaningless, and a derived default would be noise.
      maxBudgetUsd: options.maxBudgetUsd,
      now: options.now,
    });
    // Refuses to run nested inside a Claude Code session; fall back rather than
    // fail a scheduled job, and say so in the report.
    if (cli.available()) return { generator: cli };
    return {
      generator: new TemplateScriptGenerator(options.now),
      fellBackFrom: "claude-cli",
      fallbackReason:
        "running inside a Claude Code session; `claude -p` must be started from a normal terminal",
    };
  }

  if (id === "claude") {
    const claude = new ClaudeScriptGenerator({
      budget: options.budget,
      log: options.log,
      model: options.model,
      timeoutMs: options.timeoutMs,
      now: options.now,
    });
    if (claude.available()) return { generator: claude };
    return {
      generator: new TemplateScriptGenerator(options.now),
      fellBackFrom: "claude",
      fallbackReason: "ANTHROPIC_API_KEY is not set",
    };
  }

  return { generator: new TemplateScriptGenerator(options.now) };
}

export {
  TemplateScriptGenerator,
  MockScriptGenerator,
  ClaudeScriptGenerator,
  ClaudeCliScriptGenerator,
};
