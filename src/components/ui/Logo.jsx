/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// CONFIRM: swap for the official SVG logo once supplied (spec §10.1). Small PNG, so a plain <img> is fine.
export default function Logo({ className = "", height = 30, light = false, scale = 1 }) {
  const width = Math.round((345 / 74) * height);
  return (
    <Link
      href="/"
      aria-label="Connexis home"
      className={`relative inline-flex shrink-0 origin-left items-center transition-transform duration-300 ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <img src="/images/brand/connexis-logo.png" alt="Connexis" width={width} height={height} className={`transition-opacity duration-300 ${light ? "opacity-0" : "opacity-100"}`} />
      <img src="/images/brand/connexis-logo-white.png" alt="" aria-hidden="true" width={width} height={height} className={`absolute left-0 top-0 transition-opacity duration-300 ${light ? "opacity-100" : "opacity-0"}`} />
    </Link>
  );
}
