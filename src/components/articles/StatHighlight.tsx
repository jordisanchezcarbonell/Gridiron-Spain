export function StatHighlight({ from, to, text }: { from: string; to: string; text: string }) {
  return (
    <aside className="grain my-12 border-y border-line px-5 py-9 text-center sm:px-10" aria-label="Statistical highlight">
      <p className="font-display text-5xl font-black leading-none text-paper sm:text-7xl">
        {from} <span className="text-gold" aria-hidden="true">→</span> {to}
      </p>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper-2">{text}</p>
    </aside>
  );
}
