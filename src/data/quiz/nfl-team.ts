import type { LocalizedString } from "@/types";

/**
 * "¿Qué equipo de la NFL deberías seguir?" — a light game, not analysis.
 * Results are limited to teams with a verified link to Spain, and every fact in
 * a result cites a source already in src/data/sources. Questions are personal
 * preferences, so the scoring itself makes no factual claim.
 */

export type QuizTeamId = "falcons" | "bengals" | "dolphins" | "commanders" | "chiefs" | "bears";

export type QuizResult = {
  id: QuizTeamId;
  name: string;
  city: string;
  /** Brand colour for the result card and share image. */
  color: string;
  tagline: LocalizedString;
  /** Sourced facts about the team's link to Spain and its 2026 season. */
  facts: LocalizedString[];
  sourceIds: string[];
};

export type QuizQuestion = {
  id: string;
  text: LocalizedString;
  options: { text: LocalizedString; teams: QuizTeamId[] }[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    text: { es: "¿Qué buscas en un equipo?", en: "What do you want from a team?" },
    options: [
      { text: { es: "Que gane ya, sin esperar", en: "Winning now, no waiting" }, teams: ["chiefs", "bengals"] },
      { text: { es: "Un proyecto que empieza y crecer con él", en: "A new project to grow with" }, teams: ["falcons", "commanders"] },
      { text: { es: "Historia, tradición y estadio con solera", en: "History, tradition and an old-school stadium" }, teams: ["bears"] },
      { text: { es: "Sol, playa y espectáculo", en: "Sun, beach and showtime" }, teams: ["dolphins"] },
    ],
  },
  {
    id: "weather",
    text: { es: "Domingo de partido: ¿frío o calor?", en: "Game day: cold or warm?" },
    options: [
      { text: { es: "Calor, siempre calor", en: "Warm, always warm" }, teams: ["dolphins", "falcons"] },
      { text: { es: "Frío de verdad, con nieve si hace falta", en: "Proper cold, snow if needed" }, teams: ["bears", "chiefs"] },
      { text: { es: "Me da igual, voy a verlo en el sofá", en: "Whatever, I'm on the sofa" }, teams: ["commanders", "bengals"] },
    ],
  },
  {
    id: "player",
    text: { es: "¿Qué jugada te levanta del sofá?", en: "Which play gets you off the sofa?" },
    options: [
      { text: { es: "Un pase de 50 yardas a la end zone", en: "A 50-yard throw into the end zone" }, teams: ["bengals", "chiefs"] },
      { text: { es: "Un corredor que no hay quien pare", en: "A running back nobody can stop" }, teams: ["falcons"] },
      { text: { es: "Un placaje que se oye desde la grada", en: "A hit you can hear from the stands" }, teams: ["bears", "commanders"] },
      { text: { es: "Una jugada rápida y llena de velocidad", en: "A fast play full of speed" }, teams: ["dolphins"] },
    ],
  },
  {
    id: "spain",
    text: { es: "¿Qué vínculo con España te tira más?", en: "Which link to Spain appeals to you?" },
    options: [
      { text: { es: "Que juegue en el Bernabéu este año", en: "Playing at the Bernabéu this year" }, teams: ["falcons", "bengals"] },
      { text: { es: "Que ya haya jugado en Madrid", en: "Having already played in Madrid" }, teams: ["dolphins", "commanders"] },
      { text: { es: "Que la NFL lo promocione en España", en: "Being promoted by the NFL in Spain" }, teams: ["chiefs", "bears", "dolphins"] },
    ],
  },
  {
    id: "city",
    text: { es: "¿Gran ciudad o ciudad más tranquila?", en: "Big city or a quieter one?" },
    options: [
      { text: { es: "Gran ciudad, mucho ruido", en: "Big city, lots of noise" }, teams: ["bears", "commanders", "dolphins", "falcons"] },
      { text: { es: "Ciudad más tranquila, afición de toda la vida", en: "Quieter city, lifelong fans" }, teams: ["bengals", "chiefs"] },
    ],
  },
  {
    id: "underdog",
    text: { es: "¿Con quién vas en una final?", en: "Who do you back in a final?" },
    options: [
      { text: { es: "Con el favorito, sin complejos", en: "The favourite, no shame" }, teams: ["chiefs"] },
      { text: { es: "Con el que nadie esperaba", en: "The one nobody expected" }, teams: ["bengals", "falcons"] },
      { text: { es: "Con el que tenga más afición", en: "The one with the biggest fan base" }, teams: ["bears", "dolphins", "commanders"] },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    id: "falcons",
    name: "Atlanta Falcons",
    city: "Atlanta",
    color: "#a71930",
    tagline: { es: "El local del Bernabéu", en: "The Bernabéu home team" },
    facts: [
      { es: "Son el equipo local del partido de Madrid: domingo 8 de noviembre de 2026, 15:30, contra los Bengals. [[src:madrid26-falcons-announcement]]", en: "They are the home team for the Madrid game: Sunday 8 November 2026, 3:30 pm, against the Bengals. [[src:madrid26-falcons-announcement]]" },
      { es: "Estrenan entrenador, Kevin Stefanski, y su primera victoria con él fue un 35-14 en Green Bay con 194 yardas de carrera de Bijan Robinson. [[src:madrid26-ajc-falcons-packers]]", en: "They have a new head coach, Kevin Stefanski, whose first win was a 35-14 at Green Bay with 194 rushing yards from Bijan Robinson. [[src:madrid26-ajc-falcons-packers]]" },
    ],
    sourceIds: ["madrid26-falcons-announcement", "madrid26-ajc-falcons-packers"],
  },
  {
    id: "bengals",
    name: "Cincinnati Bengals",
    city: "Cincinnati",
    color: "#fb4f14",
    tagline: { es: "Los visitantes del 8-N", en: "The 8 November visitors" },
    facts: [
      { es: "Visitan el Bernabéu el 8 de noviembre: será su tercer partido fuera de Estados Unidos y el primero desde 2019. [[src:madrid26-bengals-press-release]]", en: "They visit the Bernabéu on 8 November: their third game outside the United States and the first since 2019. [[src:madrid26-bengals-press-release]]" },
      { es: "Su quarterback es Joe Burrow y su entrenador, Zac Taylor. [[src:madrid26-ap-steelers-bengals]]", en: "Their quarterback is Joe Burrow and their head coach Zac Taylor. [[src:madrid26-ap-steelers-bengals]]" },
    ],
    sourceIds: ["madrid26-bengals-press-release", "madrid26-ap-steelers-bengals"],
  },
  {
    id: "dolphins",
    name: "Miami Dolphins",
    city: "Miami",
    color: "#008e97",
    tagline: { es: "Los primeros en ganar en Madrid", en: "The first winners in Madrid" },
    facts: [
      { es: "Ganaron el primer partido de la NFL en España: 16-13 a los Commanders en el Bernabéu, el 16 de noviembre de 2025, ante 78.610 espectadores. [[src:espn-madrid-recap-2025]]", en: "They won the NFL's first game in Spain: 16-13 over the Commanders at the Bernabéu on 16 November 2025, in front of 78,610 fans. [[src:espn-madrid-recap-2025]]" },
      { es: "Son uno de los tres equipos con los derechos de marketing de la NFL en España. [[src:madrid26-ap-falcons-madrid]]", en: "They are one of three teams holding the NFL's marketing rights in Spain. [[src:madrid26-ap-falcons-madrid]]" },
    ],
    sourceIds: ["espn-madrid-recap-2025", "madrid26-ap-falcons-madrid"],
  },
  {
    id: "commanders",
    name: "Washington Commanders",
    city: "Washington",
    color: "#5a1414",
    tagline: { es: "Pioneros del Bernabéu", en: "Bernabéu pioneers" },
    facts: [
      { es: "Jugaron el primer partido de la NFL en España, en el Bernabéu en noviembre de 2025 (13-16 ante los Dolphins). [[src:espn-madrid-recap-2025]]", en: "They played in the NFL's first game in Spain, at the Bernabéu in November 2025 (13-16 to the Dolphins). [[src:espn-madrid-recap-2025]]" },
      { es: "En 2026 vuelven a Europa: Colts–Commanders en el Tottenham Hotspur Stadium de Londres, en la Semana 4. [[src:colts-london-2026]]", en: "In 2026 they are back in Europe: Colts–Commanders at Tottenham Hotspur Stadium in London, in Week 4. [[src:colts-london-2026]]" },
    ],
    sourceIds: ["espn-madrid-recap-2025", "colts-london-2026"],
  },
  {
    id: "chiefs",
    name: "Kansas City Chiefs",
    city: "Kansas City",
    color: "#e31837",
    tagline: { es: "Uno de los equipos de la NFL en España", en: "One of the NFL's teams in Spain" },
    facts: [
      { es: "Son uno de los tres equipos con los derechos de marketing de la NFL en España. [[src:madrid26-ap-falcons-madrid]]", en: "They are one of three teams holding the NFL's marketing rights in Spain. [[src:madrid26-ap-falcons-madrid]]" },
      { es: "Sus partidos salen en abierto en Mediaset: en la Semana 4, el Chiefs–Raiders se emite en Mediaset Infinity. [[src:eldesmarque-mediaset-nfl-week4-2026]]", en: "Their games air free-to-air on Mediaset: in Week 4, Chiefs–Raiders airs on Mediaset Infinity. [[src:eldesmarque-mediaset-nfl-week4-2026]]" },
    ],
    sourceIds: ["madrid26-ap-falcons-madrid", "eldesmarque-mediaset-nfl-week4-2026"],
  },
  {
    id: "bears",
    name: "Chicago Bears",
    city: "Chicago",
    color: "#0b162a",
    tagline: { es: "Tradición con acento español", en: "Tradition with a Spanish accent" },
    facts: [
      { es: "Son uno de los tres equipos con los derechos de marketing de la NFL en España, junto a Dolphins y Chiefs. [[src:madrid26-ap-falcons-madrid]]", en: "They are one of three teams holding the NFL's marketing rights in Spain, alongside the Dolphins and Chiefs. [[src:madrid26-ap-falcons-madrid]]" },
    ],
    sourceIds: ["madrid26-ap-falcons-madrid"],
  },
];

/** Tally answers; ties go to the team listed first in the winning options. */
export function scoreQuiz(answers: number[]): QuizTeamId {
  const tally = new Map<QuizTeamId, number>();
  answers.forEach((choice, i) => {
    for (const team of quizQuestions[i]?.options[choice]?.teams ?? []) tally.set(team, (tally.get(team) ?? 0) + 1);
  });
  return [...tally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "falcons";
}
