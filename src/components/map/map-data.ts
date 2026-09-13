import type { Locale } from "@/types/common";
import type { Competition, Team } from "@/types";
import { href } from "@/lib/i18n/routes";

/** Serialisable, minimal shape sent to the client-side map. */
export type MapPin = {
  id: string;
  slug: string;
  name: string;
  city: string;
  community: string;
  status: Team["status"];
  disciplines: Team["disciplines"];
  categories: Team["categories"];
  competitionIds: string[];
  competitionLabel?: string;
  latitude: number;
  longitude: number;
  precision: "venue" | "city";
  href: string;
  logoUrl?: string;
};

export function toMapPins(teams: Team[], competitions: Competition[], locale: Locale): MapPin[] {
  return teams.flatMap((team) => {
    const coords = team.venue?.coordinates;
    if (!coords) return [];
    const competitionIds = team.currentCompetitions.map((c) => c.competitionId);
    const first = competitions.find((c) => c.id === competitionIds[0]);
    return [
      {
        id: team.id,
        slug: team.slug,
        name: team.name,
        city: team.city,
        community: team.autonomousCommunity,
        status: team.status,
        disciplines: team.disciplines,
        categories: team.categories,
        competitionIds,
        competitionLabel: first ? (first.shortName ?? first.name) : undefined,
        latitude: coords.latitude,
        longitude: coords.longitude,
        precision: coords.precision,
        href: href(locale, "teams", team.slug),
        logoUrl: team.logo?.url,
      },
    ];
  });
}
