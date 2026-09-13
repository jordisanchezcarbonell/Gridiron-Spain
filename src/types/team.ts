import type {
  Coordinates,
  Honour,
  LocalizedString,
  Media,
  VerificationStatus,
} from "./common";

export type Discipline = "tackle" | "flag";

export type TeamCategory =
  | "senior-men"
  | "senior-women"
  | "junior"
  | "youth"
  | "mixed";

export type TeamStatus = "active" | "inactive" | "historical" | "unknown";

/** A team's participation in a competition, optionally for a given season. */
export type CompetitionReference = {
  competitionId: string;
  season?: string; // e.g. "2025", "2025-26"
  tier?: string; // e.g. "Serie A"
  verificationStatus: VerificationStatus;
  sourceIds?: string[];
};

export type Venue = {
  name?: LocalizedString;
  address?: string;
  coordinates?: Coordinates;
  verificationStatus: VerificationStatus;
};

export type SocialLinks = {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
};

export type Team = {
  id: string;
  slug: string;

  name: string;
  shortName?: string;
  nickname?: string;

  city: string;
  province?: string;
  autonomousCommunity: AutonomousCommunity;
  country: "ES";

  foundedYear?: number;
  foldedYear?: number;

  status: TeamStatus;
  disciplines: Discipline[];
  categories: TeamCategory[];

  currentCompetitions: CompetitionReference[];

  venue?: Venue;

  colors?: string[];
  logo?: Media;
  website?: string;
  socialLinks?: SocialLinks;

  /** One-paragraph neutral description. */
  summary: LocalizedString;

  /** Verified history in blocks; may be empty while research is pending. */
  history?: LocalizedString[];

  honours: Honour[];

  /** Source ids from src/data/sources. */
  sourceIds: string[];

  /** Article slugs that talk about this team. */
  relatedArticleSlugs?: string[];

  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string; // ISO date
  /** What is still pending, so editors know what to chase. */
  researchNotes?: LocalizedString;
};

export type AutonomousCommunity =
  | "Andalucía"
  | "Aragón"
  | "Asturias"
  | "Cantabria"
  | "Castilla-La Mancha"
  | "Castilla y León"
  | "Cataluña"
  | "Comunidad Valenciana"
  | "Extremadura"
  | "Galicia"
  | "Islas Baleares"
  | "Islas Canarias"
  | "La Rioja"
  | "Madrid"
  | "Murcia"
  | "Navarra"
  | "País Vasco"
  | "Ceuta"
  | "Melilla";
