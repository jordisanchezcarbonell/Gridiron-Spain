import { isLocale } from "@/lib/i18n/config";
import { loadDisplayFont, ogImage, OG_SIZE } from "@/lib/seo/og";

export const alt = "Gridiron Spain — From Barcelona to Annapolis";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const font = await loadDisplayFont();
  return ogImage({
    kicker: "Gridiron Spain",
    title: "From Barcelona to Annapolis",
    subtitle: locale === "es" ? "Barcelona → Annapolis · Proyecto en preparación" : "Barcelona → Annapolis · Project in planning",
    badges: [locale === "es" ? "Serie editorial" : "Editorial series"],
    font,
  });
}

export const dynamic = "force-static";
