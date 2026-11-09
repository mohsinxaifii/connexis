"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import CaseCover from "@/components/case/CaseCover";
import { loadGsap, finePointer, prefersReducedMotion } from "@/lib/motion";

// Big hover list. On desktop a preview card follows the cursor and swaps per row;
// on touch it shows the cover inline.
export default function IndustryList({ items }) {
  const wrap = useRef(null);
  const preview = useRef(null);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let off = () => {};
    loadGsap().then(({ gsap }) => {
      const el = preview.current;
      const w = wrap.current;
      if (!el || !w) return;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0, rotate: -6 });
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const r = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3" });
      let lx = 0;
      const move = (e) => {
        const b = w.getBoundingClientRect();
        x(e.clientX - b.left);
        y(e.clientY - b.top);
        r(Math.max(-12, Math.min(12, (e.clientX - lx) * 0.6)));
        lx = e.clientX;
      };
      const enter = () => gsap.to(el, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" });
      const leave = () => gsap.to(el, { scale: 0.6, opacity: 0, duration: 0.4 });
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
    <div ref={wrap} className="relative mt-14" onPointerLeave={() => setHover(-1)}>
      <ul className="border-t border-ink-900">
        {items.map((it, i) => (
          <li key={it.slug} className="reveal border-b border-grey-200" style={{ "--i": i }} onPointerEnter={() => setHover(i)}>
            <Link href={`/industries/${it.slug}/`} data-cursor="Explore" className="group flex items-center gap-6 py-7 md:py-9">
              <span className="w-10 font-mono text-[12px] tabular-nums text-grey-600 group-hover:text-red-500">0{i + 1}</span>
              <span className="flex-1">
                <span className="block font-display text-[30px] font-bold leading-none tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 md:text-[56px] lg:text-[72px]">
                  {it.name}
                </span>
                <span className="mt-3 block text-[14px] text-grey-600 md:hidden">{it.pains}</span>
              </span>
              <span className="hidden max-w-[260px] text-right text-[14px] text-grey-600 transition-opacity duration-300 md:block md:opacity-60 md:group-hover:opacity-100">{it.pains}</span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-grey-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white">
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[240px] w-[340px] overflow-hidden rounded-[14px] opacity-0 shadow-[0_30px_60px_rgba(0,0,0,0.25)] [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.slug} className="absolute inset-0 transition-[clip-path] duration-500 ease-[cubic-bezier(.16,1,.3,1)]" style={{ clipPath: i === hover ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", zIndex: i === hover ? 2 : 1 }}>
            <CaseCover kind={it.cover} />
          </div>
        ))}
      </div>
    </div>
  );
}
