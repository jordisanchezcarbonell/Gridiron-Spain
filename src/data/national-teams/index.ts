import type { NationalTeam } from "@/types";

const V = "2026-10-02";
const EURO_MEN = { es: "Europeo IFAF 2026-27 · Nivel 2", en: "IFAF European Championship 2026-27 · Level 2" };
const EURO_WOMEN = { es: "Europeo femenino IFAF 2025-26", en: "IFAF Women's European Championship 2025-26" };
const FLAG_WORLDS = { es: "Mundial de flag 2026 · Düsseldorf", en: "2026 Flag World Championship · Düsseldorf" };
const YOUTH_FLAG = { es: "Europeo youth de flag 2026 · Italia", en: "2026 European Youth Flag Championships · Italy" };
const U19_EURO = { es: "Europeo U19 IFAF 2026-27", en: "IFAF U19 European Championship 2026-27" };

/**
 * Spain's national teams. Results list Spain's score first.
 * Research: research/spain/seleccion-2026-10-02.md
 */
export const nationalTeams: NationalTeam[] = [
  {
    id: "masculina",
    name: { es: "Absoluta masculina", en: "Senior men" },
    discipline: "tackle",
    coach: "Jesús Fernández Pino",
    competition: EURO_MEN,
    summary: {
      es: "España vuelve al Europeo en el Nivel 2: una liguilla a ida y vuelta con Georgia y un equipo de desarrollo de Gran Bretaña entre octubre de 2026 y octubre de 2027. Jesús Fernández Pino es el nuevo seleccionador desde febrero de 2026.",
      en: "Spain returns to the European Championship in Level 2: a home-and-away round robin with Georgia and a Great Britain development team between October 2026 and October 2027. Jesús Fernández Pino has been head coach since February 2026.",
    },
    upcoming: [
      { date: "2026-10-18", opponent: "Gran Bretaña (equipo de desarrollo)", venue: "Nick Newbold Stadium, Coventry", competition: EURO_MEN, note: { es: "13:00 hora peninsular. Fecha publicada por la IFAF; la FEFA aún no lo ha anunciado.", en: "1 pm Spanish time. Date published by IFAF; FEFA has not announced it yet." }, sourceIds: ["selec-ifaf-euro-men-2026-09-29"], verificationStatus: "partial" },
      { date: "2026-10-24", opponent: "Georgia", venue: "Jaca", competition: EURO_MEN, note: { es: "17:00. Primer partido en casa del ciclo.", en: "5 pm. First home game of the cycle." }, sourceIds: ["selec-ifaf-euro-men-2026-09-29", "selec-fefa-tryouts-masc-2026-09-18"], verificationStatus: "verified" },
    ],
    results: [
      { date: "2022-10-22", opponent: "Irlanda", venue: "Estadio Rafael Mendoza, Pinto", competition: { es: "Europeo IFAF · Grupo B", en: "IFAF European Championship · Group B" }, score: "26-7", result: "win", sourceIds: ["selec-fefa-masc-irlanda-2022"], verificationStatus: "verified" },
      { date: "2023-08-06", opponent: "Israel", venue: "Jerusalén", competition: { es: "Europeo IFAF · Grupo B", en: "IFAF European Championship · Group B" }, score: "23-30", result: "loss", sourceIds: ["selec-fefa-masc-israel-2023"], verificationStatus: "verified" },
    ],
    sourceIds: ["selec-ifaf-euro-men-2026-09-29", "selec-fefa-tryouts-masc-2026-09-18", "selec-fefa-staff-2026-02-11", "selec-fefa-masc-irlanda-2022", "selec-fefa-masc-israel-2023"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "femenina",
    name: { es: "Absoluta femenina", en: "Senior women" },
    discipline: "tackle",
    coach: "Jesús Efrén Sánchez García",
    competition: EURO_WOMEN,
    summary: {
      es: "Bronce europeo en 2025-26, después de que Gran Bretaña se retirase del partido por el tercer puesto; venía de ser campeona de Europa. Jesús Efrén Sánchez sustituyó a Manuel Ibáñez como seleccionador el 3 de septiembre de 2026.",
      en: "European bronze in 2025-26, after Great Britain withdrew from the third-place game; Spain came in as reigning European champions. Jesús Efrén Sánchez replaced Manuel Ibáñez as head coach on 3 September 2026.",
    },
    upcoming: [],
    results: [
      { date: "2025-08-31", opponent: "Alemania", venue: "Bonn", competition: EURO_WOMEN, score: "7-22", result: "loss", sourceIds: ["fefa-femenina-alemania-2025"], verificationStatus: "verified" },
      { date: "2025-10-18", opponent: "Gran Bretaña", venue: "Jaca", competition: EURO_WOMEN, score: "26-22", result: "win", note: { es: "Remontada con un pase de 65 yardas de Victoria Valverde.", en: "Comeback sealed by a 65-yard Victoria Valverde pass." }, sourceIds: ["fefa-femenina-gb-2025"], verificationStatus: "verified" },
      { date: "2026-05-30", opponent: "Finlandia", venue: "Calatayud", competition: EURO_WOMEN, score: "13-31", result: "loss", sourceIds: ["fefa-femenina-finlandia-2026"], verificationStatus: "verified" },
      { date: "2026-08-23", opponent: "Gran Bretaña", competition: { es: "Europeo femenino · partido por el bronce", en: "Women's European Championship · bronze game" }, note: { es: "No se jugó: Gran Bretaña se retiró y el bronce fue para España.", en: "Not played: Great Britain withdrew and Spain took bronze." }, sourceIds: ["selec-fefa-fem-bronce-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["fefa-femenina-alemania-2025", "fefa-femenina-gb-2025", "fefa-femenina-finlandia-2026", "selec-fefa-fem-bronce-2026", "selec-fefa-fem-coach-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "flag-femenina",
    name: { es: "Flag femenina", en: "Women's flag" },
    discipline: "flag",
    coach: "Daniel Castañón",
    competition: FLAG_WORLDS,
    summary: {
      es: "Octava en el Mundial de Düsseldorf 2026, donde cayó 26-27 en cuartos ante México. Bronce en el Europeo de París 2025.",
      en: "Eighth at the 2026 World Championship in Düsseldorf, where it lost 26-27 to Mexico in the quarter-finals. Bronze at the 2025 European Championship in Paris.",
    },
    upcoming: [],
    results: [
      { date: "2026-08-13", opponent: "Nigeria", competition: FLAG_WORLDS, note: { es: "Victoria por incomparecencia: Nigeria no obtuvo los visados.", en: "Won by forfeit: Nigeria could not get visas." }, result: "win", sourceIds: ["selec-fefa-flagfem-previa-2026"], verificationStatus: "verified" },
      { date: "2026-08-13", opponent: "Australia", competition: FLAG_WORLDS, score: "39-25", result: "win", sourceIds: ["selec-fefa-flagfem-cuartos-2026"], verificationStatus: "verified" },
      { date: "2026-08-14", opponent: "Estados Unidos", competition: FLAG_WORLDS, score: "31-52", result: "loss", sourceIds: ["selec-fefa-flagfem-cuartos-2026"], verificationStatus: "verified" },
      { date: "2026-08-15", opponent: "México", competition: { es: "Mundial de flag 2026 · cuartos de final", en: "2026 Flag World Championship · quarter-final" }, score: "26-27", result: "loss", sourceIds: ["fefa-flag-mexico-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["selec-fefa-flagfem-previa-2026", "selec-fefa-flagfem-cuartos-2026", "fefa-flag-mexico-2026", "fefa-flag-mundial-2026", "selec-fefa-euroflag-2025"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "flag-masculina",
    name: { es: "Flag masculina", en: "Men's flag" },
    discipline: "flag",
    coach: "Christian García Delgado",
    summary: {
      es: "No se clasificó para el Mundial de 2026 y no tiene competición internacional este año. Christian García Delgado es su entrenador desde abril de 2026.",
      en: "Did not qualify for the 2026 World Championship and has no international competition this year. Christian García Delgado has been head coach since April 2026.",
    },
    upcoming: [],
    results: [],
    sourceIds: ["selec-fefa-flagmasc-coach-2026"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
  },
  {
    id: "u19",
    name: { es: "Sub-19", en: "Under-19" },
    discipline: "tackle",
    competition: U19_EURO,
    summary: {
      es: "Segunda de su grupo con una victoria y una derrota. En 2027 jugará por los puestos cuarto a sexto ante Finlandia e Israel.",
      en: "Second in its group with one win and one loss. In 2027 it will play for fourth to sixth place against Finland and Israel.",
    },
    upcoming: [],
    results: [
      { date: "2026-04-04", opponent: "Austria", venue: "Calatayud", competition: U19_EURO, score: "7-17", result: "loss", sourceIds: ["selec-fefa-u19-austria-2026"], verificationStatus: "verified" },
      { date: "2026-05-10", opponent: "República Checa", venue: "Praga", competition: U19_EURO, score: "43-14", result: "win", note: { es: "Primera victoria continental de esta generación; cuatro pases de touchdown de Juan Baró.", en: "This generation's first continental win; four touchdown passes from Juan Baró." }, sourceIds: ["fefa-u19-chequia-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["selec-fefa-u19-austria-2026", "fefa-u19-chequia-2026", "selec-ifaf-u19-2026-09-20"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "u17-flag",
    name: { es: "Flag sub-17 masculina", en: "Under-17 men's flag" },
    discipline: "flag",
    competition: YOUTH_FLAG,
    summary: {
      es: "Campeona de Europa por segundo año seguido: ganó la final de Comacchio a Israel por 32-31 el 26 de septiembre de 2026, con Iván Escudero como MVP.",
      en: "European champions for a second straight year: beat Israel 32-31 in the Comacchio final on 26 September 2026, with Iván Escudero as MVP.",
    },
    upcoming: [],
    results: [
      { date: "2026-09-24", opponent: "Gran Bretaña", competition: YOUTH_FLAG, score: "54-26", result: "win", sourceIds: ["selec-fefa-youth-2026"], verificationStatus: "verified" },
      { date: "2026-09-24", opponent: "Alemania", competition: YOUTH_FLAG, score: "56-19", result: "win", sourceIds: ["selec-fefa-youth-2026"], verificationStatus: "verified" },
      { date: "2026-09-26", opponent: "Israel", venue: "Comacchio", competition: { es: "Europeo youth de flag 2026 · final", en: "2026 European Youth Flag · final" }, score: "32-31", result: "win", sourceIds: ["selec-ifaf-youth-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["selec-fefa-youth-2026", "selec-ifaf-youth-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
  {
    id: "u15-flag",
    name: { es: "Flag sub-15 mixta", en: "Under-15 mixed flag" },
    discipline: "flag",
    competition: YOUTH_FLAG,
    summary: {
      es: "Bronce europeo por segundo año seguido tras ganar 32-25 a Alemania.",
      en: "European bronze for a second straight year after beating Germany 32-25.",
    },
    upcoming: [],
    results: [
      { date: "2026-09-24", opponent: "Team Euro Youth", competition: YOUTH_FLAG, score: "31-30", result: "win", sourceIds: ["selec-fefa-youth-2026"], verificationStatus: "verified" },
      { date: "2026-09-24", opponent: "Israel", competition: YOUTH_FLAG, score: "35-13", result: "win", sourceIds: ["selec-fefa-youth-2026"], verificationStatus: "verified" },
      { date: "2026-09-26", opponent: "Alemania", competition: { es: "Europeo youth de flag 2026 · bronce", en: "2026 European Youth Flag · bronze game" }, score: "32-25", result: "win", sourceIds: ["selec-fefa-youth-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["selec-fefa-youth-2026"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
  },
];
