/**
 * Integration test: renders a real MP4 with ffmpeg.
 *
 * Skips itself (rather than failing) when ffmpeg or rsvg-convert is missing, so
 * the suite stays green on a machine without the media toolchain.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { RadarItem } from "../automation/src/types";
import { buildScript, narrationIsGrounded } from "../automation/src/script/build";
import { render } from "../automation/src/render/ffmpeg";
import { escapeXml, frameSvg, rasterizerAvailable } from "../automation/src/render/svg";
import { dimensionsOf, durationOf, ffmpegAvailable, hasStream } from "../automation/src/render/probe";
import { SilentProvider, estimateDuration } from "../automation/src/tts/silent";
import { branding, video } from "../automation/src/config";

const toolchain = ffmpegAvailable() && rasterizerAvailable();

const sample: RadarItem = {
  slug: "clip-de-prueba",
  title: "Un titular de prueba con acentos: ñandú y Mónica",
  body: [
    "Primera frase del cuerpo con un dato concreto y suficiente longitud narrable.",
    "Segunda frase que cierra el bloque informativo de la prueba de integracion.",
  ],
  confidence: "CONFIRMED",
  priority: 5,
  taggedForVideo: true,
  sources: [{ label: "F", url: "https://example.com/a" }],
  provenance: {
    briefingPath: "research/daily/2026-10-02.md",
    briefingDate: "2026-10-02",
    line: 11,
    section: "top-stories",
  },
  contentHash: "hash-render",
  format: "news",
};

test("SVG text is XML-escaped so quotes in headlines cannot break the frame", () => {
  assert.equal(
    escapeXml(`Commander-in-Chief's & "co" <x>`),
    "Commander-in-Chief&apos;s &amp; &quot;co&quot; &lt;x&gt;",
  );
});

test("a frame carries background, branding, caption and progress in one image", () => {
  const svg = frameSvg(
    {
      index: 2,
      startSec: 1,
      endSec: 4,
      text: "Primera linea\nSegunda linea",
      sceneId: "beat-1",
      kind: "beat",
      beatIndex: 2,
      beatTotal: 5,
      progress: 0.4,
      fontSize: 62,
    },
    {
      template: "explainer",
      kicker: "HISTORIA",
      accent: "#1D7A8C",
      meta: "2026-10-02",
      sourceLabel: "Fuente: fefa.es",
      numberBeats: true,
    },
  );
  assert.ok(svg.includes("HISTORIA"), "kicker");
  assert.ok(svg.includes("2/5"), "beat numbering");
  assert.ok(svg.includes(branding.wordmark), "wordmark");
  assert.equal(branding.wordmark, "GRIDIRON SPAIN", "Gridiron Spain is the lead identity");
  assert.ok(svg.includes(branding.byline), "byline");
  assert.ok(svg.includes("Fuente: fefa.es"), "source credit on screen");
  assert.ok(svg.includes("Primera linea") && svg.includes("Segunda linea"), "both caption lines");
  // An opaque background is what makes the still-per-cue assembly possible.
  assert.match(svg, /<rect x="0" y="0" width="1080" height="1920"/);
});

test("the silent narration stub scales with word count", () => {
  assert.ok(estimateDuration("una dos tres") < estimateDuration("una dos tres cuatro cinco seis siete ocho"));
  assert.ok(estimateDuration("") >= 1);
});

test(
  "renders a vertical MP4 with narration, burned captions and a subtitle track",
  { skip: toolchain ? false : "ffmpeg or rsvg-convert not installed" },
  async () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-render-"));
    const script = buildScript(sample);
    // `aligner: "none"` on purpose: the narration here is silence, so there is
    // nothing to align, and this test is about the container and the captions.
    // The forced-alignment path has its own tests.
    const result = await render({
      script,
      provider: new SilentProvider(),
      outDir,
      aligner: "none",
    });

    assert.equal(result.alignment.method, "apportioned");
    assert.ok(
      result.alignment.pendingReview,
      "a clip whose timings were apportioned must say so, not pass as word-accurate",
    );

    assert.ok(fs.existsSync(result.videoPath), "an MP4 is written");
    assert.ok(fs.statSync(result.videoPath).size > 10_000, "the MP4 is not an empty container");

    const { width, height } = dimensionsOf(result.videoPath);
    assert.equal(width, video.width);
    assert.equal(height, video.height);
    assert.equal(width, 1080);
    assert.equal(height, 1920);

    assert.equal(hasStream(result.videoPath, "video"), true);
    assert.equal(hasStream(result.videoPath, "audio"), true, "narration is muxed in");
    assert.equal(hasStream(result.videoPath, "subtitle"), true, "a soft subtitle track is muxed in");

    // Video length must match the narration it was built from.
    const narrationSec = result.scenes.reduce(
      (a, s) => a + s.padBeforeSec + (s.durationSec ?? 0) + s.padAfterSec,
      0,
    );
    assert.ok(
      Math.abs(durationOf(result.videoPath) - narrationSec) < 0.5,
      `video ${durationOf(result.videoPath)}s should track narration ${narrationSec}s`,
    );

    // The sidecar SRT must cover every scene and stay inside the clip.
    const srt = fs.readFileSync(result.srtPath, "utf8");
    assert.ok(srt.includes("ñandú"), "accents survive into the subtitles");
    assert.ok(srt.includes("-->"));
    assert.equal(result.cues.at(-1)!.endSec <= durationOf(result.videoPath) + 0.01, true);

    // Every rendered word came from the source item or the fixed CTA. This is
    // the same guard the pipeline refuses to render without.
    assert.equal(
      narrationIsGrounded({ ...script, scenes: result.scenes }, sample),
      true,
      "narration must trace back to the radar item",
    );

    // The clip opens on a hook and closes on a conclusion, not mid-beat.
    assert.equal(result.scenes[0].kind, "hook");
    assert.equal(result.scenes.at(-1)!.kind, "outro");
    assert.ok(result.cues.some((c) => c.kind === "outro"), "the conclusion is captioned");

    // Body captions never end mid-sentence. Hooks are headlines, which carry
    // no terminator, so they are exempt.
    for (const cue of result.cues.filter((c) => c.kind === "beat")) {
      assert.match(
        cue.text.replace(/\n/g, " ").trim(),
        // A comma is a legitimate clause break; the defect is a card ending on
        // a bare word like "tras aplastar a".
        /[.!?…:,]$/,
        `cue ${cue.index} ends mid-phrase: "${cue.text}"`,
      );
    }

    fs.rmSync(outDir, { recursive: true, force: true });
  },
);
