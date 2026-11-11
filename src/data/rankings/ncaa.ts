import type { Ranking } from "@/types";

// [rank, team, record, previous rank (null = unranked), first-place votes]
// Rank is explicit because the poll can have ties (Week 9 had two teams at No. 20).
const AP_WEEK_11: [number, string, string, number | null, number][] = [
  [1, "Georgia", "8-1", 2, 53],
  [2, "Utah", "9-0", 3, 12],
  [3, "Notre Dame", "8-1", 4, 5],
  [4, "UCLA", "9-0", 5, 0],
  [5, "Miami (Fla.)", "8-1", 1, 0],
  [6, "Indiana", "8-1", 6, 0],
  [7, "Alabama", "7-2", 9, 0],
  [8, "Texas", "7-2", 10, 0],
  [9, "Tennessee", "7-2", 16, 0],
  [10, "Texas Tech", "8-1", 13, 0],
  [11, "Wake Forest", "8-1", 14, 0],
  [12, "BYU", "7-2", 7, 0],
  [13, "Kentucky", "7-2", 8, 0],
  [14, "Houston", "7-2", 17, 0],
  [15, "USC", "7-2", 18, 0],
  [16, "Iowa", "7-2", 21, 0],
  [17, "Boise State", "8-1", 20, 0],
  [18, "Oregon", "6-3", null, 0],
  [19, "Ole Miss", "6-3", 12, 0],
  [20, "South Carolina", "6-3", 23, 0],
  [21, "Ohio State", "6-3", 11, 0],
  [22, "Arizona", "7-2", 24, 0],
  [23, "New Mexico", "8-1", 22, 0],
  [24, "LSU", "6-3", 15, 0],
  [25, "SMU", "7-2", null, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-11",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 11", en: "AP Top 25 · Week 11" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 8 de noviembre de 2026. Georgia recupera el n.º 1 con 53 de los 70 votos al primer puesto, después de que Notre Dame ganara 31-24 a Miami, que cae del 1 al 5 y es el cuarto n.º 1 que pierde esta temporada. Utah, invicto tras ganar 28-20 a BYU, es segundo con 12 votos, su mejor puesto en una temporada regular, y Notre Dame, tercera con 5. UCLA, también invicto, es cuarto, su mejor puesto desde 2001. Tennessee sube del 16 al 9 tras ganar 34-6 a Kentucky y Ohio State cae del 11 al 21 tras perder 41-28 con Oregon. Entran Oregon y SMU; salen Missouri y Florida.",
      en: "The Associated Press media poll released on 8 November 2026. Georgia regain No. 1 with 53 of the 70 first-place votes after Notre Dame beat Miami 31-24, dropping Miami from 1 to 5 as the fourth No. 1 to lose this season. Utah, unbeaten after a 28-20 win over BYU, are second with 12 votes, their best regular-season ranking, and Notre Dame third with 5. UCLA, also unbeaten, are fourth, their best ranking since 2001. Tennessee climb from 16 to 9 after beating Kentucky 34-6, and Ohio State fall from 11 to 21 after losing 41-28 to Oregon. Oregon and SMU come in; Missouri and Florida drop out.",
    },
    asOf: "2026-11-08",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_11.map(([rank, name, record, prev, votes]) => ({
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
    sourceIds: ["espn-cfb-rankings-week11-2026", "cbs-ap-poll-week11-2026", "espn-cfb-rankings-week10-2026", "abc7-ap-poll-week11-2026", "espn-cfb-scoreboard-2026-11-07", "cbs-cfb-scoreboard-2026-11-07", "ap-notre-dame-miami-2026", "ap-utah-byu-2026", "ap-tennessee-kentucky-2026", "ap-oregon-ohio-state-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-11-11",
  },
];
