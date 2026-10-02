import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Stat } from "@/components/ui/Stat";
import { EraSection } from "@/components/history/EraSection";
import { FinalsTable, HonoursTable } from "@/components/history/FinalsTable";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SourceList } from "@/components/articles/SourceList";

export async function generateMetadata({ params }: PageProps<"/[lang]/historia">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.history.title, description: dict.history.intro, routeKey: "history" });
}

export default async function HistoryPage({ params }: PageProps<"/[lang]/historia">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [events, teams, articles, eras, finals] = await Promise.all([
    repo.getTimeline(),
    repo.getTeams(),
    repo.getArticles(),
    repo.getEras(),
    repo.getFinals("lnfa"),
  ]);
  const sourceIds = Array.from(new Set([...events.flatMap((e) => e.sourceIds), ...eras.flatMap((e) => e.sourceIds), ...finals.flatMap((f) => f.sourceIds)]));
  const sources = await repo.getSourcesByIds(sourceIds);
  const pillar = articles.find((a) => a.slug === "historia-futbol-americano-espana");
  const historyArticles = articles.filter((a) => a.category === "historia" && a.slug !== pillar?.slug);
  const firstYear = Math.min(...events.map((e) => e.year));
  const years = new Date().getFullYear() - firstYear;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.history, url: href(locale, "history") },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.history }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {firstYear} → {new Date().getFullYear()}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.history.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.history.intro}</p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{years}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">{dict.history.statsYears}</span>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-turf" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{teams.length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">{dict.history.statsClubs}</span>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-gold" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{finals.filter((f) => f.champion).length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">{dict.history.statsFinals}</span>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-surface-2" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{sources.length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">{dict.history.statsSources}</span>
            </div>
          </div>

          {/* Era navigation */}
          <nav aria-label={dict.history.eras} className="mt-10 flex flex-wrap gap-2">
            {eras.map((era) => (
              <a key={era.id} href={`#${era.id}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
                {t(era.kicker, locale)}
              </a>
            ))}
            <a href="#finales" className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-gold hover:text-gold">
              Spanish Bowl
            </a>
            <a href="#palmares" className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-gold hover:text-gold">
              {dict.history.honours}
            </a>
          </nav>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content space-y-20 py-16 lg:py-20">
        {eras.map((era, i) => (
          <div key={era.id} className={i > 0 ? "border-t border-line pt-16" : ""}>
            <EraSection era={era} index={i} events={events} teams={teams} sources={sources} locale={locale} dict={dict} />
          </div>
        ))}

        <section id="finales" className="border-t border-line pt-16" aria-labelledby="finales-title">
          <header className="mb-6">
            <div className="inline-flex items-center">
              <span className="flex h-7 items-center bg-gold px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ink">
                LNFA
              </span>
              <div className="h-7 w-2 bg-gold/60" />
              <div className="h-7 w-1 bg-gold/30" />
            </div>
          </header>
          <h2 id="finales-title" className="display display-sm mb-3">
            {dict.history.finals}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">{dict.history.finalsIntro}</p>
          <FinalsTable finals={finals} teams={teams} locale={locale} dict={dict} />
        </section>

        <section id="palmares" className="border-t border-line pt-16" aria-labelledby="palmares-title">
          <header className="mb-6">
            <div className="inline-flex items-center">
              <span className="flex h-7 items-center bg-gold px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ink">
                LNFA
              </span>
              <div className="h-7 w-2 bg-gold/60" />
              <div className="h-7 w-1 bg-gold/30" />
            </div>
          </header>
          <h2 id="palmares-title" className="display display-sm mb-3">
            {dict.history.honours}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">{dict.history.honoursIntro}</p>
          <HonoursTable finals={finals} teams={teams} locale={locale} dict={dict} />
        </section>

        <section className="grid gap-6 border-t border-line pt-16 md:grid-cols-2">
          {pillar && (
            <div className="relative border border-line bg-surface p-6">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
              <span className="mb-3 inline-flex h-6 items-center bg-accent px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.15em] text-white">
                {dict.history.pillar}
              </span>
              <Link href={href(locale, "articles", pillar.slug)} className="group">
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-paper transition-colors group-hover:text-accent">
                  {t(pillar.title, locale)}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-muted">{t(pillar.excerpt, locale)}</p>
            </div>
          )}
          <div className="border border-line bg-surface p-6">
            <span className="mb-3 inline-flex h-6 items-center bg-surface-2 px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.15em] text-muted">
              {dict.history.methodology}
            </span>
            <p className="text-sm text-paper-2">{dict.history.methodologyText}</p>
          </div>
        </section>

        {historyArticles.length > 0 && (
          <section className="border-t border-line pt-16">
            <header className="mb-8">
              <div className="inline-flex items-center">
                <span className="flex h-8 items-center bg-accent px-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white">
                  {dict.categories.historia}
                </span>
                <div className="h-8 w-2 bg-accent/60" />
                <div className="h-8 w-1 bg-accent/30" />
              </div>
            </header>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {historyArticles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <SourceList sources={sources} locale={locale} title={dict.common.sources} intro={dict.articles.sourcesIntro} accessedLabel={dict.articles.accessed} />
      </div>
    </>
  );
}
