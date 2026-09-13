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
  name: "Gridiron Spain",
  url: resolveSiteUrl(),
  author: {
    name: "Jordi Sánchez",
    city: "Barcelona, Spain",
    url: "https://www.jordisanchezweb.es/",
  },
  social: {
    // Fill in when the accounts exist. Empty strings are not rendered.
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
  },
  contactEmail: "", // set NEXT_PUBLIC_CONTACT_EMAIL or edit here when public
  /** ISO date of the current editorial review cycle. */
  contentReviewedAt: "2026-09-12",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
