import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TeamFilters } from "@/components/teams/TeamFilters";
import { RegionChips } from "@/components/teams/RegionChips";

export async function generateMetadata({ params }: PageProps<"/[lang]/equipos">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const title =
    locale === "es" ? "Equipos de fútbol americano en España" : "American football teams in Spain";
  return buildMetadata({ locale, title, description: dict.teams.intro, routeKey: "teams" });
}

export default async function TeamsPage({ params }: PageProps<"/[lang]/equipos">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [teams, competitions] = await Promise.all([repo.getTeams(), repo.getCompetitions()]);
  const activeCount = teams.filter((t) => t.status === "active").length;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.teams, url: href(locale, "teams") },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.teams }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.teams}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.teams.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.teams.intro}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{dict.teams.directoryNote}</p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{teams.length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                {locale === "es" ? "equipos documentados" : "documented teams"}
              </span>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-turf" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{activeCount}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                {dict.teams.activeCount}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      {/* Filters */}
      <section className="border-b border-line bg-ink-2">
        <div className="container-content flex flex-col gap-6 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <RegionChips teams={teams} locale={locale} title={dict.region.allRegions} />
            <Link
              href={href(locale, "nearYou")}
              className="group inline-flex shrink-0 items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.04em] text-accent transition-colors hover:text-accent-bright"
            >
              {dict.near.cta}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Team list */}
      <section className="container-content py-10 md:py-14">
        <TeamFilters teams={teams} competitions={competitions} locale={locale} dict={dict} />
      </section>
    </>
  );
}
