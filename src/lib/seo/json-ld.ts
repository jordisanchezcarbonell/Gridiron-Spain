import type { Locale } from "@/types/common";
import type { Article, Team } from "@/types";
import { absoluteUrl, site } from "@/lib/site";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    founder: { "@type": "Person", name: site.author.name, url: site.author.url },
    description:
      "Independent editorial and archive project about American football in Spain.",
  };
}

export function websiteJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(`/${locale}`),
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function teamJsonLd(team: Team, locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: team.name,
    sport: "American football",
    url: absoluteUrl(href(locale, "teams", team.slug)),
    ...(team.website ? { sameAs: [team.website, ...Object.values(team.socialLinks ?? {})] } : {}),
    ...(team.foundedYear ? { foundingDate: String(team.foundedYear) } : {}),
    location: {
      "@type": "Place",
      name: team.city,
      address: { "@type": "PostalAddress", addressLocality: team.city, addressCountry: "ES" },
      ...(team.venue?.coordinates
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: team.venue.coordinates.latitude,
              longitude: team.venue.coordinates.longitude,
            },
          }
        : {}),
    },
    description: t(team.summary, locale),
  };
}

export function articleJsonLd(article: Article, locale: Locale, authorName: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(article.title, locale),
    description: t(article.excerpt, locale),
    inLanguage: locale,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: authorName, url: site.author.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: absoluteUrl(href(locale, "articles", article.slug)),
    ...(article.heroImage ? { image: [absoluteUrl(article.heroImage.url)] } : {}),
  };
}

/** Serialise safely for a <script type="application/ld+json"> tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
