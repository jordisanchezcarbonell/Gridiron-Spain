"use client";

import { useState } from "react";

/** Native share sheet on phones; copies the link elsewhere. */
export function ShareResult({ title, labels }: { title: string; labels: { share: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // The user closed the share sheet: nothing to do.
    }
  };

  return (
    <button type="button" onClick={share} className="inline-flex items-center bg-accent px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white hover:bg-accent-bright">
      {copied ? labels.copied : labels.share}
    </button>
  );
}
