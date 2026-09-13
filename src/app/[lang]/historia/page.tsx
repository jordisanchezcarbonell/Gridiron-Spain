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
import { Timeline } from "@/components/history/Timeline";
import { ArticleCard } from "@/components/articles/ArticleCard";

export async function generateMetadata({ params }: PageProps<"/[lang]/historia">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.history.title, description: dict.history.intro, routeKey: "history" });
}

export default async function HistoryPage({ params }: PageProps<"/[lang]/historia">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [events, teams, articles] = await Promise.all([repo.getTimeline(), repo.getTeams(), repo.getArticles()]);
  const sources = await repo.getSourcesByIds(events.flatMap((e) => e.sourceIds));
  const pillar = articles.find((a) => a.slug === "historia-futbol-americano-espana");
  const historyArticles = articles.filter((a) => a.category === "historia" && a.slug !== pillar?.slug);

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
          <p className="kicker mb-4">1987 → 2026</p>
          <h1 className="display display-md max-w-4xl">{dict.history.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.history.intro}</p>
        </div>
      </section>

      <div className="container-content grid gap-12 py-14 lg:grid-cols-[1fr_20rem] lg:py-20">
        <Timeline events={events} teams={teams} sources={sources} locale={locale} dict={dict} />
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {pillar && (
            <div className="card p-5">
              <p className="kicker mb-3">{dict.history.pillar}</p>
              <Link href={href(locale, "articles", pillar.slug)} className="group">
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-paper group-hover:text-gold">
                  {t(pillar.title, locale)}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-muted">{t(pillar.excerpt, locale)}</p>
            </div>
          )}
          <div className="card p-5">
            <p className="kicker mb-3 text-muted-2">{dict.history.methodology}</p>
            <p className="text-sm text-paper-2">{dict.history.methodologyText}</p>
            <p className="mt-3 text-xs text-muted">{dict.verification.explain}</p>
          </div>
        </aside>
      </div>

      {historyArticles.length > 0 && (
        <section className="container-content pb-20">
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
    </>
  );
}
