import { ImageResponse } from "next/og";

export const alt = "Connexis: vehicle tracking and fleet management in Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG template: white background, red reticle, page title (spec §8.4).
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff", padding: 80, position: "relative" }}>
        <svg width="520" height="520" viewBox="-60 -60 120 120" style={{ position: "absolute", right: -60, top: 55 }}>
          <path d="M 22.98 -19.28 A 30 30 0 1 0 22.98 19.28" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
          <circle r="18" fill="none" stroke="#e1251b" strokeWidth="4" />
          <path d="M0 -44V-10M0 10V44M-44 0H-10M10 0H44" stroke="#e1251b" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#5b5f66", fontWeight: 600 }}>CONNEXIS</div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.05, letterSpacing: -2 }}>Vehicle tracking that cuts your fleet costs.</div>
          <div style={{ fontSize: 28, color: "#5b5f66" }}>150,000+ devices · 29 cities · Since 2015</div>
        </div>
      </div>
    ),
    size
  );
}
