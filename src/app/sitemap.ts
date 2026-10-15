import type { MetadataRoute } from "next";
import { locales, localeTags } from "@/lib/i18n/config";
import { href, type RouteKey } from "@/lib/i18n/routes";
import { absoluteUrl, site } from "@/lib/site";
import { getRepository } from "@/lib/repositories";
import type { Locale } from "@/types/common";
import { regionSlug } from "@/lib/regions";

/**
 * Locales actually submitted for indexing. The other locales stay live and keep
 * their hreflang annotations below, they are just not requested for crawling:
 * with a small crawl budget, submitting an English duplicate of every Spanish
 * page is what leaves the Spanish tree "discovered, currently not indexed".
 * Restore to `[...locales]` once the Spanish tree is indexed.
 */
const submittedLocales: Locale[] = ["es"];

function entry(
  routeKey: RouteKey,
  segments: string[],
  available: Locale[],
  lastModified: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  // Content that exists in no submitted locale is still submitted, so that a
  // page only published in English never disappears from the sitemap.
  const submitted = available.filter((locale) => submittedLocales.includes(locale));
  return (submitted.length > 0 ? submitted : available).map((locale) => ({
    url: absoluteUrl(href(locale, routeKey, ...segments)),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        available.map((l) => [localeTags[l], absoluteUrl(href(l, routeKey, ...segments))]),
      ),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repo = getRepository();
  const [teams, articles, competitions, seasons, nationalTeams] = await Promise.all([
    repo.getTeams(),
    repo.getArticles(),
    repo.getCompetitions(),
    repo.getSeasons(),
    repo.getNationalTeams(),
  ]);
  const all = [...locales];
  const reviewed = site.contentReviewedAt;

  return [
    ...entry("home", [], all, reviewed, 1, "weekly"),
    ...entry("history", [], all, reviewed, 0.9, "monthly"),
    ...entry("teams", [], all, reviewed, 0.9, "weekly"),
    ...entry("map", [], all, reviewed, 0.8, "monthly"),
    ...entry("articles", [], all, reviewed, 0.8, "weekly"),
    ...entry("competitions", [], all, reviewed, 0.7, "monthly"),
    ...entry("roadToAnnapolis", [], all, reviewed, 0.9, "weekly"),
    ...entry("nearYou", [], all, reviewed, 0.8, "monthly"),
    ...entry("guide", [], all, reviewed, 0.8, "monthly"),
    ...entry("rankings", [], all, reviewed, 0.8, "weekly"),
    ...entry("agenda", [], all, reviewed, 0.8, "weekly"),
    // Individual player profiles are intentionally left out: they are short
    // enough that submitting them competes for crawl budget with the team and
    // competition pages. They stay linked from the players index.
    ...entry("players", [], all, reviewed, 0.7, "weekly"),
    ...entry("nationalTeam", [], all, reviewed, 0.8, "weekly"),
    ...entry("quiz", [], all, reviewed, 0.7, "monthly"),
    ...entry("palmares", [], all, reviewed, 0.8, "monthly"),
    ...nationalTeams.flatMap((n) => entry("nationalTeam", [n.id], all, n.lastVerifiedAt, 0.7, "weekly")),
    ...seasons.flatMap((season) => {
      const competition = competitions.find((c) => c.id === season.competitionId);
      return competition ? entry("competitions", [competition.slug, season.slug], all, season.lastVerifiedAt ?? reviewed, 0.7, "weekly") : [];
    }),
    ...entry("about", [], all, reviewed, 0.5, "yearly"),
    ...Array.from(new Set(teams.map((team) => team.autonomousCommunity))).flatMap((c) =>
      entry("teams", [regionSlug(c)], all, reviewed, 0.8, "monthly"),
    ),
    ...entry("mediaKit", [], all, reviewed, 0.4, "yearly"),
    ...teams.flatMap((team) =>
      entry("teams", [team.slug], all, team.lastVerifiedAt ?? reviewed, 0.8, "monthly"),
    ),
    ...competitions.flatMap((c) =>
      entry("competitions", [c.slug], all, c.lastVerifiedAt ?? reviewed, 0.6, "monthly"),
    ),
    ...articles.flatMap((article) =>
      entry("articles", [article.slug], article.availableLocales, article.updatedAt, 0.8, "monthly"),
    ),
  ];
}
