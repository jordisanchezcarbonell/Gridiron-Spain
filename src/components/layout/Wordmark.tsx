import { site } from "@/lib/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center bg-accent font-display text-base font-black leading-none text-white md:h-8 md:w-8 md:text-lg"
      >
        {site.brand.monogram}
      </span>
      <span className="font-display text-lg font-black uppercase leading-none tracking-[0.02em] text-paper md:text-xl">
        {site.brand.primary}<span className="text-accent"> {site.brand.accent}</span>
      </span>
    </span>
  );
}
