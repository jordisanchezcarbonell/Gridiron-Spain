import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { LedgerEntry, MediaAsset, RadarItem, VideoScript } from "../automation/src/types";
import { findEntry, loadLedger, recordEntry, saveLedger } from "../automation/src/ledger";
import { selectCandidates } from "../automation/src/radar/select";
import {
  validateDuplicates,
  validateDuration,
  validateMediaRights,
  validateSources,
  validateBeforeRender,
} from "../automation/src/validate";
import {
  BUFFER_PUBLISHING_ENABLED,
  publishableConfidence,
  video,
} from "../automation/src/config";
import {
  PublishingDisabledError,
  buildDraft,
  publish,
  publishingEnabled,
} from "../automation/src/publish/buffer";
import { generatedAssets } from "../automation/src/render/ffmpeg";
import { parseArgs } from "../automation/src/cli";
import { buildScript } from "../automation/src/script/build";

function item(overrides: Partial<RadarItem> = {}): RadarItem {
  return {
    slug: "un-caso",
    title: "Un titular",
    body: ["Una frase suficientemente larga como para ser considerada narrable por el filtro."],
    confidence: "CONFIRMED",
    priority: 4,
    taggedForVideo: true,
    sources: [{ label: "F", url: "https://example.com/a" }],
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

function entry(overrides: Partial<LedgerEntry> = {}): LedgerEntry {
  return {
    slug: "un-caso",
    title: "Un titular",
    briefingDate: "2026-10-02",
    contentHash: "hash-a",
    producedAt: "2026-10-02",
    videoPath: "out/tiktok/un-caso.mp4",
    format: "news",
    ...overrides,
  };
}

function tmpFile(name: string): string {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), "pd-tiktok-")), name);
}

// --- dedup -----------------------------------------------------------------

test("the ledger round-trips through disk", () => {
  const file = tmpFile("ledger.json");
  assert.deepEqual(loadLedger(file), { entries: [] }, "a missing ledger is empty, not an error");
  saveLedger(recordEntry({ entries: [] }, entry()), file);
  assert.equal(findEntry(loadLedger(file), "un-caso")?.title, "Un titular");
});

test("recording the same slug replaces rather than duplicates", () => {
  const led = recordEntry(recordEntry({ entries: [] }, entry()), entry({ contentHash: "hash-b" }));
  assert.equal(led.entries.length, 1);
  assert.equal(led.entries[0].contentHash, "hash-b");
});

test("an already-produced story is skipped on the next run", () => {
  const ledger = { entries: [entry()] };
  const { candidates, skipped } = selectCandidates([item()], ledger);
  assert.equal(candidates.length, 0);
  assert.equal(skipped[0].reason, "already-produced");
});

test("a changed story is re-cut only when updates are allowed", () => {
  const ledger = { entries: [entry({ contentHash: "hash-old" })] };
  assert.equal(selectCandidates([item()], ledger).candidates.length, 0);
  assert.equal(selectCandidates([item()], ledger, { allowUpdates: true }).candidates.length, 1);
});

test("unverified items never become candidates", () => {
  for (const confidence of ["UNKNOWN", "RUMOR"] as const) {
    const { candidates, skipped } = selectCandidates([item({ confidence })], { entries: [] });
    assert.equal(candidates.length, 0, `${confidence} must not be rendered`);
    assert.equal(skipped[0].reason, "confidence-not-publishable");
  }
  assert.deepEqual([...publishableConfidence], ["CONFIRMED", "REPORTED"]);
});

test("an item with no narratable prose is skipped instead of being padded", () => {
  const { candidates, skipped } = selectCandidates([item({ body: ["Corto."] })], { entries: [] });
  assert.equal(candidates.length, 0);
  assert.equal(skipped[0].reason, "no-narratable-body");
});

test("candidates rank by priority, confidence, video tag and sources", () => {
  const low = item({ slug: "low", priority: 1, taggedForVideo: false, sources: [] });
  const high = item({ slug: "high", priority: 5 });
  const { candidates } = selectCandidates([low, high], { entries: [] });
  assert.equal(candidates[0].item.slug, "high");
});

// --- validations -----------------------------------------------------------

test("a news clip without a source is an error; a curiosity clip is a warning", () => {
  const news = buildScript(item({ sources: [] }));
  assert.equal(validateSources(news)[0].severity, "error");
  const curiosity = buildScript(item({ sources: [], format: "explainer" }));
  assert.equal(validateSources(curiosity)[0].severity, "warning");
  assert.deepEqual(validateSources(buildScript(item())), []);
});

test("duplicate validation distinguishes an identical repeat from a re-cut", () => {
  const script = buildScript(item());
  const identical = validateDuplicates(script, { entries: [entry({ contentHash: script.contentHash })] });
  assert.equal(identical[0].severity, "error");
  const recut = validateDuplicates(script, { entries: [entry({ contentHash: "otro" })] });
  assert.equal(recut[0].severity, "warning");
  assert.deepEqual(validateDuplicates(script, { entries: [] }), []);
});

test("media without an explicit licence and rights holder is refused", () => {
  const unlicensed: MediaAsset = { path: "clip.mp4", license: "", rightsHolder: "" };
  assert.equal(validateMediaRights([unlicensed])[0].severity, "error");

  const broadcast: MediaAsset = { path: "espn.mp4", license: "all rights reserved", rightsHolder: "ESPN" };
  assert.equal(validateMediaRights([broadcast])[0].severity, "error");
  assert.match(validateMediaRights([broadcast])[0].message, /written permission/);

  const cleared: MediaAsset = { ...broadcast, writtenPermission: true };
  assert.deepEqual(validateMediaRights([cleared]), []);
});

test("the default render uses only generated visuals, so it needs no clearance", () => {
  const assets = generatedAssets();
  assert.ok(assets.length > 0);
  assert.deepEqual(validateMediaRights(assets), []);
  for (const a of assets) assert.match(a.path, /^generated:/);
});

test("duration is held inside the format band", () => {
  const script = buildScript(item());
  assert.deepEqual(validateDuration(script, 40), []);
  assert.equal(validateDuration(script, 120)[0].severity, "error");
  assert.equal(validateDuration(script, 3)[0].severity, "error");
  assert.ok(video.maxDurationSec >= 60);
});

test("validateBeforeRender aggregates every pre-render rule", () => {
  const bad = buildScript(item({ confidence: "RUMOR", sources: [] }));
  const result = validateBeforeRender(bad, { entries: [] }, generatedAssets());
  assert.equal(result.ok, false);
  const rules = result.errors.map((e) => e.rule).sort();
  assert.deepEqual(rules, ["confidence", "sources"]);
});

// --- publishing ------------------------------------------------------------

test("Buffer publishing is disabled and cannot be switched on at runtime", async () => {
  assert.equal(BUFFER_PUBLISHING_ENABLED, false);
  assert.equal(publishingEnabled(), false);
  await assert.rejects(
    () => publish({ profileIds: [], text: "", mediaPath: "", subtitlePath: "", provenance: { briefingPath: "", briefingDate: "", line: 0, confidence: "", sources: [] } }),
    PublishingDisabledError,
  );
});

test("no environment variable can enable publishing", () => {
  const source = fs.readFileSync("automation/src/config.ts", "utf8");
  assert.match(source, /BUFFER_PUBLISHING_ENABLED = false as const/);
  const publishSource = fs.readFileSync("automation/src/publish/buffer.ts", "utf8");
  assert.ok(!/process\.env/.test(publishSource), "the publisher must not read environment variables");
  assert.ok(!/fetch\(|https?\.request|axios/.test(publishSource), "the publisher must not perform network I/O");
});

test("a Buffer draft carries the provenance a reviewer needs", () => {
  const source = item();
  const script: VideoScript = buildScript(source);
  const draft = buildDraft(script, {
    slug: script.slug,
    format: "news",
    videoPath: "out/tiktok/un-caso.mp4",
    srtPath: "out/tiktok/un-caso.srt",
    scriptPath: "out/tiktok/un-caso.script.json",
    durationSec: 30,
    width: 1080,
    height: 1920,
    assets: generatedAssets(),
  });
  assert.equal(draft.provenance.briefingPath, "research/daily/2026-10-02.md");
  assert.equal(draft.provenance.line, 11);
  assert.equal(draft.provenance.confidence, "CONFIRMED");
  assert.deepEqual(draft.provenance.sources, ["https://example.com/a"]);
  assert.deepEqual(draft.profileIds, [], "no profile is targeted while publishing is off");
  assert.ok(draft.text.includes(script.title));
});

// --- CLI -------------------------------------------------------------------

test("CLI flags parse with safe defaults", () => {
  const def = parseArgs([]);
  assert.deepEqual(def.formats, ["news"]);
  assert.equal(def.limit, 1);
  assert.equal(def.dryRun, false);
  assert.equal(def.allowUpdates, false);

  const all = parseArgs(["--format=all", "--limit=3", "--dry-run", "--date=2026-10-02"]);
  assert.deepEqual(all.formats, ["news", "explainer"]);
  assert.equal(all.limit, 3);
  assert.equal(all.dryRun, true);
  assert.equal(all.briefingDate, "2026-10-02");

  assert.equal(parseArgs(["--limit=0"]).limit, 1, "a nonsense limit falls back to 1");
  assert.equal(parseArgs(["--limit=abc"]).limit, 1);
});
