/**
 * Research system types for Gridiron Spain editorial workflow.
 * These types are used for research data (pre-production) rather than published content.
 */

/** Confidence level for research findings */
export type ResearchConfidence = "CONFIRMED" | "REPORTED" | "RUMOR" | "UNKNOWN";

/** Source tier for credibility ranking */
export type SourceTier = "tier-1" | "tier-2" | "tier-3" | "tier-4";

/** Research source with full attribution */
export interface ResearchSource {
  url: string;
  title: string;
  publisher: string;
  accessedAt: string; // ISO date
  publishedAt?: string; // ISO date if known
  tier: SourceTier;
  notes?: string;
}

/** A single research finding with attribution */
export interface ResearchFinding {
  claim: string;
  confidence: ResearchConfidence;
  sources: ResearchSource[];
  notes?: string;
}

// ============================================================================
// TEAM RESEARCH
// ============================================================================

/** Team record (wins-losses-ties) */
export interface TeamRecord {
  wins: number;
  losses: number;
  ties?: number;
  conferenceWins?: number;
  conferenceLosses?: number;
  confidence: ResearchConfidence;
  source?: ResearchSource;
}

/** Coaching staff member */
export interface CoachInfo {
  name: string;
  role: string;
  yearsAtTeam?: number;
  confidence: ResearchConfidence;
  source?: ResearchSource;
}

/** Player info for research */
export interface PlayerInfo {
  name: string;
  position: string;
  number?: number;
  year?: string; // Freshman, Sophomore, etc.
  height?: string;
  weight?: string;
  hometown?: string;
  stats?: Record<string, string | number>;
  confidence: ResearchConfidence;
  source?: ResearchSource;
}

/** Social media links */
export interface SocialLinks {
  website?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
}

/** Team research profile */
export interface TeamResearch {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  city?: string;
  state?: string; // For US teams
  autonomousCommunity?: string; // For Spanish teams
  conference?: string;
  league?: string;
  division?: string;

  // Current status
  record?: TeamRecord;
  ranking?: {
    ap?: number;
    coaches?: number;
    cfp?: number;
    other?: Record<string, number>;
    confidence: ResearchConfidence;
    source?: ResearchSource;
  };

  // Venue
  stadium?: {
    name: string;
    city?: string;
    capacity?: number;
    confidence: ResearchConfidence;
    source?: ResearchSource;
  };

  // Identity
  colors?: string[];
  mascot?: string;
  foundedYear?: number;

  // Links
  officialWebsite?: string;
  socials?: SocialLinks;

  // Staff
  headCoach?: CoachInfo;
  coaches?: CoachInfo[];

  // Roster
  keyPlayers?: PlayerInfo[];
  rosterUrl?: string;

  // Schedule
  nextGame?: GameReference;
  recentResults?: GameResult[];
  scheduleUrl?: string;

  // Honours
  championships?: {
    title: string;
    years: number[];
    confidence: ResearchConfidence;
  }[];

  // Meta
  lastResearched: string; // ISO date
  researchNotes?: string;
  findings: ResearchFinding[];
}

// ============================================================================
// GAME RESEARCH
// ============================================================================

/** Reference to a game */
export interface GameReference {
  opponent: string;
  date: string; // ISO date
  time?: string;
  venue?: string;
  isHome?: boolean;
  tvChannel?: string;
}

/** Game result */
export interface GameResult {
  opponent: string;
  date: string;
  scoreFor: number;
  scoreAgainst: number;
  isWin: boolean;
  isHome: boolean;
  confidence: ResearchConfidence;
  source?: ResearchSource;
}

/** Storyline for game coverage */
export interface Storyline {
  headline: string;
  description: string;
  editorialPriority: 1 | 2 | 3 | 4 | 5;
  suggestedAngles?: string[];
  confidence: ResearchConfidence;
  sources: ResearchSource[];
}

/** Matchup analysis */
export interface MatchupAnalysis {
  area: string; // e.g., "Rushing Attack", "Secondary"
  teamAAdvantage?: string;
  teamBAdvantage?: string;
  keyMatchup?: string;
  confidence: ResearchConfidence;
}

/** Content idea for social/editorial */
export interface ContentIdea {
  format: "tiktok" | "reel" | "short" | "article" | "carousel" | "thread" | "post";
  hook: string;
  description: string;
  suggestedLength?: string;
}

/** Full game research */
export interface GameResearch {
  id: string;

  // Basic info
  teamA: string;
  teamB: string;
  date: string; // ISO date
  time?: string;
  timezone?: string;
  venue?: string;
  city?: string;
  tvChannel?: string;
  competition?: string;
  week?: number | string;

  // Context
  teamARecord?: TeamRecord;
  teamBRecord?: TeamRecord;
  teamARanking?: number;
  teamBRanking?: number;
  teamAStreak?: string; // e.g., "W3", "L2"
  teamBStreak?: string;
  seriesRecord?: {
    teamAWins: number;
    teamBWins: number;
    ties?: number;
    lastMeeting?: {
      date: string;
      score: string;
      winner: string;
    };
    confidence: ResearchConfidence;
    source?: ResearchSource;
  };

  // Analysis
  keyPlayersA?: PlayerInfo[];
  keyPlayersB?: PlayerInfo[];
  storylines?: Storyline[];
  matchups?: MatchupAnalysis[];

  // Recent news
  news?: {
    headline: string;
    summary: string;
    publishedAt: string;
    source: ResearchSource;
    confidence: ResearchConfidence;
  }[];

  // Injuries (only confirmed public)
  injuries?: {
    team: string;
    player: string;
    status: string; // "Out", "Questionable", "Probable"
    source: ResearchSource;
  }[];

  // Content
  contentIdeas?: ContentIdea[];

  // Meta
  lastResearched: string;
  researchNotes?: string;
  sources: ResearchSource[];
}

// ============================================================================
// DAILY BRIEFING
// ============================================================================

/** Story for daily briefing */
export interface BriefingStory {
  headline: string;
  summary: string;
  whyItMatters: string;
  editorialPriority: 1 | 2 | 3 | 4 | 5;
  category: "ncaa" | "spain" | "nfl" | "europe" | "recruiting" | "transfer";
  confidence: ResearchConfidence;
  sources: ResearchSource[];
  suggestedContent?: ContentIdea[];
}

/** Game to watch */
export interface GameToWatch {
  teams: string;
  date: string;
  time?: string;
  tvChannel?: string;
  whyWatch: string;
  storylines?: string[];
  editorialPriority: 1 | 2 | 3 | 4 | 5;
}

/** Player to watch */
export interface PlayerToWatch {
  name: string;
  team: string;
  position: string;
  whyWatch: string;
  recentStats?: string;
  source: ResearchSource;
}

/** Daily research briefing */
export interface DailyBriefing {
  date: string; // ISO date
  generatedAt: string; // ISO datetime

  // Headlines
  topStories: BriefingStory[];

  // By category
  ncaa?: {
    results?: GameResult[];
    rankings?: string;
    recruiting?: BriefingStory[];
    transferPortal?: BriefingStory[];
  };

  spain?: {
    results?: GameResult[];
    upcoming?: GameReference[];
    news?: BriefingStory[];
  };

  // Recommendations
  gamesToWatch: GameToWatch[];
  playersToWatch: PlayerToWatch[];
  contentOpportunities: ContentIdea[];
  evergreenIdeas?: ContentIdea[];

  // Meta
  sources: ResearchSource[];
}

// ============================================================================
// SPANISH TEAM DISCOVERY
// ============================================================================

/** Spanish team discovery result */
export interface SpanishTeamDiscovery {
  name: string;
  city?: string;
  autonomousCommunity?: string;
  league?: string;
  category?: string; // "senior-men", "senior-women", "junior", etc.
  discipline?: "tackle" | "flag";

  // What we found
  website?: string;
  socials?: Partial<SocialLinks>;

  // Verification
  confidence: ResearchConfidence;
  sources: ResearchSource[];

  // Action needed
  existsInDatabase: boolean;
  needsUpdate: boolean;
  suggestedActions?: string[];
}

// ============================================================================
// STORY DETECTION
// ============================================================================

/** Detected story opportunity */
export interface DetectedStory {
  id: string;
  type:
    | "upset"
    | "emerging-player"
    | "surprise-team"
    | "rivalry"
    | "record"
    | "coaching-change"
    | "ranking-movement"
    | "spanish-european"
    | "spanish-ncaa-connection"
    | "human-interest"
    | "tactical"
    | "statistical-anomaly";

  headline: string;
  description: string;
  whyItMatters: string;
  editorialPriority: 1 | 2 | 3 | 4 | 5;

  // Related entities
  teams?: string[];
  players?: string[];
  competitions?: string[];

  // Content potential
  suggestedFormats: ContentIdea["format"][];
  suggestedAngles: string[];

  // Timing
  timeRelevance: "breaking" | "today" | "this-week" | "evergreen";

  // Verification
  confidence: ResearchConfidence;
  sources: ResearchSource[];

  detectedAt: string; // ISO datetime
}

// ============================================================================
// CONTENT GENERATION
// ============================================================================

/** Content draft from sports-editor */
export interface ContentDraft {
  id: string;
  format: ContentIdea["format"];

  // Source research
  basedOn: string; // Path to research file

  // Content
  title?: string;
  hook?: string;
  body: string;
  hashtags?: string[];

  // Localization
  locale: "es" | "en";

  // Editorial
  tone: "informative" | "analytical" | "entertaining" | "urgent";
  targetAudience: "general" | "hardcore" | "casual";

  // Meta
  generatedAt: string;
  wordCount?: number;
  estimatedDuration?: string; // For video scripts

  // Review
  status: "draft" | "reviewed" | "approved" | "published";
  reviewNotes?: string;
}
