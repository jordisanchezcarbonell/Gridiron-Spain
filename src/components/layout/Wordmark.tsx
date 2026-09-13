export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-sm bg-gold font-display text-lg font-black leading-none text-ink"
      >
        GS
      </span>
      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-[0.04em] text-paper">
        Gridiron<span className="text-gold"> Spain</span>
      </span>
    </span>
  );
}
