import type { Article } from "@/types";

const FEFA_GB = "[[src:selec-fefa-gb-debut-2026]]";
const AFI_GB = "[[src:selec-afi-gb-2026]]";
const FEFA_GEO = "[[src:selec-fefa-georgia-87-0-2026]]";
const PIRINEO = "[[src:selec-pirineo-georgia-87-0-2026]]";
const STAFF = "[[src:selec-fefa-staff-2026-02-11]]";

/**
 * Spain's first two games of the 2026-27 European Championship (second tier).
 * Every figure comes from the two FEFA match reports; AFI and El Pirineo
 * Aragonés are the second source for each game. The reports do not give
 * yardage, attendance or a full scoring summary, so the article has none.
 */
export const seleccionEuropeoB2026: Article = {
  id: "seleccion-espanola-europeo-b-2026",
  slug: "seleccion-espanola-europeo-b-2026",
  title: {
    es: "146-0: el arranque de la selección española en el Europeo B",
    en: "146-0: Spain's start to the second tier of the European Championship",
  },
  subtitle: {
    es: "España ganó 0-59 en Coventry y 87-0 a Georgia en Jaca en seis días. El 87-0 es el récord anotador de la selección en un partido oficial, y el ascenso se decide en octubre de 2027.",
    en: "Spain won 59-0 in Coventry and 87-0 against Georgia in Jaca within six days. The 87-0 is the national team's scoring record in an official game, and promotion will be decided in October 2027.",
  },
  excerpt: {
    es: "Dos partidos, dos victorias y ningún punto en contra. Así fueron el 0-59 ante el equipo de desarrollo de Gran Bretaña y el 87-0 a Georgia, quién anotó y qué le falta a España para subir al Grupo A europeo.",
    en: "Two games, two wins and no points conceded. This is how the 59-0 over Great Britain's development team and the 87-0 against Georgia unfolded, who scored and what Spain still need to reach Europe's Group A.",
  },
  seo: {
    title: {
      es: "Selección española de fútbol americano: 146-0 en el Europeo B 2026",
      en: "Spain national American football team: 146-0 in the 2026 Euros",
    },
    description: {
      es: "España ganó 0-59 a Gran Bretaña B en Coventry y 87-0 a Georgia en Jaca, récord anotador de la selección. Resultados, anotadores y calendario hacia el ascenso al Grupo A.",
      en: "Spain beat Great Britain's development team 59-0 in Coventry and Georgia 87-0 in Jaca, a national team scoring record. Results, scorers and the road to Group A.",
    },
  },
  authorId: "jordi-sanchez",
  category: "competiciones",
  tags: ["selección española", "Europeo", "IFAF", "FEFA", "Jaca", "Georgia", "Gran Bretaña", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: [],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-21",
  updatedAt: "2026-11-21",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-21",
  readingTimeMinutes: 5,
  sourceIds: [
    "selec-fefa-gb-debut-2026",
    "selec-afi-gb-2026",
    "selec-fefa-georgia-87-0-2026",
    "selec-pirineo-georgia-87-0-2026",
    "selec-fefa-staff-2026-02-11",
    "selec-fefa-masc-irlanda-2022",
    "selec-fefa-masc-israel-2023",
    "sachsen-do-eyo-2026",
    "dresden-masero-torrededia-2026",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Lo esencial", en: "The essentials" },
      text: {
        es: `La selección española absoluta masculina ha ganado sus dos primeros partidos del Europeo B: 0-59 al equipo de desarrollo de Gran Bretaña en Coventry, el 18 de octubre, y 87-0 a Georgia en Jaca, el 24. Lidera el grupo con 146 puntos a favor y ninguno en contra, y no vuelve a jugar un partido oficial hasta octubre de 2027. ${FEFA_GB} ${FEFA_GEO} ${PIRINEO}`,
        en: `Spain's senior men's national team have won their first two games in the second tier of the European Championship: 59-0 over Great Britain's development team in Coventry on 18 October, and 87-0 against Georgia in Jaca on the 24th. They lead the group with 146 points scored and none conceded, and do not play another official game until October 2027. ${FEFA_GB} ${FEFA_GEO} ${PIRINEO}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Es el primer ciclo con Jesús Fernández Pino, «Potas», como seleccionador: la federación anunció el nuevo cuerpo técnico en febrero de 2026. ${STAFF} El grupo lo forman tres equipos, España, Georgia y un combinado de desarrollo sub-25 de Gran Bretaña, y se juega a ida y vuelta entre 2026 y 2027. El objetivo es una plaza en el Grupo A, la máxima categoría continental. ${FEFA_GB} ${FEFA_GEO}`,
        en: `It is the first cycle under head coach Jesús Fernández Pino, known as "Potas": the federation announced the new coaching staff in February 2026. ${STAFF} The group has three teams, Spain, Georgia and a Great Britain under-25 development side, and is played home and away across 2026 and 2027. The target is a place in Group A, the top continental tier. ${FEFA_GB} ${FEFA_GEO}`,
      },
    },

    { type: "heading", level: 2, id: "coventry", text: { es: "Coventry: ocho pases de touchdown", en: "Coventry: eight touchdown passes" } },
    { type: "score", teamA: "Gran Bretaña (desarrollo)", scoreA: 0, teamB: "España", scoreB: 59, status: { es: "Final · 18-10-2026 · Nick Newbold Stadium, Coventry", en: "Final · 18 Oct 2026 · Nick Newbold Stadium, Coventry" } },
    {
      type: "paragraph",
      text: {
        es: `El rival llegaba de ganar 0-61 en Georgia una semana antes, pero el partido quedó decidido en la primera mitad, que España cerró con un 0-35. ${FEFA_GB} Los quarterbacks Iván «Terry» López y Pol Singleton se alternaron al frente del ataque que coordina Óscar Calatayud: López lanzó seis pases de touchdown y Singleton, dos. ${FEFA_GB} ${AFI_GB}`,
        en: `The opponents had won 61-0 in Georgia a week earlier, but the game was settled in the first half, which Spain finished 35-0 up. ${FEFA_GB} Quarterbacks Iván "Terry" López and Pol Singleton took turns running offensive coordinator Óscar Calatayud's unit: López threw six touchdown passes and Singleton two. ${FEFA_GB} ${AFI_GB}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Anotaron Gonzalo Haro, Jorge Melero, Juan Baró, Eloi Soler, Roque Alarcón y Adrián Bermúdez, que con tres touchdowns fue elegido MVP del partido. Alarcón convirtió además los ocho puntos extra que intentó. ${FEFA_GB}`,
        en: `The scorers were Gonzalo Haro, Jorge Melero, Juan Baró, Eloi Soler, Roque Alarcón and Adrián Bermúdez, who was named the game's MVP after three touchdowns. Alarcón also made all eight extra points he attempted. ${FEFA_GB}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La defensa de Ricardo Martín apenas dejó al equipo británico, dirigido por Adam Lillis, cruzar el medio campo, y forzó tres pérdidas que recuperaron Matteo Cusimano, Julio Aguado y Pablo de Diego. En equipos especiales, Yago Sánchez y Kim Vilahur recuperaron el balón en dos kickoffs. ${FEFA_GB} ${AFI_GB}`,
        en: `Ricardo Martín's defence barely let the British side, coached by Adam Lillis, cross midfield, and forced three turnovers recovered by Matteo Cusimano, Julio Aguado and Pablo de Diego. On special teams, Yago Sánchez and Kim Vilahur recovered the ball on two kickoffs. ${FEFA_GB} ${AFI_GB}`,
      },
    },

    { type: "heading", level: 2, id: "jaca", text: { es: "Jaca: 87-0 y récord anotador", en: "Jaca: 87-0 and a scoring record" } },
    { type: "score", teamA: "España", scoreA: 87, teamB: "Georgia", scoreB: 0, status: { es: "Final · 24-10-2026 · Campo municipal de Oroel, Jaca", en: "Final · 24 Oct 2026 · Oroel municipal ground, Jaca" } },
    {
      type: "paragraph",
      text: {
        es: `Seis días después, en el primer partido en casa del ciclo, España ganaba 35-0 al final del primer cuarto y 59-0 al descanso. La segunda mitad sirvió para dar minutos a los menos habituales, que llevaron el marcador hasta el 87-0: la mayor anotación de la selección en un partido oficial. ${FEFA_GEO} ${PIRINEO}`,
        en: `Six days later, in the cycle's first home game, Spain led 35-0 after the first quarter and 59-0 at half-time. The second half was used to give playing time to the squad's less regular players, who took the score to 87-0: the national team's highest total in an official game. ${FEFA_GEO} ${PIRINEO}`,
      },
    },
    {
      type: "timeline",
      items: [
        { score: "España 35–0 Georgia", time: { es: "Final del primer cuarto", en: "End of the first quarter" } },
        { score: "España 59–0 Georgia", time: { es: "Descanso", en: "Half-time" } },
        { score: "España 87–0 Georgia", time: { es: "Final", en: "Final" }, description: { es: "Récord anotador de la selección en un partido oficial.", en: "The national team's scoring record in an official game." } },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: `Jugaron tres quarterbacks: López dio dos pases de touchdown, Singleton otros dos y anotó uno más de carrera, y Juan Baró lanzó uno. Agustín Do Eyo, Gonzalo Haro y Andy Vera anotaron dos touchdowns cada uno, y completaron la lista David Romero, Dani Romero, Jordi Torrededía, Juan Sánchez y Roque Alarcón. ${FEFA_GEO} ${PIRINEO}`,
        en: `Three quarterbacks played: López threw two touchdown passes, Singleton threw two more and ran one in, and Juan Baró threw one. Agustín Do Eyo, Gonzalo Haro and Andy Vera scored two touchdowns each, and David Romero, Dani Romero, Jordi Torrededía, Juan Sánchez and Roque Alarcón completed the list. ${FEFA_GEO} ${PIRINEO}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Alarcón fue el máximo anotador con 19 puntos: un touchdown, un field goal, ocho puntos extra y una conversión de dos puntos. ${FEFA_GEO} ${PIRINEO}`,
        en: `Alarcón was the top scorer with 19 points: a touchdown, a field goal, eight extra points and a two-point conversion. ${FEFA_GEO} ${PIRINEO}`,
      },
    },
    {
      type: "quote",
      text: {
        es: `Hemos demostrado que estamos preparados para competir al más alto nivel de Europa. Me voy, después de estas dos victorias esta semana, con la sensación de haber creado un equipo que, además de la calidad mostrada, todavía tiene mucho margen de mejora. ${FEFA_GEO}`,
        en: `We have shown that we are ready to compete at the highest level in Europe. After these two wins this week, I leave with the feeling that we have built a team which, beyond the quality it has shown, still has a lot of room to improve. ${FEFA_GEO}`,
      },
      attribution: {
        es: "Jesús Fernández, seleccionador, en la crónica de la FEFA",
        en: "Jesús Fernández, head coach, in FEFA's match report (our translation)",
      },
    },

    { type: "heading", level: 2, id: "grupo", text: { es: "Cómo queda el grupo", en: "How the group stands" } },
    {
      type: "list",
      items: [
        {
          es: `España: dos victorias, 146 puntos a favor y 0 en contra. ${FEFA_GEO} ${PIRINEO}`,
          en: `Spain: two wins, 146 points scored and 0 conceded. ${FEFA_GEO} ${PIRINEO}`,
        },
        {
          es: `Gran Bretaña (equipo de desarrollo): una victoria, 0-61 en Georgia, y una derrota, 0-59 ante España. ${FEFA_GB}`,
          en: `Great Britain (development team): one win, 61-0 in Georgia, and one defeat, 59-0 to Spain. ${FEFA_GB}`,
        },
        {
          es: `Georgia: dos derrotas, 0-61 ante Gran Bretaña y 87-0 en Jaca. ${FEFA_GB} ${FEFA_GEO}`,
          en: `Georgia: two defeats, 61-0 to Great Britain and 87-0 in Jaca. ${FEFA_GB} ${FEFA_GEO}`,
        },
      ],
    },

    { type: "heading", level: 2, id: "ascenso", text: { es: "Qué falta para el ascenso", en: "What is left for promotion" } },
    {
      type: "paragraph",
      text: {
        es: `Faltan los dos partidos de vuelta, en octubre de 2027: Gran Bretaña visitará España y la selección viajará a Tiflis para jugar contra Georgia. Todavía no hay fechas ni sede anunciadas para el partido en casa. ${FEFA_GEO} ${PIRINEO}`,
        en: `The two return games remain, in October 2027: Great Britain will visit Spain and the national team will travel to Tbilisi to face Georgia. No dates or venue have been announced yet for the home game. ${FEFA_GEO} ${PIRINEO}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El premio es el Grupo A, donde según la FEFA juegan hoy Austria, Turquía, Bélgica, Finlandia, Gran Bretaña, Italia, Hungría, Polonia, República Checa, Suiza y Dinamarca. ${FEFA_GB} En su anterior participación en el Europeo, España ganó 26-7 a Irlanda en Pinto en octubre de 2022 y perdió 30-23 en Israel en agosto de 2023. [[src:selec-fefa-masc-irlanda-2022]] [[src:selec-fefa-masc-israel-2023]]`,
        en: `The prize is Group A, where according to FEFA Austria, Turkey, Belgium, Finland, Great Britain, Italy, Hungary, Poland, Czechia, Switzerland and Denmark currently play. ${FEFA_GB} In their previous European Championship campaign, Spain beat Ireland 26-7 in Pinto in October 2022 and lost 30-23 in Israel in August 2023. [[src:selec-fefa-masc-irlanda-2022]] [[src:selec-fefa-masc-israel-2023]]`,
      },
    },

    { type: "heading", level: 2, id: "fuera", text: { es: "Internacionales que juegan fuera", en: "Internationals playing abroad" } },
    {
      type: "paragraph",
      text: {
        es: `Dos de los anotadores de Jaca coinciden con nombres de nuestro [[link:articles/jugadores-espanoles-futbol-americano-extranjero-2026|censo de españoles que juegan fuera]]: Agustín Do Eyo y Jordi Torrededía, receptores esta temporada de los Dresden Monarchs, campeones de la liga alemana. [[src:sachsen-do-eyo-2026]] [[src:dresden-masero-torrededia-2026]] Los resultados de todas las selecciones, incluidas la femenina, las de flag y la sub-19, están en la página de la [[link:nationalTeam|selección]].`,
        en: `Two of the scorers in Jaca match names in our [[link:articles/jugadores-espanoles-futbol-americano-extranjero-2026|census of Spaniards playing abroad]]: Agustín Do Eyo and Jordi Torrededía, receivers this season for the Dresden Monarchs, the German league champions. [[src:sachsen-do-eyo-2026]] [[src:dresden-masero-torrededia-2026]] Results for every national team, including the women's, flag and under-19 sides, are on the [[link:nationalTeam|national team]] page.`,
      },
    },
  ],
};
