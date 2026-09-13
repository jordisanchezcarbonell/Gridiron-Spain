import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "turf" | "signal" | "outline";
  className?: string;
};

const tones = {
  neutral: "bg-surface-2 text-paper-2 border-line",
  gold: "bg-gold/15 text-gold border-gold/30",
  turf: "bg-turf/15 text-turf border-turf/30",
  signal: "bg-signal/15 text-signal border-signal/30",
  outline: "bg-transparent text-muted border-line-strong",
};

export function Badge({ children, tone = "neutral", className }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
