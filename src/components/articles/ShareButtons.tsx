"use client";

import { useState } from "react";

export function ShareButtons({
  url,
  title,
  label,
  copyLabel,
  copiedLabel,
}: {
  url: string;
  title: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const linkClass =
    "rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted hover:border-gold hover:text-gold";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={label}>
      <span className="kicker mr-1 text-muted-2">{label}</span>
      <a className={linkClass} href={`https://x.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a className={linkClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a className={linkClass} href={`https://wa.me/?text=${text}%20${encoded}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <button type="button" onClick={copy} className={linkClass} aria-live="polite">
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
