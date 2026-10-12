import type { Article } from "@/types";

const NCAA = "[[src:espn-cfb-scoreboard-2026-10-10]] [[src:cbs-cfb-scoreboard-2026-10-10]]";
const NFL = "[[src:espn-nfl-scoreboard-2026-week-5]] [[src:cbs-nfl-scoreboard-2026-week-5]]";

export const finde20261010: Article = {
  id: "finde-2026-10-10",
  slug: "que-paso-este-finde-2026-10-10",
  title: {
    es: "Qué pasó este finde: Georgia gana en Alabama, Oklahoma tumba a Texas y los Jaguars ganan en Londres",
    en: "Weekend recap: Georgia win at Alabama, Oklahoma topple Texas and the Jaguars win in London",
  },
  subtitle: {
    es: "Georgia es el nuevo n.º 1, UCLA sorprende en Oregon, Kentucky gana a LSU en la prórroga y los dos equipos del partido de Madrid vuelven a tomar caminos opuestos.",
    en: "Georgia are the new No. 1, UCLA stun Oregon, Kentucky beat LSU in overtime and the two Madrid teams go opposite ways again.",
  },
  excerpt: {
    es: "Los resultados de los partidos de nuestra agenda del 10 y 11 de octubre: college y la semana 5 de la NFL.",
    en: "The results from our 10–11 October agenda: college football and NFL Week 5.",
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
  tags: ["NCAA", "NFL", "Resultados", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs", "nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-12",
  updatedAt: "2026-10-12",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-12",
  readingTimeMinutes: 4,
  sourceIds: [
    "espn-cfb-scoreboard-2026-10-10", "cbs-cfb-scoreboard-2026-10-10",
    "espn-nfl-scoreboard-2026-week-5", "cbs-nfl-scoreboard-2026-week-5",
    "lsu-national-rankings-2026-10-04", "yahoo-ap-poll-week7-2026", "espn-cfb-rankings-week7-2026",
  ],
  content: [
    { type: "paragraph", text: { es: "Repasamos los partidos que os recomendamos en la agenda del fin de semana. Todos los marcadores están contrastados en dos fuentes. El Monday Night entre Bills y Rams se juega la madrugada del lunes al martes y queda fuera de este repaso.", en: "Here are the games we picked in last weekend's agenda. Every score is confirmed in two sources. Monday Night's Bills–Rams game is played overnight Monday into Tuesday in Spain and is not covered here." } },

    { type: "heading", level: 2, text: { es: "College: Georgia gana en Tuscaloosa y sube al n.º 1", en: "College: Georgia win in Tuscaloosa and rise to No. 1" } },
    { type: "paragraph", text: { es: `En el partido del día, Georgia (n.º 2) ganó 20-17 en Alabama (n.º 6) [[src:lsu-national-rankings-2026-10-04]]. Gunner Stockton completó 18 de 22 pases para 249 yardas y D. Phillips Jr. corrió 120. ${NCAA}`, en: `In the game of the day, No. 2 Georgia won 20–17 at No. 6 Alabama [[src:lsu-national-rankings-2026-10-04]]. Gunner Stockton completed 18 of 22 passes for 249 yards and D. Phillips Jr. ran for 120. ${NCAA}` } },
    { type: "paragraph", text: { es: `En Dallas, Oklahoma ganó 27-24 al n.º 1, Texas, con un field goal sobre la bocina. Arch Manning lanzó para 260 yardas y tres touchdowns en la derrota. Con ese resultado, Georgia pasó a liderar el AP Top 25 del domingo con 66 de 70 votos y Texas cayó al 7. ${NCAA} [[src:yahoo-ap-poll-week7-2026]] [[src:espn-cfb-rankings-week7-2026]]`, en: `In Dallas, Oklahoma beat No. 1 Texas 27–24 with a field goal as time expired. Arch Manning threw for 260 yards and three touchdowns in defeat. That result put Georgia atop Sunday's AP Top 25 with 66 of 70 first-place votes, while Texas fell to 7th. ${NCAA} [[src:yahoo-ap-poll-week7-2026]] [[src:espn-cfb-rankings-week7-2026]]` } },
    { type: "paragraph", text: { es: `UCLA, n.º 21, ganó 17-15 en Oregon (n.º 13) con 103 yardas y un touchdown de carrera de W. Knight, y Oregon salió del ranking. Kentucky ganó 35-34 a LSU (n.º 10) en la prórroga: LSU cayó al 22 y Kentucky entró en el 15. ${NCAA} [[src:espn-cfb-rankings-week7-2026]]`, en: `No. 21 UCLA won 17–15 at No. 13 Oregon, with 103 rushing yards and a touchdown from W. Knight, and Oregon dropped out of the poll. Kentucky beat No. 10 LSU 35–34 in overtime: LSU fell to 22nd and Kentucky entered at 15. ${NCAA} [[src:espn-cfb-rankings-week7-2026]]` } },
    { type: "list", items: [
      { es: "Notre Dame 58 — Stanford 7", en: "Notre Dame 58 — Stanford 7" },
      { es: "Ole Miss 52 — Vanderbilt 17", en: "Ole Miss 52 — Vanderbilt 17" },
      { es: "Ohio State 45 — Maryland 16", en: "Ohio State 45 — Maryland 16" },
      { es: "Indiana 20 — Nebraska 17", en: "Indiana 20 — Nebraska 17" },
    ] },
    { type: "paragraph", text: { es: `Notre Dame y Ole Miss golearon. Ohio State ganó con cuatro pases de touchdown de Julian Sayin, dos de ellos para Jeremiah Smith. Indiana sufrió más en Lincoln: 20-17, con 187 yardas y dos touchdowns de N. Marsh. ${NCAA}`, en: `Notre Dame and Ole Miss cruised. Ohio State won behind four touchdown passes from Julian Sayin, two of them to Jeremiah Smith. Indiana had to work harder in Lincoln: 20–17, with 187 yards and two touchdowns from N. Marsh. ${NCAA}` } },

    { type: "heading", level: 2, text: { es: "Navy se recupera en Annapolis", en: "Navy bounce back in Annapolis" } },
    { type: "paragraph", text: { es: `Una semana después de perder en Air Force, Navy ganó 34-26 a Tulsa. J. Gutierrez corrió 232 yardas y tres touchdowns en 41 carreras. ${NCAA}`, en: `A week after losing at Air Force, Navy beat Tulsa 34–26. J. Gutierrez ran for 232 yards and three touchdowns on 41 carries. ${NCAA}` } },

    { type: "heading", level: 2, text: { es: "NFL: los Jaguars ganan en Londres", en: "NFL: the Jaguars win in London" } },
    { type: "paragraph", text: { es: `En el Tottenham Hotspur Stadium, los Jaguars ganaron 19-17 a los Eagles. Trevor Lawrence lanzó para 331 yardas y dos touchdowns, ambos para P. Washington, que sumó 124 yardas. ${NFL}`, en: `At Tottenham Hotspur Stadium, the Jaguars beat the Eagles 19–17. Trevor Lawrence threw for 331 yards and two touchdowns, both to P. Washington, who had 124 yards. ${NFL}` } },
    { type: "paragraph", text: { es: `Los dos equipos del partido de Madrid del 8 de noviembre volvieron a vivir fines de semana opuestos, esta vez al revés. Los Bengals ganaron 31-24 en Miami con cuatro pases de touchdown de Joe Burrow. Los Falcons perdieron 30-23 en la prórroga del Sunday Night ante los Ravens, con 102 yardas de Derrick Henry. ${NFL}`, en: `The two Madrid teams for 8 November again had opposite weekends, this time the other way round. The Bengals won 31–24 in Miami behind four Joe Burrow touchdown passes. The Falcons lost 30–23 in overtime on Sunday Night to the Ravens, with 102 yards from Derrick Henry. ${NFL}` } },
    { type: "paragraph", text: { es: `En Seattle, los 49ers ganaron 32-29 y siguen invictos (5-0). M. Evans sumó 113 yardas y un touchdown. ${NFL}`, en: `In Seattle, the 49ers won 32–29 and stay unbeaten at 5–0. M. Evans had 113 yards and a touchdown. ${NFL}` } },
  ],
};
