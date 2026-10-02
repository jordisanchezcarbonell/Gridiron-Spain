import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { buildPlayerProfiles } from "@/lib/players";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import type { PlayerGroup } from "@/types";

const ORDER: PlayerGroup[] = ["spain-lnfa", "spain-national-team", "spain-prospect", "europe", "spain-nfl", "spain-ncaa", "ncaa-star", "ncaa-prospect"];

export async function generateMetadata({ params }: PageProps<"/[lang]/jugadores">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.players.title, description: dict.players.intro, routeKey: "players" });
}

export default async function PlayersPage({ params }: PageProps<"/[lang]/jugadores">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const profiles = buildPlayerProfiles(await getRepository().getPlayerSpotlights());

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.players, url: href(locale, "players") },
        ])}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div className="container-content relative py-12 md:py-16">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.players }]} />
          <h1 className="display display-lg mt-6 max-w-4xl">{dict.players.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.players.intro}</p>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-12 md:py-14">
        {ORDER.map((group) => {
          const list = profiles.filter((p) => p.spotlights[0].group === group);
          if (list.length === 0) return null;
          return (
            <section key={group} className="mb-12">
              <h2 className="display display-sm mb-5">{dict.rankings.playerGroups[group]}</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => {
                  const s = p.spotlights[0];
                  const body = (
                    <>
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="accent">{s.position}</Badge>
                        <Badge tone="outline">{s.league}</Badge>
                      </div>
                      <p className="mt-3 font-display text-xl font-bold text-paper">{p.name}</p>
                      <p className="text-sm text-paper-2">{s.team}</p>
                    </>
                  );
                  return (
                    <li key={p.slug}>
                      {p.hasPage ? (
                        <Link href={href(locale, "players", p.slug)} className="block h-full border border-line bg-surface p-5 transition-colors hover:border-accent">
                          {body}
                        </Link>
                      ) : (
                        <div className="h-full border border-line bg-surface/60 p-5" title={dict.players.noPage}>
                          {body}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
