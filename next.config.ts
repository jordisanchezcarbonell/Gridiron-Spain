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
    // Avoid duplicate content: internal segment names requested with a locale
    // whose public spelling differs are permanently redirected.
    return localizedRedirects();
  },
};

export default nextConfig;
