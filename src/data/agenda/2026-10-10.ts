import type { AgendaWeek, ScheduledGame } from "@/types";

const AP = ["lsu-national-rankings-2026-10-04"];
const CFB = ["fbschedules-tv-2026-10-10", "espn-cfb-schedule-2026-10-10", ...AP];
const NFL = ["cbs-nfl-schedule-2026-week-5", "espn-nfl-schedule-2026-week-5"];

const games: ScheduledGame[] = [
  // NCAA · Saturday 10 October
  { id: "indiana-at-nebraska-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T16:00:00Z", away: "Indiana", awayRank: 7, home: "Nebraska", usTv: "FOX", note: { es: "El n.º 7 abre el sábado en Lincoln.", en: "No. 7 Indiana opens the Saturday in Lincoln." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "texas-vs-oklahoma-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T19:30:00Z", away: "Texas", awayRank: 1, home: "Oklahoma", usTv: "ABC", venue: "Dallas (campo neutral)", featured: true, note: { es: "El n.º 1 contra Oklahoma en el clásico de Dallas.", en: "No. 1 Texas against Oklahoma in the Dallas rivalry game." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "stanford-at-notre-dame-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T19:30:00Z", away: "Stanford", home: "Notre Dame", homeRank: 3, usTv: "NBC", note: { es: "El n.º 3 recibe a Stanford.", en: "No. 3 Notre Dame hosts Stanford." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "ole-miss-at-vanderbilt-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T19:30:00Z", away: "Ole Miss", awayRank: 9, home: "Vanderbilt", usTv: "ESPN", note: { es: "El n.º 9 visita Nashville.", en: "No. 9 Ole Miss visits Nashville." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "ucla-at-oregon-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T19:30:00Z", away: "UCLA", awayRank: 21, home: "Oregon", homeRank: 13, usTv: "CBS", featured: true, note: { es: "Duelo del top 25 en el Big Ten.", en: "Top-25 Big Ten matchup." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "tulsa-at-navy-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T19:30:00Z", away: "Tulsa", home: "Navy", usTv: "CBSSN", note: { es: "Navy vuelve a Annapolis tras perder en Air Force.", en: "Navy returns to Annapolis after losing at Air Force." }, sourceIds: [...CFB, "espn-cfb-scoreboard-2026-10-03", "cbs-cfb-scoreboard-2026-10-03"], verificationStatus: "verified" },
  { id: "maryland-at-ohio-state-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T20:15:00Z", away: "Maryland", home: "Ohio State", homeRank: 5, usTv: "BTN", note: { es: "El n.º 5 recibe a Maryland.", en: "No. 5 Ohio State hosts Maryland." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "lsu-at-kentucky-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T23:00:00Z", away: "LSU", awayRank: 10, home: "Kentucky", usTv: "ESPN", note: { es: "El n.º 10 en Lexington.", en: "No. 10 LSU in Lexington." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "georgia-at-alabama-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-10T23:30:00Z", away: "Georgia", awayRank: 2, home: "Alabama", homeRank: 6, usTv: "ABC", featured: true, note: { es: "El partido del día: dos invictos del top 6 en Tuscaloosa.", en: "Game of the day: two unbeaten top-6 teams in Tuscaloosa." }, sourceIds: CFB, verificationStatus: "verified" },

  // NFL · Week 5
  { id: "nfl-2026-w5-eagles-jaguars-london", competitionId: "nfl", kickoffUtc: "2026-10-11T13:30:00Z", away: "Philadelphia Eagles", home: "Jacksonville Jaguars", venue: "Tottenham Hotspur Stadium, Londres", featured: true, note: { es: "La NFL vuelve a Londres, a la hora de comer en España.", en: "The NFL is back in London, at lunchtime in Spain." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w5-bengals-dolphins", competitionId: "nfl", kickoffUtc: "2026-10-11T17:00:00Z", away: "Cincinnati Bengals", home: "Miami Dolphins", usTv: "FOX", note: { es: "Los Bengals serán los visitantes del partido de Madrid el 8 de noviembre.", en: "The Bengals are the visitors in the Madrid game on 8 November." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w5-49ers-seahawks", competitionId: "nfl", kickoffUtc: "2026-10-11T20:25:00Z", away: "San Francisco 49ers", home: "Seattle Seahawks", usTv: "FOX", featured: true, note: { es: "Duelo de la NFC Oeste.", en: "NFC West divisional game." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w5-ravens-falcons", competitionId: "nfl", kickoffUtc: "2026-10-12T00:20:00Z", away: "Baltimore Ravens", home: "Atlanta Falcons", usTv: "NBC", featured: true, note: { es: "Sunday Night Football, de madrugada. Los Falcons serán los locales en el Bernabéu el 8 de noviembre.", en: "Sunday Night Football, overnight in Spain. The Falcons are the home team at the Bernabéu on 8 November." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w5-bills-rams", competitionId: "nfl", kickoffUtc: "2026-10-13T00:15:00Z", away: "Buffalo Bills", home: "Los Angeles Rams", usTv: "ABC/ESPN", note: { es: "Monday Night Football, de madrugada del lunes al martes.", en: "Monday Night Football, overnight Monday into Tuesday in Spain." }, sourceIds: NFL, verificationStatus: "verified" },
];

export const agenda20261010: AgendaWeek = {
  id: "2026-10-10",
  from: "2026-10-10",
  to: "2026-10-13",
  title: { es: "Qué ver este finde: Georgia en Alabama, Texas–Oklahoma y la NFL en Londres", en: "What to watch this weekend: Georgia at Alabama, Texas–Oklahoma and the NFL in London" },
  intro: {
    es: "Sábado de college con el Georgia–Alabama en horario estelar, el n.º 1 en Dallas y un UCLA–Oregon del top 25; el domingo, la NFL vuelve a Londres y los dos equipos del partido de Madrid juegan esta semana.",
    en: "A college Saturday with Georgia–Alabama in prime time, No. 1 Texas in Dallas and a top-25 UCLA–Oregon; on Sunday the NFL returns to London and both Madrid-game teams are in action.",
  },
  howToWatch: [
    { competitionId: "nfl", text: { es: "En abierto, Mediaset (Cuatro, Be Mad y Mediaset Infinity) da más de 50 partidos esta temporada; a 6 de octubre aún no ha anunciado los de esta jornada. Todos los partidos, en NFL Game Pass dentro de DAZN.", en: "Free-to-air, Mediaset (Cuatro, Be Mad and Mediaset Infinity) shows over 50 games this season; as of 6 October it had not announced this week's picks. Every game is on NFL Game Pass inside DAZN." }, sourceIds: ["madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026"] },
    { competitionId: "ncaa-fbs", text: { es: "No hemos encontrado ningún operador con derechos en España para 2026; en 2025 el acuerdo europeo de DAZN con ESPN excluyó a España.", en: "We found no rights holder in Spain for 2026; in 2025 DAZN's European deal with ESPN left Spain out." }, sourceIds: ["2playbook-dazn-college-2025"] },
  ],
  games,
  sourceIds: [
    "fbschedules-tv-2026-10-10", "espn-cfb-schedule-2026-10-10", "lsu-national-rankings-2026-10-04",
    "espn-cfb-scoreboard-2026-10-03", "cbs-cfb-scoreboard-2026-10-03",
    "cbs-nfl-schedule-2026-week-5", "espn-nfl-schedule-2026-week-5",
    "madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026", "2playbook-dazn-college-2025",
  ],
  lastVerifiedAt: "2026-10-06",
};
