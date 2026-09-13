import type { Article } from "@/types";

export const badalonaDracs: Article = {
  id: "badalona-dracs",
  slug: "badalona-dracs",
  title: { es: "Cómo nació Badalona Dracs, el primer club de football de España", en: "How Badalona Dracs, Spain's first football club, was born" },
  subtitle: {
    es: "Un entrenador italiano, un partido contra Palermo y una liga catalana con cuatro equipos: los orígenes del club más laureado del país.",
    en: "An Italian coach, a game against Palermo and a four-team Catalan league: the origins of the country's most successful club.",
  },
  excerpt: {
    es: "Los Dracs jugaron el primer partido de fútbol americano en España en 1988 y desde entonces han ganado once ligas. Esto es lo que las fuentes permiten contar hoy, y lo que falta por documentar.",
    en: "The Dracs played Spain's first American football game in 1988 and have since won eleven leagues. This is what the sources allow us to tell today, and what remains to be documented.",
  },
  authorId: "jordi-sanchez",
  category: "equipos",
  tags: ["Badalona Dracs", "Cataluña", "orígenes", "LNFA"],
  relatedTeamIds: ["badalona-dracs"],
  relatedCompetitionIds: ["lnfa", "lliga-catalana", "copa-espana"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-12",
  status: "researching",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-09-12",
  readingTimeMinutes: 5,
  sourceIds: ["fcfa-historia", "bufals-historia", "fefa-palmares", "fefa-team-dracs", "fcfa-dracs", "fefa-spanish-bowl-2026", "fefa-junior-2026"],
  content: [
    {
      type: "paragraph",
      text: {
        es: "La historia oficial de la Federació Catalana de Futbol Americà sitúa el origen del deporte en España en 1987, cuando el entrenador italiano Alfonso Genchi convenció a Pere Moliner para formar un equipo en Badalona. Aquel primer equipo se llamó Badalona Drags. [[src:fcfa-historia]]",
        en: "The official history of the Catalan federation places the origin of the sport in Spain in 1987, when Italian coach Alfonso Genchi persuaded Pere Moliner to form a team in Badalona. That first team was called Badalona Drags. [[src:fcfa-historia]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El 19 de marzo de 1988 los Drags jugaron contra los Palermo Cardinals el primer partido de fútbol americano disputado en España. [[src:fcfa-historia]] En noviembre de ese año ganaron la final de la primera Lliga Catalana ante los Búfals del Poblenou: la primera competición oficial del país tenía ya un campeón. [[src:bufals-historia]] [[src:fcfa-historia]]",
        en: "On 19 March 1988 the Drags played Italy's Palermo Cardinals in the first American football game held in Spain. [[src:fcfa-historia]] In November that year they won the final of the first Lliga Catalana against the Búfals del Poblenou: the country's first official competition had its champion. [[src:bufals-historia]] [[src:fcfa-historia]]",
      },
    },
    {
      type: "placeholder",
      topic: { es: "Los primeros años (1988-1997)", en: "The early years (1988-1997)" },
      pending: [
        { es: "Testimonios de los fundadores y primeros jugadores", en: "Testimonies from founders and early players" },
        { es: "Cambio de grafía de Drags a Dracs", en: "The change of spelling from Drags to Dracs" },
        { es: "Escudos y uniformes históricos", en: "Historical crests and uniforms" },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Once ligas", en: "Eleven leagues" },
    },
    {
      type: "paragraph",
      text: {
        es: "El palmarés de la FEFA atribuye a los Dracs once títulos de LNFA: 1998, 1999, 2002, 2003, 2004, 2014, 2016, 2017, 2018, 2019 y 2021, además de ocho Copas de España, la última en noviembre de 2025 con un 40-0 a L'Hospitalet Pioners. [[src:fefa-palmares]] [[src:fefa-team-dracs]] Ningún otro club se acerca a esa cifra.",
        en: "FEFA's records credit the Dracs with eleven LNFA titles: 1998, 1999, 2002, 2003, 2004, 2014, 2016, 2017, 2018, 2019 and 2021, plus eight Copas de España, the latest in November 2025 with a 40-0 win over L'Hospitalet Pioners. [[src:fefa-palmares]] [[src:fefa-team-dracs]] No other club comes close.",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La temporada 2025-26 terminó con dos finales perdidas: la Spanish Bowl ante Las Rozas Black Demons (13-27) en el Estadi Municipal de Badalona y la de la LNFA Junior ante Royal Oaks Knights. [[src:fefa-spanish-bowl-2026]] [[src:fefa-junior-2026]] El club mantiene secciones de tackle y flag, y equipos senior masculino, femenino, junior y cadete. [[src:fefa-team-dracs]]",
        en: "The 2025-26 season ended with two lost finals: the Spanish Bowl against Las Rozas Black Demons (13-27) at the Estadi Municipal de Badalona and the LNFA Junior final against Royal Oaks Knights. [[src:fefa-spanish-bowl-2026]] [[src:fefa-junior-2026]] The club runs tackle and flag sections, with senior men's, women's, junior and cadet teams. [[src:fefa-team-dracs]]",
      },
    },
  ],
};
