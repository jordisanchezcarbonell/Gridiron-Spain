import type { Locale } from "@/types/common";

/**
 * Route registry.
 *
 * `internal` is the folder name under src/app/[lang]/.
 * `public` is the segment shown in the URL for each locale.
 * next.config.ts rewrites public -> internal, so the app tree stays single.
 */
export const routes = {
  home: { internal: "", public: { es: "", en: "" } },
  history: { internal: "historia", public: { es: "historia", en: "history" } },
  teams: { internal: "equipos", public: { es: "equipos", en: "teams" } },
  map: { internal: "mapa", public: { es: "mapa", en: "map" } },
  articles: { internal: "articulos", public: { es: "articulos", en: "stories" } },
  competitions: {
    internal: "competiciones",
    public: { es: "competiciones", en: "competitions" },
  },
  roadToAnnapolis: {
    internal: "road-to-annapolis",
    public: { es: "road-to-annapolis", en: "road-to-annapolis" },
  },
  nearYou: { internal: "cerca-de-ti", public: { es: "cerca-de-ti", en: "near-you" } },
  about: { internal: "about", public: { es: "sobre-el-proyecto", en: "about" } },
  mediaKit: { internal: "media-kit", public: { es: "media-kit", en: "media-kit" } },
} as const;

export type RouteKey = keyof typeof routes;

/** Build a public, locale-prefixed href. */
export function href(locale: Locale, key: RouteKey, ...segments: string[]): string {
  const base = routes[key].public[locale];
  const parts = [locale, base, ...segments].filter(Boolean);
  return "/" + parts.join("/");
}

/**
 * Translate a public pathname into the equivalent pathname for another
 * locale. Works for both public and internal segment spellings so it can be
 * used from client components that only know the browser URL.
 */
export function translatePathname(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const [maybeLocale, first, ...rest] = parts;
  const hasLocale = maybeLocale === "es" || maybeLocale === "en";
  const restParts = hasLocale ? [first, ...rest].filter(Boolean) : parts;
  const head = restParts[0];
  const tail = restParts.slice(1);

  if (!head) return `/${target}`;

  for (const route of Object.values(routes)) {
    const spellings = new Set<string>([
      route.internal,
      route.public.es,
      route.public.en,
    ]);
    if (spellings.has(head)) {
      const translated = route.public[target];
      return "/" + [target, translated, ...tail].filter(Boolean).join("/");
    }
  }
  return "/" + [target, ...restParts].join("/");
}
