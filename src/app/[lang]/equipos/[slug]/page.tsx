import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, teamJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { buildPlayerProfiles } from "@/lib/players";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Placeholder } from "@/components/ui/Placeholder";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamMetadata } from "@/components/teams/TeamMetadata";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { RichText } from "@/components/articles/ArticleBody";
import { SourceList } from "@/components/articles/SourceList";
import { TeamMapLoader } from "@/components/map/TeamMapLoader";
import { toMapPins } from "@/components/map/map-data";
import { RegionPage } from "@/components/teams/RegionPage";
import { regionFromSlug, regionName, regionSlug } from "@/lib/regions";

export async function generateStaticParams() {
  const teams = await getRepository().getTeams();
  const regions = Array.from(new Set(teams.map((team) => team.autonomousCommunity))).map((c) => ({ slug: regionSlug(c) }));
  return [...teams.map((team) => ({ slug: team.slug })), ...regions];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/equipos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const region = regionFromSlug(slug);
  if (region) {
    const name = regionName(region, locale);
    const dict = getDictionary(locale);
    return buildMetadata({
      locale,
      title: locale === "es" ? `Fútbol americano en ${name}: equipos y clubes` : `American football in ${name}: teams and clubs`,
      description: `${dict.region.intro} ${name}.`,
      routeKey: "teams",
      segments: [slug],
    });
  }
  const team = await getRepository().getTeamBySlug(slug);
  if (!team) return {};
  const title =
    locale === "es"
      ? `${team.name} — fútbol americano en ${team.city}`
      : `${team.name} — American football in ${team.city}`;
  return buildMetadata({
    locale,
    title,
    description: t(team.summary, locale),
    routeKey: "teams",
    segments: [slug],
    image: `${href(locale, "teams", slug)}/opengraph-image`,
  });
}

export default async function TeamPage({ params }: PageProps<"/[lang]/equipos/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const region = regionFromSlug(slug);
  if (region) {
    const [allTeams, allCompetitions] = await Promise.all([repo.getTeams(), repo.getCompetitions()]);
    return <RegionPage community={region} allTeams={allTeams} competitions={allCompetitions} locale={locale} dict={dict} />;
  }
  const team = await repo.getTeamBySlug(slug);
  if (!team) notFound();

  const [competitions, articles, sources, spotlights] = await Promise.all([
    repo.getCompetitions(),
    repo.getArticlesByTeam(team.id),
    repo.getSourcesByIds(team.sourceIds),
    repo.getPlayerSpotlights(),
  ]);
  const players = buildPlayerProfiles(spotlights.filter((s) => s.teamId === team.id)).filter((p) => p.hasPage);
  const pins = toMapPins([team], competitions, locale);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.teams, href: href(locale, "teams") },
    { name: team.name },
  ];

  return (
    <>
      <JsonLd data={[teamJsonLd(team, locale), breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "teams", team.slug) })))]} />

      <div className="container-content pt-6 md:pt-8">
        <Breadcrumbs items={crumbs} />
      </div>

      <TeamHero team={team} locale={locale} dict={dict} />

      <div className="container-content grid gap-10 py-10 lg:grid-cols-[1fr_20rem] lg:gap-12 lg:py-14">
        <article className="min-w-0">
          {/* History section */}
          <section aria-labelledby="history-title">
            <header className="mb-6">
              <div className="inline-flex items-center">
                <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
                  {dict.teams.history}
                </span>
                <div className="h-7 w-2 bg-accent/60" />
                <div className="h-7 w-1 bg-accent/30" />
              </div>
            </header>
            {team.history && team.history.length > 0 ? (
              <div className="prose-editorial">
                {team.history.map((paragraph, i) => (
                  <p key={i}>
                    <RichText text={t(paragraph, locale)} sources={sources} />
                  </p>
                ))}
              </div>
            ) : (
              <Placeholder
                title={dict.articles.researching}
                text={dict.teams.pendingHistory}
                pendingLabel={team.researchNotes ? dict.teams.researchNotes : undefined}
                pending={team.researchNotes ? [t(team.researchNotes, locale)] : undefined}
              />
            )}
          </section>

          {/* Honours section */}
          <section aria-labelledby="honours-title" className="mt-12">
            <header className="mb-6">
              <div className="inline-flex items-center">
                <span className="flex h-7 items-center bg-gold px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ink">
                  {dict.teams.honours}
                </span>
                <div className="h-7 w-2 bg-gold/60" />
                <div className="h-7 w-1 bg-gold/30" />
              </div>
            </header>
            {team.honours.length > 0 ? (
              <ul className="divide-y divide-line border border-line bg-surface">
                {team.honours.map((honour, i) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <span className="flex items-center gap-4">
                      <span className="font-display text-2xl font-black text-accent">{honour.year}</span>
                      <span className="text-paper">{t(honour.title, locale)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">{dict.teams.pendingHonours}</p>
            )}
          </section>

          {/* Players with a profile */}
          {players.length > 0 && (
            <section aria-labelledby="players-title" className="mt-12">
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span id="players-title" className="flex h-7 items-center bg-surface-2 px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-paper">
                    {dict.nav.players}
                  </span>
                </div>
              </header>
              <ul className="grid gap-3 sm:grid-cols-2">
                {players.map((p) => (
                  <li key={p.slug}>
                    <Link href={href(locale, "players", p.slug)} className="flex items-center justify-between gap-3 border border-line bg-surface px-4 py-3 transition-colors hover:border-accent">
                      <span className="font-display text-lg font-bold text-paper">{p.name}</span>
                      <span className="font-mono text-xs text-muted">{p.spotlights[0].position}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related stories */}
          {articles.length > 0 && (
            <section aria-labelledby="related-title" className="mt-12">
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span className="flex h-7 items-center bg-surface-2 px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-paper">
                    {dict.teams.relatedStories}
                  </span>
                </div>
              </header>
              <ul className="grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <SourceList
            sources={sources}
            locale={locale}
            title={dict.teams.sources}
            intro={dict.articles.sourcesIntro}
            accessedLabel={dict.articles.accessed}
            lastVerified={team.lastVerifiedAt}
            lastVerifiedLabel={dict.verification.lastVerified}
          />
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TeamMetadata team={team} competitions={competitions} locale={locale} dict={dict} />

          {pins.length > 0 && (
            <div className="relative overflow-hidden border border-line">
              <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
              <TeamMapLoader
                lazy
                pins={pins}
                height="14rem"
                interactive={false}
                labels={{ viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status, loading: dict.map.loading, mapError: dict.map.mapError }}
              />
              <Link
                href={href(locale, "map")}
                className="absolute bottom-3 right-3 z-20 flex h-8 items-center gap-1.5 bg-accent px-3 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-accent-bright"
              >
                {dict.teams.onMap}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          <Link
            href={href(locale, "teams")}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
          >
            <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M15 19l-7-7 7-7" />
            </svg>
            {dict.teams.backToTeams}
          </Link>
        </aside>
      </div>
    </>
  );
}
