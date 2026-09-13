import Link from "next/link";
import type { Locale } from "@/types/common";
import type { AutonomousCommunity, Team } from "@/types";
import { href } from "@/lib/i18n/routes";
import { regionName, regionSlug } from "@/lib/regions";
import { cx } from "@/lib/utils";

/** Links to the per-region directory pages, with team counts. */
export function RegionChips({
  teams,
  locale,
  current,
  title,
}: {
  teams: Team[];
  locale: Locale;
  current?: AutonomousCommunity;
  title: string;
}) {
  const counts = new Map<AutonomousCommunity, number>();
  for (const team of teams) counts.set(team.autonomousCommunity, (counts.get(team.autonomousCommunity) ?? 0) + 1);
  const regions = Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));

  return (
    <nav aria-label={title} className="flex flex-wrap items-center gap-2">
      <span className="kicker mr-1 text-muted-2">{title}</span>
      {regions.map(([community, count]) => (
        <Link
          key={community}
          href={href(locale, "teams", regionSlug(community))}
          aria-current={current === community ? "page" : undefined}
          className={cx(
            "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors",
            current === community
              ? "border-gold bg-gold text-ink"
              : "border-line-strong bg-surface text-paper-2 hover:border-gold hover:text-gold",
          )}
        >
          {regionName(community, locale)}
          <span className={cx("font-mono text-[0.65rem]", current === community ? "text-ink/70" : "text-muted-2")}>{count}</span>
        </Link>
      ))}
    </nav>
  );
}
