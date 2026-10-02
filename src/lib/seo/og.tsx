import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const DEFAULT_ACCENT = "#d6a84b";

let fontCache: Promise<ArrayBuffer | null> | null = null;

/**
 * Fetch an image and convert to base64 data URI.
 * Satori cannot load external URLs directly, so we must fetch and embed.
 */
export async function fetchImageAsBase64(url: string, timeoutMs = 5000): Promise<string | null> {
  try {
    const absoluteUrl = url.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${url}`
      : url;

    const buffer = await fetch(absoluteUrl, {
      signal: AbortSignal.timeout(timeoutMs),
      cache: "force-cache",
    }).then((r) => r.arrayBuffer());

    const base64 = Buffer.from(buffer).toString("base64");
    const ext = url.split(".").pop()?.toLowerCase();
    const mimeType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    return `data:${mimeType};base64,${base64}`;
  } catch {
    return null;
  }
}

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
  /** Primary accent color (e.g., team color). Defaults to gold. */
  accentColor?: string;
  /** Background image (base64 data URI). Used for articles with heroImage. */
  backgroundImageData?: string;
  /** Logo image (base64 data URI). Replaces monogram when provided. */
  logoData?: string;
};

/** Cut at a word boundary and add an ellipsis. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${cut.slice(0, at > max * 0.6 ? at : max).trimEnd()}…`;
}

/** Convert hex color to rgba with alpha. */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Shared editorial layout for team, region and article OG images. */
export function ogImage({ kicker, title, subtitle, monogram, badges = [], font, accentColor, backgroundImageData, logoData }: Props) {
  const family = font ? "Barlow Condensed" : "sans-serif";
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 72 : 92;
  const accent = accentColor || DEFAULT_ACCENT;

  // Build background styles
  const hasBackgroundImage = !!backgroundImageData;
  const backgroundStyle = hasBackgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(11,13,16,0.85) 0%, rgba(11,13,16,0.95) 100%), url(${backgroundImageData})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: accentColor
          ? `linear-gradient(135deg, ${hexToRgba(accent, 0.15)} 0%, #0b0d10 50%, #14171c 100%)`
          : "linear-gradient(135deg, #0b0d10 0%, #14171c 100%)",
      };

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
          color: "#f4f1ea",
          fontFamily: family,
          position: "relative",
          ...backgroundStyle,
        }}
      >
        {!hasBackgroundImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(to right, rgba(244,241,234,0.05) 0, rgba(244,241,234,0.05) 2px, transparent 2px, transparent 120px)",
            }}
          />
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: accent,
                color: "#0b0d10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                borderRadius: 6,
              }}
            >
              {site.brand.monogram}
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
              <span>{site.brand.primary}</span>
              <span style={{ color: accent, marginLeft: 10 }}>{site.brand.accent}</span>
            </div>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: accent, fontFamily: "monospace" }}>{kicker}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
          {(logoData || monogram) && (
            <div
              style={{
                width: 180,
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${accentColor ? hexToRgba(accent, 0.5) : "#343a44"}`,
                background: accentColor ? hexToRgba(accent, 0.1) : "#1b1f26",
                borderRadius: 10,
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {logoData ? (
                <img
                  src={logoData}
                  alt=""
                  style={{
                    width: 140,
                    height: 140,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontSize: 88, fontWeight: 800, color: "#e6e1d6" }}>{monogram}</span>
              )}
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
                      border: `1px solid ${hexToRgba(accent, 0.4)}`,
                      background: hexToRgba(accent, 0.15),
                      color: accent,
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
