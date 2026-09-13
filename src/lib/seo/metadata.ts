import type { Metadata } from "next";
import type { Locale } from "@/types/common";
import { locales, localeTags } from "@/lib/i18n/config";
import { href, type RouteKey } from "@/lib/i18n/routes";
import { absoluteUrl, site } from "@/lib/site";

type BuildMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  routeKey: RouteKey;
  segments?: string[];
  /** Locales in which this page actually exists (defaults to all). */
  availableLocales?: Locale[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Builds canonical + hreflang + Open Graph + Twitter metadata for a page.
 * hreflang only lists locales where the page exists to avoid pointing
 * search engines at untranslated duplicates.
 */
export function buildMetadata(args: BuildMetadataArgs): Metadata {
  const {
    locale,
    title,
    description,
    routeKey,
    segments = [],
    availableLocales = [...locales],
    image = "/opengraph-image",
    type = "website",
    publishedTime,
    modifiedTime,
    noIndex,
  } = args;

  const canonicalPath = href(locale, routeKey, ...segments);
  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    languages[localeTags[l]] = absoluteUrl(href(l, routeKey, ...segments));
  }
  if (availableLocales.includes("es")) {
    languages["x-default"] = absoluteUrl(href("es", routeKey, ...segments));
  }

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      type,
      locale: localeTags[locale].replace("-", "_"),
      url: absoluteUrl(canonicalPath),
      siteName: site.name,
      title,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [site.author.name] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
