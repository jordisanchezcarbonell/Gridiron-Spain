import { getRepository } from "@/lib/repositories";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { regionFromSlug, regionName, regionSlug } from "@/lib/regions";
import { monogramFor } from "@/components/map/map-data";
import { loadDisplayFont, ogImage, OG_SIZE } from "@/lib/seo/og";

export const alt = "Gridiron Spain";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const teams = await getRepository().getTeams();
  const regions = Array.from(new Set(teams.map((team) => team.autonomousCommunity))).map((c) => ({ slug: regionSlug(c) }));
  return [...teams.map((team) => ({ slug: team.slug })), ...regions];
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const dict = getDictionary(locale);
  const font = await loadDisplayFont();
  const repo = getRepository();

  const region = regionFromSlug(slug);
  if (region) {
    const teams = (await repo.getTeams()).filter((team) => team.autonomousCommunity === region);
    const name = regionName(region, locale);
    return ogImage({
      kicker: dict.region.kicker,
      title: locale === "es" ? `Fútbol americano en ${name}` : `American football in ${name}`,
      subtitle: `${teams.length} ${dict.nav.teams.toLowerCase()} · ${teams.filter((x) => x.status === "active").length} ${dict.status.active.toLowerCase()}`,
      font,
    });
  }

  const team = await repo.getTeamBySlug(slug);
  if (!team) return ogImage({ kicker: dict.nav.teams, title: "Gridiron Spain", font });
  const competitions = await repo.getCompetitionsByIds(team.currentCompetitions.map((c) => c.competitionId));
  const badges = [dict.status[team.status], ...competitions.slice(0, 1).map((c) => c.shortName ?? c.name), ...team.disciplines.map((d) => dict.discipline[d])];
  return ogImage({
    kicker: dict.nav.teams,
    title: team.name,
    subtitle: `${team.city} · ${regionName(team.autonomousCommunity, locale)}${team.foundedYear ? ` · ${team.foundedYear}` : ""}`,
    monogram: monogramFor(team),
    badges,
    font,
  });
}

export const dynamic = "force-static";
