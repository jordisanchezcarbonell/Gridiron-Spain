import type { Article, PlayerSpotlight, Team } from "@/types";
import { buildPlayerProfiles, type PlayerProfile } from "@/lib/players";

/** All visible text of an article in both languages, for mention detection. */
function articleText(article: Article) {
  const parts: string[] = [article.title.es, article.title.en ?? "", article.excerpt.es, article.excerpt.en ?? ""];
  for (const b of article.content) {
    if ("text" in b && b.text) parts.push(b.text.es, b.text.en ?? "");
    if (b.type === "list") for (const i of b.items) parts.push(i.es, i.en ?? "");
  }
  return parts.join(" \n ");
}

function mentions(text: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}])${escaped}($|[^\\p{L}])`, "u").test(text);
}

/**
 * Teams and profiled players an article names in full, so stories link to
 * their profiles without hand-maintained lists. Short names are ignored on
 * purpose: "Reds" or "Lions" would produce false matches.
 */
export function findMentions(article: Article, teams: Team[], spotlights: PlayerSpotlight[]): { teams: Team[]; players: PlayerProfile[] } {
  const text = articleText(article);
  const mentionedTeams = teams.filter((team) => team.status !== "historical" && (article.relatedTeamIds.includes(team.id) || mentions(text, team.name)));
  const players = buildPlayerProfiles(spotlights).filter((p) => p.hasPage && mentions(text, p.name));
  return { teams: mentionedTeams, players };
}
