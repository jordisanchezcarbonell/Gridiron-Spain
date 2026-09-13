# Gridiron Spain

Independent editorial project, historical archive, team directory and map of American football in Spain. Born in Barcelona.

Working name: **Gridiron Spain** (not final). Alternatives under consideration: Endzone España, Fourth Down Spain, Huddle Spain, Spanish Gridiron.

> Gridiron Spain is an independent project and is not affiliated with the NFL, the NCAA, the Federación Española de Fútbol Americano (FEFA), the European League of Football or the teams featured, unless explicitly stated.

## What it is

- **Team directory** with sourced profiles (`/equipos`, `/en/teams`)
- **Interactive map** of clubs with filters (`/mapa`, `/en/map`)
- **Verified timeline** of the sport in Spain (`/historia`, `/en/history`)
- **Long-form stories** with a source list on every piece (`/articulos`, `/en/stories`)
- **Find your team** by city or geolocation (`/cerca-de-ti`, `/en/near-you`), backed by an offline gazetteer in `src/data/geo/spain-places.ts`
- **Region pages** (`/equipos/cataluna`, `/en/teams/madrid`, …) generated from each team's `autonomousCommunity`
- **Competitions** explained (`/competiciones`, `/en/competitions`)
- **Road to Annapolis**, the first international series (`/road-to-annapolis`)
- About and media kit pages

Editorial principle: **nothing is published without a source**. Every team, article, timeline event and fact carries `sourceIds`, a `verificationStatus` (`verified | partial | unverified`) and a `lastVerifiedAt` date. Unverified content renders as an explicit "being researched" placeholder, never as invented prose.

## Stack

- Next.js 16 (App Router, Turbopack, static generation), React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Leaflet + React Leaflet (OpenStreetMap tiles, client-only)
- Content in TypeScript files under `src/data`, behind a repository interface (`src/lib/repositories`) so a CMS (Payload) or PostgreSQL can replace it without touching the UI

## Getting started

Requires Node 20.9+ (there is an `.nvmrc` pointing at Node 24).

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the proxy redirects to `/es` or `/en` based on your browser language.

Other scripts:

```bash
npm run build          # production build (all pages are prerendered)
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run content:check  # editorial integrity: source ids, citations, slugs
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap and Open Graph in production.

## Project structure

```
src/
  app/
    [lang]/                 es | en — every page lives here
      page.tsx              home
      historia/             timeline
      equipos/[slug]/       team directory + profiles
      mapa/                 interactive map
      articulos/[slug]/     stories
      competiciones/[slug]/ competitions
      road-to-annapolis/    special series landing
      about/  media-kit/
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
    globals.css             design tokens (Tailwind v4 @theme)
  proxy.ts                  locale redirect (Accept-Language / cookie)
  components/               layout, ui, teams, articles, history, map, road, seo
  data/                     content (teams, articles, competitions, timeline, sources, road)
  dictionaries/             UI strings es/en
  lib/
    i18n/                   locales, route registry, dictionaries, text helpers
    repositories/           ContentRepository interface + local implementation
    seo/                    metadata builder, JSON-LD
    content/                inline citation parsing
    geo.ts site.ts utils.ts
  types/                    domain models
scripts/check-content.ts    editorial integrity check
```

### Internationalisation

Folders under `src/app/[lang]` use canonical Spanish names. Public English URLs (`/en/teams`, `/en/stories`, …) are mapped in `src/lib/i18n/routes.ts` and applied through `rewrites`/`redirects` in `next.config.ts`. **Always build links with `href(locale, key, ...segments)`**, never with string literals. `buildMetadata` emits canonical + `hreflang` for every page and only lists locales where the page exists.

UI strings live in `src/dictionaries/{es,en}.ts`. Content fields are `LocalizedString = { es: string; en?: string }`; `t(text, locale)` falls back to Spanish.

## How to add content

### Add a source

Sources are first-class. Add one to `src/data/sources/spain.ts` (or `navy.ts`, or a new file registered in `sources/index.ts`):

```ts
{
  id: "fefa-team-dracs",            // stable, kebab-case
  title: "Badalona Dracs — ficha de equipo",
  publisher: "Federación Española de Fútbol Americano (FEFA)",
  url: "https://www.fefa.es/equipos/badalona-dracs/",
  publishedAt: "2025-08-03",        // optional
  accessedAt: "2026-09-12",         // required: websites change
  sourceType: "federation",         // federation | club-official | league-official | press | interview | archive | official-document | encyclopedia | other
}
```

Cite it inline anywhere in a paragraph with `[[src:fefa-team-dracs]]`. The renderer turns it into a numbered link to the source list; `npm run content:check` fails if the id does not exist or is not listed in the entity's `sourceIds`.

### Add a team

Add an object to `src/data/teams/catalonia.ts`, `madrid.ts` or `others.ts` (or a new region file registered in `teams/index.ts`). Minimum safe fields: `id`, `slug`, `name`, `city`, `autonomousCommunity`, `status`, `disciplines`, `categories`, `summary`, `sourceIds`, `verificationStatus`. Leave anything unknown `undefined` and describe it in `researchNotes`. Titles go in `honours` with their own `sourceIds`.

### Add a point to the map

Give the team a `venue.coordinates` object:

```ts
venue: {
  name: { es: "Camp Municipal de Montigalà" },
  coordinates: { latitude: 41.4573, longitude: 2.235, precision: "venue" }, // or "city"
  verificationStatus: "partial",
}
```

Coordinates are stored, never geocoded at runtime. Use `precision: "city"` when only the municipality is known; the map draws those pins differently. Pins show a monogram derived from `shortName`/`name`; nearby pins are clustered client-side (`src/components/map/TeamMap.tsx`) and the list beside the map is synced with hover/selection.

### Add an article

Create `src/data/articles/<slug>.ts` exporting an `Article`, then register it in `src/data/articles/index.ts`. Content is a list of typed blocks (`heading`, `paragraph`, `list`, `quote`, `callout`, `image`, `placeholder`). Use a `placeholder` block for any section still under research. Set `availableLocales` honestly: a slug only gets `hreflang`/sitemap entries for the locales listed. `status: "draft"` hides it; `"researching"` publishes it with a visible badge.

### Add a competition or timeline event

`src/data/competitions/index.ts` and `src/data/timeline/index.ts`. Every timeline event needs at least one source unless marked `unverified`.

### Add a translation

Content: fill the `en` key of each `LocalizedString` and add `"en"` to the article's `availableLocales`. UI: add the key to both `src/dictionaries/es.ts` and `en.ts` (the English file is typed against the Spanish one, so missing keys fail typecheck).

### Partners (Road to Annapolis)

`src/data/road/index.ts` → `partners`. A partner renders **only** when `confirmed: true`, and every partner must carry a `disclosure`. Do not flip the flag without a written agreement.

## Outreach and deployment

`docs/outreach/` holds the Spanish and English templates for contacting clubs and travel partners, with a suggested contact order. `docs/DEPLOY.md` is the Vercel/Search Console checklist.

## Images and rights

We do not hotlink club crests or photos. `TeamLogo` renders a monogram until a crest with permission is stored in `public/images/teams/` and referenced via `team.logo` (a `Media` object with `photographer`, `license` and `permissionNotes`). The same `Media` shape is used for article images.

## SEO

- Dynamic `generateMetadata` on every route with canonical URL, `hreflang`, Open Graph and Twitter cards
- JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `SportsTeam`, `Article`
- `sitemap.xml` with language alternates, `robots.txt`, SVG icon
- Open Graph images generated at build for the site, every team, every region and every article (`src/lib/seo/og.tsx`; Barlow Condensed is fetched from Google Fonts at build time and falls back silently offline)
- All pages are statically prerendered (`generateStaticParams`)

## Roadmap

**MVP (this repo)**: home, history timeline, team directory + profiles, map, stories, competitions, Road to Annapolis, about, media kit, es/en, SEO, content integrity script.

**Next**
- Complete research: Madrid clubs, Barcelona Dragons (both eras), Madrid Bravos, ELF, NFL Madrid
- Club outreach: crests, archive photos, founder interviews (`/entrevistas`, `Person` and `Interview` types already exist)
- "Find a team near you": distance search on top of the stored coordinates (`lib/geo.ts` has haversine)
- Newsletter provider integration (form is already in place, disabled)
- Real analytics + media kit metrics when data exists

**Later**
- Payload CMS behind the same `ContentRepository` interface
- PostgreSQL: `Season`, `CompetitionSeason`, `TeamSeason`, `Match`, `Standing`, `Venue`, `Person`, `Media`, `Partner`
- Historical archive (Spanish Bowl by year), games this weekend, importers only where a legal, stable source exists
- Series beyond Annapolis: Army-Navy, Michigan, NFL Madrid, Madrid Bravos

## Editorial rules (short version)

Never invent championships, dates, players, stats, stadiums, foundations, leagues or results. Never present the project as FEFA, the NFL, the NCAA, Navy or any club. Never show a partner, a metric or an audience figure that is not real. When in doubt, mark it `unverified` and say so on the page.
