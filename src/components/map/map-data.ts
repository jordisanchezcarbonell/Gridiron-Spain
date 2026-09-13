import type { Locale } from "@/types/common";
import type { Competition, Team } from "@/types";
import { href } from "@/lib/i18n/routes";

/** Serialisable, minimal shape sent to the client-side map. */
export type MapPin = {
  id: string;
  slug: string;
  name: string;
  monogram: string;
  city: string;
  community: string;
  status: Team["status"];
  disciplines: Team["disciplines"];
  categories: Team["categories"];
  competitionIds: string[];
  competitionLabel?: string;
  /** Lower = higher level; used to sort the list. */
  rank: number;
  foundedYear?: number;
  venueName?: string;
  latitude: number;
  longitude: number;
  precision: "venue" | "city";
  href: string;
  logoUrl?: string;
};

const levelRank: Record<Competition["level"], number> = {
  professional: 0,
  "national-top": 1,
  european: 2,
  "national-second": 3,
  "national-third": 4,
  regional: 5,
  international: 6,
};

export function monogramFor(team: Pick<Team, "name" | "shortName">): string {
  const base = team.shortName ?? team.name;
  const words = base.split(/\s+/).filter(Boolean);
  const initials = words.length > 1 ? words.map((w) => w[0]).join("").slice(0, 2) : base.slice(0, 1);
  return initials.toUpperCase();
}

export function toMapPins(teams: Team[], competitions: Competition[], locale: Locale): MapPin[] {
  return teams.flatMap((team) => {
    const coords = team.venue?.coordinates;
    if (!coords) return [];
    const competitionIds = team.currentCompetitions.map((c) => c.competitionId);
    const comps = competitionIds
      .map((id) => competitions.find((c) => c.id === id))
      .filter((c): c is Competition => Boolean(c));
    const first = comps[0];
    const inactive = team.status !== "active";
    const rank = inactive ? 9 : comps.length ? Math.min(...comps.map((c) => levelRank[c.level])) : 8;
    return [
      {
        id: team.id,
        slug: team.slug,
        name: team.name,
        monogram: monogramFor(team),
        city: team.city,
        community: team.autonomousCommunity,
        status: team.status,
        disciplines: team.disciplines,
        categories: team.categories,
        competitionIds,
        competitionLabel: first ? (first.shortName ?? first.name) : undefined,
        rank,
        foundedYear: team.foundedYear,
        venueName: team.venue?.name?.[locale] ?? team.venue?.name?.es,
        latitude: coords.latitude,
        longitude: coords.longitude,
        precision: coords.precision,
        href: href(locale, "teams", team.slug),
        logoUrl: team.logo?.url,
      },
    ];
  });
}
