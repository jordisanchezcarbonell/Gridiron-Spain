import type { Ranking } from "@/types";

// [team, record, previous rank (null = unranked), first-place votes]
const AP_WEEK_7: [string, string, number | null, number][] = [
  ["Georgia", "6-0", 2, 66],
  ["Notre Dame", "6-0", 3, 1],
  ["Miami (Fla.)", "5-0", 4, 2],
  ["Ohio State", "5-1", 5, 0],
  ["Indiana", "6-0", 7, 1],
  ["Alabama", "5-1", 6, 0],
  ["Texas", "4-1", 1, 0],
  ["BYU", "5-0", 8, 0],
  ["Ole Miss", "4-1", 9, 0],
  ["Texas Tech", "5-0", 11, 0],
  ["Utah", "5-0", 12, 0],
  ["UCLA", "5-0", 21, 0],
  ["Missouri", "5-1", 14, 0],
  ["Tennessee", "5-1", 15, 0],
  ["Kentucky", "5-1", null, 0],
  ["Mississippi State", "4-1", 17, 0],
  ["Iowa", "5-1", 20, 0],
  ["Oklahoma State", "4-1", 18, 0],
  ["USC", "6-1", 19, 0],
  ["Houston", "5-1", 22, 0],
  ["Wake Forest", "5-1", null, 0],
  ["LSU", "4-2", 10, 0],
  ["Boise State", "5-1", 23, 0],
  ["SMU", "4-1", 24, 0],
  ["Northwestern", "4-1", null, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-7",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 7", en: "AP Top 25 · Week 7" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 11 de octubre de 2026, tras los partidos del día 10. Georgia es el nuevo n.º 1 con 66 de 70 votos tras ganar 20-17 en Alabama; Texas cae del 1 al 7 al perder 27-24 ante Oklahoma, UCLA sube del 21 al 12 tras ganar a Oregon, que sale del ranking junto a Florida y Pittsburgh, y LSU baja del 10 al 22. Entran Kentucky, Wake Forest y Northwestern.",
      en: "The Associated Press media poll released on 11 October 2026, after the games of the 10th. Georgia is the new No. 1 with 66 of 70 first-place votes after winning 20-17 at Alabama; Texas falls from 1 to 7 after losing 27-24 to Oklahoma, UCLA climbs from 21 to 12 after beating Oregon, who drop out along with Florida and Pittsburgh, and LSU slides from 10 to 22. Kentucky, Wake Forest and Northwestern enter.",
    },
    asOf: "2026-10-11",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_7.map(([name, record, prev, votes], i) => ({
          rank: i + 1,
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
    sourceIds: ["espn-cfb-rankings-week7-2026", "yahoo-ap-poll-week7-2026", "biglead-ap-poll-week7-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-12",
  },
];
