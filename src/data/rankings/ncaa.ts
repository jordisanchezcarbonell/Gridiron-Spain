import type { Ranking } from "@/types";

// [rank, team, record, previous rank (null = unranked), first-place votes]
// Rank is explicit because the poll can have ties (Week 9 had two teams at No. 20).
const AP_WEEK_13: [number, string, string, number | null, number][] = [
  [1, "Georgia", "10-1", 1, 56],
  [2, "Utah", "11-0", 2, 12],
  [3, "Notre Dame", "10-1", 3, 1],
  [4, "Miami (Fla.)", "10-1", 5, 0],
  [5, "Texas", "9-2", 8, 0],
  [6, "Alabama", "9-2", 7, 0],
  [7, "Tennessee", "9-2", 9, 0],
  [8, "Wake Forest", "10-1", 10, 0],
  [9, "Texas Tech", "10-1", 11, 0],
  [10, "UCLA", "10-1", 4, 0],
  [11, "BYU", "9-2", 12, 0],
  [12, "Indiana", "9-2", 6, 0],
  [13, "Iowa", "9-2", 13, 0],
  [14, "Oregon", "8-3", 14, 0],
  [15, "USC", "8-3", 18, 0],
  [16, "Arizona", "8-3", 19, 0],
  [17, "Houston", "8-3", 20, 0],
  [18, "Louisville", "8-3", 21, 0],
  [19, "Oklahoma", "7-4", null, 0],
  [20, "Florida", "7-4", 23, 0],
  [21, "Liberty", "10-1", 22, 0],
  [22, "Boise State", "9-2", 15, 0],
  [23, "Ole Miss", "7-4", 25, 0],
  [24, "Missouri", "7-4", null, 0],
  [25, "Ohio State", "7-4", 16, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-13",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 13", en: "AP Top 25 · Week 13" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el domingo 22 de noviembre de 2026. Georgia sigue n.º 1 con 56 votos al primer puesto tras ganar 34-6 en South Carolina; Utah, único invicto del país tras un 38-17 en TCU, es segundo con 12 votos, y Notre Dame, tercera con 1. Los tres derrotados de la Big Ten caen: UCLA, del 4 al 10 tras perder 18-16 en Michigan en tres prórrogas; Indiana, del 6 al 12 tras caer 27-24 en Washington, y Ohio State, del 16 al 25 tras el 31-28 de Nebraska. Texas sube del 8 al 5 y Boise State baja del 15 al 22 tras perder 22-20 con San Diego State. Entran Oklahoma y Missouri; salen Kentucky y Memphis.",
      en: "The Associated Press media poll released on Sunday 22 November 2026. Georgia stay No. 1 with 56 first-place votes after winning 34-6 at South Carolina; Utah, the country's only unbeaten team after a 38-17 win at TCU, are second with 12 votes, and Notre Dame third with 1. The three beaten Big Ten teams fall: UCLA from 4 to 10 after losing 18-16 at Michigan in three overtimes; Indiana from 6 to 12 after losing 27-24 at Washington, and Ohio State from 16 to 25 after Nebraska's 31-28 win. Texas climb from 8 to 5 and Boise State drop from 15 to 22 after losing 22-20 to San Diego State. Oklahoma and Missouri come in; Kentucky and Memphis drop out.",
    },
    asOf: "2026-11-22",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_13.map(([rank, name, record, prev, votes]) => ({
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
    sourceIds: ["espn-cfb-rankings-week13-2026", "cbs-ap-poll-week13-2026", "espn-cfb-rankings-week12-2026", "espn-cfb-scoreboard-2026-11-21", "cbs-cfb-scoreboard-2026-11-21"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-11-26",
  },
];
