/**
 * The AI script engine: the generator seam, grounding, budget/retry/timeout,
 * the Claude adapter (driven by an injected client, never the network), the
 * editorial package, dedup and the independent quality evaluation.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { RadarItem } from "../automation/src/types";
import {
  assemble,
  checkGrounding,
  estimateClipSeconds,
  eventKeyFor,
  evidenceFor,
  fingerprintNarration,
  numericTokens,
  toScenes,
  validateRaw,
  type RawScript,
} from "../automation/src/script/generator/assemble";
import type { GenerationRequest } from "../automation/src/script/generator/types";
import {
  Budget,
  backoffDelayMs,
  defaultRetryPolicy,
  estimateCostUsd,
  TimeoutError,
  withRetries,
  withTimeout,
} from "../automation/src/script/generator/runtime";
import { MockScriptGenerator } from "../automation/src/script/generator/mock";
import { TemplateScriptGenerator } from "../automation/src/script/generator/template";
import {
  ClaudeScriptGenerator,
  classifyError,
  parseScript,
} from "../automation/src/script/generator/claude";
import {
  createGenerator,
  DEFAULT_GENERATOR,
  parseGeneratorId,
} from "../automation/src/script/generator";
import { PROMPT_VERSION, SCRIPT_SCHEMA, buildUserPrompt } from "../automation/src/script/generator/prompt";
import { evaluate, similarity } from "../automation/src/script/evaluate";
import { findDuplicate, narrationOf, SIMILARITY_THRESHOLD } from "../automation/src/script/dedupe";
import { readPackage, writePackage } from "../automation/src/script/package";
import { FORMATS } from "../automation/src/formats";
import { ctaLine, tts } from "../automation/src/config";

function item(overrides: Partial<RadarItem> = {}): RadarItem {
  return {
    slug: "un-caso",
    title: "Florida salta 13 puestos y entra en el Top 10",
    body: [
      "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28.",
      "Es el mayor salto de la semana.",
    ],
    confidence: "CONFIRMED",
    priority: 4,
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

function request(overrides: Partial<GenerationRequest> = {}): GenerationRequest {
  const radarItem = overrides.item ?? item();
  const spec = FORMATS[radarItem.format];
  return {
    item: radarItem,
    evidence: evidenceFor(radarItem),
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
    ...overrides,
  };
}

// --- the seam -------------------------------------------------------------

test("the default engine is the deterministic template writer", () => {
  assert.equal(DEFAULT_GENERATOR, "template");
  const { generator, fellBackFrom } = createGenerator(DEFAULT_GENERATOR);
  assert.equal(generator.id, "template");
  assert.equal(fellBackFrom, undefined);
  assert.equal(generator.model, null);
});

test("generator ids parse, and unknown ones are rejected rather than guessed", () => {
  assert.equal(parseGeneratorId("claude"), "claude");
  assert.equal(parseGeneratorId("MOCK"), "mock");
  assert.equal(parseGeneratorId("gpt"), undefined);
  assert.equal(parseGeneratorId(undefined), undefined);
});

test("claude falls back to the template writer when no credentials are present", () => {
  const previous = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    const { generator, fellBackFrom } = createGenerator("claude");
    assert.equal(generator.id, "template");
    assert.equal(fellBackFrom, "claude");
  } finally {
    if (previous !== undefined) process.env.ANTHROPIC_API_KEY = previous;
  }
});

// --- never invent ---------------------------------------------------------

test("numeric tokens are extracted from scores, ranks and dates", () => {
  assert.deepEqual(numericTokens("gana 52-28 el 13 de octubre"), ["52-28", "13"]);
  assert.deepEqual(numericTokens("sin cifras"), []);
});

test("a figure that is not in the evidence is refused", () => {
  const problems = checkGrounding(
    [{ text: "Florida ganó 70-0.", kind: "verified", evidenceIndices: [1] }],
    request(),
  );
  assert.ok(problems.some((p) => p.problem.includes('"70-0"')));
});

test("a figure that IS in the evidence passes", () => {
  const problems = checkGrounding(
    [
      {
        text: "Los Gators aplastaron a Ole Miss 52-28.",
        kind: "verified",
        evidenceIndices: [1],
      },
    ],
    request(),
  );
  assert.deepEqual(problems, []);
});

test("an inference may not introduce an unbacked figure", () => {
  // The blanket ban this replaced ("an inference may not state figures") was
  // wrong: it rejected denominations the evidence had already established.
  // What must still fail is a figure the source never gives, in any role.
  const invented = checkGrounding(
    [{ text: "Esto les deja a 3 partidos del playoff.", kind: "inference", evidenceIndices: [] }],
    request(),
  );
  assert.ok(invented.length > 0, "an unsourced count is still refused");
  assert.ok(invented.some((p) => /count of partido/.test(p.problem)));
});

test("an inference may reference a figure the evidence does state", () => {
  // Same claim kind, same presence of digits — the difference is backing.
  const backed = checkGrounding(
    [
      {
        text: "Ganar 52-28 a Ole Miss explica el salto.",
        kind: "inference",
        evidenceIndices: [],
      },
    ],
    request(),
  );
  assert.deepEqual(backed, []);
});

test("a verified claim must cite evidence and must exist", () => {
  assert.ok(
    checkGrounding([{ text: "Algo cierto pero sin citar", kind: "verified", evidenceIndices: [] }], request())
      .some((p) => p.problem.includes("must cite evidence")),
  );
  assert.ok(
    checkGrounding(
      [{ text: "Los Gators de Florida entran en el AP Poll", kind: "verified", evidenceIndices: [99] }],
      request(),
    ).some((p) => p.problem.includes("does not exist")),
  );
});

test("a verified claim unrelated to the evidence is refused", () => {
  const problems = checkGrounding(
    [
      {
        text: "El entrenador anunció su marcha definitiva ayer durante rueda prensa",
        kind: "verified",
        evidenceIndices: [1],
      },
    ],
    request(),
  );
  assert.ok(problems.some((p) => p.problem.includes("almost no wording in common")));
});

test("assemble refuses an ungrounded script outright", () => {
  const raw: RawScript = {
    hook: "Florida sube al Top 10",
    beats: ["Ganaron por 99-0 en la prórroga."],
    conclusion: "Queda claro el salto",
    claims: [{ text: "Ganaron por 99-0 en la prórroga.", kind: "verified", evidenceIndices: [1] }],
  };
  const outcome = assemble({
    request: request(),
    raw,
    generator: "test",
    model: null,
    promptVersion: "t",
    usage: null,
    now: "2026-01-01",
  });
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "ungrounded-claim");
});

// --- structural validation ------------------------------------------------

test("structural problems are named rather than rendered", () => {
  const base: RawScript = {
    hook: "Hook",
    beats: ["Beat uno."],
    conclusion: "Cierre",
    claims: [{ text: "Beat uno.", kind: "verified", evidenceIndices: [0] }],
  };
  assert.equal(validateRaw(base), undefined);
  assert.match(validateRaw({ ...base, hook: "" })!, /no hook/);
  assert.match(validateRaw({ ...base, beats: [] })!, /no body beats/);
  assert.match(validateRaw({ ...base, conclusion: "" })!, /no conclusion/);
  assert.match(validateRaw({ ...base, claims: [] })!, /no claims/);
  assert.match(validateRaw({ ...base, conclusion: "¿Y ahora qué?" })!, /question/);
  assert.match(
    validateRaw({ ...base, beats: ["Beat uno.", "Beat uno."] })!,
    /repeat the same sentence/,
  );
});

test("a script outside the format band is refused with the measured estimate", () => {
  const long: RawScript = {
    hook: "Florida sube",
    // Distinct beats, so the length is what fails rather than the repetition check.
    beats: Array.from({ length: 6 }, (_, i) => `beat ${i} ${"palabra ".repeat(60).trim()}`),
    conclusion: "Cierre del asunto",
    claims: [{ text: "Florida sube", kind: "verified", evidenceIndices: [0] }],
  };
  const outcome = assemble({
    request: request(),
    raw: long,
    generator: "test",
    model: null,
    promptVersion: "t",
    usage: null,
    now: "2026-01-01",
  });
  assert.equal(outcome.ok, false);
  if (!outcome.ok) {
    assert.equal(outcome.reason, "duration-out-of-band");
    assert.match(outcome.detail, /outside 20-45s/);
  }
});

test("the scene list opens on a hook and lands on a conclusion plus the CTA", () => {
  const scenes = toScenes({
    hook: "Florida sube al Top 10",
    beats: ["Aplastaron a Ole Miss."],
    conclusion: "El salto es el mayor del año",
    claims: [],
  });
  assert.equal(scenes[0].kind, "hook");
  assert.equal(scenes.at(-1)!.kind, "outro");
  assert.ok(scenes.at(-1)!.narration.startsWith("El salto es el mayor del año."));
  // Assert against the configured CTA, not a hard-coded brand, so a rebrand
  // does not silently leave this test asserting the old identity.
  assert.ok(scenes.at(-1)!.narration.endsWith(ctaLine));
  assert.ok(ctaLine.includes("Gridiron Spain"), "the CTA names the lead brand");
  assert.ok(scenes[0].padBeforeSec > 0 && scenes[0].padAfterSec > 0);
});

// --- duration bands -------------------------------------------------------

test("the formats carry the requested bands", () => {
  assert.equal(FORMATS.news.minDurationSec, 20);
  assert.equal(FORMATS.news.maxDurationSec, 45);
  assert.equal(FORMATS.explainer.minDurationSec, 30);
  assert.equal(FORMATS.explainer.maxDurationSec, 75);
});

test("duration estimation counts narration plus the renderer's padding", () => {
  const scenes = toScenes({ hook: "Uno dos tres", beats: ["Cuatro cinco seis."], conclusion: "Siete", claims: [] });
  const spokenOnly = scenes.reduce(
    (t, s) => t + (s.narration.split(/\s+/).length / tts.rate) * 60,
    0,
  );
  const withPadding = estimateClipSeconds(scenes, tts.rate);
  assert.ok(withPadding > spokenOnly, "padding is part of the clip length");
});

// --- material gates -------------------------------------------------------

test("EXPLAINER demands more corroboration and more prose than NEWS", () => {
  assert.ok(FORMATS.explainer.minSources > FORMATS.news.minSources);
  assert.ok(FORMATS.explainer.minEvidence > FORMATS.news.minEvidence);
});

test("a table-only research document yields too little evidence to narrate", () => {
  const tableOnly = item({ format: "explainer", body: [], title: "Un Club" });
  assert.ok(evidenceFor(tableOnly).length < FORMATS.explainer.minEvidence);
});

// --- budget, retries, timeout --------------------------------------------

test("the budget stops the run once the ceiling is reached", () => {
  const budget = new Budget(0.1);
  assert.equal(budget.canSpend(), true);
  budget.record({ inputTokens: 1000, outputTokens: 500, cacheReadTokens: 0, cacheWriteTokens: 0, estimatedCostUsd: 0.09 });
  assert.equal(budget.canSpend(), true);
  budget.record({ inputTokens: 1000, outputTokens: 500, cacheReadTokens: 0, cacheWriteTokens: 0, estimatedCostUsd: 0.05 });
  assert.equal(budget.canSpend(), false);
  assert.equal(budget.remainingUsd(), 0);
  assert.equal(budget.totals().inputTokens, 2000);
});

test("cost is estimated from list prices, and is null for an unpriced model", () => {
  const cost = estimateCostUsd("claude-opus-5", 1_000_000, 100_000);
  assert.ok(cost !== null);
  assert.ok(Math.abs(cost! - (5 + 2.5)) < 1e-6);
  assert.equal(estimateCostUsd("some-unlisted-model", 1000, 1000), null);
});

test("backoff grows and is capped", () => {
  assert.equal(backoffDelayMs(1, defaultRetryPolicy), 800);
  assert.equal(backoffDelayMs(2, defaultRetryPolicy), 1600);
  assert.equal(backoffDelayMs(9, defaultRetryPolicy), defaultRetryPolicy.maxDelayMs);
});

test("retries are bounded and stop early on a non-retryable failure", async () => {
  const policy = { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 1 };
  const noSleep = async () => {};

  let retryable = 0;
  const exhausted = await withRetries<string>(
    policy,
    () => {},
    { generator: "t", slug: "s" },
    async () => {
      retryable += 1;
      return { retryable: true, error: new Error("boom") };
    },
    noSleep,
  );
  assert.equal(retryable, 3, "stops at maxAttempts");
  assert.equal(exhausted.value, undefined);

  let fatal = 0;
  await withRetries<string>(
    policy,
    () => {},
    { generator: "t", slug: "s" },
    async () => {
      fatal += 1;
      return { retryable: false, error: new Error("bad key") };
    },
    noSleep,
  );
  assert.equal(fatal, 1, "a non-retryable failure is not retried");

  let attempts = 0;
  const recovered = await withRetries<string>(
    policy,
    () => {},
    { generator: "t", slug: "s" },
    async (n) => {
      attempts = n;
      return n < 2 ? { retryable: true, error: new Error("flaky") } : { value: "ok", retryable: false };
    },
    noSleep,
  );
  assert.equal(recovered.value, "ok");
  assert.equal(attempts, 2);
});

test("a hung call is abandoned at the timeout", async () => {
  await assert.rejects(
    () => withTimeout(new Promise(() => {}), 20, "stuck call"),
    TimeoutError,
  );
  assert.equal(await withTimeout(Promise.resolve(7), 1000, "fast"), 7);
});

// --- mock engine ----------------------------------------------------------

test("the mock engine is deterministic and costs nothing", async () => {
  const generator = new MockScriptGenerator();
  const a = await generator.generate(request());
  const b = await generator.generate(request());
  assert.equal(a.ok, true);
  assert.equal(b.ok, true);
  if (a.ok && b.ok) {
    assert.deepEqual(a.result.script.scenes, b.result.script.scenes);
    assert.equal(a.result.editorial.scriptFingerprint, b.result.editorial.scriptFingerprint);
    assert.equal(a.result.editorial.usage?.estimatedCostUsd, 0);
    assert.equal(a.result.editorial.generatedAt, b.result.editorial.generatedAt);
  }
});

test("the mock engine exercises the real rejection paths", async () => {
  const malformed = await new MockScriptGenerator({ failWith: "malformed" }).generate(request());
  assert.equal(malformed.ok, false);
  if (!malformed.ok) assert.equal(malformed.reason, "malformed-output");

  const ungrounded = await new MockScriptGenerator({ failWith: "ungrounded" }).generate(request());
  assert.equal(ungrounded.ok, false);
  if (!ungrounded.ok) assert.equal(ungrounded.reason, "ungrounded-claim");
});

test("the template engine still produces a package and invents nothing", async () => {
  const source = item();
  const outcome = await new TemplateScriptGenerator(() => "2026-01-01").generate(request({ item: source }));
  assert.equal(outcome.ok, true);
  if (outcome.ok) {
    assert.equal(outcome.result.editorial.generator, "template");
    assert.equal(outcome.result.editorial.model, null);
    const evidence = source.body.join(" ");
    for (const claim of outcome.result.editorial.claims) {
      for (const n of numericTokens(claim.text)) {
        assert.ok(evidence.includes(n), `figure ${n} must come from the source`);
      }
    }
  }
});

// --- Claude adapter (injected client; never the network) ------------------

function fakeResponse(body: unknown, overrides: Record<string, unknown> = {}) {
  return {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-opus-5",
    stop_reason: "end_turn",
    content: [{ type: "text", text: JSON.stringify(body) }],
    usage: { input_tokens: 1200, output_tokens: 300, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 },
    ...overrides,
  };
}

const goodBody = {
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

test("the Claude adapter turns a schema-shaped response into a package", async () => {
  const calls: Record<string, unknown>[] = [];
  const generator = new ClaudeScriptGenerator({
    now: () => "2026-01-01",
    client: {
      messages: {
        create: async (params: Record<string, unknown>) => {
          calls.push(params);
          return fakeResponse(goodBody);
        },
      },
    } as never,
  });

  assert.equal(generator.available(), true, "an injected client is enough to run");
  const outcome = await generator.generate(request());
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;

  const { editorial } = outcome.result;
  assert.equal(editorial.generator, "claude");
  assert.equal(editorial.model, "claude-opus-5");
  assert.equal(editorial.promptVersion, PROMPT_VERSION);
  assert.equal(editorial.usage?.inputTokens, 1200);
  assert.ok((editorial.usage?.estimatedCostUsd ?? 0) > 0, "cost is estimated from list prices");
  assert.equal(editorial.claims.filter((c) => c.kind === "inference").length, 1);

  // The request must constrain the output rather than hope for JSON in prose.
  const sent = calls[0];
  assert.equal(sent.model, "claude-opus-5");
  assert.deepEqual((sent.output_config as Record<string, unknown>).format, {
    type: "json_schema",
    schema: SCRIPT_SCHEMA,
  });
  assert.equal(sent.temperature, undefined, "sampling params are rejected on this model");
  assert.ok(typeof sent.system === "string" && (sent.system as string).includes("Primer Down"));
});

test("the adapter treats a refusal as a typed rejection, not a crash", async () => {
  const generator = new ClaudeScriptGenerator({
    client: {
      messages: {
        create: async () =>
          fakeResponse(goodBody, {
            stop_reason: "refusal",
            stop_details: { type: "refusal", category: "cyber" },
            content: [],
          }),
      },
    } as never,
  });
  const outcome = await generator.generate(request());
  assert.equal(outcome.ok, false);
  if (!outcome.ok) {
    assert.equal(outcome.reason, "provider-refusal");
    assert.match(outcome.detail, /declined/);
  }
});

test("the adapter retries a malformed body, then gives up with a typed reason", async () => {
  let attempts = 0;
  const generator = new ClaudeScriptGenerator({
    retry: { maxAttempts: 2, baseDelayMs: 1, maxDelayMs: 1 },
    client: {
      messages: {
        create: async () => {
          attempts += 1;
          return fakeResponse({ nonsense: true });
        },
      },
    } as never,
  });
  const outcome = await generator.generate(request());
  assert.equal(attempts, 2, "a malformed body is worth one more try");
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "provider-error");
});

test("the adapter refuses to spend past the budget", async () => {
  const budget = new Budget(0.001);
  budget.record({ inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, estimatedCostUsd: 1 });
  let called = false;
  const generator = new ClaudeScriptGenerator({
    budget,
    client: { messages: { create: async () => { called = true; return fakeResponse(goodBody); } } } as never,
  });
  const outcome = await generator.generate(request());
  assert.equal(called, false, "no request is issued once the budget is spent");
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "budget-exhausted");
});

test("the adapter times out rather than hanging a scheduled run", async () => {
  const generator = new ClaudeScriptGenerator({
    timeoutMs: 20,
    retry: { maxAttempts: 1, baseDelayMs: 1, maxDelayMs: 1 },
    client: { messages: { create: () => new Promise(() => {}) } } as never,
  });
  const outcome = await generator.generate(request());
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.reason, "provider-timeout");
});

test("responses parse from parsed_output or from a JSON text block", () => {
  assert.ok(parseScript({ parsed_output: goodBody } as never));
  assert.ok(parseScript(fakeResponse(goodBody) as never));
  assert.equal(parseScript({ content: [{ type: "text", text: "lo siento" }] } as never), undefined);
  assert.equal(parseScript({ content: [] } as never), undefined);
});

test("retryable and fatal provider errors are told apart", () => {
  assert.equal(classifyError(new TimeoutError("slow")).retryable, true);
  assert.equal(classifyError(new Error("who knows")).retryable, false);
});

test("the prompt carries the material, the band and the never-invent rule", () => {
  const prompt = buildUserPrompt(request());
  assert.ok(prompt.includes("Ole Miss 52-28"), "evidence is in the prompt");
  assert.ok(prompt.includes("https://sports.yahoo.com/x"), "references are in the prompt");
  assert.match(prompt, /\[0\]/, "evidence is indexed so claims can cite it");
  assert.ok(prompt.includes(String(tts.rate)), "the narration rate is stated");
  assert.ok(/NEWS/.test(prompt));
});

// --- editorial package ----------------------------------------------------

test("the package records everything an editor needs to approve a clip", async () => {
  const outcome = await new MockScriptGenerator({ now: "2026-01-01" }).generate(request());
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  const pkg = outcome.result.editorial;

  assert.ok(pkg.script.scenes.length > 0, "the script");
  assert.equal(pkg.format, "news", "the type");
  assert.equal(pkg.sourcePath, "research/daily/2026-10-02.md", "the original source");
  assert.equal(pkg.sourceDate, "2026-10-02", "the date");
  assert.ok(pkg.claims.some((c) => c.kind === "verified"), "checkable assertions");
  assert.ok(pkg.references.length > 0, "references");
  assert.ok(pkg.mediaRights.every((m) => m.license && m.rightsHolder), "media rights");
  assert.equal(pkg.model, "mock-model", "the model used");
  assert.ok(pkg.promptVersion.length > 0, "the prompt version");
});

test("the package round-trips through disk with its evaluation attached", async () => {
  const outcome = await new MockScriptGenerator({ now: "2026-01-01" }).generate(request());
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-pkg-"));
  const evaluation = evaluate(outcome.result.editorial, tts.rate);
  const file = writePackage(outcome.result.editorial, evaluation, dir);
  const stored = readPackage(file);

  assert.equal(stored.slug, outcome.result.editorial.slug);
  assert.equal(stored.evaluation.score, evaluation.score);
  assert.deepEqual(stored.claims, outcome.result.editorial.claims);
  fs.rmSync(dir, { recursive: true, force: true });
});

// --- dedup ----------------------------------------------------------------

test("the same event under two headlines collides", () => {
  const a = eventKeyFor("Navy busca el three-peat del Commander-in-Chief's Trophy", "2026-10-02");
  const b = eventKeyFor("El three-peat de Navy en el Commander-in-Chief's Trophy busca", "2026-10-02");
  assert.equal(a, b, "word order must not change the event identity");
  assert.notEqual(a, eventKeyFor("Florida salta 13 puestos", "2026-10-02"));
  assert.notEqual(a, eventKeyFor("Navy busca el three-peat del Commander-in-Chief's Trophy", "2026-10-09"));
});

test("a near-identical script is caught even when the event differs", () => {
  const narration = "Los Gators de Florida entran en el AP Poll tras aplastar a Ole Miss en Gainesville";
  const ledger = {
    entries: [
      {
        slug: "otro-clip",
        title: "Otro",
        briefingDate: "2026-10-01",
        contentHash: "h",
        producedAt: "2026-10-01",
        videoPath: "out/otro.mp4",
        format: "news" as const,
        eventKey: "2026-10-01:deadbeef",
        scriptFingerprint: "ffffffffffffffff",
        narration,
      },
    ],
  };

  const hit = findDuplicate(ledger, {
    slug: "nuevo-clip",
    eventKey: "2026-10-02:cafebabe",
    scriptFingerprint: "0000000000000000",
    narration,
  });
  assert.ok(hit);
  assert.equal(hit!.kind, "similar-script");
  assert.ok(hit!.score >= SIMILARITY_THRESHOLD);

  const miss = findDuplicate(ledger, {
    slug: "nuevo-clip",
    eventKey: "2026-10-02:cafebabe",
    scriptFingerprint: "0000000000000000",
    narration: "Badalona Dracs cumple treinta años en la liga catalana de fútbol americano",
  });
  assert.equal(miss, undefined);
});

test("an exact event match is caught before similarity is consulted", () => {
  const ledger = {
    entries: [
      {
        slug: "ya-publicado",
        title: "T",
        briefingDate: "2026-10-02",
        contentHash: "h",
        producedAt: "2026-10-02",
        videoPath: "out/x.mp4",
        format: "news" as const,
        eventKey: "2026-10-02:aaaaaaaaaa",
        narration: "texto completamente distinto sobre otra cosa",
      },
    ],
  };
  const hit = findDuplicate(ledger, {
    slug: "otro-slug",
    eventKey: "2026-10-02:aaaaaaaaaa",
    scriptFingerprint: "x",
    narration: "nada que ver",
  });
  assert.equal(hit?.kind, "same-event");
});

test("the CTA is excluded from the narration fingerprint", () => {
  const scenes = toScenes({ hook: "Hook", beats: ["Beat."], conclusion: "Cierre", claims: [] });
  assert.ok(!narrationOf(scenes).includes("Primer Down"));
  assert.notEqual(fingerprintNarration(scenes), "");
});

// --- independent evaluation ----------------------------------------------

/**
 * Pads a fixture out to the NEWS band. Scene padding shrank when the pacing
 * was tightened, so a two-beat fixture now estimates under 20s; the beats are
 * drawn from the same evidence so grounding is unaffected.
 */
const FILLER_BEATS = [
  "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28.",
  "Es el mayor salto de la semana.",
];

async function packageWith(raw: RawScript) {
  const outcome = assemble({
    request: request(),
    raw,
    generator: "test",
    model: null,
    promptVersion: "t",
    usage: null,
    now: "2026-01-01",
  });
  assert.equal(outcome.ok, true, outcome.ok ? "" : (outcome as { detail: string }).detail);
  return outcome.ok ? outcome.result.editorial : undefined;
}

test("a clean script scores full marks", async () => {
  const pkg = await packageWith({
    hook: "Florida salta 13 puestos y entra en el Top 10",
    beats: [...FILLER_BEATS, "Florida vuelve a ser relevante en la conversación de playoff"],
    conclusion: "Florida vuelve a la conversación de playoff",
    claims: [
      { text: "Los Gators aplastaron a Ole Miss 52-28.", kind: "verified", evidenceIndices: [1] },
      { text: "Es el mayor salto de la semana.", kind: "verified", evidenceIndices: [2] },
    ],
  });
  const report = evaluate(pkg!, tts.rate);
  assert.equal(report.ok, true);
  assert.equal(report.score, 100);
});

test("the evaluator catches filler, apparatus and fragments", async () => {
  const pkg = await packageWith({
    hook: "Florida salta 13 puestos y entra en el Top 10",
    beats: [
      "Sin duda alguna los Gators aplastaron a Ole Miss 52-28.",
      "junto con el resto de la conferencia es el mayor salto.",
      "Fuente CONFIRMED en https://example.com sobre el salto.",
    ],
    conclusion: "Florida vuelve a la conversación",
    claims: [
      { text: "Sin duda alguna los Gators aplastaron a Ole Miss 52-28.", kind: "verified", evidenceIndices: [1] },
    ],
  });
  const report = evaluate(pkg!, tts.rate);
  assert.equal(report.ok, false);
  const kinds = report.errors.map((e) => e.message);
  assert.ok(kinds.some((m) => /filler/.test(m)), "filler is caught");
  assert.ok(kinds.some((m) => /starts mid-sentence/.test(m)), "a lowercase fragment is caught");
  assert.ok(kinds.some((m) => /research apparatus/.test(m)), "a URL or confidence marker is caught");
  assert.ok(report.score < 100);
});

test("the evaluator catches two beats that say the same thing", async () => {
  const pkg = await packageWith({
    hook: "Florida salta 13 puestos y entra en el Top 10",
    beats: [
      "Los Gators aplastaron a Ole Miss 52-28 en el partido.",
      "En el partido los Gators aplastaron a Ole Miss 52-28.",
    ],
    conclusion: "Florida vuelve a la conversación",
    claims: [
      { text: "Los Gators aplastaron a Ole Miss 52-28 en el partido.", kind: "verified", evidenceIndices: [1] },
    ],
  });
  const report = evaluate(pkg!, tts.rate);
  assert.ok(report.errors.some((e) => /say the same thing/.test(e.message)));
});

test("the evaluator is independent of the generator that wrote the script", async () => {
  // Same words, two different declared authors: the verdict must not move.
  const raw: RawScript = {
    hook: "Florida salta 13 puestos y entra en el Top 10",
    beats: [...FILLER_BEATS, "Sin duda alguna es el mayor salto de la semana."],
    conclusion: "Florida vuelve a la conversación",
    claims: [{ text: "Es el mayor salto de la semana.", kind: "verified", evidenceIndices: [2] }],
  };
  const scores = ["claude", "template", "mock"].map((generator) => {
    const outcome = assemble({
      request: request(),
      raw,
      generator,
      model: generator === "template" ? null : "m",
      promptVersion: "p",
      usage: null,
      now: "2026-01-01",
    });
    assert.equal(outcome.ok, true);
    return outcome.ok ? evaluate(outcome.result.editorial, tts.rate).score : -1;
  });
  assert.equal(new Set(scores).size, 1, "the grader does not care who wrote it");
});

test("similarity is symmetric and bounded", () => {
  const a = "Los Gators de Florida entran en el Top 10 del AP Poll";
  const b = "Florida entra en el Top 10 del AP Poll tras ganar";
  assert.ok(similarity(a, b) > 0.2);
  assert.equal(similarity(a, b), similarity(b, a));
  assert.equal(similarity(a, a), 1);
  assert.equal(similarity(a, ""), 0);
});

// --- provider-call budgeting ---------------------------------------------
// The first real CLI run burned one subscription call per candidate because
// only *successful* clips counted against --limit. These pin the fix.

test("cheap format gates reject without spending a provider call", async () => {
  const { prefilter } = await import("../automation/src/pipeline");

  // A research doc that is only a fact table: no narratable prose.
  const tableOnly = item({ format: "explainer", body: [], title: "Un Club" });
  const blocked = prefilter(tableOnly);
  assert.ok(blocked, "a table-only document is refused before any call");
  assert.equal(blocked!.reason, "insufficient-material");

  // A news item with no reference link.
  const unsourced = item({ sources: [] });
  assert.equal(prefilter(unsourced)?.reason, "insufficient-sources");

  // A healthy item passes the gate and is allowed to reach the provider.
  assert.equal(prefilter(item()), undefined);
});

test("the run stops at the provider-call ceiling instead of walking every candidate", async () => {
  const { runPipeline } = await import("../automation/src/pipeline");
  const { SilentProvider } = await import("../automation/src/tts/silent");

  const result = await runPipeline({
    formats: ["news"],
    limit: 1,
    // Every generation fails, so without a ceiling the loop would call the
    // provider once per candidate.
    generator: "mock",
    maxGenerations: 2,
    dryRun: true,
    provider: new SilentProvider(),
    now: () => "2026-01-01",
  });

  assert.ok(result.generations.used <= 2, `used ${result.generations.used}, expected at most 2`);
  assert.equal(result.generations.limit, 2);
});

test("the default ceiling is twice the clip limit, never zero", async () => {
  const { runPipeline } = await import("../automation/src/pipeline");
  const { SilentProvider } = await import("../automation/src/tts/silent");

  const result = await runPipeline({
    formats: ["news"],
    limit: 1,
    generator: "mock",
    dryRun: true,
    provider: new SilentProvider(),
    now: () => "2026-01-01",
  });
  assert.equal(result.generations.limit, 2, "limit 1 => at most 2 provider calls");
  assert.ok(result.generations.used >= 1);
});

test("the run report states how many provider calls were made", async () => {
  const { runPipeline, formatReport } = await import("../automation/src/pipeline");
  const { SilentProvider } = await import("../automation/src/tts/silent");

  const result = await runPipeline({
    formats: ["news"],
    limit: 1,
    generator: "mock",
    maxGenerations: 3,
    dryRun: true,
    provider: new SilentProvider(),
    now: () => "2026-01-01",
  });
  assert.match(formatReport(result), /Generations: \d+ of 3 allowed/);
});
