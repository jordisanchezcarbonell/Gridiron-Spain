import Image from "next/image";
import type { Team } from "@/types";
import { cx } from "@/lib/utils";

/**
 * Renders the club crest if we hold a usable image, otherwise a neutral
 * monogram. We never hotlink crests from club sites.
 */
export function TeamLogo({ team, size = 56, className }: { team: Team; size?: number; className?: string }) {
  if (team.logo) {
    return (
      <Image
        src={team.logo.url}
        alt={team.logo.alt.es}
        width={size}
        height={size}
        className={cx("rounded-sm object-contain", className)}
      />
    );
  }
  const initials = (team.shortName ?? team.name)
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cx(
        "grid shrink-0 place-items-center rounded-sm border border-line-strong bg-surface-2 font-display font-black leading-none text-paper-2",
        className,
      )}
    >
      {initials}
    </span>
  );
}
