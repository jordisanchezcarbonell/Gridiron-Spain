import type { PlayerSpotlight } from "@/types";

const HEISMAN = ["si-heisman-odds-week6-2026", "si-heisman-odds-fanduel-2026-10-04", "nbc-heisman-odds-week5-2026"];
const BOARD = ["espn-reid-rankings-2027-oct", "tsn-reid-rankings-2027-oct"];

/**
 * Heisman race as priced by DraftKings on 4 Oct 2026 (via SI). Odds, not votes.
 * Stats only where two sources agree; otherwise the note gives the odds alone.
 */
const heisman: [string, string, string, string, string, string][] = [
  // [name, position, school, odds, stats es, stats en]
  ["Jeremiah Smith", "WR", "Ohio State", "+115", "823 yardas de recepción y 9 touchdowns en cinco partidos", "823 receiving yards and 9 touchdowns in five games"],
  ["Darian Mensah", "QB", "Miami", "+460", "", ""],
  ["Keelon Russell", "QB", "Alabama", "+750", "", ""],
  ["CJ Carr", "QB", "Notre Dame", "+800", "", ""],
  ["Trinidad Chambliss", "QB", "Ole Miss", "+1600", "1.222 yardas de pase en cuatro partidos", "1,222 passing yards in four games"],
  ["Gunner Stockton", "QB", "Georgia", "+2900", "", ""],
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
      es: `Cuota ${odds} para el Heisman en DraftKings (4 oct).${es ? ` Lleva ${es} en 2026.` : ""}`,
      en: `${odds} Heisman odds at DraftKings (4 Oct).${en ? ` ${en[0].toUpperCase()}${en.slice(1)} in 2026.` : ""}`,
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
