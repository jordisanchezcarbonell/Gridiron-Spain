import type { Article } from "@/types";

export const historiaEspana: Article = {
  id: "historia-futbol-americano-espana",
  slug: "historia-futbol-americano-espana",
  title: {
    es: "De Badalona a Madrid: la historia del fútbol americano en España",
    en: "From Badalona to Madrid: the story of American football in Spain",
  },
  subtitle: {
    es: "Cuatro décadas de un deporte que llegó por Cataluña, se organizó a golpe de voluntarios y hoy tiene liga nacional, football femenino, flag y una franquicia profesional europea.",
    en: "Four decades of a sport that arrived through Catalonia, was organised by volunteers and today has a national league, women's football, flag and a European professional franchise.",
  },
  excerpt: {
    es: "Artículo pilar sobre cómo llegó el fútbol americano a España, quién lo trajo, cómo nacieron las competiciones y dónde está el deporte hoy. Cada hito enlaza a su fuente.",
    en: "Pillar article on how American football arrived in Spain, who brought it, how competitions were born and where the sport stands today. Every milestone links to its source.",
  },
  authorId: "jordi-sanchez",
  category: "historia",
  tags: ["historia", "LNFA", "FEFA", "Cataluña", "Madrid", "flag"],
  relatedTeamIds: ["badalona-dracs", "lhospitalet-pioners", "barcelona-bufals", "las-rozas-black-demons", "madrid-bravos", "barcelona-dragons-nfle"],
  relatedCompetitionIds: ["lnfa", "lliga-catalana", "lnfa-femenina", "spanish-flag-bowl", "elf", "nfl-europe", "nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-13",
  status: "researching",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-09-12",
  featured: true,
  readingTimeMinutes: 9,
  sourceIds: [
    "fcfa-historia",
    "enciclopedia-fcfa",
    "bufals-historia",
    "pioners-historia",
    "voltors-club",
    "enciclopedia-imperials",
    "spanishbowl-hurricanes-2020",
    "wiki-fefa",
    "blog-origenes-1987",
    "boe-fefa-2012",
    "fefa-palmares",
    "wiki-lnfa-1995",
    "firstdown-lnfa-2026",
    "fefa-competiciones",
    "fefa-calendario-2026-27",
    "fefa-lnfa2-2025-26",
    "fefa-femenina-final-2026",
    "fefa-flag-bowl-2026",
    "fefa-spanish-bowl-2026",
    "fefa-palmares-flag",
    "elf-dragons-are-back-2021",
    "nfle-dragons-suspended-2003",
    "football-austria-elf-2025-teams",
    "elf-new-franchise-2024",
    "elf-bravos-history-2024",
    "madridactual-bravos-2026",
    "football-austria-elf-insolvency-2026",
    "nfl-madrid-multiyear-2026",
    "panteras-historia",
    "panteras-1989-90",
    "panteras-sfl-1991-92",
    "wiki-osos-madrid-es",
    "wiki-toros",
    "wiki-liga-catalana",
    "wiki-lnfa-es",
    "wiki-lnfa-1995-es",
    "wiki-boxers",
    "enciclopedia-boxers",
    "cuadernos-futbol-americano",
    "telescopio-madrid-pioneros",
    "firebats-historia-mural",
  ],
  content: [
    {
      type: "heading",
      level: 2,
      text: { es: "Cómo llegó el football", en: "How football arrived" },
    },
    {
      type: "paragraph",
      text: {
        es: "El fútbol americano llegó a España por Cataluña y, más concretamente, por Badalona. En 1987 el entrenador italiano Alfonso Genchi convenció a Pere Moliner para crear el primer equipo del país, los Badalona Drags, con esa grafía original. [[src:fcfa-historia]] Ese mismo año se fundaron los Búfals del Poblenou, en Barcelona, [[src:bufals-historia]] y, según su propia web, los Mallorca Voltors, que se presentan como el primer club creado fuera de Cataluña. [[src:voltors-club]]",
        en: "American football arrived in Spain through Catalonia and, more precisely, through Badalona. In 1987 Italian coach Alfonso Genchi persuaded Pere Moliner to create the country's first team, the Badalona Drags, in that original spelling. [[src:fcfa-historia]] That same year the Búfals del Poblenou were founded in Barcelona, [[src:bufals-historia]] and, according to their own website, the Mallorca Voltors, who present themselves as the first club created outside Catalonia. [[src:voltors-club]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El primer partido de fútbol americano disputado en España se jugó el 19 de marzo de 1988: Badalona Drags contra los Palermo Cardinals italianos. [[src:fcfa-historia]] Meses después, el 23 de octubre de 1988, cuatro clubes (Dracs, Búfals, Boxers de Barcelona y Pioners de l'Hospitalet) constituyeron la Federació Catalana de Futbol Americà y disputaron la primera competición oficial del país, la I Lliga Catalana, que ganaron los Dracs. [[src:fcfa-historia]] [[src:enciclopedia-fcfa]] [[src:pioners-historia]]",
        en: "The first American football game played in Spain took place on 19 March 1988: Badalona Drags against Italy's Palermo Cardinals. [[src:fcfa-historia]] Months later, on 23 October 1988, four clubs (Dracs, Búfals, Boxers de Barcelona and Pioners de l'Hospitalet) constituted the Catalan federation and played the country's first official competition, the first Lliga Catalana, won by the Dracs. [[src:fcfa-historia]] [[src:enciclopedia-fcfa]] [[src:pioners-historia]]",
      },
    },
    {
      type: "callout",
      title: { es: "Por qué Cataluña", en: "Why Catalonia" },
      text: {
        es: "En sus dos primeras temporadas la Lliga Catalana incorporó a clubes del resto de España y funcionó de hecho como campeonato nacional hasta 1995. [[src:enciclopedia-fcfa]]",
        en: "In its first two seasons the Lliga Catalana admitted clubs from the rest of Spain and effectively worked as a national championship until 1995. [[src:enciclopedia-fcfa]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Los primeros equipos fuera de Barcelona", en: "The first teams outside Barcelona" },
    },
    {
      type: "paragraph",
      text: {
        es: "A finales de los ochenta y principios de los noventa el deporte se extendió: en 1989 nacieron los Tarraco Imperials en Tarragona, que se trasladarían a Reus en 1993-94, [[src:enciclopedia-imperials]] y, según entrevistas posteriores, los Zaragoza Lions, vinculados al personal de la base aérea estadounidense de Zaragoza. [[src:spanishbowl-hurricanes-2020]] Madrid, Valencia y otras ciudades siguieron en los años siguientes.",
        en: "In the late 1980s and early 1990s the sport spread: in 1989 the Tarraco Imperials were born in Tarragona, later relocating to Reus in 1993-94, [[src:enciclopedia-imperials]] and, per later interviews, the Zaragoza Lions, linked to personnel at the US air base in Zaragoza. [[src:spanishbowl-hurricanes-2020]] Madrid, Valencia and other cities followed over the next few years.",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Madrid llegó en 1989. Según la web de archivo del club, los Madrid Panteras se fundaron el 28 de septiembre de 1989 por dos estudiantes de ICADE, Vicente Martín-Pozuelo y Alfonso González Lavín, y jugaron su primer partido en el polideportivo de Palomeras. [[src:panteras-1989-90]] Ese mismo año nacieron, según fuentes secundarias, los Madrid Bears (después Osos de Madrid, hoy Osos Rivas), con ayuda de personal de la base aérea de Torrejón, y los Madrid Toros. [[src:wiki-osos-madrid-es]] [[src:telescopio-madrid-pioneros]] [[src:wiki-toros]] Cuatro equipos madrileños jugaron la segunda Lliga Catalana en 1989-90, que funcionaba de hecho como liga nacional. [[src:wiki-liga-catalana]]",
        en: "Madrid arrived in 1989. According to the club's archive website, the Madrid Panteras were founded on 28 September 1989 by two ICADE students, Vicente Martín-Pozuelo and Alfonso González Lavín, and played their first game at the Palomeras sports ground. [[src:panteras-1989-90]] That same year, per secondary sources, the Madrid Bears (later Osos de Madrid, today Osos Rivas) were born with help from personnel at the Torrejón air base, as were the Madrid Toros. [[src:wiki-osos-madrid-es]] [[src:telescopio-madrid-pioneros]] [[src:wiki-toros]] Four Madrid teams played the second Lliga Catalana in 1989-90, which effectively worked as a national league. [[src:wiki-liga-catalana]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "En Valencia el primer club documentado son los Cullera Giants, que ya competían en 1991; en abril de 1993 un grupo de sus jugadores fundó los Valencia Bats, hoy Valencia Firebats. [[src:wiki-lnfa-es]] [[src:firebats-historia-mural]] El año de fundación de los Giants sigue sin confirmarse.",
        en: "In Valencia the first documented club is the Cullera Giants, already competing in 1991; in April 1993 a group of their players founded the Valencia Bats, today Valencia Firebats. [[src:wiki-lnfa-es]] [[src:firebats-historia-mural]] The Giants' founding year remains unconfirmed.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Dos ligas antes de la liga", en: "Two leagues before the league" },
    },
    {
      type: "paragraph",
      text: {
        es: "Entre 1991 y 1994 el football español estuvo dividido. Un grupo de clubes se separó de la federación catalana y creó la Spain Football League (SFL), organizada por la empresa Unipublic y emitida por Antena 3 en su primera temporada; en 1993-94 pasó a llamarse American Football League (AFL). [[src:wiki-lnfa-es]] [[src:panteras-sfl-1991-92]] [[src:cuadernos-futbol-americano]] Sus campeones fueron Barcelona Howlers (1992 y 1994) y Vilafranca Eagles (1993), siempre con Madrid Panteras como finalistas. [[src:panteras-historia]] [[src:wiki-lnfa-es]] Mientras tanto, la Lliga Catalana siguió con los Barcelona Boxers como dominadores: cuatro títulos entre 1990 y 1994 y una final de Supercopa contra Osos de Madrid en Montjuïc, en 1990, ante una multitud que las fuentes cifran entre 20.000 y 25.000 personas. [[src:wiki-boxers]] [[src:enciclopedia-boxers]] [[src:blog-origenes-1987]]",
        en: "Between 1991 and 1994 Spanish football was split. A group of clubs broke away from the Catalan federation and created the Spain Football League (SFL), organised by the events company Unipublic and broadcast by Antena 3 in its first season; in 1993-94 it was renamed the American Football League (AFL). [[src:wiki-lnfa-es]] [[src:panteras-sfl-1991-92]] [[src:cuadernos-futbol-americano]] Its champions were Barcelona Howlers (1992 and 1994) and Vilafranca Eagles (1993), always with Madrid Panteras as runners-up. [[src:panteras-historia]] [[src:wiki-lnfa-es]] Meanwhile the Lliga Catalana carried on with the Barcelona Boxers as its dominant side: four titles between 1990 and 1994 and a 1990 Supercopa final against Osos de Madrid at Montjuïc before a crowd sources put at between 20,000 and 25,000. [[src:wiki-boxers]] [[src:enciclopedia-boxers]] [[src:blog-origenes-1987]]",
      },
    },
    {
      type: "placeholder",
      topic: { es: "Verificación en hemerotecas (1989-1996)", en: "Newspaper archive verification (1989-1996)" },
      pending: [
        { es: "Todo lo anterior procede de fuentes secundarias; falta contrastar con ABC, Mundo Deportivo y El País de la época (páginas identificadas en docs/research-pending.md)", en: "Everything above comes from secondary sources; contemporary ABC, Mundo Deportivo and El País pages still need checking (listed in docs/research-pending.md)" },
        { es: "Fecha y asistencia exactas de la Supercopa de 1990 en Montjuïc", en: "Exact date and attendance of the 1990 Supercopa at Montjuïc" },
        { es: "Año de fundación de Cullera Giants", en: "Cullera Giants' founding year" },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Nace la liga nacional", en: "The national league is born" },
    },
    {
      type: "paragraph",
      text: {
        es: "La reunificación llegó en 1994. Según fuentes secundarias, la Agrupación Española de Fútbol Americano (AEFA) se constituyó el 29 de octubre de 1994 en una sala del Estadi Olímpic de Montjuïc cedida por los Barcelona Dragons, tras meses de reuniones entre la federación catalana y la AFL. [[src:blog-origenes-1987]] [[src:wiki-fefa]] [[src:cuadernos-futbol-americano]] La actual Federación Española de Fútbol Americano (FEFA) es su sucesora: el Consejo Superior de Deportes autorizó su constitución el 17 de mayo de 2012 y sus estatutos se publicaron en el BOE ese mismo mes. [[src:boe-fefa-2012]]",
        en: "Reunification came in 1994. According to secondary sources, the Agrupación Española de Fútbol Americano (AEFA) was constituted on 29 October 1994 in a room at the Estadi Olímpic de Montjuïc provided by the Barcelona Dragons, after months of talks between the Catalan federation and the AFL. [[src:blog-origenes-1987]] [[src:wiki-fefa]] [[src:cuadernos-futbol-americano]] Today's Spanish American Football Federation (FEFA) is its successor: the Consejo Superior de Deportes authorised its constitution on 17 May 2012 and its statutes were published in the BOE that same month. [[src:boe-fefa-2012]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La Liga Nacional de Fútbol Americano (LNFA) se disputó por primera vez en 1995, con 18 equipos en dos conferencias que reunían a los clubes de ambas ligas. [[src:wiki-lnfa-1995-es]] Su primera final, el 14 de mayo de 1995 en el Estadio Olímpico de Madrid, la ganaron Panteras Madrid por 55-28 a Barcelona Boxers. [[src:fefa-palmares]] [[src:wiki-lnfa-1995]] [[src:panteras-historia]] La final se conoce como Spanish Bowl y la FEFA numera sus ediciones desde aquella de 1995; la de 2026 fue la XXXII. [[src:fefa-palmares]] [[src:firstdown-lnfa-2026]]",
        en: "The Liga Nacional de Fútbol Americano (LNFA) was first played in 1995, with 18 teams in two conferences bringing together the clubs of both leagues. [[src:wiki-lnfa-1995-es]] Its first final, on 14 May 1995 at the Estadio Olímpico de Madrid, was won by Panteras Madrid 55-28 over Barcelona Boxers. [[src:fefa-palmares]] [[src:wiki-lnfa-1995]] [[src:panteras-historia]] The final is known as the Spanish Bowl and FEFA numbers its editions from that 1995 game; the 2026 final was the XXXII. [[src:fefa-palmares]] [[src:firstdown-lnfa-2026]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Los grandes clubes", en: "The big clubs" },
    },
    {
      type: "paragraph",
      text: {
        es: "Según el palmarés oficial de la FEFA, Badalona Dracs es el club más laureado con once títulos de liga, seguido de L'Hospitalet Pioners con seis, Valencia Firebats y Las Rozas Black Demons con cuatro, y Osos Rivas y Panteras Madrid con dos. Vilafranca Eagles (1997) y Granollers Fénix (2000) también levantaron el título. [[src:fefa-palmares]]",
        en: "According to FEFA's official records, Badalona Dracs is the most successful club with eleven league titles, followed by L'Hospitalet Pioners with six, Valencia Firebats and Las Rozas Black Demons with four, and Osos Rivas and Panteras Madrid with two. Vilafranca Eagles (1997) and Granollers Fénix (2000) also lifted the title. [[src:fefa-palmares]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Barcelona Dragons", en: "Barcelona Dragons" },
    },
    {
      type: "paragraph",
      text: {
        es: "En paralelo al deporte amateur, Barcelona tuvo football profesional. Los Barcelona Dragons, franquicia fundadora de la World League of American Football impulsada por la NFL, debutaron el 24 de marzo de 1991 en Montjuïc, ganaron el World Bowl de 1997 ante Rhein Fire y fueron suspendidos por la liga tras la temporada 2003 por la caída de asistencia. [[src:elf-dragons-are-back-2021]] [[src:nfle-dragons-suspended-2003]] Un segundo equipo con el mismo nombre, sin continuidad legal con el primero, compitió en la European League of Football entre 2021 y 2024. [[src:elf-dragons-are-back-2021]] [[src:football-austria-elf-2025-teams]]",
        en: "Alongside the amateur game, Barcelona had professional football. The Barcelona Dragons, a founding franchise of the NFL-backed World League of American Football, debuted on 24 March 1991 at Montjuïc, won the 1997 World Bowl against Rhein Fire and were suspended by the league after the 2003 season over falling attendance. [[src:elf-dragons-are-back-2021]] [[src:nfle-dragons-suspended-2003]] A second team with the same name, with no legal continuity with the first, competed in the European League of Football between 2021 and 2024. [[src:elf-dragons-are-back-2021]] [[src:football-austria-elf-2025-teams]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Madrid y el football europeo", en: "Madrid and European football" },
    },
    {
      type: "paragraph",
      text: {
        es: "Madrid ganó las dos primeras LNFA con Panteras Madrid y, desde 2023, domina la liga con Las Rozas Black Demons, cuatro veces campeones consecutivos; Osos Rivas (2001 y 2022) y los recién ascendidos Alcobendas Cavaliers completan la presencia madrileña en la Serie A de 2026-27. [[src:fefa-palmares]] [[src:fefa-calendario-2026-27]]",
        en: "Madrid won the first two LNFAs with Panteras Madrid and, since 2023, dominates the league through Las Rozas Black Demons, four-time consecutive champions; Osos Rivas (2001 and 2022) and newly promoted Alcobendas Cavaliers complete the Madrid presence in the 2026-27 Serie A. [[src:fefa-palmares]] [[src:fefa-calendario-2026-27]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El intento profesional más reciente fueron los Madrid Bravos, franquicia de la European League of Football anunciada en mayo de 2023, que jugó las temporadas 2024 y 2025 en Vallehermoso con sendos playoffs y anunció el 10 de marzo de 2026 que no competiría ese año; la propia ELF entró en insolvencia días después. [[src:elf-new-franchise-2024]] [[src:elf-bravos-history-2024]] [[src:madridactual-bravos-2026]] [[src:football-austria-elf-insolvency-2026]] Mientras tanto, la NFL jugó su primer partido oficial en España el 16 de noviembre de 2025 en el Bernabéu ante 78.610 espectadores y ha comprometido más partidos en Madrid a partir de 2026. [[src:nfl-madrid-multiyear-2026]]",
        en: "The most recent professional attempt was the Madrid Bravos, a European League of Football franchise announced in May 2023, which played the 2024 and 2025 seasons at Vallehermoso with two playoff runs and announced on 10 March 2026 that it would not compete that year; the ELF itself entered insolvency days later. [[src:elf-new-franchise-2024]] [[src:elf-bravos-history-2024]] [[src:madridactual-bravos-2026]] [[src:football-austria-elf-insolvency-2026]] Meanwhile, the NFL played its first official game in Spain on 16 November 2025 at the Bernabéu before 78,610 fans and has committed to more games in Madrid from 2026. [[src:nfl-madrid-multiyear-2026]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Football femenino y flag", en: "Women's football and flag" },
    },
    {
      type: "paragraph",
      text: {
        es: "El palmarés oficial de la LNFA Femenina arranca en 2011 y está dominado por Barberà Rookies, con once títulos, el último en mayo de 2026 tras vencer en la prórroga a Valencia Firebats. [[src:fefa-palmares]] [[src:fefa-femenina-final-2026]] En flag football, la Spanish Flag Bowl Open se numera desde 2001; Valencia Firebats acumula diez títulos, con el de 2026 logrado en Calatayud ante Zaragoza Hurricanes. [[src:fefa-palmares-flag]] [[src:fefa-flag-bowl-2026]]",
        en: "Official LNFA Femenina records start in 2011 and are dominated by Barberà Rookies, with eleven titles, the latest in May 2026 after an overtime win over Valencia Firebats. [[src:fefa-palmares]] [[src:fefa-femenina-final-2026]] In flag football, the Spanish Flag Bowl Open has been numbered since 2001; Valencia Firebats hold ten titles, the 2026 edition won in Calatayud against Zaragoza Hurricanes. [[src:fefa-palmares-flag]] [[src:fefa-flag-bowl-2026]]",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Dónde está el deporte hoy", en: "Where the sport stands today" },
    },
    {
      type: "paragraph",
      text: {
        es: "La FEFA organiza en 2026 la LNFA (Serie A), la LNFA 2, la LNFA Femenina, la Copa de España, las categorías junior y cadete, y las Spanish Flag Bowl absoluta y youth. [[src:fefa-competiciones]] La LNFA 2026-27 la disputan diez equipos en dos conferencias, con la Spanish Bowl prevista para el 22 de mayo de 2027. [[src:fefa-calendario-2026-27]] Un escalón por debajo, la LNFA 2 reunió en 2025-26 a 29 equipos en cinco grupos territoriales. [[src:fefa-lnfa2-2025-26]]",
        en: "In 2026 FEFA runs the LNFA (Serie A), LNFA 2, LNFA Femenina, the Copa de España, junior and cadet categories, and the senior and youth Spanish Flag Bowls. [[src:fefa-competiciones]] The 2026-27 LNFA features ten teams in two conferences, with the Spanish Bowl scheduled for 22 May 2027. [[src:fefa-calendario-2026-27]] One step below, LNFA 2 gathered 29 teams in five territorial groups in 2025-26. [[src:fefa-lnfa2-2025-26]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La última Spanish Bowl, el 2 de mayo de 2026 en Badalona, la ganaron Las Rozas Black Demons por 27-13 a Badalona Dracs: su cuarto título consecutivo. [[src:fefa-spanish-bowl-2026]]",
        en: "The latest Spanish Bowl, on 2 May 2026 in Badalona, was won by Las Rozas Black Demons 27-13 over Badalona Dracs: their fourth straight title. [[src:fefa-spanish-bowl-2026]]",
      },
    },
    {
      type: "placeholder",
      topic: { es: "El futuro", en: "The future" },
      pending: [
        { es: "Entrevistas con responsables de la FEFA y de los clubes sobre licencias, campos y crecimiento del flag", en: "Interviews with FEFA and club officials on licences, fields and the growth of flag" },
      ],
    },
  ],
};
