import type { Locale } from "@/types/common";
import type { RoadStop } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t } from "@/lib/i18n/text";
import { distanceKm, formatCoordinate } from "@/lib/geo";

export function RoadHero({ stops, locale, dict }: { stops: RoadStop[]; locale: Locale; dict: Dictionary }) {
  const origin = stops[0];
  const destination = stops[stops.length - 1];
  const km = Math.round(distanceKm(origin, destination) / 10) * 10;

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, rgb(214 168 75 / 0.16), transparent 60%), radial-gradient(50% 50% at 90% 90%, rgb(63 143 90 / 0.12), transparent 60%)",
        }}
      />
      <div className="container-content relative grid gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div>
          <p className="kicker mb-4">{dict.road.kicker}</p>
          <h1 className="display display-lg">
            From <span className="text-gold">Barcelona</span>
            <br />
            to Annapolis
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper-2 md:text-xl">{dict.road.sub}</p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [dict.road.who, dict.road.whoValue],
              [dict.road.plannedDates, dict.road.plannedDatesValue],
              [dict.road.purpose, dict.road.purposeValue],
            ].map(([term, value]) => (
              <div key={term} className="border-l-2 border-gold/70 pl-3">
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-2">{term}</dt>
                <dd className="mt-1 text-sm font-medium leading-snug text-paper-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative flex flex-col gap-0 font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-4" aria-label="Route">
          {stops.map((stop, i) => (
            <li key={stop.id} className="relative pl-8">
              <span
                aria-hidden
                className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                  i === stops.length - 1 ? "border-gold bg-gold" : "border-gold bg-ink"
                }`}
              />
              {i < stops.length - 1 && (
                <span aria-hidden className="absolute left-[6px] top-5 h-[calc(100%-0.5rem)] w-px border-l border-dashed border-gold-dim" />
              )}
              <p className="font-display text-3xl font-black uppercase tracking-normal text-paper md:text-4xl">
                {stop.name}
              </p>
              <p className="mb-8 mt-1 text-[0.68rem] text-muted-2">
                {formatCoordinate(stop.latitude, "lat")} · {formatCoordinate(stop.longitude, "lon")} · {t(stop.label, locale)}
              </p>
            </li>
          ))}
          <li className="mt-2 border-t border-line pt-4 pl-8">
            <p className="text-[0.68rem] text-muted-2">{dict.road.distance}</p>
            <p className="font-display text-3xl font-black tracking-normal text-gold">
              {new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB").format(km)}+ {dict.common.km}
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
