# Rankings refresh routine

Weekly procedure for keeping `/rankings` current. It is run by a scheduled Claude routine every Monday and always ends in a **pull request**, never a direct push to `main`: an editor reviews and merges.

Credibility rules from `CLAUDE.md` apply in full: never invent ranks, records, scores, names or stats. Every changed fact needs a source added to `src/data/sources/` and listed in the entity's `sourceIds`. If a value cannot be confirmed in at least one reliable source, leave the old data and say so in the PR.

## 0. Decide what is due

Run `npm run content:check`. Every `stale` warning is a ranking that must be refreshed. Then apply the calendar below.

| Section | Files | Cadence | Active window |
|---|---|---|---|
| AP Top 25 | `src/data/rankings/ncaa.ts` | weekly (poll out on Sunday) | 23 Aug 2026 – 25 Jan 2027 |
| Heisman odds | `src/data/players/ncaa.ts` (`heisman`) | weekly | until the Heisman ceremony (December) |
| 2027 Draft big board | `src/data/players/ncaa.ts` (`board`) | every 2 weeks, only if a newer full board exists | until the 2027 Draft (April) |
| LNFA results → ranking | `src/data/seasons/index.ts` (`lnfa-2026-27`), `src/data/rankings/spain.ts` | weekly | 16 Jan – 22 May 2027 |
| EFA / AFLE / ELF, Spaniards in Europe | `src/data/rankings/europe.ts`, `src/data/players/europe.ts` | first Monday of the month | always |
| New Spanish clubs and players | `src/data/teams/*`, `src/data/players/spain.ts` | first Monday of the month | always |

Outside a section's window or cadence, skip it.

## 1. NCAA

- AP Top 25: confirm the full table (rank, team, record, first-place votes, previous rank) in at least two of: ESPN rankings page, a university athletics reprint, Bleacher Report, NCAA.com, AP. Replace `AP_WEEK_5`-style data (rename the constant and the ranking `id`/`title` to the new week), update `asOf` to the poll's release date, rewrite the `description` with that week's real storyline, and add the new sources.
- Heisman: same sportsbook and outlet as before when possible (DraftKings via NBC Sports). Only yardage-type stats that two sources agree on.
- Big board: replace only with a complete, dated board from ESPN, PFF, The Athletic or CBS; say which board in each note.

## 2. LNFA (from 16 January 2027)

- Add each week's results/records to the `lnfa-2026-27` season (FEFA match reports are the source).
- When the 2026-27 regular season has games, switch `src/data/rankings/spain.ts` to rank on 2026-27 records (same formula, bonuses only after play-offs), set `asOf` to the last matchday date and update the `title`/`description`.

## 3. Europe and players (monthly)

- Look for 2027 plans of EFA and AFLE, new Spanish signings, and anything that contradicts current data.
- New clubs: follow the shape in `src/data/teams/regions.ts`, `verificationStatus: "partial"` unless every field is sourced.

## 4. Validate and open the PR

```
npm run content:check   # must pass; no stale warnings left for refreshed sections
npx tsc --noEmit
npm run build
```

Branch `rankings/YYYY-MM-DD`, one commit, PR titled `Rankings refresh YYYY-MM-DD`. The PR body lists: what changed per section, every new source, anything that could not be verified (left untouched), and discrepancies between sources. If nothing was due or nothing changed, do not open a PR.
