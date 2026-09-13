export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-gold/60 pl-4">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-2">{label}</span>
      <span className="font-display text-3xl font-extrabold uppercase leading-none text-paper md:text-4xl">
        {value}
      </span>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  );
}
