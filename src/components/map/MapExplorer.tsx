"use client";

import { useMemo, useState } from "react";
import type { Competition, Discipline, TeamCategory } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import type { MapPin } from "./map-data";
import { TeamMapLoader } from "./TeamMapLoader";

type Filters = {
  discipline: Discipline | "all";
  category: TeamCategory | "all";
  competition: string | "all";
  community: string | "all";
  status: "all" | "active" | "historical";
};

export function MapExplorer({
  pins,
  competitions,
  dict,
}: {
  pins: MapPin[];
  competitions: Competition[];
  dict: Dictionary;
}) {
  const [filters, setFilters] = useState<Filters>({
    discipline: "all",
    category: "all",
    competition: "all",
    community: "all",
    status: "all",
  });

  const communities = useMemo(() => Array.from(new Set(pins.map((p) => p.community))).sort(), [pins]);
  const usedCompetitions = useMemo(() => {
    const ids = new Set(pins.flatMap((p) => p.competitionIds));
    return competitions.filter((c) => ids.has(c.id));
  }, [pins, competitions]);

  const filtered = useMemo(
    () =>
      pins.filter((p) => {
        if (filters.discipline !== "all" && !p.disciplines.includes(filters.discipline)) return false;
        if (filters.category !== "all" && !p.categories.includes(filters.category)) return false;
        if (filters.competition !== "all" && !p.competitionIds.includes(filters.competition)) return false;
        if (filters.community !== "all" && p.community !== filters.community) return false;
        if (filters.status === "active" && p.status !== "active") return false;
        if (filters.status === "historical" && p.status === "active") return false;
        return true;
      }),
    [pins, filters],
  );

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const selectClass =
    "w-full rounded-sm border border-line-strong bg-surface px-3 py-2 text-sm text-paper focus:border-gold";

  const labels = {
    viewProfile: dict.teams.viewProfile,
    cityLevel: dict.map.legendCity,
    status: dict.status,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <form className="card h-fit space-y-4 p-5" onSubmit={(e) => e.preventDefault()} aria-label={dict.teams.filters}>
        <Field label={dict.teams.discipline}>
          <select className={selectClass} value={filters.discipline} onChange={(e) => set("discipline", e.target.value as Filters["discipline"])}>
            <option value="all">{dict.teams.all}</option>
            <option value="tackle">{dict.discipline.tackle}</option>
            <option value="flag">{dict.discipline.flag}</option>
          </select>
        </Field>
        <Field label={dict.teams.category}>
          <select className={selectClass} value={filters.category} onChange={(e) => set("category", e.target.value as Filters["category"])}>
            <option value="all">{dict.teams.all}</option>
            {(Object.keys(dict.category) as TeamCategory[]).map((c) => (
              <option key={c} value={c}>
                {dict.category[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.teams.competition}>
          <select className={selectClass} value={filters.competition} onChange={(e) => set("competition", e.target.value)}>
            <option value="all">{dict.teams.all}</option>
            {usedCompetitions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.shortName ?? c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.teams.community}>
          <select className={selectClass} value={filters.community} onChange={(e) => set("community", e.target.value)}>
            <option value="all">{dict.teams.all}</option>
            {communities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.teams.status}>
          <select className={selectClass} value={filters.status} onChange={(e) => set("status", e.target.value as Filters["status"])}>
            <option value="all">{dict.teams.all}</option>
            <option value="active">{dict.status.active}</option>
            <option value="historical">{dict.status.historical}</option>
          </select>
        </Field>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2" aria-live="polite">
          {filtered.length} {dict.map.teamsShown}
        </p>
        <ul className="space-y-1.5 border-t border-line pt-4 text-xs text-muted">
          <li className="flex items-center gap-2">
            <span className="gs-pin" aria-hidden /> {dict.map.legendVenue}
          </li>
          <li className="flex items-center gap-2">
            <span className="gs-pin gs-pin--city" aria-hidden /> {dict.map.legendCity}
          </li>
          <li className="flex items-center gap-2">
            <span className="gs-pin gs-pin--historical" aria-hidden /> {dict.status.historical}
          </li>
        </ul>
      </form>
      <div>
        <TeamMapLoader pins={filtered} labels={labels} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="kicker text-muted-2">{label}</span>
      {children}
    </label>
  );
}
