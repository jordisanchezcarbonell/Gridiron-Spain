import type { PlayerSpotlight } from "@/types";

const HEISMAN = ["nbc-heisman-odds-week12-2026", "si-heisman-odds-week12-2026"];
const BOARD = ["espn-reid-rankings-2027-oct", "tsn-reid-rankings-2027-oct"];

/**
 * Heisman race as priced by DraftKings on 15 Nov 2026 (via NBC Sports), cross-checked
 * against SI: same four names and prices. Odds, not votes.
 * Stats only where both articles agree; otherwise the note leaves them out.
 */
const heisman: [string, string, string, string, string, string][] = [
  // [name, position, school, odds, stats es, stats en]
  ["Jeremiah Smith", "WR", "Ohio State", "-144", "80 recepciones, 1.317 yardas y 15 touchdowns", "80 catches, 1,317 yards and 15 touchdowns"],
  ["Darian Mensah", "QB", "Miami", "+340", "3.076 yardas de pase, 29 touchdowns y 2 intercepciones", "3,076 passing yards, 29 touchdowns and 2 interceptions"],
  ["Devon Dampier", "QB", "Utah", "+720", "2.257 yardas de pase y 31 touchdowns, 22 de pase y 9 de carrera", "2,257 passing yards and 31 touchdowns, 22 passing and 9 rushing"],
  ["CJ Carr", "QB", "Notre Dame", "+1000", "2.385 yardas de pase y 2 intercepciones", "2,385 passing yards and 2 interceptions"],
];

/** Jordan Reid's ESPN top-50 rankings for the 2027 Draft (1 Oct 2026), top 10. Analyst opinion. */
const board: [string, string, string][] = [
  ["Jeremiah Smith", "WR", "Ohio State"],
  ["Leonard Moore", "CB", "Notre Dame"],
  ["Colin Simmons", "EDGE", "Texas"],
  ["Will Echoles", "DT", "Ole Miss"],
  ["Dylan Stewart", "EDGE", "South Carolina"],
  ["Jordan Seaton", "OT", "LSU"],
  ["Yhonzae Pierre", "EDGE", "Alabama"],
  ["Charlie Becker", "WR", "Indiana"],
  ["Trevor Goosby", "OT", "Texas"],
  ["Jadan Baugh", "RB", "Florida"],
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const ncaaPlayers: PlayerSpotlight[] = [
  ...heisman.map(([name, position, team, odds, es, en]): PlayerSpotlight => ({
    id: `heisman-2026-${slug(name)}`,
    name,
    position,
    team,
    league: "NCAA FBS",
    group: "ncaa-star",
    note: {
      es: `Cuota ${odds} para el Heisman en DraftKings (15 nov).${es ? ` Lleva ${es} en 2026.` : ""}`,
      en: `${odds} Heisman odds at DraftKings (15 Nov).${en ? ` ${en[0].toUpperCase()}${en.slice(1)} in 2026.` : ""}`,
    },
    sourceIds: HEISMAN,
    verificationStatus: "partial",
  })),
  ...board.map(([name, position, team], i): PlayerSpotlight => ({
    id: `draft-2027-${slug(name)}`,
    name,
    position,
    team,
    league: "NCAA FBS",
    group: "ncaa-prospect",
    note: {
      es: `N.º ${i + 1} en el ranking de Jordan Reid (ESPN) para el Draft de 2027, publicado el 1 de octubre de 2026.`,
      en: `No. ${i + 1} in Jordan Reid's (ESPN) 2027 Draft rankings, published 1 October 2026.`,
    },
    sourceIds: BOARD,
    verificationStatus: "partial",
  })),
];
