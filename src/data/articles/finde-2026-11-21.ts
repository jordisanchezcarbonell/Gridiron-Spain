import type { Article } from "@/types";

const NFL = "[[src:espn-nfl-scoreboard-2026-week-11]] [[src:cbs-nfl-scoreboard-2026-week-11]]";
const STANDINGS = "[[src:espn-nfl-standings-2026-11-26]]";
const NCAA = "[[src:espn-cfb-scoreboard-2026-11-21]] [[src:cbs-cfb-scoreboard-2026-11-21]]";
const AP = "[[src:espn-cfb-rankings-week13-2026]] [[src:cbs-ap-poll-week13-2026]]";
const CFP = "[[src:cfp-fourth-rankings-2026]] [[src:ncaa-cfp-fourth-rankings-2026]]";
const HEISMAN = "[[src:nbc-heisman-odds-week13-2026]] [[src:si-heisman-odds-week13-2026]]";
const SCHED = "[[src:espn-cfb-schedule-week13-2026]] [[src:cbs-cfb-schedule-week13-2026]]";
const NFL_SCHED = "[[src:espn-nfl-schedule-2026-week-12]] [[src:cbs-nfl-schedule-2026-week-12]]";

export const finde20261121: Article = {
  id: "finde-2026-11-21",
  slug: "lo-mas-importante-semana-nfl-college-2026-11-26",
  title: {
    es: "Lo más importante de la semana: sábado negro en la Big Ten, Utah se queda como único invicto y los Panthers ganan un 35-33 a los Ravens",
    en: "The week's biggest stories: a black Saturday for the Big Ten, Utah the last unbeaten team and the Panthers edge the Ravens 35-33",
  },
  subtitle: {
    es: "Ohio State, UCLA e Indiana pierden por ocho puntos en total, Nebraska rompe una racha de 31 derrotas ante rankeados, Texas sube al tercer puesto del comité y Bills y 49ers se ponen 9-1.",
    en: "Ohio State, UCLA and Indiana lose by eight points combined, Nebraska end a 31-game losing run against ranked teams, Texas climb to third in the committee's ranking and the Bills and 49ers move to 9-1.",
  },
  excerpt: {
    es: "Del 19 al 25 de noviembre: la jornada 11 de la NFL, la jornada 12 universitaria, la encuesta AP, el cuarto ranking del CFP y las cuotas del Heisman. Marcadores contrastados en ESPN y CBS.",
    en: "19 to 25 November: NFL Week 11, college Week 12, the AP poll, the fourth CFP ranking and the Heisman odds. Scores confirmed on ESPN and CBS.",
  },
  seo: {
    title: {
      es: "NFL y college: lo más importante de la semana (26 de noviembre)",
      en: "NFL and college football: the week's biggest stories (26 November)",
    },
    description: {
      es: "Nebraska 31-28 Ohio State, Michigan 18-16 UCLA, Utah único invicto, Panthers 35-33 Ravens, Cowboys 51-30 Titans y Texas, tercero del CFP. El resumen de la semana, con fuentes.",
      en: "Nebraska 31-28 Ohio State, Michigan 18-16 UCLA, Utah the last unbeaten team, Panthers 35-33 Ravens, Cowboys 51-30 Titans and Texas third in the CFP. The week in review, with sources.",
    },
  },
  heroImage: {
    url: "/images/ncaaf/estadios/notre-dame-stadium-2011-commons.jpg",
    alt: {
      es: "Aficionados en las gradas del Notre Dame Stadium de South Bend, el 29 de octubre de 2011. Imagen de archivo.",
      en: "Fans in the stands at Notre Dame Stadium in South Bend on 29 October 2011. Archive image.",
    },
    width: 1600,
    height: 1195,
    photographer: "Know1one1",
    source: "https://commons.wikimedia.org/wiki/File:Notre_Dame_Stadium_2011.JPG",
    license: "CC BY-SA 3.0",
  },
  authorId: "jordi-sanchez",
  category: "ncaa",
  tags: ["NFL", "NCAA", "Resultados", "AP Top 25", "CFP", "Heisman", "Big Ten", "Nebraska", "Utah", "Panthers", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["nfl", "ncaa-fbs"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-26",
  updatedAt: "2026-11-26",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-26",
  readingTimeMinutes: 5,
  sourceIds: [
    "espn-nfl-scoreboard-2026-week-11", "cbs-nfl-scoreboard-2026-week-11", "espn-nfl-standings-2026-11-26",
    "espn-recap-panthers-ravens-2026",
    "espn-cfb-scoreboard-2026-11-21", "cbs-cfb-scoreboard-2026-11-21", "espn-recap-nebraska-ohio-state-2026",
    "espn-cfb-rankings-week13-2026", "cbs-ap-poll-week13-2026",
    "cfp-fourth-rankings-2026", "ncaa-cfp-fourth-rankings-2026",
    "nbc-heisman-odds-week13-2026", "si-heisman-odds-week13-2026",
    "espn-cfb-schedule-week13-2026", "cbs-cfb-schedule-week13-2026",
    "espn-nfl-schedule-2026-week-12", "cbs-nfl-schedule-2026-week-12",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "La semana pasada no perdió ninguno de los nueve primeros. Esta han caído tres rankeados de la Big Ten por un total de ocho puntos, y uno de ellos era invicto. En la NFL, el partido de la jornada se decidió en los dos últimos minutos. Esto es lo que hay que saber.",
        en: "Last week none of the top nine lost. This week three ranked Big Ten teams went down by eight points combined, and one of them was unbeaten. In the NFL, the game of the week was decided in the last two minutes. Here is what you need to know.",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "college",
      text: { es: "College: la Big Ten pierde a tres de los suyos", en: "College: the Big Ten loses three of its own" },
    },
    {
      type: "paragraph",
      text: {
        es: `Nebraska ganó 31-28 a Ohio State y cerró una racha de 31 derrotas seguidas ante equipos del Top 25 de AP: no vencía a uno desde un 35-32 a Oregon en septiembre de 2016. ${NCAA} [[src:espn-recap-nebraska-ohio-state-2026]] Michigan tumbó 18-16 a UCLA, que llegaba invicta, después de tres prórrogas. Y Washington venció 27-24 a Indiana, también en la prórroga. ${NCAA}`,
        en: `Nebraska beat Ohio State 31-28 and ended a run of 31 straight losses to AP Top 25 teams: their last such win was 35-32 over Oregon in September 2016. ${NCAA} [[src:espn-recap-nebraska-ohio-state-2026]] Michigan beat UCLA, who came in unbeaten, 18-16 after three overtimes. And Washington beat Indiana 27-24, also in overtime. ${NCAA}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Con la derrota de UCLA, Utah es el único invicto que queda: ganó 38-17 en TCU y va 11-0. Arriba no hubo más sustos. Georgia, n.º 1, se impuso 34-6 en South Carolina; Texas arrolló 45-3 a Arkansas, Notre Dame venció 24-3 a SMU y Tennessee, 27-13 a LSU. Más abajo, Boise State perdió 22-20 en casa con San Diego State y Kentucky cayó 28-14 en Missouri. ${NCAA}`,
        en: `With UCLA's defeat, Utah are the only unbeaten team left: they won 38-17 at TCU and are 11-0. There were no other scares at the top. No. 1 Georgia won 34-6 at South Carolina; Texas routed Arkansas 45-3, Notre Dame beat SMU 24-3 and Tennessee beat LSU 27-13. Further down, Boise State lost 22-20 at home to San Diego State and Kentucky fell 28-14 at Missouri. ${NCAA}`,
      },
    },
    {
      type: "list",
      items: [
        { es: "Alabama 47 — Chattanooga 0.", en: "Alabama 47 — Chattanooga 0." },
        { es: "Miami 28 — Virginia Tech 20.", en: "Miami 28 — Virginia Tech 20." },
        { es: "Wake Forest 50 — Georgia Tech 29.", en: "Wake Forest 50 — Georgia Tech 29." },
        { es: "Texas Tech 20 — Baylor 10.", en: "Texas Tech 20 — Baylor 10." },
        { es: "BYU 31 — Kansas 29, en la prórroga.", en: "BYU 31 — Kansas 29, in overtime." },
        { es: "Arizona 35 — Kansas State 28, en la prórroga.", en: "Arizona 35 — Kansas State 28, in overtime." },
        { es: "Oregon 45 — Michigan State 7, el viernes.", en: "Oregon 45 — Michigan State 7, on Friday." },
        { es: "Iowa 34 — Illinois 17.", en: "Iowa 34 — Illinois 17." },
        { es: "Oklahoma 28 — Texas A&M 7.", en: "Oklahoma 28 — Texas A&M 7." },
        { es: "Louisville 42 — Pittsburgh 10.", en: "Louisville 42 — Pittsburgh 10." },
      ],
    },

    {
      type: "heading",
      level: 2,
      id: "rankings",
      text: { es: "Rankings: Texas, tercero con dos derrotas", en: "Rankings: Texas third with two losses" },
    },
    {
      type: "paragraph",
      text: {
        es: `En la encuesta AP del domingo, Georgia sigue n.º 1 con 56 votos al primer puesto, por delante de Utah (12) y Notre Dame (1). Los tres derrotados de la Big Ten pagan el sábado: UCLA baja del 4.º al 10.º, Indiana del 6.º al 12.º y Ohio State del 16.º al 25.º. Entran Oklahoma y Missouri; salen Kentucky y Memphis. ${AP}`,
        en: `In Sunday's AP poll, Georgia stay No. 1 with 56 first-place votes, ahead of Utah (12) and Notre Dame (1). The three beaten Big Ten teams pay for Saturday: UCLA drop from 4th to 10th, Indiana from 6th to 12th and Ohio State from 16th to 25th. Oklahoma and Missouri come in; Kentucky and Memphis drop out. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El comité del playoff publicó el martes el cuarto de sus seis rankings. Georgia y Utah siguen arriba, y detrás suben Texas (del 5.º al 3.º) y Notre Dame (del 6.º al 4.º). Según el propio CFP, ningún equipo con dos derrotas había estado tan alto en un cuarto ranking como Texas. Tennessee sube cuatro puestos, hasta el 5.º; Alabama cae al 6.º, UCLA al 9.º, Indiana al 14.º y Ohio State al 21.º. Wake Forest, 8.ª, tiene el mejor puesto de su historia. ${CFP}`,
        en: `The playoff committee released the fourth of its six rankings on Tuesday. Georgia and Utah stay on top, and behind them Texas (5th to 3rd) and Notre Dame (6th to 4th) move up. According to the CFP itself, no two-loss team had been ranked as high in a fourth ranking as Texas. Tennessee climb four places to 5th; Alabama fall to 6th, UCLA to 9th, Indiana to 14th and Ohio State to 21st. Wake Forest, 8th, have their best ranking ever. ${CFP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Entran Missouri, Washington y Nebraska, que no aparecía en el ranking del comité desde 2016. Salen Kentucky, South Carolina y Boise State, aunque el comité sigue señalando a Boise State como el mejor equipo de fuera de las grandes conferencias. ${CFP}`,
        en: `Missouri, Washington and Nebraska come in, the latter for the first time in the committee's ranking since 2016. Kentucky, South Carolina and Boise State drop out, although the committee still names Boise State as the best team from outside the major conferences. ${CFP}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "heisman",
      text: { es: "Heisman: Smith pierde el partido y gana ventaja", en: "Heisman: Smith loses the game and extends his lead" },
    },
    {
      type: "paragraph",
      text: {
        es: `Ohio State perdió en Nebraska, pero Jeremiah Smith atrapó seis pases para 165 yardas y dos touchdowns, y las casas de apuestas lo ven aún más favorito: en DraftKings pasa de -144 a -450. Suma 86 recepciones, 1.482 yardas y 17 touchdowns en la temporada. El segundo en DraftKings es Devon Dampier, quarterback de Utah, con +500. Son cuotas, no votos. ${HEISMAN} [[src:espn-recap-nebraska-ohio-state-2026]]`,
        en: `Ohio State lost at Nebraska, but Jeremiah Smith caught six passes for 165 yards and two touchdowns, and the bookmakers make him an even stronger favourite: at DraftKings he goes from -144 to -450. He has 86 catches, 1,482 yards and 17 touchdowns on the season. Second at DraftKings is Utah quarterback Devon Dampier, at +500. These are odds, not votes. ${HEISMAN} [[src:espn-recap-nebraska-ohio-state-2026]]`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "nfl",
      text: { es: "NFL: siete cambios de líder en Charlotte", en: "NFL: seven lead changes in Charlotte" },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Panthers ganaron 35-33 a los Ravens en un partido con siete cambios de líder. Derrick Henry puso por delante a Baltimore (33-32) a 6:32 del final, y Ryan Fitzgerald devolvió la ventaja a Carolina con un field goal de 37 yardas a 1:44. Chuba Hubbard corrió para 120 yardas y dos touchdowns. Los Ravens llevan seis derrotas seguidas y van 4-7; los Panthers, 5-5, lideran la NFC Sur. ${NFL} [[src:espn-recap-panthers-ravens-2026]] ${STANDINGS}`,
        en: `The Panthers beat the Ravens 35-33 in a game with seven lead changes. Derrick Henry put Baltimore ahead (33-32) with 6:32 left, and Ryan Fitzgerald gave Carolina the lead back with a 37-yard field goal with 1:44 to go. Chuba Hubbard ran for 120 yards and two touchdowns. The Ravens have lost six in a row and are 4-7; the Panthers, 5-5, lead the NFC South. ${NFL} [[src:espn-recap-panthers-ravens-2026]] ${STANDINGS}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El marcador más alto fue el de Dallas: Cowboys 51-30 Titans, con 325 yardas y cuatro pases de touchdown de Dak Prescott. En Ciudad de México, los 49ers ganaron 35-10 a los Vikings en el partido internacional de la jornada y se ponen 9-1, igual que los Bills, que vencieron 26-9 a los Dolphins. ${NFL} ${STANDINGS}`,
        en: `The highest score was in Dallas: Cowboys 51-30 Titans, with 325 yards and four touchdown passes from Dak Prescott. In Mexico City, the 49ers beat the Vikings 35-10 in the week's international game and move to 9-1, like the Bills, who beat the Dolphins 26-9. ${NFL} ${STANDINGS}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Dos divisiones tienen colíderes con 8-2. En la AFC Oeste, los Broncos ganaron 38-24 a los Raiders y los Chiefs, 34-7 a los Cardinals. En la NFC Norte, los Lions vencieron 31-21 a los Buccaneers y los Bears, 21-13 a los Saints; los Vikings se quedan 7-3. El lunes, los Commanders ganaron 22-20 a los Bengals, que con 7-3 siguen al frente de la AFC Norte, por delante de Browns y Steelers (6-4). ${NFL} ${STANDINGS}`,
        en: `Two divisions have co-leaders at 8-2. In the AFC West, the Broncos beat the Raiders 38-24 and the Chiefs beat the Cardinals 34-7. In the NFC North, the Lions beat the Buccaneers 31-21 and the Bears beat the Saints 21-13; the Vikings slip to 7-3. On Monday the Commanders beat the Bengals 22-20, but at 7-3 Cincinnati still lead the AFC North, ahead of the Browns and Steelers (6-4). ${NFL} ${STANDINGS}`,
      },
    },
    {
      type: "list",
      items: [
        { es: "Texans 26 — Colts 3, el jueves.", en: "Texans 26 — Colts 3, on Thursday." },
        { es: "Eagles 19 — Steelers 16.", en: "Eagles 19 — Steelers 16." },
        { es: "Giants 23 — Jaguars 18. Los Giants, 6-3-1, lideran la NFC Este.", en: "Giants 23 — Jaguars 18. The Giants, 6-3-1, lead the NFC East." },
        { es: "Jets 27 — Chargers 24. Los Chargers, 1-9.", en: "Jets 27 — Chargers 24. The Chargers, 1-9." },
        { es: "Descansaron Falcons, Browns, Packers, Rams, Patriots y Seahawks.", en: "Falcons, Browns, Packers, Rams, Patriots and Seahawks had a bye." },
      ],
    },

    {
      type: "heading",
      level: 2,
      id: "que-viene",
      text: { es: "Lo que viene", en: "What's next" },
    },
    {
      type: "list",
      items: [
        { es: `NFL, jueves 26, Acción de Gracias (hora de España): Bears en Lions a las 19:00, con el liderato de la NFC Norte en juego; Eagles en Cowboys a las 22:30, y Chiefs en Bills a las 02:20 del viernes. El viernes 27, Broncos en Steelers a las 21:00. ${NFL_SCHED}`, en: `NFL, Thursday 26, Thanksgiving (Spanish time): Bears at Lions at 7:00 pm, with the NFC North lead at stake; Eagles at Cowboys at 10:30 pm, and Chiefs at Bills at 2:20 am on Friday. On Friday 27, Broncos at Steelers at 9:00 pm. ${NFL_SCHED}` },
        { es: `College, semana de rivalidades: Texas en Texas A&M, a la 01:30 del sábado 28, y West Virginia en Utah, a las 03:00. El sábado, Michigan en Ohio State a las 18:00, y Georgia Tech en Georgia y USC en UCLA a las 21:30. ${SCHED}`, en: `College, rivalry week: Texas at Texas A&M, 1:30 am on Saturday 28, and West Virginia at Utah, 3:00 am. On Saturday, Michigan at Ohio State at 6:00 pm, and Georgia Tech at Georgia and USC at UCLA at 9:30 pm. ${SCHED}` },
      ],
    },
  ],
};
