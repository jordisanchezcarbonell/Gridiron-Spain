import { t, formatDate } from "@/lib/i18n/text";
import type { Locale, NationalTeamGame } from "@/types";
import type { Dictionary } from "@/dictionaries/es";

const tone = { win: "text-turf", loss: "text-signal", tie: "text-muted" } as const;

/** Spain's games, score first; used on the national-team overview and detail pages. */
export function GameList({ games, locale, dict }: { games: NationalTeamGame[]; locale: Locale; dict: Dictionary }) {
  return (
    <ul className="divide-y divide-line border border-line bg-surface">
      {games.map((g) => (
        <li key={`${g.date}-${g.opponent}`} className="grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-3 px-4 py-3 text-sm">
          <span className="font-mono text-xs text-muted">{formatDate(g.date, locale, { year: "numeric", month: "short", day: "numeric" })}</span>
          <span className="min-w-0">
            <span className="text-paper">
              {dict.nationalTeam.vs} {g.opponent}
            </span>
            <span className="block text-xs text-muted">
              {t(g.competition, locale)}
              {g.venue ? ` · ${g.venue}` : ""}
            </span>
            {g.note && <span className="block text-xs text-muted">{t(g.note, locale)}</span>}
          </span>
          {g.score ? (
            <span className={`font-display text-lg font-black ${g.result ? tone[g.result] : "text-paper"}`} title={g.result ? dict.nationalTeam[g.result] : undefined}>
              {g.score}
            </span>
          ) : g.result ? (
            <span className={`font-mono text-[0.625rem] uppercase tracking-[0.12em] ${tone[g.result]}`}>{dict.nationalTeam[g.result]}</span>
          ) : (
            <span />
          )}
        </li>
      ))}
    </ul>
  );
}
