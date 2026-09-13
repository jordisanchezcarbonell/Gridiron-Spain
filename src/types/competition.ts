import type { LocalizedString, VerificationStatus } from "./common";
import type { Discipline } from "./team";

export type CompetitionLevel =
  | "national-top"
  | "national-second"
  | "national-third"
  | "regional"
  | "european"
  | "professional"
  | "international";

export type CompetitionStatus = "active" | "historical" | "unknown";

export type Competition = {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  organizer: string;
  country: string; // ISO code or "EU"
  level: CompetitionLevel;
  discipline: Discipline;
  status: CompetitionStatus;
  foundedYear?: number;
  endedYear?: number;
  description: LocalizedString;
  website?: string;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string;
};
