import type { Locale } from "@/types/common";
import type { Article } from "@/types";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";
import { absoluteUrl, site } from "@/lib/site";
import { stripCitations } from "@/lib/content/citations";
import { getDictionary } from "@/lib/i18n/dictionaries";

export type FeedItem = {
  id: string;
  url: string;
  title: string;
  summary: string;
  contentText: string;
  published: string;
  modified: string;
  tags: string[];
  image?: string;
};

function plainText(article: Article, locale: Locale): string {
  return article.content
    .flatMap((block) => {
      switch (block.type) {
        case "heading":
        case "paragraph":
        case "quote":
        case "callout":
          return [t(block.text, locale)];
        case "list":
          return block.items.map((i) => t(i, locale));
        default:
          return [];
      }
    })
    .map(stripCitations)
    .join("\n\n");
}

export function toFeedItems(articles: Article[], locale: Locale): FeedItem[] {
  const dict = getDictionary(locale);
  return articles
    .filter((a) => a.availableLocales.includes(locale))
    .map((a) => ({
      id: absoluteUrl(href(locale, "articles", a.slug)),
      url: absoluteUrl(href(locale, "articles", a.slug)),
      title: t(a.title, locale),
      summary: t(a.excerpt, locale),
      contentText: plainText(a, locale),
      published: a.publishedAt,
      modified: a.updatedAt,
      tags: [dict.categories[a.category], ...a.tags],
      image: absoluteUrl(a.heroImage?.url ?? `${href(locale, "articles", a.slug)}/opengraph-image`),
    }));
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] ?? c);
}

export function rssXml(items: FeedItem[], locale: Locale): string {
  const dict = getDictionary(locale);
  const home = absoluteUrl(href(locale, "home"));
  const self = absoluteUrl(`/${locale}/feed.xml`);
  const entries = items
    .map(
      (i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${i.url}</link>
      <guid isPermaLink="true">${i.url}</guid>
      <pubDate>${new Date(i.published).toUTCString()}</pubDate>
      <description>${escapeXml(i.summary)}</description>
      <dc:creator>${escapeXml(site.author.name)}</dc:creator>
${i.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
      ${i.image ? `<enclosure url="${i.image}" type="image/png" length="0" />` : ""}
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${home}</link>
    <description>${escapeXml(dict.site.description)}</description>
    <language>${locale === "es" ? "es-ES" : "en"}</language>
    <lastBuildDate>${new Date(items[0]?.modified ?? site.contentReviewedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>
`;
}

export function jsonFeed(items: FeedItem[], locale: Locale) {
  const dict = getDictionary(locale);
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: site.name,
    home_page_url: absoluteUrl(href(locale, "home")),
    feed_url: absoluteUrl(`/${locale}/feed.json`),
    description: dict.site.description,
    language: locale === "es" ? "es-ES" : "en",
    authors: [{ name: site.author.name, url: site.author.url }],
    items: items.map((i) => ({
      id: i.id,
      url: i.url,
      title: i.title,
      summary: i.summary,
      content_text: i.contentText,
      date_published: i.published,
      date_modified: i.modified,
      tags: i.tags,
      image: i.image,
    })),
  };
}
