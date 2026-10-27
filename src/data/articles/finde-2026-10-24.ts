import type { Article } from "@/types";

const NCAA = "[[src:espn-cfb-scoreboard-2026-10-24]] [[src:cbs-cfb-scoreboard-2026-10-24]]";
const NFL = "[[src:espn-nfl-scoreboard-2026-week-7]] [[src:cbs-nfl-scoreboard-2026-week-7]]";
const SELE = "[[src:selec-pirineo-georgia-87-0-2026]] [[src:selec-jacatimes-georgia-2026]]";

export const finde20261024: Article = {
  id: "finde-2026-10-24",
  slug: "que-paso-este-finde-2026-10-24",
  title: {
    es: "Qué pasó este finde: España golea 87-0, los Falcons tumban a los 49ers y los Steelers ganan en París",
    en: "Weekend recap: Spain win 87-0, the Falcons topple the 49ers and the Steelers win in Paris",
  },
  subtitle: {
    es: "Récord anotador de la selección en Jaca, los dos equipos del Bernabéu ganan a dos semanas de Madrid y el college deja a Miami más n.º 1 que nunca.",
    en: "A national-team scoring record in Jaca, both Bernabéu teams win two weeks out from Madrid and college football leaves Miami more firmly No. 1 than ever.",
  },
  excerpt: {
    es: "Los resultados de los partidos de nuestra agenda del 24 al 26 de octubre: la selección ante Georgia, el college y la semana 7 de la NFL. Todos los marcadores contrastados en dos fuentes.",
    en: "The results from our 24–26 October agenda: the national team against Georgia, college football and NFL Week 7. Every score confirmed in two sources.",
  },
  heroImage: {
    url: "/images/editorial/college-football-stadium.png",
    alt: { es: "Estadio universitario lleno durante un partido de fútbol americano al atardecer.", en: "A full college stadium during an American football game at dusk." },
    width: 1672,
    height: 941,
    photographer: "Gridiron Spain · imagen editorial generada",
    license: "Uso editorial de Gridiron Spain",
  },
  authorId: "jordi-sanchez",
  category: "nfl",
  tags: ["NFL", "NCAA", "Selección", "Resultados", "NFL Madrid", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["nfl", "ncaa-fbs"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-27",
  updatedAt: "2026-10-27",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-27",
  readingTimeMinutes: 5,
  sourceIds: [
    "selec-pirineo-georgia-87-0-2026", "selec-jacatimes-georgia-2026",
    "espn-nfl-scoreboard-2026-week-7", "cbs-nfl-scoreboard-2026-week-7",
    "yahoo-falcons-49ers-2026", "espn-falcons-daniels-2026", "bengals-ravens-recap-2026",
    "cbs-pittsburgh-paris-2026", "saints-paris-recap-2026", "steelers-paris-recap-2026",
    "espn-cfb-scoreboard-2026-10-24", "cbs-cfb-scoreboard-2026-10-24", "navy-north-texas-recap-2026",
    "espn-cfb-rankings-week9-2026", "cbs-ap-poll-week9-2026",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "Repasamos los partidos que os recomendamos en la agenda del fin de semana. Todos los marcadores están contrastados en dos fuentes. Empezamos, otra vez, por la selección.",
        en: "Here are the games we picked in last weekend's agenda. Every score is confirmed in two sources. Once again, we start with the national team.",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "seleccion",
      text: { es: "España 87, Georgia 0: récord en Jaca", en: "Spain 87, Georgia 0: a record in Jaca" },
    },
    {
      type: "paragraph",
      text: {
        es: `Una semana después del 59-0 de Coventry, la selección masculina jugó en casa por primera vez en el ciclo y ganó 87-0 a Georgia en el campo del Oroel. Es la mayor anotación de España en un partido oficial. Al final del primer cuarto ya ganaba 35-0 y al descanso, 59-0. ${SELE}`,
        en: `A week after the 59-0 in Coventry, the men's team played at home for the first time in the cycle and beat Georgia 87-0 at the Campo del Oroel. It is the highest score Spain have ever put up in an official game. It was 35-0 after the first quarter and 59-0 at half-time. ${SELE}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Iván «Terry» López, Pol Singleton y Juan Baró lanzaron pases de touchdown; Agustín Do Eyo, Gonzalo Haro y Andy Vera anotaron dos cada uno. Roque Alarcón fue el máximo anotador con 19 puntos. España lidera el Europeo de Nivel 2 con dos victorias, 146 puntos a favor y ninguno en contra, y no vuelve a jugar un partido oficial hasta octubre de 2027, cuando recibirá a Gran Bretaña y visitará Tiflis. ${SELE}`,
        en: `Iván "Terry" López, Pol Singleton and Juan Baró threw touchdown passes; Agustín Do Eyo, Gonzalo Haro and Andy Vera scored two each. Roque Alarcón was the top scorer with 19 points. Spain lead the Level 2 European Championship with two wins, 146 points scored and none conceded, and do not play another official game until October 2027, when they host Great Britain and visit Tbilisi. ${SELE}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "madrid",
      text: { es: "Los dos equipos del Bernabéu ganan", en: "Both Bernabéu teams win" },
    },
    {
      type: "paragraph",
      text: {
        es: `A dos semanas del partido de Madrid, los Falcons dieron la campanada: 29-20 a los 49ers, que llegaban invictos. Michael Penix Jr. lanzó tres pases de touchdown sin intercepciones y la defensa forzó cuatro pérdidas. La última, una intercepción a Brock Purdy en el último cuarto del rookie Kendal Daniels, que una semana antes había salido del campo en camilla con una lesión de cuello. Atlanta se pone 3-4. ${NFL} ${"[[src:yahoo-falcons-49ers-2026]]"} ${"[[src:espn-falcons-daniels-2026]]"}`,
        en: `Two weeks out from the Madrid game, the Falcons pulled off the upset: 29-20 over the previously unbeaten 49ers. Michael Penix Jr. threw three touchdown passes without an interception and the defence forced four turnovers. The last was a fourth-quarter interception of Brock Purdy by rookie Kendal Daniels, who had left the field on a stretcher with a neck injury a week earlier. Atlanta move to 3-4. ${NFL} ${"[[src:yahoo-falcons-49ers-2026]]"} ${"[[src:espn-falcons-daniels-2026]]"}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Bengals, que volvían de su semana de descanso, perdían 13-0 al descanso en Baltimore y acabaron ganando 35-13 con 35 puntos seguidos. Joe Burrow lanzó sus cuatro touchdowns en la segunda parte, en la que completó 16 de 18 pases, y Tee Higgins sumó 148 yardas. Cincinnati va 4-2. ${NFL} ${"[[src:bengals-ravens-recap-2026]]"}`,
        en: `The Bengals, back from their bye, trailed 13-0 at half-time in Baltimore and won 35-13 with 35 unanswered points. Joe Burrow threw all four of his touchdowns after the break, when he completed 16 of 18 passes, and Tee Higgins had 148 yards. Cincinnati are 4-2. ${NFL} ${"[[src:bengals-ravens-recap-2026]]"}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "nfl",
      text: { es: "NFL: los Steelers estrenan París y los Chiefs caen", en: "NFL: the Steelers christen Paris and the Chiefs fall" },
    },
    {
      type: "paragraph",
      text: {
        es: `En el primer partido de la NFL en París, los Steelers ganaron 16-10 a los Saints ante 78.488 espectadores en el Stade de France. Chris Boswell marcó tres field goals y Aaron Rodgers lanzó el único touchdown de Pittsburgh, a Darnell Washington; en el tercer cuarto, Payton Wilson interceptó a Tyler Shough cerca de la zona de anotación. ${NFL} ${"[[src:cbs-pittsburgh-paris-2026]]"} ${"[[src:saints-paris-recap-2026]]"} ${"[[src:steelers-paris-recap-2026]]"}`,
        en: `In the NFL's first game in Paris, the Steelers beat the Saints 16-10 in front of 78,488 fans at the Stade de France. Chris Boswell kicked three field goals and Aaron Rodgers threw Pittsburgh's only touchdown, to Darnell Washington; in the third quarter Payton Wilson intercepted Tyler Shough near the goal line. ${NFL} ${"[[src:cbs-pittsburgh-paris-2026]]"} ${"[[src:saints-paris-recap-2026]]"} ${"[[src:steelers-paris-recap-2026]]"}`,
      },
    },
    {
      type: "list",
      items: [
        { es: "Seahawks 20 — Chiefs 3, en el Sunday Night: primera derrota de Kansas City (5-1).", en: "Seahawks 20 — Chiefs 3, on Sunday Night: Kansas City's first loss (5-1)." },
        { es: "Lions 20 — Packers 17.", en: "Lions 20 — Packers 17." },
        { es: "Rams 35 — Raiders 21.", en: "Rams 35 — Raiders 21." },
        { es: "Cowboys 38 — Eagles 21, en el Monday Night.", en: "Cowboys 38 — Eagles 21, on Monday Night." },
      ],
    },

    {
      type: "heading",
      level: 2,
      id: "college",
      text: { es: "College: Miami arrasa, BYU y Texas Tech caen", en: "College: Miami roll, BYU and Texas Tech fall" },
    },
    {
      type: "paragraph",
      text: {
        es: `En su estreno como n.º 1, Miami ganó 52-23 a Pittsburgh. BYU, n.º 2, perdió 39-31 en UCF en la doble prórroga, y Texas Tech cayó 37-24 en Cincinnati. Indiana se rehízo de su primera derrota ganando 13-6 en Michigan en la prórroga, y UCLA siguió invicto con un 28-10 a Michigan State. ${NCAA}`,
        en: `In their first game as No. 1, Miami beat Pittsburgh 52-23. No. 2 BYU lost 39-31 at UCF in double overtime and Texas Tech fell 37-24 at Cincinnati. Indiana bounced back from their first loss with a 13-6 overtime win at Michigan, and UCLA stayed unbeaten with a 28-10 win over Michigan State. ${NCAA}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `En Austin, Texas ganó 34-27 a Ole Miss, y en el partido de College GameDay, Utah ganó 21-13 a Houston y sigue invicto (7-0). El domingo, Utah subió del 10 al 6 en el AP Top 25 y Texas del 19 al 11. ${NCAA} ${"[[src:espn-cfb-rankings-week9-2026]]"} ${"[[src:cbs-ap-poll-week9-2026]]"}`,
        en: `In Austin, Texas beat Ole Miss 34-27, and in College GameDay's game Utah beat Houston 21-13 to stay unbeaten (7-0). On Sunday Utah climbed from 10 to 6 in the AP Top 25 and Texas from 19 to 11. ${NCAA} ${"[[src:espn-cfb-rankings-week9-2026]]"} ${"[[src:cbs-ap-poll-week9-2026]]"}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "navy",
      text: { es: "Navy pierde su Homecoming", en: "Navy lose their Homecoming game" },
    },
    {
      type: "paragraph",
      text: {
        es: `North Texas ganó 49-39 en Annapolis. Navy llegó a perder por 18 puntos y se acercó a tres, 42-39, con un touchdown de Michael Barrow a falta de 10:49, pero 71 segundos después Jahiem White se fue 59 yardas para el definitivo. Jackson Gutierrez corrió 228 yardas con tres touchdowns. Navy se queda 2-5 antes de medirse a Notre Dame el sábado en Foxborough. ${"[[src:navy-north-texas-recap-2026]]"} ${"[[src:cbs-cfb-scoreboard-2026-10-24]]"}`,
        en: `North Texas won 49-39 in Annapolis. Navy trailed by as many as 18 and got within three, 42-39, on a Michael Barrow touchdown with 10:49 left, but 71 seconds later Jahiem White broke a 59-yard run to settle it. Jackson Gutierrez ran for 228 yards and three touchdowns. Navy drop to 2-5 ahead of Saturday's game against Notre Dame in Foxborough. ${"[[src:navy-north-texas-recap-2026]]"} ${"[[src:cbs-cfb-scoreboard-2026-10-24]]"}`,
      },
    },
  ],
};
