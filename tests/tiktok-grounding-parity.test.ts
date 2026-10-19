/**
 * The live `claude-cli` run generated fine and was then refused by the quality
 * gate with: `beat-1 uses "8" as a figure, which the evidence does not state`.
 *
 * Two defects produced it, and these pin both:
 *  - the AP Poll position written as a bare "el 8" was not recognised as a
 *    ranking, so it fell through to a roleless figure;
 *  - generation and the quality gate applied *different* contracts, so a
 *    roleless number inside a verified claim passed one and failed the other.
 *
 * No provider is called. Evidence is the real Florida briefing item.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { Claim } from "../automation/src/script/generator/types";
import type { EditorialPackage } from "../automation/src/script/generator/types";
import {
  checkGrounding,
  evidenceFor,
  toScenes,
} from "../automation/src/script/generator/assemble";
import { evaluate, type EvaluationFinding } from "../automation/src/script/evaluate";
import { mentionKey, numericMentions } from "../automation/src/script/numeric";
import { buildRequest, collectItems } from "../automation/src/pipeline";
import { generatedAssets } from "../automation/src/render/ffmpeg";
import { writeRejection } from "../automation/src/script/package";
import { isRepairable, repairRequest } from "../automation/src/script/repair";
import { tts } from "../automation/src/config";

function floridaItem() {
  const item = collectItems(["news"]).find((i) => i.slug.startsWith("florida"));
  assert.ok(item, "the Florida briefing item must still be in research/daily");
  return item;
}

/** Builds a package the way the pipeline does, so both gates see one input. */
function packageFor(beats: string[], claims: Claim[]): EditorialPackage {
  const item = floridaItem();
  const scenes = toScenes({
    hook: item.title,
    beats,
    conclusion: "Florida vuelve a la conversación de playoff",
    claims,
  });
  return {
    slug: item.slug,
    format: item.format,
    script: {
      slug: item.slug,
      title: item.title,
      locale: "es",
      confidence: item.confidence,
      format: item.format,
      scenes,
      sources: item.sources,
      provenance: item.provenance,
      contentHash: item.contentHash,
      targetDurationSec: 32,
      omittedBeats: [],
    },
    sourcePath: item.provenance.briefingPath,
    sourceDate: item.provenance.briefingDate,
    generatedAt: "2026-01-01",
    confidence: item.confidence,
    claims,
    evidence: evidenceFor(item),
    references: item.sources,
    mediaRights: generatedAssets().map((a) => ({
      path: a.path,
      license: a.license,
      rightsHolder: a.rightsHolder,
    })),
    generator: "test",
    model: null,
    promptVersion: "test",
    usage: null,
    scriptFingerprint: "f",
    eventKey: "e",
  };
}

function groundingOf(pkg: EditorialPackage): EvaluationFinding[] {
  return evaluate(pkg, tts.rate).findings.filter((f) => f.dimension === "grounding");
}

// --- what the 8 actually is ----------------------------------------------

test("in the evidence, 8 is the AP Poll ranking — not a score or a margin", () => {
  const roles = evidenceFor(floridaItem()).flatMap((e) =>
    numericMentions(e.text).map(mentionKey),
  );
  assert.ok(roles.includes("rank:8"), "the source states Florida is #8");
  assert.ok(!roles.includes("count:8:punto"), "it never states an eight-point margin");
  assert.ok(roles.includes("score:52-28"));
});

test("a ranking written without the # is still a ranking", () => {
  const key = (t: string) => numericMentions(t).map(mentionKey);
  assert.deepEqual(key("entran en el 8 del AP Poll"), ["rank:8"]);
  assert.deepEqual(key("es ahora el 8 del pais"), ["rank:8"]);
  assert.deepEqual(key("suben al 8 de la clasificacion"), ["rank:8"]);
  // The construction needs a ranking context, so a fabricated gap stays loose.
  assert.deepEqual(key("les deja a 13 de la cima"), ["quantity:13"]);
  assert.deepEqual(key("los 8 de la plantilla"), ["quantity:8"]);
});

// --- THE REGRESSION -------------------------------------------------------

test("THE REGRESSION: the beat that failed the live run now passes both gates", () => {
  const beat = "Los Gators entran en el 8 del AP Poll tras aplastar a Ole Miss 52-28.";
  const claims: Claim[] = [{ text: beat, kind: "verified", evidenceIndices: [1] }];

  const generation = checkGrounding(claims, buildRequest(floridaItem()));
  assert.deepEqual(generation, [], "generation accepts it");

  const quality = groundingOf(packageFor([beat], claims));
  assert.deepEqual(quality, [], "and so does the quality gate");
});

// --- the two validators must agree ---------------------------------------

test("generation and the quality gate reach the same verdict", () => {
  const cases: [string, Claim["kind"], boolean][] = [
    ["Los Gators entran en el 8 del AP Poll tras aplastar a Ole Miss 52-28.", "verified", true],
    ["Estar en el Top 10 cambia el peso de cada partido.", "inference", true],
    ["Ganar 52-28 a Ole Miss explica el salto.", "inference", true],
    ["Ganaron por 8 puntos de ventaja.", "inference", false],
    ["Entrar en el Top 5 lo cambia todo.", "inference", false],
    ["Vencieron 60-0 en casa.", "verified", false],
    ["Desde 2019 no estaban tan arriba.", "inference", false],
    ["Suben un 45% en audiencia.", "inference", false],
  ];

  for (const [text, kind, shouldPass] of cases) {
    const claims: Claim[] = [
      { text, kind, evidenceIndices: kind === "verified" ? [1] : [] },
    ];
    const generationOk = checkGrounding(claims, buildRequest(floridaItem())).length === 0;
    const qualityOk = groundingOf(packageFor([text], claims)).length === 0;

    assert.equal(generationOk, shouldPass, `generation verdict for: ${text}`);
    assert.equal(
      qualityOk,
      generationOk,
      `the two gates must agree on: ${text} (generation=${generationOk}, quality=${qualityOk})`,
    );
  }
});

test("the quality gate no longer applies a stricter contract than generation", () => {
  // A roleless number inside a verified claim: the exact shape that passed
  // generation and was then refused downstream. The wording deliberately
  // echoes the evidence, so the separate overlap rule for verified claims is
  // satisfied and the roleless figure is the only thing under test.
  const beat = "Florida entra en el Top 10 tras subir 13.";
  const claims: Claim[] = [{ text: beat, kind: "verified", evidenceIndices: [0] }];
  assert.deepEqual(
    numericMentions(beat).map(mentionKey),
    ["rank:10", "quantity:13"],
    "the 13 here carries no role of its own",
  );

  assert.deepEqual(checkGrounding(claims, buildRequest(floridaItem())), []);
  assert.deepEqual(groundingOf(packageFor([beat], claims)), []);
});

test("the hook is not failed for a bookkeeping reason", () => {
  // The hook is the headline and carries figures the model rarely re-declares
  // as claims. They are in the evidence, so they are fine.
  const pkg = packageFor(
    ["Los Gators entran en el 8 del AP Poll."],
    [{ text: "Los Gators entran en el 8 del AP Poll.", kind: "verified", evidenceIndices: [1] }],
  );
  assert.ok(pkg.script.scenes[0].narration.includes("13"), "the hook does carry figures");
  assert.deepEqual(groundingOf(pkg), []);
});

test("narration is still checked even when no claim declares the figure", () => {
  // A beat the model forgot to declare must not slip past unchecked.
  const pkg = packageFor(["Ganaron por 9 puntos de ventaja."], [
    { text: "Los Gators ganaron.", kind: "verified", evidenceIndices: [1] },
  ]);
  const findings = groundingOf(pkg);
  assert.ok(findings.length > 0, "an undeclared, unsourced figure is caught");
  assert.match(findings[0].message, /beat-1/);
});

// --- rejection artifact ---------------------------------------------------

test("a rejected script is written out so it can be diagnosed", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-rej-"));
  const pkg = packageFor(["Vencieron 60-0 en casa."], [
    { text: "Vencieron 60-0 en casa.", kind: "verified", evidenceIndices: [1] },
  ]);
  const findings = evaluate(pkg, tts.rate).findings;
  const file = writeRejection(pkg, findings, dir);

  const saved = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.equal(saved.slug, pkg.slug);
  assert.ok(saved.findings.length > 0, "the reasons are kept");
  assert.ok(
    saved.scenes.some((s: { narration: string }) => s.narration.includes("60-0")),
    "the wording the model produced is kept",
  );
  assert.ok(saved.evidence.length > 0, "and the evidence it was judged against");
  fs.rmSync(dir, { recursive: true, force: true });
});

// --- single-pass repair ---------------------------------------------------

test("repair is offered for wording problems and refused for everything else", () => {
  const wording: EvaluationFinding[] = [
    { dimension: "grounding", severity: "error", message: "unbacked figure" },
  ];
  assert.equal(isRepairable(wording), true);

  assert.equal(isRepairable([]), false, "nothing to repair");

  const editorial: EvaluationFinding[] = [
    { dimension: "editorial", severity: "error", message: "no reference link" },
  ];
  assert.equal(isRepairable(editorial), false, "missing sources are not a rewrite");

  const everywhere: EvaluationFinding[] = Array.from({ length: 5 }, () => ({
    dimension: "language" as const,
    severity: "error" as const,
    message: "x",
  }));
  assert.equal(isRepairable(everywhere), false, "a wholly broken script is not repaired");

  const warningsOnly: EvaluationFinding[] = [
    { dimension: "language", severity: "warning", message: "long sentence" },
  ];
  assert.equal(isRepairable(warningsOnly), false);
});

test("a repair request carries the findings but never new evidence", () => {
  const original = buildRequest(floridaItem());
  const repaired = repairRequest(original, [
    { dimension: "grounding", severity: "error", message: 'beat-1 uses "9"' },
  ]);

  assert.deepEqual(repaired.evidence, original.evidence, "the evidence is untouched");
  assert.equal(repaired.minDurationSec, original.minDurationSec);
  const guidance = repaired.item.body.at(-1) ?? "";
  assert.match(guidance, /rechazado/);
  assert.match(guidance, /beat-1 uses "9"/, "the specific finding is passed back");
  assert.match(guidance, /No añadas hechos nuevos/);
});
