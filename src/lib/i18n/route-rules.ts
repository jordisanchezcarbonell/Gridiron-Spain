import { routes } from "./routes";

type Rewrite = { source: string; destination: string };
type Redirect = { source: string; destination: string; permanent: boolean };

const LOCALES = ["es", "en"] as const;

/** Public segment -> internal folder (only when they differ). */
export function localizedRewrites(): Rewrite[] {
  const rules: Rewrite[] = [];
  for (const route of Object.values(routes)) {
    for (const locale of LOCALES) {
      const pub = route.public[locale];
      if (!pub || pub === route.internal) continue;
      rules.push({
        source: `/${locale}/${pub}`,
        destination: `/${locale}/${route.internal}`,
      });
      rules.push({
        source: `/${locale}/${pub}/:path*`,
        destination: `/${locale}/${route.internal}/:path*`,
      });
    }
  }
  return rules;
}

/** Internal folder requested directly with a locale whose public name differs. */
export function localizedRedirects(): Redirect[] {
  const rules: Redirect[] = [];
  for (const route of Object.values(routes)) {
    for (const locale of LOCALES) {
      const pub = route.public[locale];
      if (!pub || pub === route.internal) continue;
      rules.push({
        source: `/${locale}/${route.internal}`,
        destination: `/${locale}/${pub}`,
        permanent: true,
      });
      rules.push({
        source: `/${locale}/${route.internal}/:path*`,
        destination: `/${locale}/${pub}/:path*`,
        permanent: true,
      });
    }
  }
  return rules;
}
