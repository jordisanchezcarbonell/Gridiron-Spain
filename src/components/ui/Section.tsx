import Link from "next/link";
import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Section kicker label (e.g., "TEAMS", "STORIES") */
  kicker?: string;
  /** Main section title */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** CTA link */
  cta?: { href: string; label: string };
  /** Visual variant */
  variant?: "default" | "alt" | "hero";
  /** Adds top/bottom border */
  bordered?: boolean;
  /** Section ID for anchor links */
  id?: string;
  className?: string;
};

/**
 * Broadcast-style section wrapper with ESPN/NFL lower-third header treatment.
 */
export function Section({
  children,
  kicker,
  title,
  subtitle,
  cta,
  variant = "default",
  bordered = false,
  id,
  className,
}: Props) {
  const hasHeader = kicker || title;

  return (
    <section
      id={id}
      className={cx(
        "relative",
        variant === "alt" && "bg-ink-2",
        variant === "hero" && "overflow-hidden",
        bordered && "border-y border-line",
        className,
      )}
    >
      {/* Accent bar for alt sections */}
      {variant === "alt" && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent/40 to-transparent" />
      )}

      <div className="container-content py-14 md:py-20 lg:py-24">
        {hasHeader && (
          <SectionHeader kicker={kicker} title={title} subtitle={subtitle} cta={cta} />
        )}
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
  cta,
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <header className="mb-10 md:mb-12">
      {/* Lower-third style header bar */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-0">
          {/* Accent block */}
          {kicker && (
            <div className="flex items-center">
              <span className="flex h-8 items-center bg-accent px-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white">
                {kicker}
              </span>
              <div className="h-8 w-2 bg-accent/60" />
              <div className="h-8 w-1 bg-accent/30" />
            </div>
          )}
          {/* Title block */}
          {title && (
            <div className="flex h-8 items-center bg-surface px-4">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.02em] text-paper md:text-xl">
                {title}
              </h2>
            </div>
          )}
        </div>

        {/* CTA */}
        {cta && (
          <Link
            href={cta.href}
            className="group hidden items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.04em] text-muted transition-colors hover:text-accent sm:flex"
          >
            {cta.label}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
      )}

      {/* Mobile CTA */}
      {cta && (
        <Link
          href={cta.href}
          className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.04em] text-accent sm:hidden"
        >
          {cta.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </header>
  );
}
