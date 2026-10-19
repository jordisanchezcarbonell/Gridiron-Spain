/**
 * Word-level subtitle alignment.
 *
 * Two kinds of test here, and both matter:
 *
 *  - deterministic fixtures, which pin the contract without needing a 2 GB
 *    model on the machine;
 *  - one real-audio test, which is the only thing that proves the aligner
 *    actually locates words in speech. It skips itself when the aligner is not
 *    installed, because the suite has to stay green on a clean checkout.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { Scene } from "../automation/src/types";
import {
  numberToSpanish,
  speakWord,
  toSpokenForm,
  writtenWords,
} from "../automation/src/align/spoken";
import {
  MIN_CONFIDENCE,
  MIN_COVERAGE,
  applyConfidenceFloor,
  validateAlignment,
} from "../automation/src/align/validate";
import { cacheKey, readCache, writeCache } from "../automation/src/align/cache";
import { alignWords, parseAlignerId } from "../automation/src/align";
import { TorchaudioAligner } from "../automation/src/align/torchaudio";
import { alignNarration, alignmentSidecar } from "../automation/src/align/narration";
import type {
  AlignmentRequest,
  AlignmentResult,
  WordAligner,
  WordTiming,
} from "../automation/src/align/types";
import {
  MAX_WORDS_PER_GROUP,
  PAUSE_SEC,
  buildWordCues,
  groupWords,
  mergeForSubtitles,
  shortCards,
  stitchTimeline,
} from "../automation/src/script/wordcues";
import { frameSvg } from "../automation/src/render/svg";
import { toSrt } from "../automation/src/script/srt";
import { SayProvider } from "../automation/src/tts/say";
import { durationOf } from "../automation/src/render/probe";

/** A located word, for the fixtures below. */
function w(text: string, startSec: number, endSec: number, confidence = 0.9): WordTiming {
  return { text, startSec, endSec, confidence, located: true };
}

/**
 * A stand-in aligner that spaces the words evenly.
 *
 * It exists to exercise the plumbing deterministically. It is deliberately
 * *not* available as a production fallback: even spacing is the guess this
 * whole feature replaced.
 */
class StubAligner implements WordAligner {
  readonly id = "stub";
  readonly version = "stub-1";
  calls = 0;

  constructor(private readonly overrides: Partial<AlignmentResult> = {}) {}

  available(): boolean {
    return true;
  }

  async align(request: AlignmentRequest): Promise<AlignmentResult> {
    this.calls += 1;
    const step = request.audioSec / Math.max(1, request.words.length);
    const words = request.words.map((text, i) => w(text, i * step, (i + 1) * step - 0.02));
    const result: AlignmentResult = {
      method: "forced",
      aligner: this.id,
      version: this.version,
      language: request.language,
      audioSec: request.audioSec,
      words,
      coverage: 1,
      problems: [],
      usable: true,
      ...this.overrides,
    };
    return result;
  }
}

// --- the written form is never rewritten -----------------------------------

test("numbers are spelled the way they are read aloud in Spanish", () => {
  assert.equal(numberToSpanish(0), "cero");
  assert.equal(numberToSpanish(13), "trece");
  assert.equal(numberToSpanish(16), "dieciseis");
  assert.equal(numberToSpanish(21), "veintiuno");
  assert.equal(numberToSpanish(28), "veintiocho");
  assert.equal(numberToSpanish(52), "cincuenta y dos");
  assert.equal(numberToSpanish(100), "cien");
  assert.equal(numberToSpanish(103), "ciento tres");
  assert.equal(numberToSpanish(240), "doscientos cuarenta");
});

test("a score, a rank and an accent all reach the aligner's alphabet", () => {
  assert.deepEqual(speakWord("52-28."), ["cincuenta", "y", "dos", "veintiocho"]);
  assert.deepEqual(speakWord("#8"), ["ocho"]);
  assert.deepEqual(speakWord("ñandú"), ["nandu"]);
  assert.deepEqual(speakWord("Commander-in-Chief's"), ["commander-in-chief's"]);
  // Nothing outside the model's 29-token alphabet may survive.
  for (const token of speakWord("¡Mónica, 13!")) {
    assert.match(token, /^[a-z'-]+$/, `"${token}" is outside the aligner alphabet`);
  }
});

test("timings fold back onto the written words, so no figure can be rewritten", () => {
  const written = ["Florida", "gana", "52-28", "y", "sube", "13", "puestos."];
  const { tokens, owner, written: kept } = toSpokenForm(written);

  assert.deepEqual(kept, written, "the written words pass through untouched");
  assert.equal(tokens.length, owner.length);
  // "52-28" is four spoken tokens but stays one written word.
  assert.deepEqual(
    tokens.filter((_t, i) => owner[i] === 2),
    ["cincuenta", "y", "dos", "veintiocho"],
  );
  assert.deepEqual(tokens.filter((_t, i) => owner[i] === 5), ["trece"]);
  assert.ok(owner.every((o, i) => i === 0 || o >= owner[i - 1]), "the map is monotonic");
});

test("a word with nothing pronounceable in it owns no tokens", () => {
  const { tokens, owner } = toSpokenForm(["—", "hola"]);
  assert.deepEqual(tokens, ["hola"]);
  assert.deepEqual(owner, [1]);
});

// --- validation -------------------------------------------------------------

test("a backwards alignment is refused, not smoothed over", () => {
  const outcome = validateAlignment([w("uno", 0, 1), w("dos", 0.4, 1.4)], 2);
  assert.equal(outcome.usable, false);
  assert.match(outcome.problems.join(" "), /starts at 0.40s, before word 0 ended/);
});

test("a word past the end of the audio is refused", () => {
  const outcome = validateAlignment([w("uno", 0, 1), w("dos", 1, 9)], 2);
  assert.equal(outcome.usable, false);
  assert.match(outcome.problems.join(" "), /falls outside the 2.00s audio/);
});

test("coverage below the floor makes the alignment unusable", () => {
  const words = [
    w("uno", 0, 1),
    { text: "dos", startSec: 0, endSec: 0, confidence: null, located: false },
    { text: "tres", startSec: 0, endSec: 0, confidence: null, located: false },
  ];
  const outcome = validateAlignment(words, 3);
  assert.ok(outcome.coverage < MIN_COVERAGE);
  assert.equal(outcome.usable, false);
  assert.match(outcome.problems.join(" "), /33% of words were located/);
});

test("a weak placement becomes unlocated rather than a timestamp nobody trusts", () => {
  const floored = applyConfidenceFloor([
    w("seguro", 0, 1, 0.8),
    w("dudoso", 1, 2, MIN_CONFIDENCE - 0.01),
  ]);
  assert.equal(floored[0].located, true);
  assert.equal(floored[1].located, false);
  // The word itself survives; only its timing is withheld.
  assert.equal(floored[1].text, "dudoso");
});

// --- cache ------------------------------------------------------------------

test("the cache key covers the audio, the words, the language and the version", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-key-"));
  const audio = path.join(dir, "a.wav");
  fs.writeFileSync(audio, "AAAA");
  const other = path.join(dir, "b.wav");
  fs.writeFileSync(other, "BBBB");

  const base = cacheKey(audio, ["uno", "dos"], "es", "v1");
  assert.equal(base, cacheKey(audio, ["uno", "dos"], "es", "v1"), "stable");
  assert.notEqual(base, cacheKey(other, ["uno", "dos"], "es", "v1"), "audio bytes");
  assert.notEqual(base, cacheKey(audio, ["uno", "tres"], "es", "v1"), "words");
  assert.notEqual(base, cacheKey(audio, ["uno", "dos"], "en", "v1"), "language");
  assert.notEqual(base, cacheKey(audio, ["uno", "dos"], "es", "v2"), "aligner version");

  fs.rmSync(dir, { recursive: true, force: true });
});

test("a usable alignment is cached and replayed; a failed one is not", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-cache-"));
  const audio = path.join(dir, "a.wav");
  fs.writeFileSync(audio, "AAAA");
  const request: AlignmentRequest = {
    audioPath: audio,
    words: ["uno", "dos"],
    language: "es",
    audioSec: 2,
  };

  const good = new StubAligner();
  const first = await alignWords({ request, aligner: good, outDir: dir });
  assert.equal(first.fromCache, false);
  const second = await alignWords({ request, aligner: good, outDir: dir });
  assert.equal(second.fromCache, true);
  assert.equal(good.calls, 1, "a cache hit must not re-run the model");

  const third = await alignWords({ request, aligner: good, outDir: dir, refresh: true });
  assert.equal(third.fromCache, false);
  assert.equal(good.calls, 2, "--refresh-alignment bypasses the cache");

  // A failure is environmental more often than not, so it is retried.
  const bad = new StubAligner({ usable: false, problems: ["nope"] });
  const badDir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-bad-"));
  await alignWords({ request, aligner: bad, outDir: badDir });
  await alignWords({ request, aligner: bad, outDir: badDir });
  assert.equal(bad.calls, 2, "an unusable result must not be remembered");

  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync(badDir, { recursive: true, force: true });
});

test("a cache file written by hand round-trips", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-rt-"));
  const result: AlignmentResult = {
    method: "forced",
    aligner: "stub",
    version: "stub-1",
    language: "es",
    audioSec: 1,
    words: [w("uno", 0, 1)],
    coverage: 1,
    problems: [],
    usable: true,
  };
  writeCache(dir, "key", result);
  assert.deepEqual(readCache(dir, "key"), result);
  assert.equal(readCache(dir, "missing"), undefined);
  fs.rmSync(dir, { recursive: true, force: true });
});

// --- no silent fallback -----------------------------------------------------

test("with no aligner there is no alignment, and the reason says so", async () => {
  const outcome = await alignWords({
    request: { audioPath: "/dev/null", words: ["uno"], language: "es", audioSec: 1 },
    aligner: undefined,
    outDir: os.tmpdir(),
  });
  assert.equal(outcome.result, undefined);
  assert.match(outcome.reason!, /switched off/);
});

test("an aligner that is not installed reports that, and names the way out", async () => {
  const absent = new TorchaudioAligner({ python: "/nonexistent/python" });
  assert.equal(absent.available(), false);
  const outcome = await alignWords({
    request: { audioPath: "/dev/null", words: ["uno"], language: "es", audioSec: 1 },
    aligner: absent,
    outDir: os.tmpdir(),
  });
  assert.equal(outcome.result, undefined);
  assert.match(outcome.reason!, /not installed/);
  assert.match(outcome.reason!, /--aligner=none/);
});

test("the aligner flag only accepts what exists", () => {
  assert.equal(parseAlignerId("torchaudio"), "torchaudio");
  assert.equal(parseAlignerId("forced"), "torchaudio");
  assert.equal(parseAlignerId("none"), "none");
  assert.equal(parseAlignerId("whisperx"), undefined, "an uninstallable aligner is not an option");
  assert.equal(parseAlignerId(undefined), undefined);
});

// --- cards and the highlight ------------------------------------------------

test("cards break at sentence ends, at the word cap and at real pauses", () => {
  // minCardSec 0 isolates the structural rule from the reading-time rule.
  const groups = groupWords(
    [
      w("Florida", 0, 0.4),
      w("sube.", 0.4, 0.8),
      w("Entra", 0.9, 1.2),
      w("en", 1.2, 1.3),
      w("el", 1.3, 1.4),
      w("Top", 1.4, 1.7),
      // A 0.6s gap: the narrator took a breath, so no card may straddle it.
      w("10", 2.3, 2.6),
    ],
    PAUSE_SEC,
    0,
  );
  assert.deepEqual(
    groups.map((g) => g.words.map((x) => x.text).join(" ")),
    ["Florida sube.", "Entra en el Top", "10"],
  );
});

test("a card keeps taking words until it has earned its time on screen", () => {
  // Fast speech: four words go by in 0.8s, well under any reading floor, so
  // the card must not close at the word cap.
  const fast = Array.from({ length: 8 }, (_v, i) => w(`p${i}`, i * 0.2, i * 0.2 + 0.18));
  const groups = groupWords(fast, PAUSE_SEC, 1.2);
  assert.equal(groups.length, 1, "eight fast words make one readable card");

  // Slow speech: four words already fill 2s, so the word cap governs.
  const slow = Array.from({ length: 8 }, (_v, i) => w(`p${i}`, i * 0.5, i * 0.5 + 0.45));
  assert.equal(groupWords(slow, PAUSE_SEC, 1.2).length, 2);
});

test("the word ceiling stops a card growing past what fits", () => {
  // Very fast speech would otherwise accumulate forever.
  const words = Array.from({ length: 20 }, (_v, i) => w(`p${i}`, i * 0.05, i * 0.05 + 0.04));
  for (const group of groupWords(words, PAUSE_SEC, 5)) {
    assert.ok(
      group.words.length <= MAX_WORDS_PER_GROUP,
      `a card of ${group.words.length} words is past the ceiling`,
    );
  }
});

test("a pause breaks a card even when it has not earned its time", () => {
  const groups = groupWords([w("uno", 0, 0.2), w("dos", 2, 2.2)], PAUSE_SEC, 1.2);
  assert.equal(groups.length, 2, "holding words across a silence is the drift this ends");
});

test("an over-long card is split, never dropped", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "a".repeat(40) + " " + "b".repeat(40) + " " + "c".repeat(40),
    caption: "x",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 3,
  };
  // Three unbreakable 40-character words cannot share one card at any size.
  const words = [
    w("a".repeat(40), 0, 0.9),
    w("b".repeat(40), 0.9, 1.8),
    w("c".repeat(40), 1.8, 2.7),
  ];
  const cues = buildWordCues([scene], [words], 3);
  assert.equal(cues.length, 3, "every word still gets a cue");
  for (const word of words) {
    assert.ok(
      cues.some((c) => c.text.includes(word.text)),
      "a word the voice says must still reach the screen",
    );
  }
});

test("a group no word of which was located is dropped, not invented", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "uno dos tres cuatro cinco seis",
    caption: "uno dos tres cuatro cinco seis",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 6,
  };
  const words: WordTiming[] = [
    w("uno", 0, 0.5),
    w("dos", 0.5, 1),
    w("tres", 1, 1.5),
    w("cuatro", 1.5, 2),
    // The whole second card is unlocated.
    { text: "cinco", startSec: 0, endSec: 0, confidence: null, located: false },
    { text: "seis", startSec: 0, endSec: 0, confidence: null, located: false },
  ];
  const cues = buildWordCues([scene], [words], 6);
  assert.ok(cues.length > 0);
  assert.ok(
    cues.every((c) => !c.text.includes("cinco")),
    "an unlocated card must not appear at a guessed moment",
  );
});

test("every word of a card gets its turn as the active word", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "uno dos tres cuatro",
    caption: "uno dos tres cuatro",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 4,
  };
  const words = [w("uno", 0, 0.9), w("dos", 1, 1.9), w("tres", 2, 2.9), w("cuatro", 3, 3.9)];
  const cues = buildWordCues([scene], [words], 4);

  assert.deepEqual(cues.map((c) => c.activeWord), ["uno", "dos", "tres", "cuatro"]);
  assert.deepEqual(cues.map((c) => c.activeWordIndex), [0, 1, 2, 3]);
  assert.equal(new Set(cues.map((c) => c.text)).size, 1, "all four share one card");
  // Each word's cue begins when that word begins.
  assert.equal(cues[1].startSec, 1);
  assert.equal(cues[2].startSec, 2);
});

test("the frame tints the active word and nothing else", () => {
  const svg = frameSvg(
    {
      index: 1,
      startSec: 0,
      endSec: 1,
      text: "Florida sube trece puestos",
      sceneId: "beat-1",
      kind: "beat",
      progress: 0.1,
      fontSize: 62,
      activeWord: "trece",
      activeWordIndex: 2,
    },
    {
      template: "news",
      kicker: "AHORA",
      accent: "#C8102E",
      meta: "2026-10-13",
      numberBeats: true,
    },
  );
  assert.ok(svg.includes('<tspan fill="#C8102E">trece</tspan>'), "the spoken word is tinted");
  assert.equal(svg.match(/<tspan/g)!.length, 1, "exactly one word is tinted");
  // Every word is still drawn: the tint is a colour change, not a rewrite.
  for (const word of ["Florida", "sube", "trece", "puestos"]) {
    assert.ok(svg.includes(word), `"${word}" is still on screen`);
  }
});

test("a repeated word in one card tints the one being spoken", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "de uno de dos",
    caption: "de uno de dos",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 4,
  };
  // Contiguous on purpose: a gap here would break the card in two and there
  // would be no repeat left to disambiguate.
  const words = [w("de", 0, 0.4), w("uno", 0.4, 0.8), w("de", 0.8, 1.2), w("dos", 1.2, 1.6)];
  const cues = buildWordCues([scene], [words], 2);
  const second = cues.find((c) => c.startSec === 0.8)!;
  assert.equal(second.activeWord, "de");
  assert.equal(second.activeWordIndex, 2, "the second 'de', not the first");
});

// --- the timeline -----------------------------------------------------------

test("the stitched timeline covers the clip with no holes", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "uno dos tres",
    caption: "uno dos tres",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 5,
  };
  // Speech starts at 1.2s and stops at 3.0s; the clip is 5s long.
  const words = [w("uno", 1.2, 1.6), w("dos", 1.7, 2.1), w("tres", 2.6, 3.0)];
  const cues = buildWordCues([scene], [words], 5);

  assert.equal(cues[0].startSec, 0, "the card is up before the voice, not after it");
  assert.equal(cues.at(-1)!.endSec, 5, "the last card is held to the end of the clip");
  for (let i = 1; i < cues.length; i++) {
    assert.equal(
      cues[i].startSec,
      cues[i - 1].endSec,
      `a hole between cue ${i} and ${i + 1} would be a hole in the video`,
    );
  }
  assert.ok(cues.every((c) => c.progress >= 0 && c.progress <= 1));
});

test("stitching an empty cue list yields nothing rather than a bogus frame", () => {
  assert.deepEqual(stitchTimeline([], 10), []);
});

test("the SRT carries cards, not one entry per word", () => {
  const scene: Scene = {
    id: "beat-1",
    kind: "beat",
    narration: "uno dos tres cuatro cinco seis siete ocho",
    caption: "uno dos tres cuatro cinco seis siete ocho",
    padBeforeSec: 0,
    padAfterSec: 0,
    durationSec: 8,
  };
  const words = Array.from({ length: 8 }, (_v, i) =>
    w(["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho"][i], i, i + 0.9),
  );
  const cues = buildWordCues([scene], [words], 8);
  const cards = mergeForSubtitles(cues);

  assert.equal(cues.length, 8, "one frame cue per word");
  assert.equal(cards.length, 2, "two cards of four words");
  assert.equal(cards[0].endSec, cards[1].startSec, "the cards are contiguous");
  assert.equal(cards.at(-1)!.endSec, 8);
  assert.ok(cards.every((c) => c.activeWord === undefined), "a subtitle has no highlight");
  assert.deepEqual(
    cards.map((c) => c.index),
    [1, 2],
    "indices are renumbered for the SRT",
  );

  const srt = toSrt(cards);
  assert.equal(srt.match(/-->/g)!.length, 2);
});

test("cards shorter than the reading floor are reported, not padded", () => {
  const cards = [
    { ...w("x", 0, 0), text: "a", index: 1, startSec: 0, endSec: 0.3, sceneId: "s", kind: "beat" as const, progress: 0, fontSize: 60 },
    { ...w("y", 0, 0), text: "b", index: 2, startSec: 0.3, endSec: 4, sceneId: "s", kind: "beat" as const, progress: 0, fontSize: 60 },
  ];
  const short = shortCards(cards, 1.2);
  assert.equal(short.length, 1);
  assert.equal(short[0].index, 1);
});

// --- the narration-level wiring --------------------------------------------

function sceneFixture(): Scene[] {
  return [
    {
      id: "hook",
      kind: "hook",
      narration: "Florida sube trece puestos",
      caption: "Florida sube trece puestos",
      padBeforeSec: 0,
      padAfterSec: 0,
      durationSec: 2,
    },
    {
      id: "beat-1",
      kind: "beat",
      narration: "Entra en el Top 10",
      caption: "Entra en el Top 10",
      beatIndex: 1,
      beatTotal: 1,
      padBeforeSec: 0,
      padAfterSec: 0,
      durationSec: 2,
    },
  ];
}

test("the narration is aligned once and the words come back split by scene", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-narr-"));
  const audio = path.join(dir, "narration.wav");
  fs.writeFileSync(audio, "AAAA");
  const scenes = sceneFixture();
  const stub = new StubAligner();

  const aligned = await alignNarration({
    scenes,
    narrationPath: audio,
    totalSec: 4,
    cacheRoot: dir,
    aligner: stub,
  });

  assert.equal(aligned.usable, true);
  assert.equal(stub.calls, 1, "one model load for the whole clip");
  assert.equal(aligned.wordsByScene.length, 2);
  assert.deepEqual(
    aligned.wordsByScene.map((ws) => ws.map((x) => x.text)),
    [
      ["Florida", "sube", "trece", "puestos"],
      ["Entra", "en", "el", "Top", "10"],
    ],
    "each scene gets exactly its own words, in order",
  );
  // The scene split must not disturb the timeline.
  const flat = aligned.wordsByScene.flat();
  assert.ok(flat.every((x, i) => i === 0 || x.startSec >= flat[i - 1].startSec));

  fs.rmSync(dir, { recursive: true, force: true });
});

test("an alignment that does not validate is not used for captioning", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-bad2-"));
  const audio = path.join(dir, "narration.wav");
  fs.writeFileSync(audio, "AAAA");

  const aligned = await alignNarration({
    scenes: sceneFixture(),
    narrationPath: audio,
    totalSec: 4,
    cacheRoot: dir,
    aligner: new StubAligner({ usable: false, problems: ["only 40% of words were located"] }),
  });

  assert.equal(aligned.usable, false);
  assert.deepEqual(aligned.wordsByScene, []);
  assert.match(aligned.reason!, /40%/);
  assert.match(aligned.summary, /NOT USABLE/);

  fs.rmSync(dir, { recursive: true, force: true });
});

test("a word count that does not match the script is caught, not partitioned", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-count-"));
  const audio = path.join(dir, "narration.wav");
  fs.writeFileSync(audio, "AAAA");

  const aligned = await alignNarration({
    scenes: sceneFixture(),
    narrationPath: audio,
    totalSec: 4,
    cacheRoot: dir,
    aligner: new StubAligner({ words: [w("solo", 0, 1)] }),
  });

  assert.equal(aligned.usable, false);
  assert.match(aligned.reason!, /1 words for a 9-word script/);

  fs.rmSync(dir, { recursive: true, force: true });
});

test("the sidecar records the measurement, including what was not located", () => {
  const json = JSON.parse(
    alignmentSidecar(
      {
        method: "forced",
        aligner: "stub",
        version: "stub-1",
        language: "es",
        audioSec: 2,
        words: [
          w("Florida", 0.4, 0.82, 0.72),
          { text: "trece", startSec: 0, endSec: 0, confidence: 0.2, located: false },
        ],
        coverage: 0.5,
        problems: ["only 50% of words were located"],
        usable: false,
      },
      "florida",
    ),
  );
  assert.equal(json.slug, "florida");
  assert.equal(json.method, "forced");
  assert.equal(json.words[0].start, 0.4);
  assert.equal(json.words[0].confidence, 0.72);
  assert.equal(json.words[1].located, false, "the gap is recorded, not hidden");
  assert.deepEqual(json.problems, ["only 50% of words were located"]);
});

// --- real audio -------------------------------------------------------------

const realAligner = new TorchaudioAligner();
const say = new SayProvider();
const canAlignRealAudio = realAligner.available() && say.available();

test(
  "the forced aligner locates real spoken words in real audio",
  {
    skip: canAlignRealAudio
      ? false
      : "the forced aligner or macOS `say` is not installed (see automation/README.md)",
    timeout: 300_000,
  },
  async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-align-real-"));
    const narration = "Florida sube trece puestos y entra en el Top 10 del ranking.";
    const aiff = path.join(dir, "voice.aiff");
    await say.synthesize({ text: narration, outPath: aiff });

    // The aligner reads PCM wav; this is the same conversion the renderer does.
    const wav = path.join(dir, "voice.wav");
    const { execFileSync } = await import("node:child_process");
    execFileSync("ffmpeg", ["-y", "-v", "error", "-i", aiff, "-ac", "1", "-ar", "44100", wav], {
      stdio: "pipe",
    });
    const audioSec = durationOf(wav);

    const words = writtenWords(narration);
    const result = await realAligner.align({ audioPath: wav, words, language: "es", audioSec });

    assert.equal(result.method, "forced");
    assert.equal(result.words.length, words.length, "one timing per written word");
    assert.deepEqual(
      result.words.map((x) => x.text),
      words,
      "the aligner returns the approved words, never its own transcription",
    );

    const located = result.words.filter((x) => x.located);
    assert.ok(
      located.length >= Math.ceil(words.length * MIN_COVERAGE),
      `only ${located.length}/${words.length} words were located`,
    );

    // Monotonic, inside the audio, and non-degenerate.
    let previousEnd = 0;
    for (const word of located) {
      assert.ok(word.startSec >= previousEnd - 1e-6, `"${word.text}" overlaps the previous word`);
      assert.ok(word.endSec <= audioSec + 0.05, `"${word.text}" falls past the end of the audio`);
      assert.ok(word.endSec > word.startSec, `"${word.text}" has no duration`);
      previousEnd = word.endSec;
    }

    // The point of the exercise: the timings are not evenly spaced. An even
    // split is what this replaced, so a result that looks like one has not
    // measured anything.
    const gaps = located.slice(1).map((x, i) => x.startSec - located[i].startSec);
    const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const spread = Math.max(...gaps) - Math.min(...gaps);
    assert.ok(
      spread > mean * 0.5,
      `word spacing is suspiciously even (spread ${spread.toFixed(3)}s, mean ${mean.toFixed(3)}s)`,
    );

    // "trece" is the spoken form of nothing here - it is written as a word -
    // but "10" is a digit the narrator says as "diez", and it must still be
    // shown as "10".
    const ten = result.words.find((x) => x.text === "10")!;
    assert.equal(ten.text, "10", "the digit stays a digit on screen");

    fs.rmSync(dir, { recursive: true, force: true });
  },
);
