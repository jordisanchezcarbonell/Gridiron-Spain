/**
 * Contextual claim validation.
 *
 * Driven by the real Florida briefing item — the one whose generation was
 * rejected on the first live `claude-cli` run — read from `research/` without
 * modification. No provider is called.
 */
import assert from "node:assert/strict";
import test from "node:test";
import type { Claim, GenerationRequest } from "../automation/src/script/generator/types";
import { checkGrounding, evidenceFor } from "../automation/src/script/generator/assemble";
import {
  describeKind,
  evidenceKeysOf,
  isBacked,
  mentionKey,
  numericMentions,
} from "../automation/src/script/numeric";
import { collectItems } from "../automation/src/pipeline";
import { FORMATS } from "../automation/src/formats";
import { tts } from "../automation/src/config";

/** The real radar item, unmodified. */
function floridaRequest(): GenerationRequest {
  const item = collectItems(["news"]).find((i) => i.slug.startsWith("florida"));
  assert.ok(item, "the Florida briefing item must still be in research/daily");
  const spec = FORMATS[item.format];
  return {
    item,
    evidence: evidenceFor(item),
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
  };
}

function judge(text: string, kind: Claim["kind"], request = floridaRequest()) {
  const claim: Claim = { text, kind, evidenceIndices: kind === "verified" ? [1] : [] };
  return checkGrounding([claim], request);
}

// --- classification -------------------------------------------------------

test("a number's role is read from its context, not from the digits", () => {
  const key = (text: string) => numericMentions(text).map(mentionKey);

  assert.deepEqual(key("entra en el Top 10"), ["rank:10"]);
  assert.deepEqual(key("el #8 del AP Poll"), ["rank:8"]);
  assert.deepEqual(key("la División 1"), ["rank:1"]);
  assert.deepEqual(key("LNFA 2 de la temporada"), ["rank:2"]);
  assert.deepEqual(key("la Jornada 5"), ["rank:5"]);

  // The same word before and after the number means different things.
  assert.deepEqual(key("puesto 13"), ["rank:13"], "a position");
  assert.deepEqual(key("salta 13 puestos"), ["count:13:puesto"], "a number of positions moved");

  assert.deepEqual(key("aplastar a Ole Miss 52-28"), ["score:52-28"]);
  assert.deepEqual(key("un 45% de los votos"), ["percentage:45"]);
  assert.deepEqual(key("en 2026"), ["date:2026"]);
  assert.deepEqual(key("la temporada 2026-27"), ["date:2026-27"]);
  assert.deepEqual(key("2 títulos"), ["count:2:titulo"]);
});

test("a season span is a date, not a score", () => {
  assert.equal(numericMentions("Serie A 2026-27")[0].kind, "date");
  assert.equal(numericMentions("ganó 27-26")[0].kind, "score");
});

test("plural and singular units compare equal", () => {
  assert.equal(mentionKey(numericMentions("2 títulos")[0]), "count:2:titulo");
  assert.equal(mentionKey(numericMentions("1 título")[0]), "count:1:titulo");
});

test("roles are described in words a person can act on", () => {
  assert.match(describeKind(numericMentions("Top 10")[0]), /ranking or denomination/);
  assert.match(describeKind(numericMentions("52-28")[0]), /result/);
  assert.match(describeKind(numericMentions("8 puntos")[0]), /count of punto/);
});

// --- POSITIVE: documented rankings may be referenced ----------------------

test("THE REGRESSION: the sentence rejected on the first live run is now accepted", () => {
  // Opus wrote this, labelled it an inference, and it was refused with
  // "an inference may not state figures (10)". The evidence says Florida
  // "entra en el Top 10", so the denomination is documented.
  const problems = judge("Estar en el Top 10 cambia el peso de cada partido que les queda.", "inference");
  assert.deepEqual(problems, [], "a documented denomination is not an invented figure");
});

test("an inference may lean on any denomination the evidence establishes", () => {
  for (const text of [
    "Entrar en el Top 10 les cambia el calendario.",
    "Ser el #8 del AP Poll pesa en cada jornada.",
    "Un salto de 13 puestos no se repite cada semana.",
  ]) {
    assert.deepEqual(judge(text, "inference"), [], `should be accepted: ${text}`);
  }
});

test("an inference may reference a documented result", () => {
  assert.deepEqual(
    judge("Ganar 52-28 a Ole Miss explica el salto.", "inference"),
    [],
    "the score is in the evidence; the reading of it is the inference",
  );
});

test("a verified claim repeating sourced figures passes", () => {
  assert.deepEqual(judge("Los Gators aplastaron a Ole Miss 52-28.", "verified"), []);
  assert.deepEqual(judge("Florida sube 13 puestos y entra en el Top 10.", "verified"), []);
});

// --- NEGATIVE: unbacked rankings ------------------------------------------

test("a ranking the evidence never states is refused", () => {
  for (const [text, digit] of [
    ["Entrar en el Top 5 lo cambia todo.", "5"],
    ["Ya son el #3 del país.", "3"],
    ["Bajan a la División 2.", "2"],
  ] as const) {
    const problems = judge(text, "inference");
    assert.equal(problems.length, 1, `should be refused: ${text}`);
    assert.match(problems[0].problem, new RegExp(`"${digit}"`));
    assert.match(problems[0].problem, /ranking or denomination/);
  }
});

test("a ranking is refused even when labelled verified", () => {
  const problems = judge("Florida es el #1 del AP Poll.", "verified");
  assert.ok(problems.some((p) => /ranking or denomination/.test(p.problem)));
});

// --- NEGATIVE: invented figures -------------------------------------------

test("invented results, percentages, records and dates are all refused", () => {
  const cases: [string, Claim["kind"], RegExp][] = [
    ["Vencieron 60-0 en casa.", "verified", /result/],
    ["Suben un 45% en audiencia.", "inference", /percentage/],
    ["Acumulan 7 victorias seguidas.", "verified", /count of victoria/],
    ["Desde 2019 no estaban tan arriba.", "inference", /date/],
    ["Ganaron el 3 de octubre.", "verified", /date/],
  ];
  for (const [text, kind, expected] of cases) {
    const problems = judge(text, kind);
    assert.ok(problems.length > 0, `should be refused: ${text}`);
    assert.ok(
      problems.some((p) => expected.test(p.problem)),
      `expected ${expected} for: ${text}`,
    );
  }
});

// --- NEGATIVE: unjustified relations built from real digits ---------------

test("a number may not change role to manufacture a relation", () => {
  // The evidence says Florida is #8 — a ranking. It does not say Florida won
  // by eight points. Matching on digits alone let this through before.
  const margin = judge("Ganaron por 8 puntos de ventaja.", "inference");
  assert.equal(margin.length, 1);
  assert.match(margin[0].problem, /count of punto/);

  // The evidence says it climbed 13 positions, not that it sits 13 off the top.
  const gap = judge("Les deja a 13 de la cima.", "inference");
  assert.equal(gap.length, 1);

  // The evidence has a 52-28 score; neither half is a free-standing figure.
  const half = judge("Marcaron 52 puntos de media esta temporada.", "inference");
  assert.equal(half.length, 1, "a score's components are not loose numbers");
  assert.match(half[0].problem, /count of punto/);
});

test("the error names the role and quotes the context, so it can be acted on", () => {
  const [problem] = judge("Ganaron por 8 puntos de ventaja.", "inference");
  assert.match(problem.problem, /"8"/);
  assert.match(problem.problem, /count of punto/);
  assert.match(problem.problem, /8 puntos de ventaja/, "the surrounding words are quoted");
});

// --- the backing rule itself ---------------------------------------------

test("backing requires the same role, not merely the same value", () => {
  const keys = evidenceKeysOf(["entra en el Top 10 tras ganar 52-28"]);

  const rank10 = numericMentions("el Top 10")[0];
  assert.equal(isBacked(rank10, keys), true);

  const count10 = numericMentions("10 partidos")[0];
  assert.equal(isBacked(count10, keys), false, "a rank does not license a count");

  const score = numericMentions("ganaron 52-28")[0];
  assert.equal(isBacked(score, keys), true);

  const loose52 = numericMentions("52 puntos")[0];
  assert.equal(isBacked(loose52, keys), false, "half a score is not a figure");
});

test("a roleless number is tolerated only in a verified claim", () => {
  const keys = evidenceKeysOf(["salta 13 puestos"]);
  const bare = numericMentions("los 13 que subió")[0];
  assert.equal(bare.kind, "quantity");

  // A verified claim is separately required to share wording with its source,
  // so a vaguer restatement is allowed there.
  assert.equal(isBacked(bare, keys, "verified"), true);
  // An inference offering a number with no stated role is not.
  assert.equal(isBacked(bare, keys, "inference"), false);
});

test("nothing is allowed merely for being a small or common number", () => {
  // No whitelist: 1, 2 and 10 are refused exactly like any other figure when
  // the evidence does not state them in that role.
  const request = floridaRequest();
  for (const text of ["Suman 1 título.", "Llevan 2 derrotas.", "Son el Top 1."]) {
    assert.ok(judge(text, "inference", request).length > 0, `should be refused: ${text}`);
  }
});

// --- the rest of the grounding contract is unchanged ---------------------

test("claim/evidence bookkeeping still holds", () => {
  const request = floridaRequest();

  const uncited = checkGrounding(
    [{ text: "Algo cierto pero sin citar.", kind: "verified", evidenceIndices: [] }],
    request,
  );
  assert.ok(uncited.some((p) => /must cite evidence/.test(p.problem)));

  const bogus = checkGrounding(
    [{ text: "Los Gators de Florida entran en el AP Poll.", kind: "verified", evidenceIndices: [99] }],
    request,
  );
  assert.ok(bogus.some((p) => /does not exist/.test(p.problem)));

  const unrelated = checkGrounding(
    [
      {
        text: "El entrenador anuncio su marcha definitiva durante la rueda prensa",
        kind: "verified",
        evidenceIndices: [1],
      },
    ],
    request,
  );
  assert.ok(unrelated.some((p) => /wording in common/.test(p.problem)));
});
