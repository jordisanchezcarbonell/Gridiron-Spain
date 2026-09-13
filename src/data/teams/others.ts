import type { Team } from "@/types";

const V = "2026-09-12";

/** Clubs outside Catalonia and Madrid (Valencia, Baleares, Aragón). */
export const otherTeams: Team[] = [
  {
    id: "valencia-firebats",
    slug: "valencia-firebats",
    name: "Valencia Firebats",
    shortName: "Firebats",
    city: "Valencia",
    province: "Valencia",
    autonomousCommunity: "Comunidad Valenciana",
    country: "ES",
    foundedYear: 1993,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "senior-women", "junior"],
    currentCompetitions: [
      { competitionId: "lnfa", season: "2026-27", tier: "Serie A · Conferencia Este", verificationStatus: "verified", sourceIds: ["fefa-calendario-2026-27"] },
      { competitionId: "lnfa-femenina", season: "2025-26", verificationStatus: "verified", sourceIds: ["fefa-femenina-final-2026"] },
      { competitionId: "spanish-flag-bowl", season: "2026", verificationStatus: "verified", sourceIds: ["fefa-flag-bowl-2026"] },
    ],
    venue: {
      name: { es: "Estadi del Túria (Tramo III)", en: "Estadi del Túria (Tramo III)" },
      coordinates: { latitude: 39.4772, longitude: -0.3931, precision: "venue" },
      verificationStatus: "verified",
    },
    website: "https://firebats.org/",
    socialLinks: { instagram: "https://www.instagram.com/valenciafirebats/", twitter: "https://x.com/vlcFIREBATS" },
    summary: {
      es: "Club valenciano fundado en 1993. Cuatro títulos de LNFA, diez Spanish Flag Bowl Open (récord) y campeón de la LNFA 2 en 2025.",
      en: "Valencia club founded in 1993. Four LNFA titles, a record ten Spanish Flag Bowl Open wins and LNFA 2 champion in 2025.",
    },
    history: [
      {
        es: "Los Firebats nacieron en 1993 como Valencia Bats, según una entrevista con su presidente Fernando Altarriba y la historia del club recogida en fuentes no oficiales. [[src:elpolideportivo-altarriba-2021]] [[src:firebats-historia-mural]]",
        en: "The Firebats were born in 1993 as Valencia Bats, according to an interview with president Fernando Altarriba and the club history reproduced in unofficial sources. [[src:elpolideportivo-altarriba-2021]] [[src:firebats-historia-mural]]",
      },
      {
        es: "La FEFA les atribuye cuatro títulos de LNFA (2006, 2007, 2009 y 2015) y el récord de diez Spanish Flag Bowl Open, el último en junio de 2026 ante Zaragoza Hurricanes. [[src:fefa-palmares]] [[src:fefa-flag-bowl-2026]]",
        en: "FEFA credits them with four LNFA titles (2006, 2007, 2009 and 2015) and a record ten Spanish Flag Bowl Open wins, the latest in June 2026 against Zaragoza Hurricanes. [[src:fefa-palmares]] [[src:fefa-flag-bowl-2026]]",
      },
    ],
    honours: [
      ...[2006, 2007, 2009, 2015].map((year) => ({
        title: { es: "Campeón LNFA (Spanish Bowl)", en: "LNFA champion (Spanish Bowl)" },
        competitionId: "lnfa",
        year,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified" as const,
      })),
      { title: { es: "Campeón LNFA 2", en: "LNFA 2 champion" }, competitionId: "lnfa-2", year: 2025, sourceIds: ["fefa-palmares"], verificationStatus: "verified" },
      { title: { es: "Campeón LNFA Femenina", en: "LNFA Femenina champion" }, competitionId: "lnfa-femenina", year: 2019, sourceIds: ["fefa-palmares"], verificationStatus: "verified" },
      ...[2010, 2013, 2014, 2015, 2017, 2019, 2021, 2022, 2024, 2026].map((year) => ({
        title: { es: "Campeón Spanish Flag Bowl Open", en: "Spanish Flag Bowl Open champion" },
        competitionId: "spanish-flag-bowl",
        year,
        sourceIds: ["fefa-palmares-flag"],
        verificationStatus: "verified" as const,
      })),
    ],
    sourceIds: ["fefa-team-firebats", "elpolideportivo-altarriba-2021", "firebats-historia-mural", "fefa-palmares", "fefa-palmares-flag", "fefa-flag-bowl-2026", "fefa-femenina-final-2026", "fefa-calendario-2026-27"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
    researchNotes: { es: "Historia fundacional (abril de 1993, escisión de Cullera Giants) pendiente de fuente oficial del club.", en: "Founding story (April 1993, split from Cullera Giants) pending an official club source." },
  },
  {
    id: "mallorca-voltors",
    slug: "mallorca-voltors",
    name: "Mallorca Voltors",
    shortName: "Voltors",
    city: "Palma",
    province: "Islas Baleares",
    autonomousCommunity: "Islas Baleares",
    country: "ES",
    foundedYear: 1987,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "junior", "youth"],
    currentCompetitions: [
      { competitionId: "lnfa", season: "2026-27", tier: "Serie A · Conferencia Oeste", verificationStatus: "verified", sourceIds: ["fefa-calendario-2026-27"] },
    ],
    venue: {
      name: { es: "Polideportivo Municipal de Son Moix", en: "Polideportivo Municipal de Son Moix" },
      coordinates: { latitude: 39.5899, longitude: 2.6301, precision: "venue" },
      verificationStatus: "partial",
    },
    website: "https://www.voltors.net/",
    socialLinks: { instagram: "https://www.instagram.com/voltors/", twitter: "https://x.com/cfavoltors" },
    summary: {
      es: "Club pionero del football en Mallorca, fundado en 1987. Campeón de la LNFA 2 en 2014 y equipo de Serie A en 2025-26 y 2026-27.",
      en: "Pioneer football club in Mallorca, founded in 1987. LNFA 2 champion in 2014 and a Serie A side in 2025-26 and 2026-27.",
    },
    history: [
      {
        es: "Según su propia web, los Voltors se fundaron en 1987 y fueron el primer club de fútbol americano creado fuera de Cataluña; es un club íntegramente amateur con base en Son Moix. [[src:voltors-club]] [[src:fefa-team-voltors]]",
        en: "According to its own website, the Voltors were founded in 1987 and were the first American football club created outside Catalonia; it is a fully amateur club based at Son Moix. [[src:voltors-club]] [[src:fefa-team-voltors]]",
      },
    ],
    honours: [
      { title: { es: "Campeón LNFA 2", en: "LNFA 2 champion" }, competitionId: "lnfa-2", year: 2014, sourceIds: ["fefa-palmares"], verificationStatus: "verified" },
    ],
    sourceIds: ["voltors-club", "fefa-team-voltors", "fefa-palmares", "fefa-calendario-2026-27"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
    researchNotes: { es: "La condición de primer club fuera de Cataluña es una afirmación del propio club.", en: "The claim of being the first club outside Catalonia is the club's own." },
  },
  {
    id: "zaragoza-hurricanes",
    slug: "zaragoza-hurricanes",
    name: "Zaragoza Hurricanes",
    shortName: "Hurricanes",
    city: "Zaragoza",
    province: "Zaragoza",
    autonomousCommunity: "Aragón",
    country: "ES",
    foundedYear: 2005,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "senior-women"],
    currentCompetitions: [
      { competitionId: "lnfa", season: "2026-27", tier: "Serie A · Conferencia Este", verificationStatus: "verified", sourceIds: ["fefa-calendario-2026-27"] },
      { competitionId: "lnfa-femenina", season: "2025-26", verificationStatus: "verified", sourceIds: ["fefa-femenina-2025-26"] },
    ],
    venue: {
      name: { es: "Campo Municipal de Fútbol Santa Engracia (Movera)", en: "Campo Municipal de Fútbol Santa Engracia (Movera)" },
      address: "Avda. de Movera 600, Zaragoza",
      coordinates: { latitude: 41.6677, longitude: -0.8385, precision: "venue" },
      verificationStatus: "partial",
    },
    socialLinks: { instagram: "https://www.instagram.com/zaragozahurricanes/", twitter: "https://x.com/zgzhurricanes" },
    summary: {
      es: "Herederos de los Zaragoza Lions (1989-2004), creados en 2005 por antiguos jugadores. Equipo de LNFA Serie A y finalistas de la Spanish Flag Bowl Open 2026.",
      en: "Heirs of the Zaragoza Lions (1989-2004), created in 2005 by former players. An LNFA Serie A side and Spanish Flag Bowl Open 2026 finalists.",
    },
    history: [
      {
        es: "Los Hurricanes se crearon en 2005 cuando antiguos jugadores de los Zaragoza Lions, club activo entre 1989 y 2004 y finalista de la LNFA en 2001, decidieron refundar el football en la ciudad. [[src:spanishbowl-hurricanes-2020]] [[src:cope-zaragoza-2024]] [[src:fefa-palmares]]",
        en: "The Hurricanes were created in 2005 when former players of the Zaragoza Lions, a club active between 1989 and 2004 and LNFA finalist in 2001, decided to refound football in the city. [[src:spanishbowl-hurricanes-2020]] [[src:cope-zaragoza-2024]] [[src:fefa-palmares]]",
      },
    ],
    honours: [
      { title: { es: "Subcampeón Spanish Flag Bowl Open", en: "Spanish Flag Bowl Open runner-up" }, competitionId: "spanish-flag-bowl", year: 2026, sourceIds: ["fefa-flag-bowl-2026"], verificationStatus: "verified" },
    ],
    sourceIds: ["fefa-team-hurricanes", "spanishbowl-hurricanes-2020", "cope-zaragoza-2024", "zaragoza-ayto-santa-engracia", "aragonplay-hurricanes-2025", "fefa-palmares", "fefa-flag-bowl-2026", "fefa-calendario-2026-27"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
    researchNotes: { es: "Año de creación (2005) basado en entrevistas; sin documento oficial. Web del club en construcción.", en: "Creation year (2005) based on interviews; no official document. Club website under construction." },
  },
];
