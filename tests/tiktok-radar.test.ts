import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  hashContent,
  isHorizontalRule,
  listBriefings,
  parseBriefing,
  parseFrontMatter,
  plainText,
  readBriefing,
  slugify,
} from "../automation/src/radar/parse";
import { asConfidence, narratableProse, parseResearchDoc } from "../automation/src/radar/research";

const FULL_TEMPLATE = `---
date: 2026-10-02
generated_at: 2026-10-02T08:00:00Z
type: daily-briefing
scope: [ncaa, nfl]
---

## 🔥 TOP STORIES

### 1. Equipo sube al Top 10 (CONFIRMED)
Prosa con el hecho concreto que da la noticia de la jornada del sabado.
- **Why it matters:** Importa porque cambia la carrera del playoff
- **Source:** [Yahoo](https://sports.yahoo.com/x)
- **Content potential:** Articulo, TikTok

---

## 💡 CONTENT OPPORTUNITIES

### TikTok / Reels Ideas

| Hook | Formato | Duración |
|------|---------|----------|
| "Un gancho cualquiera" | Explainer del trofeo | 45s |

---

## 📊 DETECTED STORIES

### Surprise Team: Un equipo
**Un equipo (4-0)** ha entrado en el Top 10 tras anios de irrelevancia total.
- **Why it matters:** Historia de underdog
- **Priority:** 3/5
- **Confidence:** CONFIRMED
`;

const CONDENSED = `---
date: 2026-10-14
type: daily-briefing
---

## 🏈 NCAA

### Storylines

1. **Partido de la jornada** (Priority: 5/5) — el numero 4 contra el numero 5, con
   el invicto de la conferencia enfrente y mucho en juego. *Content: preview, TikTok.*
2. **Otro partido** — dos equipos invictos se ven las caras fuera del circuito grande.
`;

test("parses the full skill-template briefing shape", () => {
  const b = parseBriefing("research/daily/2026-10-02.md", FULL_TEMPLATE);
  assert.equal(b.date, "2026-10-02");
  assert.equal(b.type, "daily-briefing");
  assert.deepEqual(b.scope, ["ncaa", "nfl"]);

  const top = b.items.find((i) => i.provenance.section === "top-stories");
  assert.ok(top, "expected a TOP STORIES item");
  assert.equal(top.confidence, "CONFIRMED");
  assert.equal(top.taggedForVideo, true, "Content potential mentions TikTok");
  assert.equal(top.sources[0].url, "https://sports.yahoo.com/x");
  assert.ok(top.body.join(" ").includes("Importa porque"), "why-it-matters joins the body");
  assert.equal(top.format, "news");
});

test("reads the explicit Confidence and Priority bullets of DETECTED STORIES", () => {
  const b = parseBriefing("x.md", FULL_TEMPLATE);
  const detected = b.items.find((i) => i.provenance.section === "detected-stories");
  assert.ok(detected);
  assert.equal(detected.confidence, "CONFIRMED");
  assert.equal(detected.priority, 3, "`- **Priority:** 3/5` must survive the asterisks");
});

test("parses the TikTok hook table instead of mistaking rows for separators", () => {
  const b = parseBriefing("x.md", FULL_TEMPLATE);
  const ideas = b.items.filter((i) => i.provenance.section === "tiktok-ideas");
  assert.equal(ideas.length, 1);
  assert.equal(ideas[0].title, "Explainer del trofeo");
  assert.equal(ideas[0].taggedForVideo, true);
  assert.equal(ideas[0].confidence, "UNKNOWN", "a bare hook states no confidence");
});

test("parses the condensed storyline shape with wrapped continuation lines", () => {
  const b = parseBriefing("research/daily/2026-10-14.md", CONDENSED);
  const first = b.items.find((i) => i.title === "Partido de la jornada");
  assert.ok(first, "expected the first storyline");
  assert.equal(first.priority, 5);
  assert.equal(first.taggedForVideo, true);
  assert.ok(first.body.join(" ").includes("mucho en juego"), "wrapped lines are joined");
  assert.ok(!first.body.join(" ").includes("Content:"), "the Content annotation is not narration");
});

test("an item with no stated confidence stays UNKNOWN rather than being guessed", () => {
  const b = parseBriefing("x.md", CONDENSED);
  const second = b.items.find((i) => i.title === "Otro partido");
  assert.ok(second);
  assert.equal(second.confidence, "UNKNOWN");
});

test("provenance line numbers point at the real file line, front matter included", () => {
  const b = parseBriefing("x.md", FULL_TEMPLATE);
  const lines = FULL_TEMPLATE.split("\n");
  for (const item of b.items) {
    const line = lines[item.provenance.line - 1];
    assert.ok(line !== undefined, `line ${item.provenance.line} exists for ${item.slug}`);
  }
  const top = b.items.find((i) => i.provenance.section === "top-stories");
  assert.match(lines[top!.provenance.line - 1], /^### 1\. Equipo sube/);
});

test("horizontal rules never leak into narration", () => {
  assert.equal(isHorizontalRule("---"), true);
  assert.equal(isHorizontalRule("***"), true);
  assert.equal(isHorizontalRule("- item"), false);
  const b = parseBriefing("x.md", FULL_TEMPLATE);
  for (const item of b.items) {
    assert.ok(!item.body.includes("---"), `${item.slug} body must not contain a rule`);
  }
});

test("slug and hash are stable and content-sensitive", () => {
  assert.equal(slugify("Ohio State vs Iowa: ¡GameDay!"), "ohio-state-vs-iowa-gameday");
  assert.equal(slugify("Mónica y Ñandú"), "monica-y-nandu");
  assert.equal(hashContent("t", ["a"]), hashContent("t", ["a"]));
  assert.notEqual(hashContent("t", ["a"]), hashContent("t", ["b"]));
});

test("plainText strips links, emphasis and citation markers", () => {
  assert.equal(plainText("**Hola** [enlace](https://x.com) [[src:abc-1]] `code`"), "Hola enlace code");
});

test("front matter reports the number of lines it consumed", () => {
  const { data, offset } = parseFrontMatter(FULL_TEMPLATE);
  assert.equal(data.date, "2026-10-02");
  assert.equal(offset, 6);
  assert.equal(parseFrontMatter("# no front matter").offset, 0);
});

test("compound confidence resolves to the weakest stated value", () => {
  assert.equal(asConfidence("CONFIRMED"), "CONFIRMED");
  assert.equal(asConfidence("REPORTED (fundación) / CONFIRMED (competición)"), "REPORTED");
  assert.equal(asConfidence("UNKNOWN (fundación) / CONFIRMED (competición)"), "UNKNOWN");
  assert.equal(asConfidence(undefined), "UNKNOWN");
  assert.equal(asConfidence("sin datos"), "UNKNOWN");
});

test("research docs contribute prose but never tables or editorial notes", () => {
  const doc = `---
id: un-club
type: team-spain
name: Un Club
confidence: CONFIRMED
last_researched: 2026-10-02
---

# Un Club

Este parrafo si es prosa narrable y tiene longitud mas que suficiente para pasar el filtro.

## Datos basicos

| Campo | Valor |
|---|---|
| Ciudad | Alguna |

## Que hacer

Esto es una nota editorial interna que jamas debe acabar en la narracion de un video.
`;
  const item = parseResearchDoc("research/spain/un-club.md", doc);
  assert.ok(item);
  assert.equal(item.format, "explainer");
  assert.equal(item.confidence, "CONFIRMED");
  assert.equal(item.slug, "un-club");
  const body = item.body.join(" ");
  assert.ok(body.includes("prosa narrable"));
  assert.ok(!body.includes("|"), "table rows are not narration");
  assert.ok(!body.includes("nota editorial"), "`Que hacer` sections are editorial, not narration");
});

test("narratableProse ignores bullets, code fences and short labels", () => {
  const body = `# T

Fuente: algo.

- un bullet
\`\`\`
codigo que no se narra
\`\`\`

Un parrafo de verdad con la longitud necesaria para ser considerado narrable por el filtro.
`;
  const prose = narratableProse(body);
  assert.equal(prose.length, 1);
  assert.ok(prose[0].includes("parrafo de verdad"));
});

test("the real briefings in the repo still parse", () => {
  const files = listBriefings();
  assert.ok(files.length > 0, "expected briefings in research/daily");
  for (const file of files) {
    assert.ok(fs.existsSync(file));
    const b = readBriefing(file);
    for (const item of b.items) {
      assert.ok(item.slug.length > 0, `${file}: every item needs a slug`);
      assert.ok(["news"].includes(item.format));
    }
  }
});
