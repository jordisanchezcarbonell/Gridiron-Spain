import assert from "node:assert/strict";
import test from "node:test";
import { sources } from "@/data/sources";
import { getExternalPowerRanking } from "@/data/power-rankings";

test("the NFL power-ranking reference points readers to nfelo's live ranking", () => {
  const source = sources.find((item) => item.id === "nfelo-nfl-power-rankings");

  assert.ok(source, "Expected nfelo's NFL ranking reference in the source registry");
  assert.equal(source.publisher, "nfelo");
  assert.equal(source.url, "https://www.nfeloapp.com/nfl-power-ratings/");
});

test("the NFL page has an external live nfelo ranking card without copied team ratings", () => {
  const ranking = getExternalPowerRanking("nfl");

  assert.deepEqual(ranking, {
    sourceId: "nfelo-nfl-power-rankings",
    provider: "nfelo",
    url: "https://www.nfeloapp.com/nfl-power-ratings/",
  });
});
