import type { Locale } from "@/types/common";
import { absoluteUrl } from "@/lib/site";

const copy = {
  es: { title: "Llévalo a tu calendario", text: "Los partidos de la agenda y de la selección, con la hora española, se actualizan solos en tu calendario.", apple: "Apple / Outlook", google: "Google Calendar", file: "Descargar .ics" },
  en: { title: "Add it to your calendar", text: "Agenda and national-team games, in Spanish time, update themselves in your calendar.", apple: "Apple / Outlook", google: "Google Calendar", file: "Download .ics" },
};

/** Subscribe links for the /[lang]/calendar.ics feed. */
export function CalendarSubscribe({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const path = `/${locale}/calendar.ics`;
  const webcal = absoluteUrl(path).replace(/^https?:/, "webcal:");
  const google = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`;
  const btn = "inline-flex items-center border border-line-strong bg-surface px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-accent hover:text-accent";
  return (
    <div className="border border-line bg-surface p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{text.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-paper-2">{text.text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={webcal} className={btn}>
          {text.apple}
        </a>
        <a href={google} target="_blank" rel="noopener noreferrer" className={btn}>
          {text.google}
        </a>
        <a href={path} className={btn}>
          {text.file}
        </a>
      </div>
    </div>
  );
}
