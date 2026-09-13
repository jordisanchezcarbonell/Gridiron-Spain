"use client";

import { useMemo, useState } from "react";
import type { Discipline, TeamCategory } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import type { Place } from "@/data/geo/spain-places";
import type { MapPin } from "@/components/map/map-data";
import { TeamMapLoader } from "@/components/map/TeamMapLoader";
import { distanceKm } from "@/lib/geo";
import { cx } from "@/lib/utils";

type Want = "any" | Discipline | "women" | "youth";
type Origin = { label: string; latitude: number; longitude: number };

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function findPlace(query: string, places: Place[]): Place | null {
  const q = normalize(query);
  if (!q) return null;
  const exact = places.find((p) => normalize(p.name) === q || p.aliases?.some((a) => normalize(a) === q));
  if (exact) return exact;
  const prefix = places.find((p) => normalize(p.name).startsWith(q) || p.aliases?.some((a) => normalize(a).startsWith(q)));
  if (prefix) return prefix;
  return places.find((p) => normalize(p.name).includes(q)) ?? null;
}

function matchesWant(pin: MapPin, want: Want) {
  if (want === "any") return true;
  if (want === "tackle" || want === "flag") return pin.disciplines.includes(want);
  if (want === "women") return pin.categories.includes("senior-women");
  const youth: TeamCategory[] = ["junior", "youth"];
  return pin.categories.some((c) => youth.includes(c));
}

export function NearYouFinder({
  pins,
  places,
  dict,
  initialQuery = "",
}: {
  pins: MapPin[];
  places: Place[];
  dict: Dictionary;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [origin, setOrigin] = useState<Origin | null>(() => {
    const place = findPlace(initialQuery, places);
    return place ? { label: place.name, latitude: place.latitude, longitude: place.longitude } : null;
  });
  const [want, setWant] = useState<Want>("any");
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const suggestions = useMemo(() => places.map((p) => p.name).sort((a, b) => a.localeCompare(b, "es")), [places]);

  const results = useMemo(() => {
    if (!origin) return [];
    return pins
      .filter((p) => p.status === "active" && matchesWant(p, want))
      .map((p) => ({ pin: p, km: distanceKm(origin, p) }))
      .sort((a, b) => a.km - b.km);
  }, [origin, pins, want]);

  const shown = results.slice(0, limit);

  function submit(value: string) {
    const place = findPlace(value, places);
    if (!place) {
      setOrigin(null);
      setError(dict.near.notFound);
      return;
    }
    setError(null);
    setLimit(5);
    setSelectedId(null);
    setQuery(place.name);
    setOrigin({ label: place.name, latitude: place.latitude, longitude: place.longitude });
  }

  function locate() {
    if (!("geolocation" in navigator)) {
      setError(dict.near.locationDenied);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setError(null);
        setLimit(5);
        setSelectedId(null);
        setQuery("");
        setOrigin({ label: dict.near.yourLocation, latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      () => {
        setLocating(false);
        setError(dict.near.locationDenied);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
  }

  const wants: Array<{ key: Want; label: string }> = [
    { key: "any", label: dict.near.any },
    { key: "tackle", label: dict.discipline.tackle },
    { key: "flag", label: dict.discipline.flag },
    { key: "women", label: dict.map.women },
    { key: "youth", label: dict.map.youth },
  ];

  const mapPins = shown.map((r) => r.pin);
  const labels = { viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status };

  return (
    <div className="flex flex-col gap-6">
      <form
        className="card flex flex-col gap-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex h-12 flex-1 items-center gap-2 rounded-sm border border-line-strong bg-ink-2 px-3 focus-within:border-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-2" aria-hidden>
              <path d="M12 21s-6-5.7-6-11a6 6 0 1 1 12 0c0 5.3-6 11-6 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="sr-only">{dict.near.placeholder}</span>
            <input
              list="gs-places"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.near.placeholder}
              autoComplete="off"
              className="w-full bg-transparent text-base text-paper placeholder:text-muted-2 focus:outline-none"
            />
            <datalist id="gs-places">
              {suggestions.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </label>
          <button
            type="submit"
            className="h-12 rounded-sm bg-gold px-6 font-display text-base font-bold uppercase tracking-[0.08em] text-ink hover:bg-gold-2"
          >
            {dict.near.cta}
          </button>
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="h-12 rounded-sm border border-line-strong px-4 font-display text-base font-bold uppercase tracking-[0.08em] text-paper hover:border-gold hover:text-gold disabled:opacity-60"
          >
            {locating ? dict.near.locating : dict.near.useLocation}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={dict.near.filters}>
          <span className="kicker mr-1 text-muted-2">{dict.near.filters}</span>
          {wants.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => {
                setWant(w.key);
                setLimit(5);
                setSelectedId(null);
              }}
              aria-pressed={want === w.key}
              className={cx(
                "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors",
                want === w.key ? "border-gold bg-gold text-ink" : "border-line-strong bg-surface text-paper-2 hover:border-gold hover:text-gold",
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
        {error && (
          <p role="alert" className="text-sm text-amber">
            {error}
          </p>
        )}
      </form>

      {origin && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section aria-live="polite">
            <h2 className="display display-sm mb-4">
              {dict.near.resultsFor} <span className="text-gold">{origin.label}</span>
            </h2>
            {shown.length === 0 ? (
              <p className="card p-6 text-muted">{dict.teams.noResults}</p>
            ) : (
              <ol className="card divide-y divide-line">
                {shown.map(({ pin, km }, i) => (
                  <li key={pin.id}>
                    <a
                      href={pin.href}
                      onMouseEnter={() => setSelectedId(pin.id)}
                      onFocus={() => setSelectedId(pin.id)}
                      className={cx("flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2", selectedId === pin.id && "bg-surface-2")}
                    >
                      <span className="w-6 font-mono text-sm text-muted-2">{i + 1}</span>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-line-strong bg-surface-2 font-display text-base font-black text-paper-2">
                        {pin.monogram}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-xl font-extrabold uppercase leading-none text-paper">{pin.name}</span>
                        <span className="mt-1 block truncate text-xs text-muted">
                          {pin.city}
                          {pin.competitionLabel ? ` · ${pin.competitionLabel}` : ""}
                          {" · "}
                          {pin.disciplines.map((d) => dict.discipline[d]).join(" · ")}
                          {pin.categories.includes("senior-women") ? ` · ${dict.map.women}` : ""}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-display text-2xl font-black leading-none text-gold">{Math.round(km)}</span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-2">{dict.near.kmAway}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
            {results.length > shown.length && (
              <button
                type="button"
                onClick={() => setLimit((n) => n + 5)}
                className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-gold hover:text-gold-2"
              >
                {dict.near.showMore} ({results.length - shown.length})
              </button>
            )}
            <p className="mt-4 text-xs text-muted-2">{dict.near.hint}</p>
          </section>
          <div>
            <TeamMapLoader pins={mapPins} labels={labels} height="26rem" selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>
      )}
    </div>
  );
}
