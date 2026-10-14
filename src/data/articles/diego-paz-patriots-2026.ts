import type { Article } from "@/types";

const AFLE = "[[src:afle-paz-patriots-2026]] [[src:afle-paz-breakout-2026]]";
const PROFILE = "[[src:afle-paz-profile-2026]]";
const WORKOUT = "[[src:yahoo-paz-patriots-2026]] [[src:football-austria-paz-2026]]";

export const diegoPazPatriots2026: Article = {
  id: "diego-paz-patriots-2026",
  slug: "diego-paz-prueba-new-england-patriots",
  title: {
    es: "Un español se prueba con los Patriots: Diego Paz, de los Barcelona Dragons a Foxborough",
    en: "A Spaniard works out for the Patriots: Diego Paz, from the Barcelona Dragons to Foxborough",
  },
  subtitle: {
    es: "El defensive end gallego, de 23 años y mejor jugador defensivo revelación de la AFLE con Rhein Fire, entrenó el lunes 12 de octubre ante los técnicos de New England. No hay contrato anunciado.",
    en: "The 23-year-old Galician defensive end, the AFLE's Most Improved Defensive Player with Rhein Fire, worked out in front of New England's staff on Monday 12 October. No contract has been announced.",
  },
  excerpt: {
    es: "Diego Paz González empezó a los 19 años en los Barcelona Dragons, pasó por Finlandia y Austria y ha acabado la temporada de la AFLE con 8,5 sacks. El lunes se probó con los New England Patriots a través del International Player Pathway.",
    en: "Diego Paz González started at 19 with the Barcelona Dragons, moved through Finland and Austria and finished the AFLE season with 8.5 sacks. On Monday he worked out for the New England Patriots through the International Player Pathway.",
  },
  seo: {
    title: {
      es: "Diego Paz, el español que se ha probado con los New England Patriots",
      en: "Diego Paz, the Spaniard who worked out for the New England Patriots",
    },
    description: {
      es: "Quién es Diego Paz González: edad, trayectoria, números en la AFLE con Rhein Fire y qué significa su prueba con los New England Patriots del 12 de octubre de 2026.",
      en: "Who Diego Paz González is: age, career path, his AFLE numbers with Rhein Fire and what his 12 October 2026 workout with the New England Patriots means.",
    },
  },
  authorId: "jordi-sanchez",
  category: "nfl",
  tags: ["NFL", "New England Patriots", "Españoles", "AFLE", "Rhein Fire", "International Player Pathway"],
  relatedTeamIds: ["barcelona-dragons-elf"],
  relatedCompetitionIds: ["nfl", "afle"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-14",
  updatedAt: "2026-10-14",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-14",
  readingTimeMinutes: 4,
  sourceIds: [
    "afle-paz-patriots-2026",
    "afle-paz-breakout-2026",
    "afle-paz-profile-2026",
    "yahoo-paz-patriots-2026",
    "football-austria-paz-2026",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Lo que está confirmado y lo que no", en: "What is confirmed and what is not" },
      text: {
        es: `Los New England Patriots probaron a Diego Paz González el lunes 12 de octubre. Es una prueba, no un fichaje: a 14 de octubre no hay ningún contrato anunciado. ${WORKOUT}`,
        en: `The New England Patriots worked out Diego Paz González on Monday 12 October. It was a workout, not a signing: as of 14 October no contract has been announced. ${WORKOUT}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Un defensive end español de 23 años entrenó el lunes delante de los ojeadores y el cuerpo técnico de los New England Patriots. La prueba la adelantó Mike Reiss, de ESPN, y se produjo dentro del International Player Pathway, el programa con el que la NFL busca jugadores fuera de Estados Unidos y Canadá. Según la propia AFLE, Paz es el primer español nativo que se presenta en persona ante un equipo de la NFL por esa vía. ${WORKOUT}`,
        en: `A 23-year-old Spanish defensive end worked out on Monday in front of the New England Patriots' scouts and coaching staff. ESPN's Mike Reiss broke the news, and the workout came through the International Player Pathway, the NFL's programme for finding players outside the United States and Canada. According to the AFLE itself, Paz is the first native Spaniard to present himself in person to an NFL team by that route. ${WORKOUT}`,
      },
    },
    { type: "heading", level: 2, id: "quien-es", text: { es: "Quién es Diego Paz", en: "Who Diego Paz is" } },
    {
      type: "paragraph",
      text: {
        es: `Diego Paz González nació el 4 de enero de 2003 en Galicia. Mide 1,91 y pesa 101 kilos, y juega con el dorsal 92 en el Rhein Fire alemán. ${PROFILE} Llegó tarde al deporte: se puso un casco por primera vez en una cancha europea a los 19 años, con los Barcelona Dragons, y de ahí pasó por Finlandia y Austria antes de fichar por el Fire. ${AFLE}`,
        en: `Diego Paz González was born on 4 January 2003 in Galicia. He is 1.91 m and 101 kg, and wears number 92 for Germany's Rhein Fire. ${PROFILE} He came to the sport late: he first stepped onto a European field at 19, with the Barcelona Dragons, and from there went through Finland and Austria before joining the Fire. ${AFLE}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La temporada 2026 de la AFLE fue la de su explosión. En doce partidos sumó 40 tackles —14 en solitario—, 8,5 sacks, cinco tackles para pérdida, cuatro pases desviados y una intercepción que devolvió para touchdown ante los Vienna Vikings. ${PROFILE} [[src:football-austria-paz-2026]] La liga le dio el premio de mejor jugador defensivo revelación en sus AFLE Honors de 2026. ${AFLE}`,
        en: `The 2026 AFLE season was his breakout. In twelve games he put up 40 tackles —14 solo—, 8.5 sacks, five tackles for loss, four passes defensed and an interception he returned for a touchdown against the Vienna Vikings. ${PROFILE} [[src:football-austria-paz-2026]] The league named him Most Improved Defensive Player of the Year at its 2026 AFLE Honors. ${AFLE}`,
      },
    },
    { type: "heading", level: 2, id: "por-que-ahora", text: { es: "Por qué los Patriots y por qué ahora", en: "Why the Patriots and why now" } },
    {
      type: "paragraph",
      text: {
        es: `New England no mira a Europa por casualidad. Su grupo de pass rushers está tocado por las lesiones —con la ausencia de Harold Landry III y la lesión reciente de Dre'Mont Jones— y los Patriots evaluaron a Paz como posible fondo de armario para esa posición. ${WORKOUT} La AFLE añade que la decisión sobre si le ofrecen contrato esta misma temporada se tomaría a corto plazo. [[src:football-austria-paz-2026]]`,
        en: `New England is not looking to Europe by accident. Its pass-rush group has been hit by injuries —with Harold Landry III out and Dre'Mont Jones recently injured— and the Patriots assessed Paz as possible depth there. ${WORKOUT} The AFLE adds that a decision on whether to offer him a contract this season was expected shortly. [[src:football-austria-paz-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Conviene medir las palabras: una prueba de un día no es un fichaje, y la mayoría de los jugadores que pasan por un workout no acaban en la plantilla. Pero es el paso más cerca de la NFL que ha dado un futbolista formado en España en los últimos años, y lo ha dado desde un club de Barcelona, una liga europea y un premio ganado en el campo. Seguimos la historia y la actualizaremos solo cuando haya algo firmado.`,
        en: `It is worth measuring the words: a one-day workout is not a signing, and most players who go through one do not end up on the roster. But it is the closest a player developed in Spain has come to the NFL in recent years, and he got there from a Barcelona club, a European league and an award won on the field. We are following the story and will update it only when something is signed.`,
      },
    },
  ],
};
