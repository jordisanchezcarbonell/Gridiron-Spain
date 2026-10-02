import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { buildPlayerProfiles } from "@/lib/players";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { SourceList } from "@/components/articles/SourceList";

async function getProfile(slug: string) {
  const profiles = buildPlayerProfiles(await getRepository().getPlayerSpotlights());
  return profiles.find((p) => p.slug === slug && p.hasPage) ?? null;
}

export async function generateStaticParams() {
  const profiles = buildPlayerProfiles(await getRepository().getPlayerSpotlights());
  return profiles.filter((p) => p.hasPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/jugadores/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const profile = await getProfile(slug);
  if (!profile) return {};
  const s = profile.spotlights[0];
  return buildMetadata({
    locale,
    title: `${profile.name} · ${s.position} · ${s.team}`,
    description: t(s.note, locale),
    routeKey: "players",
    segments: [slug],
  });
}

export default async function PlayerPage({ params }: PageProps<"/[lang]/jugadores/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const profile = await getProfile(slug);
  if (!profile) notFound();
  const repo = getRepository();
  const s = profile.spotlights[0];
  const [sources, teams] = await Promise.all([
    repo.getSourcesByIds(Array.from(new Set(profile.spotlights.flatMap((x) => x.sourceIds)))),
    repo.getTeamsByIds(Array.from(new Set(profile.spotlights.map((x) => x.teamId).filter((id): id is string => Boolean(id))))),
  ]);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.players, href: href(locale, "players") },
    { name: profile.name },
  ];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(s.hometown ? { homeLocation: { "@type": "Place", name: s.hometown } } : {}),
    memberOf: { "@type": "SportsTeam", name: s.team, sport: "American football" },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "players", slug) }))), person]} />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div className="container-content relative py-12 md:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mb-4 mt-6 flex flex-wrap gap-2">
            <Badge tone="accent">{s.position}</Badge>
            <Badge tone="outline">{s.league}</Badge>
            <Badge>{dict.rankings.playerGroups[s.group]}</Badge>
          </div>
          <h1 className="display display-lg">{profile.name}</h1>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content grid gap-12 py-12 md:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <h2 className="display display-sm mb-5">{dict.players.highlights}</h2>
          <ul className="grid gap-4">
            {profile.spotlights.map((x) => (
              <li key={x.id} className="border-l-2 border-accent pl-4 text-lg leading-relaxed text-paper-2">
                {t(x.note, locale)}
              </li>
            ))}
          </ul>
          <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} />
          <p className="mt-10">
            <Link href={href(locale, "players")} className="text-accent hover:text-accent-bright">
              ← {dict.players.all}
            </Link>
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative border border-line bg-surface">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
            <dl className="divide-y divide-line">
              <Row label={dict.players.position} value={s.position} />
              <Row
                label={dict.players.team}
                value={
                  teams[0] ? (
                    <Link href={href(locale, "teams", teams[0].slug)} className="text-accent hover:text-accent-bright">
                      {s.team}
                    </Link>
                  ) : (
                    s.team
                  )
                }
              />
              <Row label={dict.players.league} value={s.league} />
              {s.hometown && <Row label={dict.players.hometown} value={s.hometown} />}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-5 py-4">
      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{label}</dt>
      <dd className="text-sm text-paper">{value}</dd>
    </div>
  );
}
