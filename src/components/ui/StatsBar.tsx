import { cx } from "@/lib/utils";

type StatItem = {
  value: string;
  label: string;
  hint?: string;
};

type Props = {
  stats: StatItem[];
  className?: string;
};

/**
 * ESPN/NFL scoreboard-style stats bar.
 * Displays key metrics in a horizontal strip with accent dividers.
 */
export function StatsBar({ stats, className }: Props) {
  return (
    <div className={cx("relative", className)}>
      {/* Background bar */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent to-accent/20" />

      {/* Stats grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cx(
              "relative flex flex-col items-center justify-center py-5 text-center md:py-6",
              i !== 0 && "before:absolute before:left-0 before:top-1/2 before:h-8 before:-translate-y-1/2 before:w-px before:bg-line",
            )}
          >
            <span className="font-display text-3xl font-black uppercase leading-none text-paper md:text-4xl lg:text-5xl">
              {stat.value}
            </span>
            <span className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.15em] text-muted md:text-[0.625rem]">
              {stat.label}
            </span>
            {stat.hint && (
              <span className="mt-0.5 text-[0.625rem] text-muted-2">{stat.hint}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Single large stat for hero sections.
 */
export function HeroStat({ value, label, hint }: StatItem) {
  return (
    <div className="relative pl-4">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-accent" />

      <span className="block font-display text-4xl font-black uppercase leading-none text-paper md:text-5xl">
        {value}
      </span>
      <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      {hint && (
        <span className="mt-0.5 block text-xs text-muted-2">{hint}</span>
      )}
    </div>
  );
}
