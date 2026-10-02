import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";

export async function generateMetadata({ params }: PageProps<"/[lang]/articulos">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.articles.title, description: dict.articles.intro, routeKey: "articles" });
}

export default async function ArticlesPage({ params }: PageProps<"/[lang]/articulos">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const articles = await getRepository().getArticles();
  const [first, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.stories, url: href(locale, "articles") },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.stories }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.stories}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.articles.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.articles.intro}</p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{articles.length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                {locale === "es" ? "historias publicadas" : "published stories"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      {/* Featured story */}
      {first && (
        <section className="border-b border-line bg-ink-2">
          <div className="container-content py-10 md:py-14">
            <header className="mb-8">
              <div className="inline-flex items-center">
                <span className="flex h-8 items-center bg-accent px-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white">
                  {dict.home.featured}
                </span>
                <div className="h-8 w-2 bg-accent/60" />
                <div className="h-8 w-1 bg-accent/30" />
              </div>
            </header>
            <ArticleCard article={first} locale={locale} dict={dict} variant="featured" />
          </div>
        </section>
      )}

      {/* Rest of articles */}
      <section className="container-content py-10 md:py-14">
        <header className="mb-8">
          <div className="inline-flex items-center">
            <span className="flex h-7 items-center bg-surface-2 px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-paper">
              {locale === "es" ? "Todas las historias" : "All stories"}
            </span>
          </div>
        </header>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
