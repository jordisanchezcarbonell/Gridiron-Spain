import type { PlayerSpotlight } from "@/types";

const HEISMAN = ["nbc-heisman-odds-week7-2026", "si-heisman-odds-week7-2026"];
const BOARD = ["espn-reid-rankings-2027-oct", "tsn-reid-rankings-2027-oct"];

/**
 * Heisman race as priced by DraftKings on 11 Oct 2026 (via NBC Sports). Odds, not votes.
 * Stats only where two sources agree; otherwise the note gives the odds alone.
 */
const heisman: [string, string, string, string, string, string][] = [
  // [name, position, school, odds, stats es, stats en]
  ["Jeremiah Smith", "WR", "Ohio State", "-220", "48 recepciones, 916 yardas y 11 touchdowns", "48 catches, 916 yards and 11 touchdowns"],
  ["CJ Carr", "QB", "Notre Dame", "+1000", "", ""],
  ["Darian Mensah", "QB", "Miami", "+1100", "1.438 yardas de pase y 15 touchdowns, sin intercepciones", "1,438 passing yards and 15 touchdowns, no interceptions"],
  ["Trinidad Chambliss", "QB", "Ole Miss", "+1500", "", ""],
  ["Keelon Russell", "QB", "Alabama", "+1500", "", ""],
  ["Gunner Stockton", "QB", "Georgia", "+1500", "", ""],
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
      es: `Cuota ${odds} para el Heisman en DraftKings (11 oct).${es ? ` Lleva ${es} en 2026.` : ""}`,
      en: `${odds} Heisman odds at DraftKings (11 Oct).${en ? ` ${en[0].toUpperCase()}${en.slice(1)} in 2026.` : ""}`,
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
