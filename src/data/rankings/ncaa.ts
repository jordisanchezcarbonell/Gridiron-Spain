import type { Ranking } from "@/types";

// [rank, team, record, previous rank (null = unranked), first-place votes]
// Rank is explicit because the poll can have ties (Week 9 had two teams at No. 20).
const AP_WEEK_12: [number, string, string, number | null, number][] = [
  [1, "Georgia", "9-1", 1, 58],
  [2, "Utah", "10-0", 2, 10],
  [3, "Notre Dame", "9-1", 3, 2],
  [4, "UCLA", "10-0", 4, 0],
  [5, "Miami (Fla.)", "9-1", 5, 0],
  [6, "Indiana", "9-1", 6, 0],
  [7, "Alabama", "8-2", 7, 0],
  [8, "Texas", "8-2", 8, 0],
  [9, "Tennessee", "8-2", 9, 0],
  [10, "Wake Forest", "9-1", 11, 0],
  [11, "Texas Tech", "9-1", 10, 0],
  [12, "BYU", "8-2", 12, 0],
  [13, "Iowa", "8-2", 16, 0],
  [14, "Oregon", "7-3", 18, 0],
  [15, "Boise State", "9-1", 17, 0],
  [16, "Ohio State", "7-3", 21, 0],
  [17, "Kentucky", "7-3", 13, 0],
  [18, "USC", "7-3", 15, 0],
  [19, "Arizona", "7-3", 22, 0],
  [20, "Houston", "7-3", 14, 0],
  [21, "Louisville", "7-3", null, 0],
  [22, "Liberty", "9-1", null, 0],
  [23, "Florida", "6-4", null, 0],
  [24, "Memphis", "8-2", null, 0],
  [25, "Ole Miss", "6-4", 19, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-12",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 12", en: "AP Top 25 · Week 12" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el lunes 16 de noviembre de 2026, un día más tarde de lo habitual porque el Oklahoma–Ole Miss se jugó el domingo. Los nueve primeros no cambian: Georgia sigue n.º 1 con 58 de los 70 votos al primer puesto tras ganar 48-21 a Missouri; Utah, invicto tras un 40-39 en Arizona, es segundo con 10 votos, y Notre Dame, tercera con 2. Wake Forest entra en el top 10 después de ganar 49-7 a SMU e intercambia puesto con Texas Tech. Ohio State sube del 21 al 16 y Oregon, del 18 al 14; Houston cae del 14 al 20 tras perder 42-32 en Colorado, y Ole Miss, del 19 al 25 tras caer 24-17 en Oklahoma. Entran Louisville, Liberty, Florida y Memphis; salen South Carolina, New Mexico, LSU y SMU.",
      en: "The Associated Press media poll released on Monday 16 November 2026, a day later than usual because Oklahoma–Ole Miss was played on Sunday. The top nine are unchanged: Georgia stay No. 1 with 58 of the 70 first-place votes after beating Missouri 48-21; Utah, unbeaten after a 40-39 win at Arizona, are second with 10 votes, and Notre Dame third with 2. Wake Forest enter the top 10 after beating SMU 49-7, swapping places with Texas Tech. Ohio State climb from 21 to 16 and Oregon from 18 to 14; Houston fall from 14 to 20 after losing 42-32 at Colorado, and Ole Miss from 19 to 25 after losing 24-17 at Oklahoma. Louisville, Liberty, Florida and Memphis come in; South Carolina, New Mexico, LSU and SMU drop out.",
    },
    asOf: "2026-11-16",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_12.map(([rank, name, record, prev, votes]) => ({
          rank,
          name,
          detail: record,
          previousRank: prev ?? undefined,
          note: prev === null
            ? { es: "Entra en el ranking", en: "New to the ranking" }
            : votes > 0
              ? { es: `${votes} ${votes === 1 ? "voto" : "votos"} al n.º 1`, en: `${votes} first-place ${votes === 1 ? "vote" : "votes"}` }
              : undefined,
        })),
      },
    ],
    sourceIds: ["espn-cfb-rankings-week12-2026", "cbs-ap-poll-week12-2026", "yahoo-ap-poll-week12-2026", "espn-cfb-rankings-week11-2026", "espn-cfb-scoreboard-2026-11-14", "cbs-cfb-scoreboard-2026-11-14"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-11-18",
  },
];
