"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Camera, FileChartColumn, Fuel, Thermometer } from "lucide-react";
import { loadGsap, finePointer, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site";

// The real Connexis app in the middle, with the platform's key screens floating around it.
// Cards drift with the pointer at different depths.
export default function PlatformFloat() {
  const stage = useRef(null);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let off = () => {};
    loadGsap().then(({ gsap }) => {
      const el = stage.current;
      if (!el) return;
      const items = [...el.querySelectorAll("[data-depth]")].map((n) => ({
        d: parseFloat(n.dataset.depth),
        x: gsap.quickTo(n, "x", { duration: 0.9, ease: "power3" }),
        y: gsap.quickTo(n, "y", { duration: 0.9, ease: "power3" }),
      }));
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        items.forEach((it) => {
          it.x(mx * it.d * 60);
          it.y(my * it.d * 40);
        });
      };
      el.addEventListener("pointermove", move);
      off = () => el.removeEventListener("pointermove", move);
    });
    return () => off();
  }, []);

  return (
    <section aria-labelledby="platform-title" className="relative overflow-hidden bg-grey-100 pt-20 md:pt-28">
      <div className="container-x text-center">
        <p className="inline-flex items-center gap-2.5 text-[14px] text-grey-600">
          <span className="h-2 w-2 rounded-full bg-red-500" /> Platform
        </p>
        <h2 id="platform-title" data-split className="mx-auto mt-4 max-w-[900px] font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[80px]">
          See the platform before you buy.
        </h2>
        <p className="reveal mx-auto mt-6 max-w-[540px] text-[17px] text-grey-600 md:text-[19px]">
          A web portal and an Android and iOS app with 26 ready-made reports, alerts the moment something goes wrong, and live video from the cab.
        </p>
        <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/platform/" className="pill pill-dark">
            Explore the platform <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
          </Link>
          <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="pill pill-outline">
            Customer login
          </a>
        </div>
      </div>

      <div ref={stage} className="relative mx-auto mt-10 h-[560px] max-w-[1280px] md:mt-6 md:h-[720px]">
        <div data-depth="0.4" className="absolute bottom-0 left-1/2 h-[520px] w-[380px] -translate-x-1/2 md:h-[680px] md:w-[500px]">
          <Image src="/images/brand/connexis-app.png" alt="Connexis mobile app showing vehicle status, mileage, fuel and temperature" fill sizes="500px" className="object-contain object-bottom" />
        </div>

        <FloatCard depth={1.2} className="left-[2%] top-[8%] -rotate-6 md:left-[6%] md:top-[14%]">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <Fuel size={16} className="text-red-500" /> Tank level · Truck 07
          </div>
          <svg viewBox="0 0 220 70" className="mt-3 h-[70px] w-[220px]" aria-hidden="true">
            <path d="M0 40 L30 44 L36 10 L110 26 L140 32 L146 58 L220 66" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="143" cy="46" r="5" fill="#e1251b" />
          </svg>
          <p className="mt-2 inline-flex rounded-full bg-red-500 px-3 py-1 text-[12px] font-semibold text-white">Drop −70 L at 15:12</p>
        </FloatCard>

        <FloatCard depth={0.8} className="bottom-[10%] left-[1%] rotate-3 max-md:hidden md:left-[10%]">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <FileChartColumn size={16} className="text-red-500" /> 26 ready-made reports
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {["Trip", "Idle", "Over speed", "Geofence", "Fuel", "Driving"].map((r, i) => (
              <span key={r} className={`rounded-md px-2 py-2 text-[11px] font-medium ${i === 0 ? "bg-red-500 text-white" : "bg-grey-100"}`}>
                {r}
              </span>
            ))}
          </div>
        </FloatCard>

        <FloatCard depth={1.5} dark className="right-[2%] top-[4%] rotate-[5deg] md:right-[7%] md:top-[10%]">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <Camera size={16} className="text-red-500" /> AI dashcam · Cab
          </div>
          <div className="relative mt-3 h-[96px] w-[200px] overflow-hidden rounded-lg bg-[#2a2d33]">
            <div className="absolute bottom-0 left-1/2 h-[70%] w-[90%] -translate-x-1/2 bg-[#3a3e45] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />
            <span className="absolute left-[38%] top-[30%] h-9 w-12 rounded border-2 border-red-500" />
          </div>
          <p className="mt-2 text-[12px] text-white/70">Phone use flagged · clip saved</p>
        </FloatCard>

        <FloatCard depth={1} className="bottom-[14%] right-[1%] -rotate-3 md:right-[9%]">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <Thermometer size={16} className="text-red-500" /> Reefer · Zone 3
          </div>
          <p className="mt-2 font-display text-[34px] font-bold leading-none tracking-[-0.04em] text-red-500">9.2 °C</p>
          <p className="mt-1 text-[12px] text-grey-600">Above 8 °C for 12 min · SMS sent</p>
        </FloatCard>

        <FloatCard depth={1.8} className="right-[22%] top-[44%] rotate-2 max-md:hidden">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-[13px] font-semibold">Van 12 · 48 km/h</span>
          </div>
          <p className="mt-1 text-[12px] text-grey-600">Geofence entry · Depot 2</p>
        </FloatCard>
      </div>
    </section>
  );
}

function FloatCard({ depth, className = "", dark = false, children }) {
  return (
    <div data-depth={depth} className={`absolute ${className}`}>
      <div className={`rounded-2xl p-4 shadow-[0_24px_50px_rgba(0,0,0,0.12)] ${dark ? "bg-ink-900 text-white" : "bg-white text-ink-900"}`}>{children}</div>
    </div>
  );
}
