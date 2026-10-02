import { isLocale, locales } from "@/lib/i18n/config";
import { getRepository } from "@/lib/repositories";
import { href } from "@/lib/i18n/routes";
import { absoluteUrl } from "@/lib/site";
import { buildCalendar } from "@/lib/ics";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const repo = getRepository();
  const [weeks, nationalTeams, competitions] = await Promise.all([repo.getAgendaWeeks(), repo.getNationalTeams(), repo.getCompetitions()]);
  const body = buildCalendar({
    weeks,
    nationalTeams,
    competitions,
    locale: lang,
    calendarName: lang === "es" ? "Primer Down · Agenda de football" : "Primer Down · Football schedule",
    url: absoluteUrl(href(lang, "agenda")),
    generatedAt: new Date().toISOString(),
  });
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="primer-down.ics"', "Cache-Control": "public, max-age=3600" },
  });
}
