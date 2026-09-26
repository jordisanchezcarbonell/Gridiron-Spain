import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { absoluteUrl } from "@/lib/site";
import { authors } from "@/data/authors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleHero } from "@/components/articles/ArticleHero";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SourceList } from "@/components/articles/SourceList";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArticleToc } from "@/components/articles/ArticleToc";

export async function generateStaticParams() {
  const articles = await getRepository().getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articulos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const article = await getRepository().getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    locale,
    title: t(article.seo?.title ?? article.title, locale),
    description: t(article.seo?.description ?? article.excerpt, locale),
    routeKey: "articles",
    segments: [slug],
    availableLocales: article.availableLocales,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    image: article.heroImage?.url ?? `${href(locale, "articles", slug)}/opengraph-image`,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/articulos/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const article = await repo.getArticleBySlug(slug);
  if (!article) notFound();

  const author = authors.find((a) => a.id === article.authorId) ?? authors[0];
  const [sources, relatedTeams, sameCategory] = await Promise.all([
    repo.getSourcesByIds(article.sourceIds),
    repo.getTeamsByIds(article.relatedTeamIds),
    repo.getArticlesByCategory(article.category),
  ]);
  const related = sameCategory.filter((a) => a.slug !== article.slug).slice(0, 3);
  const untranslated = !article.availableLocales.includes(locale);
  const url = absoluteUrl(href(locale, "articles", article.slug));
  const crumbs = [
    { name: dict.common.breadcrumbHome, href: href(locale, "home") },
    { name: dict.nav.stories, href: href(locale, "articles") },
    { name: t(article.title, locale) },
  ];
  const tocItems = article.content.flatMap((block, index) => block.type === "heading" && block.level === 2 ? [{ id: block.id ?? `section-${index}`, text: t(block.text, locale) }] : []);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article, locale, author.name),
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href ?? href(locale, "articles", article.slug) }))),
        ]}
      />
      <div className="container-content pt-8">
        <Breadcrumbs items={crumbs} />
      </div>
      <ArticleHero article={article} author={author} locale={locale} dict={dict} />

      <div className="container-prose py-12 md:py-16">
        {untranslated && (
          <Placeholder
            title={dict.articles.onlyIn + " " + article.availableLocales.map((l) => l.toUpperCase()).join(" / ")}
            text={locale === "en"
              ? "An English version of this story is planned. Below is the Spanish original."
              : "La versión en español de esta historia está prevista. A continuación, el original en inglés."}
          />
        )}
        <ArticleToc items={tocItems} title={dict.articles.onThisPage} />
        <ArticleBody blocks={article.content} sources={sources} locale={locale} dict={dict} />

        {relatedTeams.length > 0 && (
          <section className="rule mt-14 pt-8" aria-labelledby="related-teams">
            <h2 id="related-teams" className="kicker mb-4">
              {dict.articles.relatedTeams}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {relatedTeams.map((team) => (
                <li key={team.id}>
                  <Link href={href(locale, "teams", team.slug)} className="card card-hover flex items-center gap-3 px-4 py-2">
                    <TeamLogo team={team} size={28} />
                    <span className="font-display text-base font-bold uppercase text-paper">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <SourceList
          sources={sources}
          locale={locale}
          title={dict.articles.sources}
          intro={dict.articles.sourcesIntro}
          accessedLabel={dict.articles.accessed}
          lastVerified={article.lastVerifiedAt}
          lastVerifiedLabel={dict.verification.lastVerified}
        />

        <div className="rule mt-10 pt-6">
          <ShareButtons
            url={url}
            title={t(article.title, locale)}
            label={dict.articles.share}
            copyLabel={dict.articles.copyLink}
            copiedLabel={dict.articles.copied}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-ink-2">
          <div className="container-content py-14">
            <h2 className="display display-sm mb-8">{dict.articles.related}</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
