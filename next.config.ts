import type { NextConfig } from "next";
import { localizedRewrites, localizedRedirects } from "./src/lib/i18n/route-rules";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    // Public localized segments (/en/teams) are mapped onto the canonical
    // folder names under src/app/[lang] (/en/equipos). See src/lib/i18n/routes.ts.
    return { beforeFiles: localizedRewrites(), afterFiles: [], fallback: [] };
  },
  async redirects() {
    // Old production hosts → canonical domain. Vercel's domain-level 308
    // (Settings → Domains) was not reaching Googlebot: on 2026-11-09 the GSC
    // live test got 200 OK from primer-down.vercel.app, so Google kept the
    // vercel.app URLs as canonical. Only these exact hosts match, so preview
    // deployments (*-git-*.vercel.app) are unaffected.
    const legacyHosts = ["primer-down.vercel.app", "gridiron-spain.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://primerdown.jordisanchezweb.es/:path*",
      permanent: true,
    }));
    // Avoid duplicate content: internal segment names requested with a locale
    // whose public spelling differs are permanently redirected.
    return [...legacyHosts, ...localizedRedirects()];
  },
};

export default nextConfig;
