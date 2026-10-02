import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, sportsEventJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { playerSlug } from "@/lib/players";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { SourceList } from "@/components/articles/SourceList";
import { RichText } from "@/components/articles/ArticleBody";
import { GameList } from "@/components/national-team/GameList";

export async function generateStaticParams() {
  const teams = await getRepository().getNationalTeams();
  return teams.map((team) => ({ id: team.id }));
}

async function getTeam(id: string) {
  return (await getRepository().getNationalTeams()).find((team) => team.id === id) ?? null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/seleccion/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const locale = resolveLocale(lang);
  const team = await getTeam(id);
  if (!team) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: `${dict.nav.nationalTeam} · ${t(team.name, locale)}`,
    description: t(team.summary, locale),
    routeKey: "nationalTeam",
    segments: [id],
  });
}

export default async function NationalTeamDetailPage({ params }: PageProps<"/[lang]/seleccion/[id]">) {
  const { lang, id } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const team = await getTeam(id);
  if (!team) notFound();
  const repo = getRepository();
  const [allTeams, players, sources] = await Promise.all([repo.getNationalTeams(), repo.getPlayerSpotlights(), repo.getSourcesByIds(team.sourceIds)]);
  const roster = players.filter((p) => p.nationalTeamId === team.id);
  const name = t(team.name, locale);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.nationalTeam, href: href(locale, "nationalTeam") },
    { name },
  ];
  const sportsTeam = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: `${locale === "es" ? "Selección española" : "Spain"} · ${name}`,
    sport: team.discipline === "flag" ? "Flag football" : "American football",
    ...(team.coach ? { coach: { "@type": "Person", name: team.coach } } : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "nationalTeam", id) }))),
          sportsTeam,
          ...team.upcoming.map((g) =>
            sportsEventJsonLd({
              name: `${locale === "es" ? "España" : "Spain"} vs ${g.opponent} · ${t(team.name, locale)}`,
              startDate: g.date,
              location: g.venue,
              url: href(locale, "nationalTeam", id),
              description: t(g.competition, locale),
              sport: team.discipline === "flag" ? "Flag football" : "American football",
            }),
          ),
        ]}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />
        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={crumbs} />
          <div className="mb-4 mt-6 flex flex-wrap items-center gap-2">
            <Badge tone="gold">{dict.discipline[team.discipline]}</Badge>
            {team.competition && <Badge tone="outline">{t(team.competition, locale)}</Badge>}
          </div>
          <p className="kicker text-accent">{locale === "es" ? "Selección española" : "Spain national team"}</p>
          <h1 className="display display-lg mt-2">{name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{t(team.summary, locale)}</p>
          {team.honours && team.honours.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {team.honours.map((h) => (
                <li key={h.year} className="border border-gold/40 bg-gold/10 px-4 py-2">
                  <span className="font-display text-xl font-black text-gold">{h.year}</span>
                  <span className="ml-2 text-sm text-paper">{t(h.title, locale)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content grid gap-12 py-12 md:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {team.story && team.story.length > 0 && (
            <section className="mb-12">
              <h2 className="display display-sm mb-5">{dict.nationalTeam.history}</h2>
              <div className="grid gap-5 text-lg leading-relaxed text-paper-2">
                {team.story.map((p, i) => (
                  <p key={i}>
                    <RichText text={t(p, locale)} sources={sources} />
                  </p>
                ))}
              </div>
            </section>
          )}

          {team.upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="kicker mb-3 text-turf">{dict.nationalTeam.upcoming}</h2>
              <GameList games={team.upcoming} locale={locale} dict={dict} />
            </section>
          )}

          {team.results.length > 0 && (
            <section className="mb-12">
              <h2 className="kicker mb-3 text-muted">{dict.nationalTeam.results}</h2>
              <GameList games={[...team.results].sort((a, b) => b.date.localeCompare(a.date))} locale={locale} dict={dict} />
            </section>
          )}

          {team.pastCampaigns?.map((c) => (
            <section key={t(c.name, "es")} className="mb-12">
              <h2 className="kicker mb-3 text-gold">{t(c.name, locale)}</h2>
              {c.summary && <p className="mb-3 text-paper-2">{t(c.summary, locale)}</p>}
              <GameList games={c.games} locale={locale} dict={dict} />
            </section>
          ))}

          {(roster.length > 0 || team.roster) && (
            <section className="mb-12">
              <h2 className="display display-sm mb-5">{team.id.includes("femenina") ? dict.nationalTeam.playersWomen : dict.nationalTeam.players}</h2>
              {roster.length > 0 && (
                <ul className="mb-6 grid gap-3 sm:grid-cols-2">
                  {roster.map((p) => (
                    <li key={p.id}>
                      <Link href={href(locale, "players", playerSlug(p.name))} className="block h-full border border-line bg-surface p-4 transition-colors hover:border-accent">
                        <span className="font-mono text-xs text-accent">{p.position}</span>
                        <span className="ml-2 font-display text-lg font-bold text-paper">{p.name}</span>
                        <span className="mt-1 block text-sm text-muted">{t(p.note, locale)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {team.roster && (
                <>
                  <p className="kicker mb-3 text-muted">{t(team.roster.label, locale)}</p>
                  <ul className="flex flex-wrap gap-2">
                    {team.roster.names.map((n) => (
                      <li key={n} className="border border-line bg-surface px-3 py-1.5 text-sm text-paper">
                        {n}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} lastVerified={team.lastVerifiedAt} lastVerifiedLabel={dict.verification.lastVerified} />
        </div>

        <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
          {(team.coach || team.staff) && (
            <div className="relative border border-line bg-surface">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
              <p className="px-5 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{dict.nationalTeam.staff}</p>
              <dl className="divide-y divide-line">
                {(team.staff ?? [{ role: { es: "Seleccionador", en: "Head coach" }, name: team.coach! }]).map((m) => (
                  <div key={m.name} className="grid gap-0.5 px-5 py-3">
                    <dt className="text-xs text-muted">{t(m.role, locale)}</dt>
                    <dd className="text-sm text-paper">{m.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <nav aria-label={dict.nationalTeam.otherTeams} className="border border-line bg-surface p-5">
            <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{dict.nationalTeam.otherTeams}</p>
            <ul className="grid gap-2 text-sm">
              {allTeams
                .filter((x) => x.id !== team.id)
                .map((x) => (
                  <li key={x.id}>
                    <Link href={href(locale, "nationalTeam", x.id)} className="text-paper-2 hover:text-accent">
                      {t(x.name, locale)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
