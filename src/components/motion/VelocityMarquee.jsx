"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

// Marquee that drifts on its own and speeds up / skews with scroll velocity.
export default function VelocityMarquee({ children, speed = 40, className = "" }) {
  const track = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let tween, st, kill;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      const el = track.current;
      if (!el) return;
      el.classList.remove("marquee-track");
      tween = gsap.to(el, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3" });
      st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          gsap.to(tween, { timeScale: 1 + Math.min(6, Math.abs(v) / 250) * (v < 0 ? -1 : 1), duration: 0.2, overwrite: true });
          skew(Math.max(-8, Math.min(8, v / -300)));
        },
      });
      const settle = setInterval(() => {
        gsap.to(tween, { timeScale: 1, duration: 1.2 });
        skew(0);
      }, 400);
      kill = () => clearInterval(settle);
    });
    return () => {
      kill?.();
      tween?.kill();
      st?.kill();
    };
  }, [speed]);
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track flex w-max will-change-transform">
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
