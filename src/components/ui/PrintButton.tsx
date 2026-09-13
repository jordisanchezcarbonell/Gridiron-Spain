"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-sm border border-line-strong px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-paper hover:border-gold hover:text-gold print:hidden"
    >
      {label}
    </button>
  );
}
