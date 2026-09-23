import Image from "next/image";
import type { Locale } from "@/types/common";
import type { Article, Author } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t, formatDate, formatMonthYear } from "@/lib/i18n/text";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

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
  return (
    <header className="grain border-b border-line">
      <div className="container-content py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge tone="gold">{dict.categories[article.category]}</Badge>
            {article.status === "researching" && <Badge tone="outline">{dict.articles.researching}</Badge>}
            <VerificationBadge
              status={article.verificationStatus}
              label={dict.verification[article.verificationStatus]}
              lastVerifiedLabel={dict.verification.lastVerified}
              lastVerified={article.lastVerifiedAt ? formatMonthYear(article.lastVerifiedAt, locale) : undefined}
            />
          </div>
          <h1 className="display display-md">{t(article.title, locale)}</h1>
          {article.subtitle && <p className="mt-5 text-xl text-paper-2 md:text-2xl">{t(article.subtitle, locale)}</p>}
          <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-2">
            {dict.articles.by}{" "}
            {author.url ? (
              <a href={author.url} className="text-paper hover:text-gold" rel="noopener noreferrer">
                {author.name}
              </a>
            ) : (
              <span className="text-paper">{author.name}</span>
            )}
            {" · "}
            {dict.articles.published} {formatDate(article.publishedAt, locale)}
            {article.updatedAt !== article.publishedAt && (
              <>
                {" · "}
                {dict.articles.updated} {formatDate(article.updatedAt, locale)}
              </>
            )}
            {article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} ${dict.articles.readingTime}` : ""}
          </p>
        </div>
        {(article.heroImage || article.heroImagePending) && (
          <figure className="mx-auto mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-line bg-ink-2 yardlines">
              {article.heroImage ? (
                <Image
                  src={article.heroImage.url}
                  alt={t(article.heroImage.alt, locale)}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <span className="kicker max-w-sm leading-relaxed text-muted">{t(article.heroImagePending!, locale)}</span>
                </div>
              )}
            </div>
            {article.heroImage && (article.heroImage.photographer || article.heroImage.license) && (
              <figcaption className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-2">
                {article.heroImage.photographer}
                {article.heroImage.license ? ` · ${article.heroImage.license}` : ""}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </header>
  );
}
