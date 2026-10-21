import type { Ranking } from "@/types";

// [team, record, previous rank (null = unranked), first-place votes]
const AP_WEEK_8: [string, string, number | null, number][] = [
  ["Miami (Fla.)", "6-0", 3, 40],
  ["BYU", "6-0", 8, 20],
  ["Ohio State", "6-1", 4, 9],
  ["Notre Dame", "6-1", 2, 0],
  ["Georgia", "6-1", 1, 0],
  ["Indiana", "6-1", 5, 0],
  ["Ole Miss", "5-1", 9, 0],
  ["Texas Tech", "6-0", 10, 1],
  ["UCLA", "6-0", 12, 0],
  ["Utah", "6-0", 11, 0],
  ["Tennessee", "6-1", 14, 0],
  ["Kentucky", "6-1", 15, 0],
  ["Alabama", "5-2", 6, 0],
  ["Houston", "6-1", 20, 0],
  ["Iowa", "5-1", 17, 0],
  ["USC", "6-1", 19, 0],
  ["Wake Forest", "6-1", 21, 0],
  ["LSU", "5-2", 22, 0],
  ["Texas", "4-2", 7, 0],
  ["Florida", "5-2", null, 0],
  ["Boise State", "5-1", 23, 0],
  ["Missouri", "5-2", 13, 0],
  ["SMU", "5-1", 24, 0],
  ["Northwestern", "5-1", 25, 0],
  ["Arizona", "5-1", null, 0],
];

export const ncaaRankings: Ranking[] = [
  {
    id: "ap-top-25-2026-week-8",
    slug: "ap-top-25",
    scope: "ncaa",
    kind: "poll",
    title: { es: "AP Top 25 · Semana 8", en: "AP Top 25 · Week 8" },
    description: {
      es: "La encuesta de periodistas de Associated Press publicada el 18 de octubre de 2026, tras el sábado más convulso que se recuerda: cinco de los siete primeros perdieron el mismo día, algo que no había pasado en los 90 años de historia del ranking. Miami es n.º 1 por primera vez desde 2002, con 40 de los 70 votos y solo 22 puntos de ventaja sobre BYU, después de ganar 43-35 a Florida State en la segunda prórroga. BYU sube del 8 al 2 tras tumbar a Notre Dame y Ohio State es tercero tras cortar la racha de 22 victorias de Indiana. Georgia cae del 1 al 5, Alabama del 6 al 13 y Texas se desploma doce puestos hasta el 19. Entran Florida y Arizona; salen Mississippi State y Oklahoma State.",
      en: "The Associated Press media poll released on 18 October 2026, after the wildest Saturday in memory: five of the top seven lost on the same day, something that had never happened in the 90-year history of the poll. Miami are No. 1 for the first time since 2002, with 40 of the 70 first-place votes and just 22 points clear of BYU, after beating Florida State 43-35 in double overtime. BYU climb from 8 to 2 after toppling Notre Dame and Ohio State are third after ending a 22-game Indiana winning streak. Georgia fall from 1 to 5, Alabama from 6 to 13 and Texas slide twelve places to 19. Florida and Arizona come in; Mississippi State and Oklahoma State drop out.",
    },
    asOf: "2026-10-18",
    competitionId: "ncaa-fbs",
    // AP releases a new poll every Sunday until the national championship game.
    refresh: { everyDays: 8, activeFrom: "2026-08-23", activeUntil: "2027-01-25" },
    groups: [
      {
        entries: AP_WEEK_8.map(([name, record, prev, votes], i) => ({
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
    sourceIds: ["si-ap-poll-week8-2026", "br-ap-poll-week8-2026", "wtimes-miami-num1-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-21",
  },
];
