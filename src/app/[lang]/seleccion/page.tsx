import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { playerSlug } from "@/lib/players";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { SourceList } from "@/components/articles/SourceList";
import { GameList } from "@/components/national-team/GameList";
import { CalendarSubscribe } from "@/components/ui/CalendarSubscribe";

export async function generateMetadata({ params }: PageProps<"/[lang]/seleccion">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.nationalTeam.title, description: dict.nationalTeam.intro, routeKey: "nationalTeam" });
}

export default async function NationalTeamPage({ params }: PageProps<"/[lang]/seleccion">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [teams, players] = await Promise.all([repo.getNationalTeams(), repo.getPlayerSpotlights()]);
  const sources = await repo.getSourcesByIds(Array.from(new Set(teams.flatMap((x) => x.sourceIds))));
  const lastVerified = teams.map((x) => x.lastVerifiedAt).sort().at(-1);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.nationalTeam, url: href(locale, "nationalTeam") },
        ])}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />
        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.nationalTeam }]} />
          <h1 className="display display-lg mt-6 max-w-4xl">{dict.nationalTeam.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.nationalTeam.intro}</p>
          {teams.length > 1 && (
            <nav aria-label={dict.nav.nationalTeam} className="mt-10 flex flex-wrap gap-2">
              {teams.map((team) => (
                <a key={team.id} href={`#${team.id}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
                  {t(team.name, locale)}
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-12 md:py-14">
        <div className="mb-12 max-w-xl">
          <CalendarSubscribe locale={locale} />
        </div>
        {teams.map((team) => {
          const roster = players.filter((p) => p.nationalTeamId === team.id);
          return (
            <section key={team.id} id={team.id} className="mb-16 scroll-mt-24 border-t border-line pt-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="gold">{dict.discipline[team.discipline]}</Badge>
                {team.competition && <Badge tone="outline">{t(team.competition, locale)}</Badge>}
              </div>
              <h2 className="display display-md mt-4">
                <Link href={href(locale, "nationalTeam", team.id)} className="hover:text-accent">
                  {t(team.name, locale)}
                </Link>
              </h2>
              {team.coach && (
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  {dict.nationalTeam.coach}: <span className="text-paper">{team.coach}</span>
                </p>
              )}
              <p className="mt-4 max-w-3xl leading-relaxed text-paper-2">{t(team.summary, locale)}</p>
              <Link href={href(locale, "nationalTeam", team.id)} className="mt-3 inline-block text-sm text-accent hover:text-accent-bright">
                {dict.nationalTeam.more} →
              </Link>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {team.upcoming.length > 0 && (
                  <div>
                    <h3 className="kicker mb-3 text-turf">{dict.nationalTeam.upcoming}</h3>
                    <GameList games={team.upcoming} locale={locale} dict={dict} />
                  </div>
                )}
                {team.results.length > 0 && (
                  <div>
                    <h3 className="kicker mb-3 text-muted">{dict.nationalTeam.results}</h3>
                    <GameList games={[...team.results].sort((a, b) => b.date.localeCompare(a.date))} locale={locale} dict={dict} />
                  </div>
                )}
              </div>

              {roster.length > 0 && (
                <div className="mt-8">
                  <h3 className="kicker mb-3 text-muted">{team.id.includes("femenina") ? dict.nationalTeam.playersWomen : dict.nationalTeam.players}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {roster.map((p) => (
                      <li key={p.id}>
                        <Link href={href(locale, "players", playerSlug(p.name))} className="flex items-center gap-2 border border-line bg-surface px-3 py-2 text-sm text-paper transition-colors hover:border-accent">
                          <span className="font-mono text-xs text-accent">{p.position}</span>
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
        <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} lastVerified={lastVerified} lastVerifiedLabel={dict.verification.lastVerified} />
      </div>
    </>
  );
}
