@AGENTS.md

# Primer Down — working notes

- Independent editorial/archive project about American football in Spain. Credibility first: never invent dates, titles, stadiums, people or stats. Anything unsourced is `verificationStatus: "unverified"` and rendered as a research placeholder.
- Data lives in `src/data/*` (TypeScript). UI only talks to `src/lib/repositories` (swap for Payload/Postgres later).
- Every fact-bearing entity carries `sourceIds`; inline citations use `[[src:ID]]`. Run `npm run content:check` after editing data.
- Routes are under `src/app/[lang]` (es/en). Public English segments are mapped in `src/lib/i18n/routes.ts`; always build links with `href(locale, key, ...segments)`.
- Partners never render unless `confirmed: true` with a written agreement.

## Research System

See `docs/research-system.md` for full documentation.

### Available Skills

| Skill | Purpose |
|-------|---------|
| `/football-research` | NCAA, NFL, European football research |
| `/football-spain` | Spanish football research (teams, LNFA, etc.) |
| `/football-daily` | Daily editorial briefing |
| `/sports-editor` | Content generation from verified research |

### Research Workflow

```
1. /football-research or /football-spain → research/{type}/{id}.md
2. Editor reviews and validates data
3. /sports-editor generates content from approved research
4. Verified data promoted to src/data/ if permanent
5. npm run content:check validates integrity
```

### Confidence Levels

| Level | Meaning | Editorial Use |
|-------|---------|---------------|
| `CONFIRMED` | Official source or multiple reliable sources | Publish directly |
| `REPORTED` | Reliable media, not officially confirmed | Attribute to source |
| `RUMOR` | Clearly identified as rumor | Only mention as rumor |
| `UNKNOWN` | Insufficient information | Do not publish |

### Directory Structure

```
research/           # Pre-production research
  daily/            # Daily briefings
  games/            # Game research
  teams/            # Team profiles
  players/          # Player profiles
  stories/          # Detected story opportunities
  spain/            # Spanish football research

content/            # Generated content drafts
  articles/
  social/
  scripts/

src/data/           # Production data (verified)
  teams/
  articles/
  sources/
```

### Never Invent

- Statistics, scores, or records
- Dates or schedules
- Player names or positions
- Coach names
- Injury status
- Transfer/recruiting news
- Stadium capacity
- Championship history

If not confirmed → mark `UNKNOWN` or omit.
