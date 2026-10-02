import { isLocale } from "@/lib/i18n/config";
import { getRepository } from "@/lib/repositories";
import { loadDisplayFont, ogImage, OG_SIZE, truncate } from "@/lib/seo/og";

export const alt = "Primer Down — Agenda";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Share card for the newest weekend agenda. */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const [font, weeks] = await Promise.all([loadDisplayFont(), getRepository().getAgendaWeeks()]);
  const week = weeks[0];
  const range = week
    ? new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { timeZone: "UTC", day: "numeric", month: "long" }).formatRange(new Date(`${week.from}T12:00:00Z`), new Date(`${week.to}T12:00:00Z`))
    : undefined;
  return ogImage({
    kicker: locale === "es" ? "Agenda" : "Schedule",
    title: week ? truncate(week.title[locale] ?? week.title.es, 90) : locale === "es" ? "Qué ver este finde" : "What to watch this weekend",
    subtitle: range ? (locale === "es" ? `${range} · hora peninsular` : `${range} · Spanish time`) : undefined,
    badges: ["NFL", "NCAA", locale === "es" ? "Europa" : "Europe"],
    font,
  });
}

export const dynamic = "force-static";
