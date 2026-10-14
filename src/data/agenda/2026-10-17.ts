import type { AgendaWeek, ScheduledGame } from "@/types";

const AP = ["yahoo-ap-poll-week7-2026", "espn-cfb-rankings-week7-2026"];
const CFB = ["fbschedules-tv-2026-10-17", "espn-cfb-schedule-2026-10-17", "cbs-cfb-schedule-2026-10-17", ...AP];
const NFL = ["nfl-schedule-2026-week-6", "cbs-nfl-schedule-2026-week-6", "espn-nfl-schedule-2026-week-6"];
const MEDIASET = ["eldesmarque-mediaset-nfl-week6-2026"];

const games: ScheduledGame[] = [
  // NCAA · Saturday 17 October
  { id: "ohio-state-at-indiana-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T16:00:00Z", away: "Ohio State", awayRank: 4, home: "Indiana", homeRank: 5, usTv: "FOX", featured: true, note: { es: "El partido del día: el n.º 4 en Bloomington contra un Indiana invicto.", en: "Game of the day: No. 4 Ohio State in Bloomington against an unbeaten Indiana." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "florida-at-texas-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T16:00:00Z", away: "Florida", home: "Texas", homeRank: 7, usTv: "ABC", note: { es: "Primera reacción de Texas tras caer del n.º 1 al 7.", en: "Texas's first response after falling from No. 1 to 7." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "mississippi-state-at-lsu-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T16:00:00Z", away: "Mississippi State", awayRank: 16, home: "LSU", homeRank: 22, usTv: "ESPN", note: { es: "Duelo del top 25 en Baton Rouge.", en: "Top-25 matchup in Baton Rouge." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "auburn-at-georgia-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T19:30:00Z", away: "Auburn", home: "Georgia", homeRank: 1, usTv: "ESPN", note: { es: "El nuevo n.º 1 estrena el liderato en casa.", en: "The new No. 1 debuts at the top at home." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "alabama-at-tennessee-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T19:30:00Z", away: "Alabama", awayRank: 6, home: "Tennessee", homeRank: 14, usTv: "ABC", featured: true, note: { es: "Dos del top 15 en Neyland Stadium.", en: "Two top-15 teams at Neyland Stadium." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "penn-state-at-michigan-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T19:30:00Z", away: "Penn State", home: "Michigan", usTv: "CBS", note: { es: "Clásico del Big Ten, los dos fuera del ranking esta semana.", en: "A Big Ten classic, with both teams outside the poll this week." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "florida-state-at-miami-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T23:00:00Z", away: "Florida State", home: "Miami", homeRank: 3, usTv: "ESPN", featured: true, note: { es: "El derbi de Florida, con el n.º 3 invicto como local.", en: "The Florida derby, with unbeaten No. 3 Miami at home." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "notre-dame-at-byu-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-17T23:30:00Z", away: "Notre Dame", awayRank: 2, home: "BYU", homeRank: 8, usTv: "ABC", featured: true, note: { es: "Dos invictos en Provo: 6-0 contra 5-0.", en: "Two unbeaten teams in Provo: 6-0 against 5-0." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "navy-at-utsa-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-18T00:00:00Z", away: "Navy", home: "UTSA", usTv: "ESPNU", venue: "Alamodome, San Antonio", note: { es: "Navy (2-3) sale al Alamodome tras ganar a Tulsa.", en: "Navy (2-3) travel to the Alamodome after beating Tulsa." }, sourceIds: [...CFB, "navy-schedule-2026"], verificationStatus: "verified" },

  // NFL · Week 6
  { id: "nfl-2026-w6-seahawks-broncos", competitionId: "nfl", kickoffUtc: "2026-10-16T00:15:00Z", away: "Seattle Seahawks", home: "Denver Broncos", usTv: "Prime Video", note: { es: "Thursday Night Football, de madrugada del jueves al viernes.", en: "Thursday Night Football, overnight Thursday into Friday in Spain." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w6-texans-jaguars-london", competitionId: "nfl", kickoffUtc: "2026-10-18T13:30:00Z", away: "Houston Texans", home: "Jacksonville Jaguars", venue: "Wembley Stadium, Londres", featured: true, watchInSpain: { es: "En abierto en Mediaset Infinity a las 15:30 (previa desde las 15:15).", en: "Free-to-air on Mediaset Infinity at 15:30 Spanish time (pre-game from 15:15)." }, note: { es: "La NFL sigue en Europa y cambia de sede: segundo partido de Londres, esta vez en Wembley.", en: "The NFL stays in Europe and changes venue: the second London game, this time at Wembley." }, sourceIds: [...NFL, ...MEDIASET, "jaguars-london-2026"], verificationStatus: "verified" },
  { id: "nfl-2026-w6-bears-falcons", competitionId: "nfl", kickoffUtc: "2026-10-18T17:00:00Z", away: "Chicago Bears", home: "Atlanta Falcons", usTv: "FOX", note: { es: "Los Falcons (2-3) serán los locales en el Bernabéu el 8 de noviembre. Los Bengals descansan esta jornada.", en: "The Falcons (2-3) are the home team at the Bernabéu on 8 November. The Bengals are on a bye this week." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w6-chargers-chiefs", competitionId: "nfl", kickoffUtc: "2026-10-18T20:25:00Z", away: "Los Angeles Chargers", home: "Kansas City Chiefs", usTv: "CBS", note: { es: "Los Chargers (0-5) visitan a los Chiefs (4-0) en el AFC Oeste.", en: "The 0-5 Chargers visit the 4-0 Chiefs in the AFC West." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w6-bills-raiders", competitionId: "nfl", kickoffUtc: "2026-10-18T20:25:00Z", away: "Buffalo Bills", home: "Las Vegas Raiders", usTv: "CBS", watchInSpain: { es: "En abierto en Mediaset Infinity a las 22:25 (previa desde las 22:10).", en: "Free-to-air on Mediaset Infinity at 22:25 Spanish time (pre-game from 22:10)." }, note: { es: "Josh Allen en Las Vegas una semana después del 37-34 en la prórroga ante los Rams.", en: "Josh Allen in Las Vegas a week after the 37-34 overtime win over the Rams." }, sourceIds: [...NFL, ...MEDIASET], verificationStatus: "verified" },
  { id: "nfl-2026-w6-cowboys-packers", competitionId: "nfl", kickoffUtc: "2026-10-19T00:20:00Z", away: "Dallas Cowboys", home: "Green Bay Packers", usTv: "NBC", featured: true, watchInSpain: { es: "En abierto en Cuatro a las 02:15 de la madrugada del lunes (previa desde las 02:00).", en: "Free-to-air on Cuatro at 02:15 overnight into Monday in Spain (pre-game from 02:00)." }, note: { es: "Sunday Night Football en Lambeau Field.", en: "Sunday Night Football at Lambeau Field." }, sourceIds: [...NFL, ...MEDIASET], verificationStatus: "verified" },
  { id: "nfl-2026-w6-commanders-49ers", competitionId: "nfl", kickoffUtc: "2026-10-20T00:15:00Z", away: "Washington Commanders", home: "San Francisco 49ers", usTv: "ABC/ESPN", note: { es: "Monday Night Football: los 49ers (5-0) cierran la jornada, de madrugada del lunes al martes.", en: "Monday Night Football: the 5-0 49ers close the week, overnight Monday into Tuesday in Spain." }, sourceIds: NFL, verificationStatus: "verified" },
];

export const agenda20261017: AgendaWeek = {
  id: "2026-10-17",
  from: "2026-10-16",
  to: "2026-10-20",
  title: { es: "Qué ver este finde: Ohio State–Indiana, Notre Dame en BYU y la NFL en Wembley", en: "What to watch this weekend: Ohio State–Indiana, Notre Dame at BYU and the NFL at Wembley" },
  intro: {
    es: "El mejor sábado de college del curso: el n.º 4 contra el n.º 5 en Bloomington, dos invictos en Provo y el Alabama–Tennessee en Neyland. El domingo la NFL juega su segundo partido de Londres, esta vez en Wembley y en abierto a las 15:30.",
    en: "The best college Saturday of the season: No. 4 against No. 5 in Bloomington, two unbeaten teams in Provo and Alabama–Tennessee at Neyland. On Sunday the NFL plays its second London game, this time at Wembley and free-to-air at 15:30 in Spain.",
  },
  howToWatch: [
    { competitionId: "nfl", text: { es: "En abierto, Mediaset (Cuatro, Be Mad y Mediaset Infinity) da más de 50 partidos esta temporada; de esta jornada ha anunciado tres: Jaguars–Texans (15:30, Mediaset Infinity), Raiders–Bills (22:25, Mediaset Infinity) y Packers–Cowboys (02:15 del lunes, Cuatro). Todos los partidos, en NFL Game Pass dentro de DAZN.", en: "Free-to-air, Mediaset (Cuatro, Be Mad and Mediaset Infinity) shows over 50 games this season; for this week it has announced three: Jaguars–Texans (15:30, Mediaset Infinity), Raiders–Bills (22:25, Mediaset Infinity) and Packers–Cowboys (02:15 Monday, Cuatro). Every game is on NFL Game Pass inside DAZN." }, sourceIds: ["madrid26-mediaset-season-launch", "eldesmarque-mediaset-nfl-week6-2026", "dazn-nfl-game-pass-2026"] },
    { competitionId: "ncaa-fbs", text: { es: "No hemos encontrado ningún operador con derechos en España para 2026; en 2025 el acuerdo europeo de DAZN con ESPN excluyó a España.", en: "We found no rights holder in Spain for 2026; in 2025 DAZN's European deal with ESPN left Spain out." }, sourceIds: ["2playbook-dazn-college-2025"] },
  ],
  games,
  sourceIds: [
    "fbschedules-tv-2026-10-17", "espn-cfb-schedule-2026-10-17", "cbs-cfb-schedule-2026-10-17",
    "yahoo-ap-poll-week7-2026", "espn-cfb-rankings-week7-2026", "navy-schedule-2026",
    "nfl-schedule-2026-week-6", "cbs-nfl-schedule-2026-week-6", "espn-nfl-schedule-2026-week-6",
    "jaguars-london-2026",
    "madrid26-mediaset-season-launch", "eldesmarque-mediaset-nfl-week6-2026", "dazn-nfl-game-pass-2026", "2playbook-dazn-college-2025",
  ],
  lastVerifiedAt: "2026-10-14",
};
