import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { spainPlaces } from "@/data/geo/spain-places";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { toMapPins } from "@/components/map/map-data";
import { TILE_ORIGIN } from "@/components/map/tiles";
import { NearYouFinder } from "@/components/near/NearYouFinder";

export async function generateMetadata({ params }: PageProps<"/[lang]/cerca-de-ti">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const title =
    locale === "es"
      ? "Dónde jugar fútbol americano cerca de ti"
      : "Where to play American football near you in Spain";
  return buildMetadata({ locale, title, description: dict.near.intro, routeKey: "nearYou" });
}

export default async function NearYouPage({ params }: PageProps<"/[lang]/cerca-de-ti">) {
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
          { name: dict.near.title, url: href(locale, "nearYou") },
        ])}
      />
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.near.title }]} />
          <p className="kicker mb-4">{dict.nav.teams}</p>
          <h1 className="display display-md">{dict.near.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.near.intro}</p>
        </div>
      </section>
      <div className="container-content py-10">
        <NearYouFinder pins={pins} places={spainPlaces} dict={dict} />
      </div>
    </>
  );
}
