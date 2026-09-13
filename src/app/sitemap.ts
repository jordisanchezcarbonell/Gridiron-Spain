import type { MetadataRoute } from "next";
import { locales, localeTags } from "@/lib/i18n/config";
import { href, type RouteKey } from "@/lib/i18n/routes";
import { absoluteUrl, site } from "@/lib/site";
import { getRepository } from "@/lib/repositories";
import type { Locale } from "@/types/common";
import { regionSlug } from "@/lib/regions";

function entry(
  routeKey: RouteKey,
  segments: string[],
  available: Locale[],
  lastModified: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  return available.map((locale) => ({
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
  const [teams, articles, competitions] = await Promise.all([
    repo.getTeams(),
    repo.getArticles(),
    repo.getCompetitions(),
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
