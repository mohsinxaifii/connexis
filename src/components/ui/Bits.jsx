import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

export function Logo({ tone = "auto", className = "" }) {
  return (
    <span className={`logo logo--${tone} ${className}`}>
      <img className="logo__dark" src={asset("/images/brand/connexis-logo.png")} alt="Connexis" width="345" height="74" />
      <img className="logo__light" src={asset("/images/brand/connexis-logo-white.png")} alt="" aria-hidden="true" width="345" height="74" />
    </span>
  );
}

// The crosshair from the "O" of the Connexis logo.
export function Reticle({ size = 64, className = "", spin = false }) {
  return (
    <svg className={`reticle ${spin ? "reticle--spin" : ""} ${className}`} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
      <path d="M32 2v16M32 46v16M2 32h16M46 32h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const PKT = { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };

// Renders a stable placeholder on the server so hydration never mismatches.
export function Clock({ seconds = true }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const text = now ? now.toLocaleTimeString("en-GB", seconds ? PKT : { ...PKT, second: undefined }) : seconds ? "--:--:--" : "--:--";
  return (
    <time className="num" suppressHydrationWarning>
      {text}
    </time>
  );
}

export function Img({ src, alt = "", className = "", style, eager = false, width, height, sizes }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" } : {})}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
}

export function Photo({ photo, className = "", eager = false, children, grade = true }) {
  if (!photo) return null;
  return (
    <div className={`photo ${grade ? "photo--grade" : ""} ${className}`}>
      <Img src={photo.src} alt={photo.alt} eager={eager} style={{ objectPosition: photo.pos }} />
      {children}
    </div>
  );
}
