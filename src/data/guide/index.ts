import type { LocalizedString } from "@/types/common";

export type GlossaryTerm = {
  term: LocalizedString;
  definition: LocalizedString;
};

export type GuideSection = {
  id: string;
  title: LocalizedString;
  paragraphs: LocalizedString[];
};

/**
 * Rules explained here are the universal rules of the game and need no
 * source. Anything about Spanish competitions links to the sourced
 * competition pages instead of restating figures.
 */
export const guideSections: GuideSection[] = [
  {
    id: "partido",
    title: { es: "Cómo funciona un partido", en: "How a game works" },
    paragraphs: [
      {
        es: "Dos equipos de once jugadores. El que tiene el balón (el ataque) intenta avanzar hacia la zona de anotación rival; el otro (la defensa) intenta impedirlo. Cada jugada empieza con el balón parado en el suelo y termina cuando el portador es placado, sale del campo, se anota o el pase cae incompleto.",
        en: "Two teams of eleven players. The one with the ball (the offense) tries to advance towards the opponent's end zone; the other (the defense) tries to stop it. Every play starts with the ball on the ground and ends when the carrier is tackled, steps out of bounds, scores, or a pass falls incomplete.",
      },
      {
        es: "La regla que lo explica todo: el ataque tiene cuatro intentos, llamados downs, para avanzar diez yardas. Si lo consigue, recibe otros cuatro. Si no, el balón pasa al rival. Por eso casi siempre el cuarto intento se usa para despejar el balón lejos (punt) o para intentar un tiro a palos, no para seguir atacando.",
        en: "The rule that explains everything: the offense has four attempts, called downs, to advance ten yards. If it succeeds, it gets four more. If not, the ball goes to the opponent. That is why the fourth attempt is almost always used to kick the ball away (a punt) or to try a kick at goal, not to keep attacking.",
      },
      {
        es: "El partido se divide en cuatro cuartos. El reloj se para en muchas situaciones (pases incompletos, salidas del campo, tiempos muertos), así que un cuarto de doce o quince minutos de juego puede durar bastante más en tiempo real.",
        en: "The game is split into four quarters. The clock stops in many situations (incomplete passes, steps out of bounds, timeouts), so a twelve- or fifteen-minute quarter of play can take considerably longer in real time.",
      },
    ],
  },
  {
    id: "puntos",
    title: { es: "Cómo se anota", en: "How you score" },
    paragraphs: [
      {
        es: "Touchdown, seis puntos: llevar el balón a la zona de anotación o atraparlo dentro de ella. Después del touchdown el equipo elige entre patear un punto extra (un punto) o intentar una jugada desde cerca de la línea de gol para sumar dos. Field goal, tres puntos: chutar el balón entre los palos en cualquier momento, normalmente en cuarto down. Safety, dos puntos para la defensa: placar al atacante dentro de su propia zona de anotación.",
        en: "Touchdown, six points: carry the ball into the end zone or catch it there. After a touchdown the team chooses between kicking an extra point (one point) or running a play from near the goal line for two. Field goal, three points: kick the ball between the uprights at any time, usually on fourth down. Safety, two points for the defense: tackling the ball carrier inside his own end zone.",
      },
    ],
  },
  {
    id: "posiciones",
    title: { es: "Quién es quién en el campo", en: "Who is who on the field" },
    paragraphs: [
      {
        es: "En ataque, el quarterback recibe el balón en cada jugada y decide: lo entrega a un corredor (running back), lo lanza a un receptor (wide receiver o tight end) o corre él mismo. Delante de él, cinco linieros ofensivos bloquean. En defensa, los linieros y linebackers frenan la carrera y presionan al quarterback, y los defensive backs (cornerbacks y safeties) cubren a los receptores.",
        en: "On offense, the quarterback receives the ball on every play and decides: hand it to a runner (running back), throw it to a receiver (wide receiver or tight end) or run himself. In front of him, five offensive linemen block. On defense, the linemen and linebackers stop the run and pressure the quarterback, while the defensive backs (cornerbacks and safeties) cover the receivers.",
      },
      {
        es: "Los equipos especiales entran en patadas: saques iniciales, punts, field goals y sus retornos. En un club amateur español muchos jugadores juegan en dos de las tres unidades.",
        en: "Special teams take the field for kicks: kickoffs, punts, field goals and their returns. In a Spanish amateur club many players play in two of the three units.",
      },
    ],
  },
  {
    id: "flag",
    title: { es: "Tackle y flag: dos formas de jugar", en: "Tackle and flag: two ways to play" },
    paragraphs: [
      {
        es: "El football tackle es el que ves en la NFL: casco, hombreras y placajes. El flag football se juega sin contacto: cada jugador lleva dos cintas en la cintura y la jugada termina cuando el defensor arranca una. Equipos más pequeños (normalmente cinco por lado), campo más corto y sin equipación cara. Es la modalidad que más crece en España y la puerta de entrada más fácil para adultos, mujeres y niños. La mayoría de los clubes del directorio tienen las dos.",
        en: "Tackle football is what you see in the NFL: helmet, shoulder pads and tackling. Flag football is played without contact: each player wears two flags at the waist and the play ends when a defender pulls one off. Smaller teams (usually five a side), a shorter field and no expensive gear. It is the fastest-growing format in Spain and the easiest way in for adults, women and kids. Most clubs in the directory offer both.",
      },
    ],
  },
  {
    id: "ligas",
    title: { es: "Qué ligas existen y cómo encajan", en: "Which leagues exist and how they fit together" },
    paragraphs: [
      {
        es: "En España la federación (FEFA) organiza la LNFA, la liga nacional tackle con una primera categoría de diez equipos y una segunda por grupos territoriales, además de la liga femenina, la Copa de España, las categorías junior y cadete y los campeonatos de flag. Las fichas de cada competición explican el formato con fuentes.",
        en: "In Spain the federation (FEFA) runs the LNFA, the national tackle league with a ten-team top tier and a second tier in territorial groups, plus the women's league, the Copa de España, junior and cadet categories and the flag championships. Each competition page explains the format with sources.",
      },
      {
        es: "En Europa ha habido ligas profesionales con franquicias españolas (Barcelona Dragons, Madrid Bravos); en 2026 no hay ninguna activa. En Estados Unidos conviven el football universitario (NCAA), donde juegan estudiantes y del que nace la tradición del deporte, y la NFL, la liga profesional, que desde 2025 juega un partido al año en Madrid.",
        en: "In Europe there have been professional leagues with Spanish franchises (Barcelona Dragons, Madrid Bravos); none is active in 2026. In the United States college football (NCAA), played by students and the source of the sport's traditions, coexists with the NFL, the professional league, which since 2025 plays one game a year in Madrid.",
      },
    ],
  },
  {
    id: "verlo",
    title: { es: "Cómo ver un partido en España", en: "How to watch a game in Spain" },
    paragraphs: [
      {
        es: "Los partidos de la LNFA se juegan en campos municipales de fútbol o rugby, casi siempre con entrada libre, entre enero y mayo; la Copa de España, en otoño. Busca tu club más cercano en el mapa o en el buscador por ciudad, mira su calendario en la web de la FEFA y preséntate: en la grada hay familia, exjugadores y gente que te explicará lo que no entiendas.",
        en: "LNFA games are played on municipal football or rugby pitches, almost always with free admission, between January and May; the Copa de España in the autumn. Find your nearest club on the map or with the city search, check its schedule on the FEFA website and turn up: the stands are full of family, former players and people who will explain whatever you do not understand.",
      },
    ],
  },
];

export const glossary: GlossaryTerm[] = [
  { term: { es: "Down", en: "Down" }, definition: { es: "Cada intento del ataque. Se tienen cuatro para avanzar diez yardas.", en: "Each attempt by the offense. You get four to gain ten yards." } },
  { term: { es: "Primer down (first down)", en: "First down" }, definition: { es: "Conseguir las diez yardas: el ataque renueva sus cuatro intentos. Es lo que celebra la grada.", en: "Gaining the ten yards: the offense earns a fresh set of four attempts. It is what the crowd cheers." } },
  { term: { es: "Snap", en: "Snap" }, definition: { es: "El pase entre las piernas del center al quarterback con el que empieza cada jugada.", en: "The pass between the center's legs to the quarterback that starts every play." } },
  { term: { es: "Línea de scrimmage", en: "Line of scrimmage" }, definition: { es: "La línea imaginaria donde está el balón antes del snap. Ningún jugador puede cruzarla antes de tiempo.", en: "The imaginary line where the ball sits before the snap. No player may cross it early." } },
  { term: { es: "Touchdown", en: "Touchdown" }, definition: { es: "Seis puntos por llevar o atrapar el balón en la zona de anotación.", en: "Six points for carrying or catching the ball in the end zone." } },
  { term: { es: "Field goal", en: "Field goal" }, definition: { es: "Tres puntos por chutar el balón entre los palos.", en: "Three points for kicking the ball through the uprights." } },
  { term: { es: "Punt", en: "Punt" }, definition: { es: "Despeje en cuarto down para dejar al rival lo más lejos posible de tu zona.", en: "A fourth-down kick to leave the opponent as far as possible from your end zone." } },
  { term: { es: "Fumble", en: "Fumble" }, definition: { es: "Perder el balón en juego. Quien lo recupere, ataca.", en: "Losing the ball in play. Whoever recovers it takes possession." } },
  { term: { es: "Intercepción", en: "Interception" }, definition: { es: "Un defensor atrapa un pase. Cambio de posesión inmediato.", en: "A defender catches a pass. Possession changes immediately." } },
  { term: { es: "Sack", en: "Sack" }, definition: { es: "Placar al quarterback detrás de la línea antes de que lance.", en: "Tackling the quarterback behind the line before he throws." } },
  { term: { es: "Blitz", en: "Blitz" }, definition: { es: "Enviar más defensores de lo habitual a por el quarterback.", en: "Sending more defenders than usual after the quarterback." } },
  { term: { es: "Huddle", en: "Huddle" }, definition: { es: "El corro donde el ataque escucha la jugada antes de alinearse.", en: "The circle where the offense hears the play before lining up." } },
  { term: { es: "Play action", en: "Play action" }, definition: { es: "Fingir una carrera para lanzar un pase.", en: "Faking a run in order to throw a pass." } },
  { term: { es: "Red zone", en: "Red zone" }, definition: { es: "Las últimas veinte yardas antes de la zona de anotación.", en: "The last twenty yards before the end zone." } },
  { term: { es: "Two-minute drill", en: "Two-minute drill" }, definition: { es: "Ataque acelerado, sin huddle, en los últimos minutos de cada mitad.", en: "Hurry-up offense, no huddle, in the last minutes of each half." } },
  { term: { es: "Flag football", en: "Flag football" }, definition: { es: "Modalidad sin contacto: se arranca una cinta en lugar de placar.", en: "Non-contact format: a flag is pulled instead of tackling." } },
  { term: { es: "Spanish Bowl", en: "Spanish Bowl" }, definition: { es: "La final de la LNFA, la liga nacional española.", en: "The final of the LNFA, Spain's national league." } },
  { term: { es: "Homecoming", en: "Homecoming" }, definition: { es: "En el football universitario estadounidense, el partido en casa al que vuelven los antiguos alumnos, con ceremonias y tradiciones propias.", en: "In American college football, the home game former students return to, with its own ceremonies and traditions." } },
];
