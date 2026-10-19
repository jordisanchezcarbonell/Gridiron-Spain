/**
 * Budget, timeout, bounded retry and structured logging for generation.
 *
 * Kept separate from any provider so the policy is testable without a network
 * and identical across adapters.
 */
import type { GenerationLogEntry, GenerationLogger, TokenUsage } from "./types";

/** Per-run spend ceiling. A run stops generating once it is reached. */
export class Budget {
  private spentUsd = 0;
  private inputTokens = 0;
  private outputTokens = 0;

  constructor(private readonly limitUsd: number) {}

  /** True while there is room for another generation. */
  canSpend(): boolean {
    return this.spentUsd < this.limitUsd;
  }

  remainingUsd(): number {
    return Math.max(0, this.limitUsd - this.spentUsd);
  }

  spentSoFarUsd(): number {
    return this.spentUsd;
  }

  totals(): { inputTokens: number; outputTokens: number; spentUsd: number; limitUsd: number } {
    return {
      inputTokens: this.inputTokens,
      outputTokens: this.outputTokens,
      spentUsd: this.spentUsd,
      limitUsd: this.limitUsd,
    };
  }

  record(usage: TokenUsage): void {
    this.inputTokens += usage.inputTokens;
    this.outputTokens += usage.outputTokens;
    this.spentUsd += usage.estimatedCostUsd ?? 0;
  }
}

/** Public list prices, USD per million tokens. */
export const MODEL_PRICING: Record<string, { inputPerMTok: number; outputPerMTok: number }> = {
  "claude-opus-5": { inputPerMTok: 5, outputPerMTok: 25 },
  "claude-sonnet-5": { inputPerMTok: 3, outputPerMTok: 15 },
  "claude-haiku-4-5": { inputPerMTok: 1, outputPerMTok: 5 },
};

/**
 * List-price estimate for one call. Returns null for an unpriced model rather
 * than guessing — a wrong cost figure is worse than an absent one.
 */
export function estimateCostUsd(
  model: string,
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens = 0,
): number | null {
  const price = MODEL_PRICING[model];
  if (!price) return null;
  // Cache reads bill at roughly a tenth of the input rate.
  const billedInput = Math.max(0, inputTokens - cacheReadTokens);
  return (
    (billedInput / 1_000_000) * price.inputPerMTok +
    (cacheReadTokens / 1_000_000) * price.inputPerMTok * 0.1 +
    (outputTokens / 1_000_000) * price.outputPerMTok
  );
}

/** Writes one JSON object per line to stderr, so stdout stays the run report. */
export function jsonLogger(enabled: boolean): GenerationLogger {
  return (entry: GenerationLogEntry) => {
    if (!enabled) return;
    process.stderr.write(`${JSON.stringify(entry)}\n`);
  };
}

export const silentLogger: GenerationLogger = () => {};

export interface RetryPolicy {
  /** Total attempts, including the first. */
  maxAttempts: number;
  /** Milliseconds before the first retry; doubles each time. */
  baseDelayMs: number;
  /** Ceiling on any single wait. */
  maxDelayMs: number;
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 800,
  maxDelayMs: 8_000,
};

export function backoffDelayMs(attempt: number, policy: RetryPolicy): number {
  return Math.min(policy.maxDelayMs, policy.baseDelayMs * 2 ** (attempt - 1));
}

/** Rejects if `promise` has not settled within `ms`. */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new TimeoutError(`${label} timed out after ${ms}ms`)), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export interface AttemptOutcome<T> {
  value?: T;
  /** True when another attempt could plausibly succeed. */
  retryable: boolean;
  error?: Error;
}

/**
 * Runs `attempt` up to `policy.maxAttempts` times, stopping early on a
 * non-retryable outcome. Every attempt is logged.
 */
export async function withRetries<T>(
  policy: RetryPolicy,
  log: GenerationLogger,
  context: { generator: string; slug: string },
  attempt: (attemptNumber: number) => Promise<AttemptOutcome<T>>,
  sleep: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms)),
): Promise<AttemptOutcome<T>> {
  let last: AttemptOutcome<T> = { retryable: true, error: new Error("no attempt ran") };

  for (let n = 1; n <= policy.maxAttempts; n++) {
    last = await attempt(n);
    if (last.value !== undefined) {
      if (n > 1) {
        log({ at: new Date().toISOString(), ...context, event: "retry.succeeded", attempt: n });
      }
      return last;
    }
    if (!last.retryable) {
      log({
        at: new Date().toISOString(),
        ...context,
        event: "retry.abandoned",
        attempt: n,
        error: last.error?.message,
      });
      return last;
    }
    if (n < policy.maxAttempts) {
      const delay = backoffDelayMs(n, policy);
      log({
        at: new Date().toISOString(),
        ...context,
        event: "retry.scheduled",
        attempt: n,
        delayMs: delay,
        error: last.error?.message,
      });
      await sleep(delay);
    }
  }

  log({
    at: new Date().toISOString(),
    ...context,
    event: "retry.exhausted",
    attempts: policy.maxAttempts,
    error: last.error?.message,
  });
  return last;
}

/**
 * Caps how many generations run at once.
 *
 * Each `claude -p` run is a whole Claude Code process; a handful in parallel
 * will exhaust a subscription's concurrent-session allowance and saturate the
 * machine long before the clips finish rendering.
 */
export class ConcurrencyLimiter {
  private active = 0;
  private readonly queue: (() => void)[] = [];

  constructor(private readonly limit: number) {
    if (limit < 1) throw new RangeError("concurrency limit must be at least 1");
  }

  inFlight(): number {
    return this.active;
  }

  queued(): number {
    return this.queue.length;
  }

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.active >= this.limit) {
      await new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.active += 1;
    try {
      return await task();
    } finally {
      this.active -= 1;
      this.queue.shift()?.();
    }
  }
}

/** Environment variable names whose values must never reach a log. */
export const SECRET_ENV_PATTERN = /(TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL|SOCKET)/i;

/**
 * Redacts anything that looks like a credential before it is logged.
 *
 * The child process inherits a shell that may hold an API key or the parent
 * session's messaging token; a log line is the easiest place to leak one.
 */
export function redact(value: string): string {
  return value
    .replace(/\b(sk-ant-[A-Za-z0-9_-]{8,})/g, "sk-ant-***")
    .replace(/\b([A-Fa-f0-9]{32,})\b/g, "***")
    .replace(/("?(?:token|key|secret|password|credential)"?\s*[:=]\s*"?)([^"\s,}]+)/gi, "$1***");
}

/** Keeps only the environment a clean child needs, with secrets dropped. */
export function sanitizedEnv(
  source: NodeJS.ProcessEnv,
  dropExact: readonly string[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(source)) {
    if (value === undefined) continue;
    if (dropExact.includes(name)) continue;
    out[name] = value;
  }
  return out;
}
