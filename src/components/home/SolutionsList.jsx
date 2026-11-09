"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PlatformVisual from "@/components/visuals/PlatformVisual";
import { loadGsap, finePointer, prefersReducedMotion } from "@/lib/motion";

// Archive-style list. On desktop the real platform screen for the hovered row follows the cursor.
export default function SolutionsList({ items }) {
  const wrap = useRef(null);
  const preview = useRef(null);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let off = () => {};
    loadGsap().then(({ gsap }) => {
      const el = preview.current;
      const w = wrap.current;
      if (!el || !w) return;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.7, autoAlpha: 0 });
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
      const r = gsap.quickTo(el, "rotate", { duration: 0.9, ease: "power3" });
      let lx = 0;
      const move = (e) => {
        const b = w.getBoundingClientRect();
        x(e.clientX - b.left + 40);
        y(e.clientY - b.top);
        r(Math.max(-10, Math.min(10, (e.clientX - lx) * 0.5)));
        lx = e.clientX;
      };
      const enter = () => gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
      const leave = () => gsap.to(el, { scale: 0.7, autoAlpha: 0, duration: 0.35 });
      w.addEventListener("pointermove", move);
      w.addEventListener("pointerenter", enter);
      w.addEventListener("pointerleave", leave);
      off = () => {
        w.removeEventListener("pointermove", move);
        w.removeEventListener("pointerenter", enter);
        w.removeEventListener("pointerleave", leave);
      };
    });
    return () => off();
  }, []);

  return (
    <div ref={wrap} className="relative mt-14 md:mt-20">
      <ul className="border-t border-ink-900">
        {items.map((it, i) => (
          <li key={it.slug} className="border-b border-grey-200" onPointerEnter={() => setHover(i)}>
            <Link href={`/${it.slug}/`} data-cursor="Explore" className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] md:py-8">
              <span className="font-display text-[30px] font-bold leading-[1] tracking-[-0.045em] transition-[transform,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 group-hover:text-red-500 md:text-[52px]">
                {it.name}
              </span>
              <span className="col-span-2 row-start-2 max-w-[440px] text-[15px] text-grey-600 md:col-span-1 md:row-start-auto md:text-[16px]">{it.short}</span>
              <span className="col-start-2 row-start-1 grid h-12 w-12 place-items-center rounded-full border border-grey-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white md:col-start-auto md:row-start-auto">
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[440px] [@media(hover:hover)_and_(pointer:fine)]:block" style={{ visibility: "hidden" }} aria-hidden="true">
        <div className="relative overflow-hidden rounded-[16px] shadow-[0_40px_80px_rgba(0,0,0,0.22)]">
          {items.map((it, i) => (
            <div key={it.slug} className={i === hover ? "relative" : "absolute inset-0"} style={{ clipPath: i === hover ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transition: "clip-path 500ms cubic-bezier(.16,1,.3,1)" }}>
              <PlatformVisual kind={it.visual} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
