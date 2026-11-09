"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (n, plain) => (plain ? String(n) : n.toLocaleString("en-US"));

// The real number is server-rendered; the count-up is decoration that only runs if the stat
// starts below the fold, so crawlers and no-JS visitors never see "0".
export default function CountUp({ value, suffix = "", plain = false, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(fmt(value, plain));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const from = plain ? Math.max(0, value - 11) : 0;
    setDisplay(fmt(from, plain));
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const step = (now) => {
          const k = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          setDisplay(fmt(Math.round(from + (value - from) * eased), plain));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, plain]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
