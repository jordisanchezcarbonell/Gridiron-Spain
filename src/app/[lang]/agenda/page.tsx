import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, sportsEventJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { SourceList } from "@/components/articles/SourceList";
import { CalendarSubscribe } from "@/components/ui/CalendarSubscribe";
import type { Competition, Locale, ScheduledGame, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";

const TZ = "Europe/Madrid";

export async function generateMetadata({ params }: PageProps<"/[lang]/agenda">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.agenda.title, description: dict.agenda.intro, routeKey: "agenda" });
}

/** Spain calendar day (YYYY-MM-DD) of a UTC instant. */
function spainDay(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

function spainTime(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function dayLabel(day: string, locale: Locale) {
  const label = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(new Date(`${day}T12:00:00Z`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default async function AgendaPage({ params }: PageProps<"/[lang]/agenda">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [weeks, competitions, teams] = await Promise.all([repo.getAgendaWeeks(), repo.getCompetitions(), repo.getTeams()]);
  const week = weeks[0];
  const sources = week ? await repo.getSourcesByIds(week.sourceIds) : [];

  const games = week ? [...week.games].sort((a, b) => a.kickoffUtc.localeCompare(b.kickoffUtc)) : [];
  const days = Array.from(new Set(games.map((g) => spainDay(g.kickoffUtc))));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: href(locale, "home") },
            { name: dict.nav.agenda, url: href(locale, "agenda") },
          ]),
          ...games.map((g) =>
            sportsEventJsonLd({
              name: `${g.away} @ ${g.home}`,
              startDate: g.kickoffUtc,
              location: g.venue,
              url: href(locale, "agenda"),
              description: g.note ? t(g.note, locale) : undefined,
              home: g.home,
              away: g.away,
            }),
          ),
        ]}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />
        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.agenda }]} />
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">{dict.nav.agenda}</span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>
          <h1 className="display display-lg max-w-4xl">{week ? t(week.title, locale) : dict.agenda.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{week ? t(week.intro, locale) : dict.agenda.intro}</p>
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{dict.agenda.timeNote}</p>
          {days.length > 1 && (
            <nav aria-label={dict.nav.agenda} className="mt-8 flex flex-wrap gap-2">
              {days.map((d) => (
                <a
                  key={d}
                  href={`#dia-${d}`}
                  className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {dayLabel(d, locale)}
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content grid gap-12 py-12 md:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {!week && <p className="text-paper-2">{dict.agenda.empty}</p>}
          {days.map((day) => (
            <section key={day} id={`dia-${day}`} className="mb-12 scroll-mt-24">
              <h2 className="display display-sm mb-5">{dayLabel(day, locale)}</h2>
              <ul className="grid gap-3">
                {games
                  .filter((g) => spainDay(g.kickoffUtc) === day)
                  .map((g) => (
                    <GameRow key={g.id} game={g} competitions={competitions} teams={teams} locale={locale} dict={dict} />
                  ))}
              </ul>
            </section>
          ))}
          {week && (
            <SourceList
              sources={sources}
              locale={locale}
              title={dict.common.sources}
              accessedLabel={dict.articles.accessed}
              lastVerified={week.lastVerifiedAt}
              lastVerifiedLabel={dict.verification.lastVerified}
            />
          )}
        </div>

        {week && (
          <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
            <CalendarSubscribe locale={locale} />
            {week.howToWatch.length > 0 && (
              <div className="relative border border-line bg-surface">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
                <p className="px-5 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{dict.agenda.howToWatch}</p>
                <dl className="divide-y divide-line">
                  {week.howToWatch.map((h) => (
                    <div key={h.competitionId} className="grid gap-1 px-5 py-4">
                      <dt className="font-display text-base font-bold text-paper">{competitions.find((c) => c.id === h.competitionId)?.shortName ?? h.competitionId}</dt>
                      <dd className="text-sm leading-relaxed text-paper-2">{t(h.text, locale)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        )}
      </div>
    </>
  );
}

function TeamLabel({ name, rank, teamId, teams, locale }: { name: string; rank?: number; teamId?: string; teams: Team[]; locale: Locale }) {
  const team = teamId ? teams.find((x) => x.id === teamId) : undefined;
  const label = (
    <>
      {rank && <span className="mr-1 font-mono text-xs text-muted">#{rank}</span>}
      {name}
    </>
  );
  return team ? (
    <Link href={href(locale, "teams", team.slug)} className="hover:text-accent">
      {label}
    </Link>
  ) : (
    label
  );
}

function GameRow({ game, competitions, teams, locale, dict }: { game: ScheduledGame; competitions: Competition[]; teams: Team[]; locale: Locale; dict: Dictionary }) {
  const competition = competitions.find((c) => c.id === game.competitionId);
  return (
    <li className={`grid gap-3 border bg-surface p-4 sm:grid-cols-[4.5rem_1fr] sm:p-5 ${game.featured ? "border-accent/50" : "border-line"}`}>
      <p className="font-display text-2xl font-black text-accent">{spainTime(game.kickoffUtc, locale)}</p>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="outline">{competition?.shortName ?? game.competitionId}</Badge>
          {game.featured && <Badge tone="accent">{dict.agenda.featured}</Badge>}
        </div>
        <p className="font-display text-lg font-bold text-paper">
          <TeamLabel name={game.away} rank={game.awayRank} teamId={game.awayTeamId} teams={teams} locale={locale} />
          <span className="mx-2 text-muted">@</span>
          <TeamLabel name={game.home} rank={game.homeRank} teamId={game.homeTeamId} teams={teams} locale={locale} />
        </p>
        {game.note && <p className="mt-1 text-sm leading-relaxed text-paper-2">{t(game.note, locale)}</p>}
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
          {game.venue && <span>{game.venue}</span>}
          {game.usTv && (
            <span>
              {dict.agenda.usTv}: {game.usTv}
            </span>
          )}
          {game.watchInSpain && (
            <span className="text-turf">
              {dict.agenda.inSpain}: {t(game.watchInSpain, locale)}
            </span>
          )}
        </p>
      </div>
    </li>
  );
}
