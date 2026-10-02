import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { TeamCard } from "@/components/teams/TeamCard";
import { SourceList } from "@/components/articles/SourceList";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { NfeloPowerRanking } from "@/components/competitions/NfeloPowerRanking";
import { getExternalPowerRanking } from "@/data/power-rankings";

export async function generateStaticParams() {
  const competitions = await getRepository().getCompetitions();
  return competitions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/competiciones/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const competition = await getRepository().getCompetitionBySlug(slug);
  if (!competition) return {};
  return buildMetadata({
    locale,
    title:
      locale === "es"
        ? `${competition.name}: equipos, temporadas y resultados de fútbol americano`
        : `${competition.name}: American football teams, seasons and results`,
    description: t(competition.description, locale),
    routeKey: "competitions",
    segments: [slug],
  });
}

export default async function CompetitionPage({ params }: PageProps<"/[lang]/competiciones/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const competition = await repo.getCompetitionBySlug(slug);
  if (!competition) notFound();

  const [teams, competitions, sources, articles, seasons] = await Promise.all([
    repo.getTeams(),
    repo.getCompetitions(),
    repo.getSourcesByIds(competition.sourceIds),
    repo.getArticles(),
    repo.getSeasonsByCompetition(competition.id),
  ]);
  const participants = teams.filter((team) => team.currentCompetitions.some((c) => c.competitionId === competition.id));
  const related = articles.filter((a) => a.relatedCompetitionIds.includes(competition.id));
  const powerRanking = getExternalPowerRanking(competition.id);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.competitions, href: href(locale, "competitions") },
    { name: competition.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "competitions", competition.slug) })))} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16">
          <Breadcrumbs items={crumbs} />

          {/* Badges */}
          <div className="mb-4 mt-6 flex flex-wrap gap-2">
            <Badge tone="gold">{dict.levels[competition.level]}</Badge>
            <Badge>{dict.discipline[competition.discipline]}</Badge>
            <Badge tone={competition.status === "active" ? "turf" : "outline"}>
              {competition.status === "active" ? dict.status.active : dict.status.historical}
            </Badge>
          </div>

          <h1 className="display display-lg">{competition.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper-2">{t(competition.description, locale)}</p>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content grid gap-12 py-12 md:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {powerRanking && <NfeloPowerRanking locale={locale} url={powerRanking.url} />}
          {seasons.length > 0 && (
            <section className="mb-14">
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
                    {dict.season.seasons}
                  </span>
                  <div className="h-7 w-2 bg-accent/60" />
                  <div className="h-7 w-1 bg-accent/30" />
                </div>
              </header>
              <ul className="grid gap-4 sm:grid-cols-2">
                {seasons.map((season) => (
                  <li key={season.id}>
                    <Link href={href(locale, "competitions", competition.slug, season.slug)} className="group flex h-full flex-col gap-3 border border-line bg-surface p-5 transition-colors hover:border-accent">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-3xl font-black text-accent">{season.slug}</span>
                        <Badge tone={season.status === "completed" ? "outline" : "turf"}>
                          {{ upcoming: dict.season.upcoming, "in-progress": dict.season.inProgress, completed: dict.season.completed }[season.status]}
                        </Badge>
                      </div>
                      <p className="line-clamp-3 text-sm text-muted">{t(season.summary, locale)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {participants.length > 0 && (
            <section>
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span className="flex h-7 items-center bg-turf px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ink">
                    {dict.competitions.teamsIn}
                  </span>
                  <div className="h-7 w-2 bg-turf/60" />
                  <div className="h-7 w-1 bg-turf/30" />
                </div>
              </header>
              <ul className="grid gap-5 sm:grid-cols-2">
                {participants.map((team) => (
                  <li key={team.id}>
                    <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {related.length > 0 && (
            <section className="mt-14">
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span className="flex h-7 items-center bg-surface-2 px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-paper">
                    {dict.articles.related}
                  </span>
                </div>
              </header>
              <ul className="grid gap-5 sm:grid-cols-2">
                {related.map((a) => (
                  <li key={a.id}>
                    <ArticleCard article={a} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <SourceList
            sources={sources}
            locale={locale}
            title={dict.common.sources}
            accessedLabel={dict.articles.accessed}
            lastVerified={competition.lastVerifiedAt}
            lastVerifiedLabel={dict.verification.lastVerified}
          />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative border border-line bg-surface">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
            <dl className="divide-y divide-line">
              <Row label={dict.competitions.organizer} value={competition.organizer} />
              <Row label={dict.competitions.level} value={dict.levels[competition.level]} />
              <Row
                label={dict.competitions.founded}
                value={competition.foundedYear ? `${competition.foundedYear}${competition.endedYear ? `–${competition.endedYear}` : ""}` : dict.verification.unverified}
              />
              {competition.website && (
                <Row
                  label={dict.competitions.website}
                  value={
                    <a href={competition.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-bright">
                      {competition.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  }
                />
              )}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-5 py-4">
      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{label}</dt>
      <dd className="text-sm text-paper">{value}</dd>
    </div>
  );
}
