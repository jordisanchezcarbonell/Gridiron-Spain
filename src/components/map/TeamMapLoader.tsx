"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import type { TeamMap as TeamMapComponent } from "./TeamMap";

/**
 * Leaflet touches `window`, so the map is loaded client-side only and lazily.
 * With `lazy`, the Leaflet bundle and the tiles are not requested until the
 * map scrolls near the viewport (keeps the home and team pages light).
 */
const TeamMap = dynamic(() => import("./TeamMap").then((m) => m.TeamMap), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton({ height = "70vh" }: { height?: string }) {
  return (
    <div
      role="status"
      aria-label="…"
      className="grid w-full place-items-center rounded-card border border-line bg-ink-2 yardlines text-sm text-muted"
      style={{ height }}
    />
  );
}

type Props = ComponentProps<typeof TeamMapComponent> & { lazy?: boolean };

export function TeamMapLoader({ lazy = false, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(!lazy);

  useEffect(() => {
    if (ready || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ready]);

  return <div ref={ref}>{ready ? <TeamMap {...props} /> : <MapSkeleton height={props.height} />}</div>;
}
