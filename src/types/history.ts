import type { LocalizedString, VerificationStatus } from "./common";

/** A club slot in a final: documented team by id, or plain name. */
export type FinalSide = { teamId?: string; name?: string };

/** One edition of a competition final (Spanish Bowl, Copa de España, ...). */
export type Final = {
  competitionId: string;
  year: number;
  /** Edition number when the organiser numbers it (e.g. 32 for XXXII). */
  edition?: number;
  champion?: FinalSide;
  runnerUp?: FinalSide;
  score?: string;
  venue?: LocalizedString;
  /** e.g. "suspended (COVID-19)" */
  note?: LocalizedString;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};

/** Narrative era for the history page; timeline events are grouped by year range. */
export type Era = {
  id: string;
  from: number;
  to: number;
  title: LocalizedString;
  kicker: LocalizedString;
  paragraphs: LocalizedString[];
  sourceIds: string[];
};
