import type { AgendaWeek, ScheduledGame } from "@/types";

const AP = ["lsu-national-rankings-2026-09-27"];
const CFB = ["fbschedules-tv-2026-10-03", ...AP];
const NFL = ["nfl-schedule-2026-week-4", "cbs-nfl-schedule-2026-week-4"];
const MEDIASET = ["eldesmarque-mediaset-nfl-week4-2026"];

const games: ScheduledGame[] = [
  // NCAA · Saturday 3 October
  { id: "notre-dame-at-north-carolina-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T16:00:00Z", away: "Notre Dame", awayRank: 3, home: "North Carolina", usTv: "ESPN", featured: true, note: { es: "El n.º 3 visita Chapel Hill.", en: "No. 3 Notre Dame visits Chapel Hill." }, sourceIds: ["espn-cfb-schedule-2026-10-03", ...AP], verificationStatus: "verified" },
  { id: "alabama-at-mississippi-state-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T16:00:00Z", away: "Alabama", awayRank: 7, home: "Mississippi State", homeRank: 16, usTv: "ABC", featured: true, note: { es: "Duelo de la SEC entre dos invictos del top 16.", en: "SEC clash between two unbeaten top-16 teams." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "navy-at-air-force-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T16:00:00Z", away: "Navy", home: "Air Force", usTv: "CBS", featured: true, note: { es: "Rivalidad entre academias militares, con el Commander-in-Chief's Trophy en juego.", en: "Service-academy rivalry with the Commander-in-Chief's Trophy at stake." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "vanderbilt-at-georgia-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T16:45:00Z", away: "Vanderbilt", home: "Georgia", homeRank: 2, usTv: "SEC Network", note: { es: "El n.º 2 recibe a Vanderbilt.", en: "No. 2 Georgia hosts Vanderbilt." }, sourceIds: ["espn-cfb-schedule-2026-10-03", ...AP], verificationStatus: "verified" },
  { id: "ohio-state-at-iowa-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T19:30:00Z", away: "Ohio State", awayRank: 5, home: "Iowa", homeRank: 14, usTv: "CBS", featured: true, note: { es: "El partido del día: College GameDay vuelve a Iowa City veinte años después.", en: "Game of the day: College GameDay returns to Iowa City after twenty years." }, sourceIds: [...CFB, "espn-gameday-iowa-2026"], verificationStatus: "verified" },
  { id: "florida-at-missouri-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T19:30:00Z", away: "Florida", awayRank: 8, home: "Missouri", homeRank: 25, usTv: "ABC", featured: true, note: { es: "Florida, que subió del 21 al 8 esta semana, visita Columbia.", en: "Florida, up from 21 to 8 this week, visits Columbia." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "byu-at-tcu-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T23:00:00Z", away: "BYU", awayRank: 10, home: "TCU", usTv: "ESPN", note: { es: "El n.º 10 en Fort Worth.", en: "No. 10 BYU in Fort Worth." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "miami-at-clemson-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T23:30:00Z", away: "Miami", awayRank: 4, home: "Clemson", usTv: "ABC", featured: true, note: { es: "Horario estelar de la ACC: el n.º 4 en Death Valley.", en: "ACC prime time: No. 4 Miami in Death Valley." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "washington-at-usc-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-03T23:30:00Z", away: "Washington", home: "USC", homeRank: 18, usTv: "NBC", note: { es: "Noche del Big Ten en el Coliseum.", en: "Big Ten night at the Coliseum." }, sourceIds: CFB, verificationStatus: "verified" },
  { id: "indiana-at-rutgers-2026", competitionId: "ncaa-fbs", kickoffUtc: "2026-10-04T00:00:00Z", away: "Indiana", awayRank: 6, home: "Rutgers", usTv: "BTN", note: { es: "El n.º 6, invicto, visita Piscataway.", en: "Unbeaten No. 6 Indiana visits Piscataway." }, sourceIds: ["espn-cfb-schedule-2026-10-03", ...AP], verificationStatus: "verified" },

  // Europe
  { id: "gfl-bowl-2026", competitionId: "gfl", kickoffUtc: "2026-10-03T16:00:00Z", away: "Potsdam Royals", home: "Dresden Monarchs", venue: "Rudolf-Harbig-Stadion, Dresde", featured: true, note: { es: "Final alemana con más de 20.000 entradas vendidas: Dresden, invicto, contra el vigente campeón Potsdam. Se emite gratis en DF1 y SportEurope.tv; no hemos confirmado si se ve desde España.", en: "German final with over 20,000 tickets sold: unbeaten Dresden against defending champion Potsdam. Free on DF1 and SportEurope.tv; we have not confirmed whether it streams in Spain." }, sourceIds: ["gfl-bowl-2026-preview", "afvd-gfl-bowl-2026"], verificationStatus: "verified" },

  // NFL · Week 4
  { id: "nfl-2026-w4-colts-commanders-london", competitionId: "nfl", kickoffUtc: "2026-10-04T13:30:00Z", away: "Indianapolis Colts", home: "Washington Commanders", venue: "Tottenham Hotspur Stadium, Londres", featured: true, watchInSpain: { es: "Mediaset, en abierto (canal por confirmar)", en: "Mediaset, free-to-air (channel TBC)" }, note: { es: "El primer partido europeo de la temporada, a la hora de la sobremesa.", en: "The season's first European game, in a Spanish afternoon slot." }, sourceIds: [...NFL, "colts-london-2026", ...MEDIASET], verificationStatus: "verified" },
  { id: "nfl-2026-w4-jaguars-bengals", competitionId: "nfl", kickoffUtc: "2026-10-04T17:00:00Z", away: "Jacksonville Jaguars", home: "Cincinnati Bengals", featured: true, note: { es: "Los dos llegan 2-1. Los Bengals serán los visitantes del partido de Madrid el 8 de noviembre.", en: "Both teams are 2-1. The Bengals are the visitors in the Madrid game on 8 November." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w4-patriots-bills", competitionId: "nfl", kickoffUtc: "2026-10-04T17:00:00Z", away: "New England Patriots", home: "Buffalo Bills", note: { es: "Duelo de la AFC Este.", en: "AFC East divisional game." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w4-chiefs-raiders", competitionId: "nfl", kickoffUtc: "2026-10-04T20:25:00Z", away: "Kansas City Chiefs", home: "Las Vegas Raiders", featured: true, watchInSpain: { es: "Mediaset Infinity, gratis", en: "Mediaset Infinity, free" }, note: { es: "Duelo de invictos (3-0) en la AFC Oeste.", en: "Battle of 3-0 AFC West rivals." }, sourceIds: [...NFL, ...MEDIASET], verificationStatus: "verified" },
  { id: "nfl-2026-w4-broncos-49ers", competitionId: "nfl", kickoffUtc: "2026-10-04T20:25:00Z", away: "Denver Broncos", home: "San Francisco 49ers", featured: true, note: { es: "Los Broncos (2-1) ante unos 49ers invictos (3-0).", en: "Broncos (2-1) at the unbeaten 49ers (3-0)." }, sourceIds: NFL, verificationStatus: "verified" },
  { id: "nfl-2026-w4-lions-panthers", competitionId: "nfl", kickoffUtc: "2026-10-05T00:20:00Z", away: "Detroit Lions", home: "Carolina Panthers", usTv: "NBC", watchInSpain: { es: "Cuatro, en abierto", en: "Cuatro, free-to-air" }, note: { es: "Sunday Night Football, de madrugada.", en: "Sunday Night Football, overnight in Spain." }, sourceIds: [...NFL, ...MEDIASET], verificationStatus: "verified" },
  { id: "nfl-2026-w4-falcons-saints", competitionId: "nfl", kickoffUtc: "2026-10-06T00:15:00Z", away: "Atlanta Falcons", home: "New Orleans Saints", usTv: "ESPN", note: { es: "Monday Night Football. Los Falcons serán los locales en el Bernabéu el 8 de noviembre.", en: "Monday Night Football. The Falcons are the home team at the Bernabéu on 8 November." }, sourceIds: ["cbs-nfl-schedule-2026-week-4"], verificationStatus: "verified" },
];

export const agenda20261003: AgendaWeek = {
  id: "2026-10-03",
  from: "2026-10-03",
  to: "2026-10-06",
  title: { es: "Qué ver este finde: Ohio State en Iowa, la final alemana y la NFL en Londres", en: "What to watch this weekend: Ohio State at Iowa, the German final and the NFL in London" },
  intro: {
    es: "Sábado de college con siete equipos del top 10 fuera de casa y el Navy–Air Force, la GFL Bowl en Dresde y una semana 4 de la NFL que empieza en Londres a las 15:30.",
    en: "A college Saturday with seven top-10 teams on the road plus Navy–Air Force, the GFL Bowl in Dresden and an NFL Week 4 that kicks off in London at 3:30 pm Spanish time.",
  },
  howToWatch: [
    { competitionId: "nfl", text: { es: "En abierto, Mediaset (Cuatro, Be Mad y Mediaset Infinity) da más de 50 partidos esta temporada. Todos los partidos, en NFL Game Pass dentro de DAZN.", en: "Free-to-air, Mediaset (Cuatro, Be Mad and Mediaset Infinity) shows over 50 games this season. Every game is on NFL Game Pass inside DAZN." }, sourceIds: ["madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026"] },
    { competitionId: "ncaa-fbs", text: { es: "No hemos encontrado ningún operador con derechos en España para 2026; en 2025 el acuerdo europeo de DAZN con ESPN excluyó a España.", en: "We found no rights holder in Spain for 2026; in 2025 DAZN's European deal with ESPN left Spain out." }, sourceIds: ["2playbook-dazn-college-2025"] },
  ],
  games,
  sourceIds: [
    "fbschedules-tv-2026-10-03", "espn-cfb-schedule-2026-10-03", "espn-gameday-iowa-2026", "lsu-national-rankings-2026-09-27",
    "nfl-schedule-2026-week-4", "cbs-nfl-schedule-2026-week-4", "colts-london-2026", "eldesmarque-mediaset-nfl-week4-2026",
    "madrid26-mediaset-season-launch", "dazn-nfl-game-pass-2026", "2playbook-dazn-college-2025",
    "gfl-bowl-2026-preview", "afvd-gfl-bowl-2026",
  ],
  lastVerifiedAt: "2026-10-02",
};
