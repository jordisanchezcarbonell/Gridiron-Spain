import Link from "next/link";
import { cx } from "@/lib/utils";

type Props = {
  kicker?: string;
  title: string;
  sub?: string;
  cta?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ kicker, title, sub, cta, align = "left", className, as = "h2" }: Props) {
  const Heading = as;
  return (
    <div
      className={cx(
        "mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between",
        align === "center" && "text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className="max-w-2xl">
        {kicker && <p className="kicker mb-3">{kicker}</p>}
        <Heading className="display display-sm">{title}</Heading>
        {sub && <p className="mt-3 text-base text-muted md:text-lg">{sub}</p>}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-2 font-display text-base font-bold uppercase tracking-[0.08em] text-gold hover:text-gold-2"
        >
          {cta.label}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
