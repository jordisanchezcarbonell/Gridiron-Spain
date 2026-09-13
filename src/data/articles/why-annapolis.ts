import type { Article } from "@/types";

export const whyAnnapolis: Article = {
  id: "por-que-viajamos-de-barcelona-a-annapolis",
  slug: "por-que-viajamos-de-barcelona-a-annapolis",
  title: { es: "Por qué viajamos de Barcelona a Annapolis", en: "Why we are travelling from Barcelona to Annapolis" },
  subtitle: {
    es: "Dos aficionados, un partido de Navy Football y un proyecto que quiere documentar el football desde España.",
    en: "Two fans, a Navy Football game and a project that wants to document football from Spain.",
  },
  excerpt: {
    es: "El primer capítulo de Road to Annapolis: qué buscamos en un partido de college football, por qué Navy y cómo lo estamos preparando.",
    en: "The first chapter of Road to Annapolis: what we are looking for in a college football game, why Navy and how we are preparing it.",
  },
  authorId: "jordi-sanchez",
  category: "road-to-annapolis",
  tags: ["Road to Annapolis", "Navy", "viaje", "college football"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-12",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-09-12",
  readingTimeMinutes: 4,
  sourceIds: ["navy-schedule-2026", "navy-schedule-release-2026", "navy-stadium", "navy-history", "westpoint-rivalry", "visit-annapolis-airports", "bwi-annapolis"],
  content: [
    {
      type: "paragraph",
      text: {
        es: "El 24 de octubre de 2026, a las 15:30 hora del este, Navy recibe a North Texas en el Navy-Marine Corps Memorial Stadium de Annapolis. Es el partido de Homecoming de la Academia Naval. [[src:navy-schedule-2026]] [[src:navy-schedule-release-2026]] Nosotros estaremos allí, y será nuestro primer partido de college football.",
        en: "On 24 October 2026, at 3:30 PM Eastern, Navy hosts North Texas at Navy-Marine Corps Memorial Stadium in Annapolis. It is the Naval Academy's Homecoming game. [[src:navy-schedule-2026]] [[src:navy-schedule-release-2026]] We will be there, and it will be our first college football game.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Por qué un partido universitario", en: "Why a college game" },
    },
    {
      type: "paragraph",
      text: {
        es: "Podríamos haber elegido la NFL. Elegimos el college football porque es donde el deporte conserva su capa más cultural: universidades, tradiciones de más de un siglo y comunidades enteras alrededor de un equipo. Navy juega desde 1879 [[src:navy-history]] y su rivalidad con Army se disputa cada año desde 1930. [[src:westpoint-rivalry]] Queríamos entender eso desde dentro, no desde una pantalla.",
        en: "We could have chosen the NFL. We chose college football because it is where the sport keeps its most cultural layer: universities, traditions more than a century old and whole communities around a team. Navy has played since 1879 [[src:navy-history]] and its rivalry with Army has been played every year since 1930. [[src:westpoint-rivalry]] We wanted to understand that from the inside, not from a screen.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Por qué Navy", en: "Why Navy" },
    },
    {
      type: "paragraph",
      text: {
        es: "Annapolis está a menos de una hora de Washington, con tres aeropuertos internacionales cerca. [[src:visit-annapolis-airports]] [[src:bwi-annapolis]] El estadio tiene 34.000 localidades, [[src:navy-stadium]] una escala que permite vivir el partido sin la logística de los gigantes de cien mil. Y Homecoming añade a los antiguos alumnos, las ceremonias y el ambiente que buscamos documentar.",
        en: "Annapolis is under an hour from Washington, with three international airports nearby. [[src:visit-annapolis-airports]] [[src:bwi-annapolis]] The stadium seats 34,000, [[src:navy-stadium]] a scale that lets you live the game without the logistics of the hundred-thousand giants. And Homecoming adds the alumni, ceremonies and atmosphere we want to document.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Qué vamos a publicar", en: "What we will publish" },
    },
    {
      type: "list",
      items: [
        { es: "Un presupuesto real del viaje desde Barcelona, para dos personas.", en: "A real budget for the trip from Barcelona, for two people." },
        { es: "Guías prácticas: vuelos, cómo llegar a Annapolis, dónde dormir, entradas.", en: "Practical guides: flights, getting to Annapolis, where to stay, tickets." },
        { es: "Vídeo y fotografía del día de partido.", en: "Video and photography from game day." },
        { es: "Una comparación honesta entre la cultura del football en Estados Unidos y la que tenemos en España.", en: "An honest comparison between football culture in the United States and what we have in Spain." },
      ],
    },
    {
      type: "callout",
      title: { es: "Transparencia", en: "Transparency" },
      text: {
        es: "Estamos contactando con entidades de Annapolis y con marcas para reducir el coste del viaje a cambio de contenido. Cualquier colaboración se indicará claramente. Ninguna existe todavía.",
        en: "We are contacting Annapolis organisations and brands to reduce the cost of the trip in exchange for content. Any collaboration will be clearly disclosed. None exists yet.",
      },
    },
  ],
};
