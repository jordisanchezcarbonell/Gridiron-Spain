import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Final, FinalSide, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";

function roman(n: number): string {
  const map: Array<[number, string]> = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

function SideName({ side, teams, locale, strong }: { side?: FinalSide; teams: Map<string, Team>; locale: Locale; strong?: boolean }) {
  if (!side) return <span className="text-muted-2">—</span>;
  const team = side.teamId ? teams.get(side.teamId) : undefined;
  const name = team?.name ?? side.name ?? "";
  const cls = strong ? "font-display text-base font-extrabold uppercase text-paper" : "text-paper-2";
  return team ? (
    <Link href={href(locale, "teams", team.slug)} className={`${cls} hover:text-gold`}>
      {name}
    </Link>
  ) : (
    <span className={cls}>{name}</span>
  );
}

export function FinalsTable({ finals, teams, locale, dict }: { finals: Final[]; teams: Team[]; locale: Locale; dict: Dictionary }) {
  const byId = new Map(teams.map((team) => [team.id, team]));
  const rows = [...finals].sort((a, b) => b.year - a.year);
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[40rem] text-sm">
        <thead>
          <tr className="border-b border-line bg-ink-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-2">
            <th className="px-4 py-3 text-left font-normal">{dict.history.year}</th>
            <th className="px-4 py-3 text-left font-normal">{dict.history.champion}</th>
            <th className="px-4 py-3 text-left font-normal">{dict.history.runnerUp}</th>
            <th className="px-4 py-3 text-left font-normal">{dict.history.score}</th>
            <th className="px-4 py-3 text-left font-normal">{dict.history.venue}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((f) => (
            <tr key={`${f.competitionId}-${f.year}`} className="hover:bg-surface-2">
              <td className="whitespace-nowrap px-4 py-3">
                <span className="font-display text-xl font-black text-paper">{f.year}</span>
                {f.edition && <span className="ml-2 font-mono text-[0.62rem] text-muted-2">{roman(f.edition)}</span>}
              </td>
              {f.note ? (
                <td colSpan={4} className="px-4 py-3 text-muted">{t(f.note, locale)}</td>
              ) : (
                <>
                  <td className="px-4 py-3"><SideName side={f.champion} teams={byId} locale={locale} strong /></td>
                  <td className="px-4 py-3"><SideName side={f.runnerUp} teams={byId} locale={locale} /></td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-paper-2">{f.score ?? <span className="text-muted-2">—</span>}</td>
                  <td className="px-4 py-3 text-muted">{f.venue ? t(f.venue, locale) : <span className="text-muted-2">—</span>}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HonoursTable({ finals, teams, locale, dict }: { finals: Final[]; teams: Team[]; locale: Locale; dict: Dictionary }) {
  const byId = new Map(teams.map((team) => [team.id, team]));
  const counts = new Map<string, { side: FinalSide; titles: number; years: number[] }>();
  for (const f of finals) {
    if (!f.champion) continue;
    const key = f.champion.teamId ?? f.champion.name ?? "";
    const entry = counts.get(key) ?? { side: f.champion, titles: 0, years: [] };
    entry.titles += 1;
    entry.years.push(f.year);
    counts.set(key, entry);
  }
  const rows = Array.from(counts.values()).sort((a, b) => b.titles - a.titles || a.years[0] - b.years[0]);
  const max = rows[0]?.titles ?? 1;
  return (
    <ol className="card divide-y divide-line">
      {rows.map((r) => (
        <li key={r.side.teamId ?? r.side.name} className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 sm:grid-cols-[14rem_1fr_auto]">
          <SideName side={r.side} teams={byId} locale={locale} strong />
          <div className="hidden h-2 rounded-full bg-ink-2 sm:block" aria-hidden>
            <div className="h-2 rounded-full bg-gold" style={{ width: `${(r.titles / max) * 100}%` }} />
          </div>
          <span className="text-right">
            <span className="font-display text-2xl font-black text-gold">{r.titles}</span>
            <span className="ml-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-2">{dict.history.titles}</span>
            <span className="block text-[0.7rem] text-muted-2">{r.years.join(" · ")}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
