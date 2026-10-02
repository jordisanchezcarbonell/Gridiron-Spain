import { cx } from "@/lib/utils";

type Props = {
  variant?: "default" | "accent" | "gradient";
  className?: string;
};

/**
 * Section divider with broadcast-style accents.
 */
export function Divider({ variant = "default", className }: Props) {
  return (
    <div
      className={cx(
        "h-px w-full",
        variant === "default" && "bg-line",
        variant === "accent" && "bg-accent",
        variant === "gradient" && "bg-gradient-to-r from-accent via-accent/40 to-transparent",
        className,
      )}
      role="separator"
    />
  );
}

/**
 * Broadcast-style section break with yardline pattern.
 */
export function SectionBreak({ className }: { className?: string }) {
  return (
    <div className={cx("relative py-8", className)}>
      <div className="absolute inset-0 yardlines opacity-20" />
      <div className="relative mx-auto h-0.5 w-24 bg-accent" />
    </div>
  );
}
