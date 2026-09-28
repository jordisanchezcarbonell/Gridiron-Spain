import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Wordmark } from "@/components/layout/Wordmark";
import { articles } from "@/data/articles";
import { sources } from "@/data/sources";
import { en } from "@/dictionaries/en";
import { es } from "@/dictionaries/es";
import { site } from "@/lib/site";

test("the public brand is Primer Down in configuration, dictionaries and wordmark", () => {
  const wordmark = renderToStaticMarkup(createElement(Wordmark));

  assert.equal(site.name, "Primer Down");
  assert.equal(es.site.name, "Primer Down");
  assert.equal(en.site.name, "Primer Down");
  assert.match(wordmark, />PD</);
  assert.match(wordmark, /Primer/);
  assert.match(wordmark, /Down/);
  assert.doesNotMatch(wordmark, /Gridiron Spain/);
});

test("the Week 3 NFL state-of-play article is published, bilingual and sourced", () => {
  const article = articles.find((item) => item.slug === "nfl-estado-liga-semana-3-2026");

  assert.ok(article, "Expected the Week 3 NFL state-of-play article to be registered");
  assert.equal(article.category, "nfl");
  assert.equal(article.status, "published");
  assert.equal(article.verificationStatus, "partial");
  assert.deepEqual(article.availableLocales, ["es", "en"]);
  assert.deepEqual(article.relatedCompetitionIds, ["nfl"]);
  assert.equal(article.publishedAt, "2026-09-28");
  assert.ok(article.content.some((block) => block.type === "stat-highlight"));
  assert.ok(article.content.some((block) => block.type === "callout"));
  assert.ok(article.sourceIds.length >= 4);

  const registeredSourceIds = new Set(sources.map((source) => source.id));
  for (const sourceId of article.sourceIds) {
    assert.ok(registeredSourceIds.has(sourceId), `Expected source ${sourceId} to be registered`);
  }
});
