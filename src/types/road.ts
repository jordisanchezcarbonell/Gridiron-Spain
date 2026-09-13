import type { LocalizedString, VerificationStatus } from "./common";

export type RoadStop = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  label: LocalizedString;
};

export type RoadChapter = {
  number: number;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  status: "published" | "researching" | "planned";
  articleSlug?: string;
};

export type GameFact = {
  label: LocalizedString;
  value: LocalizedString;
  verificationStatus: VerificationStatus;
  sourceIds: string[];
};

export type PartnershipType =
  | "accommodation"
  | "travel"
  | "game-day"
  | "food"
  | "connectivity"
  | "apparel"
  | "media"
  | "other";

export type Partner = {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  partnershipType: PartnershipType;
  campaign?: string;
  startDate?: string;
  endDate?: string;
  disclosure: LocalizedString;
  /** Partners are never displayed until confirmed = true. */
  confirmed: boolean;
};
