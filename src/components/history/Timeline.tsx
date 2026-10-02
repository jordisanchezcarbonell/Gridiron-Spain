import Link from "next/link";
import type { Locale, Source } from "@/types/common";
import type { Team, TimelineEvent } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";

type Props = {
  events: TimelineEvent[];
  teams: Team[];
  sources: Source[];
  locale: Locale;
  dict: Dictionary;
  compact?: boolean;
};

function decadeOf(year: number) {
  return `${Math.floor(year / 10) * 10}s`;
}

export function Timeline({ events, teams, sources, locale, dict, compact }: Props) {
  const groups = new Map<string, TimelineEvent[]>();
  for (const event of events) {
    const key = decadeOf(event.year);
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }

  return (
    <ol className="relative border-l-2 border-accent/30 pl-6 md:pl-10">
      {Array.from(groups.entries()).map(([decade, items]) => (
        <li key={decade} className="mb-12 last:mb-0">
          <div className="relative mb-6">
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+6px)] top-1/2 h-3 w-3 -translate-y-1/2 bg-accent md:-left-[calc(2.5rem+6px)]"
            />
            <div className="inline-flex items-center">
              <span className="flex h-8 items-center bg-accent px-3 font-display text-xl font-black text-white">
                {decade}
              </span>
              <div className="h-8 w-2 bg-accent/60" />
              <div className="h-8 w-1 bg-accent/30" />
            </div>
          </div>
          <ol className="space-y-4">
            {items.map((event) => (
              <TimelineItem
                key={event.id}
                event={event}
                teams={teams}
                sources={sources}
                locale={locale}
                dict={dict}
                compact={compact}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export function TimelineItem({
  event,
  teams,
  sources,
  locale,
  dict,
  compact,
}: {
  event: TimelineEvent;
  teams: Team[];
  sources: Source[];
  locale: Locale;
  dict: Dictionary;
  compact?: boolean;
}) {
  const related = (event.relatedTeamIds ?? [])
    .map((id) => teams.find((team) => team.id === id))
    .filter((team): team is Team => Boolean(team));
  const eventSources = event.sourceIds
    .map((id) => sources.find((s) => s.id === id))
    .filter((s): s is Source => Boolean(s));

  return (
    <li className="relative border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <span
        aria-hidden
        className="absolute -left-[calc(1.5rem+4px)] top-7 h-2 w-2 bg-surface-2 md:-left-[calc(2.5rem+4px)]"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-display text-3xl font-black text-accent">{event.year}</span>
      </div>
      <h4 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-paper">
        {t(event.title, locale)}
      </h4>
      {!compact && <details className="mt-3">
        <summary className="cursor-pointer font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-bright">{dict.history.expandDetails}</summary>
        <p className="mt-2 text-sm text-paper-2">{t(event.description, locale)}</p>
      {(related.length > 0 || event.relatedArticleSlug || eventSources.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.12em]">
          {related.map((team) => (
            <Link key={team.id} href={href(locale, "teams", team.slug)} className="text-accent hover:text-accent-bright">
              {team.name}
            </Link>
          ))}
          {event.relatedArticleSlug && (
            <Link href={href(locale, "articles", event.relatedArticleSlug)} className="inline-flex items-center gap-1 text-accent hover:text-accent-bright">
              {dict.common.readMore}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          {eventSources.length > 0 && (
            <span className="text-muted-2">
              {dict.common.sources}:{" "}
              {eventSources.map((s, i) => (
                <span key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                      {s.publisher}
                    </a>
                  ) : (
                    s.publisher
                  )}
                  {i < eventSources.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          )}
        </div>
      )}
      </details>}
    </li>
  );
}
