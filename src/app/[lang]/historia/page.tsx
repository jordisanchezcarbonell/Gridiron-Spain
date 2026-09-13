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
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.history }]} />
          <p className="kicker mb-4">{firstYear} → {new Date().getFullYear()}</p>
          <h1 className="display display-md max-w-4xl">{dict.history.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.history.intro}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            <Stat label={dict.history.statsYears} value={String(years)} />
            <Stat label={dict.history.statsClubs} value={String(teams.length)} />
            <Stat label={dict.history.statsFinals} value={String(finals.filter((f) => f.champion).length)} />
            <Stat label={dict.history.statsSources} value={String(sources.length)} />
          </div>
          <nav aria-label={dict.history.eras} className="mt-8 flex flex-wrap gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
            {eras.map((era) => (
              <a key={era.id} href={`#${era.id}`} className="rounded-full border border-line-strong px-3 py-1.5 text-muted hover:border-gold hover:text-gold">
                {t(era.kicker, locale)}
              </a>
            ))}
            <a href="#finales" className="rounded-full border border-line-strong px-3 py-1.5 text-muted hover:border-gold hover:text-gold">
              Spanish Bowl
            </a>
            <a href="#palmares" className="rounded-full border border-line-strong px-3 py-1.5 text-muted hover:border-gold hover:text-gold">
              {dict.history.honours}
            </a>
          </nav>
        </div>
      </section>

      <div className="container-content space-y-20 py-16 lg:py-20">
        {eras.map((era, i) => (
          <div key={era.id} className={i > 0 ? "rule pt-16" : ""}>
            <EraSection era={era} index={i} events={events} teams={teams} sources={sources} locale={locale} dict={dict} />
          </div>
        ))}

        <section id="finales" className="rule pt-16" aria-labelledby="finales-title">
          <p className="kicker mb-3">LNFA</p>
          <h2 id="finales-title" className="display display-sm mb-3">
            {dict.history.finals}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">{dict.history.finalsIntro}</p>
          <FinalsTable finals={finals} teams={teams} locale={locale} dict={dict} />
        </section>

        <section id="palmares" className="rule pt-16" aria-labelledby="palmares-title">
          <p className="kicker mb-3">LNFA</p>
          <h2 id="palmares-title" className="display display-sm mb-3">
            {dict.history.honours}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">{dict.history.honoursIntro}</p>
          <HonoursTable finals={finals} teams={teams} locale={locale} dict={dict} />
        </section>

        <section className="rule grid gap-6 pt-16 md:grid-cols-2">
          {pillar && (
            <div className="card p-6">
              <p className="kicker mb-3">{dict.history.pillar}</p>
              <Link href={href(locale, "articles", pillar.slug)} className="group">
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-paper group-hover:text-gold">
                  {t(pillar.title, locale)}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-muted">{t(pillar.excerpt, locale)}</p>
            </div>
          )}
          <div className="card p-6">
            <p className="kicker mb-3 text-muted-2">{dict.history.methodology}</p>
            <p className="text-sm text-paper-2">{dict.history.methodologyText}</p>
            <p className="mt-3 text-xs text-muted">{dict.verification.explain}</p>
          </div>
        </section>

        {historyArticles.length > 0 && (
          <section className="rule pt-16">
            <h2 className="display display-sm mb-8">{dict.categories.historia}</h2>
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
