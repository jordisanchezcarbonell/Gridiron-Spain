import type { PlayerSpotlight } from "@/types";

const HEISMAN = ["nbc-heisman-odds-week5-2026"];
const BOARD = ["br-kiper-yates-big-board-2027"];

/** Heisman race as priced by DraftKings on 28 Sept 2026 (via NBC Sports). Odds, not votes. */
const heisman: [string, string, string, string, string, string][] = [
  // [name, position, school, odds, stats es, stats en]
  ["Jeremiah Smith", "WR", "Ohio State", "+260", "33 recepciones y 617 yardas", "33 catches for 617 yards"],
  ["Darian Mensah", "QB", "Miami", "+380", "1.211 yardas de pase y 0 intercepciones", "1,211 passing yards and no interceptions"],
  ["Kamario Taylor", "QB", "Mississippi State", "+500", "1.192 yardas de pase", "1,192 passing yards"],
  ["Jadan Baugh", "RB", "Florida", "+1100", "600 yardas de carrera en 83 acarreos", "600 rushing yards on 83 carries"],
  ["CJ Carr", "QB", "Notre Dame", "+1150", "963 yardas de pase", "963 passing yards"],
  ["Trinidad Chambliss", "QB", "Ole Miss", "+1200", "1.222 yardas de pase", "1,222 passing yards"],
];

/** Mel Kiper Jr.'s ESPN top-10 big board for the 2027 Draft (17 Aug 2026). Analyst opinion. */
const board: [string, string, string][] = [
  ["Jeremiah Smith", "WR", "Ohio State"],
  ["Colin Simmons", "EDGE", "Texas"],
  ["Leonard Moore", "CB", "Notre Dame"],
  ["Dante Moore", "QB", "Oregon"],
  ["Arch Manning", "QB", "Texas"],
  ["Dylan Stewart", "EDGE", "South Carolina"],
  ["Cam Coleman", "WR", "Texas"],
  ["CJ Carr", "QB", "Notre Dame"],
  ["Trevor Goosby", "OT", "Texas"],
  ["Jordan Seaton", "OT", "LSU"],
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
      es: `Cuota ${odds} para el Heisman en DraftKings (28 sep). Lleva ${es} en el arranque de 2026.`,
      en: `${odds} Heisman odds at DraftKings (28 Sep). ${en} so far in 2026.`,
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
      es: `N.º ${i + 1} del big board de Mel Kiper Jr. (ESPN) para el Draft de 2027, actualizado el 17 de agosto de 2026.`,
      en: `No. ${i + 1} on Mel Kiper Jr.'s (ESPN) 2027 Draft big board, updated 17 August 2026.`,
    },
    sourceIds: BOARD,
    verificationStatus: "partial",
  })),
];
