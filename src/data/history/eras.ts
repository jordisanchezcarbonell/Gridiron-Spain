import type { Era } from "@/types";

/**
 * Era narratives for /historia. Every sentence with a date or a title
 * carries an inline citation; wording follows the verification status of
 * the underlying sources (see docs/research-pending.md).
 */
export const eras: Era[] = [
  {
    id: "origenes",
    from: 1987,
    to: 1990,
    kicker: { es: "1987-1990", en: "1987-1990" },
    title: { es: "Los orígenes: Badalona y los cuatro clubes", en: "The origins: Badalona and the four clubs" },
    paragraphs: [
      {
        es: "El fútbol americano llegó a España por Badalona en 1987, cuando el entrenador italiano Alfonso Genchi convenció a Pere Moliner para crear el primer equipo del país. [[src:fcfa-historia]] El 19 de marzo de 1988 se jugó el primer partido, contra los Palermo Cardinals, y en octubre de ese año cuatro clubes (Dracs, Búfals, Boxers y Pioners) constituyeron la Federació Catalana y disputaron la primera Lliga Catalana. [[src:fcfa-historia]] [[src:enciclopedia-fcfa]]",
        en: "American football arrived in Spain through Badalona in 1987, when Italian coach Alfonso Genchi persuaded Pere Moliner to create the country's first team. [[src:fcfa-historia]] The first game was played on 19 March 1988 against the Palermo Cardinals, and in October that year four clubs (Dracs, Búfals, Boxers and Pioners) constituted the Catalan federation and played the first Lliga Catalana. [[src:fcfa-historia]] [[src:enciclopedia-fcfa]]",
      },
      {
        es: "En 1989 el deporte salió de Cataluña: nacieron los Madrid Panteras, los Madrid Bears (hoy Osos Rivas) y los Tarraco Imperials, y cuatro equipos madrileños jugaron la segunda Lliga Catalana, que funcionó de hecho como campeonato nacional. [[src:panteras-1989-90]] [[src:wiki-osos-madrid-es]] [[src:enciclopedia-imperials]] [[src:wiki-liga-catalana]] La Supercopa de 1990 entre Boxers y Osos en Montjuïc, con una asistencia que las fuentes cifran entre 20.000 y 25.000 personas, fue el primer gran partido del football español. [[src:wiki-osos-madrid-es]] [[src:blog-origenes-1987]]",
        en: "In 1989 the sport left Catalonia: the Madrid Panteras, the Madrid Bears (today Osos Rivas) and the Tarraco Imperials were born, and four Madrid teams played the second Lliga Catalana, which effectively worked as a national championship. [[src:panteras-1989-90]] [[src:wiki-osos-madrid-es]] [[src:enciclopedia-imperials]] [[src:wiki-liga-catalana]] The 1990 Supercopa between Boxers and Osos at Montjuïc, with an attendance sources put at 20,000 to 25,000, was Spanish football's first big game. [[src:wiki-osos-madrid-es]] [[src:blog-origenes-1987]]",
      },
    ],
    sourceIds: ["fcfa-historia", "enciclopedia-fcfa", "panteras-1989-90", "wiki-osos-madrid-es", "enciclopedia-imperials", "wiki-liga-catalana", "blog-origenes-1987"],
  },
  {
    id: "division",
    from: 1991,
    to: 1994,
    kicker: { es: "1991-1994", en: "1991-1994" },
    title: { es: "Dos ligas y una franquicia de la NFL", en: "Two leagues and an NFL franchise" },
    paragraphs: [
      {
        es: "El 24 de marzo de 1991 los Barcelona Dragons, franquicia fundadora de la World League impulsada por la NFL, jugaron su primer partido en Montjuïc: el football profesional llegaba a España antes de que el amateur tuviera una liga nacional. [[src:elf-dragons-are-back-2021]]",
        en: "On 24 March 1991 the Barcelona Dragons, a founding franchise of the NFL-backed World League, played their first game at Montjuïc: professional football reached Spain before the amateur game had a national league. [[src:elf-dragons-are-back-2021]]",
      },
      {
        es: "Ese mismo año el deporte se dividió. Un grupo de clubes creó la Spain Football League, organizada por Unipublic y emitida por Antena 3, que en 1993-94 pasó a llamarse AFL; la Lliga Catalana siguió en paralelo con los Barcelona Boxers como dominadores. [[src:wiki-lnfa-es]] [[src:panteras-sfl-1991-92]] [[src:cuadernos-futbol-americano]] [[src:wiki-boxers]] La reunificación llegó el 29 de octubre de 1994, según fuentes secundarias, con la constitución de la Agrupación Española de Fútbol Americano. [[src:blog-origenes-1987]] [[src:wiki-fefa]]",
        en: "That same year the sport split. A group of clubs created the Spain Football League, organised by Unipublic and broadcast by Antena 3, renamed AFL in 1993-94; the Lliga Catalana carried on in parallel with the Barcelona Boxers as its dominant side. [[src:wiki-lnfa-es]] [[src:panteras-sfl-1991-92]] [[src:cuadernos-futbol-americano]] [[src:wiki-boxers]] Reunification came on 29 October 1994, according to secondary sources, with the constitution of the Agrupación Española de Fútbol Americano. [[src:blog-origenes-1987]] [[src:wiki-fefa]]",
      },
    ],
    sourceIds: ["elf-dragons-are-back-2021", "wiki-lnfa-es", "panteras-sfl-1991-92", "cuadernos-futbol-americano", "wiki-boxers", "blog-origenes-1987", "wiki-fefa"],
  },
  {
    id: "liga-nacional",
    from: 1995,
    to: 2010,
    kicker: { es: "1995-2010", en: "1995-2010" },
    title: { es: "La liga nacional y los grandes clubes", en: "The national league and the big clubs" },
    paragraphs: [
      {
        es: "La primera LNFA se jugó en 1995 con 18 equipos en dos conferencias, y su final, en el Estadio Olímpico de Madrid, la ganaron Panteras Madrid 55-28 a Barcelona Boxers. [[src:fefa-palmares]] [[src:wiki-lnfa-1995-es]] Los Panteras repitieron en 1996 y desaparecieron en 1998; los Boxers, en 1996. [[src:fefa-palmares]] [[src:wiki-panteras]] [[src:wiki-boxers]]",
        en: "The first LNFA was played in 1995 with 18 teams in two conferences, and its final, at the Estadio Olímpico de Madrid, was won by Panteras Madrid 55-28 over Barcelona Boxers. [[src:fefa-palmares]] [[src:wiki-lnfa-1995-es]] The Panteras repeated in 1996 and folded in 1998; the Boxers in 1996. [[src:fefa-palmares]] [[src:wiki-panteras]] [[src:wiki-boxers]]",
      },
      {
        es: "Entre 1997 y 2003 la liga cambió de manos cada pocos años: Vilafranca Eagles (1997), Badalona Dracs (1998, 1999, 2002-2004), Granollers Fénix (2000) y Osos Rivas (2001). Los Dragons profesionales ganaron el World Bowl de 1997 en Montjuïc y fueron suspendidos por NFL Europe tras 2003. [[src:fefa-palmares]] [[src:nfle-dragons-suspended-2003]] A partir de 2005 se abrió la era de L'Hospitalet Pioners y Valencia Firebats, que se repartieron todos los títulos hasta 2013 salvo uno. [[src:fefa-palmares]]",
        en: "Between 1997 and 2003 the league changed hands every few years: Vilafranca Eagles (1997), Badalona Dracs (1998, 1999, 2002-2004), Granollers Fénix (2000) and Osos Rivas (2001). The professional Dragons won the 1997 World Bowl at Montjuïc and were suspended by NFL Europe after 2003. [[src:fefa-palmares]] [[src:nfle-dragons-suspended-2003]] From 2005 the era of L'Hospitalet Pioners and Valencia Firebats began; between them they took every title until 2013 but one. [[src:fefa-palmares]]",
      },
    ],
    sourceIds: ["fefa-palmares", "wiki-lnfa-1995-es", "wiki-panteras", "wiki-boxers", "nfle-dragons-suspended-2003"],
  },
  {
    id: "consolidacion",
    from: 2011,
    to: 2020,
    kicker: { es: "2011-2020", en: "2011-2020" },
    title: { es: "Federación, femenino y flag", en: "Federation, women's football and flag" },
    paragraphs: [
      {
        es: "En 2011 arrancó el palmarés oficial de la LNFA Femenina, dominado desde entonces por Barberà Rookies, y en mayo de 2012 el Consejo Superior de Deportes aprobó los estatutos de la Federación Española de Fútbol Americano, sucesora de la AEFA. [[src:fefa-palmares]] [[src:boe-fefa-2012]] El flag football, con campeonato nacional desde 2001, creció como puerta de entrada al deporte. [[src:fefa-palmares-flag]]",
        en: "In 2011 the official LNFA Femenina records began, dominated ever since by Barberà Rookies, and in May 2012 the Consejo Superior de Deportes approved the statutes of the Spanish American Football Federation, successor to AEFA. [[src:fefa-palmares]] [[src:boe-fefa-2012]] Flag football, with a national championship since 2001, grew as the sport's gateway. [[src:fefa-palmares-flag]]",
      },
      {
        es: "En el campo, Badalona Dracs encadenaron cuatro ligas seguidas entre 2016 y 2019, con la única interrupción de Valencia Firebats en 2015. La temporada 2020 quedó suspendida por la pandemia. [[src:fefa-palmares]]",
        en: "On the field, Badalona Dracs strung together four straight leagues between 2016 and 2019, interrupted only by Valencia Firebats in 2015. The 2020 season was suspended because of the pandemic. [[src:fefa-palmares]]",
      },
    ],
    sourceIds: ["fefa-palmares", "boe-fefa-2012", "fefa-palmares-flag"],
  },
  {
    id: "europa",
    from: 2021,
    to: 2026,
    kicker: { es: "2021-2026", en: "2021-2026" },
    title: { es: "Europa, la NFL en Madrid y el reinado de Las Rozas", en: "Europe, the NFL in Madrid and the reign of Las Rozas" },
    paragraphs: [
      {
        es: "En 2021 nació la European League of Football con un nuevo Barcelona Dragons, sin continuidad legal con la franquicia histórica; en 2024 debutaron los Madrid Bravos. [[src:elf-dragons-are-back-2021]] [[src:elf-bravos-history-2024]] El ciclo duró poco: los Dragons dejaron la liga en diciembre de 2024, los Bravos se retiraron el 10 de marzo de 2026 y la ELF entró en insolvencia trece días después. [[src:football-austria-elf-2025-teams]] [[src:madridactual-bravos-2026]] [[src:football-austria-elf-insolvency-2026]]",
        en: "In 2021 the European League of Football was born with a new Barcelona Dragons, with no legal continuity with the historic franchise; in 2024 the Madrid Bravos debuted. [[src:elf-dragons-are-back-2021]] [[src:elf-bravos-history-2024]] The cycle was short: the Dragons left the league in December 2024, the Bravos withdrew on 10 March 2026 and the ELF entered insolvency thirteen days later. [[src:football-austria-elf-2025-teams]] [[src:madridactual-bravos-2026]] [[src:football-austria-elf-insolvency-2026]]",
      },
      {
        es: "Mientras tanto, la NFL jugó su primer partido oficial en España el 16 de noviembre de 2025 en el Bernabéu ante 78.610 espectadores y volverá en 2026. [[src:nfl-madrid-multiyear-2026]] En la liga, Osos Rivas ganaron invictos en 2022 y Las Rozas Black Demons han encadenado cuatro Spanish Bowl consecutivas, la última el 2 de mayo de 2026 en Badalona. [[src:fefa-osos-campeones-2022]] [[src:fefa-spanish-bowl-2026]]",
        en: "Meanwhile, the NFL played its first official game in Spain on 16 November 2025 at the Bernabéu before 78,610 fans and returns in 2026. [[src:nfl-madrid-multiyear-2026]] In the league, Osos Rivas won undefeated in 2022 and Las Rozas Black Demons have strung together four straight Spanish Bowls, the latest on 2 May 2026 in Badalona. [[src:fefa-osos-campeones-2022]] [[src:fefa-spanish-bowl-2026]]",
      },
    ],
    sourceIds: ["elf-dragons-are-back-2021", "elf-bravos-history-2024", "football-austria-elf-2025-teams", "madridactual-bravos-2026", "football-austria-elf-insolvency-2026", "nfl-madrid-multiyear-2026", "fefa-osos-campeones-2022", "fefa-spanish-bowl-2026"],
  },
];
