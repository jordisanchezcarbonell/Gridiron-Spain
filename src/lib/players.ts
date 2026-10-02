import type { PlayerGroup, PlayerSpotlight } from "@/types";

/** Groups that get their own profile page: the archive's Spanish focus. */
export const PROFILE_GROUPS: PlayerGroup[] = ["spain-lnfa", "spain-national-team", "spain-prospect", "spain-nfl", "spain-ncaa", "europe"];

export type PlayerProfile = {
  slug: string;
  name: string;
  spotlights: PlayerSpotlight[];
  hasPage: boolean;
};

export function playerSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** One profile per person: spotlights sharing a name are merged. */
export function buildPlayerProfiles(spotlights: PlayerSpotlight[]): PlayerProfile[] {
  const bySlug = new Map<string, PlayerProfile>();
  for (const s of spotlights) {
    const slug = playerSlug(s.name);
    const profile = bySlug.get(slug) ?? { slug, name: s.name, spotlights: [], hasPage: false };
    profile.spotlights.push(s);
    if (PROFILE_GROUPS.includes(s.group)) profile.hasPage = true;
    bySlug.set(slug, profile);
  }
  return [...bySlug.values()];
}
