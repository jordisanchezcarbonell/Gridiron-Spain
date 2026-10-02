"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { normalize } from "@/lib/search";

export type SearchItem = {
  href: string;
  title: string;
  kind: string;
  detail?: string;
  /** Lower-cased, accent-free text the query is matched against. */
  haystack: string;
};

type Props = {
  items: SearchItem[];
  labels: { placeholder: string; empty: string; hint: string; results: string };
  initialQuery?: string;
};

/** Client-side search over a small prebuilt index; every word must match. */
export function SearchBox({ items, labels, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const results = useMemo(
    () => (words.length === 0 ? [] : items.filter((item) => words.every((w) => item.haystack.includes(w))).slice(0, 40)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, items],
  );

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        {labels.placeholder}
      </label>
      <input
        id="site-search"
        type="search"
        autoFocus
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={labels.placeholder}
        className="w-full border border-line-strong bg-surface px-5 py-4 font-display text-2xl text-paper placeholder:text-muted-2 focus:border-accent focus:outline-none"
      />
      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted" aria-live="polite">
        {words.length === 0 ? labels.hint : results.length === 0 ? labels.empty : `${results.length} ${labels.results}`}
      </p>
      {results.length > 0 && (
        <ul className="mt-6 divide-y divide-line border border-line bg-surface">
          {results.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="flex items-baseline gap-4 px-5 py-4 transition-colors hover:bg-surface-2">
                <span className="w-24 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">{r.kind}</span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold text-paper">{r.title}</span>
                  {r.detail && <span className="block truncate text-sm text-muted">{r.detail}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
