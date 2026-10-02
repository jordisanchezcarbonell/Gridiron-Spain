import type { LocalizedString, VerificationStatus } from "./common";
import type { Discipline } from "./team";

export type NationalTeamGame = {
  /** Spain date, YYYY-MM-DD. */
  date: string;
  opponent: string;
  venue?: string;
  competition: LocalizedString;
  /** Spain's points first, e.g. "26-22". Omitted for upcoming games. */
  score?: string;
  result?: "win" | "loss" | "tie";
  note?: LocalizedString;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};

/** One of Spain's national teams (senior, women's, flag, youth). */
export type NationalTeam = {
  id: string;
  name: LocalizedString;
  discipline: Discipline;
  coach?: string;
  competition?: LocalizedString;
  summary: LocalizedString;
  results: NationalTeamGame[];
  upcoming: NationalTeamGame[];
  sourceIds: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
};
