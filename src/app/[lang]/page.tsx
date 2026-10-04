import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRepository } from "@/lib/repositories";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { StatsBar, HeroStat } from "@/components/ui/StatsBar";
import { TeamCard } from "@/components/teams/TeamCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { LiveStrip } from "@/components/home/LiveStrip";
import { EventCountdown } from "@/components/home/EventCountdown";
import { Timeline } from "@/components/history/Timeline";
import { TeamMapLoader } from "@/components/map/TeamMapLoader";
import { toMapPins } from "@/components/map/map-data";
import { roadStops } from "@/data/road";
import { distanceKm, formatCoordinate } from "@/lib/geo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: dict.site.description,
    routeKey: "home",
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [teams, competitions, articles, timeline, agendaWeeks, rankings, nationalTeams] = await Promise.all([
    repo.getTeams(),
    repo.getCompetitions(),
    repo.getArticles(),
    repo.getTimeline(),
    repo.getAgendaWeeks(),
    repo.getRankings(),
    repo.getNationalTeams(),
  ]);

  const madridGuide = articles.find((a) => a.id === "nfl-madrid-2026-guia");
  const featured = articles[0];
  const latest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 3);
  const rank: Record<string, number> = { verified: 0, partial: 1, unverified: 2 };
  const showcaseTeams = teams
    .filter((team) => team.status === "active")
    .sort((a, b) => rank[a.verificationStatus] - rank[b.verificationStatus] || a.name.localeCompare(b.name, "es"))
    .slice(0, 6);
  const verifiedEvents = Array.from(
    timeline
      .filter((e) => e.verificationStatus === "verified")
      .reduce((acc, e) => {
        const decade = Math.floor(e.year / 10) * 10;
        if (!acc.has(decade)) acc.set(decade, e);
        return acc;
      }, new Map<number, (typeof timeline)[number]>())
      .values(),
  ).slice(0, 6);
  const pins = toMapPins(teams, competitions, locale);
  const origin = roadStops[0];
  const destination = roadStops[roadStops.length - 1];
  const km = Math.round(distanceKm(origin, destination) / 10) * 10;
  const activeCount = teams.filter((team) => team.status === "active").length;
  const communities = new Set(teams.map((team) => team.autonomousCommunity)).size;
  const timelineSources = await repo.getSourcesByIds(verifiedEvents.flatMap((e) => e.sourceIds));

  const stats = [
    { value: String(teams.length), label: locale === "es" ? "equipos" : "teams", hint: `${activeCount} ${dict.teams.activeCount}` },
    { value: String(communities), label: dict.teams.communitiesCount },
    { value: String(articles.length), label: dict.nav.stories },
    { value: locale === "es" ? "4 décadas" : "4 decades", label: "1987 → 2026" },
  ];

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-20" />

        <div className="container-content relative py-20 md:py-28 lg:py-36">
          {/* Broadcast-style kicker */}
          <div className="mb-8 inline-flex items-center animate-rise">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.home.kicker}
            </span>
            <div className="h-7 w-12 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-xl max-w-5xl animate-rise [animation-delay:60ms]">
            {dict.home.heroTitle}
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper-2 animate-rise [animation-delay:120ms] md:text-xl">
            {dict.home.heroSub}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 animate-rise [animation-delay:180ms]">
            <ButtonLink href={href(locale, "teams")} size="lg">
              {dict.home.ctaTeams}
            </ButtonLink>
            <ButtonLink href={href(locale, "history")} variant="secondary" size="lg">
              {dict.home.ctaHistory}
            </ButtonLink>
            <ButtonLink href={href(locale, "guide")} variant="ghost" size="lg">
              {dict.nav.guide}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </ButtonLink>
          </div>
        </div>

        {/* Stats bar - scoreboard style */}
        <div className="animate-rise [animation-delay:240ms]">
          <StatsBar stats={stats} />
        </div>
      </section>

      {madridGuide?.event && (
        <EventCountdown
          startsAt={madridGuide.event.startDate}
          href={href(locale, "articles", madridGuide.slug)}
          title={locale === "es" ? "NFL Madrid · Falcons–Bengals" : "NFL Madrid · Falcons–Bengals"}
          subtitle={locale === "es" ? "8 de noviembre, 15:30 · Estadio Santiago Bernabéu" : "8 November, 3:30 pm · Estadio Santiago Bernabéu"}
          labels={locale === "es" ? { days: "días", day: "día", today: "HOY", cta: "La guía" } : { days: "days", day: "day", today: "TODAY", cta: "The guide" }}
          extra={{ href: href(locale, "quiz"), label: locale === "es" ? "¿Qué equipo seguir? Haz el test" : "Which team? Take the quiz" }}
        />
      )}
      <LiveStrip
        week={agendaWeeks[0]}
        ranking={rankings.find((r) => r.scope === "ncaa")}
        nationalTeams={nationalTeams}
        now={new Date().toISOString()}
        locale={locale}
        dict={dict}
      />

      {/* ============================================================
          FEATURED STORY
          ============================================================ */}
      {featured && (
        <Section variant="default" className="border-b border-line">
          <header className="mb-8">
            <div className="inline-flex items-center">
              <span className="flex h-8 items-center bg-accent px-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white">
                {dict.home.featured}
              </span>
              <div className="h-8 w-2 bg-accent/60" />
              <div className="h-8 w-1 bg-accent/30" />
            </div>
          </header>
          <ArticleCard article={featured} locale={locale} dict={dict} variant="featured" headingLevel="h2" />
        </Section>
      )}

      {/* ============================================================
          TEAMS
          ============================================================ */}
      <Section
        variant="alt"
        kicker={dict.nav.teams}
        title={dict.home.exploreTeams}
        subtitle={dict.home.exploreTeamsSub}
        cta={{ href: href(locale, "teams"), label: dict.home.allTeams }}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseTeams.map((team) => (
            <li key={team.id}>
              <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ============================================================
          MAP
          ============================================================ */}
      <Section
        variant="default"
        kicker={dict.nav.map}
        title={dict.home.mapTitle}
        subtitle={dict.home.mapSub}
        cta={{ href: href(locale, "map"), label: dict.home.openMap }}
        className="border-b border-line"
      >
        <div className="relative overflow-hidden border border-line bg-ink-2">
          {/* Map accent bar */}
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
          <TeamMapLoader
            lazy
            pins={pins}
            interactive={false}
            height="clamp(18rem, 40vw, 26rem)"
            labels={{ viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status, loading: dict.map.loading, mapError: dict.map.mapError }}
          />
          <ButtonLink href={href(locale, "map")} className="absolute bottom-4 right-4 z-[400]">
            {dict.home.openMap}
          </ButtonLink>
        </div>
      </Section>

      {/* ============================================================
          TIMELINE
          ============================================================ */}
      <Section
        variant="alt"
        kicker={dict.nav.history}
        title={dict.home.timelineTitle}
        subtitle={dict.home.timelineSub}
        cta={{ href: href(locale, "history"), label: dict.home.fullHistory }}
      >
        <Timeline events={verifiedEvents} teams={teams} sources={timelineSources} locale={locale} dict={dict} compact />
      </Section>

      {/* ============================================================
          LATEST STORIES
          ============================================================ */}
      <Section
        variant="default"
        kicker={dict.nav.stories}
        title={dict.home.latest}
        cta={{ href: href(locale, "articles"), label: dict.home.allStories }}
        className="border-b border-line"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ============================================================
          ROAD TO ANNAPOLIS
          ============================================================ */}
      <section className="relative overflow-hidden bg-ink-2">
        {/* Accent bar */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent/40 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-14 md:py-20 lg:py-24">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center lg:gap-16">
            {/* Content */}
            <div>
              <div className="mb-6 inline-flex items-center">
                <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
                  {dict.home.roadKicker}
                </span>
                <div className="h-7 w-8 bg-gradient-to-r from-accent/60 to-transparent" />
              </div>

              <h2 className="display display-md">
                From <span className="text-accent">Barcelona</span> to Annapolis
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper-2">{dict.home.roadSub}</p>
              <ButtonLink href={href(locale, "roadToAnnapolis")} className="mt-8">
                {dict.home.roadCta}
              </ButtonLink>
            </div>

            {/* Route card - scoreboard style */}
            <div className="relative bg-surface p-6">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-accent" />

              <div className="space-y-6">
                {/* Origin */}
                <div>
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">Origin</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase leading-none text-paper md:text-3xl">{origin.name}</p>
                  <p className="mt-1 font-mono text-[0.625rem] text-muted-2">{formatCoordinate(origin.latitude, "lat")}</p>
                </div>

                {/* Distance indicator */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-line" />
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="font-display text-sm font-bold uppercase text-accent">
                      {new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB").format(km)}+ km
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-line" />
                </div>

                {/* Destination */}
                <div>
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-turf">Destination</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase leading-none text-paper md:text-3xl">{destination.name}</p>
                  <p className="mt-1 font-mono text-[0.625rem] text-muted-2">{formatCoordinate(destination.latitude, "lat")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA CARDS
          ============================================================ */}
      <section className="border-b border-line">
        <div className="container-content grid gap-px bg-line md:grid-cols-2">
          {/* Near You */}
          <Link
            href={href(locale, "nearYou")}
            className="group relative flex flex-col bg-ink p-8 transition-colors hover:bg-surface md:p-10"
          >
            <div className="mb-4 inline-flex items-center">
              <span className="flex h-6 items-center bg-accent px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-white">
                {dict.nav.map}
              </span>
              <div className="h-6 w-6 bg-gradient-to-r from-accent/60 to-transparent" />
            </div>
            <h2 className="display display-sm">{dict.home.nearYouTitle}</h2>
            <p className="mt-3 text-muted">{dict.home.nearYouSub}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.04em] text-accent transition-colors group-hover:text-accent-bright">
              {dict.home.nearYouCta}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          {/* Newsletter */}
          <div className="relative flex flex-col bg-ink p-8 md:p-10">
            <div className="mb-4 inline-flex items-center">
              <span className="flex h-6 items-center bg-surface-2 px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-muted">
                {dict.home.newsletterTitle}
              </span>
            </div>
            <h2 className="display display-sm">{dict.home.newsletterTitle}</h2>
            <p className="mt-3 text-muted">{dict.home.newsletterSub}</p>
            <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent">
              {dict.home.newsletterButton}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
