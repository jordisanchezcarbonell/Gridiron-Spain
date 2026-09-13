import type { Locale, Source } from "@/types/common";
import type { GameFact } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t } from "@/lib/i18n/text";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export function GameCard({
  facts,
  sources,
  locale,
  dict,
}: {
  facts: GameFact[];
  sources: Source[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="card overflow-hidden">
      <dl className="divide-y divide-line">
        {facts.map((fact) => (
          <div key={t(fact.label, "es")} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{t(fact.label, locale)}</dt>
            <dd className="font-display text-xl font-bold uppercase text-paper">{t(fact.value, locale)}</dd>
            <dd>
              <VerificationBadge status={fact.verificationStatus} label={dict.verification[fact.verificationStatus]} />
            </dd>
          </div>
        ))}
      </dl>
      {sources.length > 0 && (
        <p className="border-t border-line px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-2">
          {dict.road.verifiedWith}:{" "}
          {sources.map((s, i) => (
            <span key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold">
                {s.title}
              </a>
              {i < sources.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
