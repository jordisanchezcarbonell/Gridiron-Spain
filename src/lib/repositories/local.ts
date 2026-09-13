import type { ContentRepository } from "./types";
import type { Article, Competition, Partner, Season, Source, Team, TimelineEvent } from "@/types";
import { teams } from "@/data/teams";
import { competitions } from "@/data/competitions";
import { articles } from "@/data/articles";
import { sources } from "@/data/sources";
import { timeline } from "@/data/timeline";
import { partners } from "@/data/road";
import { seasons } from "@/data/seasons";

/**
 * MVP repository backed by TypeScript data files in src/data.
 * Everything is synchronous underneath but exposed as Promises so the UI
 * does not change when a CMS/database replaces it.
 */
export class LocalContentRepository implements ContentRepository {
  async getTeams(): Promise<Team[]> {
    return [...teams].sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  async getTeamBySlug(slug: string): Promise<Team | null> {
    return teams.find((team) => team.slug === slug) ?? null;
  }

  async getTeamsByIds(ids: string[]): Promise<Team[]> {
    return ids
      .map((id) => teams.find((team) => team.id === id))
      .filter((team): team is Team => Boolean(team));
  }

  async getCompetitions(): Promise<Competition[]> {
    return [...competitions];
  }

  async getCompetitionBySlug(slug: string): Promise<Competition | null> {
    return competitions.find((c) => c.slug === slug) ?? null;
  }

  async getCompetitionsByIds(ids: string[]): Promise<Competition[]> {
    return ids
      .map((id) => competitions.find((c) => c.id === id))
      .filter((c): c is Competition => Boolean(c));
  }

  async getArticles(options?: { includeDrafts?: boolean }): Promise<Article[]> {
    const list = options?.includeDrafts
      ? articles
      : articles.filter((a) => a.status !== "draft");
    return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return articles.find((a) => a.slug === slug && a.status !== "draft") ?? null;
  }

  async getArticlesByTeam(teamId: string): Promise<Article[]> {
    const all = await this.getArticles();
    return all.filter((a) => a.relatedTeamIds.includes(teamId));
  }

  async getArticlesByCategory(category: Article["category"]): Promise<Article[]> {
    const all = await this.getArticles();
    return all.filter((a) => a.category === category);
  }

  async getSeasonsByCompetition(competitionId: string): Promise<Season[]> {
    return seasons.filter((s) => s.competitionId === competitionId).sort((a, b) => b.slug.localeCompare(a.slug));
  }

  async getSeason(competitionId: string, slug: string): Promise<Season | null> {
    return seasons.find((s) => s.competitionId === competitionId && s.slug === slug) ?? null;
  }

  async getSeasons(): Promise<Season[]> {
    return [...seasons];
  }

  async getSourcesByIds(ids: string[]): Promise<Source[]> {
    return ids
      .map((id) => sources.find((s) => s.id === id))
      .filter((s): s is Source => Boolean(s));
  }

  async getTimeline(): Promise<TimelineEvent[]> {
    return [...timeline].sort((a, b) => a.year - b.year || (a.date ?? "").localeCompare(b.date ?? ""));
  }

  async getConfirmedPartners(): Promise<Partner[]> {
    return partners.filter((p) => p.confirmed);
  }
}
