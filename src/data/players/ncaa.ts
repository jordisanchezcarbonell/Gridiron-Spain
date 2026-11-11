import type { PlayerSpotlight } from "@/types";

const HEISMAN = ["nbc-heisman-odds-week11-2026", "si-heisman-odds-week11-2026"];
const BOARD = ["espn-reid-rankings-2027-oct", "tsn-reid-rankings-2027-oct"];

/**
 * Heisman race as priced by DraftKings on 8 Nov 2026 (via NBC Sports), cross-checked
 * against FanDuel (via SI): same order, prices within a few points. Odds, not votes.
 * Stats only where both articles agree; otherwise the note gives the odds alone.
 */
const heisman: [string, string, string, string, string, string][] = [
  // [name, position, school, odds, stats es, stats en]
  ["CJ Carr", "QB", "Notre Dame", "+140", "2.168 yardas de pase, 21 touchdowns de pase y 3 de carrera, y una intercepción", "2,168 passing yards, 21 passing and 3 rushing touchdowns, and one interception"],
  ["Darian Mensah", "QB", "Miami", "+300", "2.701 yardas de pase, 28 touchdowns y 2 intercepciones", "2,701 passing yards, 28 touchdowns and 2 interceptions"],
  ["Jeremiah Smith", "WR", "Ohio State", "+410", "1.200 yardas de recepción y 14 touchdowns", "1,200 receiving yards and 14 touchdowns"],
  ["Devon Dampier", "QB", "Utah", "+1500", "2.053 yardas de pase, 20 touchdowns de pase y 7 de carrera, y 7 intercepciones", "2,053 passing yards, 20 passing and 7 rushing touchdowns, and 7 interceptions"],
  ["Drew Mestemaker", "QB", "Oklahoma State", "+1750", "", ""],
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
      es: `Cuota ${odds} para el Heisman en DraftKings (8 nov).${es ? ` Lleva ${es} en 2026.` : ""}`,
      en: `${odds} Heisman odds at DraftKings (8 Nov).${en ? ` ${en[0].toUpperCase()}${en.slice(1)} in 2026.` : ""}`,
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
