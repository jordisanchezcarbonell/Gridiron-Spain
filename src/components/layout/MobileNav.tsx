"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; highlight?: boolean };

export function MobileNav({
  items,
  openLabel,
  closeLabel,
}: {
  items: Item[];
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Close the panel when the route changes (derived state, no effect needed).
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (pathname !== seenPathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="rounded-sm border border-line-strong px-3 py-1.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-paper hover:border-gold hover:text-gold"
      >
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-ink"
        >
          <nav aria-label="Mobile" className="container-content py-6">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    className={`block py-4 font-display text-2xl font-extrabold uppercase tracking-[0.04em] ${
                      item.highlight ? "text-gold" : "text-paper"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
