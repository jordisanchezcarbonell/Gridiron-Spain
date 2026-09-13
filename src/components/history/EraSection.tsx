import type { Locale, Source } from "@/types/common";
import type { Era, Team, TimelineEvent } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t } from "@/lib/i18n/text";
import { RichText } from "@/components/articles/ArticleBody";
import { TimelineItem } from "@/components/history/Timeline";

export function EraSection({
  era,
  index,
  events,
  teams,
  sources,
  locale,
  dict,
}: {
  era: Era;
  index: number;
  events: TimelineEvent[];
  teams: Team[];
  sources: Source[];
  locale: Locale;
  dict: Dictionary;
}) {
  const eraEvents = events.filter((e) => e.year >= era.from && e.year <= era.to);
  return (
    <section id={era.id} aria-labelledby={`${era.id}-title`} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="kicker mb-3">
          {String(index + 1).padStart(2, "0")} · {t(era.kicker, locale)}
        </p>
        <h2 id={`${era.id}-title`} className="display display-sm mb-5">
          {t(era.title, locale)}
        </h2>
        <div className="prose-editorial">
          {era.paragraphs.slice(0, 1).map((p, i) => <p key={i}><RichText text={t(p, locale)} sources={sources} /></p>)}
          {era.paragraphs.length > 1 && (
            <details className="mt-5 rounded-card border border-line bg-surface px-5 py-3">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.12em] text-gold">{dict.history.expandDetails}</summary>
              <div className="pt-2">{era.paragraphs.slice(1).map((p, i) => <p key={i}><RichText text={t(p, locale)} sources={sources} /></p>)}</div>
            </details>
          )}
        </div>
      </div>
      {eraEvents.length > 0 && (
        <div>
          <p className="kicker mb-4 text-muted-2">{dict.history.readEra}</p>
          <ol className="space-y-4">
            {eraEvents.map((event) => (
              <TimelineItem key={event.id} event={event} teams={teams} sources={sources} locale={locale} dict={dict} compact />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
