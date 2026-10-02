import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRepository } from "@/lib/repositories";
import { buildPlayerProfiles } from "@/lib/players";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SearchBox, type SearchItem } from "@/components/search/SearchBox";
import { normalize } from "@/lib/search";

export async function generateMetadata({ params }: PageProps<"/[lang]/buscar">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return { ...buildMetadata({ locale, title: dict.search.title, description: dict.search.hint, routeKey: "search" }), robots: { index: false, follow: true } };
}

export default async function SearchPage({ params }: PageProps<"/[lang]/buscar">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [teams, articles, competitions, spotlights, nationalTeams] = await Promise.all([
    repo.getTeams(),
    repo.getArticles(),
    repo.getCompetitions(),
    repo.getPlayerSpotlights(),
    repo.getNationalTeams(),
  ]);

  const item = (h: string, title: string, kind: string, detail: string | undefined, extra: string[] = []): SearchItem => ({
    href: h,
    title,
    kind,
    detail,
    haystack: normalize([title, detail ?? "", ...extra].join(" ")),
  });

  const items: SearchItem[] = [
    ...teams.map((x) => item(href(locale, "teams", x.slug), x.name, dict.search.kinds.team, `${x.city} · ${x.autonomousCommunity}`, [x.shortName ?? "", x.nickname ?? "", x.province ?? ""])),
    ...buildPlayerProfiles(spotlights)
      .filter((p) => p.hasPage)
      .map((p) => item(href(locale, "players", p.slug), p.name, dict.search.kinds.player, `${p.spotlights[0].position} · ${p.spotlights[0].team}`, [p.spotlights[0].league])),
    ...nationalTeams.map((n) => item(href(locale, "nationalTeam", n.id), `${dict.nav.nationalTeam} · ${t(n.name, locale)}`, dict.search.kinds.nationalTeam, n.coach, [locale === "es" ? "españa seleccion" : "spain national team"])),
    ...competitions.map((c) => item(href(locale, "competitions", c.slug), c.name, dict.search.kinds.competition, c.shortName, [c.organizer])),
    ...articles
      .filter((a) => a.availableLocales.includes(locale))
      .map((a) => item(href(locale, "articles", a.slug), t(a.title, locale), dict.search.kinds.article, t(a.excerpt, locale), a.tags)),
  ];

  return (
    <div className="container-content py-12 md:py-16">
      <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.search.title }]} />
      <h1 className="display display-lg mb-8 mt-6">{dict.search.title}</h1>
      <SearchBox items={items} labels={{ placeholder: dict.search.placeholder, empty: dict.search.empty, hint: dict.search.hint, results: dict.search.results }} />
    </div>
  );
}
