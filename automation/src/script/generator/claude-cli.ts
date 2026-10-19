/**
 * Claude Code CLI adapter.
 *
 * Generates scripts by shelling out to `claude -p` with a JSON schema, so the
 * editor's existing Claude Code login does the work and no separate API key is
 * needed. The answer goes through exactly the same assembly, grounding and
 * duration checks as every other generator.
 *
 * Verified against the installation this was written for (Claude Code 2.1.231,
 * `authMethod: "claude.ai"`, `subscriptionType: "max"`):
 *
 *  - `--json-schema` + `--output-format json` returns the validated object in
 *    the response's `structured_output` field;
 *  - `--tools ""` disables the whole built-in tool set, so the run cannot read
 *    or write a file, execute a command, or reach the network;
 *  - **`--max-turns` does not exist** in this version, so the ceiling is
 *    enforced by checking the reported `num_turns`. Note a normal one-shot
 *    reports **2** — the user turn and the assistant answer — not 1;
 *  - **`--permission-prompts none` needs v2.1.259+** and is omitted here;
 *    `--permission-mode dontAsk` is the equivalent this version has;
 *  - **`--bare` must not be used.** It never reads OAuth credentials, so on a
 *    subscription login it would fail for want of an `ANTHROPIC_API_KEY`.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { assemble, type RawScript } from "./assemble";
import { buildUserPrompt, PROMPT_VERSION, SCRIPT_SCHEMA, SYSTEM_PROMPT } from "./prompt";
import {
  ConcurrencyLimiter,
  defaultRetryPolicy,
  redact,
  sanitizedEnv,
  silentLogger,
  TimeoutError,
  withRetries,
  type AttemptOutcome,
  type RetryPolicy,
} from "./runtime";
import type {
  GenerationLogger,
  GenerationOutcome,
  GenerationRequest,
  ScriptGenerator,
  TokenUsage,
} from "./types";

/** Default model alias. `claude --model` accepts aliases or full names. */
export const DEFAULT_CLI_MODEL = "opus";

/**
 * Runaway ceiling on reported turns.
 *
 * A successful one-shot reports `num_turns: 2` (the user turn plus the
 * assistant answer), so a ceiling of 1 rejects every healthy run — which is
 * exactly what happened on the first real attempt. With `--tools ""` there is
 * no agent loop to bound anyway: this exists to catch something pathological,
 * not to assert an exact count.
 */
export const DEFAULT_MAX_TURNS = 4;

/**
 * Environment the child must not inherit.
 *
 * `CLAUDECODE` and its siblings mark *this* process as a Claude Code session;
 * passing them down would make the child believe it is nested. The messaging
 * socket and token are live credentials for the parent session and have no
 * business in a subprocess.
 */
export const STRIPPED_ENV = [
  "CLAUDECODE",
  "CLAUDE_CODE_ENTRYPOINT",
  "CLAUDE_CODE_SESSION_ID",
  "CLAUDE_CODE_CHILD_SESSION",
  "CLAUDE_CODE_MESSAGING_SOCKET",
  "CLAUDE_CODE_MESSAGING_TOKEN",
  "CLAUDE_CODE_EXECPATH",
  "CLAUDE_PID",
  "CLAUDE_EFFORT",
] as const;

/** Opt-out for the recursion guard. Unsupported; present for diagnosis only. */
export const NESTED_OVERRIDE_ENV = "PRIMERDOWN_ALLOW_NESTED_CLAUDE";

/** The shape `claude -p --output-format json` returns. */
export interface ClaudeCliResponse {
  type?: string;
  subtype?: string;
  is_error?: boolean;
  result?: string;
  structured_output?: unknown;
  session_id?: string;
  num_turns?: number;
  duration_ms?: number;
  total_cost_usd?: number;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
  };
}

export interface SpawnResult {
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
}

/** Injected in tests so no quota is ever consumed. */
export type SpawnRunner = (
  command: string,
  args: string[],
  options: { env: Record<string, string>; cwd: string; timeoutMs: number },
) => Promise<SpawnResult>;

export interface ClaudeCliOptions {
  /** Binary to invoke. Defaults to `claude` on PATH. */
  command?: string;
  model?: string;
  /** Wall clock for one generation. */
  timeoutMs?: number;
  retry?: RetryPolicy;
  /** How many `claude -p` processes may run at once. */
  concurrency?: number | ConcurrencyLimiter;
  /**
   * Runaway ceiling on reported turns. Defaults to `DEFAULT_MAX_TURNS`; a
   * healthy one-shot reports 2.
   */
  maxTurns?: number;
  /** Passed through as `--max-budget-usd` when set. */
  maxBudgetUsd?: number;
  log?: GenerationLogger;
  runner?: SpawnRunner;
  /** Directory to write the raw (redacted) CLI response to when parsing fails. */
  dumpTo?: string;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  now?: () => string;
}

export class NestedSessionError extends Error {
  constructor() {
    super(
      "refusing to spawn `claude -p` from inside a Claude Code session. " +
        `Run the pipeline from a normal terminal, or set ${NESTED_OVERRIDE_ENV}=1 to override (unsupported).`,
    );
    this.name = "NestedSessionError";
  }
}

export class ClaudeCliScriptGenerator implements ScriptGenerator {
  readonly id = "claude-cli";
  readonly model: string;

  private readonly command: string;
  private readonly timeoutMs: number;
  private readonly retry: RetryPolicy;
  private readonly limiter: ConcurrencyLimiter;
  private readonly maxTurns: number;
  private readonly maxBudgetUsd?: number;
  private readonly log: GenerationLogger;
  private readonly runner: SpawnRunner;
  private readonly dumpTo?: string;
  private readonly cwd: string;
  private readonly env: NodeJS.ProcessEnv;
  private readonly now: () => string;

  constructor(options: ClaudeCliOptions = {}) {
    this.command = options.command ?? "claude";
    this.model = options.model ?? process.env.CLAUDE_CLI_MODEL ?? DEFAULT_CLI_MODEL;
    this.timeoutMs = options.timeoutMs ?? 180_000;
    this.retry = options.retry ?? { ...defaultRetryPolicy, maxAttempts: 2 };
    this.limiter =
      options.concurrency instanceof ConcurrencyLimiter
        ? options.concurrency
        : new ConcurrencyLimiter(options.concurrency ?? 1);
    this.maxTurns = options.maxTurns ?? DEFAULT_MAX_TURNS;
    this.maxBudgetUsd = options.maxBudgetUsd;
    this.log = options.log ?? silentLogger;
    this.runner = options.runner ?? defaultSpawnRunner;
    this.dumpTo = options.dumpTo;
    this.cwd = options.cwd ?? process.cwd();
    this.env = options.env ?? process.env;
    this.now = options.now ?? (() => new Date().toISOString().slice(0, 10));
  }

  /**
   * Available only outside a Claude Code session.
   *
   * Spawning `claude -p` from within one nests a whole agent inside another;
   * the guard is mechanical rather than a note in the README.
   */
  available(): boolean {
    return !this.isNested();
  }

  isNested(): boolean {
    if (this.env[NESTED_OVERRIDE_ENV] === "1") return false;
    return Boolean(this.env.CLAUDECODE || this.env.CLAUDE_CODE_SESSION_ID);
  }

  /** The exact argv used. Exposed so tests and docs cannot drift from it. */
  buildArgs(request: GenerationRequest): string[] {
    const args = [
      "-p",
      buildUserPrompt(request),
      "--output-format",
      "json",
      "--json-schema",
      JSON.stringify(SCRIPT_SCHEMA),
      // No tools at all: the run cannot read, write, execute or fetch.
      "--tools",
      "",
      // Anything that would otherwise prompt is denied instead of hanging.
      "--permission-mode",
      "dontAsk",
      // Only MCP servers given on the command line — and none are.
      "--strict-mcp-config",
      // Leave no session transcript behind for a one-shot generation.
      "--no-session-persistence",
      "--model",
      this.model,
      "--append-system-prompt",
      SYSTEM_PROMPT,
    ];
    if (this.maxBudgetUsd !== undefined) {
      args.push("--max-budget-usd", String(this.maxBudgetUsd));
    }
    return args;
  }

  async generate(request: GenerationRequest): Promise<GenerationOutcome> {
    const context = { generator: this.id, slug: request.item.slug };

    if (this.isNested()) {
      this.log({ at: new Date().toISOString(), ...context, event: "nested.refused" });
      return {
        ok: false,
        reason: "provider-error",
        detail: new NestedSessionError().message,
      };
    }

    const args = this.buildArgs(request);
    const env = sanitizedEnv(this.env, STRIPPED_ENV);
    let lastUsage: TokenUsage | undefined;

    const attempt = await this.limiter.run(() =>
      withRetries<{ raw: RawScript; usage: TokenUsage }>(
        this.retry,
        this.log,
        context,
        async (attemptNumber): Promise<AttemptOutcome<{ raw: RawScript; usage: TokenUsage }>> => {
          const startedAt = Date.now();
          this.log({
            at: new Date().toISOString(),
            ...context,
            event: "cli.start",
            attempt: attemptNumber,
            command: this.command,
            model: this.model,
            promptVersion: PROMPT_VERSION,
            // The prompt itself is not logged: it is large and quoting it adds
            // nothing a reader can act on.
            promptBytes: args[1].length,
            toolsDisabled: true,
          });

          let run: SpawnResult;
          try {
            run = await this.runner(this.command, args, {
              env,
              cwd: this.cwd,
              timeoutMs: this.timeoutMs,
            });
          } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            const retryable = err instanceof TimeoutError;
            this.log({
              at: new Date().toISOString(),
              ...context,
              event: "cli.failed",
              attempt: attemptNumber,
              ms: Date.now() - startedAt,
              error: redact(err.message),
            });
            return { retryable, error: err };
          }

          const stderr = redact(run.stderr.trim()).slice(0, 400);

          if (run.signal === "SIGTERM" || run.code === 143) {
            return { retryable: true, error: new TimeoutError("the CLI run was terminated") };
          }

          if (run.code !== 0) {
            const fatal = /unknown option|not a valid JSON Schema|invalid/i.test(run.stderr);
            this.log({
              at: new Date().toISOString(),
              ...context,
              event: "cli.exit",
              attempt: attemptNumber,
              code: run.code,
              ms: Date.now() - startedAt,
              stderr,
            });
            return {
              retryable: !fatal,
              error: new Error(`claude exited ${run.code}${stderr ? `: ${stderr}` : ""}`),
            };
          }

          const parsed = parseCliResponse(run.stdout);
          if (!parsed) {
            return {
              retryable: true,
              error: new Error("the CLI did not return a JSON object on stdout"),
            };
          }

          const usage = toUsage(parsed);
          lastUsage = usage;

          this.log({
            at: new Date().toISOString(),
            ...context,
            event: "cli.end",
            attempt: attemptNumber,
            ms: Date.now() - startedAt,
            numTurns: parsed.num_turns ?? null,
            // A session id is not a secret, but it is only useful for support.
            sessionId: parsed.session_id ?? null,
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            reportedCostUsd: parsed.total_cost_usd ?? null,
          });

          if (parsed.is_error) {
            const message = redact(String(parsed.result ?? "the CLI reported an error"));
            const refused = /refus|declin|cannot help|policy/i.test(message);
            return {
              retryable: !refused,
              error: refused ? new CliRefusalError(message) : new Error(message.slice(0, 300)),
            };
          }

          if ((parsed.num_turns ?? 0) > this.maxTurns) {
            // Tools are disabled, so this cannot be a tool loop; it means the
            // run did something unexpected and its answer is not trusted.
            return {
              retryable: false,
              error: new Error(
                `the run reported ${parsed.num_turns} turns, over the ${this.maxTurns}-turn runaway ceiling ` +
                  "(a healthy one-shot reports 2)",
              ),
            };
          }

          const coerced = coerceStructured(parsed);
          if (!coerced.script) {
            // Say precisely what came back, or the failure is undebuggable.
            this.log({
              at: new Date().toISOString(),
              ...context,
              event: "cli.unusable-output",
              attempt: attemptNumber,
              diagnosis: coerced.diagnosis,
              shape: describeShape(parsed),
            });
            if (this.dumpTo) {
              writeDump(this.dumpTo, request.item.slug, run.stdout);
            }
            return {
              retryable: true,
              error: new Error(`unusable response: ${coerced.diagnosis}`),
            };
          }
          const raw = coerced.script;

          return { value: { raw, usage }, retryable: false };
        },
      ),
    );

    if (!attempt.value) {
      const error = attempt.error;
      const reason =
        error instanceof CliRefusalError
          ? "provider-refusal"
          : error instanceof TimeoutError
            ? "provider-timeout"
            : "provider-error";
      return { ok: false, reason, detail: error?.message ?? "the CLI run failed", usage: lastUsage };
    }

    return assemble({
      request,
      raw: attempt.value.raw,
      generator: this.id,
      model: this.model,
      promptVersion: PROMPT_VERSION,
      usage: attempt.value.usage,
      now: this.now(),
    });
  }
}

export class CliRefusalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CliRefusalError";
  }
}

/**
 * Token counts, and the CLI's own cost figure.
 *
 * `estimatedCostUsd` is left **null** on a subscription login: the run draws on
 * the plan's quota rather than being billed per token, so quoting a dollar
 * figure would be wrong. The CLI's `total_cost_usd` is kept separately as what
 * the same work would have cost on the API.
 */
export function toUsage(response: ClaudeCliResponse): TokenUsage {
  const u = response.usage ?? {};
  return {
    inputTokens: u.input_tokens ?? 0,
    outputTokens: u.output_tokens ?? 0,
    cacheReadTokens: u.cache_read_input_tokens ?? 0,
    cacheWriteTokens: u.cache_creation_input_tokens ?? 0,
    estimatedCostUsd: null,
  };
}

/** Finds the JSON object on stdout, tolerating leading noise. */
export function parseCliResponse(stdout: string): ClaudeCliResponse | undefined {
  const text = stdout.trim();
  if (!text) return undefined;
  const start = text.indexOf("{");
  if (start === -1) return undefined;
  try {
    const value = JSON.parse(text.slice(start));
    return value && typeof value === "object" ? (value as ClaudeCliResponse) : undefined;
  } catch {
    return undefined;
  }
}

/** What a coercion attempt concluded, so a failure can be acted on. */
export interface CoercionResult {
  script?: RawScript;
  diagnosis: string;
}

/**
 * Pulls the script out of `structured_output`, falling back to the `result`
 * text when a build returns the JSON there instead.
 *
 * On failure it reports *which* part was wrong rather than a flat "unusable",
 * because the only way to fix a schema mismatch is to know what came back.
 */
export function coerceStructured(response: ClaudeCliResponse): CoercionResult {
  const fromStructured = coerce(response.structured_output);
  if (fromStructured.script) return fromStructured;

  if (typeof response.result === "string") {
    const text = response.result.trim();
    const start = text.indexOf("{");
    if (start !== -1) {
      try {
        const fromResult = coerce(JSON.parse(text.slice(start)));
        if (fromResult.script) return fromResult;
        return { diagnosis: `result held JSON but ${fromResult.diagnosis}` };
      } catch {
        return {
          diagnosis:
            `structured_output ${fromStructured.diagnosis}; result is text, not JSON ` +
            `("${text.slice(0, 60).replace(/\s+/g, " ")}…")`,
        };
      }
    }
    return {
      diagnosis:
        `structured_output ${fromStructured.diagnosis}; result is prose ` +
        `("${text.slice(0, 60).replace(/\s+/g, " ")}…")`,
    };
  }

  return { diagnosis: `structured_output ${fromStructured.diagnosis}, and there is no result text` };
}

/** The fields a script must carry, checked one by one so the error is specific. */
function coerce(value: unknown): CoercionResult {
  if (value === undefined) return { diagnosis: "is absent" };
  if (value === null) return { diagnosis: "is null" };
  if (typeof value !== "object") return { diagnosis: `is a ${typeof value}, not an object` };

  const v = value as Record<string, unknown>;
  const missing: string[] = [];
  if (typeof v.hook !== "string" || !v.hook.trim()) missing.push("hook");
  if (typeof v.conclusion !== "string" || !v.conclusion.trim()) missing.push("conclusion");
  if (!Array.isArray(v.beats)) missing.push("beats");
  if (!Array.isArray(v.claims)) missing.push("claims");

  if (missing.length > 0) {
    const present = Object.keys(v).slice(0, 8).join(", ") || "nothing";
    return { diagnosis: `is missing ${missing.join(", ")} (it has: ${present})` };
  }

  const beats = (v.beats as unknown[]).filter((b): b is string => typeof b === "string" && b.trim().length > 0);
  if (beats.length === 0) return { diagnosis: "has a beats array with no usable strings" };

  const claims = (v.claims as unknown[])
    .filter((c): c is Record<string, unknown> => Boolean(c) && typeof c === "object")
    .map((c) => ({
      text: String(c.text ?? ""),
      kind: c.kind === "inference" ? ("inference" as const) : ("verified" as const),
      evidenceIndices: Array.isArray(c.evidenceIndices)
        ? c.evidenceIndices.filter((i): i is number => Number.isInteger(i))
        : [],
    }))
    .filter((c) => c.text.length > 0);

  if (claims.length === 0) return { diagnosis: "declares no usable claims" };

  return {
    script: { hook: v.hook as string, conclusion: v.conclusion as string, beats, claims },
    diagnosis: "ok",
  };
}

/** A one-line description of what the CLI actually returned, for the log. */
export function describeShape(response: ClaudeCliResponse): string {
  const so = response.structured_output;
  const soShape =
    so === undefined
      ? "absent"
      : so === null
        ? "null"
        : Array.isArray(so)
          ? `array[${so.length}]`
          : typeof so === "object"
            ? `object{${Object.keys(so as object).slice(0, 8).join(",")}}`
            : typeof so;
  return [
    `structured_output=${soShape}`,
    `result=${typeof response.result === "string" ? `string[${response.result.length}]` : typeof response.result}`,
    `is_error=${response.is_error ?? false}`,
    `subtype=${response.subtype ?? "-"}`,
  ].join(" ");
}

/** Writes the raw response for inspection, with credentials masked. */
export function writeDump(dir: string, slug: string, stdout: string): string | undefined {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${slug}.cli-response.json`);
    fs.writeFileSync(file, redact(stdout), "utf8");
    return file;
  } catch {
    return undefined;
  }
}

/**
 * Real subprocess execution.
 *
 * `spawn` without a shell, so the prompt is passed as one argv element and no
 * shell metacharacter in the briefing can be interpreted. On timeout the child
 * gets SIGTERM, then SIGKILL if it has not exited.
 */
export const defaultSpawnRunner: SpawnRunner = (command, args, options) =>
  new Promise((resolve, reject) => {
    // `stdio` is annotated so TypeScript picks the piped-streams overload, and
    // the env is widened because a sanitized map has no NODE_ENV guarantee.
    const child = spawn(command, args, {
      env: options.env as NodeJS.ProcessEnv,
      cwd: options.cwd,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"] as const,
    });

    let stdout = "";
    let stderr = "";
    let settled = false;

    const killTimer = setTimeout(() => {
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
      if (!settled) {
        settled = true;
        reject(new TimeoutError(`claude did not answer within ${options.timeoutMs}ms`));
      }
    }, options.timeoutMs);

    child.stdout.on("data", (chunk: Buffer | string) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderr += String(chunk);
    });

    child.on("error", (error: Error) => {
      clearTimeout(killTimer);
      if (settled) return;
      settled = true;
      reject(error);
    });

    child.on("close", (code: number | null, signal: NodeJS.Signals | null) => {
      clearTimeout(killTimer);
      if (settled) return;
      settled = true;
      resolve({ code, signal, stdout, stderr });
    });
  });
