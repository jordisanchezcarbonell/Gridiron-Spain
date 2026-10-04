import { isLocale } from "@/lib/i18n/config";
import { loadDisplayFont, ogImage, OG_SIZE } from "@/lib/seo/og";
import { quizResults } from "@/data/quiz/nfl-team";

export const alt = "Primer Down — ¿Qué equipo de la NFL deberías seguir?";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return quizResults.map((r) => ({ team: r.id }));
}

/** Share card for a quiz result: the team in its colour, plus the invite to play. */
export default async function Image({ params }: { params: Promise<{ lang: string; team: string }> }) {
  const { lang, team } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const result = quizResults.find((r) => r.id === team) ?? quizResults[0];
  const font = await loadDisplayFont();
  return ogImage({
    kicker: locale === "es" ? "Test NFL" : "NFL quiz",
    title: result.name,
    subtitle: `${locale === "es" ? "Mi equipo de la NFL" : "My NFL team"} · ${result.tagline[locale] ?? result.tagline.es}`,
    badges: [locale === "es" ? "¿Y el tuyo?" : "What's yours?"],
    accentColor: result.color === "#0b162a" ? "#c83803" : result.color,
    font,
  });
}

export const dynamic = "force-static";
