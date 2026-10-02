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

export type NationalTeamCampaign = {
  name: LocalizedString;
  summary?: LocalizedString;
  games: NationalTeamGame[];
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
  /** Longer story for the team's own page, one paragraph per entry. */
  story?: LocalizedString[];
  honours?: { year: string; title: LocalizedString; sourceIds: string[] }[];
  staff?: { role: LocalizedString; name: string }[];
  /** Earlier tournaments, newest first. */
  pastCampaigns?: NationalTeamCampaign[];
  /** Published squad list, only when an official source lists it. */
  roster?: { names: string[]; label: LocalizedString; sourceIds: string[] };
  sourceIds: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
};
