import { getRepository } from "@/lib/repositories";
import { isLocale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/text";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { loadDisplayFont, ogImage, truncate, OG_SIZE } from "@/lib/seo/og";

export const alt = "Gridiron Spain";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const articles = await getRepository().getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const dict = getDictionary(locale);
  const font = await loadDisplayFont();
  const article = await getRepository().getArticleBySlug(slug);
  if (!article) return ogImage({ kicker: dict.nav.stories, title: "Gridiron Spain", font });
  return ogImage({
    kicker: dict.categories[article.category],
    title: t(article.title, locale),
    subtitle: article.subtitle ? truncate(t(article.subtitle, locale), 130) : undefined,
    badges: article.status === "researching" ? [dict.articles.researching] : [],
    font,
  });
}

export const dynamic = "force-static";
