"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion, finePointer } from "@/lib/motion";

// Desktop cursor follower: a small reticle that opens up over links, and a solid red bubble with a
// word ("Open", "Explore", "Drag") over elements marked [data-cursor]. The native cursor stays on.
export default function Cursor() {
  const ring = useRef(null);
  const bubble = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let off = () => {};
    loadGsap().then(({ gsap }) => {
      const r = ring.current;
      const b = bubble.current;
      if (!r || !b) return;
      gsap.set([r, b], { xPercent: -50, yPercent: -50 });
      gsap.set(b, { scale: 0 });
      const rx = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3" });
      const ry = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3" });
      const bx = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3" });
      const by = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3" });
      let state = "";
      let shown = false;

      const move = (e) => {
        if (!shown) {
          gsap.to(r, { autoAlpha: 1, duration: 0.2 });
          shown = true;
        }
        rx(e.clientX);
        ry(e.clientY);
        bx(e.clientX);
        by(e.clientY);
        const t = e.target.closest?.("[data-cursor], a, button, summary, input, select, textarea, label");
        let next = "";
        if (t?.dataset?.cursor) next = `label:${t.dataset.cursor}`;
        else if (t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) next = "hide";
        else if (t) next = "link";
        if (next === state) return;
        state = next;
        if (next.startsWith("label:")) {
          label.current.textContent = next.slice(6);
          gsap.to(b, { scale: 1, duration: 0.45, ease: "back.out(1.8)" });
          gsap.to(r, { scale: 0.4, autoAlpha: 0, duration: 0.25 });
        } else {
          gsap.to(b, { scale: 0, duration: 0.3, ease: "power3.in" });
          gsap.to(r, { scale: next === "link" ? 1.6 : 1, rotate: next === "link" ? 45 : 0, autoAlpha: next === "hide" ? 0 : 1, duration: 0.3 });
        }
      };
      const leave = () => {
        gsap.to([r, b], { autoAlpha: 0, duration: 0.2 });
        shown = false;
        state = "";
      };
      const enter = () => gsap.set(b, { autoAlpha: 1 });
      window.addEventListener("pointermove", move);
      document.documentElement.addEventListener("pointerleave", leave);
      document.documentElement.addEventListener("pointerenter", enter);
      off = () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        document.documentElement.removeEventListener("pointerenter", enter);
      };
    });
    return () => off();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[999] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ring} className="invisible absolute left-0 top-0 h-7 w-7 opacity-0">
        <svg viewBox="-20 -20 40 40" className="h-full w-full overflow-visible">
          <circle r="9" fill="none" stroke="#e1251b" strokeWidth="1.5" />
          <path d="M0 -17V-12M0 12V17M-17 0H-12M12 0H17" stroke="#e1251b" strokeWidth="1.5" strokeLinecap="round" />
          <circle r="1.8" fill="#e1251b" />
        </svg>
      </div>
      <div ref={bubble} className="absolute left-0 top-0 grid h-[92px] w-[92px] place-items-center rounded-full bg-red-500 shadow-[0_10px_30px_rgba(225,37,27,0.35)]">
        <span ref={label} className="text-[14px] font-semibold text-white" />
      </div>
    </div>
  );
}
