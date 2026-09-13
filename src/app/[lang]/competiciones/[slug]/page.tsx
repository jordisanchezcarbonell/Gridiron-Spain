import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t, formatMonthYear } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { TeamCard } from "@/components/teams/TeamCard";
import { SourceList } from "@/components/articles/SourceList";
import { ArticleCard } from "@/components/articles/ArticleCard";

export async function generateStaticParams() {
  const competitions = await getRepository().getCompetitions();
  return competitions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/competiciones/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const competition = await getRepository().getCompetitionBySlug(slug);
  if (!competition) return {};
  return buildMetadata({
    locale,
    title: competition.name,
    description: t(competition.description, locale),
    routeKey: "competitions",
    segments: [slug],
  });
}

export default async function CompetitionPage({ params }: PageProps<"/[lang]/competiciones/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const competition = await repo.getCompetitionBySlug(slug);
  if (!competition) notFound();

  const [teams, competitions, sources, articles] = await Promise.all([
    repo.getTeams(),
    repo.getCompetitions(),
    repo.getSourcesByIds(competition.sourceIds),
    repo.getArticles(),
  ]);
  const participants = teams.filter((team) => team.currentCompetitions.some((c) => c.competitionId === competition.id));
  const related = articles.filter((a) => a.relatedCompetitionIds.includes(competition.id));
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.competitions, href: href(locale, "competitions") },
    { name: competition.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "competitions", competition.slug) })))} />
      <section className="grain border-b border-line">
        <div className="container-content py-12 md:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">{dict.levels[competition.level]}</Badge>
            <Badge>{dict.discipline[competition.discipline]}</Badge>
            <Badge tone={competition.status === "active" ? "turf" : "outline"}>
              {competition.status === "active" ? dict.status.active : dict.status.historical}
            </Badge>
          </div>
          <h1 className="display display-md mt-4">{competition.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-paper-2">{t(competition.description, locale)}</p>
          <div className="mt-6">
            <VerificationBadge
              size="md"
              status={competition.verificationStatus}
              label={dict.verification[competition.verificationStatus]}
              lastVerifiedLabel={dict.verification.lastVerified}
              lastVerified={competition.lastVerifiedAt ? formatMonthYear(competition.lastVerifiedAt, locale) : undefined}
            />
          </div>
        </div>
      </section>

      <div className="container-content grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {participants.length > 0 && (
            <section>
              <h2 className="display display-sm mb-6">{dict.competitions.teamsIn}</h2>
              <ul className="grid gap-5 sm:grid-cols-2">
                {participants.map((team) => (
                  <li key={team.id}>
                    <TeamCard team={team} competitions={competitions} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="display display-sm mb-6">{dict.articles.related}</h2>
              <ul className="grid gap-5 sm:grid-cols-2">
                {related.map((a) => (
                  <li key={a.id}>
                    <ArticleCard article={a} locale={locale} dict={dict} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <SourceList
            sources={sources}
            locale={locale}
            title={dict.common.sources}
            accessedLabel={dict.articles.accessed}
            lastVerified={competition.lastVerifiedAt}
            lastVerifiedLabel={dict.verification.lastVerified}
          />
        </div>
        <aside>
          <dl className="card divide-y divide-line">
            <Row label={dict.competitions.organizer} value={competition.organizer} />
            <Row label={dict.competitions.level} value={dict.levels[competition.level]} />
            <Row
              label={dict.competitions.founded}
              value={competition.foundedYear ? `${competition.foundedYear}${competition.endedYear ? `–${competition.endedYear}` : ""}` : dict.verification.unverified}
            />
            {competition.website && (
              <Row
                label={dict.competitions.website}
                value={
                  <a href={competition.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-2">
                    {competition.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                }
              />
            )}
          </dl>
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
