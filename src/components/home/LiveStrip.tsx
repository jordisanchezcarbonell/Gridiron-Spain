import Link from "next/link";
import { href } from "@/lib/i18n/routes";
import { t, formatDate } from "@/lib/i18n/text";
import type { AgendaWeek, Locale, NationalTeam, Ranking } from "@/types";
import type { Dictionary } from "@/dictionaries/es";

type Props = {
  week?: AgendaWeek;
  ranking?: Ranking;
  nationalTeams: NationalTeam[];
  /** ISO instant the page is rendered at; past games are skipped. */
  now: string;
  locale: Locale;
  dict: Dictionary;
};

function spainDateTime(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

/**
 * Home-page strip fed by the weekly routines: weekend games, the AP top 5 and
 * Spain's next national-team game. Each column hides itself when it has no data.
 */
export function LiveStrip({ week, ranking, nationalTeams, now, locale, dict }: Props) {
  const games = (week?.games ?? [])
    .filter((g) => g.featured && g.kickoffUtc >= now)
    .sort((a, b) => a.kickoffUtc.localeCompare(b.kickoffUtc))
    .slice(0, 3);
  const top5 = ranking?.groups[0]?.entries.slice(0, 5) ?? [];
  const today = now.slice(0, 10);
  const next = nationalTeams
    .flatMap((team) => team.upcoming.map((game) => ({ team, game })))
    .filter(({ game }) => game.date >= today)
    .sort((a, b) => a.game.date.localeCompare(b.game.date))[0];

  const showRanking = top5.length > 0 && Boolean(ranking);
  const count = [games.length > 0, showRanking, Boolean(next)].filter(Boolean).length;
  if (count === 0) return null;

  // The grid follows the number of cards that have data, so a quiet week
  // (no upcoming games, no national-team fixture) never leaves empty columns.
  const columns = count === 3 ? "md:grid-cols-3" : count === 2 ? "md:grid-cols-2" : "";
  const solo = count === 1;

  const card = "relative flex flex-col border border-line bg-surface p-5";
  const label = "mb-4 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em]";
  const more = "mt-auto pt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent hover:text-accent-bright";

  return (
    <section aria-label={dict.home.live.title} className="border-b border-line bg-ink-2">
      <div className={`container-content grid gap-4 py-8 ${columns}`}>
        {games.length > 0 && (
          <div className={card}>
            <p className={`${label} text-accent`}>{dict.home.live.weekend}</p>
            <ul className={solo ? "grid gap-3 md:grid-cols-3 md:gap-6" : "grid gap-3"}>
              {games.map((g) => (
                <li key={g.id}>
                  <p className="font-mono text-xs text-muted">{spainDateTime(g.kickoffUtc, locale)}</p>
                  <p className="font-display text-base font-bold leading-tight text-paper">
                    {g.away} <span className="text-muted">@</span> {g.home}
                  </p>
                </li>
              ))}
            </ul>
            <Link href={href(locale, "agenda")} className={more}>
              {dict.home.live.fullAgenda} →
            </Link>
          </div>
        )}
        {showRanking && ranking && (
          <div className={card}>
            <p className={`${label} text-gold`}>{t(ranking.title, locale)}</p>
            <ol className={solo ? "grid gap-1.5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5" : "grid gap-1.5"}>
              {top5.map((e) => (
                <li key={e.rank} className="flex items-baseline gap-3">
                  <span className="w-5 font-display text-lg font-black text-accent">{e.rank}</span>
                  <span className="text-sm text-paper">{e.name}</span>
                  {e.detail && <span className="ml-auto font-mono text-xs text-muted">{e.detail}</span>}
                </li>
              ))}
            </ol>
            <Link href={href(locale, "rankings")} className={more}>
              {dict.home.live.allRankings} →
            </Link>
          </div>
        )}
        {next && (
          <div className={card}>
            <p className={`${label} text-turf`}>{dict.home.live.spain}</p>
            <p className="font-mono text-xs text-muted">{formatDate(next.game.date, locale, { weekday: "long", day: "numeric", month: "long" })}</p>
            <p className="mt-1 font-display text-2xl font-black leading-tight text-paper">
              {locale === "es" ? "España" : "Spain"} <span className="text-muted">{dict.nationalTeam.vs}</span> {next.game.opponent}
            </p>
            <p className="mt-2 text-sm text-paper-2">
              {t(next.team.name, locale)}
              {next.game.venue ? ` · ${next.game.venue}` : ""}
            </p>
            <Link href={href(locale, "nationalTeam", next.team.id)} className={more}>
              {dict.home.live.nationalTeam} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
