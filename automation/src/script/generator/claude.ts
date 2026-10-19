/**
 * Claude API adapter.
 *
 * Runs against the Messages API through the official SDK, so a scheduled job
 * can generate scripts with nothing but an API key — it never depends on an
 * interactive Claude Code session.
 *
 * The model's answer is constrained by a JSON schema (`output_config.format`)
 * rather than parsed out of prose, and then put through exactly the same
 * grounding, duration and package assembly as every other generator.
 */
import Anthropic from "@anthropic-ai/sdk";
import type { AttemptOutcome, Budget, RetryPolicy } from "./runtime";
import {
  defaultRetryPolicy,
  estimateCostUsd,
  silentLogger,
  TimeoutError,
  withRetries,
  withTimeout,
} from "./runtime";
import { assemble, type RawScript } from "./assemble";
import { buildUserPrompt, PROMPT_VERSION, SCRIPT_SCHEMA, SYSTEM_PROMPT } from "./prompt";
import type {
  GenerationLogger,
  GenerationOutcome,
  GenerationRequest,
  ScriptGenerator,
  TokenUsage,
} from "./types";

export interface ClaudeGeneratorOptions {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  /** Per-request wall clock, including retries of the HTTP call itself. */
  timeoutMs?: number;
  retry?: RetryPolicy;
  budget?: Budget;
  log?: GenerationLogger;
  /** Injected for tests; defaults to a real SDK client. */
  client?: Pick<Anthropic, "messages">;
  now?: () => string;
}

/** Default model. Opus 5 is the current flagship; override per run if needed. */
export const DEFAULT_MODEL = "claude-opus-5";

export class ClaudeScriptGenerator implements ScriptGenerator {
  readonly id = "claude";
  readonly model: string;

  private readonly apiKey?: string;
  private readonly maxTokens: number;
  private readonly timeoutMs: number;
  private readonly retry: RetryPolicy;
  private readonly budget?: Budget;
  private readonly log: GenerationLogger;
  private readonly injectedClient?: Pick<Anthropic, "messages">;
  private readonly now: () => string;
  private client?: Pick<Anthropic, "messages">;

  constructor(options: ClaudeGeneratorOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.ANTHROPIC_API_KEY;
    this.model = options.model ?? process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;
    this.maxTokens = options.maxTokens ?? 4000;
    this.timeoutMs = options.timeoutMs ?? 90_000;
    this.retry = options.retry ?? defaultRetryPolicy;
    this.budget = options.budget;
    this.log = options.log ?? silentLogger;
    this.injectedClient = options.client;
    this.now = options.now ?? (() => new Date().toISOString().slice(0, 10));
  }

  /**
   * An injected client counts as available — that is how tests drive the
   * adapter. Otherwise a key must be present; the CLI falls back when it is not.
   */
  available(): boolean {
    return Boolean(this.injectedClient ?? this.apiKey);
  }

  private resolveClient(): Pick<Anthropic, "messages"> {
    if (this.injectedClient) return this.injectedClient;
    if (!this.client) this.client = new Anthropic({ apiKey: this.apiKey });
    return this.client;
  }

  async generate(request: GenerationRequest): Promise<GenerationOutcome> {
    const context = { generator: this.id, slug: request.item.slug };

    if (this.budget && !this.budget.canSpend()) {
      this.log({ at: new Date().toISOString(), ...context, event: "budget.exhausted" });
      return {
        ok: false,
        reason: "budget-exhausted",
        detail: `run budget of $${this.budget.totals().limitUsd.toFixed(2)} is spent`,
      };
    }

    if (!this.available()) {
      return {
        ok: false,
        reason: "provider-error",
        detail: "ANTHROPIC_API_KEY is not set; cannot reach the Claude API",
      };
    }

    const client = this.resolveClient();
    let lastUsage: TokenUsage | undefined;

    const attempt = await withRetries<{ raw: RawScript; usage: TokenUsage }>(
      this.retry,
      this.log,
      context,
      async (attemptNumber): Promise<AttemptOutcome<{ raw: RawScript; usage: TokenUsage }>> => {
        const startedAt = Date.now();
        this.log({
          at: new Date().toISOString(),
          ...context,
          event: "request.start",
          attempt: attemptNumber,
          model: this.model,
          promptVersion: PROMPT_VERSION,
        });

        try {
          const response = await withTimeout(
            client.messages.create({
              model: this.model,
              max_tokens: this.maxTokens,
              system: SYSTEM_PROMPT,
              // Adaptive thinking is the default on current models; the schema
              // is what keeps the answer machine-readable.
              output_config: { format: { type: "json_schema", schema: SCRIPT_SCHEMA } },
              messages: [{ role: "user", content: buildUserPrompt(request) }],
            } as Anthropic.MessageCreateParamsNonStreaming),
            this.timeoutMs,
            `claude generation for ${request.item.slug}`,
          );

          const usage = this.toUsage(response);
          lastUsage = usage;
          this.budget?.record(usage);

          this.log({
            at: new Date().toISOString(),
            ...context,
            event: "request.end",
            attempt: attemptNumber,
            ms: Date.now() - startedAt,
            stopReason: response.stop_reason,
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            estimatedCostUsd: usage.estimatedCostUsd,
          });

          // Safety classifiers can decline; that is a 200, not an exception.
          if (response.stop_reason === "refusal") {
            return {
              retryable: false,
              error: new RefusalError(
                `the provider declined this request (${response.stop_details?.category ?? "no category"})`,
              ),
            };
          }

          const raw = parseScript(response);
          if (!raw) {
            // A malformed body is worth one more try — the model may simply
            // have wandered off-schema on this sample.
            return { retryable: true, error: new Error("response was not a usable script object") };
          }
          return { value: { raw, usage }, retryable: false };
        } catch (error) {
          return classifyError(error);
        }
      },
    );

    if (!attempt.value) {
      const error = attempt.error;
      const reason =
        error instanceof RefusalError
          ? "provider-refusal"
          : error instanceof TimeoutError
            ? "provider-timeout"
            : "provider-error";
      return {
        ok: false,
        reason,
        detail: error?.message ?? "generation failed",
        usage: lastUsage,
      };
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

  private toUsage(response: Anthropic.Message): TokenUsage {
    const u = response.usage;
    const inputTokens = u?.input_tokens ?? 0;
    const outputTokens = u?.output_tokens ?? 0;
    const cacheReadTokens = u?.cache_read_input_tokens ?? 0;
    const cacheWriteTokens = u?.cache_creation_input_tokens ?? 0;
    return {
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheWriteTokens,
      estimatedCostUsd: estimateCostUsd(this.model, inputTokens, outputTokens, cacheReadTokens),
    };
  }
}

export class RefusalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefusalError";
  }
}

/**
 * Pulls the script object out of a response.
 *
 * With a JSON schema the model answers in a text block whose body is the JSON;
 * `parsed_output` is used when the SDK surfaces it.
 */
export function parseScript(response: Anthropic.Message): RawScript | undefined {
  const parsed = (response as { parsed_output?: unknown }).parsed_output;
  if (parsed && typeof parsed === "object") return coerce(parsed);

  for (const block of response.content ?? []) {
    if (block.type !== "text") continue;
    const text = block.text.trim();
    const candidate = text.startsWith("{") ? text : text.slice(text.indexOf("{"));
    try {
      return coerce(JSON.parse(candidate));
    } catch {
      // try the next block
    }
  }
  return undefined;
}

function coerce(value: unknown): RawScript | undefined {
  if (!value || typeof value !== "object") return undefined;
  const v = value as Record<string, unknown>;
  if (typeof v.hook !== "string" || typeof v.conclusion !== "string") return undefined;
  if (!Array.isArray(v.beats) || !Array.isArray(v.claims)) return undefined;
  return {
    hook: v.hook,
    conclusion: v.conclusion,
    beats: v.beats.filter((b): b is string => typeof b === "string"),
    claims: v.claims
      .filter((c): c is Record<string, unknown> => Boolean(c) && typeof c === "object")
      .map((c) => ({
        text: String(c.text ?? ""),
        kind: c.kind === "inference" ? ("inference" as const) : ("verified" as const),
        evidenceIndices: Array.isArray(c.evidenceIndices)
          ? c.evidenceIndices.filter((i): i is number => Number.isInteger(i))
          : [],
      }))
      .filter((c) => c.text.length > 0),
  };
}

/**
 * Decides whether an SDK error is worth another attempt. Rate limits, overloads
 * and connection failures are; a bad request or a bad key never will be.
 */
export function classifyError(error: unknown): { retryable: boolean; error: Error } {
  if (error instanceof TimeoutError) return { retryable: true, error };
  if (error instanceof Anthropic.RateLimitError) return { retryable: true, error };
  if (error instanceof Anthropic.InternalServerError) return { retryable: true, error };
  if (error instanceof Anthropic.APIConnectionError) return { retryable: true, error };
  if (error instanceof Anthropic.AuthenticationError) return { retryable: false, error };
  if (error instanceof Anthropic.PermissionDeniedError) return { retryable: false, error };
  if (error instanceof Anthropic.NotFoundError) return { retryable: false, error };
  if (error instanceof Anthropic.BadRequestError) return { retryable: false, error };
  if (error instanceof Error) return { retryable: false, error };
  return { retryable: false, error: new Error(String(error)) };
}
