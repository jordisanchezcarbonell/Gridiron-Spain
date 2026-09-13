import type { Season } from "@/types";

const V = "2026-09-13";

/**
 * Competition seasons. Team slots reference documented teams by id where a
 * profile exists; otherwise a plain name is used until the profile is written.
 */
export const seasons: Season[] = [
  {
    id: "lnfa-2026-27",
    slug: "2026-27",
    competitionId: "lnfa",
    name: { es: "LNFA 2026-27", en: "LNFA 2026-27" },
    status: "upcoming",
    summary: {
      es: "Diez equipos en dos conferencias. Los dos primeros de cada conferencia juegan las semifinales; los dos últimos disputan una ronda por la permanencia. Alcobendas Cavaliers suben tras ganar la LNFA 2 y sustituyen a Gijón Mariners.",
      en: "Ten teams in two conferences. The top two in each conference play the semifinals; the bottom two play a relegation round. Alcobendas Cavaliers come up as LNFA 2 champions, replacing Gijón Mariners.",
    },
    format: {
      es: "Liga regular por conferencias del 16-17 de enero al 18 de abril de 2027, semifinales el 1-2 de mayo y Spanish Bowl el 22 de mayo de 2027.",
      en: "Conference regular season from 16-17 January to 18 April 2027, semifinals on 1-2 May and the Spanish Bowl on 22 May 2027.",
    },
    groups: [
      {
        name: { es: "Conferencia Este", en: "East Conference" },
        entries: [
          { teamId: "lhospitalet-pioners" },
          { teamId: "badalona-dracs" },
          { teamId: "zaragoza-hurricanes" },
          { teamId: "valencia-firebats" },
          { teamId: "terrassa-reds" },
        ],
      },
      {
        name: { es: "Conferencia Oeste", en: "West Conference" },
        entries: [
          { teamId: "camioneros-coslada" },
          { teamId: "mallorca-voltors" },
          { teamId: "osos-rivas" },
          { teamId: "alcobendas-cavaliers", note: { es: "Ascendido", en: "Promoted" } },
          { teamId: "las-rozas-black-demons", note: { es: "Campeón 2026", en: "2026 champion" } },
        ],
      },
    ],
    phases: [
      { name: { es: "Liga regular", en: "Regular season" }, start: "2027-01-16", end: "2027-04-18" },
      { name: { es: "Semifinales", en: "Semifinals" }, start: "2027-05-01", end: "2027-05-02" },
      { name: { es: "Spanish Bowl XXXIII", en: "Spanish Bowl XXXIII" }, start: "2027-05-22", venue: { es: "Sede por anunciar", en: "Venue to be announced" } },
    ],
    sourceIds: ["fefa-calendario-2026-27", "fefa-lnfa2-final-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "lnfa-2025-26",
    slug: "2025-26",
    competitionId: "lnfa",
    name: { es: "LNFA 2025-26", en: "LNFA 2025-26" },
    status: "completed",
    summary: {
      es: "Las Rozas Black Demons ganaron su cuarta Spanish Bowl consecutiva ante Badalona Dracs en el Estadi Municipal de Badalona. Valencia Firebats volvieron a la Serie A como campeones de la LNFA 2; Gijón Mariners descendieron.",
      en: "Las Rozas Black Demons won their fourth straight Spanish Bowl against Badalona Dracs at the Estadi Municipal de Badalona. Valencia Firebats returned to Serie A as LNFA 2 champions; Gijón Mariners were relegated.",
    },
    format: {
      es: "Diez equipos en dos conferencias, diez jornadas del 17-18 de enero al 11-12 de abril de 2026, semifinales el 25-26 de abril y final el 2 de mayo.",
      en: "Ten teams in two conferences, ten rounds from 17-18 January to 11-12 April 2026, semifinals on 25-26 April and final on 2 May.",
    },
    groups: [
      {
        name: { es: "Conferencia Este", en: "East Conference" },
        entries: [
          { teamId: "badalona-dracs", record: { wins: 6, losses: 1 } },
          { teamId: "terrassa-reds", record: { wins: 5, losses: 3 } },
          { teamId: "valencia-firebats", record: { wins: 4, losses: 4 }, note: { es: "Ascendido de LNFA 2", en: "Promoted from LNFA 2" } },
          { teamId: "mallorca-voltors", record: { wins: 2, losses: 5 } },
          { teamId: "lhospitalet-pioners", record: { wins: 2, losses: 6 } },
        ],
      },
      {
        name: { es: "Conferencia Oeste", en: "West Conference" },
        entries: [
          { teamId: "las-rozas-black-demons", record: { wins: 7, losses: 1 } },
          { teamId: "osos-rivas", record: { wins: 5, losses: 1, ties: 2 } },
          { teamId: "zaragoza-hurricanes", record: { wins: 3, losses: 4, ties: 1 } },
          { teamId: "camioneros-coslada", record: { wins: 2, losses: 5, ties: 1 } },
          { name: "Gijón Mariners", record: { wins: 1, losses: 6 }, note: { es: "Descendido", en: "Relegated" } },
        ],
      },
    ],
    phases: [
      { name: { es: "Liga regular", en: "Regular season" }, start: "2026-01-17", end: "2026-04-12" },
      {
        name: { es: "Semifinales", en: "Semifinals" },
        start: "2026-04-25",
        end: "2026-04-26",
        result: { es: "Badalona Dracs 20-14 Osos Rivas · Black Demons 13-0 Terrassa Reds", en: "Badalona Dracs 20-14 Osos Rivas · Black Demons 13-0 Terrassa Reds" },
      },
      {
        name: { es: "Spanish Bowl XXXII", en: "Spanish Bowl XXXII" },
        start: "2026-05-02",
        venue: { es: "Estadi Municipal de Badalona", en: "Estadi Municipal de Badalona" },
        result: { es: "Las Rozas Black Demons 27-13 Badalona Dracs · MVP: Daniel Romero", en: "Las Rozas Black Demons 27-13 Badalona Dracs · MVP: Daniel Romero" },
      },
    ],
    champion: { teamId: "las-rozas-black-demons" },
    runnerUp: { teamId: "badalona-dracs" },
    sourceIds: ["fefa-calendario-2025-26", "fefa-spanish-bowl-2026", "fefa-lnfa-semis-2026", "fefa-team-firebats", "fefa-team-hurricanes", "fefa-team-camioneros", "fefa-team-osos"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
  },
];
