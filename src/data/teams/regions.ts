import type { Team } from "@/types";

/**
 * Clubs added on 2026-10-02 from research/spain: LNFA 2 2025-26 clubs, Gijón Mariners,
 * LNFA Femenina and Granada Lions. All "partial": city, ground and socials from FEFA team pages;
 * founding years mostly from club sites or Wikipedia (see researchNotes).
 */
export const regionalTeams: Team[] = [
  {
    id: "gijon-mariners",
    slug: "gijon-mariners",
    name: "Gijón Mariners",
    shortName: "Mariners",
    city: "Gijón",
    province: "Asturias",
    autonomousCommunity: "Asturias",
    country: "ES",
    foundedYear: 2001,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa",
        season: "2025-26",
        tier: "Serie A · Conferencia Oeste",
        verificationStatus: "verified",
        sourceIds: ["fefa-team-mariners", "fefa-lnfa-mariners-descenso-2026"],
      },
    ],
    venue: {
      name: {
        es: "Complejo Deportivo Las Mestas",
        en: "Complejo Deportivo Las Mestas",
      },
      coordinates: {
        latitude: 43.5318,
        longitude: -5.6358,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://gijonmariners.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/gijonmariners/",
      twitter: "https://x.com/gijonmariners",
    },
    summary: {
      es: "Club gijonés nacido en 2001 a partir de partidos de flag en la Playa de Poniente. Disputó la LNFA Serie A 2025-26 y descendió a la LNFA 2 tras perder 7-21 ante Camioneros de Coslada en la última jornada.",
      en: "Gijón club born in 2001 out of flag games on Poniente beach. Played LNFA Serie A in 2025-26 and was relegated to LNFA 2 after a 7-21 final-day loss to Camioneros de Coslada.",
    },
    history: [
      {
        es: "Los Mariners nacieron de los partidos de flag que un grupo de aficionados jugaba en la Playa de Poniente de Gijón. Su primer partido se disputó el 12 de abril de 2001. [[src:mariners-historia]] El club quedó inscrito formalmente en octubre de 2002. [[src:wiki-mariners-es]]",
        en: "The Mariners grew out of the flag games a group of enthusiasts played on Gijón's Playa de Poniente. Their first match was on 12 April 2001. [[src:mariners-historia]] The club was formally registered in October 2002. [[src:wiki-mariners-es]]",
      },
      {
        es: "En flag se proclamó campeón del Spanish Flag Bowl Open en 2011 [[src:fefa-palmares-flag]], y su equipo femenino fue subcampeón de la LNFA Femenina 2 en 2019. [[src:fefa-palmares]]",
        en: "In flag football it won the Spanish Flag Bowl Open in 2011 [[src:fefa-palmares-flag]], and its women's team finished runner-up in LNFA Femenina 2 in 2019. [[src:fefa-palmares]]",
      },
      {
        es: "En 2025-26 jugó la Serie A de la LNFA en la Conferencia Oeste [[src:fefa-team-mariners]] y descendió a la LNFA 2 tras caer 7-21 ante Camioneros de Coslada en la última jornada. [[src:fefa-lnfa-mariners-descenso-2026]]",
        en: "In 2025-26 it played LNFA Serie A in the Western Conference [[src:fefa-team-mariners]] and was relegated to LNFA 2 after a 7-21 final-day defeat to Camioneros de Coslada. [[src:fefa-lnfa-mariners-descenso-2026]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Subcampeón LNFA Femenina 2",
          en: "LNFA Femenina 2 runner-up",
        },
        year: 2019,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: { es: "Campeón Spanish Flag Bowl Open", en: "Spanish Flag Bowl Open champion" },
        competitionId: "spanish-flag-bowl",
        year: 2011,
        sourceIds: ["fefa-palmares-flag"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: [
      "fefa-palmares-flag",
      "fefa-team-mariners",
      "mariners-historia",
      "wiki-mariners-es",
      "fefa-lnfa-mariners-descenso-2026",
      "fefa-calendario-2026-27",
      "fefa-palmares",
      "osm-nominatim",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Año 2001 = primer partido (12-04-2001) según la web del club; inscripción formal como club en octubre de 2002 según Wikipedia. Competición 2026-27 (LNFA 2) pendiente de que FEFA publique la composición. FEFA no lista web; gijonmariners.com está activa.",
      en: "2001 = first game (12 Apr 2001) per club site; formal registration Oct 2002 per Wikipedia. 2026-27 LNFA 2 placement pending FEFA publication. FEFA lists no website; gijonmariners.com is live.",
    },
  },
  {
    id: "alcorcon-smilodons",
    slug: "alcorcon-smilodons",
    name: "Alcorcón Smilodons",
    shortName: "Smilodons",
    city: "Alcorcón",
    province: "Madrid",
    autonomousCommunity: "Madrid",
    country: "ES",
    foundedYear: 2012,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "junior", "youth"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Madrileña",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-smilodons"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Prado de Santo Domingo",
        en: "Polideportivo Prado de Santo Domingo",
      },
      coordinates: {
        latitude: 40.3493,
        longitude: -3.8284,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.smilodons.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/cfasmilodons/",
      twitter: "https://x.com/Smilodons",
    },
    summary: {
      es: "Club del sur de Madrid cuyo proyecto arrancó en 2012. Subcampeón de la LNFA 2 en 2026, su primera final nacional, tras caer 0-35 ante Alcobendas Cavaliers.",
      en: "South-Madrid club whose project began in 2012. LNFA 2 runner-up in 2026, its first national final, after a 0-35 loss to Alcobendas Cavaliers.",
    },
    history: [
      {
        es: "El proyecto del club arrancó en 2012 en el sur de Madrid. [[src:smilodons-historia]]",
        en: "The club's project started in 2012 in southern Madrid. [[src:smilodons-historia]]",
      },
      {
        es: "En 2025-26 jugó la Conferencia Madrileña de la LNFA 2 [[src:fefa-lnfa2-2025-26]] y firmó su mejor temporada: superó los cuartos de final [[src:fefa-lnfa2-cuartos-2026]] y las semifinales [[src:fefa-lnfa2-semis-2026]] para alcanzar su primera final nacional, donde cayó 0-35 ante Alcobendas Cavaliers. [[src:fefa-lnfa2-final-2026]] [[src:fefa-palmares]]",
        en: "In 2025-26 it played the Madrid Conference of LNFA 2 [[src:fefa-lnfa2-2025-26]] and had its best season: it came through the quarter-finals [[src:fefa-lnfa2-cuartos-2026]] and semi-finals [[src:fefa-lnfa2-semis-2026]] to reach its first national final, losing 0-35 to Alcobendas Cavaliers. [[src:fefa-lnfa2-final-2026]] [[src:fefa-palmares]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2026,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: [
      "fefa-team-smilodons",
      "smilodons-historia",
      "fefa-lnfa2-2025-26",
      "fefa-lnfa2-cuartos-2026",
      "fefa-lnfa2-semis-2026",
      "fefa-lnfa2-final-2026",
      "fefa-palmares",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Campo sin coordenadas confirmadas: FEFA dice 'Polideportivo Santo Domingo', la final se jugó en 'Polideportivo Prado Santo Domingo' y la semifinal en 'CDM La Canaleja'; la web del club cita el Campo Esteban Márquez (2013). Coordenadas = centro de Alcorcón.",
      en: "Venue coordinates unconfirmed: FEFA 'Polideportivo Santo Domingo', final at 'Polideportivo Prado Santo Domingo', semi at 'CDM La Canaleja'; club site cites Campo Esteban Márquez (2013). Coordinates = Alcorcón centre.",
    },
  },
  {
    id: "valencia-giants",
    slug: "valencia-giants",
    name: "Valencia Giants",
    shortName: "Giants",
    city: "Valencia",
    province: "Valencia",
    autonomousCommunity: "Comunidad Valenciana",
    country: "ES",
    foundedYear: 2003,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "senior-women", "junior"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Levantina",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-giants"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Quatre Carreres",
        en: "Polideportivo Quatre Carreres",
      },
      coordinates: {
        latitude: 39.4518,
        longitude: -0.3624,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://www.valenciagiants.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/valenciagiants/",
      twitter: "https://x.com/valenciagiants",
    },
    summary: {
      es: "Club valenciano fundado en 2003 que jugó en la máxima categoría entre 2012-13 y 2017-18. Campeón de la Liga Valenciana y semifinalista de la LNFA 2 en 2025-26.",
      en: "Valencia club founded in 2003 that played in the top flight from 2012-13 to 2017-18. Valencian league winner and LNFA 2 semi-finalist in 2025-26.",
    },
    history: [
      {
        es: "El club valenciano se fundó en 2003 [[src:giants-historia]] y jugó en la máxima categoría entre las temporadas 2012-13 y 2017-18. [[src:fefa-team-giants]]",
        en: "The Valencia club was founded in 2003 [[src:giants-historia]] and played in the top flight between 2012-13 and 2017-18. [[src:fefa-team-giants]]",
      },
      {
        es: "Su palmarés tiene una discrepancia que conviene señalar: la FEFA le atribuye cinco subcampeonatos de LNFA 2 (2008, 2009, 2010, 2012 y 2024) [[src:fefa-palmares]], mientras que la web del club solo recoge cuatro y no menciona el de 2008. [[src:giants-historia]]",
        en: "Its honours carry a discrepancy worth flagging: FEFA credits it with five LNFA 2 runner-up finishes (2008, 2009, 2010, 2012 and 2024) [[src:fefa-palmares]], while the club's own website lists only four and does not mention 2008. [[src:giants-historia]]",
      },
      {
        es: "En 2025-26 fue campeón de la Liga Valenciana y alcanzó las semifinales de la LNFA 2. [[src:fefa-lnfa2-semis-2026]]",
        en: "In 2025-26 it won the Liga Valenciana and reached the LNFA 2 semi-finals. [[src:fefa-lnfa2-semis-2026]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2008,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2009,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2010,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2012,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Subcampeón LNFA 2",
          en: "LNFA 2 runner-up",
        },
        competitionId: "lnfa-2",
        year: 2024,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: [
      "fefa-team-giants",
      "giants-historia",
      "fefa-lnfa2-2025-26",
      "fefa-lnfa2-previa-cuartos-2026",
      "fefa-lnfa2-cuartos-2026",
      "fefa-lnfa2-semis-2026",
      "fefa-palmares",
      "osm-nominatim",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Discrepancia: FEFA atribuye a Giants el subcampeonato de LNFA 2 de 2008 (además de 2009, 2010, 2012 y 2024); la web del club solo cita 2009, 2010, 2012 y 2024.",
      en: "Discrepancy: FEFA credits Giants with the 2008 LNFA 2 runner-up spot (plus 2009, 2010, 2012, 2024); the club site lists only 2009, 2010, 2012 and 2024.",
    },
  },
  {
    id: "jerez-jaguars",
    slug: "jerez-jaguars",
    name: "Jerez Jaguars",
    shortName: "Jaguars",
    city: "Jerez de la Frontera",
    province: "Cádiz",
    autonomousCommunity: "Andalucía",
    country: "ES",
    foundedYear: 2020,
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Sur",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-jaguars"],
      },
    ],
    venue: {
      name: {
        es: "Pradera de Chapín (Complejo Deportivo Chapín)",
        en: "Pradera de Chapín (Complejo Deportivo Chapín)",
      },
      coordinates: {
        latitude: 36.6817,
        longitude: -6.1377,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.jerezjaguars.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/jerezjaguars/",
      twitter: "https://x.com/JerezJaguars",
    },
    summary: {
      es: "Club jerezano fundado en 2020. Ganó invicto el grupo Sur de la LNFA 2 2025-26 y alcanzó las semifinales nacionales, donde cayó 23-6 ante Alcobendas Cavaliers.",
      en: "Jerez club founded in 2020. Won the LNFA 2 South group unbeaten in 2025-26 and reached the national semi-finals, losing 23-6 to Alcobendas Cavaliers.",
    },
    history: [
      {
        es: "El club jerezano se fundó en 2020. El dato procede únicamente de la web del club, así que lo damos con esa reserva. [[src:jaguars-web]]",
        en: "The Jerez club was founded in 2020. The date comes only from the club's own website, so we record it with that caveat. [[src:jaguars-web]]",
      },
      {
        es: "En 2025-26 ganó invicto el grupo Sur de la LNFA 2 [[src:fefa-lnfa2-2025-26]], superó los cuartos de final [[src:fefa-lnfa2-cuartos-2026]] y llegó a las semifinales nacionales, donde cayó 23-6 ante Alcobendas Cavaliers. [[src:fefa-lnfa2-semis-2026]]",
        en: "In 2025-26 it won the LNFA 2 South group unbeaten [[src:fefa-lnfa2-2025-26]], came through the quarter-finals [[src:fefa-lnfa2-cuartos-2026]] and reached the national semi-finals, where it lost 23-6 to Alcobendas Cavaliers. [[src:fefa-lnfa2-semis-2026]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-jaguars", "jaguars-web", "fefa-lnfa2-2025-26", "fefa-lnfa2-previa-cuartos-2026", "fefa-lnfa2-cuartos-2026", "fefa-lnfa2-semis-2026"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Año de fundación solo en la web del club. FEFA no lista web. Coordenadas = centro de Jerez (la Pradera de Chapín no figura en OSM).",
      en: "Founding year only on club site. FEFA lists no website. Coordinates = Jerez centre (Pradera de Chapín not in OSM).",
    },
  },
  {
    id: "valladolid-penguins",
    slug: "valladolid-penguins",
    name: "Valladolid Penguins",
    shortName: "Penguins",
    city: "Valladolid",
    province: "Valladolid",
    autonomousCommunity: "Castilla y León",
    country: "ES",
    foundedYear: 2017,
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-penguins"],
      },
    ],
    venue: {
      name: {
        es: "Centro Deportivo Militar San Isidro",
        en: "Centro Deportivo Militar San Isidro",
      },
      coordinates: {
        latitude: 41.6522,
        longitude: -4.7286,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://valladolidpenguins.vercel.app/",
    socialLinks: {
      instagram: "https://www.instagram.com/pucelapenguins/",
      twitter: "https://x.com/pucelapenguins",
    },
    summary: {
      es: "Club vallisoletano fundado en 2017. Campeón del grupo Norte de la LNFA 2 2025-26 (6-1) y cuartofinalista nacional.",
      en: "Valladolid club founded in 2017. LNFA 2 North group winner in 2025-26 (6-1) and national quarter-finalist.",
    },
    history: [
      {
        es: "El club vallisoletano se fundó en 2017. El dato solo aparece en la meta-descripción de la web del club, así que queda pendiente de una fuente mejor. [[src:penguins-web]]",
        en: "The Valladolid club was founded in 2017. The date appears only in the club website's meta description, so it awaits a better source. [[src:penguins-web]]",
      },
      {
        es: "En 2025-26 ganó el grupo Norte de la LNFA 2 con un balance de 6-1 [[src:fefa-lnfa2-2025-26]] y llegó a los cuartos de final nacionales. [[src:fefa-lnfa2-cuartos-2026]]",
        en: "In 2025-26 it won the LNFA 2 North group with a 6-1 record [[src:fefa-lnfa2-2025-26]] and reached the national quarter-finals. [[src:fefa-lnfa2-cuartos-2026]]",
      },
    ],
    honours: [],
    sourceIds: [
      "fefa-team-penguins",
      "penguins-web",
      "fefa-lnfa2-2025-26",
      "fefa-lnfa2-cuadro-playoffs-2026",
      "fefa-lnfa2-previa-cuartos-2026",
      "fefa-lnfa2-cuartos-2026",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundación (2017) solo en la meta-descripción de la web del club. Campo en conflicto: FEFA cita el CD Militar San Isidro, pero el cuarto de final 2026 se jugó en el Campo El Tomillo. Coordenadas = centro de Valladolid.",
      en: "2017 founding only in the club site's meta description. Venue conflict: FEFA lists CD Militar San Isidro, but the 2026 quarter-final was at Campo El Tomillo. Coordinates = Valladolid centre.",
    },
  },
  {
    id: "alicante-sharks",
    slug: "alicante-sharks",
    name: "Alicante Sharks",
    shortName: "Sharks",
    city: "Alicante",
    province: "Alicante",
    autonomousCommunity: "Comunidad Valenciana",
    country: "ES",
    foundedYear: 2004,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Levantina",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-sharks"],
      },
    ],
    venue: {
      name: {
        es: "Campo Municipal Antonio Solana",
        en: "Campo Municipal Antonio Solana",
      },
      coordinates: {
        latitude: 38.3787,
        longitude: -0.4868,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/alicantesharks/",
      twitter: "https://x.com/AlicanteSharks",
    },
    summary: {
      es: "Primer club de fútbol americano de Alicante, fundado en 2004 según Wikipedia. Segundo del grupo Levante de la LNFA 2 2025-26; cayó en la prórroga (17-10) ante Jerez Jaguars en cuartos.",
      en: "Alicante's first American football club, founded in 2004 per Wikipedia. Runner-up in the LNFA 2 Levante group in 2025-26; lost 17-10 in overtime to Jerez Jaguars in the quarter-finals.",
    },
    history: [
      {
        es: "Fue el primer club de fútbol americano de Alicante. Su fundación, en el verano de 2004, solo consta en Wikipedia: no hemos encontrado una segunda fuente que la confirme. [[src:wiki-sharks-es]]",
        en: "It was Alicante's first American football club. Its founding, in the summer of 2004, appears only on Wikipedia: we have found no second source confirming it. [[src:wiki-sharks-es]]",
      },
      {
        es: "En 2025-26 terminó segundo del grupo Levante de la LNFA 2 [[src:fefa-lnfa2-2025-26]] y cayó en cuartos de final ante Jerez Jaguars por 17-10 en la prórroga. [[src:fefa-lnfa2-cuartos-2026]]",
        en: "In 2025-26 it finished second in the LNFA 2 Levante group [[src:fefa-lnfa2-2025-26]] and lost the quarter-final to Jerez Jaguars 17-10 in overtime. [[src:fefa-lnfa2-cuartos-2026]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-sharks", "wiki-sharks-es", "fefa-lnfa2-2025-26", "fefa-lnfa2-cuartos-2026", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundación (verano de 2004) solo en Wikipedia. Sin web oficial.",
      en: "Founding (summer 2004) only in Wikipedia. No official website.",
    },
  },
  {
    id: "murcia-cobras",
    slug: "murcia-cobras",
    name: "Murcia Cobras",
    shortName: "Cobras",
    city: "Murcia",
    province: "Murcia",
    autonomousCommunity: "Murcia",
    country: "ES",
    foundedYear: 1994,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "senior-women", "youth"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Levantina",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-cobras"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Municipal José Barnés",
        en: "Polideportivo Municipal José Barnés",
      },
      coordinates: {
        latitude: 37.9951,
        longitude: -1.1358,
        precision: "venue",
      },
      verificationStatus: "verified",
    },
    website: "https://www.murciacobras.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/murciacobras/",
      twitter: "https://twitter.com/MurciaCobras",
      facebook: "https://www.facebook.com/murcia.cobras",
      youtube: "https://www.youtube.com/channel/UC_0gS07UBpw4BfAomYhbc8g",
    },
    summary: {
      es: "Club murciano nacido en 1994. Campeón de la LNFA 2 en 2016 y subcampeón de la LNFA en 2018; en 2025-26 compitió en el grupo Levante de la LNFA 2. Además del senior de tackle, tiene flag masculino, femenino y escuela de formación.",
      en: "Murcia club born in 1994. LNFA 2 champion in 2016 and LNFA runner-up in 2018; played in the LNFA 2 Levante group in 2025-26. Besides senior tackle, it runs men's, women's and youth flag football.",
    },
    history: [
      {
        es: "El propio club sitúa el inicio de su historia en 1993 y la Wikipedia data su constitución oficial en 1994. [[src:cobras-web-presentacion]] [[src:wiki-cobras-es]] Jugaron dos años en competiciones regionales antes de entrar en la primera temporada de la nueva liga nacional en 1997, según la Wikipedia. [[src:wiki-cobras-es]]",
        en: "The club itself dates the start of its history to 1993, while Wikipedia gives 1994 as its official founding. [[src:cobras-web-presentacion]] [[src:wiki-cobras-es]] According to Wikipedia, they played two years of regional competition before joining the first season of the new national league in 1997. [[src:wiki-cobras-es]]",
      },
      {
        es: "En 2026-27 el club tiene un equipo senior de tackle, flag football masculino y femenino, y equipos mixtos de flag sub-9, sub-11, sub-13 y sub-15. Juega en casa en el campo de fútbol del Polideportivo José Barnés. [[src:cobras-web-equipos-2026-27]] [[src:cobras-web-copa-levante-2025]]",
        en: "In 2026-27 the club fields a senior tackle team, men's and women's flag football, and mixed flag teams at U9, U11, U13 and U15. Home games are played at the José Barnés sports complex football field. [[src:cobras-web-equipos-2026-27]] [[src:cobras-web-copa-levante-2025]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Campeón LNFA 2",
          en: "LNFA 2 champion",
        },
        competitionId: "lnfa-2",
        year: 2016,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Subcampeón LNFA (Spanish Bowl)",
          en: "LNFA runner-up (Spanish Bowl)",
        },
        competitionId: "lnfa",
        year: 2018,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Campeón LNFA Junior",
          en: "LNFA Junior champion",
        },
        year: 2008,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Campeón LNFA Junior",
          en: "LNFA Junior champion",
        },
        year: 2009,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Campeón LNFA Junior",
          en: "LNFA Junior champion",
        },
        year: 2011,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: ["fefa-team-cobras", "wiki-cobras-es", "fefa-lnfa2-2025-26", "fefa-palmares", "osm-nominatim", "cobras-web-presentacion", "cobras-web-equipos-2026-27", "cobras-web-copa-levante-2025"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-12",
    researchNotes: {
      es: "Fundación: el club habla de 1993 («inició su historia») y la Wikipedia de 1994; se mantiene 1994 hasta tener el acta. El club autorizó por correo (8-10-2026) usar la información de su web. La final LNFA 2018 se jugó en Las Mestas (Gijón) según FEFA.",
      en: "Founding: the club says its history began in 1993, Wikipedia says 1994; 1994 kept until a founding document turns up. The club authorised use of its website content by email (8 Oct 2026). FEFA places the 2018 LNFA final at Las Mestas (Gijón).",
    },
  },
  {
    id: "sevilla-linces",
    slug: "sevilla-linces",
    name: "Sevilla Linces",
    shortName: "Linces",
    city: "Sevilla",
    province: "Sevilla",
    autonomousCommunity: "Andalucía",
    country: "ES",
    foundedYear: 1992,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Sur",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-linces"],
      },
    ],
    venue: {
      name: {
        es: "Instalación Deportiva Sevilla Linces",
        en: "Instalación Deportiva Sevilla Linces",
      },
      coordinates: {
        latitude: 37.3886,
        longitude: -5.9953,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.sevillalinces.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/sevilla_linces/",
      twitter: "https://x.com/Sevilla_Linces",
    },
    summary: {
      es: "Club pionero del football en Andalucía, fundado en 1992 según Wikipedia y en la máxima categoría desde 1999. En 2025-26 disputó el grupo Sur de la LNFA 2.",
      en: "Pioneer football club in Andalusia, founded in 1992 per Wikipedia and in the top flight from 1999. Played the LNFA 2 South group in 2025-26.",
    },
    history: [
      {
        es: "Es el club pionero del fútbol americano en Andalucía. Wikipedia sitúa su fundación el 14 de septiembre de 1992 y el primer partido disputado en Andalucía el 14 de mayo de 1993; es la única fuente que recoge ambas fechas. [[src:wiki-linces-es]]",
        en: "It is the pioneering American football club in Andalusia. Wikipedia dates its founding to 14 September 1992 and the first game played in Andalusia to 14 May 1993; it is the only source for both dates. [[src:wiki-linces-es]]",
      },
      {
        es: "Está en la máxima categoría desde 1999 [[src:fefa-team-linces]] y en 2025-26 disputó el grupo Sur de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "It has been in the top flight since 1999 [[src:fefa-team-linces]] and in 2025-26 played in the LNFA 2 South group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-linces", "wiki-linces-es", "fefa-lnfa2-2025-26"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Historia (fundación 14-09-1992, primer partido en Andalucía el 14-05-1993) solo en Wikipedia. Campo sin coordenadas confirmadas (FEFA: 'Instalación Deportiva Sevilla Linces'); coordenadas = centro de Sevilla.",
      en: "History (founded 14 Sep 1992, first game in Andalusia 14 May 1993) only in Wikipedia. Venue coordinates unconfirmed; coordinates = Seville centre.",
    },
  },
  {
    id: "mairena-blue-devils",
    slug: "mairena-blue-devils",
    name: "Mairena Blue Devils",
    shortName: "Blue Devils",
    city: "Mairena del Aljarafe",
    province: "Sevilla",
    autonomousCommunity: "Andalucía",
    country: "ES",
    foundedYear: 2014,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "youth"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Sur",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-blue-devils"],
      },
    ],
    venue: {
      name: {
        es: "Campo Municipal Francisco Castilla Romero",
        en: "Campo Municipal Francisco Castilla Romero",
      },
      coordinates: {
        latitude: 37.3497,
        longitude: -6.0659,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://mairenabluedevils.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/mairenabluedevils/",
      twitter: "https://x.com/MBlueDevils",
    },
    summary: {
      es: "Club del Aljarafe sevillano que nació como equipo en 2014 (como Aljarafe Blue Devils) y hoy juega en Mairena del Aljarafe. Segundo del grupo Sur de la LNFA 2 2025-26.",
      en: "Club from Seville's Aljarafe area that started as a team in 2014 (as Aljarafe Blue Devils) and now plays in Mairena del Aljarafe. Runner-up in the LNFA 2 South group in 2025-26.",
    },
    history: [
      {
        es: "Según la web del club, las primeras reuniones se celebraron a finales de 2013 en Palomares del Río y el equipo se formó en 2014 con el nombre de Aljarafe Blue Devils. [[src:blue-devils-about]]",
        en: "According to the club's website, the first meetings were held in late 2013 in Palomares del Río and the team was formed in 2014 as Aljarafe Blue Devils. [[src:blue-devils-about]]",
      },
      {
        es: "Hoy juega en Mairena del Aljarafe y en 2025-26 terminó segundo del grupo Sur de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "It now plays in Mairena del Aljarafe and in 2025-26 finished second in the LNFA 2 South group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-blue-devils", "blue-devils-about", "fefa-lnfa2-2025-26", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundación según la web del club: primeras reuniones a finales de 2013 en Palomares del Río, equipo en 2014.",
      en: "Per club site: first meetings late 2013 in Palomares del Río, team in 2014.",
    },
  },
  {
    id: "santurtzi-coyotes",
    slug: "santurtzi-coyotes",
    name: "Coyotes Santurtzi",
    shortName: "Coyotes",
    city: "Santurtzi",
    province: "Vizcaya",
    autonomousCommunity: "País Vasco",
    country: "ES",
    foundedYear: 1998,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-coyotes"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Mikel Trueba",
        en: "Polideportivo Mikel Trueba",
      },
      coordinates: {
        latitude: 43.3278,
        longitude: -3.0261,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://coyotes-santurtzi.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/coyotessanturtzi/",
      twitter: "https://x.com/CoyotesFootball",
    },
    summary: {
      es: "Club vizcaíno fundado en 1998, referente del football en el País Vasco. Segundo del grupo Norte de la LNFA 2 2025-26.",
      en: "Biscay club founded in 1998, the reference football club in the Basque Country. Runner-up in the LNFA 2 North group in 2025-26.",
    },
    history: [
      {
        es: "El club vizcaíno se fundó en 1998 según Wikipedia, que es la única fuente que lo recoge. [[src:wiki-coyotes-es]]",
        en: "The Biscay club was founded in 1998 according to Wikipedia, the only source that records it. [[src:wiki-coyotes-es]]",
      },
      {
        es: "Fue subcampeón de la LNFA Junior en 2017 [[src:fefa-palmares]] y en 2025-26 terminó segundo del grupo Norte de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "It was LNFA Junior runner-up in 2017 [[src:fefa-palmares]] and in 2025-26 finished second in the LNFA 2 North group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Subcampeón LNFA Junior",
          en: "LNFA Junior runner-up",
        },
        year: 2017,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: ["fefa-team-coyotes", "wiki-coyotes-es", "fefa-lnfa2-2025-26", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundación (1998) solo en Wikipedia. La web del club respondió sin contenido legible el 2026-10-02.",
      en: "1998 founding only in Wikipedia. Club website returned no readable content on 2026-10-02.",
    },
  },
  {
    id: "cantabria-bisons",
    slug: "cantabria-bisons",
    name: "Cantabria Bisons",
    shortName: "Bisons",
    city: "Santander",
    province: "Cantabria",
    autonomousCommunity: "Cantabria",
    country: "ES",
    foundedYear: 2011,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-bisons"],
      },
    ],
    venue: {
      name: {
        es: "Complejo Municipal de Deportes Ruth Beitia",
        en: "Complejo Municipal de Deportes Ruth Beitia",
      },
      coordinates: {
        latitude: 43.4615,
        longitude: -3.8531,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/cantabriabisons/",
      twitter: "https://x.com/CantabriaBisons",
    },
    summary: {
      es: "Club santanderino fundado oficialmente en marzo de 2011, según Wikipedia. Compitió en el grupo Norte de la LNFA 2 2025-26.",
      en: "Santander club officially founded in March 2011, per Wikipedia. Played the LNFA 2 North group in 2025-26.",
    },
    history: [
      {
        es: "El club santanderino se fundó oficialmente el 11 de marzo de 2011 según Wikipedia, que es la única fuente que lo recoge. [[src:wiki-bisons-es]]",
        en: "The Santander club was officially founded on 11 March 2011 according to Wikipedia, the only source that records it. [[src:wiki-bisons-es]]",
      },
      {
        es: "En 2025-26 compitió en el grupo Norte de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2025-26 it competed in the LNFA 2 North group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-bisons", "wiki-bisons-es", "fefa-lnfa2-2025-26", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundación (11-03-2011) solo en Wikipedia. Sin web oficial activa.",
      en: "Founding (11 Mar 2011) only in Wikipedia. No live official website.",
    },
  },
  {
    id: "canarias-canes",
    slug: "canarias-canes",
    name: "Canarias Canes",
    shortName: "Canes",
    city: "Santa Brígida",
    province: "Las Palmas",
    autonomousCommunity: "Islas Canarias",
    country: "ES",
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Sur",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-canes"],
      },
    ],
    venue: {
      name: {
        es: "Campo de Fútbol La Angostura",
        en: "Campo de Fútbol La Angostura",
      },
      coordinates: {
        latitude: 28.0331,
        longitude: -15.4917,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/canes_american_football/",
    },
    summary: {
      es: "Club de Gran Canaria con sede deportiva en Santa Brígida. Único equipo canario de la LNFA 2 2025-26, encuadrado en el grupo Sur.",
      en: "Gran Canaria club based in Santa Brígida. The only Canary Islands side in LNFA 2 2025-26, placed in the South group.",
    },
    history: [
      {
        es: "El club se fundó en 2017 en Telde. En 2018 competía como Telde Canes y más adelante pasó a llamarse Canarias Canes. [[src:spanishbowl-canes-2025]]",
        en: "The club was founded in 2017 in Telde. In 2018 it competed as Telde Canes and later became Canarias Canes. [[src:spanishbowl-canes-2025]]",
      },
      {
        es: "En 2025-26 fue el único equipo canario de la LNFA 2, encuadrado en el grupo Sur. [[src:fefa-lnfa2-2025-26]] Sobre su campo hay discrepancia entre fuentes: la FEFA indica el Campo de Fútbol La Angostura y el Spanish Bowl el Estadio Municipal del Guiniguada, en Santa Brígida. [[src:fefa-team-canes]] [[src:spanishbowl-canes-2025]]",
        en: "In 2025-26 it was the only Canarian team in LNFA 2, placed in the South group. [[src:fefa-lnfa2-2025-26]] Sources disagree on its ground: FEFA lists Campo de Fútbol La Angostura and the Spanish Bowl lists Estadio Municipal del Guiniguada, in Santa Brígida. [[src:fefa-team-canes]] [[src:spanishbowl-canes-2025]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-canes", "fefa-lnfa2-2025-26", "spanishbowl-canes-2025"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Fundado en 2017 en Telde; en 2018 se llamaba Telde Canes y después pasó a Canarias Canes (Spanish Bowl, marzo de 2025). Discrepancia en el campo: FEFA indica Campo de Fútbol La Angostura y Spanish Bowl el Estadio Municipal del Guiniguada (Santa Brígida). Coordenadas = Santa Brígida.",
      en: "Founded in 2017 in Telde; called Telde Canes in 2018 and later renamed Canarias Canes (Spanish Bowl, March 2025). Ground discrepancy: FEFA lists Campo de Fútbol La Angostura, Spanish Bowl lists Estadio Municipal del Guiniguada (Santa Brígida). Coordinates = Santa Brígida.",
    },
    foundedYear: 2017,
  },
  {
    id: "sueca-ricers",
    slug: "sueca-ricers",
    name: "Sueca Ricers",
    shortName: "Ricers",
    city: "Sueca",
    province: "Valencia",
    autonomousCommunity: "Comunidad Valenciana",
    country: "ES",
    foundedYear: 2007,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "youth"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Levantina",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-ricers"],
      },
    ],
    venue: {
      name: {
        es: "Estadi Municipal Antoni Puchades",
        en: "Estadi Municipal Antoni Puchades",
      },
      coordinates: {
        latitude: 39.2026,
        longitude: -0.3112,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.suecaricers.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/suecaricers/",
    },
    summary: {
      es: "Club de Sueca fundado en 2007 por exmiembros de Cullera Giants, según Wikipedia; jugó en la máxima categoría entre 2010 y 2014. Tercero del grupo Levante de la LNFA 2 2025-26 y campeón U15 de la Spanish Flag Bowl Youth 2026.",
      en: "Sueca club founded in 2007 by former Cullera Giants members, per Wikipedia; top-flight side from 2010 to 2014. Third in the LNFA 2 Levante group in 2025-26 and U15 champion of the 2026 Spanish Flag Bowl Youth.",
    },
    history: [
      {
        es: "El club sitúa su origen en 1987, cuando un grupo de aficionados empezó a jugar en la playa de Cullera sin conocer bien las reglas. Aquello llamó la atención de Frank Tiozzo, entrenador francés y antiguo jugador, que se implicó en el proyecto; de esas sesiones a pie de mar salieron los Cullera Giants, hoy extinguidos. [[src:ricers-historia]]",
        en: "The club traces its origin to 1987, when a group of fans started playing on Cullera beach without really knowing the rules. That caught the eye of Frank Tiozzo, a French coach and former player, who got involved; those sessions by the sea produced Cullera Giants, now defunct. [[src:ricers-historia]]",
      },
      {
        es: "Sueca Ricers se fundó en 2007 y quedó registrado oficialmente en 2008, según el propio club, que lo presenta como la continuidad natural de aquel proyecto. [[src:ricers-historia]] [[src:wiki-ricers-es]] Jugó en la máxima categoría entre 2010 y 2014. [[src:fefa-team-ricers]]",
        en: "Sueca Ricers was founded in 2007 and officially registered in 2008, according to the club itself, which presents it as the natural continuation of that project. [[src:ricers-historia]] [[src:wiki-ricers-es]] It played in the top flight between 2010 and 2014. [[src:fefa-team-ricers]]",
      },
      {
        es: "Fue subcampeón de la LNFA Junior en 2013 [[src:fefa-palmares]] y en 2026 ganó el título U15 de la Spanish Flag Bowl Youth. [[src:fefa-flag-bowl-youth-2026]]",
        en: "It was LNFA Junior runner-up in 2013 [[src:fefa-palmares]] and in 2026 won the U15 title at the Spanish Flag Bowl Youth. [[src:fefa-flag-bowl-youth-2026]]",
      },
      {
        es: "En 2025-26 terminó tercero del grupo Levante de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2025-26 it finished third in the LNFA 2 Levante group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Subcampeón LNFA Junior",
          en: "LNFA Junior runner-up",
        },
        year: 2013,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Campeón Spanish Flag Bowl Youth U15",
          en: "Spanish Flag Bowl Youth U15 champion",
        },
        year: 2026,
        sourceIds: ["fefa-flag-bowl-youth-2026"],
        verificationStatus: "verified",
      },
    ],
    sourceIds: ["fefa-team-ricers", "ricers-historia", "wiki-ricers-es", "fefa-lnfa2-2025-26", "fefa-palmares", "fefa-flag-bowl-youth-2026"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-17",
    researchNotes: {
      es: "Fundación (2007) solo en Wikipedia. Coordenadas = centro de Sueca (el estadio no figura en OSM). FEFA no lista web; suecaricers.com está activa.",
      en: "2007 founding only in Wikipedia. Coordinates = Sueca centre. FEFA lists no website; suecaricers.com is live.",
    },
  },
  {
    id: "cenes-de-la-vega-valkirias",
    slug: "cenes-de-la-vega-valkirias",
    name: "Cenes de la Vega Valkirias",
    shortName: "Valkirias",
    city: "Cenes de la Vega",
    province: "Granada",
    autonomousCommunity: "Andalucía",
    country: "ES",
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-women"],
    currentCompetitions: [
      {
        competitionId: "lnfa-femenina",
        season: "2025-26",
        verificationStatus: "verified",
        sourceIds: ["fefa-femenina-2025-26", "fefa-team-valkirias"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Municipal de Cenes de la Vega",
        en: "Polideportivo Municipal de Cenes de la Vega",
      },
      coordinates: {
        latitude: 37.1563,
        longitude: -3.5371,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/valkiriasfootball/",
    },
    summary: {
      es: "Equipo femenino granadino con sede en Cenes de la Vega. Compitió en la LNFA Femenina 2025-26 (anunciado por FEFA como Granada Valkirias) y terminó séptimo y último; no figura en el calendario 2026-27.",
      en: "Women's team from Granada province based in Cenes de la Vega. Played LNFA Femenina 2025-26 (announced by FEFA as Granada Valkirias), finishing seventh and last; not on the 2026-27 schedule.",
    },
    history: [
      {
        es: "Equipo femenino granadino con sede en Cenes de la Vega. En octubre de 2020 El Español ya describía un club Valkirias con jugadoras de Málaga y Granada [[src:elespanol-femenino-2020]], pero no está confirmado que sea el mismo club que la FEFA inscribe como Cenes de la Vega Valkirias, así que no fijamos un año de fundación.",
        en: "A women's team from Granada province based in Cenes de la Vega. In October 2020 El Español already described a Valkirias club with players from Málaga and Granada [[src:elespanol-femenino-2020]], but it is not confirmed to be the same club FEFA registers as Cenes de la Vega Valkirias, so we do not state a founding year.",
      },
      {
        es: "La FEFA lo anunció como Granada Valkirias para la LNFA Femenina 2025-26 [[src:fefa-femenina-2025-26]], temporada que terminó séptimo y último [[src:fefa-femenina-j6-2026]]. No figura en el calendario 2026-27. [[src:fefa-femenina-page-2026-27]]",
        en: "FEFA announced it as Granada Valkirias for the 2025-26 LNFA Femenina [[src:fefa-femenina-2025-26]], a season it finished seventh and last [[src:fefa-femenina-j6-2026]]. It does not appear in the 2026-27 calendar. [[src:fefa-femenina-page-2026-27]]",
      },
    ],
    honours: [],
    sourceIds: [
      "fefa-team-valkirias",
      "fefa-femenina-2025-26",
      "fefa-femenina-j6-2026",
      "fefa-femenina-page-2026-27",
      "osm-nominatim",
      "elespanol-femenino-2020",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Año de fundación sin resolver (no se fija foundedYear). El Español (29-10-2020) ya describe el club Valkirias, con jugadoras de Málaga y Granada, y Historia Deportiva (28-02-2022) dice que 'surgió en 2021'. Falta una fuente del club. Hay que confirmar que las Granada Valkirias de 2020-22 son el mismo club que figura en FEFA como Cenes de la Vega Valkirias.",
      en: "Founding year unresolved (no foundedYear set). El Español (29 Oct 2020) already describes the Valkirias club, with players from Málaga and Granada, while Historia Deportiva (28 Feb 2022) says it 'emerged in 2021'. A club source is needed. It also needs confirming that the 2020-22 Granada Valkirias are the club FEFA lists as Cenes de la Vega Valkirias.",
    },
  },
  {
    id: "villamayor-mercenarios",
    slug: "villamayor-mercenarios",
    name: "Villamayor Mercenarios",
    shortName: "Mercenarios",
    city: "Villamayor de Gállego",
    province: "Zaragoza",
    autonomousCommunity: "Aragón",
    country: "ES",
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-mercenarios"],
      },
    ],
    venue: {
      name: {
        es: "Campo de Fútbol Tarba",
        en: "Campo de Fútbol Tarba",
      },
      coordinates: {
        latitude: 41.6857,
        longitude: -0.774,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/mercenarioszgz/",
      twitter: "https://x.com/mercenarioszgz",
    },
    summary: {
      es: "Club de Villamayor de Gállego (Zaragoza) que nació de un grupo de amigos y tomó su nombre de su etapa jugando con otro club. Terminó quinto en el grupo Norte de la LNFA 2 2025-26.",
      en: "Club from Villamayor de Gállego (Zaragoza) founded by a group of friends, named after a spell playing alongside another club. Finished fifth in the LNFA 2 North group in 2025-26.",
    },
    history: [
      {
        es: "El club de Villamayor de Gállego surgió de un grupo de amigos y tomó su nombre de la etapa en que jugaban con otro club. En enero de 2019 SportAragón lo describía todavía como un equipo de nuevo cuño. [[src:sportaragon-mercenarios-2019]] No hemos podido confirmar su año de fundación con ninguna fuente, así que no lo damos por bueno.",
        en: "The club from Villamayor de Gállego came out of a group of friends and took its name from the time they spent playing alongside another club. In January 2019 SportAragón still described it as a newly formed team. [[src:sportaragon-mercenarios-2019]] We have not been able to confirm its founding year with any source, so we do not state one.",
      },
      {
        es: "En la LNFA 2 alcanzó las semifinales en 2022 y los cuartos de final en 2023. [[src:fefa-team-mercenarios]] En la temporada 2025-26 compitió en la Conferencia Norte de la LNFA 2 [[src:fefa-lnfa2-2025-26]] y no figura ningún título nacional en el palmarés de la FEFA. [[src:fefa-palmares]]",
        en: "In LNFA 2 it reached the semi-finals in 2022 and the quarter-finals in 2023. [[src:fefa-team-mercenarios]] In 2025-26 it competed in the LNFA 2 Northern Conference [[src:fefa-lnfa2-2025-26]], and no national title appears in the FEFA honours list. [[src:fefa-palmares]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-mercenarios", "fefa-lnfa2-2025-26", "sportaragon-mercenarios-2019", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Año de fundación UNKNOWN. En enero de 2019 SportAragón lo describe como 'equipo de nuevo cuño'. FEFA no lista web. 'Tarba' figura en OSM como paraje, no como campo, así que las coordenadas son del centro del municipio. Historial FEFA: LNFA 2 2022 (semifinal) y 2023 (cuartos).",
      en: "Founding year UNKNOWN. In January 2019 SportAragón called it a 'newly formed team'. FEFA lists no website. OSM has 'Tarba' only as a locality, not a pitch, so coordinates are the town centre. FEFA record: LNFA 2 2022 (semi-final) and 2023 (quarter-final).",
    },
  },
  {
    id: "torrelavega-berserkers",
    slug: "torrelavega-berserkers",
    name: "Berserkers Torrelavega",
    shortName: "Berserkers",
    city: "Torrelavega",
    province: "Cantabria",
    autonomousCommunity: "Cantabria",
    country: "ES",
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-berserkers"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Óscar Freire",
        en: "Polideportivo Óscar Freire",
      },
      coordinates: {
        latitude: 43.361,
        longitude: -4.0514,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/berserkersfootball/",
      twitter: "https://x.com/PBerserkers",
    },
    summary: {
      es: "Club de Torrelavega (Cantabria) que juega en el complejo Óscar Freire. Terminó cuarto en el grupo Norte de la LNFA 2 2025-26 con un balance de 3-3.",
      en: "Torrelavega (Cantabria) club based at the Óscar Freire sports complex. Finished fourth in the LNFA 2 North group in 2025-26 with a 3-3 record.",
    },
    history: [
      {
        es: "El nombre legal del club es Club Deportivo Elemental Fútbol Americano Berserker, según el registro local. [[src:red39300-berserkers]] No hemos podido confirmar su año de fundación con ninguna fuente, así que no lo fijamos.",
        en: "The club's legal name is Club Deportivo Elemental Fútbol Americano Berserker, per the local register. [[src:red39300-berserkers]] We have not been able to confirm its founding year with any source, so we do not state one.",
      },
      {
        es: "En la FEFA consta su paso por la LNFA 3 en 2020-21 y un cuarto puesto del grupo Norte de la LNFA 2 en 2022. [[src:fefa-team-berserkers]] En 2025-26 volvió a terminar cuarto del grupo Norte, con un balance de 3-3. [[src:fefa-lnfa2-2025-26]]",
        en: "FEFA records its LNFA 3 season in 2020-21 and a fourth place in the LNFA 2 North group in 2022. [[src:fefa-team-berserkers]] In 2025-26 it again finished fourth in the North group, with a 3-3 record. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-berserkers", "fefa-lnfa2-2025-26", "red39300-berserkers", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Año de fundación UNKNOWN. Nombre legal según el registro local: Club Deportivo Elemental Fútbol Americano Berserker. FEFA no lista web. Instagram usa la marca 'Rucasa Berserkers' (patrocinador). Historial FEFA: LNFA 3 2020-21 y LNFA 2 2022 (4º Norte).",
      en: "Founding year UNKNOWN. Legal name per local registry: Club Deportivo Elemental Fútbol Americano Berserker. FEFA lists no website. Instagram uses the 'Rucasa Berserkers' sponsor brand. FEFA record: LNFA 3 2020-21 and LNFA 2 2022 (4th North).",
    },
  },
  {
    id: "guadalajara-stings",
    slug: "guadalajara-stings",
    name: "Guadalajara Stings",
    shortName: "Stings",
    city: "Guadalajara",
    province: "Guadalajara",
    autonomousCommunity: "Castilla-La Mancha",
    country: "ES",
    foundedYear: 2006,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "senior-women", "junior"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Norte",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-stings"],
      },
    ],
    venue: {
      name: {
        es: "CD Jerónimo de la Morena",
        en: "CD Jerónimo de la Morena",
      },
      coordinates: {
        latitude: 40.6385,
        longitude: -3.1843,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://guadalajarastings.com/",
    socialLinks: {
      instagram: "https://www.instagram.com/guadalajara.stings/",
      twitter: "https://x.com/GuadaStings",
    },
    summary: {
      es: "Club fundado en 2006 en Guadalajara; su nombre alude a las abejas de la miel de la Alcarria. Se presenta como el único equipo de fútbol americano de Castilla-La Mancha y terminó sexto en el grupo Norte de la LNFA 2 2025-26.",
      en: "Founded in 2006 in Guadalajara, the club is named after the bees behind the Alcarria region's honey. It bills itself as Castilla-La Mancha's only American football team and finished sixth in the LNFA 2 North group in 2025-26.",
    },
    history: [
      {
        es: "El club se fundó en 2006 en Guadalajara y su nombre alude a las abejas de la miel de la Alcarria. [[src:stings-blog-historia]] Se presenta como el único equipo de fútbol americano de Castilla-La Mancha. [[src:stings-web]]",
        en: "The club was founded in 2006 in Guadalajara and its name nods to the bees behind Alcarria honey. [[src:stings-blog-historia]] It presents itself as the only American football team in Castilla-La Mancha. [[src:stings-web]]",
      },
      {
        es: "Fue subcampeón de la LNFA 3 en 2021 [[src:fefa-palmares]] y en la LNFA 2 acabó segundo del Norte en 2022, tercero en 2023 y cuartofinalista en 2024. [[src:fefa-team-stings]]",
        en: "It was LNFA 3 runner-up in 2021 [[src:fefa-palmares]] and in LNFA 2 finished second in the North group in 2022, third in 2023 and a quarter-finalist in 2024. [[src:fefa-team-stings]]",
      },
      {
        es: "En 2025-26 terminó sexto del grupo Norte de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2025-26 it finished sixth in the LNFA 2 North group. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-stings", "fefa-lnfa2-2025-26", "stings-blog-historia", "stings-web", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "La fundación en 2006 sale del blog histórico del club. FEFA no lista web, pero guadalajarastings.com está activa. Historial FEFA: subcampeón de la LNFA 3 en 2021, LNFA 2 2022 (2º Norte), 2023 (3º Norte) y 2024 (cuartos). La prensa menciona un título de la 'I Liga Aragonesa' sin fecha verificada (pendiente).",
      en: "2006 founding from the club's historical blog. FEFA lists no website; guadalajarastings.com is live. FEFA record: LNFA 3 runner-up 2021, LNFA 2 2022 (2nd North), 2023 (3rd North) and 2024 (quarter-final). Press mentions an 'I Liga Aragonesa' title with no verified date (pending).",
    },
  },
  {
    id: "alicante-thunder",
    slug: "alicante-thunder",
    name: "Alicante Thunder",
    shortName: "Thunder",
    city: "Alicante",
    province: "Alicante",
    autonomousCommunity: "Comunidad Valenciana",
    country: "ES",
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Levantina",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-thunder"],
      },
    ],
    venue: {
      name: {
        es: "Campo Municipal Antonio Solana",
        en: "Campo Municipal Antonio Solana",
      },
      coordinates: {
        latitude: 38.3787,
        longitude: -0.4868,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://alicantethunder.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/alicantethunder/",
      facebook: "https://www.facebook.com/alicantethunder/",
    },
    summary: {
      es: "Club alicantino presentado públicamente en mayo de 2023 como escuela de football americano. Terminó cuarto en el grupo Levante de la LNFA 2 2025-26, con un balance de 1-7.",
      en: "Alicante club publicly launched in May 2023 as a football school. Finished fourth in the LNFA 2 Levante group in 2025-26 with a 1-7 record.",
    },
    history: [
      {
        es: "El club se presentó públicamente el 6 de mayo de 2023 como escuela de fútbol americano y equipo nuevo. [[src:thunder-presentacion-2023]] No hemos localizado su fecha de constitución, así que no fijamos un año de fundación.",
        en: "The club was publicly launched on 6 May 2023 as an American football school and a new team. [[src:thunder-presentacion-2023]] We have not found its date of incorporation, so we do not state a founding year.",
      },
      {
        es: "En la LNFA 2 acabó sexto del grupo Este en 2024 y segundo en 2025. [[src:fefa-team-thunder]] En 2025-26 terminó cuarto del grupo Levante con un balance de 1-7. [[src:fefa-lnfa2-2025-26]]",
        en: "In LNFA 2 it finished sixth in the East group in 2024 and second in 2025. [[src:fefa-team-thunder]] In 2025-26 it finished fourth in the Levante group with a 1-7 record. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-thunder", "fefa-lnfa2-2025-26", "thunder-presentacion-2023", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "2023 = presentación pública del 'nuevo equipo' el 6 de mayo de 2023, según la web del club. Fecha de constitución legal UNKNOWN. Historial FEFA: LNFA 2 2024 (6º Este) y 2025 (2º Este). Sin X según FEFA. Año de fundación sin fijar: el club se presentó públicamente como equipo nuevo el 6 de mayo de 2023; falta la fecha de constitución.",
      en: "2023 = public launch of the 'new team' on 6 May 2023 per club site. Legal registration date UNKNOWN. FEFA record: LNFA 2 2024 (6th East) and 2025 (2nd East). No X account per FEFA. Founding year not set: the club publicly presented itself as a new team on 6 May 2023; the formal founding date is pending.",
    },
  },
  {
    id: "riudoms-rebels",
    slug: "riudoms-rebels",
    name: "Riudoms Rebels",
    shortName: "Rebels",
    city: "Riudoms",
    province: "Tarragona",
    autonomousCommunity: "Cataluña",
    country: "ES",
    foundedYear: 2018,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Catalana",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-rebels"],
      },
    ],
    venue: {
      name: {
        es: "Camp de futbol americà Rebels",
        en: "Camp de futbol americà Rebels",
      },
      coordinates: {
        latitude: 41.1391,
        longitude: 1.052,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/rebelscfa/",
    },
    summary: {
      es: "Club del Baix Camp (Rebels CFA) que arrancó en Riudoms en 2018 y ganó su primera Lliga Catalana en 2024. Terminó cuarto en el grupo catalán de la LNFA 2 2025-26.",
      en: "Baix Camp club (Rebels CFA) that started in Riudoms in 2018 and won its first Lliga Catalana in 2024. Finished fourth in the LNFA 2 Catalan group in 2025-26.",
    },
    history: [
      {
        es: "Rebels CFA arrancó en Riudoms en 2018. [[src:diaridetarragona-rebels-2024]] La prensa apunta a que nació de una escisión de jugadores de Reus Imperials, pero no hemos encontrado una cita directa que lo confirme.",
        en: "Rebels CFA started in Riudoms in 2018. [[src:diaridetarragona-rebels-2024]] Press reports suggest it grew out of a breakaway group of Reus Imperials players, but we have found no direct quote confirming it.",
      },
      {
        es: "En 2024 ganó su primera Lliga Catalana al vencer 12-0 a Argentona Bocs. [[src:diaridetarragona-rebels-2024]] Al ser un título territorial, no figura en el palmarés de la FEFA. [[src:fefa-palmares]]",
        en: "In 2024 it won its first Lliga Catalana, beating Argentona Bocs 12-0. [[src:diaridetarragona-rebels-2024]] Being a regional title, it does not appear in the FEFA honours list. [[src:fefa-palmares]]",
      },
      {
        es: "En 2025-26 terminó cuarto del grupo catalán de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2025-26 it finished fourth in the Catalan group of LNFA 2. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Campeón Lliga Catalana",
          en: "Lliga Catalana champion",
        },
        competitionId: "lliga-catalana",
        year: 2024,
        sourceIds: ["diaridetarragona-rebels-2024"],
        verificationStatus: "partial",
      },
    ],
    sourceIds: ["fefa-team-rebels", "fefa-lnfa2-2025-26", "diaridetarragona-rebels-2024", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "La fecha de 2018 y la Lliga Catalana de 2024 (12-0 a Argentona Bocs) salen del Diari de Tarragona. No figura en el palmarés FEFA porque es un título territorial. Sin web ni X según FEFA. No hay campo en OSM, así que las coordenadas son del centro de Riudoms. Según la prensa, el club nació de una escisión de jugadores de Reus Imperials (pendiente de cita directa).",
      en: "2018 start and 2024 Lliga Catalana (12-0 over Argentona Bocs) from Diari de Tarragona. Not in the FEFA palmarés because it is a territorial title. No website or X per FEFA. No pitch in OSM, so coordinates are Riudoms centre. Press says the club began as a split of players from Reus Imperials (direct citation pending).",
    },
  },
  {
    id: "castell-platja-daro-ducs",
    slug: "castell-platja-daro-ducs",
    name: "Castell-Platja d'Aro Ducs",
    shortName: "Ducs",
    city: "Castell-Platja d'Aro",
    province: "Girona",
    autonomousCommunity: "Cataluña",
    country: "ES",
    foundedYear: 2018,
    status: "unknown",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Catalana",
        verificationStatus: "unverified",
        sourceIds: ["fefa-lnfa2-2025-26"],
      },
    ],
    venue: {
      name: {
        es: "Camp Municipal d'Esports (Castell d'Aro)",
        en: "Camp Municipal d'Esports (Castell d'Aro)",
      },
      coordinates: {
        latitude: 41.8186,
        longitude: 3.0451,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "http://www.ducsfootball.cat/",
    socialLinks: {},
    summary: {
      es: "Club gironí nacido en 2018 de la fusión de Salt Falcons y Senglars de Santa Cristina. FEFA lo incluyó en el grupo catalán de la LNFA 2 2025-26, pero no aparece en la clasificación final.",
      en: "Girona-province club formed in 2018 by merging Salt Falcons and Senglars de Santa Cristina. FEFA listed it in the 2025-26 LNFA 2 Catalan group, but it does not appear in the final standings.",
    },
    history: [
      {
        es: "El club gironí nació en 2018 de la fusión de Salt Falcons y Senglars de Santa Cristina. [[src:ducs-el-club]]",
        en: "The Girona club was created in 2018 from the merger of Salt Falcons and Senglars de Santa Cristina. [[src:ducs-el-club]]",
      },
      {
        es: "Su último rastro competitivo en la FEFA es la Copa Catalana de noviembre de 2023, donde cayó 0-22 ante Barcelona Pagesos. [[src:fefa-copa-cuartos-2023]] La FEFA lo incluyó en el grupo catalán de la LNFA 2 2025-26, pero no aparece en la clasificación final y ya no tiene ficha federativa, así que damos su estado por desconocido. [[src:fefa-lnfa2-2025-26]]",
        en: "Its last competitive trace at FEFA is the November 2023 Copa Catalana, where it lost 0-22 to Barcelona Pagesos. [[src:fefa-copa-cuartos-2023]] FEFA listed it in the Catalan group of LNFA 2 2025-26, but it does not appear in the final standings and no longer has a federation page, so we record its status as unknown. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-lnfa2-2025-26", "ducs-el-club", "platjadaro-guia-entitats", "fefa-copa-cuartos-2023", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "No tiene ficha en FEFA (/equipos/castell-platja-daro-ducs/ da 404). No consta que jugara la LNFA 2 2025-26 (probable retirada, sin fuente), así que el estado es 'unknown'. La web ducsfootball.cat tiene el certificado TLS caducado y solo carga por http. El campo sale de la guía municipal de entidades y no está en OSM, así que las coordenadas son del municipio. Faltan las redes: Facebook 'ducsfootballoficial' aparece en buscadores pero no se ha abierto. Último rastro en FEFA: Copa Catalana, noviembre de 2023 (0-22 ante Pagesos).",
      en: "No FEFA team page (/equipos/castell-platja-daro-ducs/ returns 404). No evidence it played LNFA 2 2025-26 (likely withdrawal, unsourced), so status is 'unknown'. ducsfootball.cat has an expired TLS certificate and loads only over http. Ground from the municipal clubs guide; not in OSM, so coordinates are the municipality. Socials pending: Facebook 'ducsfootballoficial' shows up in search but was not opened. Last FEFA trace: Copa Catalana, Nov 2023 (0-22 vs Pagesos).",
    },
  },
  {
    id: "pinto-goldbats",
    slug: "pinto-goldbats",
    name: "Pinto Goldbats",
    shortName: "Goldbats",
    city: "Pinto",
    province: "Madrid",
    autonomousCommunity: "Madrid",
    country: "ES",
    foundedYear: 2015,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men", "junior"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Madrileña",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-goldbats"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Príncipe de Asturias",
        en: "Polideportivo Príncipe de Asturias",
      },
      coordinates: {
        latitude: 40.241,
        longitude: -3.7005,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.pintogoldbats.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/pintogoldbats/",
      twitter: "https://x.com/pintoBATS",
    },
    summary: {
      es: "Primer club de fútbol americano de Pinto, fundado en octubre de 2015. Semifinalista de la LNFA Serie B en 2024 y quinto del grupo madrileño de la LNFA 2 2025-26.",
      en: "Pinto's first American football club, founded in October 2015. LNFA Serie B semi-finalist in 2024 and fifth in the LNFA 2 Madrid group in 2025-26.",
    },
    history: [
      {
        es: "Fue el primer club de fútbol americano de Pinto, fundado en octubre de 2015. [[src:historias-deporte-pinteno-goldbats]] MadridActual sitúa la idea original en el verano de ese mismo año. [[src:madridactual-goldbats-2018]]",
        en: "It was Pinto's first American football club, founded in October 2015. [[src:historias-deporte-pinteno-goldbats]] MadridActual places the original idea in the summer of that year. [[src:madridactual-goldbats-2018]]",
      },
      {
        es: "Compite en la Liga Madrileña desde 2017. [[src:pintogoldbats-web]] En la LNFA 2 acabó cuarto del grupo Centro en 2022 y llegó a semifinales en 2023 y 2024. [[src:fefa-team-goldbats]]",
        en: "It has played in the Liga Madrileña since 2017. [[src:pintogoldbats-web]] In LNFA 2 it finished fourth in the Centre group in 2022 and reached the semi-finals in 2023 and 2024. [[src:fefa-team-goldbats]]",
      },
      {
        es: "En 2025-26 terminó quinto del grupo madrileño de la LNFA 2. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2025-26 it finished fifth in the Madrid group of LNFA 2. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: [
      "fefa-team-goldbats",
      "fefa-lnfa2-2025-26",
      "historias-deporte-pinteno-goldbats",
      "madridactual-goldbats-2018",
      "pintogoldbats-web",
      "fefa-palmares",
      "osm-nominatim",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Octubre de 2015 sale de 'Historias del deporte pinteño' (2024). MadridActual (2018) sitúa la idea en el verano de 2015. Según la web del club, juega en el Estadio Rafael Mendoza, dentro del complejo del Pabellón Príncipe de Asturias, y compite en la Liga Madrileña desde 2017. Ninguno de los dos está en OSM, así que las coordenadas son del centro de Pinto. Historial FEFA: LNFA 2 2022 (4º Centro), 2023 y 2024 (semifinal).",
      en: "October 2015 from 'Historias del deporte pinteño' (2024). MadridActual (2018) dates the idea to summer 2015. Per the club site it plays at Estadio Rafael Mendoza, inside the Pabellón Príncipe de Asturias complex, and has been in the Madrid league since 2017. Neither is in OSM, so coordinates are Pinto centre. FEFA record: LNFA 2 2022 (4th Centre), 2023, 2024 (semi-final).",
    },
  },
  {
    id: "tres-cantos-jabatos",
    slug: "tres-cantos-jabatos",
    name: "Jabatos Tres Cantos",
    shortName: "Jabatos",
    city: "Tres Cantos",
    province: "Madrid",
    autonomousCommunity: "Madrid",
    country: "ES",
    foundedYear: 2012,
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men", "junior"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Madrileña",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-jabatos"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Gabriel Parellada",
        en: "Polideportivo Gabriel Parellada",
      },
      coordinates: {
        latitude: 40.6012,
        longitude: -3.7038,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://jabatos.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/jabatosfootball/",
      twitter: "https://x.com/JabatosFootball",
    },
    summary: {
      es: "Club de Tres Cantos fundado a finales de 2012 por exjugadores de los Tucanes (1991-2001) y jugadores jóvenes. Terminó tercero en el grupo madrileño de la LNFA 2 2025-26.",
      en: "Tres Cantos club founded in late 2012 by former Tucanes (1991-2001) players and newcomers. Finished third in the LNFA 2 Madrid group in 2025-26.",
    },
    history: [
      {
        es: "El club se fundó a finales de 2012, impulsado por exjugadores de los Tucanes, activos entre 1991 y 2001, junto a jugadores jóvenes. [[src:trescantos-jabatos]]",
        en: "The club was founded in late 2012, driven by former players of Tucanes, active between 1991 and 2001, alongside younger players. [[src:trescantos-jabatos]]",
      },
      {
        es: "En la LNFA 2 terminó cuarto del grupo Centro en 2024 [[src:fefa-team-jabatos]] y tercero del grupo madrileño en 2025-26. [[src:fefa-lnfa2-2025-26]]",
        en: "In LNFA 2 it finished fourth in the Centre group in 2024 [[src:fefa-team-jabatos]] and third in the Madrid group in 2025-26. [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-jabatos", "fefa-lnfa2-2025-26", "trescantos-jabatos", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "La fundación ('finales de 2012') sale de la ficha municipal de Tres Cantos, consultada en una copia de Internet Archive de 2015 porque el original no responde. La web jabatos.es está activa pero sin actualizar desde 2024. El campo no está en OSM, así que las coordenadas son del centro. Historial FEFA: LNFA 2 2024 (4º Centro). FEFA lo llama 'Tres Cantos Jabatos' en el anuncio de la temporada y 'Jabatos Tres Cantos' en la ficha.",
      en: "Founding ('late 2012') from the Tres Cantos council club page, read via a 2015 Internet Archive copy because the original no longer responds. jabatos.es is live but has not been updated since 2024. Ground not in OSM, so coordinates are the town centre. FEFA record: LNFA 2 2024 (4th Centre). FEFA calls it 'Tres Cantos Jabatos' in the season announcement and 'Jabatos Tres Cantos' on its team page.",
    },
  },
  {
    id: "boadilla-vikings",
    slug: "boadilla-vikings",
    name: "Boadilla Vikings",
    shortName: "Vikings",
    city: "Boadilla del Monte",
    province: "Madrid",
    autonomousCommunity: "Madrid",
    country: "ES",
    foundedYear: 2021,
    status: "active",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [
      {
        competitionId: "lnfa-2",
        season: "2025-26",
        tier: "Conferencia Madrileña",
        verificationStatus: "verified",
        sourceIds: ["fefa-lnfa2-2025-26", "fefa-team-vikings"],
      },
    ],
    venue: {
      name: {
        es: "Polideportivo Municipal Ángel Nieto",
        en: "Polideportivo Municipal Ángel Nieto",
      },
      coordinates: {
        latitude: 40.4164,
        longitude: -3.8606,
        precision: "venue",
      },
      verificationStatus: "partial",
    },
    website: "https://vikingsfa.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/vikingscfa/",
      twitter: "https://x.com/VikingsCFA",
    },
    summary: {
      es: "Club (Vikings FA) creado en 2021 en Boadilla del Monte para extender el fútbol americano por el municipio. Terminó cuarto en el grupo madrileño de la LNFA 2 2025-26.",
      en: "Club (Vikings FA) created in 2021 in Boadilla del Monte to spread American football in the town. Finished fourth in the LNFA 2 Madrid group in 2025-26.",
    },
    history: [
      {
        es: "Vikings FA se creó en 2021 en Boadilla del Monte para extender el fútbol americano por el municipio. [[src:vikings-club]]",
        en: "Vikings FA was created in 2021 in Boadilla del Monte to spread American football across the town. [[src:vikings-club]]",
      },
      {
        es: "La temporada 2025-26 fue la primera con historial federativo tras cuatro años sin competición nacional: terminó cuarto del grupo madrileño de la LNFA 2. [[src:fefa-team-vikings]] [[src:fefa-lnfa2-2025-26]]",
        en: "2025-26 was its first season with a federation record after four years without national competition: it finished fourth in the Madrid group of LNFA 2. [[src:fefa-team-vikings]] [[src:fefa-lnfa2-2025-26]]",
      },
    ],
    honours: [],
    sourceIds: ["fefa-team-vikings", "fefa-lnfa2-2025-26", "vikings-club", "fefa-palmares", "osm-nominatim"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "La fundación en 2021 sale de la web del club. 2025-26 es su primera temporada con historial en FEFA (2021-2025 sin participación nacional). Coordenadas del Complejo Deportivo Municipal Ángel Nieto según OSM.",
      en: "2021 founding from club site. 2025-26 is its first season with a FEFA record (no national play 2021-2025). Coordinates of Complejo Deportivo Municipal Ángel Nieto per OSM.",
    },
  },
  {
    id: "granada-lions",
    slug: "granada-lions",
    name: "Granada Lions",
    shortName: "Lions",
    city: "Maracena",
    province: "Granada",
    autonomousCommunity: "Andalucía",
    country: "ES",
    foundedYear: 2001,
    status: "active",
    disciplines: ["tackle", "flag"],
    categories: ["senior-men"],
    currentCompetitions: [],
    venue: {
      name: {
        es: "Estadio José Comino (Maracena)",
        en: "Estadio José Comino (Maracena)",
      },
      coordinates: {
        latitude: 37.2076,
        longitude: -3.633,
        precision: "city",
      },
      verificationStatus: "partial",
    },
    website: "https://www.granadalions.es/",
    socialLinks: {
      instagram: "https://www.instagram.com/granadalions/",
      twitter: "https://x.com/granadalions",
      facebook: "https://www.facebook.com/Granadalions/",
    },
    summary: {
      es: "Club fundado el 2 de febrero de 2001 como Granada Universitarios y campeón de la LNFA 2 en 2013. Hoy tiene sede en Maracena y en 2025-26 jugó solo competiciones andaluzas: ganó la Copa Andaluza en marzo de 2026.",
      en: "Founded on 2 February 2001 as Granada Universitarios and LNFA 2 champion in 2013. Now based in Maracena, it played only Andalusian competitions in 2025-26 and won the Copa Andaluza in March 2026.",
    },
    history: [
      {
        es: "El club nació el 2 de febrero de 2001 con el nombre de Granada Universitarios y acabó adoptando el de Granada Lions. [[src:granadalions-historia]] [[src:wiki-granada-lions]]",
        en: "The club was founded on 2 February 2001 as Granada Universitarios and later took the name Granada Lions. [[src:granadalions-historia]] [[src:wiki-granada-lions]]",
      },
      {
        es: "Su mayor título nacional llegó en 2013, cuando se proclamó campeón de la LNFA 2. [[src:fefa-palmares]] La ficha federativa recoge sus temporadas entre 2011-12 y 2022-23, y en 2022 ganó la vigésima edición de la Liga Andaluza. [[src:fefa-team-lions]] [[src:granadaenjuego-lions-liga-2022]]",
        en: "Its biggest national title came in 2013, when it won LNFA 2. [[src:fefa-palmares]] The federation record covers its seasons between 2011-12 and 2022-23, and in 2022 it won the twentieth edition of the Liga Andaluza. [[src:fefa-team-lions]] [[src:granadaenjuego-lions-liga-2022]]",
      },
      {
        es: "Con sede en Maracena, en 2025-26 no disputó ninguna competición de la FEFA y centró su calendario en Andalucía: perdió la final de la Copa Andaluza 8-14 ante Mairena Blue Devils en diciembre de 2025 [[src:granadaenjuego-lions-copa-final-2025]], debutó con empate en la Liga Andaluza 7x7 en febrero de 2026 [[src:granadaenjuego-lions-liga-debut-2026]] y en marzo se llevó la Copa Andaluza al ganar 12-7 a Almería Barbarians. [[src:granadaenjuego-lions-copa-2026]]",
        en: "Based in Maracena, in 2025-26 it played no FEFA competition and built its season around Andalusian play: it lost the Copa Andaluza final 8-14 to Mairena Blue Devils in December 2025 [[src:granadaenjuego-lions-copa-final-2025]], opened the Liga Andaluza 7x7 with a draw in February 2026 [[src:granadaenjuego-lions-liga-debut-2026]], and in March took the Copa Andaluza by beating Almería Barbarians 12-7. [[src:granadaenjuego-lions-copa-2026]]",
      },
    ],
    honours: [
      {
        title: {
          es: "Campeón LNFA 2",
          en: "LNFA 2 champion",
        },
        competitionId: "lnfa-2",
        year: 2013,
        sourceIds: ["fefa-palmares"],
        verificationStatus: "verified",
      },
      {
        title: {
          es: "Campeón Liga Andaluza (XX edición)",
          en: "Andalusian League champion (20th edition)",
        },
        year: 2022,
        sourceIds: ["granadaenjuego-lions-liga-2022"],
        verificationStatus: "partial",
      },
      {
        title: {
          es: "Campeón Copa Andaluza",
          en: "Copa Andaluza champion",
        },
        year: 2026,
        sourceIds: ["granadaenjuego-lions-copa-2026"],
        verificationStatus: "partial",
      },
    ],
    sourceIds: [
      "fefa-palmares",
      "fefa-team-lions",
      "granadalions-historia",
      "wiki-granada-lions",
      "granadaenjuego-lions-liga-2022",
      "granadaenjuego-lions-copa-final-2025",
      "granadaenjuego-lions-liga-debut-2026",
      "granadaenjuego-lions-copa-2026",
      "osm-nominatim",
    ],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-02",
    researchNotes: {
      es: "Sigue activo en 2026 en competiciones regionales: final de la Copa Andaluza perdida 8-14 ante Mairena Blue Devils (diciembre de 2025), Liga Andaluza 7x7 desde febrero de 2026 y Copa Andaluza ganada 12-7 a Almería Barbarians (marzo de 2026). La relación entre las dos Copas Andaluzas (¿ediciones o formatos distintos?) está por aclarar. No juega ninguna competición FEFA en 2025-26: la ficha FEFA llega hasta 2022-23 y currentCompetitions queda vacío porque no hay competitionId 'liga-andaluza'. La web granadalions.es no se actualiza desde febrero de 2023. OSM tiene 'Campo de Fútbol Municipal de Maracena' en la Avenida de José Comino, pero no se ha confirmado que sea el mismo 'Estadio José Comino', así que la precisión es de ciudad. Wikipedia cita el Complejo Antonio Prieto Castillo (campo antiguo).",
      en: "Still active in 2026 in regional play: lost the Copa Andaluza final 8-14 to Mairena Blue Devils (Dec 2025), Liga Andaluza 7x7 from Feb 2026, and won the Copa Andaluza 12-7 over Almería Barbarians (Mar 2026). How the two Copa Andaluza finals relate (separate editions or formats?) is still unclear. No FEFA competition in 2025-26: the FEFA page ends at 2022-23 and currentCompetitions is empty because there is no 'liga-andaluza' competitionId. granadalions.es has not been updated since Feb 2023. OSM has 'Campo de Fútbol Municipal de Maracena' on Avenida de José Comino, but it is not confirmed to be the same 'Estadio José Comino', so precision is city. Wikipedia cites Complejo Antonio Prieto Castillo (former ground).",
    },
  },
];
