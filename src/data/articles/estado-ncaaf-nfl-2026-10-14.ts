import type { Article } from "@/types";

const AP = "[[src:yahoo-ap-poll-week7-2026]] [[src:espn-cfb-rankings-week7-2026]]";
const CFB_SCORES = "[[src:espn-cfb-scoreboard-2026-10-10]] [[src:cbs-cfb-scoreboard-2026-10-10]]";
const CFB_SCHEDULE = "[[src:espn-cfb-schedule-2026-10-17]] [[src:cbs-cfb-schedule-2026-10-17]] [[src:fbschedules-tv-2026-10-17]]";
const HEISMAN = "[[src:nbc-heisman-odds-week7-2026]] [[src:si-heisman-odds-week7-2026]]";
const STANDINGS = "[[src:cbs-nfl-standings-2026-10-14]] [[src:espn-nfl-standings-2026-10-14]]";
const NFL_SCORES = "[[src:espn-nfl-scoreboard-2026-week-5]] [[src:cbs-nfl-scoreboard-2026-week-5]]";
const NFL_SCHEDULE = "[[src:nfl-schedule-2026-week-6]] [[src:cbs-nfl-schedule-2026-week-6]] [[src:espn-nfl-schedule-2026-week-6]]";

export const estadoNcaafNfl20261014: Article = {
  id: "estado-ncaaf-nfl-2026-10-14",
  slug: "estado-ncaaf-nfl-octubre-2026",
  title: {
    es: "Así están NCAAF y la NFL a mitad de octubre: Georgia manda, ocho invictos en college y dos en la NFL",
    en: "Where NCAAF and the NFL stand in mid-October: Georgia on top, eight unbeaten in college and two in the NFL",
  },
  subtitle: {
    es: "Georgia es el nuevo n.º 1 tras ganar en Alabama, Texas se desploma del 1 al 7, Minnesota y San Francisco siguen sin perder y tres equipos de la NFL llevan cinco derrotas. La foto completa antes del mejor sábado del curso y de la semana 6.",
    en: "Georgia are the new No. 1 after winning at Alabama, Texas collapse from 1 to 7, Minnesota and San Francisco are still unbeaten and three NFL teams have lost five. The full picture before the best college Saturday of the season and NFL Week 6.",
  },
  excerpt: {
    es: "Clasificaciones, invictos, la carrera del Heisman y lo que viene el fin de semana en el fútbol americano universitario y en la NFL, con todo contrastado en dos fuentes.",
    en: "Standings, unbeaten teams, the Heisman race and what is coming this weekend in college football and the NFL, with everything confirmed in two sources.",
  },
  seo: {
    title: {
      es: "NCAAF y NFL: cómo va la temporada 2026 a 14 de octubre",
      en: "NCAAF and NFL: the 2026 season as of 14 October",
    },
    description: {
      es: "AP Top 25, invictos, favoritos al Heisman, clasificación de la NFL tras la semana 5 y los partidos del fin de semana, con horarios en España.",
      en: "AP Top 25, unbeaten teams, Heisman favourites, NFL standings after Week 5 and the weekend's games, with Spanish kickoff times.",
    },
  },
  heroImage: {
    url: "/images/editorial/college-football-stadium.png",
    alt: {
      es: "Estadio universitario lleno durante un partido de fútbol americano al atardecer.",
      en: "A full college stadium during an American football game at dusk.",
    },
    width: 1672,
    height: 941,
    photographer: "Gridiron Spain · imagen editorial generada",
    license: "Uso editorial de Gridiron Spain",
  },
  authorId: "jordi-sanchez",
  category: "ncaa",
  tags: ["NCAA", "NFL", "AP Top 25", "Heisman", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs", "nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-14",
  updatedAt: "2026-10-14",
  status: "published",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-10-14",
  readingTimeMinutes: 7,
  sourceIds: [
    "yahoo-ap-poll-week7-2026", "espn-cfb-rankings-week7-2026",
    "espn-cfb-scoreboard-2026-10-10", "cbs-cfb-scoreboard-2026-10-10",
    "nbc-heisman-odds-week7-2026", "si-heisman-odds-week7-2026",
    "espn-cfb-schedule-2026-10-17", "cbs-cfb-schedule-2026-10-17", "fbschedules-tv-2026-10-17",
    "navy-schedule-2026",
    "cbs-nfl-standings-2026-10-14", "espn-nfl-standings-2026-10-14",
    "espn-nfl-scoreboard-2026-week-5", "cbs-nfl-scoreboard-2026-week-5", "espn-nfl-week5-mnf-2026",
    "nfl-schedule-2026-week-6", "cbs-nfl-schedule-2026-week-6", "espn-nfl-schedule-2026-week-6",
    "jaguars-london-2026", "eldesmarque-mediaset-nfl-week6-2026", "dazn-nfl-game-pass-2026",
    "madrid26-bengals-press-release",
  ],
  content: [
    {
      type: "callout",
      title: { es: "La foto, a 14 de octubre", en: "The picture as of 14 October" },
      text: {
        es: "Este repaso está cerrado el miércoles 14 de octubre. El fútbol americano universitario viene de la jornada del día 10 y de la encuesta AP publicada el 11; la NFL cerró su semana 5 en la madrugada del martes con el Bills–Rams. Lo siguiente es el sábado 17 en college y la semana 6 de la NFL, que arranca el jueves 15. Todos los horarios son peninsulares.",
        en: "This round-up closes on Wednesday 14 October. College football comes off the 10 October slate and the AP poll released on the 11th; the NFL finished Week 5 overnight on Tuesday with Bills–Rams. Next up is Saturday the 17th in college and NFL Week 6, which starts on Thursday the 15th. All kickoff times are for mainland Spain.",
      },
    },

    { type: "heading", level: 2, id: "college", text: { es: "College: Georgia manda y quedan ocho invictos", en: "College: Georgia on top and eight unbeaten teams left" } },
    {
      type: "paragraph",
      text: {
        es: `Georgia es el nuevo n.º 1 del AP Top 25 con 66 de los 70 votos al número uno después de ganar 20-17 en Alabama, en el partido grande de la jornada. Detrás llegan Notre Dame (6-0), Miami (5-0), Ohio State (5-1) e Indiana (6-0). ${AP} ${CFB_SCORES}`,
        en: `Georgia are the new No. 1 in the AP Top 25 with 66 of the 70 first-place votes after winning 20–17 at Alabama in the weekend's marquee game. Behind them come Notre Dame (6-0), Miami (5-0), Ohio State (5-1) and Indiana (6-0). ${AP} ${CFB_SCORES}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El gran movimiento fue la caída de Texas, que pasó del 1 al 7 tras perder 27-24 con Oklahoma en el clásico de Dallas, con un field goal sobre la bocina. UCLA subió del 21 al 12 ganando 17-15 en Oregon, que se quedó fuera del ranking junto a Florida y Pittsburgh, y LSU se desplomó del 10 al 22 después de caer 35-34 en la prórroga en Kentucky. Entraron Kentucky (15), Wake Forest (21) y Northwestern (25). ${AP} ${CFB_SCORES}`,
        en: `The big move was Texas's fall from 1 to 7 after losing 27–24 to Oklahoma in the Dallas rivalry game on a field goal as time expired. UCLA climbed from 21 to 12 by winning 17–15 at Oregon, who dropped out of the poll along with Florida and Pittsburgh, while LSU slid from 10 to 22 after a 35–34 overtime loss at Kentucky. Kentucky (15), Wake Forest (21) and Northwestern (25) entered. ${AP} ${CFB_SCORES}`,
      },
    },
    {
      type: "list",
      items: [
        { es: `Invictos con seis partidos: Georgia, Notre Dame e Indiana (6-0). ${AP}`, en: `Unbeaten through six games: Georgia, Notre Dame and Indiana (6-0). ${AP}` },
        { es: `Invictos con cinco: Miami, BYU, Texas Tech, Utah y UCLA (5-0). ${AP}`, en: `Unbeaten through five: Miami, BYU, Texas Tech, Utah and UCLA (5-0). ${AP}` },
        { es: `En la encuesta de entrenadores (AFCA) el podio es el mismo —Georgia, Notre Dame y Miami—, con Indiana cuarto y Ohio State quinto. [[src:espn-cfb-rankings-week7-2026]]`, en: `In the AFCA coaches poll the top three are the same —Georgia, Notre Dame and Miami— with Indiana fourth and Ohio State fifth. [[src:espn-cfb-rankings-week7-2026]]` },
      ],
    },

    { type: "heading", level: 2, id: "heisman", text: { es: "El Heisman tiene un favorito muy claro", en: "The Heisman has a clear favourite" } },
    {
      type: "paragraph",
      text: {
        es: `Jeremiah Smith, receptor de Ohio State, salió de la jornada como favorito al Heisman con una cuota de -220 en DraftKings, muy por delante de CJ Carr (+1000), Darian Mensah (+1100) y un trío a +1500: Trinidad Chambliss, Keelon Russell y Gunner Stockton. Son precios de casa de apuestas, no votos, pero su temporada los sostiene: 48 recepciones, 916 yardas y 11 touchdowns. ${HEISMAN}`,
        en: `Ohio State receiver Jeremiah Smith came out of the weekend as the Heisman favourite at -220 on DraftKings, well ahead of CJ Carr (+1000), Darian Mensah (+1100) and a trio at +1500: Trinidad Chambliss, Keelon Russell and Gunner Stockton. These are bookmaker prices, not votes, but his season backs them up: 48 catches, 916 yards and 11 touchdowns. ${HEISMAN}`,
      },
    },

    { type: "heading", level: 2, id: "sabado-17", text: { es: "Lo que viene: el mejor sábado del curso", en: "What's coming: the best Saturday of the season" } },
    {
      type: "paragraph",
      text: {
        es: `La jornada del 17 de octubre junta un duelo entre dos equipos del top 5, dos invictos frente a frente en Provo y un clásico de la SEC en Neyland Stadium. ${CFB_SCHEDULE}`,
        en: `The 17 October slate brings a top-five showdown, two unbeaten teams meeting in Provo and an SEC classic at Neyland Stadium. ${CFB_SCHEDULE}`,
      },
    },
    {
      type: "list",
      items: [
        { es: `18:00 · #4 Ohio State – #5 Indiana (FOX): el partido del día, con el invicto de Indiana en juego. ${CFB_SCHEDULE}`, en: `18:00 · #4 Ohio State – #5 Indiana (FOX): the game of the day, with Indiana's unbeaten record on the line. ${CFB_SCHEDULE}` },
        { es: `18:00 · Florida – #7 Texas (ABC): la primera reacción de Texas tras perder el n.º 1. ${CFB_SCHEDULE}`, en: `18:00 · Florida – #7 Texas (ABC): Texas's first response after losing the No. 1 spot. ${CFB_SCHEDULE}` },
        { es: `21:30 · #6 Alabama – #14 Tennessee (ABC) y Auburn – #1 Georgia (ESPN). ${CFB_SCHEDULE}`, en: `21:30 · #6 Alabama – #14 Tennessee (ABC) and Auburn – #1 Georgia (ESPN). ${CFB_SCHEDULE}` },
        { es: `01:00 del domingo · Florida State – #3 Miami (ESPN), el derbi de Florida. ${CFB_SCHEDULE}`, en: `01:00 Sunday · Florida State – #3 Miami (ESPN), the Florida derby. ${CFB_SCHEDULE}` },
        { es: `01:30 del domingo · #2 Notre Dame – #8 BYU (ABC): 6-0 contra 5-0. ${CFB_SCHEDULE}`, en: `01:30 Sunday · #2 Notre Dame – #8 BYU (ABC): 6-0 against 5-0. ${CFB_SCHEDULE}` },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: `En nuestra sección de siempre: Navy (2-3) se recuperó ganando 34-26 a Tulsa, con 232 yardas y tres touchdowns de J. Gutierrez, y el sábado visita a UTSA en el Alamodome a las 02:00 de la madrugada del domingo, hora peninsular, por ESPNU. ${CFB_SCORES} [[src:navy-schedule-2026]]`,
        en: `In our regular corner: Navy (2-3) bounced back with a 34–26 win over Tulsa, behind 232 yards and three touchdowns from J. Gutierrez, and on Saturday they visit UTSA at the Alamodome at 02:00 overnight into Sunday Spanish time, on ESPNU. ${CFB_SCORES} [[src:navy-schedule-2026]]`,
      },
    },

    { type: "heading", level: 2, id: "nfl", text: { es: "NFL: dos invictos y tres equipos sin ganar", en: "NFL: two unbeaten teams and three without a win" } },
    {
      type: "paragraph",
      text: {
        es: `Cinco jornadas después, solo Minnesota y San Francisco siguen sin perder, los dos con 5-0, y Kansas City les acompaña arriba con un 4-0 porque ya ha descansado. Bills, Ravens y Jaguars están 4-1. En el otro extremo, Miami, Tennessee y los Chargers llevan cinco derrotas en cinco partidos. ${STANDINGS}`,
        en: `Five weeks in, only Minnesota and San Francisco are still unbeaten, both at 5-0, with Kansas City alongside them at 4-0 having already had their bye. The Bills, Ravens and Jaguars are 4-1. At the other end, Miami, Tennessee and the Chargers have lost all five of their games. ${STANDINGS}`,
      },
    },
    {
      type: "list",
      items: [
        { es: `Líderes de la AFC: Bills (4-1), Ravens (4-1), Jaguars (4-1) y Chiefs (4-0). ${STANDINGS}`, en: `AFC leaders: Bills (4-1), Ravens (4-1), Jaguars (4-1) and Chiefs (4-0). ${STANDINGS}` },
        { es: `Líderes de la NFC: Giants (3-1-1), Vikings (5-0), Panthers (2-2) y 49ers (5-0). ${STANDINGS}`, en: `NFC leaders: Giants (3-1-1), Vikings (5-0), Panthers (2-2) and 49ers (5-0). ${STANDINGS}` },
        { es: `El NFC Este ya acumula dos empates: Giants y Commanders firmaron un 27-27 en la semana 5. ${STANDINGS} ${NFL_SCORES}`, en: `The NFC East already has two ties: the Giants and Commanders drew 27–27 in Week 5. ${STANDINGS} ${NFL_SCORES}` },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: `La semana 5 dejó la segunda victoria europea de los Jaguars —19-17 a los Eagles en Londres, con 331 yardas y dos touchdowns de Trevor Lawrence—, un 31-24 de los Bengals en Miami con cuatro pases de touchdown de Joe Burrow y un 32-29 de los 49ers en Seattle. La cerró el lunes Buffalo, con un 37-34 en la prórroga sobre los Rams. ${NFL_SCORES} [[src:espn-nfl-week5-mnf-2026]]`,
        en: `Week 5 produced the Jaguars' win in Europe —19–17 over the Eagles in London, with 331 yards and two touchdowns from Trevor Lawrence—, a 31–24 Bengals win in Miami behind four Joe Burrow touchdown passes and a 32–29 49ers win in Seattle. Buffalo closed it on Monday with a 37–34 overtime win over the Rams. ${NFL_SCORES} [[src:espn-nfl-week5-mnf-2026]]`,
      },
    },

    { type: "heading", level: 2, id: "semana-6", text: { es: "La semana 6 y cómo verla desde España", en: "Week 6 and how to watch it from Spain" } },
    {
      type: "paragraph",
      text: {
        es: `La jornada abre el jueves con Seahawks–Broncos (02:15 de la madrugada del viernes) y tiene su cita grande el domingo: la NFL vuelve a Londres, esta vez a Wembley, con Texans–Jaguars a las 15:30. Después llegan Chargers–Chiefs y Raiders–Bills (22:25), el Packers–Cowboys del domingo noche (02:20 del lunes) y el 49ers–Commanders del Monday Night (02:15 del martes). Descansan Bengals, Lions, Dolphins y Vikings. ${NFL_SCHEDULE} [[src:jaguars-london-2026]]`,
        en: `The week opens on Thursday with Seahawks–Broncos (02:15 overnight into Friday) and peaks on Sunday: the NFL returns to London, this time to Wembley, with Texans–Jaguars at 15:30. Then come Chargers–Chiefs and Raiders–Bills (22:25), Packers–Cowboys on Sunday night (02:20 Monday) and 49ers–Commanders on Monday Night (02:15 Tuesday). The Bengals, Lions, Dolphins and Vikings are on a bye. ${NFL_SCHEDULE} [[src:jaguars-london-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `En abierto, Mediaset ha anunciado tres partidos: el de Wembley a las 15:30 y el Raiders–Bills a las 22:25 en Mediaset Infinity, y el Packers–Cowboys a las 02:15 de la madrugada del lunes en Cuatro, con previa quince minutos antes en los tres casos. Todos los partidos de la jornada están en NFL Game Pass dentro de DAZN. [[src:eldesmarque-mediaset-nfl-week6-2026]] [[src:dazn-nfl-game-pass-2026]]`,
        en: `Free-to-air, Mediaset has announced three games: the Wembley game at 15:30 and Raiders–Bills at 22:25 on Mediaset Infinity, plus Packers–Cowboys at 02:15 overnight into Monday on Cuatro, each with a fifteen-minute pre-game show. Every game of the week is on NFL Game Pass inside DAZN. [[src:eldesmarque-mediaset-nfl-week6-2026]] [[src:dazn-nfl-game-pass-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Y un dato con lectura española: los dos equipos del partido de Madrid siguen caminos opuestos. Los Bengals (3-2) descansan esta jornada y los Falcons (2-3) reciben a los Bears el domingo. El 8 de noviembre se ven en el Santiago Bernabéu. ${STANDINGS} ${NFL_SCHEDULE} [[src:madrid26-bengals-press-release]]`,
        en: `And one detail with a Spanish angle: the two Madrid-game teams are going in opposite directions. The Bengals (3-2) are on a bye this week and the Falcons (2-3) host the Bears on Sunday. They meet at the Santiago Bernabéu on 8 November. ${STANDINGS} ${NFL_SCHEDULE} [[src:madrid26-bengals-press-release]]`,
      },
    },

    {
      type: "placeholder",
      topic: { es: "Primer ranking del College Football Playoff 2026", en: "First College Football Playoff ranking of 2026" },
      pending: [
        { es: "Fecha oficial de publicación del primer top 25 del comité", en: "Official release date of the committee's first top 25" },
        { es: "Formato y criterios del playoff para la temporada 2026", en: "Playoff format and criteria for the 2026 season" },
      ],
    },
    {
      type: "callout",
      title: { es: "Cómo verificamos esto", en: "How we verified this" },
      text: {
        es: "Cada marcador, récord y horario de este repaso está contrastado en dos fuentes independientes. Las cuotas del Heisman son precios de casa de apuestas y se publican como tales, no como una previsión nuestra. La clasificación del AFC Oeste se ha tomado de CBS Sports después de detectar un desajuste en la tabla de ESPN: el orden correcto es Chiefs 4-0, Broncos 3-2, Raiders 3-2 y Chargers 0-5. [[src:cbs-nfl-standings-2026-10-14]] [[src:espn-nfl-standings-2026-10-14]]",
        en: "Every score, record and kickoff time here is confirmed in two independent sources. The Heisman odds are bookmaker prices and are published as such, not as a prediction of ours. The AFC West standings are taken from CBS Sports after we found a mismatch in ESPN's table: the correct order is Chiefs 4-0, Broncos 3-2, Raiders 3-2 and Chargers 0-5. [[src:cbs-nfl-standings-2026-10-14]] [[src:espn-nfl-standings-2026-10-14]]",
      },
    },
  ],
};
