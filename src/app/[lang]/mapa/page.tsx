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
      <section className="border-b border-line">
        <div className="container-content py-12 md:py-16">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.map }]} />
          <h1 className="display display-md">{dict.map.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-paper-2">{dict.map.intro}</p>
        </div>
      </section>
      <div className="container-content py-10">
        <MapExplorer pins={pins} competitions={competitions} dict={dict} />
      </div>
    </>
  );
}
