"use client";

import { useMemo, useState } from "react";
import type { Competition, Discipline, TeamCategory } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import type { MapPin } from "./map-data";
import { TeamMapLoader } from "./TeamMapLoader";
import { cx } from "@/lib/utils";

type Filters = {
  discipline: Discipline | "all";
  category: TeamCategory | "all";
  competition: string | "all";
  community: string | "all";
  historical: boolean;
  query: string;
};

const initial: Filters = { discipline: "all", category: "all", competition: "all", community: "all", historical: false, query: "" };

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function MapExplorer({
  pins,
  competitions,
  dict,
}: {
  pins: MapPin[];
  competitions: Competition[];
  dict: Dictionary;
}) {
  const [filters, setFilters] = useState<Filters>(initial);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const communities = useMemo(() => Array.from(new Set(pins.map((p) => p.community))).sort(), [pins]);
  const usedCompetitions = useMemo(() => {
    const ids = new Set(pins.flatMap((p) => p.competitionIds));
    return competitions.filter((c) => ids.has(c.id));
  }, [pins, competitions]);

  const filtered = useMemo(() => {
    const q = normalize(filters.query.trim());
    return pins
      .filter((p) => {
        if (filters.discipline !== "all" && !p.disciplines.includes(filters.discipline)) return false;
        if (filters.category !== "all" && !p.categories.includes(filters.category)) return false;
        if (filters.competition !== "all" && !p.competitionIds.includes(filters.competition)) return false;
        if (filters.community !== "all" && p.community !== filters.community) return false;
        if (!filters.historical && p.status !== "active") return false;
        if (q && !normalize(`${p.name} ${p.city} ${p.community}`).includes(q)) return false;
        return true;
      })
      .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, "es"));
  }, [pins, filters]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setSelectedId(null);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const isDirty = JSON.stringify(filters) !== JSON.stringify(initial);

  const labels = {
    viewProfile: dict.teams.viewProfile,
    cityLevel: dict.map.legendCity,
    clusterHint: dict.map.clusterHint,
    status: dict.status,
    loading: dict.map.loading,
    mapError: dict.map.mapError,
  };

  const categories = useMemo(
    () => Array.from(new Set(pins.flatMap((pin) => pin.categories))),
    [pins],
  );

  const selectClass =
    "h-9 rounded-sm border border-line-strong bg-surface px-3 text-sm text-paper focus:border-gold";

  return (
    <div className="flex flex-col gap-5">
      {/* Filter bar */}
      <form
        className="flex flex-wrap items-center gap-2"
        aria-label={dict.teams.filters}
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex h-9 min-w-64 flex-1 items-center gap-2 rounded-sm border border-line-strong bg-surface px-3 focus-within:border-gold sm:flex-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">{dict.map.search}</span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder={dict.map.search}
            className="w-full bg-transparent text-sm text-paper placeholder:text-muted-2 focus:outline-none"
          />
        </label>
        <label className="sr-only" htmlFor="map-discipline">{dict.teams.discipline}</label>
        <select id="map-discipline" className={selectClass} value={filters.discipline} onChange={(e) => set("discipline", e.target.value as Filters["discipline"])}>
          <option value="all">{dict.teams.discipline}</option><option value="tackle">{dict.discipline.tackle}</option><option value="flag">{dict.discipline.flag}</option>
        </select>
        <label className="sr-only" htmlFor="map-category">{dict.teams.category}</label>
        <select id="map-category" className={selectClass} value={filters.category} onChange={(e) => set("category", e.target.value as Filters["category"])}>
          <option value="all">{dict.teams.category}</option>{categories.map((category) => <option key={category} value={category}>{dict.category[category]}</option>)}
        </select>
        <label className="sr-only" htmlFor="map-competition">
          {dict.teams.competition}
        </label>
        <select id="map-competition" className={selectClass} value={filters.competition} onChange={(e) => set("competition", e.target.value)}>
          <option value="all">{dict.teams.competition}</option>
          {usedCompetitions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.shortName ?? c.name}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="map-community">
          {dict.teams.community}
        </label>
        <select id="map-community" className={selectClass} value={filters.community} onChange={(e) => set("community", e.target.value)}>
          <option value="all">{dict.teams.community}</option>
          {communities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Chip active={filters.historical} onClick={() => set("historical", !filters.historical)} pressed>
          {dict.map.historical}
        </Chip>
      </form>
      <p className="text-sm leading-relaxed text-muted">{dict.map.inactiveNote}</p>

      <div className="flex gap-2 lg:hidden" role="group" aria-label={dict.map.title}>
        <Chip active={mobileView === "list"} onClick={() => setMobileView("list")}>{dict.map.viewList}</Chip>
        <Chip active={mobileView === "map"} onClick={() => setMobileView("map")}>{dict.map.viewMap}</Chip>
      </div>

      {/* Explorer: map first on mobile, list + map on desktop */}
      <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className={cx("relative order-1 lg:order-2", mobileView !== "map" && "hidden lg:block")}>
          <TeamMapLoader
            pins={filtered}
            labels={labels}
            height="clamp(24rem, 62vh, 44rem)"
            hoveredId={hoveredId}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
          <ul className="pointer-events-none absolute bottom-3 left-3 z-[400] flex flex-wrap gap-3 rounded-sm border border-line bg-ink/85 px-3 py-2 text-[0.7rem] text-muted backdrop-blur">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-gold" /> {dict.map.legendVenue}
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-muted" /> {dict.map.legendCity}
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full border border-muted" /> {dict.map.legendHistorical}
            </li>
          </ul>
        </div>

        <div className={cx("card order-2 flex flex-col overflow-hidden lg:order-1", mobileView !== "list" && "hidden lg:flex")} style={{ maxHeight: "clamp(24rem, 62vh, 44rem)" }}>
          <div className="flex items-center justify-between border-b border-line bg-ink-2 px-4 py-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted" aria-live="polite">
              {filtered.length} {dict.map.listHeader}
            </p>
            {isDirty && (
              <button
                type="button"
                onClick={() => {
                  setFilters(initial);
                  setSelectedId(null);
                }}
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold hover:text-gold-2"
              >
                {dict.map.clear}
              </button>
            )}
          </div>
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted">{dict.map.noResults}</p>
          ) : (
            <ul className="overflow-y-auto">
              {filtered.map((pin) => {
                const active = selectedId === pin.id;
                const inactive = pin.status !== "active";
                return (
                  <li key={pin.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(active ? null : pin.id)}
                      onMouseEnter={() => setHoveredId(pin.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(pin.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-pressed={active}
                      className={cx(
                        "flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left transition-colors hover:bg-surface-2",
                        active && "bg-surface-2 shadow-[inset_3px_0_0_var(--color-gold)]",
                      )}
                    >
                      <span
                        className={cx(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-line-strong bg-surface-2 font-display text-sm font-black",
                          inactive ? "text-muted" : "text-paper-2",
                        )}
                      >
                        {pin.monogram}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-lg font-extrabold uppercase leading-none text-paper">
                          {pin.name}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted">
                          {pin.city} · {pin.community}
                        </span>
                      </span>
                      <span
                        className={cx(
                          "shrink-0 rounded-sm border px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em]",
                          inactive
                            ? "border-line-strong text-muted"
                            : pin.rank <= 1
                              ? "border-gold/30 bg-gold/15 text-gold"
                              : "border-line bg-surface-2 text-paper-2",
                        )}
                      >
                        {inactive ? dict.status[pin.status] : (pin.competitionLabel ?? dict.status.active)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  pressed,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed ? active : undefined}
      className={cx(
        "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors",
        active
          ? "border-gold bg-gold text-ink"
          : "border-line-strong bg-surface text-paper-2 hover:border-gold hover:text-gold",
      )}
    >
      {children}
    </button>
  );
}
