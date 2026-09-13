import Link from "next/link";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display font-bold uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-2",
  secondary: "border border-line-strong bg-transparent text-paper hover:border-gold hover:text-gold",
  ghost: "text-paper hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
