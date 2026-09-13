import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/types/common";
import type { Article } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t, formatDate } from "@/lib/i18n/text";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/lib/utils";

export function ArticleCard({
  article,
  locale,
  dict,
  variant = "default",
  headingLevel = "h3",
}: {
  article: Article;
  locale: Locale;
  dict: Dictionary;
  variant?: "default" | "featured" | "compact";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const url = href(locale, "articles", article.slug);
  const researching = article.status === "researching";
  const untranslated = !article.availableLocales.includes(locale);

  if (variant === "featured") {
    return (
      <Link href={url} className="card card-hover group grid overflow-hidden md:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-64 bg-ink-2 yardlines">
          {article.heroImage ? (
            <Image
              src={article.heroImage.url}
              alt={t(article.heroImage.alt, locale)}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="display display-md text-line-strong">GS</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">{dict.categories[article.category]}</Badge>
            {researching && <Badge tone="outline">{dict.articles.researching}</Badge>}
          </div>
          <Heading className="display display-sm group-hover:text-gold">{t(article.title, locale)}</Heading>
          {article.subtitle && <p className="text-lg text-paper-2">{t(article.subtitle, locale)}</p>}
          <p className="text-muted">{t(article.excerpt, locale)}</p>
          <Meta article={article} locale={locale} dict={dict} untranslated={untranslated} />
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={url} className="group flex gap-4 border-b border-line py-4 last:border-0">
        <div className="min-w-0 flex-1">
          <p className="kicker mb-1 text-muted-2">{dict.categories[article.category]}</p>
          <h3 className="font-display text-xl font-bold uppercase leading-tight text-paper group-hover:text-gold">
            {t(article.title, locale)}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link href={url} className={cx("card card-hover group flex h-full flex-col overflow-hidden")}>
      <div className="relative aspect-[16/9] bg-ink-2 yardlines">
        {article.heroImage ? (
          <Image
            src={article.heroImage.url}
            alt={t(article.heroImage.alt, locale)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-5xl font-black uppercase text-line-strong">
              {dict.categories[article.category]}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="gold">{dict.categories[article.category]}</Badge>
          {researching && <Badge tone="outline">{dict.articles.researching}</Badge>}
        </div>
        <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper group-hover:text-gold">
          {t(article.title, locale)}
        </h3>
        <p className="line-clamp-3 text-sm text-muted">{t(article.excerpt, locale)}</p>
        <div className="mt-auto pt-2">
          <Meta article={article} locale={locale} dict={dict} untranslated={untranslated} />
        </div>
      </div>
    </Link>
  );
}

function Meta({
  article,
  locale,
  dict,
  untranslated,
}: {
  article: Article;
  locale: Locale;
  dict: Dictionary;
  untranslated: boolean;
}) {
  return (
    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">
      {formatDate(article.publishedAt, locale)}
      {article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} ${dict.articles.readingTime}` : ""}
      {untranslated && ` · ${dict.articles.onlyIn} ${article.availableLocales.map((l) => l.toUpperCase()).join("/")}`}
    </p>
  );
}
