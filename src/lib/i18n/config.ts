import type { Locale } from "@/types/common";

export const locales: readonly Locale[] = ["es", "en"] as const;
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** BCP-47 tags used in <html lang> and hreflang. */
export const localeTags: Record<Locale, string> = {
  es: "es-ES",
  en: "en",
};
