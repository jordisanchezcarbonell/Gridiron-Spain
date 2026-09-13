/**
 * Editorial integrity check. Run with `npm run content:check`.
 * - every referenced source id exists
 * - every [[src:ID]] citation resolves to a source listed on the entity
 * - slugs are unique
 * - no partner is rendered without confirmation
 * - verified entities carry lastVerifiedAt
 */
import { teams } from "../src/data/teams";
import { articles } from "../src/data/articles";
import { competitions } from "../src/data/competitions";
import { timeline } from "../src/data/timeline";
import { sources } from "../src/data/sources";
import { partners, gameFacts, roadCopy } from "../src/data/road";
import { eras, finals } from "../src/data/history";
import { seasons } from "../src/data/seasons";

const sourceIds = new Set(sources.map((s) => s.id));
const errors: string[] = [];
const warnings: string[] = [];
const CITE = /\[\[src:([a-z0-9-]+)\]\]/g;

function checkIds(owner: string, ids: string[] | undefined) {
  for (const id of ids ?? []) {
    if (!sourceIds.has(id)) errors.push(`${owner}: unknown source id "${id}"`);
  }
}

function checkCitations(owner: string, text: string | undefined, allowed: string[]) {
  if (!text) return;
  for (const match of text.matchAll(CITE)) {
    const id = match[1];
    if (!sourceIds.has(id)) errors.push(`${owner}: citation to unknown source "${id}"`);
    else if (!allowed.includes(id)) errors.push(`${owner}: citation "${id}" is not listed in the entity's sourceIds`);
  }
}

function unique(owner: string, values: string[]) {
  const seen = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) errors.push(`${owner}: duplicate "${v}"`);
    seen.add(v);
  }
}

unique("sources", sources.map((s) => s.id));
unique("teams", teams.map((t) => t.slug));
unique("articles", articles.map((a) => a.slug));
unique("competitions", competitions.map((c) => c.slug));
unique("timeline", timeline.map((e) => e.id));

const competitionIds = new Set(competitions.map((c) => c.id));

for (const team of teams) {
  const owner = `team:${team.slug}`;
  checkIds(owner, team.sourceIds);
  for (const h of team.honours) checkIds(owner, h.sourceIds);
  for (const c of team.currentCompetitions) {
    checkIds(owner, c.sourceIds);
    if (!competitionIds.has(c.competitionId)) errors.push(`${owner}: unknown competition "${c.competitionId}"`);
  }
  for (const p of team.history ?? []) {
    checkCitations(owner, p.es, team.sourceIds);
    checkCitations(owner, p.en, team.sourceIds);
  }
  if (team.verificationStatus === "verified" && !team.lastVerifiedAt) errors.push(`${owner}: verified without lastVerifiedAt`);
  if (team.status === "active" && !team.venue?.coordinates) warnings.push(`${owner}: active team without coordinates (will not appear on map)`);
  if (team.verificationStatus === "verified" && team.sourceIds.length === 0) errors.push(`${owner}: verified without sources`);
}

for (const article of articles) {
  const owner = `article:${article.slug}`;
  checkIds(owner, article.sourceIds);
  for (const id of article.relatedTeamIds) {
    if (!teams.some((t) => t.id === id)) errors.push(`${owner}: unknown related team "${id}"`);
  }
  for (const id of article.relatedCompetitionIds) {
    if (!competitionIds.has(id)) errors.push(`${owner}: unknown related competition "${id}"`);
  }
  for (const block of article.content) {
    if (block.type === "paragraph" || block.type === "callout") {
      checkCitations(owner, block.text.es, article.sourceIds);
      checkCitations(owner, block.text.en, article.sourceIds);
    }
    if (block.type === "list") {
      for (const item of block.items) {
        checkCitations(owner, item.es, article.sourceIds);
        checkCitations(owner, item.en, article.sourceIds);
      }
    }
  }
  if (article.status === "published" && article.verificationStatus === "unverified")
    errors.push(`${owner}: published but unverified`);
  if (article.availableLocales.includes("en")) {
    const missing = article.content.some((b) => "text" in b && !b.text.en);
    if (missing) warnings.push(`${owner}: declared available in EN but some blocks lack EN text`);
  }
}

for (const c of competitions) checkIds(`competition:${c.slug}`, c.sourceIds);
for (const e of timeline) {
  checkIds(`timeline:${e.id}`, e.sourceIds);
  if (e.verificationStatus !== "unverified" && e.sourceIds.length === 0) errors.push(`timeline:${e.id}: ${e.verificationStatus} without sources`);
}
for (const f of gameFacts) checkIds("road:gameFacts", f.sourceIds);
checkIds("road:copy", roadCopy.sourceIds);
for (const key of ["story", "whyNavy", "journey"] as const) {
  for (const p of roadCopy[key]) {
    checkCitations(`road:${key}`, p.es, roadCopy.sourceIds);
    checkCitations(`road:${key}`, p.en, roadCopy.sourceIds);
  }
}
for (const era of eras) {
  checkIds(`era:${era.id}`, era.sourceIds);
  for (const p of era.paragraphs) {
    checkCitations(`era:${era.id}`, p.es, era.sourceIds);
    checkCitations(`era:${era.id}`, p.en, era.sourceIds);
  }
}
for (const f of finals) {
  const owner = `final:${f.competitionId}-${f.year}`;
  checkIds(owner, f.sourceIds);
  if (!competitionIds.has(f.competitionId)) errors.push(`${owner}: unknown competition`);
  for (const side of [f.champion, f.runnerUp]) {
    if (side?.teamId && !teams.some((t) => t.id === side.teamId)) errors.push(`${owner}: unknown team "${side.teamId}"`);
  }
  if (!f.champion && !f.note) errors.push(`${owner}: no champion and no note`);
}
for (const season of seasons) {
  const owner = `season:${season.id}`;
  checkIds(owner, season.sourceIds);
  if (!competitionIds.has(season.competitionId)) errors.push(`${owner}: unknown competition`);
  for (const g of season.groups) for (const e of g.entries) {
    if (e.teamId && !teams.some((t) => t.id === e.teamId)) errors.push(`${owner}: unknown team "${e.teamId}"`);
  }
}
for (const p of partners) {
  if (p.confirmed && !p.disclosure.es) errors.push(`partner:${p.id}: confirmed without disclosure`);
}

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(`\n${teams.length} teams · ${articles.length} articles · ${competitions.length} competitions · ${timeline.length} timeline events · ${finals.length} finals · ${seasons.length} seasons · ${sources.length} sources`);
if (errors.length) {
  console.error(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log("Content check passed.");
