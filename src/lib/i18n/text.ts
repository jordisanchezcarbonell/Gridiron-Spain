import type { Locale, LocalizedString } from "@/types/common";

/** Resolve a localized string, falling back to Spanish. */
export function t(text: LocalizedString | undefined, locale: Locale): string {
  if (!text) return "";
  return text[locale] ?? text.es;
}

export function hasTranslation(text: LocalizedString, locale: Locale): boolean {
  return Boolean(text[locale]);
}

export function formatDate(iso: string, locale: Locale, opts?: Intl.DateTimeFormatOptions) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(date);
}

export function formatMonthYear(iso: string, locale: Locale) {
  return formatDate(iso, locale, { day: undefined, month: "long", year: "numeric" });
}
