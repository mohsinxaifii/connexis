"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadGsap, prefersReducedMotion, finePointer } from "@/lib/motion";

let lenis = null;

// Site-wide motion layer: Lenis smooth scroll synced to ScrollTrigger, SplitText line reveals on
// [data-split] headings, scroll parallax on [data-speed], and magnetic [data-magnetic] buttons.
// Nothing here is required for content to be readable; it all degrades to the static page.
export default function MotionRoot() {
  const pathname = usePathname();

  // Smooth scroll, once per session
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let tick;
    Promise.all([import("lenis"), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled || lenis) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Per-page effects
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx;
    let splits = [];
    const cleanups = [];
    let alive = true;

    loadGsap().then(({ gsap, ScrollTrigger, SplitText }) => {
      if (!alive) return;
      ctx = gsap.context(() => {
        // Headings: lines rise out of a mask
        document.querySelectorAll("[data-split]").forEach((el) => {
          if (el.dataset.splitDone) return;
          el.dataset.splitDone = "1";
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          const hero = el.dataset.split === "hero";
          gsap.from(split.lines, {
            yPercent: 110,
            duration: hero ? 1.2 : 1,
            stagger: hero ? 0.09 : 0.07,
            ease: "expo.out",
            delay: hero ? 0.15 : 0,
            scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        });

        // Parallax
        document.querySelectorAll("[data-speed]").forEach((el) => {
          const s = parseFloat(el.dataset.speed);
          gsap.to(el, {
            yPercent: s * -20,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });

      // Magnetic buttons
      if (finePointer()) {
        document.querySelectorAll("[data-magnetic], .btn:not(.w-full)").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          const move = (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      // 3D tilt cards
      if (finePointer()) {
        document.querySelectorAll("[data-tilt]").forEach((el) => {
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
          const move = (e) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 7);
            rx(((e.clientY - r.top) / r.height - 0.5) * -7);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      alive = false;
      cleanups.forEach((f) => f());
      ctx?.revert();
      splits.forEach((s) => s.revert());
      document.querySelectorAll("[data-split-done]").forEach((el) => delete el.dataset.splitDone);
    };
  }, [pathname]);

  return null;
}
