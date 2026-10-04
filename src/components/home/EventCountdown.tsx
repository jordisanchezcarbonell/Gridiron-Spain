"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  /** ISO UTC kickoff. The banner hides itself once the game has started. */
  startsAt: string;
  href: string;
  title: string;
  subtitle: string;
  labels: { days: string; day: string; today: string; cta: string };
};

/**
 * Days-to-kickoff banner. Computed in the browser so the count stays right on a
 * statically built page; renders nothing on the server to avoid a stale number.
 */
export function EventCountdown({ startsAt, href, title, subtitle, labels }: Props) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const ms = Date.parse(startsAt) - Date.now();
      setDays(ms <= 0 ? -1 : Math.floor(ms / 86_400_000));
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [startsAt]);

  if (days === null || days < 0) return null;

  return (
    <section className="border-b border-line bg-gradient-to-r from-accent/15 via-ink-2 to-ink-2">
      <Link href={href} className="container-content group flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
        <span className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-black leading-none text-accent">{days === 0 ? labels.today : days}</span>
          {days > 0 && <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{days === 1 ? labels.day : labels.days}</span>}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-bold uppercase text-paper">{title}</span>
          <span className="block text-sm text-paper-2">{subtitle}</span>
        </span>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent transition-colors group-hover:text-accent-bright">{labels.cta} →</span>
      </Link>
    </section>
  );
}
