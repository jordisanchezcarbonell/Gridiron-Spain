/**
 * Shared primitives used across every content model.
 *
 * Design rule: the UI never touches storage. Everything flows
 * local content (src/data) -> repository (src/lib/repositories) -> UI.
 * When Payload CMS replaces the local content, only the repository changes.
 */

export type Locale = "es" | "en";

/** Text that exists in Spanish and optionally in English. */
export type LocalizedString = {
  es: string;
  en?: string;
};

/**
 * Editorial credibility metadata. Every fact-bearing entity carries it.
 * - verified:   confirmed against at least one primary/official source
 * - partial:    some fields verified, others pending
 * - unverified: name/city-level information only, needs research
 */
export type VerificationStatus = "verified" | "partial" | "unverified";

export type SourceType =
  | "federation"
  | "club-official"
  | "league-official"
  | "press"
  | "interview"
  | "archive"
  | "official-document"
  | "encyclopedia"
  | "other";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  publishedAt?: string; // ISO date
  accessedAt: string; // ISO date
  sourceType: SourceType;
  notes?: LocalizedString;
};

export type Media = {
  url: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
  photographer?: string;
  source?: string;
  license?: string;
  permissionNotes?: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
  /** venue = exact field; city = city-centre fallback */
  precision: "venue" | "city";
};

export type Honour = {
  title: LocalizedString;
  competitionId?: string;
  year: number;
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};
