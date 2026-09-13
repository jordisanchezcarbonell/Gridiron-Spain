import type { GameFact, LocalizedString, Partner, RoadChapter, RoadStop } from "@/types";

/** Coordinates are stored, never geocoded at runtime. */
export const roadStops: RoadStop[] = [
  {
    id: "barcelona",
    name: "Barcelona",
    latitude: 41.3874,
    longitude: 2.1686,
    label: { es: "Origen · Cataluña, España", en: "Origin · Catalonia, Spain" },
  },
  {
    id: "washington",
    name: "Washington",
    latitude: 38.9072,
    longitude: -77.0369,
    label: { es: "Llegada a Estados Unidos", en: "Arrival in the United States" },
  },
  {
    id: "annapolis",
    name: "Annapolis",
    latitude: 38.9784,
    longitude: -76.4922,
    label: { es: "Maryland · sede de la Academia Naval", en: "Maryland · home of the Naval Academy" },
  },
  {
    id: "navy-football",
    name: "Navy Football",
    latitude: 38.9853,
    longitude: -76.5074,
    label: { es: "Navy-Marine Corps Memorial Stadium", en: "Navy-Marine Corps Memorial Stadium" },
  },
];

export const roadChapters: RoadChapter[] = [
  {
    number: 1,
    slug: "football-in-barcelona",
    title: { es: "Football en Barcelona", en: "Football in Barcelona" },
    summary: {
      es: "Dónde y cómo se juega hoy en el área de Barcelona, y por qué esta ciudad es una de las cunas del deporte en España.",
      en: "Where and how the game is played today around Barcelona, and why the city is one of the sport's cradles in Spain.",
    },
    status: "published",
    articleSlug: "football-en-barcelona",
  },
  {
    number: 2,
    slug: "how-football-arrived-in-spain",
    title: { es: "Cómo llegó el football a España", en: "How American football arrived in Spain" },
    summary: {
      es: "Los primeros clubes, los primeros partidos y el nacimiento de las competiciones nacionales.",
      en: "The first clubs, the first games and the birth of national competitions.",
    },
    status: "researching",
    articleSlug: "historia-futbol-americano-espana",
  },
  {
    number: 3,
    slug: "teams-keeping-football-alive",
    title: { es: "Los equipos que mantienen vivo el football", en: "The teams keeping football alive in Spain" },
    summary: {
      es: "Clubes amateurs, voluntarios y familias que sostienen el deporte temporada tras temporada.",
      en: "Amateur clubs, volunteers and families sustaining the sport season after season.",
    },
    status: "planned",
  },
  {
    number: 4,
    slug: "barcelona-dragons",
    title: { es: "Barcelona Dragons", en: "Barcelona Dragons" },
    summary: {
      es: "Auge, caída y legado del football profesional en Barcelona, de la World League a la ELF.",
      en: "Rise, fall and legacy of professional football in Barcelona, from the World League to the ELF.",
    },
    status: "researching",
    articleSlug: "barcelona-dragons",
  },
  {
    number: 5,
    slug: "madrid-bravos",
    title: { es: "Madrid Bravos y la nueva era europea", en: "Madrid Bravos and the new European era" },
    summary: {
      es: "Dos temporadas de playoffs en la European League of Football, un acuerdo con los Miami Dolphins y una retirada en marzo de 2026. Qué queda del football profesional en España.",
      en: "Two playoff seasons in the European League of Football, a Miami Dolphins partnership and a withdrawal in March 2026. What is left of professional football in Spain.",
    },
    status: "researching",
    articleSlug: "madrid-bravos",
  },
  {
    number: 6,
    slug: "why-college-football-is-different",
    title: { es: "Por qué el college football es diferente", en: "Why college football is different" },
    summary: {
      es: "Universidades, tradiciones, bandas y estadios de cien mil personas: una guía para entenderlo desde Europa.",
      en: "Universities, traditions, bands and hundred-thousand-seat stadiums: a guide to understanding it from Europe.",
    },
    status: "researching",
    articleSlug: "que-es-el-college-football",
  },
  {
    number: 7,
    slug: "barcelona-to-annapolis",
    title: { es: "Barcelona → Annapolis", en: "Barcelona → Annapolis" },
    summary: {
      es: "Vuelos, presupuesto, logística y qué esperamos del viaje.",
      en: "Flights, budget, logistics and what we expect from the trip.",
    },
    status: "researching",
    articleSlug: "por-que-viajamos-de-barcelona-a-annapolis",
  },
  {
    number: 8,
    slug: "navy-football-homecoming",
    title: { es: "Navy Football Homecoming", en: "Navy Football Homecoming" },
    summary: {
      es: "El día de partido en Annapolis, contado desde dentro. Se publicará después del 24 de octubre de 2026.",
      en: "Game day in Annapolis, told from the inside. To be published after 24 October 2026.",
    },
    status: "planned",
  },
  {
    number: 9,
    slug: "what-spain-can-learn",
    title: { es: "Qué puede aprender España de la cultura del football", en: "What Spain can learn from American football culture" },
    summary: {
      es: "Conclusiones tras el viaje: comunidad, tradición y lo que sí es trasladable.",
      en: "Conclusions after the trip: community, tradition and what actually translates.",
    },
    status: "planned",
  },
];

/**
 * Game facts are re-checked against navysports.com before the trip.
 * Kickoff times can change for television; keep lastVerifiedAt current.
 */
export const gameFacts: GameFact[] = [
  {
    label: { es: "Partido", en: "Game" },
    value: { es: "Navy vs North Texas", en: "Navy vs North Texas" },
    verificationStatus: "verified",
    sourceIds: ["navy-schedule-2026", "navy-schedule-release-2026"],
  },
  {
    label: { es: "Fecha", en: "Date" },
    value: { es: "Sábado 24 de octubre de 2026", en: "Saturday 24 October 2026" },
    verificationStatus: "verified",
    sourceIds: ["navy-schedule-2026"],
  },
  {
    label: { es: "Hora", en: "Kickoff" },
    value: { es: "15:30 ET (21:30 en España)", en: "3:30 PM ET" },
    verificationStatus: "verified",
    sourceIds: ["navy-schedule-2026"],
  },
  {
    label: { es: "Estadio", en: "Venue" },
    value: { es: "Navy-Marine Corps Memorial Stadium, Annapolis (34.000)", en: "Navy-Marine Corps Memorial Stadium, Annapolis (34,000)" },
    verificationStatus: "verified",
    sourceIds: ["navy-stadium", "navy-towson-notes-2026"],
  },
  {
    label: { es: "Homecoming", en: "Homecoming" },
    value: { es: "Sí, designado oficialmente", en: "Yes, officially designated" },
    verificationStatus: "verified",
    sourceIds: ["navy-schedule-release-2026", "navy-schedule-2026"],
  },
  {
    label: { es: "Televisión", en: "TV" },
    value: { es: "CBS Sports Network", en: "CBS Sports Network" },
    verificationStatus: "verified",
    sourceIds: ["navy-schedule-2026"],
  },
  {
    label: { es: "Competición", en: "Conference" },
    value: { es: "American Conference (NCAA FBS)", en: "American Conference (NCAA FBS)" },
    verificationStatus: "verified",
    sourceIds: ["american-conference-brand-2025"],
  },
];

export const roadCopy: {
  story: LocalizedString[];
  whyNavy: LocalizedString[];
  journey: LocalizedString[];
  gameNote: LocalizedString;
  sourceIds: string[];
  lastVerifiedAt: string;
} = {
  story: [
    {
      es: "Gridiron Spain nació preparando un viaje. Dos aficionados de Barcelona, que llevan años siguiendo la NFL y la NCAA desde la distancia, preparan la posibilidad de vivir por primera vez un partido de college football en un estadio universitario estadounidense en otoño de 2026.",
      en: "Gridiron Spain was born while planning a trip. Two fans from Barcelona, who have followed the NFL and the NCAA from a distance for years, are preparing the possibility of experiencing a college football game in an American university stadium for the first time in autumn 2026.",
    },
    {
      es: "Al documentar el viaje nos dimos cuenta de que la historia empezaba mucho antes, en casa. El fútbol americano se juega en España desde los años ochenta, y queremos reunir y hacer accesible esa historia. Road to Annapolis es nuestra primera serie especial: mirar la cultura del football estadounidense desde dentro para entender mejor la nuestra.",
      en: "While documenting the trip we realised the story started much earlier, at home. American football has been played in Spain since the 1980s, and we want to bring that history together and make it accessible. Road to Annapolis is our first special series: looking at American football culture from the inside to better understand our own.",
    },
    {
      es: "Gridiron Spain es un proyecto editorial independiente recién lanzado por Jordi Sánchez, desarrollador web y aficionado al fútbol americano desde Barcelona. Está preparando este viaje con otro aficionado, con fuentes verificables, contenido bilingüe y una mirada europea sobre el deporte.",
      en: "Gridiron Spain is a newly launched independent editorial project by Jordi Sánchez, a web developer and American football fan from Barcelona. He is preparing this trip with another fan, with verifiable sources, bilingual content and a European perspective on the game.",
    },
  ],
  whyNavy: [
    {
      es: "El programa de football de la Academia Naval de Estados Unidos juega desde 1879: su primer partido, un empate sin goles ante el Baltimore Athletic Club, se disputó el 11 de diciembre de aquel año. [[src:navy-history]]",
      en: "The United States Naval Academy football program dates back to 1879: its first game, a scoreless tie against the Baltimore Athletic Club, was played on 11 December of that year. [[src:navy-history]]",
    },
    {
      es: "El Army-Navy Game, disputado por primera vez el 29 de noviembre de 1890 en West Point con victoria de Navy por 24-0, es una de las rivalidades más antiguas del deporte universitario estadounidense y se juega cada año desde 1930. [[src:army-first-game]] [[src:westpoint-rivalry]] Junto a Air Force, Navy compite además por el Commander-in-Chief's Trophy, creado en 1972. [[src:navy-cic-2025]]",
      en: "The Army-Navy Game, first played on 29 November 1890 at West Point with a 24-0 Navy win, is one of the oldest rivalries in American college sport and has been played every year since 1930. [[src:army-first-game]] [[src:westpoint-rivalry]] Together with Air Force, Navy also competes for the Commander-in-Chief's Trophy, created in 1972. [[src:navy-cic-2025]]",
    },
    {
      es: "Un partido en casa en Annapolis tiene rituales propios: la Brigada de Guardiamarinas entra en formación al campo antes del inicio (March-On), hay un sobrevuelo militar tras el himno, y al acabar el equipo se cuadra frente a la Brigada mientras suena el alma mater, Navy Blue and Gold. [[src:navy-towson-notes-2026]] El himno de la Academia, Anchors Aweigh, se estrenó en el Army-Navy de 1906. [[src:navy-history]]",
      en: "A home game in Annapolis has its own rituals: the Brigade of Midshipmen marches onto the field before kickoff (the March-On), a military flyover follows the anthem, and after the game the team stands at attention before the Brigade while the alma mater, Navy Blue and Gold, is played. [[src:navy-towson-notes-2026]] The Academy's fight song, Anchors Aweigh, debuted at the 1906 Army-Navy Game. [[src:navy-history]]",
    },
    {
      es: "En el campo, Navy ha sido durante décadas sinónimo de ataque de carrera. Desde 2024, con el coordinador ofensivo Drew Cronic, el equipo juega un Wing-T híbrido que conserva elementos de la triple opción. [[src:stripes-wing-t-2024]] [[src:navy-woodson-2026]] El entrenador jefe es Brian Newberry, en su cuarta temporada en 2026. [[src:navy-staff-2026]]",
      en: "On the field, Navy has been synonymous with the running game for decades. Since 2024, under offensive coordinator Drew Cronic, the team runs a hybrid Wing-T that keeps triple-option elements. [[src:stripes-wing-t-2024]] [[src:navy-woodson-2026]] The head coach is Brian Newberry, in his fourth season in 2026. [[src:navy-staff-2026]]",
    },
  ],
  journey: [
    {
      es: "Barcelona y Annapolis están separadas por unos 6.445 kilómetros en línea recta. No hay vuelo directo: la llegada será por el área de Washington, con tres aeropuertos internacionales posibles (BWI, Dulles y Reagan National). [[src:visit-annapolis-airports]] BWI, en el propio condado de Anne Arundel, queda a unos 30 minutos de Annapolis. [[src:bwi-annapolis]]",
      en: "Barcelona and Annapolis are roughly 6,445 kilometres apart as the crow flies. There is no direct flight: arrival will be through the Washington area, with three possible international airports (BWI, Dulles and Reagan National). [[src:visit-annapolis-airports]] BWI, in Anne Arundel County itself, is about 30 minutes from Annapolis. [[src:bwi-annapolis]]",
    },
    {
      es: "Fechas previstas: del 23 al 25 de octubre de 2026, dos personas. Son fechas de planificación: el viaje y las entradas no están reservados ni confirmados. Si se realiza, publicaremos el presupuesto real, qué funcionó y qué no, para que sirva a cualquiera que quiera hacer lo mismo desde España.",
      en: "Planned dates: 23 to 25 October 2026, two people. These are planning dates: travel and tickets are neither booked nor confirmed. If it takes place, we will publish the real budget, what worked and what did not, so it can help anyone wanting to do the same from Spain.",
    },
  ],
  gameNote: {
    es: "Datos comprobados en la web oficial de Navy Athletics. La hora puede cambiar por televisión; la revisaremos las semanas previas al partido.",
    en: "Checked against the official Navy Athletics website. Kickoff may change for television; we will re-check in the weeks before the game.",
  },
  sourceIds: [
    "navy-history",
    "army-first-game",
    "westpoint-rivalry",
    "navy-cic-2025",
    "navy-towson-notes-2026",
    "stripes-wing-t-2024",
    "navy-woodson-2026",
    "navy-staff-2026",
    "visit-annapolis-airports",
    "bwi-annapolis",
  ],
  lastVerifiedAt: "2026-09-12",
};

/**
 * Partners are only rendered when confirmed === true.
 * Never flip a partner to confirmed without a signed/written agreement.
 */
export const partners: Partner[] = [];
