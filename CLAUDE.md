@AGENTS.md

# Gridiron Spain — working notes

- Independent editorial/archive project about American football in Spain. Credibility first: never invent dates, titles, stadiums, people or stats. Anything unsourced is `verificationStatus: "unverified"` and rendered as a research placeholder.
- Data lives in `src/data/*` (TypeScript). UI only talks to `src/lib/repositories` (swap for Payload/Postgres later).
- Every fact-bearing entity carries `sourceIds`; inline citations use `[[src:ID]]`. Run `npm run content:check` after editing data.
- Routes are under `src/app/[lang]` (es/en). Public English segments are mapped in `src/lib/i18n/routes.ts`; always build links with `href(locale, key, ...segments)`.
- Partners never render unless `confirmed: true` with a written agreement.
