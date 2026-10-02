import type { AgendaWeek, Competition, Locale, NationalTeam } from "@/types";
import { t } from "@/lib/i18n/text";

/** Games are listed as 3.5-hour events; national-team games without a time are all-day. */
const GAME_DURATION = "PT3H30M";

function escape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** RFC 5545 folding: lines longer than 75 octets continue with a leading space. */
function fold(line: string) {
  const bytes = new TextEncoder();
  const out: string[] = [];
  let current = "";
  for (const ch of line) {
    if (bytes.encode(current + ch).length > (out.length ? 74 : 75)) {
      out.push(current);
      current = ch;
    } else {
      current += ch;
    }
  }
  out.push(current);
  return out.join("\r\n ");
}

const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

type Input = {
  weeks: AgendaWeek[];
  nationalTeams: NationalTeam[];
  competitions: Competition[];
  locale: Locale;
  calendarName: string;
  url: string;
  generatedAt: string;
};

/** iCalendar feed of the weekend agenda and Spain's upcoming national-team games. */
export function buildCalendar({ weeks, nationalTeams, competitions, locale, calendarName, url, generatedAt }: Input) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Primer Down//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escape(calendarName)}`,
    "X-WR-TIMEZONE:Europe/Madrid",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];
  const dtstamp = stamp(generatedAt);

  for (const week of weeks) {
    for (const g of week.games) {
      const comp = competitions.find((c) => c.id === g.competitionId)?.shortName ?? g.competitionId;
      const summary = `${g.away} @ ${g.home} (${comp})`;
      const details = [g.note ? t(g.note, locale) : "", g.watchInSpain ? `${locale === "es" ? "En España" : "In Spain"}: ${t(g.watchInSpain, locale)}` : "", g.usTv ? `TV EE. UU.: ${g.usTv}` : ""].filter(Boolean).join("\n");
      lines.push(
        "BEGIN:VEVENT",
        `UID:${g.id}@primerdown`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${stamp(g.kickoffUtc)}`,
        `DURATION:${GAME_DURATION}`,
        `SUMMARY:${escape(summary)}`,
        ...(g.venue ? [`LOCATION:${escape(g.venue)}`] : []),
        ...(details ? [`DESCRIPTION:${escape(`${details}\n${url}`)}`] : [`DESCRIPTION:${escape(url)}`]),
        "END:VEVENT",
      );
    }
  }

  for (const team of nationalTeams) {
    for (const g of team.upcoming) {
      const day = g.date.replace(/-/g, "");
      const next = new Date(`${g.date}T12:00:00Z`);
      next.setUTCDate(next.getUTCDate() + 1);
      lines.push(
        "BEGIN:VEVENT",
        `UID:seleccion-${team.id}-${g.date}@primerdown`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${day}`,
        `DTEND;VALUE=DATE:${next.toISOString().slice(0, 10).replace(/-/g, "")}`,
        `SUMMARY:${escape(`${locale === "es" ? "España" : "Spain"} (${t(team.name, locale)}) vs ${g.opponent}`)}`,
        ...(g.venue ? [`LOCATION:${escape(g.venue)}`] : []),
        `DESCRIPTION:${escape([t(g.competition, locale), g.note ? t(g.note, locale) : ""].filter(Boolean).join("\n"))}`,
        "END:VEVENT",
      );
    }
  }

  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}
