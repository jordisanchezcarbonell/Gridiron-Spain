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
 * Google shows roughly 60 characters of title and 160 of description, but the
 * two are not treated alike. The description is display only, so trimming it
 * is free. The title is read in full for relevance and merely *shown* cut, so
 * it is never truncated here: that would delete indexable text to no gain.
 * Titles are kept short by the page templates instead, via `composeTitle`.
 */
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;
/** The root layout renders titles as `%s — <site name>`. */
const TITLE_SUFFIX = ` — ${site.name}`.length;

/** Trims to `max` characters on a word boundary. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  const kept = space > max * 0.5 ? cut.slice(0, space) : cut;
  return `${kept.replace(/[\s,;:.\u2014-]+$/, "")}…`;
}

/** Characters a page title may use before the site-name suffix is appended. */
export const TITLE_BUDGET = MAX_TITLE - TITLE_SUFFIX;

/**
 * Joins a name with a descriptive tail, dropping the tail when the pair would
 * not fit. A long club or competition name shown whole beats the same name
 * followed by a phrase Google cuts off mid-word.
 */
export function composeTitle(name: string, tail: string): string {
  const full = `${name} — ${tail}`;
  return full.length <= TITLE_BUDGET ? full : name;
}

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
  const metaDescription = clamp(description, MAX_DESCRIPTION);
  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    languages[localeTags[l]] = absoluteUrl(href(l, routeKey, ...segments));
  }
  if (availableLocales.includes("es")) {
    languages["x-default"] = absoluteUrl(href("es", routeKey, ...segments));
  }

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
      types: {
        "application/rss+xml": absoluteUrl(`/${locale}/feed.xml`),
        "application/feed+json": absoluteUrl(`/${locale}/feed.json`),
      },
    },
    openGraph: {
      type,
      locale: localeTags[locale].replace("-", "_"),
      url: absoluteUrl(canonicalPath),
      siteName: site.name,
      title,
      description: metaDescription,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [site.author.name] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [absoluteUrl(image)],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
