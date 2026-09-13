import { ImageResponse } from "next/og";

export const alt = "Gridiron Spain — American football in Spain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#d6a84b",
              color: "#0b0d10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              borderRadius: 8,
            }}
          >
            GS
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
            <span>Gridiron</span>
            <span style={{ color: "#d6a84b", marginLeft: 12 }}>Spain</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.95, textTransform: "uppercase" }}>
            American football lives here too.
          </div>
          <div style={{ fontSize: 30, color: "#a7adb5" }}>Teams, history and culture from Barcelona to the rest of Spain.</div>
        </div>
      </div>
    ),
    size,
  );
}
