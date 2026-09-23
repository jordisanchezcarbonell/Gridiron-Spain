type TimelineItem = { score: string; time?: string; description?: string };

export function ComebackTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="my-10 border-y border-line py-6" aria-label="Score progression">
      <ol className="grid gap-4 sm:grid-cols-4 sm:gap-0">
        {items.map((item, index) => (
          <li key={`${item.score}-${index}`} className="relative flex gap-3 sm:block sm:px-4 sm:first:pl-0 sm:last:pr-0">
            <span className="mt-2 h-px w-6 shrink-0 bg-gold sm:absolute sm:top-0 sm:left-0 sm:mt-0 sm:w-full" aria-hidden="true" />
            <div className="relative sm:pt-5">
              <p className="font-display text-4xl font-bold leading-none text-paper">{item.score}</p>
              {item.time && <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-gold">{item.time}</p>}
              {item.description && <p className="mt-1 text-sm leading-snug text-muted">{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
