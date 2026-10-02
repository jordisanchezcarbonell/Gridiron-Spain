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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.near.title }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.teams}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.near.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.near.intro}</p>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-10 md:py-14">
        <NearYouFinder pins={pins} places={spainPlaces} dict={dict} />
      </div>
    </>
  );
}
