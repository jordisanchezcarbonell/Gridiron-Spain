import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t, formatDate, formatMonthYear } from "@/lib/i18n/text";
import type { SeasonEntry, Team } from "@/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { SourceList } from "@/components/articles/SourceList";

export async function generateStaticParams() {
  const repo = getRepository();
  const [seasons, competitions] = await Promise.all([repo.getSeasons(), repo.getCompetitions()]);
  return seasons.flatMap((season) => {
    const competition = competitions.find((c) => c.id === season.competitionId);
    return competition ? [{ slug: competition.slug, season: season.slug }] : [];
  });
}

export async function generateMetadata({ params }: PageProps<"/[lang]/competiciones/[slug]/[season]">): Promise<Metadata> {
  const { lang, slug, season: seasonSlug } = await params;
  const locale = resolveLocale(lang);
  const repo = getRepository();
  const competition = await repo.getCompetitionBySlug(slug);
  if (!competition) return {};
  const season = await repo.getSeason(competition.id, seasonSlug);
  if (!season) return {};
  const title =
    locale === "es"
      ? `${t(season.name, locale)}: equipos, calendario y resultados`
      : `${t(season.name, locale)}: teams, calendar and results`;
  return buildMetadata({ locale, title, description: t(season.summary, locale), routeKey: "competitions", segments: [slug, seasonSlug] });
}

export default async function SeasonPage({ params }: PageProps<"/[lang]/competiciones/[slug]/[season]">) {
  const { lang, slug, season: seasonSlug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const competition = await repo.getCompetitionBySlug(slug);
  if (!competition) notFound();
  const season = await repo.getSeason(competition.id, seasonSlug);
  if (!season) notFound();

  const [teams, sources, siblings] = await Promise.all([
    repo.getTeams(),
    repo.getSourcesByIds(season.sourceIds),
    repo.getSeasonsByCompetition(competition.id),
  ]);
  const teamById = new Map(teams.map((team) => [team.id, team]));
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.competitions, href: href(locale, "competitions") },
    { name: competition.shortName ?? competition.name, href: href(locale, "competitions", competition.slug) },
    { name: t(season.name, locale) },
  ];
  const statusLabel = { upcoming: dict.season.upcoming, "in-progress": dict.season.inProgress, completed: dict.season.completed }[season.status];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "competitions", slug, seasonSlug) })))} />
      <section className="grain border-b border-line">
        <div className="container-content py-12 md:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">{dict.season.kicker}</Badge>
            <Badge tone={season.status === "completed" ? "outline" : "turf"}>{statusLabel}</Badge>
          </div>
          <h1 className="display display-md mt-4">{t(season.name, locale)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-paper-2">{t(season.summary, locale)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <VerificationBadge
              size="md"
              status={season.verificationStatus}
              label={dict.verification[season.verificationStatus]}
              lastVerifiedLabel={dict.verification.lastVerified}
              lastVerified={season.lastVerifiedAt ? formatMonthYear(season.lastVerifiedAt, locale) : undefined}
            />
            {siblings.length > 1 && (
              <nav aria-label={dict.season.seasons} className="flex gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
                {siblings.map((s) => (
                  <Link
                    key={s.id}
                    href={href(locale, "competitions", competition.slug, s.slug)}
                    aria-current={s.id === season.id ? "page" : undefined}
                    className={s.id === season.id ? "rounded-sm bg-gold px-2.5 py-1 text-ink" : "rounded-sm border border-line-strong px-2.5 py-1 text-muted hover:text-gold"}
                  >
                    {s.slug}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>

      <div className="container-content grid gap-12 py-12 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-12">
          {(season.champion || season.runnerUp) && (
            <section className="grid gap-4 sm:grid-cols-2">
              {season.champion && <Podium label={dict.season.champion} entry={season.champion} teamById={teamById} locale={locale} tone="gold" pending={dict.season.noProfile} />}
              {season.runnerUp && <Podium label={dict.season.runnerUp} entry={season.runnerUp} teamById={teamById} locale={locale} tone="outline" pending={dict.season.noProfile} />}
            </section>
          )}

          <section>
            <h2 className="display display-sm mb-6">{dict.season.groups}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {season.groups.map((group) => (
                <div key={t(group.name, "es")} className="card overflow-hidden">
                  <p className="border-b border-line bg-ink-2 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{t(group.name, locale)}</p>
                  <ol className="divide-y divide-line">
                    {group.entries.map((entry, i) => {
                      const team = entry.teamId ? teamById.get(entry.teamId) : undefined;
                      const name = team?.name ?? entry.name ?? "";
                      const rec = entry.record;
                      const inner = (
                        <>
                          <span className="w-5 font-mono text-xs text-muted-2">{i + 1}</span>
                          {team ? <TeamLogo team={team} size={32} /> : <span className="grid h-8 w-8 place-items-center rounded-sm border border-line bg-surface-2 font-display text-sm font-black text-muted">?</span>}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-lg font-extrabold uppercase leading-none text-paper">{name}</span>
                            {entry.note && <span className="mt-0.5 block text-xs text-muted">{t(entry.note, locale)}</span>}
                          </span>
                          {rec && (
                            <span className="font-mono text-sm text-paper-2">
                              {rec.wins}-{rec.losses}
                              {rec.ties ? `-${rec.ties}` : ""}
                            </span>
                          )}
                        </>
                      );
                      return (
                        <li key={`${name}-${i}`}>
                          {team ? (
                            <Link href={href(locale, "teams", team.slug)} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2">
                              {inner}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 px-4 py-3" title={dict.season.noProfile}>
                              {inner}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
            {season.groups.some((g) => g.entries.some((e) => e.record)) && <p className="mt-3 text-xs text-muted-2">{dict.season.recordHint}</p>}
          </section>

          <section>
            <h2 className="display display-sm mb-6">{dict.season.calendar}</h2>
            <ol className="card divide-y divide-line">
              {season.phases.map((phase) => (
                <li key={t(phase.name, "es")} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">
                    {formatDate(phase.start, locale, { day: "numeric", month: "short", year: "numeric" })}
                    {phase.end ? ` → ${formatDate(phase.end, locale, { day: "numeric", month: "short", year: "numeric" })}` : ""}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold uppercase leading-none text-paper">{t(phase.name, locale)}</span>
                    {phase.venue && <span className="mt-1 block text-sm text-muted">{t(phase.venue, locale)}</span>}
                    {phase.result && <span className="mt-1 block text-sm text-paper-2">{t(phase.result, locale)}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} lastVerified={season.lastVerifiedAt} lastVerifiedLabel={dict.verification.lastVerified} />
        </div>

        <aside className="card h-fit p-5 lg:sticky lg:top-24">
          <p className="kicker mb-2 text-muted-2">{dict.season.format}</p>
          <p className="text-sm text-paper-2">{t(season.format, locale)}</p>
          <Link href={href(locale, "competitions", competition.slug)} className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.14em] text-gold hover:text-gold-2">
            ← {competition.name}
          </Link>
        </aside>
      </div>
    </>
  );
}

function Podium({
  label,
  entry,
  teamById,
  locale,
  tone,
  pending,
}: {
  label: string;
  entry: SeasonEntry;
  teamById: Map<string, Team>;
  locale: "es" | "en";
  tone: "gold" | "outline";
  pending: string;
}) {
  const team = entry.teamId ? teamById.get(entry.teamId) : undefined;
  const name = team?.name ?? entry.name ?? pending;
  const body = (
    <div className={`card flex items-center gap-4 p-5 ${tone === "gold" ? "border-gold/40" : ""}`}>
      {team ? <TeamLogo team={team} size={56} /> : null}
      <div>
        <p className={`kicker mb-1 ${tone === "gold" ? "" : "text-muted-2"}`}>{label}</p>
        <p className="font-display text-2xl font-extrabold uppercase leading-none text-paper">{name}</p>
      </div>
    </div>
  );
  return team ? <Link href={href(locale, "teams", team.slug)}>{body}</Link> : body;
}
