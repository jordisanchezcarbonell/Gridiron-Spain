/**
 * Resolve the public base URL, in order of preference:
 * 1. NEXT_PUBLIC_SITE_URL (set this once a real domain exists)
 * 2. Vercel's production URL (VERCEL_PROJECT_PRODUCTION_URL, no scheme)
 * 3. localhost for development
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Global site configuration. Values that change per deployment live in env. */
export const site = {
  name: "Primer Down",
  brand: {
    monogram: "PD",
    primary: "Primer",
    accent: "Down",
  },
  url: resolveSiteUrl(),
  author: {
    name: "Jordi Sánchez",
    city: "Barcelona, Spain",
    url: "https://www.jordisanchezweb.es/",
  },
  social: {
    // Personal accounts of the editor, used while the project has none of its own.
    instagram: "https://www.instagram.com/jordi_sanchez777/",
    twitter: "https://x.com/BT_Kazukun",
    tiktok: "",
    youtube: "",
  },
  contactEmail: "jordigw@gmail.com",
  /** ISO date of the current editorial review cycle. */
  contentReviewedAt: "2026-09-28",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
