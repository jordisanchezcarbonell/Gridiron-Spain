"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/types/common";
import type { Competition, Discipline, Team, TeamCategory, TeamStatus } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { TeamCard } from "./TeamCard";

type Filters = {
  discipline: Discipline | "all";
  category: TeamCategory | "all";
  community: string | "all";
  status: TeamStatus | "all";
  competition: string | "all";
};

const initial: Filters = {
  discipline: "all",
  category: "all",
  community: "all",
  status: "all",
  competition: "all",
};

export function filterTeams(teams: Team[], f: Filters): Team[] {
  return teams.filter((team) => {
    if (f.discipline !== "all" && !team.disciplines.includes(f.discipline)) return false;
    if (f.category !== "all" && !team.categories.includes(f.category)) return false;
    if (f.community !== "all" && team.autonomousCommunity !== f.community) return false;
    if (f.status !== "all") {
      if (f.status === "historical" && !(team.status === "historical" || team.status === "inactive")) return false;
      if (f.status !== "historical" && team.status !== f.status) return false;
    }
    if (f.competition !== "all" && !team.currentCompetitions.some((c) => c.competitionId === f.competition))
      return false;
    return true;
  });
}

export function TeamFilters({
  teams,
  competitions,
  locale,
  dict,
}: {
  teams: Team[];
  competitions: Competition[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [filters, setFilters] = useState<Filters>(initial);

  const communities = useMemo(
    () => Array.from(new Set(teams.map((t) => t.autonomousCommunity))).sort(),
    [teams],
  );
  const usedCompetitions = useMemo(() => {
    const ids = new Set(teams.flatMap((t) => t.currentCompetitions.map((c) => c.competitionId)));
    return competitions.filter((c) => ids.has(c.id));
  }, [teams, competitions]);

  const filtered = useMemo(() => filterTeams(teams, filters), [teams, filters]);
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const selectClass =
    "w-full rounded-sm border border-line-strong bg-surface px-3 py-2 text-sm text-paper focus:border-gold";

  return (
    <div>
      <form
        className="card mb-8 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5"
        aria-label={dict.teams.filters}
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-col gap-1.5">
          <span className="kicker text-muted-2">{dict.teams.discipline}</span>
          <select className={selectClass} value={filters.discipline} onChange={(e) => set("discipline", e.target.value as Filters["discipline"])}>
            <option value="all">{dict.teams.all}</option>
            <option value="tackle">{dict.discipline.tackle}</option>
            <option value="flag">{dict.discipline.flag}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="kicker text-muted-2">{dict.teams.category}</span>
          <select className={selectClass} value={filters.category} onChange={(e) => set("category", e.target.value as Filters["category"])}>
            <option value="all">{dict.teams.all}</option>
            {(Object.keys(dict.category) as TeamCategory[]).map((c) => (
              <option key={c} value={c}>
                {dict.category[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="kicker text-muted-2">{dict.teams.community}</span>
          <select className={selectClass} value={filters.community} onChange={(e) => set("community", e.target.value)}>
            <option value="all">{dict.teams.all}</option>
            {communities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="kicker text-muted-2">{dict.teams.competition}</span>
          <select className={selectClass} value={filters.competition} onChange={(e) => set("competition", e.target.value)}>
            <option value="all">{dict.teams.all}</option>
            {usedCompetitions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.shortName ?? c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="kicker text-muted-2">{dict.teams.status}</span>
          <select className={selectClass} value={filters.status} onChange={(e) => set("status", e.target.value as Filters["status"])}>
            <option value="all">{dict.teams.all}</option>
            <option value="active">{dict.status.active}</option>
            <option value="historical">{dict.status.historical}</option>
          </select>
        </label>
      </form>

      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2" aria-live="polite">
          {filtered.length} {dict.teams.results}
        </p>
        <button
          type="button"
          onClick={() => setFilters(initial)}
          className="font-mono text-xs uppercase tracking-[0.14em] text-gold hover:text-gold-2"
        >
          {dict.teams.reset}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="card p-8 text-center text-muted">{dict.teams.noResults}</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((team) => (
            <li key={team.id}>
              <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
