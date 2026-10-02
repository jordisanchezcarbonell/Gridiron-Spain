import type { LocalizedString, VerificationStatus } from "./common";

/**
 * A game on the weekly "what to watch" agenda. Times are stored in UTC and
 * rendered in Europe/Madrid, so the agenda never hard-codes a time zone.
 */
export type ScheduledGame = {
  id: string;
  competitionId: string;
  /** ISO 8601 UTC, e.g. "2026-10-03T16:00:00Z". */
  kickoffUtc: string;
  away: string;
  home: string;
  awayTeamId?: string;
  homeTeamId?: string;
  awayRank?: number;
  homeRank?: number;
  venue?: string;
  /** US broadcaster, shown for context. */
  usTv?: string;
  /** Where to watch it in Spain, only when a source confirms it. */
  watchInSpain?: LocalizedString;
  note?: LocalizedString;
  featured?: boolean;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};

export type AgendaWeek = {
  id: string;
  /** Inclusive range in Spain dates (YYYY-MM-DD). */
  from: string;
  to: string;
  title: LocalizedString;
  intro: LocalizedString;
  /** How to watch each competition from Spain this season. */
  howToWatch: { competitionId: string; text: LocalizedString; sourceIds: string[] }[];
  games: ScheduledGame[];
  sourceIds: string[];
  lastVerifiedAt: string;
};
