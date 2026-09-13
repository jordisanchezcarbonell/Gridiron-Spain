/** Global site configuration. Values that change per deployment live in env. */
export const site = {
  name: "Gridiron Spain",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
