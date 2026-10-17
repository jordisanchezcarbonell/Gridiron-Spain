# Deploy checklist

Target: Vercel (zero config for Next.js). Netlify or any Node host works too.

1. **Repository**: push the project to GitHub (private is fine). Do not commit `.env.local`.
2. **Import in Vercel**: New Project → import the repo. Framework preset: Next.js. Node 24 (Settings → General → Node.js version).
3. **Environment variables** (Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://primerdown.jordisanchezweb.es` (no trailing slash).
     Drives canonical URLs, hreflang, sitemap and Open Graph. Set in Vercel as a Config
     variable on Production since 2026-10-15. Changing it needs a redeploy *without* build
     cache, because `NEXT_PUBLIC_*` is inlined at build time.
   - Both older hosts redirect straight to it with a 308, with no chain between them:
     `primer-down.vercel.app` and `gridiron-spain.vercel.app`. Keep them: the October 2026
     outreach emails link to `primer-down.vercel.app`.
   - Without the variable the code falls back to Vercel's production URL
     (`VERCEL_PROJECT_PRODUCTION_URL`) and then to localhost.
   - Optional: `NEXT_PUBLIC_MAP_TILE_URL` and `NEXT_PUBLIC_MAP_TILE_ATTRIBUTION` for a keyed tile provider (MapTiler/Stadia). Restrict the key to your domain in the provider's panel.
4. **Domain**: add the domain in Vercel → Domains and point DNS (A/CNAME as instructed). Redirect `www` to apex or vice versa; pick one.
5. **First deploy**: check `https://<domain>/` redirects to `/es`, `/en/teams` renders, `/sitemap.xml` and `/robots.txt` list the domain, and `/opengraph-image` renders.
6. **Search Console**: add the property (domain property via DNS TXT), submit `https://<domain>/sitemap.xml`. Both `es-ES` and `en` alternates are already in the sitemap.
7. **Analytics**: Vercel Web Analytics is wired in `src/app/[lang]/layout.tsx` (`<Analytics />`, cookieless, no consent banner needed). Enable it once in Vercel → project → Analytics → Enable; data appears after the next deploy.
8. **Before each content push**: `npm run content:check && npm run build`.
