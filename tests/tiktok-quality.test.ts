/**
 * Audiovisual quality guarantees: safe areas, type fitting, language, audio
 * mastering and the ElevenLabs seam.
 */
import assert from "node:assert/strict";
import test from "node:test";
import type { Cue, VideoScript } from "../automation/src/types";
import {
  branding,
  captions,
  charsPerLine,
  motion,
  safeArea,
  safeBox,
  timing,
  typography,
  video,
} from "../automation/src/config";
import { fitCaption, fitHook, longestWord } from "../automation/src/script/layout";
import { allocateShares } from "../automation/src/script/srt";
import { detectLanguage } from "../automation/src/validate/language";
import {
  validateCueTiming,
  validateLanguage,
  validateLegibility,
  validateOutput,
} from "../automation/src/validate";
import { FORMATS, normalizeFormat } from "../automation/src/formats";
import { frameSvg } from "../automation/src/render/svg";
import { sourceLabel } from "../automation/src/render/ffmpeg";
import {
  ElevenLabsProvider,
  MissingCredentialsError,
} from "../automation/src/tts/elevenlabs";

function cue(overrides: Partial<Cue> = {}): Cue {
  return {
    index: 1,
    startSec: 0,
    endSec: 3,
    text: "Una linea",
    sceneId: "beat-1",
    kind: "beat",
    progress: 0.5,
    fontSize: typography.captionSize,
    ...overrides,
  };
}

function script(overrides: Partial<VideoScript> = {}): VideoScript {
  return {
    slug: "s",
    title: "T",
    locale: "es",
    confidence: "CONFIRMED",
    format: "news",
    scenes: [],
    sources: [],
    provenance: { briefingPath: "p", briefingDate: "2026-10-02", line: 1, section: "top-stories" },
    contentHash: "h",
    targetDurationSec: 36,
    omittedBeats: [],
    ...overrides,
  };
}

// --- safe areas ------------------------------------------------------------

test("the readable box clears TikTok's chrome on every side", () => {
  assert.equal(safeBox.x, safeArea.left);
  assert.equal(safeBox.y, safeArea.top);
  assert.equal(safeBox.x + safeBox.width, video.width - safeArea.right);
  assert.equal(safeBox.y + safeBox.height, video.height - safeArea.bottom);
  // The action-button rail is on the right, so that margin must be the wider one.
  assert.ok(safeArea.right > safeArea.left, "the right margin clears the button rail");
  // The caption and username sit along the bottom.
  assert.ok(safeArea.bottom >= 400, "the bottom band clears the caption and username");
});

test("every drawn element stays inside the safe box", () => {
  const svg = frameSvg(cue({ text: "Primera linea\nSegunda linea" }), {
    template: "news",
    kicker: "AHORA",
    accent: branding.accent,
    meta: "2026-10-02",
    sourceLabel: "Fuente: example.com",
    numberBeats: false,
  });

  // Text anchors must never fall inside a reserved band.
  const minX = safeArea.left;
  const maxX = video.width - safeArea.right;
  for (const m of svg.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
    const x = Number.parseFloat(m[1]);
    const y = Number.parseFloat(m[2]);
    assert.ok(x >= minX - 1 && x <= maxX + 1, `text x=${x} is outside [${minX}, ${maxX}]`);
    assert.ok(y >= safeArea.top - 130, `text y=${y} intrudes on the top chrome`);
    assert.ok(y <= video.height - 40, `text y=${y} falls off the frame`);
  }
});

test("the two templates are visually distinguishable", () => {
  assert.notEqual(FORMATS.news.accent, FORMATS.explainer.accent);
  assert.notEqual(FORMATS.news.kicker, FORMATS.explainer.kicker);
  assert.equal(FORMATS.explainer.numberBeats, true, "explainer beats are numbered");
  assert.equal(FORMATS.news.numberBeats, false);
  // Each format's band is sized to the material it draws on: a radar briefing
  // carries ~40 words per story, a research document carries far more.
  assert.equal(FORMATS.news.minDurationSec, 20);
  assert.equal(FORMATS.news.maxDurationSec, 45);
  assert.equal(FORMATS.explainer.minDurationSec, 30);
  assert.equal(FORMATS.explainer.maxDurationSec, 75);
  for (const spec of Object.values(FORMATS)) {
    assert.ok(spec.minDurationSec < spec.targetDurationSec);
    assert.ok(spec.targetDurationSec < spec.maxDurationSec);
  }
});

test("the old format spelling still resolves", () => {
  assert.equal(normalizeFormat("curiosity"), "explainer");
  assert.equal(normalizeFormat("explainer"), "explainer");
  assert.equal(normalizeFormat("news"), "news");
  assert.equal(normalizeFormat("nope"), undefined);
});

// --- type fitting ----------------------------------------------------------

test("type shrinks only as far as a long compound word demands", () => {
  const easy = fitHook("Florida salta 13 puestos");
  assert.equal(easy.fontSize, typography.hookSize, "a short headline keeps full size");

  const hard = fitHook("Navy busca el three-peat del Commander-in-Chief's Trophy");
  assert.ok(hard.fontSize < typography.hookSize, "a 20-character word forces a smaller size");
  assert.ok(hard.fontSize >= typography.hookMinSize);
  assert.ok(
    longestWord(hard.lines.join(" ")) <= charsPerLine(hard.fontSize),
    "every word fits its line at the chosen size",
  );
  assert.ok(hard.lines.length <= captions.hookMaxLines);
});

test("fitted captions never overflow the safe box", () => {
  for (const text of [
    "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28.",
    "La cooperacion con Madrid Bravos vincula al club con la European League of Football.",
  ]) {
    const fitted = fitCaption(text);
    assert.ok(fitted.lines.length <= captions.maxLines);
    for (const line of fitted.lines) {
      assert.ok(
        line.length <= charsPerLine(fitted.fontSize),
        `"${line}" overflows at ${fitted.fontSize}px`,
      );
    }
  }
});

test("legibility validation reads the size the fitter actually chose", () => {
  const tooMany = cue({ text: Array.from({ length: captions.maxLines + 1 }, (_, i) => `l${i}`).join("\n") });
  assert.ok(validateLegibility([tooMany]).some((i) => i.severity === "error"));

  const fitted = fitCaption("Una frase normal que cabe sin problemas en la caja segura.");
  const ok = cue({ text: fitted.lines.join("\n"), fontSize: fitted.fontSize });
  assert.deepEqual(validateLegibility([ok]), []);
});

// --- cue timing ------------------------------------------------------------

test("short cards borrow time so nothing flashes past unread", () => {
  const shares = allocateShares(["corto", "una tarjeta considerablemente mas larga que la otra"], 10);
  assert.ok(shares.every((s) => s >= timing.minCueSec - 1e-9), "every card clears the floor");
  assert.ok(Math.abs(shares.reduce((a, b) => a + b, 0) - 10) < 1e-6, "the scene length is preserved");
});

test("an impossibly short scene stays proportional instead of overrunning", () => {
  const shares = allocateShares(["a", "b", "c"], 1);
  assert.ok(Math.abs(shares.reduce((a, b) => a + b, 0) - 1) < 1e-6);
});

test("cue timing validation catches overlaps and flashes", () => {
  const overlapping = [cue({ index: 1, startSec: 0, endSec: 5 }), cue({ index: 2, startSec: 3, endSec: 8 })];
  assert.ok(validateCueTiming(overlapping, timing.minCueSec).some((i) => i.severity === "error"));

  const flash = [cue({ index: 1, startSec: 0, endSec: 0.3 })];
  assert.ok(validateCueTiming(flash, timing.minCueSec).some((i) => i.rule === "legibility"));
});

// --- language --------------------------------------------------------------

test("language detection separates the Spanish and English corpora", () => {
  assert.equal(detectLanguage("Los Gators de Florida entran en el Top 10 de la encuesta").language, "es");
  assert.equal(detectLanguage("Navy must adapt to life without their star quarterback").language, "en");
});

test("a Spanish clip refuses to narrate an English document", () => {
  const english = script({
    scenes: [
      {
        id: "beat-1",
        kind: "beat",
        narration: "Navy must adapt to life without their star quarterback and the offense will change.",
        caption: "x",
        padBeforeSec: 0,
        padAfterSec: 0,
      },
    ],
  });
  const issues = validateLanguage(english);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, "error");
  assert.equal(issues[0].rule, "language");

  const spanish = script({
    scenes: [
      {
        id: "beat-1",
        kind: "beat",
        narration: "Los Gators de Florida entran en el Top 10 de la encuesta tras ganar el partido.",
        caption: "x",
        padBeforeSec: 0,
        padAfterSec: 0,
      },
    ],
  });
  assert.deepEqual(validateLanguage(spanish), []);
});

// --- output validation -----------------------------------------------------

function probe(overrides: Partial<Parameters<typeof validateOutput>[1]> = {}) {
  return {
    durationSec: 40,
    width: 1080,
    height: 1920,
    videoCodec: "h264",
    audioCodec: "aac",
    hasSubtitleTrack: true,
    fps: 30,
    meanVolumeDb: -14,
    maxVolumeDb: -1.5,
    blankFrameRatio: 0,
    ...overrides,
  };
}

test("a clean render passes every output check", () => {
  assert.deepEqual(validateOutput(script({ format: "explainer" }), probe()), []);
});

test("output validation catches wrong size, codec, silence, clipping and blanks", () => {
  const cases: Array<[Partial<ReturnType<typeof probe>>, string]> = [
    [{ width: 720, height: 1280 }, "dimensions"],
    [{ videoCodec: "hevc" }, "codecs"],
    [{ audioCodec: "mp3" }, "codecs"],
    [{ hasSubtitleTrack: false }, "codecs"],
    [{ fps: 24 }, "codecs"],
    [{ meanVolumeDb: -40 }, "audio"],
    [{ maxVolumeDb: 0 }, "audio"],
    [{ blankFrameRatio: 0.4 }, "blank-frames"],
  ];
  for (const [override, rule] of cases) {
    const issues = validateOutput(script({ format: "explainer" }), probe(override));
    assert.ok(
      issues.some((i) => i.rule === rule && i.severity === "error"),
      `expected a ${rule} error for ${JSON.stringify(override)}`,
    );
  }
});

test("a clip outside its format band is an error in both directions", () => {
  // NEWS: 20-45s. 27s is now comfortably inside, where it used to warn.
  assert.equal(
    validateOutput(script({ format: "news" }), probe({ durationSec: 27 })).find(
      (i) => i.rule === "duration",
    ),
    undefined,
  );
  assert.equal(
    validateOutput(script({ format: "news" }), probe({ durationSec: 50 })).find(
      (i) => i.rule === "duration",
    )?.severity,
    "error",
  );
  assert.equal(
    validateOutput(script({ format: "news" }), probe({ durationSec: 17 })).find(
      (i) => i.rule === "duration",
    )?.severity,
    "error",
  );

  // EXPLAINER: 30-75s.
  assert.equal(
    validateOutput(script({ format: "explainer" }), probe({ durationSec: 60 })).find(
      (i) => i.rule === "duration",
    ),
    undefined,
  );
  assert.equal(
    validateOutput(script({ format: "explainer" }), probe({ durationSec: 27 })).find(
      (i) => i.rule === "duration",
    )?.severity,
    "error",
  );
  assert.equal(
    validateOutput(script({ format: "explainer" }), probe({ durationSec: 80 })).find(
      (i) => i.rule === "duration",
    )?.severity,
    "error",
  );

  // Below the hard floor nothing is excused, whatever the format.
  assert.equal(
    validateOutput(script({ format: "news" }), probe({ durationSec: 8 })).find(
      (i) => i.rule === "duration",
    )?.severity,
    "error",
  );
});

test("audio and motion targets are set for the feed", () => {
  assert.ok(motion.transitionSec > 0 && motion.transitionSec < 1);
  assert.ok(motion.zoomPerScene > 0, "frames push in rather than sitting still");
  // A slide moved the whole flat frame, duplicating the chrome mid-transition.
  // A short dissolve leaves identical chrome untouched and only crossfades the
  // caption.
  assert.equal(motion.transition, "fade");
  assert.ok(motion.transitionSec <= 0.25, "short enough to read as a soft cut");
});

// --- source attribution ----------------------------------------------------

test("the source credit names hosts, not raw URLs", () => {
  const label = sourceLabel(
    script({
      sources: [
        { label: "Yahoo", url: "https://sports.yahoo.com/a/b" },
        { label: "ESPN", url: "https://www.espn.com/c" },
        { label: "CBS", url: "https://cbssports.com/d" },
      ],
    }),
  );
  assert.equal(label, "Fuente: sports.yahoo.com · espn.com +1");
  assert.equal(sourceLabel(script({ sources: [] })), undefined);
});

// --- ElevenLabs seam -------------------------------------------------------

test("ElevenLabs stays unavailable and inert without credentials", () => {
  const provider = new ElevenLabsProvider({ apiKey: undefined, voiceId: undefined });
  assert.equal(provider.available(), false, "no key means the CLI falls back to `say`");
  assert.throws(() => provider.requestFor("hola"), MissingCredentialsError);
});

test("ElevenLabs builds the right request once configured", () => {
  const provider = new ElevenLabsProvider({ apiKey: "k", voiceId: "v", baseUrl: "https://api.test" });
  assert.equal(provider.available(), true);
  const request = provider.requestFor("hola");
  assert.equal(request.url, "https://api.test/v1/text-to-speech/v");
  assert.equal(request.headers["xi-api-key"], "k");
  assert.equal(JSON.parse(request.body).text, "hola");
});
