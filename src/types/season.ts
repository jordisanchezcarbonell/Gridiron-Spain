import type { LocalizedString, VerificationStatus } from "./common";

/** A team slot in a season: either a documented team (teamId) or a plain name. */
export type SeasonEntry = {
  teamId?: string;
  name?: string;
  /** Regular-season record when known. */
  record?: { wins: number; losses: number; ties?: number };
  note?: LocalizedString;
};

export type SeasonGroup = {
  name: LocalizedString;
  entries: SeasonEntry[];
};

export type SeasonPhase = {
  name: LocalizedString;
  /** ISO dates; end optional for single-day phases. */
  start: string;
  end?: string;
  venue?: LocalizedString;
  result?: LocalizedString;
};

export type Season = {
  id: string;
  /** URL segment under the competition, e.g. "2026-27". */
  slug: string;
  competitionId: string;
  name: LocalizedString;
  status: "upcoming" | "in-progress" | "completed";
  summary: LocalizedString;
  format: LocalizedString;
  groups: SeasonGroup[];
  phases: SeasonPhase[];
  champion?: SeasonEntry;
  runnerUp?: SeasonEntry;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string;
};
