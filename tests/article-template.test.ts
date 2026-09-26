import assert from "node:assert/strict";
import test from "node:test";
import { articles } from "@/data/articles";

test("the Texas comeback editorial is registered with reusable score and timeline blocks", () => {
  const article = articles.find((item) => item.slug === "texas-remontada-ohio-state");

  assert.ok(article, "Expected the Texas comeback article to be registered");
  assert.equal(article.category, "ncaa");
  assert.ok(article.content.some((block) => block.type === "score"));
  assert.ok(article.content.some((block) => block.type === "timeline"));
  assert.ok(article.content.some((block) => block.type === "stat-highlight"));
  assert.ok(article.heroImage, "Expected a licensed hero image");
  assert.equal(article.heroImage.photographer, "audreyhs17");
  assert.equal(article.heroImage.license, "CC BY 2.0");
  assert.ok(article.sourceIds.includes("texas-ohio-state-2026-texas"));
  assert.ok(article.content.some((block) => block.type === "image"));
  assert.deepEqual(article.availableLocales, ["es", "en"]);
});

test("the Navy 1926 uniform editorial is bilingual and uses the established editorial blocks", () => {
  const article = articles.find((item) => item.slug === "navy-uniforme-1926-campeonato-nacional-notre-dame");

  assert.ok(article, "Expected the Navy 1926 uniform article to be registered");
  assert.equal(article.category, "ncaa");
  assert.deepEqual(article.availableLocales, ["es", "en"]);
  assert.equal(article.status, "published");
  assert.equal(article.seo?.title.es, "Navy recupera el uniforme de sus campeones de 1926");
  assert.ok(article.sourceIds.includes("navy-1926-uniform-2026"));
  assert.ok(article.content.some((block) => block.type === "score"));
  assert.ok(article.content.some((block) => block.type === "timeline"));
  assert.ok(article.content.filter((block) => block.type === "stat-highlight").length >= 2);
  assert.equal(article.heroImage, undefined, "Unlicensed press photography must not be published as the hero image");
  assert.ok(article.heroImagePending?.es.includes("pendiente"));
});
