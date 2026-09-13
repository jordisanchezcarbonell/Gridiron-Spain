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
import { ChapterList } from "@/components/road/ChapterList";
import { GameCard } from "@/components/road/GameCard";
import { PartnerLogo } from "@/components/road/PartnerLogo";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RichText } from "@/components/articles/ArticleBody";
import { SourceList } from "@/components/articles/SourceList";
import { roadProposal } from "@/data/road/proposal";

export async function generateMetadata({ params }: PageProps<"/[lang]/road-to-annapolis">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: `Road to Annapolis — ${dict.road.title}`,
    description: dict.road.sub,
    routeKey: "roadToAnnapolis",
    image: `/${locale}/road-to-annapolis/opengraph-image`,
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
  const proposal = {
    who: locale === "es" ? "Quién está detrás" : "Who is behind it",
    content: locale === "es" ? "Contenido propuesto" : "Proposed content",
    support: locale === "es" ? "Apoyo solicitado" : "Support requested",
    samples: locale === "es" ? "Muestras publicadas" : "Published samples",
    contact: locale === "es" ? "Contacto" : "Contact",
    view: locale === "es" ? "Ver la propuesta" : "View the proposal",
    write: locale === "es" ? "Contacta con Jordi" : "Contact Jordi",
    intro: locale === "es" ? "Jordi Sánchez es desarrollador web y aficionado al fútbol americano desde Barcelona. Es el creador de Gridiron Spain, un proyecto editorial independiente recién lanzado, y prepara este viaje con otro aficionado." : "Jordi Sánchez is a web developer and American football fan from Barcelona. He created Gridiron Spain, a newly launched independent editorial project, and is preparing this trip with another fan.",
    samplesList: locale === "es" ? [["Football en Barcelona", href(locale, "articles", "football-en-barcelona")], ["Badalona Dracs", href(locale, "teams", "badalona-dracs")], ["Mapa de clubes", href(locale, "map")]] : [["Football in Barcelona", href(locale, "articles", "football-en-barcelona")], ["Badalona Dracs", href(locale, "teams", "badalona-dracs")], ["Club map", href(locale, "map")]],
  };
  const mailto = `mailto:${roadProposal.contact.email}?subject=${encodeURIComponent("Gridiron Spain — Navy Football collaboration")}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.road, url: href(locale, "roadToAnnapolis") },
        ])}
      />
      <section className="relative overflow-hidden border-b border-line bg-ink-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-50" />
        <div className="container-content relative grid gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="kicker mb-4">{dict.road.kicker}</p>
            <h1 className="display display-lg">From <span className="text-gold">Barcelona</span><br />to Annapolis</h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-paper-2">{t(roadProposal.visit, locale)}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-2 md:text-xl">{t(roadProposal.intro, locale)}</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-gold">{t(roadProposal.status, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="#propuesta" size="lg">{proposal.view}</ButtonLink><ButtonLink href={mailto} variant="secondary" size="lg">{proposal.write}</ButtonLink></div>
          </div>
          <aside className="card self-start p-6">
            <p className="kicker mb-3">{proposal.contact}</p>
            <p className="font-display text-3xl font-black uppercase text-paper">{roadProposal.contact.name}</p>
            <p className="mt-1 text-paper-2">{t(roadProposal.contact.city, locale)}</p>
            <a className="mt-4 block text-gold underline underline-offset-4" href={mailto}>{roadProposal.contact.email}</a>
            <a className="mt-2 inline-block text-sm text-muted hover:text-gold" href={roadProposal.contact.website} rel="noopener noreferrer">jordisanchezweb.es</a>
            <p className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted">{t(roadProposal.independence, locale)}</p>
          </aside>
        </div>
      </section>

      <section className="container-content grid gap-6 py-16 md:grid-cols-3 md:py-20">
        <section className="card p-6"><p className="kicker mb-3">01</p><h2 className="display display-sm">{proposal.who}</h2><p className="mt-4 leading-relaxed text-paper-2">{proposal.intro}</p></section>
        <section id="propuesta" className="card p-6 scroll-mt-8 md:col-span-2"><p className="kicker mb-3">02</p><h2 className="display display-sm">{proposal.content}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-3">{roadProposal.deliverables.map((item) => <li key={item.title.en} className="border-l-2 border-gold pl-3"><h3 className="font-display text-xl font-bold uppercase text-paper">{t(item.title, locale)}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{t(item.text, locale)}</p></li>)}</ul><p className="mt-5 text-sm leading-relaxed text-muted">{t(roadProposal.terms, locale)}</p></section>
        <section className="card p-6 md:col-span-2"><p className="kicker mb-3">03</p><h2 className="display display-sm">{proposal.support}</h2><p className="mt-4 text-lg leading-relaxed text-paper-2">{t(roadProposal.support, locale)}</p><p className="mt-3 text-sm text-muted">{t(roadProposal.guidance, locale)}</p><p className="mt-3 text-sm text-muted">{t(roadProposal.boundaries, locale)}</p></section>
        <section className="card p-6"><p className="kicker mb-3">04</p><h2 className="display display-sm">{proposal.samples}</h2><ul className="mt-4 space-y-2">{proposal.samplesList.map(([name, url]) => <li key={url as string}><a className="text-gold underline underline-offset-4" href={url as string}>{name} →</a></li>)}</ul></section>
      </section>

      {/* THE STORY */}
      <section className="container-content grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-24" aria-labelledby="story">
        <div>
          <p className="kicker mb-3">05 · {locale === "es" ? "Sobre el viaje" : "About the trip"}</p>
          <h2 id="story" className="display display-md">
            {dict.road.theStory}
          </h2>
        </div>
        <div className="prose-editorial">
          {roadCopy.story.slice(1, 2).map((p, i) => (
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
            <p className="kicker mb-3">06</p>
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
          <p className="kicker mb-3">07</p>
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
            <p className="kicker mb-3">08</p>
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
        <SectionHeader kicker="09" title={dict.road.chapters} />
        <ChapterList chapters={roadChapters} locale={locale} dict={dict} />
      </section>

      {/* ARTICLES */}
      {articles.length > 0 && (
        <section className="border-t border-line bg-ink-2" aria-labelledby="road-articles">
          <div className="container-content py-16 md:py-24">
            <SectionHeader kicker="10" title={dict.road.articles} />
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

      <section className="container-content py-16 md:py-24" aria-labelledby="partners">
        {partners.length > 0 ? (
          <><SectionHeader kicker="11" title={dict.road.partners} /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{partners.map((p) => <li key={p.id}><PartnerLogo partner={p} locale={locale} /></li>)}</ul></>
        ) : (
          <p className="mb-8 text-sm text-muted">{dict.road.partnersEmpty} <ButtonLink href={href(locale, "mediaKit")} variant="ghost" size="sm">{dict.road.mediaKit} →</ButtonLink></p>
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
        <div className="mt-12 border-t border-line pt-8 text-center">
          <p className="font-display text-2xl font-bold uppercase text-paper">{proposal.contact}</p>
          <a className="mt-3 inline-block text-gold underline underline-offset-4" href={mailto}>{roadProposal.contact.email}</a>
        </div>
      </section>
    </>
  );
}
