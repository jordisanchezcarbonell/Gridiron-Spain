/**
 * The Claude Code CLI provider.
 *
 * Every test drives a **mocked subprocess** — no `claude` process is ever
 * spawned and no subscription quota is consumed. What is asserted is the exact
 * argv, the sandboxing flags, the recursion guard, env sanitisation, log
 * redaction, concurrency, timeout, turn ceiling and response parsing.
 */
import assert from "node:assert/strict";
import test from "node:test";
import type { RadarItem } from "../automation/src/types";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  ClaudeCliScriptGenerator,
  CliRefusalError,
  coerceStructured,
  DEFAULT_CLI_MODEL,
  DEFAULT_MAX_TURNS,
  describeShape,
  writeDump,
  NESTED_OVERRIDE_ENV,
  NestedSessionError,
  parseCliResponse,
  STRIPPED_ENV,
  toUsage,
  type ClaudeCliResponse,
  type SpawnResult,
  type SpawnRunner,
} from "../automation/src/script/generator/claude-cli";
import {
  ConcurrencyLimiter,
  redact,
  sanitizedEnv,
  TimeoutError,
} from "../automation/src/script/generator/runtime";
import { evidenceFor } from "../automation/src/script/generator/assemble";
import { createGenerator, parseGeneratorId } from "../automation/src/script/generator";
import { SCRIPT_SCHEMA } from "../automation/src/script/generator/prompt";
import { FORMATS } from "../automation/src/formats";
import { tts } from "../automation/src/config";
import type { GenerationLogEntry } from "../automation/src/script/generator/types";

function item(overrides: Partial<RadarItem> = {}): RadarItem {
  return {
    slug: "un-caso",
    title: "Florida salta 13 puestos y entra en el Top 10",
    body: [
      "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28.",
      "Es el mayor salto de la semana.",
    ],
    confidence: "CONFIRMED",
    taggedForVideo: true,
    sources: [{ label: "Yahoo", url: "https://sports.yahoo.com/x" }],
    provenance: {
      briefingPath: "research/daily/2026-10-02.md",
      briefingDate: "2026-10-02",
      line: 11,
      section: "top-stories",
    },
    contentHash: "hash-a",
    format: "news",
    ...overrides,
  };
}

function request(radarItem = item()) {
  const spec = FORMATS[radarItem.format];
  return {
    item: radarItem,
    evidence: evidenceFor(radarItem),
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
  };
}

const goodScript = {
  hook: "Florida salta 13 puestos y entra en el Top 10",
  beats: [
    "Los Gators aplastaron a Ole Miss 52-28 y entran en el #8 del AP Poll.",
    "Es el mayor salto de la semana.",
  ],
  conclusion: "Florida vuelve a la conversación de playoff",
  claims: [
    {
      text: "Los Gators aplastaron a Ole Miss 52-28 y entran en el #8 del AP Poll.",
      kind: "verified",
      evidenceIndices: [1],
    },
    { text: "Es el mayor salto de la semana.", kind: "verified", evidenceIndices: [2] },
    { text: "Florida vuelve a la conversación de playoff", kind: "inference", evidenceIndices: [] },
  ],
};

function cliJson(overrides: Partial<ClaudeCliResponse> = {}): string {
  return JSON.stringify({
    type: "result",
    subtype: "success",
    is_error: false,
    result: "done",
    structured_output: goodScript,
    session_id: "11111111-2222-3333-4444-555555555555",
    num_turns: 1,
    duration_ms: 4200,
    total_cost_usd: 0.0231,
    usage: {
      input_tokens: 1800,
      output_tokens: 420,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0,
    },
    ...overrides,
  });
}

/** A runner that records what it was asked to do and returns a canned result. */
function recordingRunner(result: Partial<SpawnResult> = {}) {
  const calls: { command: string; args: string[]; env: Record<string, string>; timeoutMs: number }[] = [];
  const runner: SpawnRunner = async (command, args, options) => {
    calls.push({ command, args, env: options.env, timeoutMs: options.timeoutMs });
    return { code: 0, signal: null, stdout: cliJson(), stderr: "", ...result };
  };
  return { runner, calls };
}

/**
 * An environment that looks like a plain terminal. Cast because Next.js
 * augments ProcessEnv with a required NODE_ENV that a fixture need not carry.
 */
const cleanEnv = { PATH: "/usr/bin", HOME: "/home/x" } as unknown as NodeJS.ProcessEnv;

// --- the other providers still exist --------------------------------------

test("all four providers are selectable and template is still the default", () => {
  assert.equal(parseGeneratorId("template"), "template");
  assert.equal(parseGeneratorId("claude"), "claude");
  assert.equal(parseGeneratorId("mock"), "mock");
  assert.equal(parseGeneratorId("claude-cli"), "claude-cli");
  assert.equal(parseGeneratorId("cli"), "claude-cli", "a shorthand a person would type");
  assert.equal(parseGeneratorId("nope"), undefined);
  assert.equal(createGenerator("template").generator.id, "template");
  assert.equal(createGenerator("mock").generator.id, "mock");
});

// --- requirement: no recursive Claude Code --------------------------------

test("the provider refuses to run inside a Claude Code session", async () => {
  const { runner, calls } = recordingRunner();
  const generator = new ClaudeCliScriptGenerator({
    runner,
    env: { ...cleanEnv, CLAUDECODE: "1", CLAUDE_CODE_SESSION_ID: "abc" },
  });

  assert.equal(generator.isNested(), true);
  assert.equal(generator.available(), false);

  const outcome = await generator.generate(request());
  assert.equal(calls.length, 0, "no subprocess is spawned");
  assert.equal(outcome.ok, false);
  if (!outcome.ok) {
    assert.equal(outcome.reason, "provider-error");
    assert.match(outcome.detail, /normal terminal/);
  }
});

test("either nesting marker alone is enough to refuse", () => {
  for (const marker of [{ CLAUDECODE: "1" }, { CLAUDE_CODE_SESSION_ID: "abc" }]) {
    const g = new ClaudeCliScriptGenerator({ env: { ...cleanEnv, ...marker } });
    assert.equal(g.available(), false, `${JSON.stringify(marker)} must block the run`);
  }
  assert.equal(new ClaudeCliScriptGenerator({ env: cleanEnv }).available(), true);
});

test("the guard can be overridden explicitly, and only explicitly", () => {
  const overridden = new ClaudeCliScriptGenerator({
    env: { ...cleanEnv, CLAUDECODE: "1", [NESTED_OVERRIDE_ENV]: "1" },
  });
  assert.equal(overridden.available(), true);

  const notOverridden = new ClaudeCliScriptGenerator({
    env: { ...cleanEnv, CLAUDECODE: "1", [NESTED_OVERRIDE_ENV]: "yes" },
  });
  assert.equal(notOverridden.available(), false, "only the exact value 1 overrides");
});

test("the factory falls back to template when nested, and names the real reason", () => {
  const previous = process.env.CLAUDECODE;
  process.env.CLAUDECODE = "1";
  try {
    const { generator, fellBackFrom, fallbackReason } = createGenerator("claude-cli");
    assert.equal(generator.id, "template");
    assert.equal(fellBackFrom, "claude-cli");
    assert.match(fallbackReason ?? "", /Claude Code session/);
  } finally {
    if (previous === undefined) delete process.env.CLAUDECODE;
    else process.env.CLAUDECODE = previous;
  }
});

test("NestedSessionError explains how to run it properly", () => {
  assert.match(new NestedSessionError().message, /normal terminal/);
  assert.match(new NestedSessionError().message, new RegExp(NESTED_OVERRIDE_ENV));
});

// --- requirement: the subprocess may not act ------------------------------

test("the argv disables every tool and denies anything that would prompt", async () => {
  const { runner, calls } = recordingRunner();
  await new ClaudeCliScriptGenerator({ runner, env: cleanEnv }).generate(request());

  const args = calls[0].args;
  const flag = (name: string) => args[args.indexOf(name) + 1];

  assert.equal(args[0], "-p", "non-interactive print mode");
  assert.equal(flag("--output-format"), "json");
  assert.equal(flag("--json-schema"), JSON.stringify(SCRIPT_SCHEMA), "the editorial schema");
  assert.equal(flag("--tools"), "", "an empty tool set: no read, write, exec or fetch");
  assert.equal(flag("--permission-mode"), "dontAsk", "nothing waits on a human");
  assert.ok(args.includes("--strict-mcp-config"), "no ambient MCP servers");
  assert.ok(args.includes("--no-session-persistence"), "leaves no transcript behind");
  assert.equal(flag("--model"), DEFAULT_CLI_MODEL);
  assert.ok(args.includes("--append-system-prompt"), "the editorial system prompt is attached");
});

test("the argv never contains a flag that would let the run act or bypass checks", async () => {
  const { runner, calls } = recordingRunner();
  await new ClaudeCliScriptGenerator({ runner, env: cleanEnv }).generate(request());
  const joined = calls[0].args.join(" ");

  for (const forbidden of [
    "--dangerously-skip-permissions",
    "--allow-dangerously-skip-permissions",
    "--allowedTools",
    "--allowed-tools",
    "--permission-mode acceptEdits",
    "--permission-mode bypassPermissions",
    "--add-dir",
    "--mcp-config",
    "--bare",
  ]) {
    assert.ok(!joined.includes(forbidden), `must not pass ${forbidden}`);
  }
});

test("--bare is never used, because it would ignore the subscription login", async () => {
  // `--bare` reads only ANTHROPIC_API_KEY; on a claude.ai login it would fail.
  const { runner, calls } = recordingRunner();
  await new ClaudeCliScriptGenerator({ runner, env: cleanEnv }).generate(request());
  assert.ok(!calls[0].args.includes("--bare"));
});

// --- requirement: no secrets in the environment or the logs ---------------

test("the child does not inherit the parent session's markers or tokens", async () => {
  const { runner, calls } = recordingRunner();
  await new ClaudeCliScriptGenerator({
    runner,
    env: {
      ...cleanEnv,
      [NESTED_OVERRIDE_ENV]: "1",
      CLAUDECODE: "1",
      CLAUDE_CODE_SESSION_ID: "parent-session",
      CLAUDE_CODE_MESSAGING_TOKEN: "super-secret-token",
      CLAUDE_CODE_MESSAGING_SOCKET: "/tmp/sock",
      CLAUDE_PID: "999",
    },
  }).generate(request());

  const childEnv = calls[0].env;
  for (const name of STRIPPED_ENV) {
    assert.equal(childEnv[name], undefined, `${name} must not reach the child`);
  }
  assert.equal(childEnv.PATH, "/usr/bin", "ordinary variables still pass through");
});

test("sanitizedEnv drops exactly what it is told to drop", () => {
  const out = sanitizedEnv(
    { A: "1", B: "2", SECRET: "x" } as unknown as NodeJS.ProcessEnv,
    ["SECRET"],
  );
  assert.deepEqual(out, { A: "1", B: "2" });
});

test("logs carry no credentials and no prompt body", async () => {
  const entries: GenerationLogEntry[] = [];
  const { runner } = recordingRunner();
  await new ClaudeCliScriptGenerator({
    runner,
    env: cleanEnv,
    log: (e) => entries.push(e),
  }).generate(request());

  assert.ok(entries.length > 0);
  const serialized = JSON.stringify(entries);
  assert.ok(!/sk-ant-/.test(serialized), "no API key shape");
  assert.ok(!serialized.includes("super-secret-token"));
  assert.ok(!serialized.includes("Ole Miss"), "the prompt body is not dumped into the log");
  assert.ok(serialized.includes("promptBytes"), "its size is logged instead");
  assert.ok(entries.some((e) => e.event === "cli.end"), "the run is accounted for");
});

test("redaction masks keys, hex blobs and token-shaped fields", () => {
  assert.equal(redact("key sk-ant-api03-AAAAAAAAAAAA now"), "key sk-ant-*** now");
  assert.match(redact('{"token":"abcdef123456"}'), /"token":"\*\*\*"/);
  assert.equal(redact("id 0123456789abcdef0123456789abcdef"), "id ***");
  assert.equal(redact("nothing to hide"), "nothing to hide");
});

// --- requirement: concurrency, timeout, turns -----------------------------

test("concurrency is capped and the rest queue", async () => {
  const limiter = new ConcurrencyLimiter(2);
  let peak = 0;
  let active = 0;

  await Promise.all(
    Array.from({ length: 6 }, () =>
      limiter.run(async () => {
        active += 1;
        peak = Math.max(peak, active);
        await new Promise((r) => setTimeout(r, 5));
        active -= 1;
      }),
    ),
  );

  assert.equal(peak, 2, "never more than the limit at once");
  assert.equal(limiter.inFlight(), 0);
  assert.throws(() => new ConcurrencyLimiter(0), RangeError);
});

test("two generations share one process slot", async () => {
  let inFlight = 0;
  let peak = 0;
  const runner: SpawnRunner = async () => {
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await new Promise((r) => setTimeout(r, 10));
    inFlight -= 1;
    return { code: 0, signal: null, stdout: cliJson(), stderr: "" };
  };
  const generator = new ClaudeCliScriptGenerator({ runner, env: cleanEnv, concurrency: 1 });
  await Promise.all([generator.generate(request()), generator.generate(request())]);
  assert.equal(peak, 1, "the limiter serialises the subprocesses");
});

test("the timeout is handed to the runner and surfaces as a typed rejection", async () => {
  const { runner, calls } = recordingRunner();
  await new ClaudeCliScriptGenerator({ runner, env: cleanEnv, timeoutMs: 1234 }).generate(request());
  assert.equal(calls[0].timeoutMs, 1234);

  const timingOut: SpawnRunner = async () => {
    throw new TimeoutError("claude did not answer in time");
  };
  const outcome = await new ClaudeCliScriptGenerator({
    runner: timingOut,
    env: cleanEnv,
    retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
  }).generate(request());
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "provider-timeout");
});

test("a SIGTERM-killed run is treated as a timeout", async () => {
  const runner: SpawnRunner = async () => ({
    code: 143,
    signal: "SIGTERM",
    stdout: "",
    stderr: "",
  });
  const outcome = await new ClaudeCliScriptGenerator({
    runner,
    env: cleanEnv,
    retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
  }).generate(request());
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "provider-timeout");
});

test("a run that reports more turns than allowed is not trusted", async () => {
  const runner: SpawnRunner = async () => ({
    code: 0,
    signal: null,
    stdout: cliJson({ num_turns: 4 }),
    stderr: "",
  });
  const outcome = await new ClaudeCliScriptGenerator({
    runner,
    env: cleanEnv,
    maxTurns: 1,
    retry: { maxAttempts: 2, baseDelayMs: 1, maxDelayMs: 1 },
  }).generate(request());
  assert.equal(outcome.ok, false);
  if (!outcome.ok) {
    assert.equal(outcome.reason, "provider-error");
    assert.match(outcome.detail, /4 turns/);
  }
});

test("--max-budget-usd is passed only when a ceiling is set", async () => {
  const withBudget = recordingRunner();
  await new ClaudeCliScriptGenerator({
    runner: withBudget.runner,
    env: cleanEnv,
    maxBudgetUsd: 0.5,
  }).generate(request());
  const args = withBudget.calls[0].args;
  assert.equal(args[args.indexOf("--max-budget-usd") + 1], "0.5");

  const without = recordingRunner();
  await new ClaudeCliScriptGenerator({ runner: without.runner, env: cleanEnv }).generate(request());
  assert.ok(!without.calls[0].args.includes("--max-budget-usd"));
});

// --- retries and failures -------------------------------------------------

test("a transient non-zero exit is retried; an unknown flag is not", async () => {
  let transient = 0;
  await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    retry: { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 1 },
    runner: async () => {
      transient += 1;
      return { code: 1, signal: null, stdout: "", stderr: "temporary network blip" };
    },
  }).generate(request());
  assert.equal(transient, 3, "a transient failure is retried to the ceiling");

  let fatal = 0;
  const outcome = await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    retry: { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 1 },
    runner: async () => {
      fatal += 1;
      return { code: 1, signal: null, stdout: "", stderr: "error: unknown option '--max-turns'" };
    },
  }).generate(request());
  assert.equal(fatal, 1, "a flag this version rejects is never retried");
  assert.equal(outcome.ok, false);
});

test("an is_error refusal is a typed rejection, not a retry loop", async () => {
  let attempts = 0;
  const outcome = await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    retry: { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 1 },
    runner: async () => {
      attempts += 1;
      return {
        code: 0,
        signal: null,
        stdout: cliJson({ is_error: true, result: "I cannot help with that request." }),
        stderr: "",
      };
    },
  }).generate(request());
  assert.equal(attempts, 1, "a refusal is not retried");
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "provider-refusal");
  assert.ok(new CliRefusalError("x") instanceof Error);
});

// --- response parsing -----------------------------------------------------

test("the response is read from structured_output", async () => {
  const { runner } = recordingRunner();
  const outcome = await new ClaudeCliScriptGenerator({
    runner,
    env: cleanEnv,
    now: () => "2026-01-01",
  }).generate(request());

  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  const pkg = outcome.result.editorial;
  assert.equal(pkg.generator, "claude-cli");
  assert.equal(pkg.model, DEFAULT_CLI_MODEL);
  assert.equal(pkg.usage?.inputTokens, 1800);
  assert.equal(pkg.usage?.outputTokens, 420);
  assert.equal(pkg.claims.filter((c) => c.kind === "inference").length, 1);
  assert.ok(outcome.result.script.scenes.some((s) => s.kind === "hook"));
});

test("subscription runs report no dollar cost, because none is billed", () => {
  const usage = toUsage({ usage: { input_tokens: 10, output_tokens: 5 }, total_cost_usd: 0.02 });
  assert.equal(usage.inputTokens, 10);
  assert.equal(
    usage.estimatedCostUsd,
    null,
    "a claude.ai login draws on plan quota; a dollar figure would be wrong",
  );
});

test("stdout is parsed even with leading noise, and nonsense is rejected", () => {
  assert.ok(parseCliResponse(`warning: something\n${cliJson()}`));
  assert.equal(parseCliResponse(""), undefined);
  assert.equal(parseCliResponse("no json here"), undefined);
  assert.equal(parseCliResponse("{not json"), undefined);
});

test("a script is accepted from structured_output or from a JSON result string", () => {
  assert.ok(coerceStructured({ structured_output: goodScript }).script);
  assert.ok(coerceStructured({ result: JSON.stringify(goodScript) }).script);
  assert.equal(coerceStructured({ result: "just prose" }).script, undefined);
  assert.equal(coerceStructured({}).script, undefined);
  assert.equal(
    coerceStructured({ structured_output: { hook: "h", conclusion: "c" } }).script,
    undefined,
    "a partial object is not a script",
  );
});

// --- regression: the first real run failed on both of these ---------------

test("a healthy one-shot reporting num_turns 2 is accepted", async () => {
  // The first real run rejected every clip because the ceiling was 1, but a
  // `claude -p` one-shot reports 2: the user turn plus the assistant answer.
  const { runner } = recordingRunner({ stdout: cliJson({ num_turns: 2 }) });
  const outcome = await new ClaudeCliScriptGenerator({
    runner,
    env: cleanEnv,
    now: () => "2026-01-01",
  }).generate(request());
  assert.equal(outcome.ok, true, outcome.ok ? "" : (outcome as { detail: string }).detail);
});

test("the default turn ceiling leaves headroom but still catches a runaway", async () => {
  assert.equal(DEFAULT_MAX_TURNS, 4);

  const fine = await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    now: () => "2026-01-01",
    runner: async () => ({ code: 0, signal: null, stdout: cliJson({ num_turns: 4 }), stderr: "" }),
  }).generate(request());
  assert.equal(fine.ok, true, "at the ceiling is still fine");

  const runaway = await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
    runner: async () => ({ code: 0, signal: null, stdout: cliJson({ num_turns: 12 }), stderr: "" }),
  }).generate(request());
  assert.equal(runaway.ok, false);
  if (!runaway.ok) assert.match(runaway.detail, /12 turns/);
});

test("an unusable response says exactly what came back", async () => {
  const cases: [Partial<ClaudeCliResponse>, RegExp][] = [
    [{ structured_output: null, result: "" }, /is null/],
    [{ structured_output: undefined, result: "lo siento, no puedo" }, /result is prose/],
    [{ structured_output: { hook: "h" }, result: "" }, /missing conclusion, beats, claims/],
    [{ structured_output: { ...goodScript, beats: [] }, result: "" }, /no usable strings/],
    [{ structured_output: { ...goodScript, claims: [] }, result: "" }, /no usable claims/],
    [{ structured_output: "a string", result: "" }, /is a string, not an object/],
  ];

  for (const [override, expected] of cases) {
    const outcome = await new ClaudeCliScriptGenerator({
      env: cleanEnv,
      retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
      runner: async () => ({ code: 0, signal: null, stdout: cliJson(override), stderr: "" }),
    }).generate(request());
    assert.equal(outcome.ok, false);
    if (!outcome.ok) {
      assert.match(outcome.detail, expected, `for ${JSON.stringify(override).slice(0, 60)}`);
    }
  }
});

test("the response shape is logged and dumped when it cannot be parsed", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-dump-"));
  const entries: GenerationLogEntry[] = [];
  await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    dumpTo: dir,
    log: (e) => entries.push(e),
    retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
    runner: async () => ({
      code: 0,
      signal: null,
      stdout: cliJson({ structured_output: { wrong: true } }),
      stderr: "",
    }),
  }).generate(request());

  const diagnostic = entries.find((e) => e.event === "cli.unusable-output");
  assert.ok(diagnostic, "the failure is logged");
  assert.match(String(diagnostic!.shape), /structured_output=object\{wrong\}/);

  const dumped = fs.readdirSync(dir);
  assert.equal(dumped.length, 1, "the raw response is saved for inspection");
  assert.match(dumped[0], /\.cli-response\.json$/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("describeShape summarises every response variant without throwing", () => {
  assert.match(describeShape({}), /structured_output=absent/);
  assert.match(describeShape({ structured_output: null }), /null/);
  assert.match(describeShape({ structured_output: [1, 2] }), /array\[2\]/);
  assert.match(describeShape({ result: "abc" }), /result=string\[3\]/);
});

test("a dumped response carries no credentials", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-dump2-"));
  const file = writeDump(dir, "slug", '{"token":"abcdef123456","key":"sk-ant-api03-SECRETVALUE"}');
  assert.ok(file);
  const body = fs.readFileSync(file!, "utf8");
  assert.ok(!body.includes("abcdef123456"));
  assert.ok(!body.includes("SECRETVALUE"));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("an ungrounded CLI answer is refused by the same checks as every engine", async () => {
  const invented = {
    ...goodScript,
    beats: ["Florida ganó 99-0 en la prórroga."],
    claims: [{ text: "Florida ganó 99-0 en la prórroga.", kind: "verified", evidenceIndices: [1] }],
  };
  const outcome = await new ClaudeCliScriptGenerator({
    env: cleanEnv,
    runner: async () => ({
      code: 0,
      signal: null,
      stdout: cliJson({ structured_output: invented }),
      stderr: "",
    }),
  }).generate(request());

  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "ungrounded-claim");
});

test("EXPLAINER requests carry the explainer band into the prompt", async () => {
  const { runner, calls } = recordingRunner();
  const explainer = item({
    format: "explainer",
    sources: [
      { label: "A", url: "https://a.example" },
      { label: "B", url: "https://b.example" },
    ],
  });
  await new ClaudeCliScriptGenerator({ runner, env: cleanEnv }).generate(request(explainer));
  const prompt = calls[0].args[1];
  assert.ok(prompt.includes("EXPLAINER"));
  assert.ok(prompt.includes("https://a.example"), "references reach the prompt");
});
