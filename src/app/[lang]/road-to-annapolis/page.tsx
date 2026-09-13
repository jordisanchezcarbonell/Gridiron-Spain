import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { roadChapters, roadStops, gameFacts, roadCopy } from "@/data/road";
import { JsonLd } from "@/components/seo/JsonLd";
import { RoadHero } from "@/components/road/RoadHero";
import { ChapterList } from "@/components/road/ChapterList";
import { GameCard } from "@/components/road/GameCard";
import { PartnerLogo } from "@/components/road/PartnerLogo";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RichText } from "@/components/articles/ArticleBody";
import { SourceList } from "@/components/articles/SourceList";

export async function generateMetadata({ params }: PageProps<"/[lang]/road-to-annapolis">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: `Road to Annapolis — ${dict.road.title}`,
    description: dict.road.sub,
    routeKey: "roadToAnnapolis",
  });
}

export default async function RoadPage({ params }: PageProps<"/[lang]/road-to-annapolis">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [articles, partners] = await Promise.all([repo.getArticlesByCategory("road-to-annapolis"), repo.getConfirmedPartners()]);
  const sourceIds = Array.from(new Set([...gameFacts.flatMap((f) => f.sourceIds), ...roadCopy.sourceIds]));
  const sources = await repo.getSourcesByIds(sourceIds);
  const gameSources = sources.filter((s) => gameFacts.some((f) => f.sourceIds.includes(s.id)));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.road, url: href(locale, "roadToAnnapolis") },
        ])}
      />
      <RoadHero stops={roadStops} locale={locale} dict={dict} />

      {/* THE STORY */}
      <section className="container-content grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-24" aria-labelledby="story">
        <div>
          <p className="kicker mb-3">01</p>
          <h2 id="story" className="display display-md">
            {dict.road.theStory}
          </h2>
        </div>
        <div className="prose-editorial">
          {roadCopy.story.map((p, i) => (
            <p key={i}>
              <RichText text={t(p, locale)} sources={sources} />
            </p>
          ))}
        </div>
      </section>

      {/* WHY NAVY */}
      <section className="border-y border-line bg-ink-2" aria-labelledby="why-navy">
        <div className="container-content grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
          <div>
            <p className="kicker mb-3">02</p>
            <h2 id="why-navy" className="display display-md">
              {dict.road.whyNavy}
            </h2>
          </div>
          <div className="prose-editorial">
            {roadCopy.whyNavy.map((p, i) => (
              <p key={i}>
                <RichText text={t(p, locale)} sources={sources} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section className="container-content py-16 md:py-24" aria-labelledby="journey">
        <div className="mb-10">
          <p className="kicker mb-3">03</p>
          <h2 id="journey" className="display display-md">
            {dict.road.theJourney}
          </h2>
        </div>
        <ol className="grid gap-4 md:grid-cols-4">
          {roadStops.map((stop, i) => (
            <li key={stop.id} className="card relative p-5">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-3xl font-black uppercase leading-none text-paper">{stop.name}</p>
              <p className="mt-2 text-sm text-muted">{t(stop.label, locale)}</p>
            </li>
          ))}
        </ol>
        <div className="prose-editorial mt-10 max-w-3xl">
          {roadCopy.journey.map((p, i) => (
            <p key={i}>
              <RichText text={t(p, locale)} sources={sources} />
            </p>
          ))}
        </div>
      </section>

      {/* THE GAME */}
      <section className="border-y border-line bg-ink-2" aria-labelledby="game">
        <div className="container-content grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
          <div>
            <p className="kicker mb-3">04</p>
            <h2 id="game" className="display display-md">
              {dict.road.theGame}
            </h2>
            <p className="mt-4 text-muted">{t(roadCopy.gameNote, locale)}</p>
          </div>
          <GameCard facts={gameFacts} sources={gameSources} locale={locale} dict={dict} />
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="container-content py-16 md:py-24" aria-labelledby="chapters">
        <SectionHeader kicker="05" title={dict.road.chapters} />
        <ChapterList chapters={roadChapters} locale={locale} dict={dict} />
      </section>

      {/* ARTICLES */}
      {articles.length > 0 && (
        <section className="border-t border-line bg-ink-2" aria-labelledby="road-articles">
          <div className="container-content py-16 md:py-24">
            <SectionHeader kicker="06" title={dict.road.articles} />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PARTNERS */}
      <section className="container-content py-16 md:py-24" aria-labelledby="partners">
        <SectionHeader kicker="07" title={dict.road.partners} />
        {partners.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <li key={p.id}>
                <PartnerLogo partner={p} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="card border-dashed p-8 text-center">
            <p className="mx-auto max-w-xl text-muted">{dict.road.partnersEmpty}</p>
            <p className="mt-6 font-display text-xl font-bold uppercase text-paper">{dict.road.partnerCta}</p>
            <ButtonLink href={href(locale, "mediaKit")} variant="secondary" className="mt-4">
              {dict.road.mediaKit}
            </ButtonLink>
          </div>
        )}
        <SourceList
          sources={sources}
          locale={locale}
          title={dict.common.sources}
          intro={dict.articles.sourcesIntro}
          accessedLabel={dict.articles.accessed}
          lastVerified={roadCopy.lastVerifiedAt}
          lastVerifiedLabel={dict.verification.lastVerified}
        />
      </section>
    </>
  );
}
