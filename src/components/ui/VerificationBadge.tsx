import type { VerificationStatus } from "@/types/common";
import { cx } from "@/lib/utils";

type Props = {
  status: VerificationStatus;
  label: string;
  lastVerifiedLabel?: string;
  lastVerified?: string;
  size?: "sm" | "md";
  className?: string;
};

const styles: Record<VerificationStatus, string> = {
  verified: "text-turf border-turf/40 bg-turf/10",
  partial: "text-amber border-amber/40 bg-amber/10",
  unverified: "text-muted border-line-strong bg-surface-2",
};

const dot: Record<VerificationStatus, string> = {
  verified: "bg-turf",
  partial: "bg-amber",
  unverified: "bg-muted-2",
};

export function VerificationBadge({
  status,
  label,
  lastVerifiedLabel,
  lastVerified,
  size = "sm",
  className,
}: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-[0.14em]",
        size === "sm" ? "px-2 py-0.5 text-[0.62rem]" : "px-3 py-1 text-[0.7rem]",
        styles[status],
        className,
      )}
      title={lastVerified && lastVerifiedLabel ? `${lastVerifiedLabel}: ${lastVerified}` : undefined}
    >
      <span aria-hidden className={cx("h-1.5 w-1.5 rounded-full", dot[status])} />
      {status === "verified" && <span aria-hidden>✓</span>}
      {label}
      {lastVerified && size === "md" && (
        <span className="normal-case tracking-normal text-muted-2">· {lastVerified}</span>
      )}
    </span>
  );
}
