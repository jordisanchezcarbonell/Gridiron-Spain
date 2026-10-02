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
        className="flex h-9 w-9 items-center justify-center border border-line-strong bg-surface font-display text-sm font-bold text-paper transition-colors hover:border-accent hover:text-accent"
      >
        {open ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
      </button>
      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[3.625rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-ink/95 backdrop-blur-md"
        >
          {/* Accent bar continuation */}
          <div className="h-0.5 bg-gradient-to-r from-accent via-accent to-transparent" />
          <nav aria-label="Mobile" className="container-content py-8">
            <ul className="flex flex-col gap-1">
              {items.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 font-display text-2xl font-black uppercase tracking-[0.02em] transition-colors ${
                      item.highlight ? "text-accent" : "text-paper hover:text-accent"
                    }`}
                    style={{ animationDelay: `${i * 30}ms` }}
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
