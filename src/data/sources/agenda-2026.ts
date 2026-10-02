import type { Source } from "@/types/common";

const A = "2026-10-02";

/** Sources for the weekly agenda (src/data/agenda). */
export const agendaSources: Source[] = [
  { id: "fbschedules-tv-2026-10-03", title: "College football schedule: TV selections for October 3, 2026", publisher: "FBSchedules", url: "https://fbschedules.com/college-football-schedule-tv-selections-for-october-3-2026/", accessedAt: A, sourceType: "press" },
  { id: "espn-cfb-schedule-2026-10-03", title: "College Football Schedule (3 October 2026)", publisher: "ESPN", url: "https://www.espn.com/college-football/schedule/_/week/5/year/2026", accessedAt: A, sourceType: "press" },
  { id: "espn-gameday-iowa-2026", title: "After dramatic win and 20-year wait, 'College GameDay' waves back to Iowa", publisher: "ESPN Press Room", url: "https://espnpressroom.com/press-release/after-dramatic-win-and-20-year-wait-college-gameday-waves-back-to-iowa/", publishedAt: "2026-10-01", accessedAt: A, sourceType: "press" },
  { id: "nfl-schedule-2026-week-4", title: "NFL 2026 Schedule – Week 4", publisher: "NFL.com", url: "https://www.nfl.com/schedules/2026/REG4/", accessedAt: A, sourceType: "league-official" },
  { id: "cbs-nfl-schedule-2026-week-4", title: "NFL Schedule - Week 4", publisher: "CBS Sports", url: "https://www.cbssports.com/nfl/schedule/2026/regular/4/", accessedAt: A, sourceType: "press" },
  { id: "colts-london-2026", title: "Colts to face Washington Commanders at Tottenham Stadium in London in Week 4 of 2026 NFL regular season", publisher: "Indianapolis Colts", url: "https://www.colts.com/news/colts-to-face-washington-commanders-at-tottenham-stadium-in-london-in-week-4-of-2026-nfl-regular-season", accessedAt: A, sourceType: "club-official" },
  { id: "eldesmarque-mediaset-nfl-week4-2026", title: "La Jornada 4 de la NFL en Mediaset: horarios y dónde ver gratis los tres partidos con el debut en Europa", publisher: "ElDesmarque", url: "https://www.eldesmarque.com/otros-deportes/20260930/jornada-nfl-mediaset-horarios-europa_18_020291311.html", publishedAt: "2026-09-30", accessedAt: A, sourceType: "press" },
  { id: "dazn-nfl-game-pass-2026", title: "DAZN brings fans closer to every moment of the 2026 NFL season with NFL Game Pass", publisher: "DAZN Group", url: "https://dazngroup.com/press-room/dazn-brings-fans-closer-to-every-moment-of-the-2026-nfl-season-with-nfl-game-pass/", publishedAt: "2026-09-08", accessedAt: A, sourceType: "other", notes: { es: "Nota de prensa del operador.", en: "Broadcaster press release." } },
  { id: "2playbook-dazn-college-2025", title: "DAZN refuerza su apuesta por contenidos made in USA: emitirá college en Europa", publisher: "2Playbook", url: "https://www.2playbook.com/media/dazn-refuerza-su-apuesta-por-contenidos-made-in-usa-emitira-college-en-europa_19889_102.html", publishedAt: "2025-08-28", accessedAt: A, sourceType: "press" },
  { id: "gfl-bowl-2026-preview", title: "Über 20.000 Tickets verkauft: Dresden fiebert dem GFL Bowl 2026 entgegen", publisher: "German Football League", url: "https://gfl.info/pk-vor-dem-gfl-bowl-2026/", accessedAt: A, sourceType: "league-official" },
  { id: "afvd-gfl-bowl-2026", title: "GFL Bowl 2026: Dresden Monarchs und Potsdam Royals kämpfen um die Deutsche Meisterschaft", publisher: "American Football Verband Deutschland", url: "https://afvd.de/gfl-bowl-2026-dresden-monarchs-und-potsdam-royals-kaempfen-um-die-deutsche-meisterschaft/", accessedAt: A, sourceType: "federation" },
];
