import type { Article } from "@/types";

export const footballEnBarcelona: Article = {
  id: "football-en-barcelona",
  slug: "football-en-barcelona",
  title: { es: "Football en Barcelona: dónde y cómo se juega hoy", en: "Football in Barcelona: where and how it is played today" },
  subtitle: {
    es: "Introducción a Road to Annapolis. Antes de cruzar el Atlántico, un mapa honesto del fútbol americano que ya existe en casa.",
    en: "An introduction to Road to Annapolis. Before crossing the Atlantic, an honest map of the American football that already exists at home.",
  },
  excerpt: {
    es: "Nueve clubes en el área de Barcelona, tres en la máxima categoría, el club más laureado de España y el equipo femenino más dominante. Cataluña es donde empezó todo, y donde más se juega.",
    en: "Nine clubs around Barcelona, three in the top tier, Spain's most successful club and its most dominant women's team. Catalonia is where it all started, and where the game is played most.",
  },
  authorId: "jordi-sanchez",
  category: "road-to-annapolis",
  tags: ["Road to Annapolis", "Barcelona", "Cataluña", "LNFA", "flag"],
  relatedTeamIds: ["badalona-dracs", "lhospitalet-pioners", "terrassa-reds", "barbera-rookies", "barcelona-pagesos", "barcelona-bufals", "barcelona-uroloki", "argentona-bocs", "reus-imperials"],
  relatedCompetitionIds: ["lnfa", "lnfa-2", "lnfa-femenina", "lliga-catalana", "spanish-flag-bowl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-13",
  updatedAt: "2026-09-13",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-09-13",
  readingTimeMinutes: 6,
  sourceIds: [
    "fcfa-historia",
    "fefa-calendario-2026-27",
    "fefa-spanish-bowl-2026",
    "fefa-lnfa2-2025-26",
    "fefa-femenina-final-2026",
    "fefa-palmares",
    "fefa-palmares-flag",
    "fefa-team-pioners",
    "fefa-team-pagesos",
    "monterrassa-reds-2025",
    "fefa-competiciones",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "Cuando le cuentas a alguien de fuera que vas a viajar a Estados Unidos para ver un partido de football, la primera pregunta suele ser si eso se juega en España. Se juega desde 1987, y empezó exactamente aquí: en Badalona, a diez kilómetros del centro de Barcelona. [[src:fcfa-historia]] Este capítulo es el punto de partida del viaje: qué hay hoy en el área de Barcelona, quién juega, dónde y en qué categoría.",
        en: "When you tell someone from abroad that you are travelling to the United States to watch a football game, the first question is usually whether the sport is played in Spain. It has been since 1987, and it started right here: in Badalona, ten kilometres from central Barcelona. [[src:fcfa-historia]] This chapter is the starting point of the trip: what exists today around Barcelona, who plays, where and at which level.",
      },
    },
    { type: "heading", level: 2, text: { es: "Tres equipos en la élite", en: "Three teams in the top tier" } },
    {
      type: "paragraph",
      text: {
        es: "La LNFA 2026-27, la máxima categoría, la juegan diez equipos en dos conferencias. Tres son del área de Barcelona y comparten la Conferencia Este: Badalona Dracs, L'Hospitalet Pioners y Terrassa Reds. [[src:fefa-calendario-2026-27]] Los Dracs, con once ligas, son el club más laureado del país y acaban de perder la Spanish Bowl 2026 en su propia ciudad ante Las Rozas Black Demons. [[src:fefa-palmares]] [[src:fefa-spanish-bowl-2026]] Los Pioners suman seis títulos y los Reds, campeones de la LNFA 2 en 2024, terminaron segundos de la conferencia en su temporada 2025-26. [[src:fefa-palmares]]",
        en: "The 2026-27 LNFA, the top tier, features ten teams in two conferences. Three come from the Barcelona area and share the East Conference: Badalona Dracs, L'Hospitalet Pioners and Terrassa Reds. [[src:fefa-calendario-2026-27]] The Dracs, with eleven league titles, are the country's most successful club and have just lost the 2026 Spanish Bowl in their own city to Las Rozas Black Demons. [[src:fefa-palmares]] [[src:fefa-spanish-bowl-2026]] The Pioners hold six titles and the Reds, LNFA 2 champions in 2024, finished second in the conference in their 2025-26 season. [[src:fefa-palmares]]",
      },
    },
    { type: "heading", level: 2, text: { es: "Una liga catalana dentro de la liga nacional", en: "A Catalan league inside the national league" } },
    {
      type: "paragraph",
      text: {
        es: "Un escalón por debajo, la LNFA 2 se organiza en grupos territoriales. El grupo catalán de 2025-26 reunió a ocho clubes: Barcelona Uroloki, Barcelona Pagesos, Barberà Rookies, Reus Imperials, Castell-Platja d'Aro Ducs, Barcelona Búfals, Argentona Bocs y Riudoms Rebels. [[src:fefa-lnfa2-2025-26]] Los Pagesos lo ganaron con un 7-0 antes de caer en cuartos de final nacionales ante Alcobendas Cavaliers. [[src:fefa-team-pagesos]] Ese grupo es, en la práctica, la Lliga Catalana que empezó en 1988 con cuatro equipos. [[src:fcfa-historia]]",
        en: "One step below, LNFA 2 is organised in territorial groups. The 2025-26 Catalan group gathered eight clubs: Barcelona Uroloki, Barcelona Pagesos, Barberà Rookies, Reus Imperials, Castell-Platja d'Aro Ducs, Barcelona Búfals, Argentona Bocs and Riudoms Rebels. [[src:fefa-lnfa2-2025-26]] The Pagesos won it 7-0 before losing the national quarter-final to Alcobendas Cavaliers. [[src:fefa-team-pagesos]] That group is, in practice, the Lliga Catalana that started in 1988 with four teams. [[src:fcfa-historia]]",
      },
    },
    { type: "heading", level: 2, text: { es: "El football femenino se decide aquí", en: "Women's football is decided here" } },
    {
      type: "paragraph",
      text: {
        es: "La LNFA Femenina 2025-26 la ganaron las Barberà Rookies, del Vallès, en la prórroga de la final ante Valencia Firebats. Es su undécimo título, un récord. [[src:fefa-femenina-final-2026]] [[src:fefa-palmares]] L'Hospitalet Pioners y Barcelona Búfals también compiten en la liga femenina, y los Pioners llegaron a semifinales. [[src:fefa-femenina-final-2026]] [[src:fefa-team-pioners]]",
        en: "The 2025-26 LNFA Femenina was won by Barberà Rookies, from the Vallès, in overtime of the final against Valencia Firebats. It is their eleventh title, a record. [[src:fefa-femenina-final-2026]] [[src:fefa-palmares]] L'Hospitalet Pioners and Barcelona Búfals also compete in the women's league, and the Pioners reached the semifinals. [[src:fefa-femenina-final-2026]] [[src:fefa-team-pioners]]",
      },
    },
    { type: "heading", level: 2, text: { es: "Flag: la puerta de entrada", en: "Flag: the way in" } },
    {
      type: "paragraph",
      text: {
        es: "Si alguien quiere empezar a jugar sin placajes, la mayoría de estos clubes tiene sección de flag football. Barcelona Pagesos son los campeones de la Spanish Flag Bowl Open de 2025, y la federación organiza además una Spanish Flag Bowl para categorías juveniles. [[src:fefa-palmares-flag]] [[src:fefa-competiciones]]",
        en: "If someone wants to start playing without tackling, most of these clubs have a flag football section. Barcelona Pagesos are the 2025 Spanish Flag Bowl Open champions, and the federation also runs a youth Spanish Flag Bowl. [[src:fefa-palmares-flag]] [[src:fefa-competiciones]]",
      },
    },
    { type: "heading", level: 2, text: { es: "Dónde verlo", en: "Where to watch it" } },
    {
      type: "paragraph",
      text: {
        es: "Se juega en campos municipales de fútbol o rugby, con entrada libre o simbólica: Montigalà en Badalona, L'Hospitalet Nord, Can Boada en Terrassa, Can Llobet en Barberà o el CEM Bon Pastor en Barcelona. Ninguno es un estadio de football: Terrassa Reds tienen en proyecto el que sería el primer campo específico de fútbol americano de España. [[src:monterrassa-reds-2025]] La temporada de la LNFA va de enero a mayo; la Copa de España, de septiembre a noviembre. [[src:fefa-calendario-2026-27]]",
        en: "Games are played on municipal football or rugby pitches, with free or token admission: Montigalà in Badalona, L'Hospitalet Nord, Can Boada in Terrassa, Can Llobet in Barberà or CEM Bon Pastor in Barcelona. None is a football stadium: Terrassa Reds are planning what would be Spain's first purpose-built American football field. [[src:monterrassa-reds-2025]] The LNFA season runs from January to May; the Copa de España from September to November. [[src:fefa-calendario-2026-27]]",
      },
    },
    {
      type: "callout",
      title: { es: "Por qué importa para el viaje", en: "Why it matters for the trip" },
      text: {
        es: "Preparamos Annapolis con esta referencia en la cabeza: campos municipales, voluntarios y unos cientos de espectadores. Si el viaje se confirma, compararemos lo que veamos allí con esto, no con la NFL.",
        en: "We are planning Annapolis with this reference in mind: municipal pitches, volunteers and a few hundred spectators. If the trip is confirmed, we will compare what we see there with this, not with the NFL.",
      },
    },
  ],
};
