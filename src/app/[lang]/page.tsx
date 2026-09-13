import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRepository } from "@/lib/repositories";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { TeamCard } from "@/components/teams/TeamCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
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
  const [teams, competitions, articles, timeline] = await Promise.all([
    repo.getTeams(),
    repo.getCompetitions(),
    repo.getArticles(),
    repo.getTimeline(),
  ]);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 3);
  const rank: Record<string, number> = { verified: 0, partial: 1, unverified: 2 };
  const showcaseTeams = teams
    .filter((team) => team.status === "active")
    .sort((a, b) => rank[a.verificationStatus] - rank[b.verificationStatus] || a.name.localeCompare(b.name, "es"))
    .slice(0, 6);
  // One verified milestone per decade keeps the home timeline short but wide.
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

  return (
    <>
      {/* HERO */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-50" />
        <div className="container-content relative py-20 md:py-32">
          <p className="kicker mb-5 animate-rise">{dict.home.kicker}</p>
          <h1 className="display display-lg max-w-5xl animate-rise [animation-delay:60ms]">{dict.home.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg text-paper-2 animate-rise [animation-delay:120ms] md:text-xl">
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
              {dict.nav.guide} →
            </ButtonLink>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            <Stat label={dict.nav.teams} value={String(teams.length)} hint={`${activeCount} ${dict.status.active.toLowerCase()}`} />
            <Stat label={dict.teams.community} value={String(communities)} />
            <Stat label={dict.nav.stories} value={String(articles.length)} />
            <Stat label="1987 → 2026" value={locale === "es" ? "4 décadas" : "4 decades"} />
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featured && (
        <section className="container-content py-16 md:py-24">
          <p className="kicker mb-6">{dict.home.featured}</p>
          <ArticleCard article={featured} locale={locale} dict={dict} variant="featured" headingLevel="h2" />
        </section>
      )}

      {/* TEAMS */}
      <section className="border-y border-line bg-ink-2">
        <div className="container-content py-16 md:py-24">
          <SectionHeader
            kicker={dict.nav.teams}
            title={dict.home.exploreTeams}
            sub={dict.home.exploreTeamsSub}
            cta={{ href: href(locale, "teams"), label: dict.home.allTeams }}
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseTeams.map((team) => (
              <li key={team.id}>
                <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MAP */}
      <section className="container-content py-16 md:py-24">
        <SectionHeader
          kicker={dict.nav.map}
          title={dict.home.mapTitle}
          sub={dict.home.mapSub}
          cta={{ href: href(locale, "map"), label: dict.home.openMap }}
        />
        <div className="relative">
          <TeamMapLoader
            lazy
            pins={pins}
            interactive={false}
            height="26rem"
            labels={{ viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status }}
          />
          <ButtonLink href={href(locale, "map")} className="absolute bottom-4 right-4 z-[400]">
            {dict.home.openMap}
          </ButtonLink>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-line bg-ink-2">
        <div className="container-content py-16 md:py-24">
          <SectionHeader
            kicker={dict.nav.history}
            title={dict.home.timelineTitle}
            sub={dict.home.timelineSub}
            cta={{ href: href(locale, "history"), label: dict.home.fullHistory }}
          />
          <Timeline events={verifiedEvents} teams={teams} sources={timelineSources} locale={locale} dict={dict} compact />
        </div>
      </section>

      {/* LATEST */}
      <section className="container-content py-16 md:py-24">
        <SectionHeader
          kicker={dict.nav.stories}
          title={dict.home.latest}
          cta={{ href: href(locale, "articles"), label: dict.home.allStories }}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      {/* ROAD TO ANNAPOLIS */}
      <section className="relative overflow-hidden border-y border-line bg-ink-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-40" />
        <div className="container-content relative grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
          <div>
            <p className="kicker mb-4">{dict.home.roadKicker}</p>
            <h2 className="display display-md">
              From <span className="text-gold">Barcelona</span> to Annapolis
            </h2>
            <p className="mt-5 max-w-xl text-lg text-paper-2">{dict.home.roadSub}</p>
            <ButtonLink href={href(locale, "roadToAnnapolis")} className="mt-8">
              {dict.home.roadCta}
            </ButtonLink>
          </div>
          <div className="card p-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <p className="font-display text-4xl font-black tracking-normal text-paper">{origin.name}</p>
            <p className="text-muted-2">{formatCoordinate(origin.latitude, "lat")}</p>
            <p className="my-4 text-gold">↓ {new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB").format(km)}+ km</p>
            <p className="font-display text-4xl font-black tracking-normal text-paper">{destination.name}</p>
            <p className="text-muted-2">{formatCoordinate(destination.latitude, "lat")}</p>
          </div>
        </div>
      </section>

      {/* FOOTBALL NEAR YOU + NEWSLETTER */}
      <section className="container-content grid gap-6 py-16 md:grid-cols-2 md:py-24">
        <div className="card p-8">
          <p className="kicker mb-3">{dict.nav.map}</p>
          <h2 className="display display-sm">{dict.home.nearYouTitle}</h2>
          <p className="mt-3 text-muted">{dict.home.nearYouSub}</p>
          <ButtonLink href={href(locale, "nearYou")} variant="secondary" className="mt-6">
            {dict.home.nearYouCta}
          </ButtonLink>
        </div>
        <div className="card p-8">
          <p className="kicker mb-3">{dict.home.newsletterTitle}</p>
          <h2 className="display display-sm">{dict.home.newsletterTitle}</h2>
          <p className="mt-3 text-muted">{dict.home.newsletterSub}</p>
          <form className="mt-6 flex gap-2">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              disabled
              placeholder={dict.home.newsletterPlaceholder}
              className="w-full rounded-sm border border-line-strong bg-surface px-3 py-2 text-sm text-paper placeholder:text-muted-2 disabled:opacity-60"
            />
            <button
              type="button"
              disabled
              className="rounded-sm border border-line-strong px-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-muted"
            >
              {dict.home.newsletterButton}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
