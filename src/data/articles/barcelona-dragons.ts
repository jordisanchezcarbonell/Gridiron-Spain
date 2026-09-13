import type { Article } from "@/types";

export const barcelonaDragons: Article = {
  id: "barcelona-dragons",
  slug: "barcelona-dragons",
  title: { es: "Barcelona Dragons: auge, caída y legado del football profesional en Barcelona", en: "Barcelona Dragons: rise, fall and legacy of professional football in Barcelona" },
  subtitle: {
    es: "Dos proyectos, un nombre. La franquicia de la World League y NFL Europe (1991-2003), y el equipo de la European League of Football que recuperó la marca dos décadas después (2021-2024).",
    en: "Two projects, one name. The World League and NFL Europe franchise (1991-2003), and the European League of Football team that revived the brand two decades later (2021-2024).",
  },
  excerpt: {
    es: "Barcelona ha tenido football profesional en dos épocas distintas bajo el mismo nombre. Este artículo separa ambas etapas, explica qué las une (solo el nombre) y documenta cómo terminó cada una.",
    en: "Barcelona has had professional football in two different eras under the same name. This article separates both stages, explains what links them (only the name) and documents how each one ended.",
  },
  authorId: "jordi-sanchez",
  category: "historia",
  tags: ["Barcelona Dragons", "NFL Europe", "World League", "ELF", "Barcelona"],
  relatedTeamIds: ["barcelona-dragons-nfle", "barcelona-dragons-elf"],
  relatedCompetitionIds: ["nfl-europe", "elf"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-12",
  status: "researching",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-09-12",
  readingTimeMinutes: 6,
  sourceIds: [
    "elf-dragons-are-back-2021",
    "nfle-dragons-suspended-2003",
    "wiki-dragons-nfle",
    "wiki-world-bowl-97",
    "wiki-jack-bicknell",
    "catalannews-dragons-2024",
    "wiki-dragons-elf",
    "football-austria-elf-2025-teams",
    "elf-new-franchise-2024",
    "football-austria-elf-insolvency-2026",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Antes de empezar", en: "Before we start" },
      text: {
        es: "No existe continuidad legal entre los Barcelona Dragons de NFL Europe y los de la European League of Football. El segundo equipo pudo usar el nombre gracias a un acuerdo entre la ELF y la NFL sobre las marcas de los antiguos equipos de NFL Europe, firmado el 9 de marzo de 2021. [[src:elf-dragons-are-back-2021]]",
        en: "There is no legal continuity between the NFL Europe Barcelona Dragons and the European League of Football ones. The second team could use the name thanks to an agreement between the ELF and the NFL over the brands of former NFL Europe teams, signed on 9 March 2021. [[src:elf-dragons-are-back-2021]]",
      },
    },
    { type: "heading", level: 2, text: { es: "Etapa 1: World League y NFL Europe (1991-2003)", en: "Stage 1: World League and NFL Europe (1991-2003)" } },
    {
      type: "paragraph",
      text: {
        es: "Los Dragons fueron una franquicia fundadora de la World League of American Football, la liga primaveral impulsada por la NFL. Jugaron su primer partido el 24 de marzo de 1991 en el Estadi Olímpic Lluís Companys de Montjuïc y compitieron durante doce temporadas. [[src:elf-dragons-are-back-2021]] Según fuentes secundarias, su único entrenador jefe en todo ese periodo fue Jack Bicknell, procedente de Boston College. [[src:wiki-jack-bicknell]]",
        en: "The Dragons were a founding franchise of the World League of American Football, the NFL-backed spring league. They played their first game on 24 March 1991 at the Estadi Olímpic Lluís Companys on Montjuïc and competed for twelve seasons. [[src:elf-dragons-are-back-2021]] According to secondary sources, their only head coach over that whole period was Jack Bicknell, formerly of Boston College. [[src:wiki-jack-bicknell]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El punto álgido llegó en 1997: los Dragons ganaron el World Bowl ante Rhein Fire en Barcelona, y disputaron además las finales de 1991, 1999 y 2001. [[src:nfle-dragons-suspended-2003]] Wikipedia sitúa aquella final el 22 de junio de 1997 con un 38-24 y 31.100 espectadores en Montjuïc, con el quarterback Jon Kitna como MVP; esos detalles están pendientes de confirmar con prensa de la época. [[src:wiki-world-bowl-97]]",
        en: "The high point came in 1997: the Dragons won the World Bowl against Rhein Fire in Barcelona, and also reached the 1991, 1999 and 2001 finals. [[src:nfle-dragons-suspended-2003]] Wikipedia places that final on 22 June 1997, a 38-24 win before 31,100 at Montjuïc, with quarterback Jon Kitna as MVP; those details are pending confirmation with contemporary press. [[src:wiki-world-bowl-97]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El final fue una decisión de la liga. NFL Europe League suspendió las operaciones de la franquicia tras la temporada 2003 alegando cinco años consecutivos de caída de asistencia (una media de 6.868 espectadores en 2003, la más baja de la liga y cerca de la mitad que en 1997) y el fracaso de la alianza con el FC Barcelona para revertir la tendencia. [[src:nfle-dragons-suspended-2003]]",
        en: "The end was a league decision. NFL Europe League suspended the franchise after the 2003 season, citing five consecutive years of declining attendance (an average of 6,868 in 2003, the lowest in the league and about half the 1997 figure) and the failure of the FC Barcelona partnership to reverse the trend. [[src:nfle-dragons-suspended-2003]]",
      },
    },
    {
      type: "quote",
      text: { es: "This was absolutely the last resort, but we felt it could no longer be avoided.", en: "This was absolutely the last resort, but we felt it could no longer be avoided." },
      attribution: { es: "Jim Connelly, director general de NFL Europe, en la nota de prensa de 2003", en: "Jim Connelly, NFL Europe Managing Director, in the 2003 press release" },
    },
    {
      type: "placeholder",
      topic: { es: "Estadios, jugadores y afición (1991-2003)", en: "Stadiums, players and fans (1991-2003)" },
      pending: [
        { es: "Fecha exacta del traslado de Montjuïc al Mini Estadi", en: "Exact date of the move from Montjuïc to the Mini Estadi" },
        { es: "Marcadores de las finales de 1991, 1999 y 2001 con fuente primaria", en: "Scores of the 1991, 1999 and 2001 finals with a primary source" },
        { es: "Entrevistas con exjugadores, empleados y aficionados de la época", en: "Interviews with former players, staff and fans from the period" },
      ],
    },
    { type: "heading", level: 2, text: { es: "Etapa 2: European League of Football (2021-2024)", en: "Stage 2: European League of Football (2021-2024)" } },
    {
      type: "paragraph",
      text: {
        es: "La European League of Football nació en 2020 y jugó su primera temporada en 2021 con ocho equipos. [[src:elf-new-franchise-2024]] La franquicia española se creó bajo el nombre Gladiators Football y el 24 de marzo de 2021 anunció que se llamaría Barcelona Dragons, con el Estadi Municipal de Reus como primera sede. [[src:elf-dragons-are-back-2021]]",
        en: "The European League of Football was born in 2020 and played its first season in 2021 with eight teams. [[src:elf-new-franchise-2024]] The Spanish franchise was created under the name Gladiators Football and on 24 March 2021 announced it would be called Barcelona Dragons, with the Estadi Municipal de Reus as its first home. [[src:elf-dragons-are-back-2021]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El equipo jugó cuatro temporadas (2021-2024). Según Wikipedia, su mejor año fue 2022, con un balance de 8-4 y una semifinal; los dos siguientes terminaron 2-10. [[src:wiki-dragons-elf]] En 2024, ya en Badalona y bajo la propiedad del grupo Elite Sports Equity, su director general reconocía públicamente que el año anterior no habían vendido muchas entradas ni merchandising. [[src:catalannews-dragons-2024]]",
        en: "The team played four seasons (2021-2024). According to Wikipedia, its best year was 2022, with an 8-4 record and a semifinal; the next two ended 2-10. [[src:wiki-dragons-elf]] In 2024, by then in Badalona and owned by the Elite Sports Equity group, its managing director publicly admitted the previous year they had not sold many tickets or much merchandise. [[src:catalannews-dragons-2024]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El 4 de diciembre de 2024 la ELF confirmó que los Dragons dejaban la liga, que en 2025 tendría 16 equipos de nueve países. La liga no detalló públicamente los motivos. [[src:football-austria-elf-2025-teams]] Poco más de un año después, la propia ELF entró en insolvencia y no disputó la temporada 2026. [[src:football-austria-elf-insolvency-2026]]",
        en: "On 4 December 2024 the ELF confirmed that the Dragons were leaving the league, which in 2025 would have 16 teams from nine countries. The league did not publicly detail the reasons. [[src:football-austria-elf-2025-teams]] Little more than a year later the ELF itself went into insolvency and did not play the 2026 season. [[src:football-austria-elf-insolvency-2026]]",
      },
    },
    { type: "heading", level: 2, text: { es: "Legado", en: "Legacy" } },
    {
      type: "paragraph",
      text: {
        es: "Dos veces, con treinta años de diferencia, Barcelona ha albergado football profesional; dos veces el proyecto ha terminado por razones económicas y de público. Lo que ha sobrevivido es el football amateur que ya existía antes de 1991: Badalona Dracs, L'Hospitalet Pioners y el resto de clubes catalanes siguen compitiendo cada temporada.",
        en: "Twice, thirty years apart, Barcelona has hosted professional football; twice the project has ended for financial and attendance reasons. What has survived is the amateur football that already existed before 1991: Badalona Dracs, L'Hospitalet Pioners and the rest of the Catalan clubs keep competing every season.",
      },
    },
    {
      type: "placeholder",
      topic: { es: "Qué dejaron los Dragons en la ciudad", en: "What the Dragons left in the city" },
      pending: [
        { es: "Entrevistas con aficionados, exjugadores y periodistas de ambas etapas", en: "Interviews with fans, former players and journalists from both eras" },
        { es: "Impacto en las licencias y en los clubes locales, con datos de la federación", en: "Impact on licences and local clubs, with federation data" },
      ],
    },
  ],
};
