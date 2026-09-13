import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, teamJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Placeholder } from "@/components/ui/Placeholder";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamMetadata } from "@/components/teams/TeamMetadata";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { RichText } from "@/components/articles/ArticleBody";
import { SourceList } from "@/components/articles/SourceList";
import { TeamMapLoader } from "@/components/map/TeamMapLoader";
import { toMapPins } from "@/components/map/map-data";

export async function generateStaticParams() {
  const teams = await getRepository().getTeams();
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/equipos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const team = await getRepository().getTeamBySlug(slug);
  if (!team) return {};
  const title =
    locale === "es"
      ? `${team.name} — fútbol americano en ${team.city}`
      : `${team.name} — American football in ${team.city}`;
  return buildMetadata({ locale, title, description: t(team.summary, locale), routeKey: "teams", segments: [slug] });
}

export default async function TeamPage({ params }: PageProps<"/[lang]/equipos/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const team = await repo.getTeamBySlug(slug);
  if (!team) notFound();

  const [competitions, articles, sources] = await Promise.all([
    repo.getCompetitions(),
    repo.getArticlesByTeam(team.id),
    repo.getSourcesByIds(team.sourceIds),
  ]);
  const pins = toMapPins([team], competitions, locale);
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.teams, href: href(locale, "teams") },
    { name: team.name },
  ];

  return (
    <>
      <JsonLd data={[teamJsonLd(team, locale), breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "teams", team.slug) })))]} />
      <div className="container-content pt-8">
        <Breadcrumbs items={crumbs} />
      </div>
      <TeamHero team={team} locale={locale} dict={dict} />

      <div className="container-content grid gap-12 py-12 lg:grid-cols-[1fr_22rem] lg:py-16">
        <article className="min-w-0">
          <section aria-labelledby="history-title">
            <h2 id="history-title" className="display display-sm mb-6">
              {dict.teams.history}
            </h2>
            {team.history && team.history.length > 0 ? (
              <div className="prose-editorial">
                {team.history.map((paragraph, i) => (
                  <p key={i}>
                    <RichText text={t(paragraph, locale)} sources={sources} />
                  </p>
                ))}
              </div>
            ) : (
              <Placeholder
                title={dict.articles.researching}
                text={dict.teams.pendingHistory}
                pendingLabel={team.researchNotes ? dict.teams.researchNotes : undefined}
                pending={team.researchNotes ? [t(team.researchNotes, locale)] : undefined}
              />
            )}
          </section>

          <section aria-labelledby="honours-title" className="mt-14">
            <h2 id="honours-title" className="display display-sm mb-6">
              {dict.teams.honours}
            </h2>
            {team.honours.length > 0 ? (
              <ul className="card divide-y divide-line">
                {team.honours.map((honour, i) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <span>
                      <span className="mr-3 font-display text-2xl font-black text-gold">{honour.year}</span>
                      <span className="text-paper">{t(honour.title, locale)}</span>
                    </span>
                    <VerificationBadge status={honour.verificationStatus} label={dict.verification[honour.verificationStatus]} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">{dict.teams.pendingHonours}</p>
            )}
          </section>

          {articles.length > 0 && (
            <section aria-labelledby="related-title" className="mt-14">
              <h2 id="related-title" className="display display-sm mb-6">
                {dict.teams.relatedStories}
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2">
                {articles.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <SourceList
            sources={sources}
            locale={locale}
            title={dict.teams.sources}
            intro={dict.articles.sourcesIntro}
            accessedLabel={dict.articles.accessed}
            lastVerified={team.lastVerifiedAt}
            lastVerifiedLabel={dict.verification.lastVerified}
          />
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TeamMetadata team={team} competitions={competitions} locale={locale} dict={dict} />
          {pins.length > 0 && (
            <div>
              <TeamMapLoader
                pins={pins}
                height="16rem"
                interactive={false}
                labels={{ viewProfile: dict.teams.viewProfile, cityLevel: dict.map.legendCity, clusterHint: dict.map.clusterHint, status: dict.status }}
              />
              <Link href={href(locale, "map")} className="mt-2 inline-block font-mono text-xs uppercase tracking-[0.14em] text-gold hover:text-gold-2">
                {dict.teams.onMap} →
              </Link>
            </div>
          )}
          <Link href={href(locale, "teams")} className="inline-block font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-gold">
            ← {dict.teams.backToTeams}
          </Link>
        </aside>
      </div>
    </>
  );
}
