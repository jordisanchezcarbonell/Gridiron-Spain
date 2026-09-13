import type { LocalizedString, VerificationStatus } from "./common";

export type TimelineEvent = {
  id: string;
  year: number;
  /** Optional ISO date when the exact day is known. */
  date?: string;
  title: LocalizedString;
  description: LocalizedString;
  relatedTeamIds?: string[];
  relatedCompetitionIds?: string[];
  relatedArticleSlug?: string;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};
