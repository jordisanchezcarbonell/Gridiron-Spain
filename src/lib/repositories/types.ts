import type {
  Article,
  Competition,
  Era,
  Final,
  Partner,
  Season,
  Source,
  Team,
  TimelineEvent,
} from "@/types";

/**
 * The single contract the UI depends on.
 * Implementations: LocalContentRepository (MVP) -> PayloadRepository (later).
 */
export interface ContentRepository {
  // Teams
  getTeams(): Promise<Team[]>;
  getTeamBySlug(slug: string): Promise<Team | null>;
  getTeamsByIds(ids: string[]): Promise<Team[]>;

  // Competitions
  getCompetitions(): Promise<Competition[]>;
  getCompetitionBySlug(slug: string): Promise<Competition | null>;
  getCompetitionsByIds(ids: string[]): Promise<Competition[]>;

  // Articles
  getArticles(options?: { includeDrafts?: boolean }): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  getArticlesByTeam(teamId: string): Promise<Article[]>;
  getArticlesByCategory(category: Article["category"]): Promise<Article[]>;

  // Seasons
  getSeasonsByCompetition(competitionId: string): Promise<Season[]>;
  getSeason(competitionId: string, slug: string): Promise<Season | null>;
  getSeasons(): Promise<Season[]>;

  // Sources
  getSourcesByIds(ids: string[]): Promise<Source[]>;

  // History
  getTimeline(): Promise<TimelineEvent[]>;
  getEras(): Promise<Era[]>;
  getFinals(competitionId?: string): Promise<Final[]>;

  // Partners (Road to Annapolis)
  getConfirmedPartners(): Promise<Partner[]>;
}
