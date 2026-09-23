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
  assert.deepEqual(article.availableLocales, ["es", "en"]);
});
