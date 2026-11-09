"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CaseCover from "./CaseCover";
import PlatformVisual from "@/components/visuals/PlatformVisual";

const COVERS = ["pepsi", "meezan", "waste", "cctv", "insurance", "container"];

// Swipe on touch (scroll-snap), arrows on desktop.
export default function CaseGallery({ items, label }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);

  const go = (d) => {
    const el = ref.current;
    const next = Math.max(0, Math.min(items.length - 1, i + d));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative h-full" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={ref}
        onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto"
      >
        {items.map((it, k) => (
          <div key={k} className="relative h-full min-h-[260px] w-full shrink-0 snap-center" aria-label={`${k + 1} of ${items.length}`} role="group">
            {COVERS.includes(it) ? (
              <CaseCover kind={it} />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-grey-100 p-4 md:p-8">
                <PlatformVisual kind={it} className="w-full max-w-[640px]" />
              </div>
            )}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((_, k) => (
              <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-red-500" : "w-1.5 bg-white/70 ring-1 ring-black/10"}`} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={i === 0}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-md transition-opacity disabled:opacity-0 md:grid"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={i === items.length - 1}
            aria-label="Next image"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-md transition-opacity disabled:opacity-0 md:grid"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
