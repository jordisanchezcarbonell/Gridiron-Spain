import { isLocale } from "@/lib/i18n/config";
import { getRepository } from "@/lib/repositories";
import { loadDisplayFont, ogImage, OG_SIZE, truncate } from "@/lib/seo/og";

export const alt = "Primer Down — Rankings";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Share card: the current AP Top 5, regenerated whenever the ranking data changes. */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const [font, rankings] = await Promise.all([loadDisplayFont(), getRepository().getRankings()]);
  const ap = rankings.find((r) => r.scope === "ncaa");
  const top5 = ap?.groups[0]?.entries.slice(0, 5).map((e) => `${e.rank}. ${e.name}`).join("  ·  ");
  return ogImage({
    kicker: "Rankings",
    title: ap ? (ap.title[locale] ?? ap.title.es) : "Rankings",
    subtitle: top5 ? truncate(top5, 80) : undefined,
    badges: locale === "es" ? ["NCAA", "LNFA", "Europa", "Jugadores"] : ["NCAA", "LNFA", "Europe", "Players"],
    font,
  });
}

export const dynamic = "force-static";
