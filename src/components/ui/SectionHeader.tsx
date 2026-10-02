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
        "mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between",
        align === "center" && "text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className="max-w-2xl">
        {kicker && <p className="kicker mb-2">{kicker}</p>}
        <Heading className="display display-sm">{title}</Heading>
        {sub && <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.06em] text-accent transition-colors hover:text-accent-bright"
        >
          {cta.label}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
