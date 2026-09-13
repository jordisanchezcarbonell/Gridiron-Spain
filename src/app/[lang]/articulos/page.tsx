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
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.stories }]} />
          <h1 className="display display-md">{dict.articles.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.articles.intro}</p>
        </div>
      </section>
      <div className="container-content space-y-8 py-12">
        {first && <ArticleCard article={first} locale={locale} dict={dict} variant="featured" />}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
