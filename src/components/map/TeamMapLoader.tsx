"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { TeamMap as TeamMapComponent } from "./TeamMap";

/**
 * Leaflet touches `window`, so the map is loaded client-side only and lazily.
 * Keeping the dynamic import inside a Client Component is required by the
 * App Router (ssr:false is not allowed in Server Components).
 */
const TeamMap = dynamic(() => import("./TeamMap").then((m) => m.TeamMap), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="grid w-full place-items-center rounded-card border border-line bg-ink-2 text-sm text-muted"
      style={{ height: "70vh" }}
    >
      …
    </div>
  ),
});

export function TeamMapLoader(props: ComponentProps<typeof TeamMapComponent>) {
  return <TeamMap {...props} />;
}
