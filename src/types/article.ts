import type { LocalizedString, Media, VerificationStatus } from "./common";

export type ArticleCategory =
  | "historia"
  | "equipos"
  | "entrevistas"
  | "competiciones"
  | "cultura"
  | "ncaa"
  | "nfl"
  | "europa"
  | "viajes"
  | "road-to-annapolis";

export type ArticleStatus = "draft" | "researching" | "published";

/**
 * Structured content blocks. Deliberately small so it maps cleanly onto a
 * CMS rich-text model later. Inline citations use the token [[src:ID]] and
 * are rendered as numbered links to the article's source list.
 */
export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: LocalizedString; id?: string }
  | { type: "paragraph"; text: LocalizedString }
  | { type: "list"; items: LocalizedString[]; ordered?: boolean }
  | { type: "quote"; text: LocalizedString; attribution?: LocalizedString }
  | { type: "callout"; title?: LocalizedString; text: LocalizedString }
  | { type: "image"; media: Media; caption?: LocalizedString }
  | {
      type: "score";
      teamA: string;
      teamB: string;
      scoreA: string | number;
      scoreB: string | number;
      status: LocalizedString;
      logoA?: Media;
      logoB?: Media;
    }
  | {
      type: "timeline";
      items: Array<{
        score: string;
        time?: LocalizedString;
        description?: LocalizedString;
      }>;
    }
  | {
      type: "stat-highlight";
      from: string;
      to: string;
      text: LocalizedString;
    }
  | {
      /** Section still under research. Rendered as an honest placeholder. */
      type: "placeholder";
      topic: LocalizedString;
      pending?: LocalizedString[];
    };

export type Author = {
  id: string;
  name: string;
  role: LocalizedString;
  url?: string;
};

export type Article = {
  id: string;
  slug: string;

  title: LocalizedString;
  subtitle?: LocalizedString;
  excerpt: LocalizedString;

  heroImage?: Media;
  /** Localized editorial note shown when the selected hero image is still pending. */
  heroImagePending?: LocalizedString;

  authorId: string;
  category: ArticleCategory;
  tags: string[];

  relatedTeamIds: string[];
  relatedCompetitionIds: string[];

  content: ContentBlock[];

  sourceIds: string[];

  /** Locales in which the article is fully available. */
  availableLocales: Array<"es" | "en">;

  publishedAt: string;
  updatedAt: string;

  status: ArticleStatus;
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string;

  featured?: boolean;
  readingTimeMinutes?: number;
};
