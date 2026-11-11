import type { Article } from "@/types";

const AP = "[[src:ap-bengals-falcons-madrid-2026]]";
const ESPN = "[[src:espn-bengals-falcons-madrid-2026]]";
const CIN = "[[src:bengals-falcons-recap-2026]]";
const BOX = "[[src:cbs-bengals-falcons-boxscore-2026]]";

export const nflMadrid2026Cronica: Article = {
  id: "nfl-madrid-2026-cronica",
  slug: "nfl-madrid-2026-falcons-bengals-cronica",
  title: {
    es: "Burrow y Chase arrollan a los Falcons en el Bernabéu: Bengals 34, Falcons 17",
    en: "Burrow and Chase run over the Falcons at the Bernabéu: Bengals 34, Falcons 17",
  },
  subtitle: {
    es: "Cuatro touchdowns de Joe Burrow, 155 yardas de Ja'Marr Chase y 78.660 espectadores en el segundo partido de la NFL en España. Es la primera victoria de Cincinnati fuera de Estados Unidos.",
    en: "Four touchdowns from Joe Burrow, 155 yards from Ja'Marr Chase and 78,660 fans at the NFL's second game in Spain. It is Cincinnati's first win outside the United States.",
  },
  excerpt: {
    es: "Atlanta marcó en su primer drive, pero Cincinnati anotó en todas sus posesiones de la primera parte y se fue 24-10 al descanso. Así fue el NFL Madrid Game 2026.",
    en: "Atlanta scored on its opening drive, but Cincinnati scored on every first-half possession and led 24-10 at the break. This is how the 2026 NFL Madrid Game unfolded.",
  },
  seo: {
    title: {
      es: "Bengals 34-17 Falcons: resultado y crónica del NFL Madrid 2026",
      en: "Bengals 34-17 Falcons: result and recap of NFL Madrid 2026",
    },
    description: {
      es: "Resultado del Falcons-Bengals en el Bernabéu (8-11-2026): 34-17 para Cincinnati con cuatro touchdowns de Burrow. Anotaciones, estadísticas, asistencia y declaraciones.",
      en: "Falcons-Bengals result at the Bernabéu (8 Nov 2026): 34-17 to Cincinnati with four Burrow touchdowns. Scoring, stats, attendance and quotes.",
    },
  },
  authorId: "jordi-sanchez",
  category: "nfl",
  tags: ["NFL", "Madrid", "Bernabéu", "Cincinnati Bengals", "Atlanta Falcons", "NFL Madrid Game", "Joe Burrow", "Ja'Marr Chase"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-11",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-11",
  readingTimeMinutes: 5,
  sourceIds: [
    "ap-bengals-falcons-madrid-2026",
    "espn-bengals-falcons-madrid-2026",
    "bengals-falcons-recap-2026",
    "cbs-bengals-falcons-boxscore-2026",
    "espn-madrid-recap-2025",
    "nfl-madrid-multiyear-2026",
    "madrid26-nfl-where-to-watch-2026",
    "formulatv-audiencias-2026-11-08",
    "nfl-roundup-2026-11-04",
    "madrid26-bengals-press-release",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Lo esencial", en: "The essentials" },
      text: {
        es: `Cincinnati Bengals 34, Atlanta Falcons 17, el domingo 8 de noviembre en el Estadio Santiago Bernabéu ante 78.660 espectadores. Joe Burrow lanzó tres pases de touchdown y corrió otro, y Ja'Marr Chase sumó 10 recepciones y 155 yardas. Los Bengals se ponen 6-2 y los Falcons caen a 3-6. ${AP} ${ESPN}`,
        en: `Cincinnati Bengals 34, Atlanta Falcons 17, on Sunday 8 November at the Estadio Santiago Bernabéu in front of 78,660 fans. Joe Burrow threw three touchdown passes and ran for another, and Ja'Marr Chase had 10 catches for 155 yards. The Bengals improve to 6-2 and the Falcons fall to 3-6. ${AP} ${ESPN}`,
      },
    },
    { type: "score", teamA: "Atlanta Falcons", scoreA: 17, teamB: "Cincinnati Bengals", scoreB: 34, status: { es: "Final · 8-11-2026 · Bernabéu", en: "Final · 8 Nov 2026 · Bernabéu" } },
    {
      type: "paragraph",
      text: {
        es: `Atlanta, equipo local sobre el papel, empezó mejor: Michael Penix Jr. culminó el primer drive con un pase de touchdown al tight end Charlie Woerner y los Falcons sumaron 10 puntos en sus dos primeras posesiones. A partir de ahí el partido fue de Cincinnati, que anotó en todas sus series de la primera parte y no despejó hasta el primer drive de la segunda. ${AP} ${CIN}`,
        en: `Atlanta, the designated home team, started better: Michael Penix Jr. capped the opening drive with a touchdown pass to tight end Charlie Woerner and the Falcons scored 10 points on their first two possessions. From there the game belonged to Cincinnati, who scored on every first-half series and did not punt until the opening drive of the second half. ${AP} ${CIN}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La primera respuesta fue un pase de 47 yardas de Burrow a Chase en tercer down, la recepción más larga del receptor esta temporada. En el segundo cuarto Burrow se metió en la end zone con un sneak de una yarda para el primer adelanto de los Bengals, encontró a Tee Higgins para el 21-10 y Evan McPherson cerró la primera parte con un field goal de 57 yardas a 24 segundos del descanso. ${CIN} ${BOX}`,
        en: `The first answer was a 47-yard Burrow pass to Chase on third down, the receiver's longest catch of the season. In the second quarter Burrow went in on a one-yard sneak for the Bengals' first lead, found Tee Higgins for 21-10, and Evan McPherson closed the half with a 57-yard field goal with 24 seconds left. ${CIN} ${BOX}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Bijan Robinson acercó a Atlanta a siete puntos (24-17) con una carrera de una yarda en el tercer cuarto, pero Burrow devolvió el golpe con su segundo touchdown a Higgins, de 8 yardas. Un field goal de 43 yardas de McPherson y una intercepción de Barrett Carter a Penix en el último cuarto cerraron el partido. ${BOX} ${CIN}`,
        en: `Bijan Robinson pulled Atlanta within seven (24-17) with a one-yard run in the third quarter, but Burrow hit back with his second touchdown to Higgins, from 8 yards. A 43-yard McPherson field goal and a Barrett Carter interception of Penix in the fourth quarter settled it. ${BOX} ${CIN}`,
      },
    },
    { type: "heading", level: 2, id: "anotaciones", text: { es: "Las anotaciones", en: "Scoring summary" } },
    {
      type: "timeline",
      items: [
        { score: "ATL 7-0", time: { es: "1.º · 11:12", en: "Q1 · 11:12" }, description: { es: "Pase de 1 yarda de Penix a Woerner", en: "Penix 1-yard pass to Woerner" } },
        { score: "7-7", time: { es: "1.º · 8:49", en: "Q1 · 8:49" }, description: { es: "Pase de 47 yardas de Burrow a Chase", en: "Burrow 47-yard pass to Chase" } },
        { score: "ATL 10-7", time: { es: "1.º · 2:56", en: "Q1 · 2:56" }, description: { es: "Field goal de 31 yardas de Nick Folk", en: "Nick Folk 31-yard field goal" } },
        { score: "CIN 14-10", time: { es: "2.º · 12:56", en: "Q2 · 12:56" }, description: { es: "Carrera de 1 yarda de Burrow", en: "Burrow 1-yard run" } },
        { score: "CIN 21-10", time: { es: "2.º · 4:03", en: "Q2 · 4:03" }, description: { es: "Pase de 4 yardas de Burrow a Higgins", en: "Burrow 4-yard pass to Higgins" } },
        { score: "CIN 24-10", time: { es: "2.º · 0:24", en: "Q2 · 0:24" }, description: { es: "Field goal de 57 yardas de McPherson", en: "McPherson 57-yard field goal" } },
        { score: "CIN 24-17", time: { es: "3.º · 6:18", en: "Q3 · 6:18" }, description: { es: "Carrera de 1 yarda de Bijan Robinson", en: "Bijan Robinson 1-yard run" } },
        { score: "CIN 31-17", time: { es: "3.º · 2:05", en: "Q3 · 2:05" }, description: { es: "Pase de 8 yardas de Burrow a Higgins", en: "Burrow 8-yard pass to Higgins" } },
        { score: "CIN 34-17", time: { es: "4.º · 4:36", en: "Q4 · 4:36" }, description: { es: "Field goal de 43 yardas de McPherson", en: "McPherson 43-yard field goal" } },
      ],
    },
    { type: "heading", level: 2, id: "estadisticas", text: { es: "Los números", en: "The numbers" } },
    {
      type: "list",
      items: [
        {
          es: `Joe Burrow: 24 de 29, 271 yardas, tres touchdowns de pase, uno de carrera, ninguna pérdida y 140,1 de rating. Con 21 pases de touchdown, lidera la NFL. ${CIN}`,
          en: `Joe Burrow: 24 of 29, 271 yards, three passing touchdowns, one rushing, no turnovers and a 140.1 rating. His 21 touchdown passes lead the NFL. ${CIN}`,
        },
        {
          es: `Ja'Marr Chase: 10 recepciones, 155 yardas y un touchdown. Hizo 142 yardas solo en la primera parte, su mejor mitad como profesional. Es el 55.º touchdown de Burrow a Chase, la pareja con más desde que Chase llegó a la liga en 2021. ${CIN} ${AP}`,
          en: `Ja'Marr Chase: 10 catches, 155 yards and a touchdown. He had 142 yards in the first half alone, the best half of his career. It is Burrow's 55th touchdown to Chase, the most by any duo since Chase entered the league in 2021. ${CIN} ${AP}`,
        },
        {
          es: `Tee Higgins: 5 recepciones, 32 yardas y dos touchdowns. Evan McPherson suma 23 field goals seguidos, la mejor racha de la historia del club. ${CIN}`,
          en: `Tee Higgins: 5 catches, 32 yards and two touchdowns. Evan McPherson has now made 23 straight field goals, the longest streak in club history. ${CIN}`,
        },
        {
          es: `Por Atlanta, Michael Penix Jr. completó 20 de 31 para 162 yardas, con un touchdown y una intercepción, y corrió 50 yardas. Bijan Robinson llegó a 100 yardas de carrera en 19 intentos, con un touchdown, y añadió 47 yardas en 6 recepciones. ${AP}`,
          en: `For Atlanta, Michael Penix Jr. went 20 of 31 for 162 yards, with a touchdown and an interception, and ran for 50 yards. Bijan Robinson reached 100 rushing yards on 19 carries, with a touchdown, and added 47 yards on 6 catches. ${AP}`,
        },
        {
          es: `Por equipos: 388 yardas totales de Cincinnati por 319 de Atlanta, con una pérdida de balón de los Falcons y ninguna de los Bengals. ${BOX}`,
          en: `Team totals: 388 yards for Cincinnati to 319 for Atlanta, with one Falcons turnover and none for the Bengals. ${BOX}`,
        },
      ],
    },
    { type: "heading", level: 2, id: "declaraciones", text: { es: "Lo que dijeron", en: "What they said" } },
    {
      type: "quote",
      text: {
        es: "Quería salir y dar espectáculo para todos, y enseñar lo emocionante que puede ser la NFL.",
        en: "I wanted to come out and put on a show for everybody and show what the excitement of the NFL can be.",
      },
      attribution: { es: "Joe Burrow, quarterback de los Bengals (AP)", en: "Joe Burrow, Bengals quarterback (AP)" },
    },
    {
      type: "paragraph",
      text: {
        es: `Zac Taylor, entrenador de Cincinnati, habló de una «increíble» presencia de aficionados de los Bengals en España y dijo que Burrow está jugando «a un nivel increíblemente alto». En el otro vestuario, Penix admitió que se habían hecho daño «a sí mismos en muchas facetas del juego» y Kevin Stefanski resumió: «No hemos sido lo bastante buenos, tenemos que hacerlo mejor». ${CIN} ${AP}`,
        en: `Cincinnati head coach Zac Taylor described an "unbelievable turnout" of Bengals fans in Spain and said Burrow is playing "at an unbelievably high level". In the other locker room, Penix said "we beat ourselves in a lot of areas of the game", and Kevin Stefanski summed up: "We were not good enough, we have to do better." ${CIN} ${AP}`,
      },
    },
    { type: "heading", level: 2, id: "madrid", text: { es: "El partido en Madrid", en: "The Madrid occasion" } },
    {
      type: "paragraph",
      text: {
        es: `Hubo 78.660 espectadores, 50 más que en el estreno de la NFL en España: el 16 de noviembre de 2025, el Miami Dolphins 16, Washington Commanders 13 reunió a 78.610 en el mismo estadio. ${AP} [[src:espn-madrid-recap-2025]] Antes del saque inicial se guardó un minuto de silencio por las víctimas del accidente de tren de alta velocidad del 28 de octubre. ${AP}`,
        en: `Attendance was 78,660, 50 more than at the NFL's debut in Spain: on 16 November 2025, Miami Dolphins 16, Washington Commanders 13 drew 78,610 to the same stadium. ${AP} [[src:espn-madrid-recap-2025]] Before kickoff there was a moment of silence for the victims of the 28 October high-speed train crash. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La anécdota llegó en los dos últimos minutos: las luces del Bernabéu se apagaron cuando los Bengals sacaban una jugada y el down tuvo que repetirse. ${AP}`,
        en: `The oddity came in the final two minutes: the Bernabéu lights went out as the Bengals were snapping the ball, and the down had to be replayed. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `En España el partido se emitió en abierto en Cuatro, gratis en DAZN y en Mediaset Infinity. [[src:madrid26-nfl-where-to-watch-2026]] La retransmisión de Cuatro tuvo 448.000 espectadores y un 4,6 % de cuota, según FormulaTV; el dato no incluye DAZN ni Mediaset Infinity. [[src:formulatv-audiencias-2026-11-08]] La NFL tiene firmado un acuerdo plurianual para seguir jugando en Madrid, así que habrá más partidos en el Bernabéu. [[src:nfl-madrid-multiyear-2026]] Si quieres seguir la temporada desde aquí, lo explicamos en [[link:articles/donde-ver-nfl-espana-2026|dónde ver la NFL en España]], y si estás eligiendo equipo, en nuestra [[link:articles/equipos-nfl|guía de los 32 equipos]].`,
        en: `In Spain the game aired free-to-air on Cuatro, free on DAZN and on Mediaset Infinity. [[src:madrid26-nfl-where-to-watch-2026]] Cuatro's broadcast drew 448,000 viewers and a 4.6% share, according to FormulaTV; the figure does not include DAZN or Mediaset Infinity. [[src:formulatv-audiencias-2026-11-08]] The NFL has a multi-year agreement to keep playing in Madrid, so there will be more games at the Bernabéu. [[src:nfl-madrid-multiyear-2026]] To follow the season from here, see [[link:articles/donde-ver-nfl-espana-2026|where to watch the NFL in Spain]], and if you are picking a team, our [[link:articles/equipos-nfl|guide to all 32 teams]].`,
      },
    },
    { type: "heading", level: 2, id: "que-significa", text: { es: "Qué significa para los dos", en: "What it means for both" } },
    {
      type: "paragraph",
      text: {
        es: `Cincinnati, que llegaba 5-2, encadena cuatro victorias y por cuarto partido seguido pasa de 30 puntos, algo que no hacía desde 1997 y que iguala el récord del club. También es su primera victoria fuera de Estados Unidos, tras dos partidos en Londres. [[src:nfl-roundup-2026-11-04]] [[src:madrid26-bengals-press-release]] ${CIN} ${ESPN} El domingo 15 recibe a los Steelers en Sunday Night Football. ${AP}`,
        en: `Cincinnati, who arrived 5-2, have now won four in a row and scored 30-plus for a fourth straight game, something they had not done since 1997 and which ties the club record. It is also their first win outside the United States, after two games in London. [[src:nfl-roundup-2026-11-04]] [[src:madrid26-bengals-press-release]] ${CIN} ${ESPN} On Sunday 15 they host the Steelers on Sunday Night Football. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Atlanta suma su segunda derrota seguida y se queda 3-6. Recibe a Kansas City el próximo domingo. ${AP} ${ESPN} Todo lo que rodeó al partido, de las entradas al transporte, está en nuestra [[link:articles/nfl-madrid-2026-falcons-bengals-guia|guía del NFL Madrid 2026]].`,
        en: `Atlanta have lost two straight and drop to 3-6. They host Kansas City next Sunday. ${AP} ${ESPN} Everything around the game, from tickets to transport, is in our [[link:articles/nfl-madrid-2026-falcons-bengals-guia|NFL Madrid 2026 guide]].`,
      },
    },
    {
      type: "placeholder",
      topic: { es: "Pendiente de datos oficiales", en: "Awaiting official figures" },
      pending: [
        { es: "Audiencia en DAZN y Mediaset Infinity", en: "Audience on DAZN and Mediaset Infinity" },
        { es: "Fecha y equipos del próximo partido de la NFL en Madrid", en: "Date and teams for the next NFL game in Madrid" },
      ],
    },
  ],
};
