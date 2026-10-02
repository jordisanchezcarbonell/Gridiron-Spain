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
  const heroImage = article.heroImage ?? { url: "/images/editorial/college-football-stadium.png", alt: { es: "Estadio de fútbol americano universitario.", en: "College football stadium." } };
  const untranslated = !article.availableLocales.includes(locale);

  if (variant === "featured") {
    return (
      <Link href={url} className="card card-hover group grid overflow-hidden md:grid-cols-[1.3fr_1fr]">
        <div className="photo-overlay relative min-h-72 bg-ink-2">
          <Image
            src={heroImage.url}
            alt={t(heroImage.alt, locale)}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{dict.categories[article.category]}</Badge>
            <Meta article={article} locale={locale} dict={dict} untranslated={untranslated} />
          </div>
          <Heading className="display display-sm transition-colors group-hover:text-accent">{t(article.title, locale)}</Heading>
          {article.subtitle && <p className="text-lg leading-relaxed text-paper-2">{t(article.subtitle, locale)}</p>}
          <p className="text-muted">{t(article.excerpt, locale)}</p>
          <div className="mt-auto flex items-center gap-2 pt-2 font-display text-sm font-bold uppercase tracking-[0.06em] text-accent">
            {locale === "es" ? "Leer artículo" : "Read article"}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={url} className="group flex gap-4 border-b border-line py-4 last:border-0">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-2">{dict.categories[article.category]}</p>
          <h3 className="font-display text-lg font-bold uppercase leading-tight text-paper transition-colors group-hover:text-accent">
            {t(article.title, locale)}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link href={url} className={cx("card card-hover group flex h-full flex-col overflow-hidden")}>
      <div className="photo-overlay relative aspect-[16/9] bg-ink-2">
        <Image
          src={heroImage.url}
          alt={t(heroImage.alt, locale)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Category badge overlay */}
        <div className="absolute left-3 top-3 z-10">
          <Badge tone="accent">{dict.categories[article.category]}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-black uppercase leading-none text-paper transition-colors group-hover:text-accent md:text-2xl">
          {t(article.title, locale)}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{t(article.excerpt, locale)}</p>
        <div className="mt-auto pt-3">
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
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-2">
      {formatDate(article.publishedAt, locale)}
      {article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} ${dict.articles.readingTime}` : ""}
      {untranslated && ` · ${dict.articles.onlyIn} ${article.availableLocales.map((l) => l.toUpperCase()).join("/")}`}
    </p>
  );
}
