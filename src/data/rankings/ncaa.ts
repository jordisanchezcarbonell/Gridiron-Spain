import type { Ranking } from "@/types";

// [team, record, previous rank (null = unranked), first-place votes]
const AP_WEEK_5: [string, string, number | null, number][] = [
  ["Texas", "4-0", 1, 62],
  ["Georgia", "4-0", 2, 6],
  ["Notre Dame", "4-0", 3, 0],
  ["Miami (Fla.)", "4-0", 6, 1],
  ["Ohio State", "3-1", 7, 0],
  ["Indiana", "4-0", 5, 1],
  ["Alabama", "4-0", 8, 0],
  ["Florida", "4-0", 21, 0],
  ["Ole Miss", "3-1", 4, 0],
  ["BYU", "3-0", 9, 0],
  ["LSU", "3-1", 10, 0],
  ["Texas Tech", "4-0", 11, 0],
  ["Utah", "4-0", 15, 0],
  ["Iowa", "4-0", 17, 0],
  ["Oregon", "3-1", 20, 0],
  ["Mississippi State", "4-0", 24, 0],
  ["Tennessee", "3-1", 14, 0],
  ["USC", "4-1", 12, 0],
  ["Oklahoma State", "3-1", null, 0],
  ["Houston", "3-1", 25, 0],
  ["SMU", "3-1", 22, 0],
  ["Boise State", "3-1", null, 0],
  ["UCLA", "4-0", null, 0],
  ["Kentucky", "3-1", null, 0],
  ["Missouri", "3-1", 19, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-5",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 5", en: "AP Top 25 · Week 5" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 27 de septiembre de 2026, tras los partidos del día 26. Texas sigue líder con 62 votos al n.º 1; Florida sube del 21 al 8.",
      en: "The Associated Press media poll released on 27 September 2026, after the games of the 26th. Texas stays on top with 62 first-place votes; Florida climbs from 21 to 8.",
    },
    asOf: "2026-09-27",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_5.map(([name, record, prev, votes], i) => ({
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
    sourceIds: ["espn-cfb-rankings-week5-2026", "lsu-national-rankings-2026-09-27", "br-ap-poll-week5-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-02",
  },
];
