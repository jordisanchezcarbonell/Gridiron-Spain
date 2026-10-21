import type { Article } from "@/types";

const NCAA = "[[src:espn-cfb-scoreboard-2026-10-17]] [[src:cbs-cfb-scoreboard-2026-10-17]]";
const NFL = "[[src:espn-nfl-scoreboard-2026-week-6]] [[src:cbs-nfl-scoreboard-2026-week-6]]";
const SELE = "[[src:selec-fefa-gb-debut-2026]] [[src:selec-afi-gb-2026]]";

export const finde20261017: Article = {
  id: "finde-2026-10-17",
  slug: "que-paso-este-finde-2026-10-17",
  title: {
    es: "Qué pasó este finde: España golea 59-0, caen cinco de los siete primeros y los Texans ganan en Wembley",
    en: "Weekend recap: Spain win 59-0, five of the top seven fall and the Texans win at Wembley",
  },
  subtitle: {
    es: "La selección debuta en el Europeo con la mayor victoria de su historia, el college vive su sábado más convulso en 90 años y los Falcons del partido de Madrid pierden en casa.",
    en: "Spain open their European Championship with the biggest win in their history, college football has its wildest Saturday in 90 years and the Falcons of the Madrid game lose at home.",
  },
  excerpt: {
    es: "Los resultados de los partidos de nuestra agenda del 16 al 20 de octubre: la selección en Coventry, el college y la semana 6 de la NFL. Todos los marcadores contrastados en dos fuentes.",
    en: "The results from our 16–20 October agenda: the national team in Coventry, college football and NFL Week 6. Every score confirmed in two sources.",
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
  category: "ncaa",
  tags: ["NCAA", "NFL", "Selección", "Resultados", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs", "nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-21",
  updatedAt: "2026-10-21",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-21",
  readingTimeMinutes: 5,
  sourceIds: [
    "espn-cfb-scoreboard-2026-10-17", "cbs-cfb-scoreboard-2026-10-17",
    "espn-nfl-scoreboard-2026-week-6", "cbs-nfl-scoreboard-2026-week-6",
    "goutsa-navy-2026", "lsusports-mississippi-state-2026", "espn-michigan-penn-state-2026",
    "selec-fefa-gb-debut-2026", "selec-afi-gb-2026", "selec-pirineo-georgia-2026",
    "si-ap-poll-week8-2026", "wtimes-miami-num1-2026",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "Repasamos los partidos que os recomendamos en la agenda del fin de semana. Todos los marcadores están contrastados en dos fuentes. Empezamos por el que más nos toca.",
        en: "Here are the games we picked in last weekend's agenda. Every score is confirmed in two sources. We start with the one closest to home.",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "seleccion",
      text: { es: "España arranca el Europeo con un 59-0", en: "Spain open the European Championship with a 59-0" },
    },
    {
      type: "paragraph",
      text: {
        es: `La selección masculina debutó el domingo en Coventry con un 59-0 al equipo de desarrollo U25 de Gran Bretaña, en el estreno del Campeonato de Europa de Nivel 2. El partido estaba resuelto al descanso: 35-0. ${SELE}`,
        en: `The men's national team opened on Sunday in Coventry with a 59-0 win over Great Britain's U25 development team, in their first game of the Level 2 European Championship. It was settled by half-time: 35-0. ${SELE}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Iván «Terry» López y Pol Singleton se alternaron en la dirección del ataque y firmaron ocho pases de touchdown entre los dos, seis del primero. Adrián Bermúdez anotó tres y fue designado MVP; también llegaron a la zona de anotación Gonzalo Haro, Jorge Melero, Juan Baró, Eloi Soler y Roque Alarcón, que además acertó los ocho puntos extra que intentó. La defensa de Ricardo Martín forzó tres pérdidas y apenas dejó al rival pasar del medio campo. ${SELE}`,
        en: `Iván "Terry" López and Pol Singleton alternated at the controls of the offence and threw eight touchdown passes between them, six from López. Adrián Bermúdez scored three and was named MVP; Gonzalo Haro, Jorge Melero, Juan Baró, Eloi Soler and Roque Alarcón also reached the end zone, and Alarcón converted all eight extra points he attempted. Ricardo Martín's defence forced three turnovers and barely let their opponents past midfield. ${SELE}`,
      },
    },
    {
      type: "callout",
      title: { es: "El sábado, Georgia en Jaca", en: "On Saturday, Georgia in Jaca" },
      text: {
        es: "España juega su primer partido en casa del ciclo el sábado 24 de octubre a las 17:00 en el campo del Oroel, con entrada gratuita. Un apunte para medir al rival: ese mismo equipo de desarrollo británico al que España ganó 59-0 había ganado la semana anterior 61-0 en casa de Georgia.",
        en: "Spain play the first home game of the cycle on Saturday 24 October at 17:00 at the Campo del Oroel, with free entry. One number to size up the opponent: the same British development team Spain beat 59-0 had won 61-0 away at Georgia the week before.",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "college",
      text: { es: "El sábado más convulso en 90 años de ranking", en: "The wildest Saturday in 90 years of the poll" },
    },
    {
      type: "paragraph",
      text: {
        es: `Cinco de los siete primeros del AP Top 25 perdieron el mismo día, algo que no había ocurrido nunca desde que existe la encuesta. Cayeron Georgia (27-24 ante Auburn), Notre Dame (28-24 en BYU), Texas (27-24 ante Florida), Alabama (26-10 en Tennessee) e Indiana, cuya racha de 22 victorias se terminó en el 19-15 ante Ohio State. Miami sobrevivió al derbi ante Florida State por 43-35 en la segunda prórroga. ${NCAA}`,
        en: `Five of the AP Top 25's top seven lost on the same day, something that had never happened in the poll's existence. Georgia fell 27-24 to Auburn, Notre Dame 28-24 at BYU, Texas 27-24 to Florida, Alabama 26-10 at Tennessee, and Indiana's 22-game winning streak ended in a 19-15 loss to Ohio State. Miami survived the derby against Florida State 43-35 in double overtime. ${NCAA}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El lunes el ranking quedó del revés: Miami es n.º 1 por primera vez desde 2002 con 40 de los 70 votos, BYU sube del 8 al 2 y Ohio State es tercero. Texas se desplomó doce puestos hasta el 19. ${"[[src:si-ap-poll-week8-2026]]"} ${"[[src:wtimes-miami-num1-2026]]"}`,
        en: `By Monday the poll was upside down: Miami are No. 1 for the first time since 2002 with 40 of the 70 first-place votes, BYU climb from 8 to 2 and Ohio State are third. Texas slid twelve places to 19. ${"[[src:si-ap-poll-week8-2026]]"} ${"[[src:wtimes-miami-num1-2026]]"}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Los otros tres partidos de la agenda fueron a su aire. LSU dejó a cero al n.º 16, Mississippi State, en Baton Rouge: 31-0, con cuatro pases de touchdown de Sam Leavitt y 289 yardas. ${"[[src:lsusports-mississippi-state-2026]]"} ${NCAA} Y en Ann Arbor, Michigan ganó 21-18 a Penn State con un touchdown de carrera de doce yardas de Tommy Carr, suplente de un Bryce Underwood al que habían sentado, a falta de 2:58. ${"[[src:espn-michigan-penn-state-2026]]"} ${NCAA}`,
        en: `The other three agenda games went their own way. LSU shut out No. 16 Mississippi State in Baton Rouge: 31-0, with four touchdown passes and 289 yards from Sam Leavitt. ${"[[src:lsusports-mississippi-state-2026]]"} ${NCAA} And in Ann Arbor, Michigan beat Penn State 21-18 on a twelve-yard rushing touchdown from Tommy Carr — on for a benched Bryce Underwood — with 2:58 left. ${"[[src:espn-michigan-penn-state-2026]]"} ${NCAA}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "navy",
      text: { es: "Navy se queda a cuatro puntos en el Alamodome", en: "Navy come up four points short at the Alamodome" },
    },
    {
      type: "paragraph",
      text: {
        es: `Navy perdió 38-34 en UTSA y se queda 2-4. Owen McCown lanzó 359 yardas y tres touchdowns por los locales, el definitivo en un pase de 41 yardas a A'Marion Peterson cuando quedaban 2:24. ${"[[src:goutsa-navy-2026]]"} ${NCAA}`,
        en: `Navy lost 38-34 at UTSA and drop to 2-4. Owen McCown threw for 359 yards and three touchdowns for the hosts, the decisive one a 41-yard pass to A'Marion Peterson with 2:24 left. ${"[[src:goutsa-navy-2026]]"} ${NCAA}`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "nfl",
      text: { es: "NFL: los Texans ganan en Wembley y los Falcons pierden en casa", en: "NFL: the Texans win at Wembley and the Falcons lose at home" },
    },
    {
      type: "paragraph",
      text: {
        es: `En el segundo partido de Londres de la temporada, esta vez en Wembley y en abierto en España, los Texans ganaron 34-31 a los Jaguars. ${NFL}`,
        en: `In the season's second London game, this time at Wembley and free-to-air in Spain, the Texans beat the Jaguars 34-31. ${NFL}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Mal fin de semana para uno de los dos equipos del partido de Madrid: los Falcons perdieron 31-23 en casa ante los Bears y se quedan 2-4 a tres semanas de jugar en el Bernabéu. Los Bengals descansaban. ${NFL}`,
        en: `A bad weekend for one of the two Madrid teams: the Falcons lost 31-23 at home to the Bears and sit at 2-4 three weeks before playing at the Bernabéu. The Bengals were on a bye. ${NFL}`,
      },
    },
    {
      type: "list",
      items: [
        { es: "Broncos 17 — Seahawks 14, en la prórroga.", en: "Broncos 17 — Seahawks 14, in overtime." },
        { es: "Chiefs 22 — Chargers 6: Kansas City sigue invicto y los Chargers se quedan 0-6.", en: "Chiefs 22 — Chargers 6: Kansas City stay unbeaten and the Chargers fall to 0-6." },
        { es: "Bills 33 — Raiders 30.", en: "Bills 33 — Raiders 30." },
        { es: "Packers 23 — Cowboys 13, en el Sunday Night de Lambeau Field.", en: "Packers 23 — Cowboys 13, on Sunday Night at Lambeau Field." },
        { es: "49ers 23 — Commanders 17 en el Monday Night.", en: "49ers 23 — Commanders 17 on Monday Night." },
      ],
    },
  ],
};
