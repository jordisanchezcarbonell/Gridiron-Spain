import type { Locale, Source } from "@/types/common";
import { formatDate } from "@/lib/i18n/text";

type Props = {
  sources: Source[];
  locale: Locale;
  title: string;
  intro?: string;
  accessedLabel: string;
  lastVerified?: string;
  lastVerifiedLabel?: string;
  id?: string;
};

const typeLabel: Record<Source["sourceType"], { es: string; en: string }> = {
  federation: { es: "Federación", en: "Federation" },
  "club-official": { es: "Web oficial del club", en: "Club official site" },
  "league-official": { es: "Liga oficial", en: "League official" },
  press: { es: "Prensa", en: "Press" },
  interview: { es: "Entrevista", en: "Interview" },
  archive: { es: "Archivo", en: "Archive" },
  "official-document": { es: "Documento oficial", en: "Official document" },
  encyclopedia: { es: "Enciclopedia", en: "Encyclopedia" },
  other: { es: "Otra", en: "Other" },
};

export function SourceList({
  sources,
  locale,
  title,
  intro,
  accessedLabel,
  lastVerified,
  lastVerifiedLabel,
  id = "sources",
}: Props) {
  if (sources.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="rule mt-14 pt-8">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id={`${id}-title`} className="display display-sm">
          {title}
        </h2>
        {lastVerified && lastVerifiedLabel && (
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
            {lastVerifiedLabel}: {formatDate(lastVerified, locale)}
          </span>
        )}
      </div>
      {intro && <p className="mb-6 max-w-prose text-sm text-muted">{intro}</p>}
      <ol className="space-y-4">
        {sources.map((source, index) => (
          <li key={source.id} id={`src-${source.id}`} className="flex gap-4 text-sm">
            <span className="w-8 shrink-0 font-mono text-gold">[{index + 1}]</span>
            <div className="min-w-0">
              <p className="text-paper">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold-dim underline-offset-4 hover:decoration-gold"
                  >
                    {source.title}
                  </a>
                ) : (
                  source.title
                )}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">
                {source.publisher} · {typeLabel[source.sourceType][locale]}
                {source.publishedAt && ` · ${formatDate(source.publishedAt, locale)}`}
                {` · ${accessedLabel} ${formatDate(source.accessedAt, locale)}`}
              </p>
              {source.notes && (
                <p className="mt-1 text-xs text-muted">{source.notes[locale] ?? source.notes.es}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
