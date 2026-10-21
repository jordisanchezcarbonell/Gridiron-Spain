import type { Source } from "@/types/common";

const A = "2026-10-21";

/**
 * Sources for the Army-Navy / 24-team College Football Playoff story.
 *
 * Editorial note: nothing here confirms the expansion. The CFP had made no
 * official announcement when this was checked, so every format figure is
 * attributed reporting and the article says so. The date, time and venue of
 * the 2026 game come from the official sites of the game itself and of the
 * two academies, never from the press.
 */
export const armyNavyCfpSources: Source[] = [
  {
    id: "anavy26-faq-oficial",
    title: "Football FAQs — 2026 Army-Navy Game presented by USAA",
    publisher: "Army-Navy Game (armynavygame.com)",
    url: "https://armynavygame.com/football-faqs",
    accessedAt: A,
    sourceType: "official-document",
    notes: {
      es: "Web oficial del partido: «Saturday, December 12th», «3 PM ET», «Metlife Stadium in East Rutherford, N.J.» y emisión por CBS.",
      en: "Official site of the game: \"Saturday, December 12th\", \"3 PM ET\", \"Metlife Stadium in East Rutherford, N.J.\" and the CBS broadcast.",
    },
  },
  {
    id: "anavy26-navysports-calendario",
    title: "American Conference Announces 2026 Navy Football Schedule",
    publisher: "Naval Academy Athletics (navysports.com)",
    url: "https://navysports.com/news/2026/2/26/american-conference-announces-2026-navy-football-schedule.aspx",
    publishedAt: "2026-02-26",
    accessedAt: A,
    sourceType: "official-document",
    notes: {
      es: "Calendario oficial de Navy. Fija el partido el sábado 12 de diciembre en East Rutherford y recuerda que es la primera vez allí desde 2021, cuando Navy ganó 17-13.",
      en: "Navy's official schedule. Sets the game for Saturday 12 December in East Rutherford and notes it is the first time there since 2021, when Navy won 17-13.",
    },
  },
  {
    id: "anavy26-entradas-agotadas",
    title: "2026 Army-Navy Football Tickets Now Sold Out",
    publisher: "Army West Point (goarmywestpoint.com)",
    url: "https://goarmywestpoint.com/news/2026/9/28/athletics-2026-army-navy-football-tickets-now-sold-out",
    publishedAt: "2026-09-28",
    accessedAt: A,
    sourceType: "official-document",
  },
  {
    id: "anavy26-fos-debate",
    title: "Army and Navy Debate Football Game's Future",
    publisher: "Front Office Sports",
    url: "https://frontofficesports.com/army-navy-mulling-schedule-conflict-cfp/",
    publishedAt: "2026-02-26",
    accessedAt: A,
    sourceType: "press",
    notes: {
      es: "Reportaje de Amanda Christovich. Declaraciones de Michael Kelly (Navy), Tom Theodorakis (Army) y Tim Pernetti (American), y la propuesta de Jeff Monken recogida originalmente por The Athletic.",
      en: "Report by Amanda Christovich. Quotes from Michael Kelly (Navy), Tom Theodorakis (Army) and Tim Pernetti (American), plus Jeff Monken's proposal as originally reported by The Athletic.",
    },
  },
  {
    id: "anavy26-fos-orden-ejecutiva",
    title: "Trump Signs Executive Order to 'Preserve' Army–Navy Game",
    publisher: "Front Office Sports",
    url: "https://frontofficesports.com/trump-army-navy-game-executive-order-college-football-playoff/",
    publishedAt: "2026-03-20",
    accessedAt: A,
    sourceType: "press",
    notes: {
      es: "La orden «Preserving America's Game», firmada el 20 de marzo de 2026, encarga buscar una ventana de emisión exclusiva, pero la versión final no fija ninguna fecha concreta.",
      en: "The \"Preserving America's Game\" order, signed on 20 March 2026, directs stakeholders to secure an exclusive broadcasting window, but the final version fixes no specific date.",
    },
  },
  {
    id: "anavy26-preserve-octubre",
    title: "Army, Navy working to 'preserve' rivalry game amid 24-team CFP",
    publisher: "Field Level Media",
    url: "https://fieldlevelmedia.com/ncaaf/army-navy-working-to-preserve-rivalry-game-amid-24-team-cfp/",
    publishedAt: "2026-10-20",
    accessedAt: A,
    sourceType: "press",
    notes: {
      es: "Recoge la información de Front Office Sports del 20 de octubre de 2026 y las declaraciones de Tom Theodorakis a ese medio, además del contrato de CBS hasta 2038.",
      en: "Relays the 20 October 2026 Front Office Sports reporting and Tom Theodorakis's quotes to that outlet, plus the CBS contract running through 2038.",
    },
  },
  {
    id: "cfp24-cbs-expansion",
    title: "College Football Playoff nearing deal to expand to 24 teams starting in 2027",
    publisher: "CBS Sports",
    url: "https://www.cbssports.com/college-football/news/college-football-playoff-expand-24-teams-2027/",
    publishedAt: "2026-10-15",
    accessedAt: A,
    sourceType: "press",
    notes: {
      es: "Estado de la negociacion: modelo «19+4+1», pendiente del acuerdo economico con ESPN y de la firma de los comisionados, con el 1 de diciembre como fecha limite para Big Ten y SEC.",
      en: "State of the negotiation: the \"19+4+1\" model, pending the financial agreement with ESPN and the commissioners' sign-off, with 1 December as the deadline for the Big Ten and the SEC.",
    },
  },
  {
    id: "cfp24-yahoo-formato",
    title: "Inside College Football Playoff's 24-team expansion: What to know about the new format, schedule and fallout",
    publisher: "Yahoo Sports",
    url: "https://sports.yahoo.com/college-football/article/inside-college-football-playoffs-24-team-expansion-what-to-know-about-the-new-format-schedule-and-fallout-135930768.html",
    publishedAt: "2026-10-19",
    accessedAt: A,
    sourceType: "press",
    notes: {
      es: "Detalle del cuadro propuesto: ocho byes, dieciseis equipos en primera ronda, las dos primeras rondas en campos universitarios y los cuartos y semifinales en los seis bowls del CFP.",
      en: "Detail of the proposed bracket: eight byes, sixteen teams in the first round, the first two rounds on campus and the quarter-finals and semi-finals in the six CFP bowls.",
    },
  },
  {
    id: "cfp-seeding-2526",
    title: "College Football Playoff Management Committee Modifies Playoff Seeding for 2025-26",
    publisher: "College Football Playoff",
    url: "https://collegefootballplayoff.com/news/2025/5/22/2526-seeding-rev.aspx",
    publishedAt: "2025-05-22",
    accessedAt: A,
    sourceType: "league-official",
    notes: {
      es: "Formato vigente de 12 equipos con siembra directa: los cuatro mejores del ranking descansan en primera ronda y los cinco campeones de conferencia mejor clasificados tienen plaza asegurada.",
      en: "The current 12-team format with straight seeding: the top four ranked teams get a first-round bye and the five highest-ranked conference champions are guaranteed a place.",
    },
  },
  {
    id: "anavy26-wiki-serie",
    title: "Army–Navy Game",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Army%E2%80%93Navy_Game",
    accessedAt: A,
    sourceType: "encyclopedia",
    notes: {
      es: "Usada solo para el numero de edicion (la 127.ª), el balance historico de la serie (64-55-7 hasta 2025) y el traslado del partido al segundo sabado de diciembre en 2009.",
      en: "Used only for the edition number (the 127th), the all-time series record (64-55-7 through 2025) and the move to the second Saturday of December in 2009.",
    },
  },
];
