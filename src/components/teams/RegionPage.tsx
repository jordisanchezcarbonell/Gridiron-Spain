import Link from "next/link";
import type { Locale } from "@/types/common";
import type { AutonomousCommunity, Competition, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { regionName, regionSlug } from "@/lib/regions";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Stat } from "@/components/ui/Stat";
import { TeamCard } from "@/components/teams/TeamCard";
import { RegionChips } from "@/components/teams/RegionChips";
import { TeamMapLoader } from "@/components/map/TeamMapLoader";
import { toMapPins } from "@/components/map/map-data";

export function RegionPage({
  community,
  allTeams,
  competitions,
  locale,
  dict,
}: {
  community: AutonomousCommunity;
  allTeams: Team[];
  competitions: Competition[];
  locale: Locale;
  dict: Dictionary;
}) {
  const name = regionName(community, locale);
  const teams = allTeams.filter((t) => t.autonomousCommunity === community);
  const active = teams.filter((t) => t.status === "active");
  const historical = teams.filter((t) => t.status !== "active");
  const topTier = active.filter((t) => t.currentCompetitions.some((c) => c.competitionId === "lnfa")).length;
  const pins = toMapPins(teams, competitions, locale);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.teams, href: href(locale, "teams") },
    { name },
  ];
  const cities = Array.from(new Set(active.map((t) => t.city))).sort((a, b) => a.localeCompare(b, "es"));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "teams", regionSlug(community)) })))} />
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={crumbs} />
          <p className="kicker mb-4">{dict.region.kicker}</p>
          <h1 className="display display-md">
            {locale === "es" ? `Fútbol americano en ${name}` : `American football in ${name}`}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">
            {dict.region.intro} {name}
            {cities.length > 0 ? `: ${cities.join(", ")}.` : "."}
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 md:max-w-xl">
            <Stat label={dict.nav.teams} value={String(teams.length)} />
            <Stat label={dict.status.active} value={String(active.length)} />
            <Stat label="LNFA Serie A" value={String(topTier)} />
          </div>
        </div>
      </section>

      <div className="container-content flex flex-col gap-12 py-12">
        <RegionChips teams={allTeams} locale={locale} current={community} title={dict.region.allRegions} />

        {pins.length > 0 && (
          <TeamMapLoader
            pins={pins}
            height="24rem"
            labels={{ viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status }}
          />
        )}

        {teams.length === 0 ? (
          <p className="card p-8 text-center text-muted">{dict.region.noTeams}</p>
        ) : (
          <>
            <section>
              <h2 className="display display-sm mb-6">
                {dict.status.active} · {active.length}
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {active.map((team) => (
                  <li key={team.id}>
                    <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
            {historical.length > 0 && (
              <section>
                <h2 className="display display-sm mb-6">
                  {dict.status.historical} · {historical.length}
                </h2>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {historical.map((team) => (
                    <li key={team.id}>
                      <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        <div className="card flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="kicker mb-1">{dict.near.title}</p>
            <p className="text-muted">{dict.home.nearYouSub}</p>
          </div>
          <Link href={href(locale, "nearYou")} className="font-display text-base font-bold uppercase tracking-[0.08em] text-gold hover:text-gold-2">
            {dict.near.cta} →
          </Link>
        </div>
      </div>
    </>
  );
}
