import Image from "next/image";
import type { Locale } from "@/types/common";
import type { Article, Author } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t, formatDate } from "@/lib/i18n/text";
import { Badge } from "@/components/ui/Badge";

export function ArticleHero({
  article,
  author,
  locale,
  dict,
}: {
  article: Article;
  author: Author;
  locale: Locale;
  dict: Dictionary;
}) {
  const heroImage = article.heroImage ?? {
    url: "/images/editorial/college-football-stadium.png",
    alt: { es: "Estadio de fútbol americano universitario al atardecer.", en: "College football stadium at dusk." },
  };

  return (
    <header className="relative overflow-hidden">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain" />

      <div className="container-content relative py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Category kicker - broadcast style */}
          <div className="mb-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.categories[article.category]}
            </span>
            <div className="h-7 w-8 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          {/* Title */}
          <h1 className="display display-lg">{t(article.title, locale)}</h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="mt-5 text-xl leading-relaxed text-paper-2 md:text-2xl">{t(article.subtitle, locale)}</p>
          )}

          {/* Meta info - broadcast style */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.15em] text-muted">
                {dict.articles.by}
              </span>
              {author.url ? (
                <a href={author.url} className="font-display text-sm font-bold uppercase text-paper transition-colors hover:text-accent" rel="noopener noreferrer">
                  {author.name}
                </a>
              ) : (
                <span className="font-display text-sm font-bold uppercase text-paper">{author.name}</span>
              )}
            </div>
            <span className="text-line-strong">|</span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.15em] text-muted">
              {formatDate(article.publishedAt, locale)}
            </span>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span className="text-line-strong">|</span>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-2">
                  {dict.articles.updated} {formatDate(article.updatedAt, locale)}
                </span>
              </>
            )}
            {article.readingTimeMinutes && (
              <>
                <span className="text-line-strong">|</span>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.15em] text-muted">
                  {article.readingTimeMinutes} {dict.articles.readingTime}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hero image */}
        <figure className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden border border-line bg-ink-2">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
            <div className="relative aspect-[16/9]">
              <Image
                src={heroImage.url}
                alt={t(heroImage.alt, locale)}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          {article.heroImage && (article.heroImage.photographer || article.heroImage.license) && (
            <figcaption className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-2">
              {article.heroImage.photographer}
              {article.heroImage.license ? ` · ${article.heroImage.license}` : ""}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
    </header>
  );
}
