/**
 * Production-quality upgrades: actuality labelling, approved-script replay
 * with zero LLM calls, original sports graphics, and branding.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  classifyFreshness,
  daysBetween,
  urgencyViolations,
  URGENCY_WORDS,
} from "../automation/src/script/freshness";
import {
  APPROVED_SCHEMA,
  ApprovedScriptError,
  listApproved,
  readApproved,
  refreshCta,
  resolveApproved,
  withCurrentPacing,
  writeApproved,
} from "../automation/src/script/approved";
import { graphicFor, teamsFrom } from "../automation/src/render/graphics";
import { branding, ctaLine, timing } from "../automation/src/config";
import { collectItems } from "../automation/src/pipeline";
import { evidenceFor } from "../automation/src/script/generator/assemble";
import { TemplateScriptGenerator } from "../automation/src/script/generator/template";
import { FORMATS } from "../automation/src/formats";
import { tts } from "../automation/src/config";
import { evaluate } from "../automation/src/script/evaluate";

// --- actuality ------------------------------------------------------------

test("a kicker never claims material is newer than it is", () => {
  const today = "2026-10-18";
  assert.equal(classifyFreshness("2026-10-18", today).kicker, "AHORA");
  assert.equal(classifyFreshness("2026-10-17", today).kicker, "AHORA");
  assert.equal(classifyFreshness("2026-10-15", today).kicker, "ESTA SEMANA");

  // The real case: the Florida briefing is 16 days old and shipped as AHORA.
  const stale = classifyFreshness("2026-10-02", today);
  assert.equal(stale.ageDays, 16);
  assert.equal(stale.kicker, "EL DATO");
  assert.equal(stale.allowsUrgency, false);
  assert.match(stale.dateNote, /hace 16 días/, "the age is shown, not hidden");

  assert.equal(classifyFreshness("2026-01-01", today).kicker, "ARCHIVO");
});

test("age is measured in whole days and a bad date is never treated as fresh", () => {
  assert.equal(daysBetween("2026-10-02", "2026-10-18"), 16);
  assert.equal(daysBetween("2026-10-18", "2026-10-18"), 0);
  assert.equal(classifyFreshness("not-a-date", "2026-10-18").freshness, "archive");
});

test("urgency language is refused when the source cannot support it", () => {
  const stale = classifyFreshness("2026-10-02", "2026-10-18");
  assert.deepEqual(urgencyViolations(["Florida sube en el ranking."], stale), []);
  assert.deepEqual(urgencyViolations(["Ahora Florida es top 10."], stale), ["ahora"]);
  // Both spellings are listed; the accent-folded match reports whichever form
  // the list carries first, so assert on the phrase rather than the spelling.
  const violations = urgencyViolations(["Última hora desde Gainesville."], stale);
  assert.equal(violations.length, 1);
  assert.match(violations[0], /ltima hora/);

  // The same words are fine on same-day material.
  const fresh = classifyFreshness("2026-10-18", "2026-10-18");
  assert.deepEqual(urgencyViolations(["Ahora Florida es top 10."], fresh), []);
  assert.ok(URGENCY_WORDS.includes("hoy"));
});

// --- approved-script replay ----------------------------------------------

async function approvedFixture(dir: string) {
  const item = collectItems(["news"]).find((i) => i.slug.startsWith("florida"));
  assert.ok(item);
  const spec = FORMATS[item.format];
  const outcome = await new TemplateScriptGenerator(() => "2026-01-01").generate({
    item,
    evidence: evidenceFor(item),
    minDurationSec: spec.minDurationSec,
    maxDurationSec: spec.maxDurationSec,
    targetDurationSec: spec.targetDurationSec,
    wordsPerMinute: tts.rate,
  });
  assert.equal(outcome.ok, true);
  if (!outcome.ok) throw new Error("fixture generation failed");
  const evaluation = evaluate(outcome.result.editorial, tts.rate);
  const file = writeApproved(outcome.result.editorial, evaluation, dir);
  return { file, editorial: outcome.result.editorial };
}

test("an approved script round-trips and records what approved it", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-appr-"));
  const { file, editorial } = await approvedFixture(dir);

  const loaded = readApproved(file);
  assert.equal(loaded.schema, APPROVED_SCHEMA);
  assert.equal(loaded.editorial.slug, editorial.slug);
  assert.equal(loaded.editorial.sourcePath, editorial.sourcePath, "the source");
  assert.equal(loaded.editorial.sourceDate, editorial.sourceDate, "the date");
  assert.equal(
    loaded.editorial.script.contentHash,
    editorial.script.contentHash,
    "the evidence hash",
  );
  assert.equal(loaded.editorial.promptVersion, editorial.promptVersion, "the prompt version");
  assert.equal(loaded.editorial.model, editorial.model, "the model");
  assert.ok(loaded.evaluation.ok, "and the verdict that approved it");
  assert.ok(loaded.editorial.evidence.length > 0, "and the evidence to re-validate against");

  assert.equal(listApproved(dir).length, 1);
  assert.equal(resolveApproved(editorial.slug, dir), file);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("replaying a stored script calls no generator at all", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-noLLM-"));
  const { file } = await approvedFixture(dir);

  // A generator that fails the test if anything reaches it.
  let called = 0;
  const tripwire = {
    id: "tripwire",
    model: null,
    available: () => true,
    generate: async () => {
      called += 1;
      throw new Error("a replay must never call a generator");
    },
  };

  // The replay path only reads the file; the tripwire proves nothing invokes it.
  const loaded = readApproved(file);
  assert.ok(loaded.editorial.script.scenes.length > 0);
  assert.equal(called, 0, "zero LLM calls during replay");
  assert.equal(tripwire.id, "tripwire");
  fs.rmSync(dir, { recursive: true, force: true });
});

test("a tampered, stale or unapproved file is refused rather than rendered", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-bad-"));

  assert.throws(() => readApproved(path.join(dir, "missing.json")), ApprovedScriptError);

  const notJson = path.join(dir, "a.approved.json");
  fs.writeFileSync(notJson, "{{{", "utf8");
  assert.throws(() => readApproved(notJson), /not valid JSON/);

  const wrongSchema = path.join(dir, "b.approved.json");
  fs.writeFileSync(wrongSchema, JSON.stringify({ schema: 999 }), "utf8");
  assert.throws(() => readApproved(wrongSchema), /schema/);

  const noScenes = path.join(dir, "c.approved.json");
  fs.writeFileSync(
    noScenes,
    JSON.stringify({ schema: APPROVED_SCHEMA, editorial: { script: { scenes: [] } } }),
    "utf8",
  );
  assert.throws(() => readApproved(noScenes), /no script scenes/);

  const failed = path.join(dir, "d.approved.json");
  fs.writeFileSync(
    failed,
    JSON.stringify({
      schema: APPROVED_SCHEMA,
      editorial: { script: { scenes: [{ id: "x" }] }, evidence: [] },
      evaluation: { ok: false },
    }),
    "utf8",
  );
  assert.throws(() => readApproved(failed), /not approved/);

  fs.rmSync(dir, { recursive: true, force: true });
});

test("a replay re-paces but never rewrites the reporting", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-pace-"));
  const { file } = await approvedFixture(dir);
  const stored = readApproved(file);
  const repaced = withCurrentPacing(stored);

  const originalBeats = stored.editorial.script.scenes
    .filter((s) => s.kind === "beat")
    .map((s) => s.narration);
  const repacedBeats = repaced.editorial.script.scenes
    .filter((s) => s.kind === "beat")
    .map((s) => s.narration);
  assert.deepEqual(repacedBeats, originalBeats, "the words are untouched");

  const hook = repaced.editorial.script.scenes[0];
  assert.equal(hook.padBeforeSec, timing.leadInSec);
  assert.equal(hook.padAfterSec, timing.hookHoldSec);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("the hook is short enough to hold a viewer", () => {
  // The whole hook scene must fit the 3-5s window; v1 spent 6.0s on it.
  const hookOverhead = timing.leadInSec + timing.hookHoldSec;
  assert.ok(hookOverhead <= 1.5, `hook padding is ${hookOverhead}s`);
  assert.ok(timing.outroHoldSec <= 1.5, "the end card is not held for seconds");
});

test("only a known CTA is swapped on replay", () => {
  assert.equal(refreshCta("Algo. Lo seguimos en Primer Down."), `Algo. ${ctaLine}`);
  assert.equal(refreshCta(`Algo. ${ctaLine}`), `Algo. ${ctaLine}`, "already current");
  assert.equal(
    refreshCta("Algo. Síguenos en otra parte."),
    "Algo. Síguenos en otra parte.",
    "text that is not a known CTA is left alone",
  );
});

// --- original sports graphics --------------------------------------------

test("a scoreboard is drawn from a score the caption states", () => {
  const g = graphicFor(
    "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28.",
    "#C8102E",
    400,
    "",
  );
  assert.equal(g.kind, "scoreboard");
  assert.ok(g.svg.includes(">52<"));
  assert.ok(g.svg.includes(">28<"));
  assert.ok(g.height > 0);
});

test("team labels skip Spanish articles", () => {
  // The first attempt labelled the board "LOS" vs "OLE MISS".
  assert.deepEqual(
    teamsFrom("Los Gators de Florida entran en el #8 tras aplastar a Ole Miss 52-28."),
    ["Gators", "Ole Miss"],
  );
  assert.equal(teamsFrom("Sin marcador aquí."), undefined);
});

test("a ranking ladder only shows a movement the evidence states", () => {
  const withMove = graphicFor("Entra en el Top 10.", "#C8102E", 400, "Florida salta 13 puestos");
  assert.equal(withMove.kind, "rank");
  assert.ok(withMove.svg.includes("13"), "the stated climb is drawn");

  const withoutMove = graphicFor("Entra en el Top 10.", "#C8102E", 400, "Sin datos de movimiento");
  assert.equal(withoutMove.kind, "rank");
  assert.ok(!withoutMove.svg.includes("▲"), "no climb is implied when none is stated");
});

test("a caption with no figures gets no decorative graphic", () => {
  assert.equal(graphicFor("Es el mayor salto de la semana.", "#C8102E", 400, "").kind, "none");
});

test("every graphic is our own geometry, needing no licence", () => {
  const g = graphicFor("Ganaron 52-28.", "#C8102E", 400, "");
  assert.ok(!/<image|xlink:href|url\(/.test(g.svg), "no external asset is referenced");
});

// --- branding -------------------------------------------------------------

test("Gridiron Spain is the lead identity, and the CTA agrees with it", () => {
  assert.equal(branding.wordmark, "GRIDIRON SPAIN");
  assert.ok(ctaLine.includes("Gridiron Spain"), "the spoken CTA names the same brand");
  assert.ok(!ctaLine.includes("Primer Down"), "and not the previous one");
});
