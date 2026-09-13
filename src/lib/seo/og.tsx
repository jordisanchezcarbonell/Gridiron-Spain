import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

let fontCache: Promise<ArrayBuffer | null> | null = null;

/**
 * Load Barlow Condensed 800 for OG images at build time. Falls back to the
 * default font silently when the network is unavailable.
 */
export function loadDisplayFont(): Promise<ArrayBuffer | null> {
  if (!fontCache) {
    fontCache = (async () => {
      try {
        // Without a browser User-Agent, Google Fonts serves TTF, which the OG
        // renderer (Satori) can consume; woff2 cannot be used.
        const css = await fetch("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800", {
          headers: { "User-Agent": "curl/8" },
        }).then((r) => r.text());
        const match = css.match(/url\((https:[^)]+)\)/);
        if (!match) return null;
        return await fetch(match[1]).then((r) => r.arrayBuffer());
      } catch {
        return null;
      }
    })();
  }
  return fontCache;
}

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  monogram?: string;
  badges?: string[];
  font: ArrayBuffer | null;
};

/** Cut at a word boundary and add an ellipsis. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${cut.slice(0, at > max * 0.6 ? at : max).trimEnd()}…`;
}

/** Shared editorial layout for team, region and article OG images. */
export function ogImage({ kicker, title, subtitle, monogram, badges = [], font }: Props) {
  const family = font ? "Barlow Condensed" : "sans-serif";
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 72 : 92;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0b0d10 0%, #14171c 100%)",
          color: "#f4f1ea",
          fontFamily: family,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(to right, rgba(244,241,234,0.05) 0, rgba(244,241,234,0.05) 2px, transparent 2px, transparent 120px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "#d6a84b",
                color: "#0b0d10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                borderRadius: 6,
              }}
            >
              GS
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
              <span>Gridiron</span>
              <span style={{ color: "#d6a84b", marginLeft: 10 }}>Spain</span>
            </div>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#d6a84b", fontFamily: "monospace" }}>{kicker}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
          {monogram && (
            <div
              style={{
                width: 180,
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #343a44",
                background: "#1b1f26",
                borderRadius: 10,
                fontSize: 88,
                fontWeight: 800,
                color: "#e6e1d6",
                flexShrink: 0,
              }}
            >
              {monogram}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
            <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: -1 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 30, color: "#a7adb5", fontFamily: "sans-serif" }}>{subtitle}</div>}
            {badges.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {badges.map((b) => (
                  <div
                    key={b}
                    style={{
                      padding: "6px 14px",
                      border: "1px solid rgba(214,168,75,0.4)",
                      background: "rgba(214,168,75,0.15)",
                      color: "#d6a84b",
                      fontSize: 20,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      fontFamily: "monospace",
                      borderRadius: 4,
                    }}
                  >
                    {b}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: "Barlow Condensed", data: font, weight: 800, style: "normal" }] : undefined,
    },
  );
}
