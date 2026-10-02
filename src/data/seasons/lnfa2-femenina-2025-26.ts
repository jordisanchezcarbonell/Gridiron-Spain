import type { Season } from "@/types";

const V = "2026-10-02";

/** LNFA 2 and LNFA Femenina 2025-26. Records from FEFA team pages; research: research/spain/lnfa2-2025-26.md */
export const secondaryLeagueSeasons: Season[] = [
  {
    id: "lnfa-2-2025-26",
    slug: "2025-26",
    competitionId: "lnfa-2",
    name: { es: "LNFA 2 2025-26", en: "LNFA 2 2025-26" },
    status: "completed",
    summary: {
      es: "Alcobendas Cavaliers ganaron la LNFA 2 tras una temporada perfecta y vuelven a la Serie A: 7-0 en la Conferencia Madrileña y tres victorias en el play-off, la última 0-35 en Alcorcón ante los Smilodons.",
      en: "Alcobendas Cavaliers won LNFA 2 after a perfect season and return to Serie A: 7-0 in the Madrid Conference and three play-off wins, the last 35-0 at Alcorcón Smilodons.",
    },
    format: {
      es: "La FEFA anunció 29 equipos en cinco conferencias territoriales (las tablas finales suman 28). Fase regular desde el 13-14 de diciembre de 2025 y fase final con ocho equipos: los primeros de cada conferencia, el segundo catalán y los dos mejores segundos del resto.",
      en: "FEFA announced 29 teams in five territorial conferences (the final tables add up to 28). Regular season from 13-14 December 2025 and an eight-team play-off: each conference winner, the Catalan runner-up and the two best other runners-up.",
    },
    groups: [
      {
        name: { es: "Conferencia Norte", en: "North Conference" },
        entries: [
          { teamId: "valladolid-penguins", record: { wins: 6, losses: 1 } },
          { teamId: "santurtzi-coyotes", record: { wins: 4, losses: 3 } },
          { teamId: "cantabria-bisons", record: { wins: 4, losses: 3 } },
          { teamId: "torrelavega-berserkers", record: { wins: 3, losses: 3 } },
          { teamId: "villamayor-mercenarios", record: { wins: 2, losses: 4 } },
          { teamId: "guadalajara-stings", record: { wins: 0, losses: 5 } },
        ],
      },
      {
        name: { es: "Conferencia Levantina", en: "Levante Conference" },
        entries: [
          { teamId: "valencia-giants", record: { wins: 6, losses: 1 } },
          { teamId: "alicante-sharks", record: { wins: 6, losses: 2 } },
          { teamId: "sueca-ricers", record: { wins: 5, losses: 2 } },
          { teamId: "alicante-thunder", record: { wins: 1, losses: 7 } },
          { teamId: "murcia-cobras", record: { wins: 1, losses: 7 } },
        ],
      },
      {
        name: { es: "Conferencia Sur", en: "South Conference" },
        entries: [
          { teamId: "jerez-jaguars", record: { wins: 5, losses: 0 } },
          { teamId: "mairena-blue-devils", record: { wins: 4, losses: 2 } },
          { teamId: "canarias-canes", record: { wins: 2, losses: 3 } },
          { teamId: "sevilla-linces", record: { wins: 0, losses: 6 } },
        ],
      },
      {
        name: { es: "Conferencia Catalana", en: "Catalan Conference" },
        entries: [
          { teamId: "barcelona-pagesos", record: { wins: 7, losses: 0 } },
          { teamId: "reus-imperials", record: { wins: 5, losses: 2 } },
          { teamId: "argentona-bocs", record: { wins: 4, losses: 3 } },
          { teamId: "riudoms-rebels", record: { wins: 3, losses: 4 } },
          { teamId: "barbera-rookies", record: { wins: 2, losses: 4 } },
          { teamId: "barcelona-uroloki", record: { wins: 2, losses: 4 } },
          { teamId: "barcelona-bufals", record: { wins: 0, losses: 6 } },
        ],
      },
      {
        name: { es: "Conferencia Madrileña", en: "Madrid Conference" },
        entries: [
          { teamId: "alcobendas-cavaliers", record: { wins: 7, losses: 0 }, note: { es: "Campeón y ascendido", en: "Champion, promoted" } },
          { teamId: "alcorcon-smilodons", record: { wins: 5, losses: 2 } },
          { teamId: "tres-cantos-jabatos", record: { wins: 3, losses: 3 } },
          { teamId: "boadilla-vikings", record: { wins: 2, losses: 4 } },
          { teamId: "pinto-goldbats", record: { wins: 1, losses: 4 } },
          { teamId: "madrid-capitals", record: { wins: 0, losses: 5 } },
        ],
      },
    ],
    phases: [
      { name: { es: "Fase regular", en: "Regular season" }, start: "2025-12-13" },
      {
        name: { es: "Cuartos de final", en: "Quarter-finals" },
        start: "2026-05-16",
        end: "2026-05-17",
        result: {
          es: "Valladolid Penguins 7-36 Alcorcón Smilodons · Valencia Giants 10-9 Reus Imperials · Jerez Jaguars 17-10 Alicante Sharks (prórroga) · Alcobendas Cavaliers 28-16 Barcelona Pagesos",
          en: "Valladolid Penguins 7-36 Alcorcón Smilodons · Valencia Giants 10-9 Reus Imperials · Jerez Jaguars 17-10 Alicante Sharks (OT) · Alcobendas Cavaliers 28-16 Barcelona Pagesos",
        },
      },
      {
        name: { es: "Semifinales", en: "Semifinals" },
        start: "2026-05-30",
        end: "2026-05-31",
        result: { es: "Alcorcón Smilodons 24-20 Valencia Giants · Alcobendas Cavaliers 23-6 Jerez Jaguars", en: "Alcorcón Smilodons 24-20 Valencia Giants · Alcobendas Cavaliers 23-6 Jerez Jaguars" },
      },
      {
        name: { es: "Final", en: "Final" },
        start: "2026-06-13",
        end: "2026-06-14",
        venue: { es: "Polideportivo Prado Santo Domingo, Alcorcón", en: "Polideportivo Prado Santo Domingo, Alcorcón" },
        result: { es: "Alcorcón Smilodons 0-35 Alcobendas Cavaliers · MVP: Pablo Vázquez", en: "Alcorcón Smilodons 0-35 Alcobendas Cavaliers · MVP: Pablo Vázquez" },
      },
    ],
    champion: { teamId: "alcobendas-cavaliers" },
    runnerUp: { teamId: "alcorcon-smilodons" },
    sourceIds: ["fefa-lnfa2-2025-26", "fefa-lnfa2-cuadro-playoffs-2026", "fefa-lnfa2-previa-cuartos-2026", "fefa-lnfa2-cuartos-2026", "fefa-lnfa2-previa-semis-2026", "fefa-lnfa2-semis-2026", "fefa-lnfa2-final-2026"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
  },
  {
    id: "lnfa-femenina-2025-26",
    slug: "2025-26",
    competitionId: "lnfa-femenina",
    name: { es: "LNFA Femenina 2025-26", en: "LNFA Femenina 2025-26" },
    status: "completed",
    summary: {
      es: "Barberà Rookies ganaron su undécima liga sin perder un partido: 6-0 en la fase regular, 24-0 a Zaragoza en semifinales y 25-19 en la prórroga de la final ante Valencia Firebats. Las vigentes campeonas, Black Demons, no participaron.",
      en: "Barberà Rookies won their eleventh league title unbeaten: 6-0 in the regular season, 24-0 over Zaragoza in the semifinal and 25-19 in overtime in the final against Valencia Firebats. Defending champions Black Demons did not take part.",
    },
    format: {
      es: "Siete equipos en un grupo único desde el 10 de enero de 2026; los cuatro primeros jugaron las semifinales.",
      en: "Seven teams in a single group from 10 January 2026; the top four played the semifinals.",
    },
    groups: [
      {
        name: { es: "Fase regular", en: "Regular season" },
        entries: [
          { teamId: "barbera-rookies", record: { wins: 6, losses: 0 }, note: { es: "Campeonas", en: "Champions" } },
          { teamId: "valencia-firebats", record: { wins: 5, losses: 1 } },
          { teamId: "lhospitalet-pioners", record: { wins: 3, losses: 3 } },
          { teamId: "zaragoza-hurricanes", record: { wins: 3, losses: 3 } },
          { name: "Osas Rivas", record: { wins: 2, losses: 4 } },
          { teamId: "barcelona-bufals", record: { wins: 2, losses: 4 } },
          { teamId: "cenes-de-la-vega-valkirias", record: { wins: 0, losses: 6 } },
        ],
      },
    ],
    phases: [
      { name: { es: "Fase regular", en: "Regular season" }, start: "2026-01-10" },
      {
        name: { es: "Semifinales (crónica de la FEFA del 26 de abril)", en: "Semifinals (FEFA report of 26 April)" },
        start: "2026-04-26",
        result: { es: "Barberà Rookies 24-0 Zaragoza Hurricanes · Valencia Firebats 39-7 L'Hospitalet Pioners", en: "Barberà Rookies 24-0 Zaragoza Hurricanes · Valencia Firebats 39-7 L'Hospitalet Pioners" },
      },
      {
        name: { es: "Final", en: "Final" },
        start: "2026-05-03",
        venue: { es: "CampOval de Picanya", en: "CampOval, Picanya" },
        result: { es: "Barberà Rookies 25-19 Valencia Firebats (prórroga) · MVP: Alba Izquierdo", en: "Barberà Rookies 25-19 Valencia Firebats (OT) · MVP: Alba Izquierdo" },
      },
    ],
    champion: { teamId: "barbera-rookies" },
    runnerUp: { teamId: "valencia-firebats" },
    sourceIds: ["fefa-femenina-2025-26", "fefa-femenina-j6-2026", "fefa-femenina-semis-2026", "fefa-femenina-final-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "lnfa-femenina-2026-27",
    slug: "2026-27",
    competitionId: "lnfa-femenina",
    name: { es: "LNFA Femenina 2026-27", en: "LNFA Femenina 2026-27" },
    status: "upcoming",
    summary: {
      es: "Cinco equipos en el calendario publicado por la FEFA, que arranca el 23 de enero de 2027. Barcelona Búfals y Valkirias no figuran.",
      en: "Five teams in the schedule published by FEFA, starting on 23 January 2027. Barcelona Búfals and Valkirias are not listed.",
    },
    format: { es: "Grupo único de cinco equipos.", en: "Single five-team group." },
    groups: [
      {
        name: { es: "Equipos", en: "Teams" },
        entries: [{ teamId: "barbera-rookies", note: { es: "Campeonas 2026", en: "2026 champions" } }, { teamId: "lhospitalet-pioners" }, { name: "Osas Rivas" }, { teamId: "valencia-firebats" }, { teamId: "zaragoza-hurricanes" }],
      },
    ],
    phases: [{ name: { es: "Jornada 1", en: "Round 1" }, start: "2027-01-23" }],
    sourceIds: ["fefa-femenina-page-2026-27"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
];
