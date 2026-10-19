import assert from "node:assert/strict";
import test from "node:test";
import type { RadarItem } from "../automation/src/types";
import { buildScript, groupIntoBeats, narrationIsGrounded, sentences } from "../automation/src/script/build";
import { buildCues, chunkCaption, srtTimestamp, toSrt, wrap } from "../automation/src/script/srt";
import { ctaLine } from "../automation/src/config";
import { FORMATS } from "../automation/src/formats";

function item(overrides: Partial<RadarItem> = {}): RadarItem {
  return {
    slug: "un-caso",
    title: "Un titular con hechos",
    body: [
      "Primera frase con un dato concreto. Segunda frase que amplia el dato anterior.",
      "Tercera frase que cierra el bloque informativo del briefing.",
    ],
    confidence: "CONFIRMED",
    priority: 4,
    taggedForVideo: true,
    sources: [{ label: "Fuente", url: "https://example.com/a" }],
    provenance: {
      briefingPath: "research/daily/2026-10-02.md",
      briefingDate: "2026-10-02",
      line: 11,
      section: "top-stories",
    },
    contentHash: "abc123abc123",
    format: "news",
    ...overrides,
  };
}

test("sentences split on terminators and keep them", () => {
  assert.deepEqual(sentences("Uno. Dos! Tres?"), ["Uno.", "Dos!", "Tres?"]);
  assert.deepEqual(sentences("   "), []);
});

test("beats group by word budget and never exceed the cap", () => {
  const parts = Array.from({ length: 20 }, (_, i) => `Frase numero ${i} con varias palabras.`);
  const { beats, omitted } = groupIntoBeats(parts, 10, 3);
  assert.equal(beats.length, 3);
  // Overflow is dropped, not folded into the last beat: folding produced a
  // single 80-second card from a long research document.
  assert.ok(omitted.length > 0, "the overflow is reported");
  assert.ok(omitted.join(" ").includes("Frase numero 19"), "the caller can see what was cut");
  for (const beat of beats) {
    assert.ok(beat.split(/\s+/).length <= 10 + 5, "no beat balloons past its budget");
  }
});

test("a script opens on a hook and closes on a conclusion, not mid-thought", () => {
  const script = buildScript(item());

  const hook = script.scenes[0];
  assert.equal(hook.id, "hook");
  assert.equal(hook.kind, "hook");
  assert.equal(hook.narration, "Un titular con hechos");
  assert.ok(hook.padBeforeSec > 0, "the hook card is up before the voice starts");
  assert.ok(hook.padAfterSec > 0, "the hook card is held after it is read");

  const outro = script.scenes.at(-1)!;
  assert.equal(outro.kind, "outro");
  assert.ok(outro.narration.includes("Un titular con hechos"), "the conclusion restates the headline");
  assert.ok(outro.narration.endsWith(ctaLine), "and lands on the fixed CTA");
  assert.equal(outro.caption, outro.narration, "subtitles must say what the voice says");
  assert.ok(outro.padAfterSec > 0, "the end card is held");

  // Body beats sit between the two and are numbered for the explainer template.
  const beats = script.scenes.filter((s) => s.kind === "beat");
  assert.ok(beats.length > 0);
  assert.deepEqual(beats.map((b) => b.beatIndex), beats.map((_, i) => i + 1));

  assert.equal(script.format, "news");
  assert.equal(script.targetDurationSec, FORMATS.news.targetDurationSec);
});

test("the curiosity format carries more material than the news format", () => {
  // Enough sentences that both formats hit their beat cap: a bigger word budget
  // alone produces fewer, longer beats, so the cap is what separates them.
  const long = Array.from({ length: 40 }, (_, i) => `Frase ${i} del documento de investigacion larga.`);
  const news = buildScript(item({ body: long, format: "news" }));
  const explainer = buildScript(item({ body: long, format: "explainer" }));
  assert.ok(explainer.scenes.length > news.scenes.length);
  assert.equal(news.scenes.length, FORMATS.news.maxBodyBeats + 2);
  assert.equal(explainer.scenes.length, FORMATS.explainer.maxBodyBeats + 2);
});

test("every narrated sentence exists in the source item — the never-invent guard", () => {
  const source = item();
  const script = buildScript(source);
  assert.equal(narrationIsGrounded(script, source), true);

  const tampered = {
    ...script,
    scenes: [
      ...script.scenes,
      {
        id: "bogus",
        kind: "beat" as const,
        narration: "Un dato que nadie publico jamas.",
        caption: "x",
        padBeforeSec: 0,
        padAfterSec: 0,
      },
    ],
  };
  assert.equal(narrationIsGrounded(tampered, source), false);
});

test("word wrap respects the width and loses no words", () => {
  const lines = wrap("una frase bastante larga que debe partirse en varias lineas", 20);
  assert.ok(lines.every((l) => l.length <= 20));
  assert.equal(lines.join(" "), "una frase bastante larga que debe partirse en varias lineas");
});

test("captions chunk into at most maxLines per cue", () => {
  const chunks = chunkCaption("palabra ".repeat(40).trim(), 20, 2);
  assert.ok(chunks.length > 1);
  for (const c of chunks) assert.ok(c.split("\n").length <= 2);
});

test("a card never ends mid-sentence", () => {
  const text =
    "Los Gators de Florida entran en el #8 del AP Poll tras aplastar a Ole Miss 52-28. Es el mayor salto de la semana.";
  const cards = chunkCaption(text, 30, 3);
  // Every card must end on a sentence terminator, which is what stops a clip
  // showing "... tras aplastar a" and then "Ole Miss 52-28." on the next card.
  for (const card of cards) {
    assert.match(
      card.replace(/\n/g, " ").trim(),
      /[.!?…,]$/,
      `card ends mid-phrase: "${card}"`,
    );
  }
  assert.ok(cards.join(" ").includes("Ole Miss 52-28."), "no words are lost");
});

test("SRT timestamps are zero-padded milliseconds", () => {
  assert.equal(srtTimestamp(0), "00:00:00,000");
  assert.equal(srtTimestamp(12.3456), "00:00:12,346");
  assert.equal(srtTimestamp(3661.5), "01:01:01,500");
  assert.equal(srtTimestamp(-5), "00:00:00,000");
});

test("cues are contiguous and end exactly where the narration ends", () => {
  const scenes = [
    { id: "a", kind: "beat" as const, narration: "Uno", caption: "Uno", durationSec: 2, padBeforeSec: 0, padAfterSec: 0 },
    { id: "b", kind: "beat" as const, narration: "Dos", caption: "Dos palabras aqui", durationSec: 3, padBeforeSec: 0, padAfterSec: 0 },
  ];
  const cues = buildCues(scenes);
  assert.ok(cues.length >= 2);
  assert.equal(cues[0].startSec, 0);
  assert.equal(cues.at(-1)!.endSec, 5, "last cue ends at the total narration length");
  for (let i = 1; i < cues.length; i++) {
    assert.ok(cues[i].startSec >= cues[i - 1].startSec);
    assert.ok(Math.abs(cues[i].startSec - cues[i - 1].endSec) < 1e-6, "no gaps between cues");
  }
});

test("SRT output is well formed", () => {
  const srt = toSrt(
    buildCues([
      { id: "a", kind: "beat", narration: "Uno", caption: "Uno", durationSec: 2, padBeforeSec: 0, padAfterSec: 0 },
    ]),
  );
  assert.match(srt, /^1\n00:00:00,000 --> 00:00:02,000\nUno\n$/);
});
