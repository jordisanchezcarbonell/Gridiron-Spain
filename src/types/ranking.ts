import type { LocalizedString, VerificationStatus } from "./common";

/**
 * A ranking is either reproduced from an external poll/standings table
 * (`poll`, `standings`) or computed by Primer Down from data already in
 * src/data (`computed`). Computed rankings must explain their method.
 */
export type RankingKind = "poll" | "standings" | "computed";

export type RankingEntry = {
  rank: number;
  /** Documented team id when a profile exists. */
  teamId?: string;
  name: string;
  /** Record or short stat line, e.g. "4-0" or "7-1 · 87.5 pts". */
  detail?: string;
  previousRank?: number;
  note?: LocalizedString;
};

export type RankingGroup = {
  name?: LocalizedString;
  entries: RankingEntry[];
};

export type Ranking = {
  id: string;
  /** Anchor on the rankings page. */
  slug: string;
  scope: "ncaa" | "spain" | "europe";
  kind: RankingKind;
  title: LocalizedString;
  description: LocalizedString;
  /** ISO date the ranking reflects. */
  asOf: string;
  competitionId?: string;
  method?: LocalizedString;
  groups: RankingGroup[];
  sourceIds: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string;
  /**
   * How often the ranking must be refreshed while its competition is live.
   * `npm run content:check` warns when `asOf` is older than `everyDays`
   * inside the [activeFrom, activeUntil] window (ISO dates).
   */
  refresh?: { everyDays: number; activeFrom: string; activeUntil: string };
};

export type PlayerGroup = "spain-nfl" | "spain-ncaa" | "spain-lnfa" | "spain-national-team" | "spain-prospect" | "ncaa-star" | "ncaa-prospect" | "europe";

/** A short, sourced player spotlight. No profile pages yet. */
export type PlayerSpotlight = {
  id: string;
  name: string;
  position: string;
  team: string;
  teamId?: string;
  league: string;
  group: PlayerGroup;
  hometown?: string;
  note: LocalizedString;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};
