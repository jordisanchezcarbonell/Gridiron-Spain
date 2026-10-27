import type { AgendaWeek, ScheduledGame } from "@/types";

const AP = ["espn-cfb-rankings-week9-2026", "cbs-ap-poll-week9-2026"];
const CFB = ["fbschedules-tv-2026-10-31", "espn-cfb-schedule-2026-10-31", ...AP];
const NFL = ["cbs-nfl-schedule-2026-week-8", "espn-nfl-schedule-2026-week-8", "espn-nfl-standings-2026-10-27"];

// The US switches to winter time on Sunday 1 November: Saturday's college games
// are ET+5 in Spain (ET = UTC-4) and Sunday/Monday NFL games are ET+6 (ET = UTC-5).
const games: ScheduledGame[] = [
  // NCAA · Saturday 31 October
  { id: "notre-dame-vs-navy-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T16:00:00Z", away: "Notre Dame", awayRank: 5, home: "Navy", usTv: "ABC", venue: "Gillette Stadium, Foxborough (campo neutral)", featured: true, note: { es: "El 99.º Navy–Notre Dame. Navy (2-5) juega con el uniforme del centenario de 1926; Notre Dame (6-1) vuelve tras su semana de descanso.", en: "The 99th Navy–Notre Dame. Navy (2-5) wear the 1926 centenary uniform; Notre Dame (6-1) return from their bye." }, sourceIds: [...CFB, "navy-schedule-2026", "navy-notre-dame-preview-2026", "navy-1926-uniform-2026"], verificationStatus: "verified" },
  { id: "arizona-at-texas-tech-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T16:00:00Z", away: "Arizona", awayRank: 22, home: "Texas Tech", homeRank: 13, usTv: "ESPN", note: { es: "Duelo del top 25 en Lubbock: Texas Tech (6-1) viene de perder en Cincinnati.", en: "Top-25 matchup in Lubbock: Texas Tech (6-1) are coming off a loss at Cincinnati." }, sourceIds: [...CFB, "cbs-cfb-scoreboard-2026-10-24"], verificationStatus: "verified" },
  { id: "florida-vs-georgia-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T19:30:00Z", away: "Florida", awayRank: 17, home: "Georgia", homeRank: 3, usTv: "ABC", venue: "Mercedes-Benz Stadium, Atlanta", featured: true, note: { es: "El clásico entre Florida y Georgia, este año en Atlanta y entre dos equipos del top 25.", en: "The Florida–Georgia rivalry, in Atlanta this year and between two top-25 teams." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "minnesota-at-indiana-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T19:30:00Z", away: "Minnesota", home: "Indiana", homeRank: 4, usTv: "CBS", note: { es: "Indiana (7-1) vuelve a Bloomington tras ganar en la prórroga en Michigan.", en: "Indiana (7-1) are back in Bloomington after an overtime win at Michigan." }, sourceIds: [...CFB, "espn-cfb-scoreboard-2026-10-24"], verificationStatus: "verified" },
  { id: "arizona-state-at-byu-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T19:30:00Z", away: "Arizona State", home: "BYU", homeRank: 8, usTv: "FOX", note: { es: "BYU (6-1) recibe a Arizona State tras su primera derrota, en la doble prórroga en UCF.", en: "BYU (6-1) host Arizona State after their first loss, in double overtime at UCF." }, sourceIds: [...CFB, "espn-cfb-scoreboard-2026-10-24"], verificationStatus: "verified" },
  { id: "utah-at-cincinnati-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T19:45:00Z", away: "Utah", awayRank: 6, home: "Cincinnati", usTv: "ESPN", venue: "Nippert Stadium, Cincinnati", note: { es: "Utah, invicto (7-0), visita al Cincinnati que acaba de tumbar a Texas Tech.", en: "Unbeaten Utah (7-0) visit the Cincinnati side that just beat Texas Tech." }, sourceIds: [...CFB, "espn-cfb-scoreboard-2026-10-24"], verificationStatus: "verified" },
  { id: "nevada-at-ucla-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T20:15:00Z", away: "Nevada", home: "UCLA", homeRank: 7, usTv: "BTN", venue: "Rose Bowl, Pasadena", note: { es: "UCLA, invicto (7-0), en el Rose Bowl.", en: "Unbeaten UCLA (7-0) at the Rose Bowl." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "miami-at-north-carolina-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T23:30:00Z", away: "Miami", awayRank: 1, home: "North Carolina", usTv: "ABC", venue: "Kenan Stadium, Chapel Hill", note: { es: "El n.º 1 (7-0) sale a Chapel Hill con 59 de los 70 votos del AP.", en: "The No. 1 team (7-0) go to Chapel Hill with 59 of the 70 AP first-place votes." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "ohio-state-at-usc-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-31T23:30:00Z", away: "Ohio State", awayRank: 2, home: "USC", usTv: "NBC", venue: "Los Angeles Memorial Coliseum", featured: true, note: { es: "Ohio State (6-1) en el Coliseum ante un USC que acaba de salir del ranking tras perder con Wisconsin.", en: "Ohio State (6-1) at the Coliseum against a USC side that just dropped out of the poll after losing to Wisconsin." }, sourceIds: [...CFB, "cbs-cfb-scoreboard-2026-10-24"], verificationStatus: "verified" },

  // NFL · Week 8
  { id: "nfl-2026-w8-falcons-buccaneers", competitionId: "nfl", kickoffUtc: "2026-11-01T18:00:00Z", away: "Atlanta Falcons", home: "Tampa Bay Buccaneers", usTv: "FOX", note: { es: "El último partido de los Falcons (3-4) antes del Bernabéu, tras tumbar a los 49ers.", en: "The Falcons' (3-4) last game before the Bernabéu, after toppling the 49ers." }, sourceIds: [...NFL, "madrid26-falcons-announcement"], verificationStatus: "verified" },
  { id: "nfl-2026-w8-titans-bengals", competitionId: "nfl", kickoffUtc: "2026-11-01T18:00:00Z", away: "Tennessee Titans", home: "Cincinnati Bengals", usTv: "CBS", note: { es: "Los Bengals (4-2) reciben a los Titans (1-6) antes de viajar a Madrid.", en: "The Bengals (4-2) host the Titans (1-6) before travelling to Madrid." }, sourceIds: [...NFL, "madrid26-bengals-press-release"], verificationStatus: "verified" },
  { id: "nfl-2026-w8-browns-steelers", competitionId: "nfl", kickoffUtc: "2026-11-01T18:00:00Z", away: "Cleveland Browns", home: "Pittsburgh Steelers", usTv: "CBS", note: { es: "Empate a 5-2 en lo alto del AFC Norte; los Steelers vuelven de París.", en: "A 5-2 tie at the top of the AFC North; the Steelers are back from Paris." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w8-vikings-lions", competitionId: "nfl", kickoffUtc: "2026-11-01T18:00:00Z", away: "Minnesota Vikings", home: "Detroit Lions", usTv: "FOX", note: { es: "Los Vikings, últimos invictos de la liga (6-0), visitan a los Lions (4-2).", en: "The Vikings, the league's last unbeaten team (6-0), visit the Lions (4-2)." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w8-ravens-bills", competitionId: "nfl", kickoffUtc: "2026-11-01T18:00:00Z", away: "Baltimore Ravens", home: "Buffalo Bills", usTv: "CBS", note: { es: "Los Bills (5-1) vuelven de su descanso ante los Ravens (4-3).", en: "The Bills (5-1) return from their bye against the Ravens (4-3)." }, sourceIds: [...NFL, "cbs-nfl-scoreboard-2026-week-7"], verificationStatus: "verified" },
  { id: "nfl-2026-w8-chiefs-broncos", competitionId: "nfl", kickoffUtc: "2026-11-01T21:25:00Z", away: "Kansas City Chiefs", home: "Denver Broncos", usTv: "CBS", note: { es: "Chiefs (5-1), tras su primera derrota, contra Broncos (5-2) por el AFC Oeste.", en: "The Chiefs (5-1), after their first loss, against the Broncos (5-2) for the AFC West." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w8-eagles-commanders", competitionId: "nfl", kickoffUtc: "2026-11-02T01:20:00Z", away: "Philadelphia Eagles", home: "Washington Commanders", usTv: "NBC", note: { es: "Sunday Night Football, de madrugada del domingo al lunes: Eagles (2-5) y Commanders (1-4-1).", en: "Sunday Night Football, overnight Sunday into Monday in Spain: the Eagles (2-5) and Commanders (1-4-1)." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w8-bears-seahawks", competitionId: "nfl", kickoffUtc: "2026-11-03T01:15:00Z", away: "Chicago Bears", home: "Seattle Seahawks", usTv: "ESPN", note: { es: "Monday Night Football, de madrugada del lunes al martes: Bears (5-2) en Seattle ante los Seahawks (4-3), que vienen de ganar 20-3 a los Chiefs.", en: "Monday Night Football, overnight Monday into Tuesday in Spain: the Bears (5-2) in Seattle against the Seahawks (4-3), fresh off a 20-3 win over the Chiefs." }, sourceIds: [...NFL, "cbs-nfl-scoreboard-2026-week-7"], verificationStatus: "verified" },
];

export const agenda20261031: AgendaWeek = {
  id: "2026-10-31",
  from: "2026-10-31",
  to: "2026-11-03",
  title: { es: "Qué ver este finde: Navy–Notre Dame, Florida–Georgia y la última semana antes de Madrid", en: "What to watch this weekend: Navy–Notre Dame, Florida–Georgia and the last week before Madrid" },
  intro: {
    es: "El sábado, Navy se mide a Notre Dame en Foxborough a las 17:00, Georgia y Florida juegan su clásico en Atlanta y Ohio State visita el Coliseum. El domingo, Falcons y Bengals juegan su último partido antes del Bernabéu. Ojo con las horas: Estados Unidos cambia la hora el domingo 1 de noviembre, así que la diferencia con España pasa de cinco a seis horas; esta agenda ya lo tiene en cuenta.",
    en: "On Saturday Navy face Notre Dame in Foxborough at 12 pm ET, Georgia and Florida play their rivalry game in Atlanta and Ohio State visit the Coliseum. On Sunday the Falcons and Bengals play their last game before the Bernabéu. Watch the times: the US changes its clocks on Sunday 1 November, so the gap with Spain goes from five to six hours; this agenda already accounts for it.",
  },
  howToWatch: [
    { competitionId: "nfl", text: { es: "En abierto, Mediaset (Cuatro, Be Mad y Mediaset Infinity) da más de 50 partidos esta temporada; los de esta jornada todavía no los ha anunciado. Todos los partidos, en NFL Game Pass dentro de DAZN.", en: "Free-to-air, Mediaset (Cuatro, Be Mad and Mediaset Infinity) shows over 50 games this season; it has not announced this week's picks yet. Every game is on NFL Game Pass inside DAZN." }, sourceIds: ["madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026"] },
    { competitionId: "ncaa-fbs", text: { es: "No hemos encontrado ningún operador con derechos en España para 2026; en 2025 el acuerdo europeo de DAZN con ESPN excluyó a España.", en: "We found no rights holder in Spain for 2026; in 2025 DAZN's European deal with ESPN left Spain out." }, sourceIds: ["2playbook-dazn-college-2025"] },
  ],
  games,
  sourceIds: [
    "fbschedules-tv-2026-10-31", "espn-cfb-schedule-2026-10-31", "espn-cfb-rankings-week9-2026", "cbs-ap-poll-week9-2026",
    "navy-schedule-2026", "navy-notre-dame-preview-2026", "navy-1926-uniform-2026",
    "espn-cfb-scoreboard-2026-10-24", "cbs-cfb-scoreboard-2026-10-24",
    "cbs-nfl-schedule-2026-week-8", "espn-nfl-schedule-2026-week-8", "espn-nfl-standings-2026-10-27", "cbs-nfl-scoreboard-2026-week-7",
    "madrid26-falcons-announcement", "madrid26-bengals-press-release",
    "madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026", "2playbook-dazn-college-2025",
  ],
  lastVerifiedAt: "2026-10-27",
};
