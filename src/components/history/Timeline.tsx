import Link from "next/link";
import type { Locale, Source } from "@/types/common";
import type { Team, TimelineEvent } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

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
    <ol className="relative border-l border-line pl-6 md:pl-10">
      {Array.from(groups.entries()).map(([decade, items]) => (
        <li key={decade} className="mb-12 last:mb-0">
          <div className="relative mb-6">
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+5px)] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gold md:-left-[calc(2.5rem+5px)]"
            />
            <h3 className="display display-sm text-gold">{decade}</h3>
          </div>
          <ol className="space-y-6">
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
    <li className="card relative p-5">
      <span
        aria-hidden
        className="absolute -left-[calc(1.5rem+3px)] top-7 h-1.5 w-1.5 rounded-full bg-line-strong md:-left-[calc(2.5rem+3px)]"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-display text-3xl font-black text-paper">{event.year}</span>
        <VerificationBadge status={event.verificationStatus} label={dict.verification[event.verificationStatus]} />
      </div>
      <h4 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-paper">
        {t(event.title, locale)}
      </h4>
      {!compact && <p className="mt-2 text-sm text-paper-2">{t(event.description, locale)}</p>}
      {!compact && (related.length > 0 || event.relatedArticleSlug || eventSources.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          {related.map((team) => (
            <Link key={team.id} href={href(locale, "teams", team.slug)} className="text-gold hover:text-gold-2">
              {team.name}
            </Link>
          ))}
          {event.relatedArticleSlug && (
            <Link href={href(locale, "articles", event.relatedArticleSlug)} className="text-gold hover:text-gold-2">
              {dict.common.readMore} →
            </Link>
          )}
          {eventSources.length > 0 && (
            <span className="text-muted-2">
              {dict.common.sources}:{" "}
              {eventSources.map((s, i) => (
                <span key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold">
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
    </li>
  );
}
