import type { Article } from "@/types";

const AP = "[[src:ap-syracuse-smu-2026]]";
const SI = "[[src:si-syracuse-smu-2026]]";

export const syracuseSorprendeASmu2026: Article = {
  id: "syracuse-sorprende-a-smu-2026",
  slug: "syracuse-sorprende-a-smu-2026",
  title: {
    es: "Syracuse tumba a la n.º 19 SMU con un touchdown a 17 segundos del final",
    en: "Syracuse stun No. 19 SMU with a touchdown 17 seconds from the end",
  },
  subtitle: {
    es: "Steve Angeli encontró al tight end Noah Meyers para el 30-27 y la Orange vuelve a ganar a un rival del ranking por primera vez desde noviembre de 2024.",
    en: "Steve Angeli found tight end Noah Meyers for the 30-27 and the Orange beat a ranked team for the first time since November 2024.",
  },
  excerpt: {
    es: "Syracuse ganaba 20-10 al descanso, encajó un parcial de 16-0 y lo remontó con un drive de 68 yardas en los últimos minutos. Así fue la sorpresa de Halloween en la ACC.",
    en: "Syracuse led 20-10 at half-time, conceded a 16-0 run and won it back with a 68-yard drive in the closing minutes. This is how the ACC's Halloween upset unfolded.",
  },
  seo: {
    title: {
      es: "Syracuse 30-27 SMU: touchdown de Angeli a 17 segundos del final",
      en: "Syracuse 30-27 SMU: Angeli touchdown with 17 seconds left",
    },
    description: {
      es: "Syracuse sorprende a la n.º 19 SMU con un pase de 2 yardas de Steve Angeli a Noah Meyers a 17 segundos del final. Primera victoria ante un rival clasificado desde 2024.",
      en: "Syracuse upset No. 19 SMU with Steve Angeli's 2-yard pass to Noah Meyers with 17 seconds left. Their first win over a ranked team since 2024.",
    },
  },
  heroImage: {
    url: "/images/editorial/college-football-stadium.png",
    alt: {
      es: "Estadio universitario lleno durante un partido de fútbol americano al atardecer. Imagen editorial genérica, no del Syracuse-SMU.",
      en: "A full college stadium during an American football game at dusk. Generic editorial image, not from Syracuse-SMU.",
    },
    width: 1672,
    height: 941,
    photographer: "Gridiron Spain · imagen editorial generada",
    license: "Uso editorial de Gridiron Spain",
  },
  authorId: "jordi-sanchez",
  category: "ncaa",
  tags: ["Syracuse", "SMU", "ACC", "NCAA", "college football", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-31",
  readingTimeMinutes: 4,
  sourceIds: ["ap-syracuse-smu-2026", "si-syracuse-smu-2026"],
  content: [
    {
      type: "callout",
      title: { es: "Lo esencial", en: "The essentials" },
      text: {
        es: `Syracuse ganó 30-27 a SMU, número 19 del país, el sábado 31 de octubre en el JMA Wireless Dome. Steve Angeli dio la victoria con un pase de 2 yardas al tight end Noah Meyers a 17 segundos del final. Es la primera victoria de la Orange ante un rival clasificado desde el 30 de noviembre de 2024. ${AP} ${SI}`,
        en: `Syracuse beat No. 19 SMU 30-27 on Saturday 31 October at the JMA Wireless Dome. Steve Angeli won it with a 2-yard pass to tight end Noah Meyers with 17 seconds left. It is the Orange's first win over a ranked team since 30 November 2024. ${AP} ${SI}`,
      },
    },
    { type: "score", teamA: "Syracuse", scoreA: 30, teamB: "SMU", scoreB: 27, status: { es: "Final · 31-10-2026", en: "Final · 31 Oct 2026" } },
    {
      type: "paragraph",
      text: {
        es: `Syracuse firmó este sábado de Halloween una de las sorpresas de la jornada en la ACC. Para Noah Meyers, un tight end con pocos minutos esta temporada, el pase de la victoria fue su primer touchdown con Syracuse. ${AP}`,
        en: `Syracuse pulled off one of the upsets of the weekend in the ACC this Halloween Saturday. For Noah Meyers, a little-used tight end, the winning catch was his first touchdown for Syracuse. ${AP}`,
      },
    },

    { type: "heading", level: 2, id: "remontada", text: { es: "Un partido que se le escapó y recuperó", en: "A game that slipped away and came back" } },
    {
      type: "paragraph",
      text: {
        es: `Syracuse se fue al descanso con un 20-10 a favor, pero SMU le endosó un parcial de 16-0 en la segunda parte. ${SI} El momento más amargo para los locales llegó con 20-17 en el marcador: Angeli fue sancionado por «intentional grounding» (lanzar el balón a ninguna parte para evitar un sack) dentro de su propia zona de anotación, y la falta supuso un «safety», dos puntos para los Mustangs, a falta de 12 minutos. ${AP}`,
        en: `Syracuse went in 20-10 up at half-time, but SMU hit them with a 16-0 run after the break. ${SI} The cruellest moment for the home side came at 20-17: Angeli was flagged for intentional grounding in his own end zone, and the penalty gave the Mustangs a safety, two points, with 12 minutes left. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Con nueve minutos por jugar, una carrera de Kendrick Raphael hasta la end zone puso el 27-20 para SMU, que parecía haber cerrado el partido. ${AP} ${SI}`,
        en: `With nine minutes to play, a Kendrick Raphael touchdown run made it 27-20 to SMU and looked like the winner. ${AP} ${SI}`,
      },
    },

    { type: "heading", level: 2, id: "drive", text: { es: "El drive de la victoria", en: "The winning drive" } },
    {
      type: "paragraph",
      text: {
        es: `Tripp Woody, que había recuperado el puesto de pateador titular, metió su tercer field goal de la tarde para dejarlo en 27-23 a 5:26 del final. ${AP} Terminó con un pleno, 3 de 3 en field goals y 3 de 3 en puntos extra, en un equipo que había fallado cinco puntos extra antes en la temporada. ${SI}`,
        en: `Tripp Woody, back as the starting kicker, made his third field goal of the day to cut it to 27-23 with 5:26 left. ${AP} He finished perfect, 3 of 3 on field goals and 3 of 3 on extra points, for a team that had missed five extra points earlier in the season. ${SI}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Syracuse recuperó el balón en su propia yarda 32 con 3:36 en el reloj y armó una serie de 11 jugadas y 68 yardas. ${AP} ${SI} La culminó un «bootleg» (el quarterback finge una carrera y sale hacia un lado para lanzar) de Angeli, que encontró a Meyers en la end zone. ${SI}`,
        en: `Syracuse took over at their own 32 with 3:36 on the clock and put together an 11-play, 68-yard drive. ${AP} ${SI} It ended with Angeli rolling out on a bootleg and finding Meyers in the end zone. ${SI}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Angeli, en su segunda titularidad seguida tras perderse partidos por una lesión en el tren inferior, completó 21 de 34 pases para 200 yardas y un touchdown, y añadió una carrera de 26 yardas en la primera parte. ${AP} ${SI}`,
        en: `Angeli, making his second straight start after missing time with a lower-body injury, completed 21 of 34 passes for 200 yards and a touchdown, and added a 26-yard run in the first half. ${AP} ${SI}`,
      },
    },
    {
      type: "timeline",
      items: [
        { score: "Syracuse 20–10 SMU", time: { es: "Descanso", en: "Half-time" }, description: { es: "Syracuse domina la primera parte.", en: "Syracuse control the first half." } },
        { score: "Syracuse 20–19 SMU", time: { es: "4.º cuarto, 12:00", en: "4th quarter, 12:00" }, description: { es: "Safety por grounding intencionado de Angeli en su end zone.", en: "Safety on Angeli's intentional grounding in his own end zone." } },
        { score: "SMU 27–20 Syracuse", time: { es: "4.º cuarto, ~9:00", en: "4th quarter, ~9:00" }, description: { es: "Carrera de touchdown de Kendrick Raphael.", en: "Kendrick Raphael touchdown run." } },
        { score: "SMU 27–23 Syracuse", time: { es: "4.º cuarto, 5:26", en: "4th quarter, 5:26" }, description: { es: "Tercer field goal de Tripp Woody.", en: "Tripp Woody's third field goal." } },
        { score: "Syracuse 30–27 SMU", time: { es: "4.º cuarto, 0:17", en: "4th quarter, 0:17" }, description: { es: "Pase de 2 yardas de Angeli a Noah Meyers.", en: "Angeli's 2-yard pass to Noah Meyers." } },
      ],
    },

    { type: "heading", level: 2, id: "cifras", text: { es: "Las cifras que explican la sorpresa", en: "The numbers behind the upset" } },
    {
      type: "paragraph",
      text: {
        es: `Syracuse recuperó dos fumbles de SMU, de Jalen Hale y Randy Pittman Jr., y ganó la batalla de las pérdidas 2-0. ${SI} Solo convirtió 4 de 17 terceros downs ante una de las defensas más eficaces del país en esa situación, pero acertó en sus tres intentos de cuarto down. ${AP}`,
        en: `Syracuse recovered two SMU fumbles, by Jalen Hale and Randy Pittman Jr., and won the turnover battle 2-0. ${SI} They converted only 4 of 17 third downs against one of the country's best defences in that situation, but went 3 for 3 on fourth down. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `SMU sumó 421 yardas, por debajo de su media de 470, y no anotó en varias situaciones cerca de la end zone. Su quarterback, Kevin Jennings, completó 29 de 36 pases para 351 yardas y dos touchdowns, a Jalen Hale y Yamir Knight. ${AP} En la defensa de Syracuse, Demetres Samuel Jr. lideró el partido con 10 placajes y Tunmise Adeleye sumó seis y 1,5 sacks. ${SI}`,
        en: `SMU gained 421 yards, below their 470 average, and came up empty in several goal-line situations. Their quarterback, Kevin Jennings, completed 29 of 36 passes for 351 yards and two touchdowns, to Jalen Hale and Yamir Knight. ${AP} On the Syracuse defence, Demetres Samuel Jr. led the game with 10 tackles and Tunmise Adeleye added six and 1.5 sacks. ${SI}`,
      },
    },

    { type: "heading", level: 2, id: "que-significa", text: { es: "Qué significa", en: "What it means" } },
    {
      type: "paragraph",
      text: {
        es: `La Syracuse de Fran Brown encadena dos victorias y se pone 4-4 (2-4 en la ACC). La clasificación para un bowl, que parecía lejana, vuelve a ser posible. ${AP} El próximo examen es en casa ante Clemson, el sábado 7 de noviembre a las 12:00 ET (18:00 en España), en ESPN2. ${SI} SMU cae a 6-2 (4-2 en la ACC) y recibe a Virginia Tech el próximo viernes. ${AP}`,
        en: `Fran Brown's Syracuse have now won two in a row and are 4-4 (2-4 ACC). A bowl trip, which looked out of reach, is possible again. ${AP} Next up is Clemson at home on Saturday 7 November at 12 pm ET (6 pm in Spain), on ESPN2. ${SI} SMU drop to 6-2 (4-2 ACC) and host Virginia Tech next Friday. ${AP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Si te estás iniciando en el fútbol americano universitario, tenemos una [[link:articles/que-es-el-college-football|guía del college football]] para entender cómo funcionan las conferencias y el playoff.",
        en: "If you are new to college football, our [[link:articles/que-es-el-college-football|college football guide]] explains how conferences and the playoff work.",
      },
    },
  ],
};
