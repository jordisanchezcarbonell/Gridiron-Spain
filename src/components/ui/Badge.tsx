import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "turf" | "signal" | "outline" | "gold";
  className?: string;
};

const tones = {
  neutral: "bg-surface-2 text-paper-2 border-line",
  accent: "bg-accent/15 text-accent border-accent/25",
  gold: "bg-gold/15 text-gold border-gold/25",
  turf: "bg-turf/15 text-turf border-turf/25",
  signal: "bg-signal/15 text-signal border-signal/25",
  outline: "bg-transparent text-muted border-line-strong",
};

export function Badge({ children, tone = "neutral", className }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center border px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
