import type { Article } from "@/types";

const NCAA = "[[src:espn-cfb-scoreboard-2026-10-03]] [[src:cbs-cfb-scoreboard-2026-10-03]]";
const NFL = "[[src:espn-nfl-scoreboard-2026-week-4]] [[src:cbs-nfl-scoreboard-2026-week-4]]";

export const finde20261003: Article = {
  id: "finde-2026-10-03",
  slug: "que-paso-este-finde-2026-10-03",
  title: {
    es: "Qué pasó este finde: Missouri arrasa a Florida, Dresden destrona a Potsdam y los Colts ganan en Londres",
    en: "Weekend recap: Missouri routs Florida, Dresden dethrone Potsdam and the Colts win in London",
  },
  subtitle: {
    es: "Ohio State gana en Iowa, Navy cae en Air Force, la GFL Bowl corona a un campeón invicto y los dos equipos del partido de Madrid toman caminos opuestos.",
    en: "Ohio State wins at Iowa, Navy falls at Air Force, the GFL Bowl crowns an unbeaten champion and the two Madrid teams go opposite ways.",
  },
  excerpt: {
    es: "Los resultados de los partidos de nuestra agenda del 3 al 5 de octubre: college, la final alemana y la semana 4 de la NFL.",
    en: "The results from our 3–5 October agenda: college football, the German final and NFL Week 4.",
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
  tags: ["NCAA", "NFL", "GFL", "Resultados", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs", "nfl", "gfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-06",
  updatedAt: "2026-10-06",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-06",
  readingTimeMinutes: 4,
  sourceIds: [
    "espn-cfb-scoreboard-2026-10-03", "cbs-cfb-scoreboard-2026-10-03",
    "espn-nfl-scoreboard-2026-week-4", "cbs-nfl-scoreboard-2026-week-4",
    "gfl-bowl-2026-result", "sportschau-gfl-bowl-2026", "lsu-national-rankings-2026-09-27",
  ],
  content: [
    { type: "paragraph", text: { es: "Repasamos los partidos que os recomendamos en la agenda del fin de semana. Todos los marcadores están contrastados en dos fuentes.", en: "Here are the games we picked in last weekend's agenda. Every score is confirmed in two sources." } },

    { type: "heading", level: 2, text: { es: "College: Missouri, la sorpresa del sábado", en: "College: Missouri, Saturday's surprise" } },
    { type: "paragraph", text: { es: `Florida llegaba a Columbia como n.º 8 tras subir trece puestos en una semana [[src:lsu-national-rankings-2026-09-27]], pero Missouri, n.º 25, ganó 45-17. Jamal Roberts corrió 211 yardas y tres touchdowns. ${NCAA}`, en: `Florida came to Columbia at No. 8 after jumping thirteen spots in a week [[src:lsu-national-rankings-2026-09-27]], but No. 25 Missouri won 45–17. Jamal Roberts ran for 211 yards and three touchdowns. ${NCAA}` } },
    { type: "paragraph", text: { es: `En el partido de College GameDay, Ohio State ganó 31-14 en Iowa. Julian Sayin lanzó para 324 yardas y tres touchdowns. ${NCAA}`, en: `In the College GameDay game, Ohio State won 31–14 at Iowa. Julian Sayin threw for 324 yards and three touchdowns. ${NCAA}` } },
    { type: "list", items: [
      { es: "Alabama 56 — Mississippi State 23", en: "Alabama 56 — Mississippi State 23" },
      { es: "Miami 41 — Clemson 13", en: "Miami 41 — Clemson 13" },
      { es: "Notre Dame 37 — North Carolina 26", en: "Notre Dame 37 — North Carolina 26" },
      { es: "Georgia 38 — Vanderbilt 14", en: "Georgia 38 — Vanderbilt 14" },
      { es: "Indiana 47 — Rutgers 15", en: "Indiana 47 — Rutgers 15" },
      { es: "BYU 17 — TCU 10", en: "BYU 17 — TCU 10" },
      { es: "USC 25 — Washington 21", en: "USC 25 — Washington 21" },
    ] },
    { type: "paragraph", text: { es: `El resto de equipos del top 10 que jugaban fuera cumplió: Alabama, Miami, Notre Dame e Indiana ganaron con holgura y BYU sacó un 17-10 en Fort Worth. USC, n.º 18, sufrió para ganar 25-21 a Washington. ${NCAA}`, en: `The other top-10 teams on the road delivered: Alabama, Miami, Notre Dame and Indiana won comfortably and BYU ground out a 17–10 win in Fort Worth. No. 18 USC had to battle to beat Washington 25–21. ${NCAA}` } },

    { type: "heading", level: 2, text: { es: "Navy pierde en Colorado Springs", en: "Navy loses in Colorado Springs" } },
    { type: "paragraph", text: { es: `Air Force ganó 14-9 a Navy en el duelo de academias que cuenta para el Commander-in-Chief's Trophy. El quarterback Liam Szarka anotó los dos touchdowns de los Falcons por tierra. ${NCAA}`, en: `Air Force beat Navy 14–9 in the service-academy game that counts towards the Commander-in-Chief's Trophy. Quarterback Liam Szarka ran in both Falcons touchdowns. ${NCAA}` } },

    { type: "heading", level: 2, text: { es: "GFL Bowl: Dresden, campeón invicto", en: "GFL Bowl: Dresden, unbeaten champions" } },
    { type: "paragraph", text: { es: "Los Dresden Monarchs ganaron 27-19 a los Potsdam Royals (14-6 al descanso) en el Rudolf-Harbig-Stadion y cerraron una temporada sin derrotas. Potsdam buscaba su cuarto título seguido. La GFL cifra la asistencia en 25.016 espectadores, un récord, y eligió MVP al quarterback Rocky Lombardi, que anotó uno de los dos touchdowns de la primera parte. [[src:gfl-bowl-2026-result]] [[src:sportschau-gfl-bowl-2026]]", en: "The Dresden Monarchs beat the Potsdam Royals 27–19 (14–6 at half-time) at the Rudolf-Harbig-Stadion to complete an unbeaten season. Potsdam were chasing a fourth straight title. The GFL puts the record crowd at 25,016 and named quarterback Rocky Lombardi MVP; he scored one of the two first-half touchdowns. [[src:gfl-bowl-2026-result]] [[src:sportschau-gfl-bowl-2026]]" } },

    { type: "heading", level: 2, text: { es: "NFL: los Colts mandan en Londres", en: "NFL: the Colts take London" } },
    { type: "paragraph", text: { es: `En el primer partido europeo de la temporada, los Colts ganaron 30-13 a los Commanders en el Tottenham Hotspur Stadium. Jonathan Taylor corrió 95 yardas y dos touchdowns. ${NFL}`, en: `In the season's first European game, the Colts beat the Commanders 30–13 at Tottenham Hotspur Stadium. Jonathan Taylor ran for 95 yards and two touchdowns. ${NFL}` } },
    { type: "paragraph", text: { es: `Los dos equipos del partido de Madrid del 8 de noviembre vivieron fines de semana opuestos. Los Falcons arrasaron 45-24 a los Saints en el Monday Night, con 145 yardas y dos touchdowns de Bijan Robinson. Los Bengals perdieron 22-17 en casa ante Jacksonville pese a las 428 yardas de pase de Joe Burrow. ${NFL}`, en: `The two Madrid teams for 8 November had opposite weekends. The Falcons routed the Saints 45–24 on Monday Night, with 145 yards and two touchdowns from Bijan Robinson. The Bengals lost 22–17 at home to Jacksonville despite Joe Burrow's 428 passing yards. ${NFL}` } },
    { type: "list", items: [
      { es: "Chiefs 30 — Raiders 27", en: "Chiefs 30 — Raiders 27" },
      { es: "Patriots 29 — Bills 26", en: "Patriots 29 — Bills 26" },
      { es: "49ers 24 — Broncos 14", en: "49ers 24 — Broncos 14" },
      { es: "Panthers 32 — Lions 26", en: "Panthers 32 — Lions 26" },
    ] },
    { type: "paragraph", text: { es: `Los Chiefs siguen invictos tras ganar 30-27 en Las Vegas, con 177 yardas y dos touchdowns de Kenneth Walker III. Los 49ers también siguen sin perder después del 24-14 a Denver. En el Sunday Night, Carolina ganó 32-26 a Detroit con 14 recepciones, 192 yardas y dos touchdowns de Tetairoa McMillan. ${NFL}`, en: `The Chiefs stay unbeaten after a 30–27 win in Las Vegas, with 177 yards and two touchdowns from Kenneth Walker III. The 49ers are also still perfect after beating Denver 24–14. On Sunday Night, Carolina beat Detroit 32–26 behind 14 catches, 192 yards and two touchdowns from Tetairoa McMillan. ${NFL}` } },
  ],
};
