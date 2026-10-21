import type { Source } from "@/types/common";

const A = "2026-10-21";

/**
 * Sources for the 17-19 October 2026 weekend recap.
 *
 * Every score in the article is confirmed in two of these: the two
 * scoreboards for the bulk, and the official athletics site of one of the
 * two teams for the three games the scoreboards were cross-checked against.
 */
export const finde20261017Sources: Source[] = [
  { id: "espn-cfb-scoreboard-2026-10-17", title: "College Football Scoreboard — 17 October 2026", publisher: "ESPN", url: "https://www.espn.com/college-football/scoreboard/_/date/20261017", accessedAt: A, sourceType: "press" },
  { id: "cbs-cfb-scoreboard-2026-10-17", title: "College Football Scores — 17 October 2026", publisher: "CBS Sports", url: "https://www.cbssports.com/college-football/scoreboard/FBS/2026/regular/8/", accessedAt: A, sourceType: "press" },
  { id: "espn-nfl-scoreboard-2026-week-6", title: "NFL Scores — Regular Season Week 6, 2026", publisher: "ESPN", url: "https://www.espn.com/nfl/scoreboard/_/week/6/year/2026/seasontype/2", accessedAt: A, sourceType: "press" },
  { id: "cbs-nfl-scoreboard-2026-week-6", title: "2026 NFL Game Scores — Week 6", publisher: "CBS Sports", url: "https://www.cbssports.com/nfl/scoreboard/all/2026/regular/6/", accessedAt: A, sourceType: "press" },
  { id: "goutsa-navy-2026", title: "Roadrunners remain undefeated in league play with 38-34 victory over Navy", publisher: "UTSA Athletics", url: "https://goutsa.com/news/2026/10/17/roadrunners-remain-undefeated-in-league-play-with-38-34-victory-over-navy", publishedAt: "2026-10-17", accessedAt: A, sourceType: "club-official" },
  { id: "lsusports-mississippi-state-2026", title: "Football Completes Shutout vs. No. 16 Mississippi State, 31-0", publisher: "LSU Athletics", url: "https://lsusports.net/news/2026/10/17/football-completes-shutout-vs-no-16-mississippi-state-31-0", publishedAt: "2026-10-17", accessedAt: A, sourceType: "club-official" },
  { id: "espn-michigan-penn-state-2026", title: "Michigan 21-18 Penn State — Final Score", publisher: "ESPN", url: "https://www.espn.com/college-football/game/_/gameId/401858490/penn-state-michigan", publishedAt: "2026-10-17", accessedAt: A, sourceType: "press" },
];
