import type { Ranking } from "@/types";

// [team, record, previous rank (null = unranked), first-place votes]
const AP_WEEK_6: [string, string, number | null, number][] = [
  ["Texas", "4-0", 1, 61],
  ["Georgia", "5-0", 2, 6],
  ["Notre Dame", "5-0", 3, 0],
  ["Miami (Fla.)", "5-0", 4, 2],
  ["Ohio State", "4-1", 5, 0],
  ["Alabama", "5-0", 7, 0],
  ["Indiana", "5-0", 6, 1],
  ["BYU", "4-0", 10, 0],
  ["Ole Miss", "3-1", 9, 0],
  ["LSU", "4-1", 11, 0],
  ["Texas Tech", "5-0", 12, 0],
  ["Utah", "4-0", 13, 0],
  ["Oregon", "3-1", 15, 0],
  ["Missouri", "4-1", 25, 0],
  ["Tennessee", "4-1", 17, 0],
  ["Florida", "4-1", 8, 0],
  ["Mississippi State", "4-1", 16, 0],
  ["Oklahoma State", "3-1", 19, 0],
  ["USC", "5-1", 18, 0],
  ["Iowa", "4-1", 14, 0],
  ["UCLA", "4-0", 23, 0],
  ["Houston", "4-1", 20, 0],
  ["Boise State", "4-1", 22, 0],
  ["SMU", "4-1", 21, 0],
  ["Pittsburgh", "5-0", null, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-6",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 6", en: "AP Top 25 · Week 6" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 4 de octubre de 2026, tras los partidos del día 3. Texas sigue líder con 61 votos al n.º 1; Missouri sube del 25 al 14 tras ganar a Florida, que cae del 8 al 16, y Pittsburgh entra en lugar de Kentucky.",
      en: "The Associated Press media poll released on 4 October 2026, after the games of the 3rd. Texas stays on top with 61 first-place votes; Missouri climbs from 25 to 14 after beating Florida, who drop from 8 to 16, and Pittsburgh replaces Kentucky.",
    },
    asOf: "2026-10-04",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_6.map(([name, record, prev, votes], i) => ({
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
    sourceIds: ["espn-cfb-rankings-week6-2026", "lsu-national-rankings-2026-10-04", "br-ap-poll-week6-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-06",
  },
];
