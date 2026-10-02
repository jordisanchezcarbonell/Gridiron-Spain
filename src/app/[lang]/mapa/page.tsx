import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { MapExplorer } from "@/components/map/MapExplorer";
import { toMapPins } from "@/components/map/map-data";
import { TILE_ORIGIN } from "@/components/map/tiles";

export async function generateMetadata({ params }: PageProps<"/[lang]/mapa">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.map.title, description: dict.map.intro, routeKey: "map" });
}

export default async function MapPage({ params }: PageProps<"/[lang]/mapa">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  preconnect(TILE_ORIGIN);
  const repo = getRepository();
  const [teams, competitions] = await Promise.all([repo.getTeams(), repo.getCompetitions()]);
  const pins = toMapPins(teams, competitions, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.map, url: href(locale, "map") },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />

        <div className="container-content relative py-12 md:py-16">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.map }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.map}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg">{dict.map.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.map.intro}</p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <span className="block font-display text-3xl font-black leading-none text-paper">{teams.filter((t) => t.status === "active").length}</span>
              <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                {locale === "es" ? "equipos activos" : "active teams"}
              </span>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-turf" />
              <span className="block font-display text-3xl font-black leading-none text-paper">{new Set(teams.map((t) => t.autonomousCommunity)).size}</span>
              <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                {dict.teams.communitiesCount}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-10">
        <MapExplorer pins={pins} competitions={competitions} dict={dict} />
      </div>
    </>
  );
}
