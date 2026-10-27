import type { Ranking } from "@/types";

// [rank, team, record, previous rank (null = unranked), first-place votes]
// Rank is explicit because the poll can have ties (Week 9: two teams at No. 20).
const AP_WEEK_9: [number, string, string, number | null, number][] = [
  [1, "Miami (Fla.)", "7-0", 1, 59],
  [2, "Ohio State", "6-1", 3, 10],
  [3, "Georgia", "6-1", 5, 0],
  [4, "Indiana", "7-1", 6, 0],
  [5, "Notre Dame", "6-1", 4, 0],
  [6, "Utah", "7-0", 10, 1],
  [7, "UCLA", "7-0", 9, 0],
  [8, "BYU", "6-1", 2, 0],
  [9, "Kentucky", "7-1", 12, 0],
  [10, "Alabama", "6-2", 13, 0],
  [11, "Texas", "5-2", 19, 0],
  [12, "Ole Miss", "5-2", 7, 0],
  [13, "Texas Tech", "6-1", 8, 0],
  [14, "Wake Forest", "6-1", 17, 0],
  [15, "LSU", "6-2", 18, 0],
  [16, "Tennessee", "6-2", 11, 0],
  [17, "Florida", "5-2", 20, 0],
  [18, "Houston", "6-2", 14, 0],
  [19, "SMU", "6-1", 23, 0],
  [20, "Boise State", "6-1", 21, 0],
  [20, "Northwestern", "6-1", 24, 0],
  [22, "Arizona", "6-1", 25, 0],
  [23, "Missouri", "5-2", 22, 0],
  [24, "Oklahoma State", "5-2", null, 0],
  [25, "Wisconsin", "5-2", null, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-9",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 9", en: "AP Top 25 · Week 9" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 25 de octubre de 2026. Miami sigue n.º 1 y amplía su ventaja: 59 de los 70 votos al primer puesto, tras ganar 52-23 a Pittsburgh. Ohio State es segundo con 10 y Utah, sexto, se lleva el voto restante después de ganar 21-13 a Houston en el partido de College GameDay. BYU cae del 2 al 8 tras perder en la doble prórroga en UCF, Texas sube del 19 al 11 tras ganar 34-27 a Ole Miss y Texas Tech baja del 8 al 13 tras caer en Cincinnati. Boise State y Northwestern empatan en el puesto 20. Entran Oklahoma State y Wisconsin, este por primera vez desde septiembre de 2023; salen Iowa y USC.",
      en: "The Associated Press media poll released on 25 October 2026. Miami stay No. 1 and stretch their lead: 59 of the 70 first-place votes after beating Pittsburgh 52-23. Ohio State are second with 10 and Utah, sixth, take the remaining vote after beating Houston 21-13 in College GameDay's game. BYU fall from 2 to 8 after losing in double overtime at UCF, Texas climb from 19 to 11 after beating Ole Miss 34-27 and Texas Tech drop from 8 to 13 after losing at Cincinnati. Boise State and Northwestern tie at No. 20. Oklahoma State and Wisconsin come in, Wisconsin for the first time since September 2023; Iowa and USC drop out.",
    },
    asOf: "2026-10-25",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_9.map(([rank, name, record, prev, votes]) => ({
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
    sourceIds: ["espn-cfb-rankings-week9-2026", "cbs-ap-poll-week9-2026", "biglead-ap-poll-week9-2026", "cbs-cfb-scoreboard-2026-10-24", "espn-cfb-scoreboard-2026-10-24"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-27",
  },
];
