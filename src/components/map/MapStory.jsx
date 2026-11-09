"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CITIES, LABELS, SEA_ROUTE, toXZ } from "./geo";
import StaticMap from "./StaticMap";
import LiveClock from "@/components/hero/LiveClock";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/*
  The Lock-On map (art direction A). One WebGL map of Pakistan is pinned while the page scrolls; the camera
  flies between stops and the Connexis reticle locks onto each story. All copy is server-rendered in the
  panels below, so crawlers, no-JS and reduced-motion visitors get the same content as a normal page.
*/

const LL = (lon, lat) => {
  const [x, z] = toXZ(lon, lat);
  return { tx: x, tz: z };
};

const STOPS = [
  { name: "Pakistan", cam: { ...LL(69.4, 30.6), dist: 4.3, pitch: 0.98, yaw: -0.22 }, lock: null, layers: { city: 1, focus: 0, fleet: 0, branch: 0, roads: 1 } },
  { name: "Lahore", cam: { ...LL(74.35, 31.55), dist: 1.3, pitch: 0.82, yaw: 0.38 }, lock: CITIES.lahore, layers: { city: 0.35, focus: 1, fx: "lahore", fr: 0.2, fleet: 0, branch: 0, roads: 1 } },
  { name: "South Punjab", cam: { ...LL(71.6, 29.8), dist: 1.65, pitch: 1.0, yaw: -0.18 }, lock: [71.6, 29.8], layers: { city: 0.25, focus: 0.6, fx: [71.6, 29.8], fr: 0.5, fleet: 1, branch: 0, roads: 0.5 } },
  { name: "Branches", cam: { ...LL(70.6, 29.6), dist: 3.4, pitch: 1.12, yaw: 0.12 }, lock: CITIES.islamabad, layers: { city: 0.4, focus: 0, fleet: 0, branch: 1, roads: 0.35 } },
  { name: "Karachi port", cam: { ...LL(65.8, 24.3), dist: 1.7, pitch: 0.78, yaw: -0.5 }, lock: "sea", layers: { city: 0.3, focus: 0.8, fx: "karachi", fr: 0.22, fleet: 0, branch: 0, roads: 0.7 } },
  { name: "Nationwide", cam: { ...LL(69.4, 30.6), dist: 4.5, pitch: 0.92, yaw: 0.26 }, lock: null, layers: { city: 1, focus: 0, fleet: 0, branch: 0, roads: 1 } },
];

const TOASTS = [
  null,
  { title: "Head office", meta: "Lahore · since 2015" },
  { title: "Under-used vehicle flagged", meta: "Fleet review · South Punjab" },
  { title: "Fuel drop detected — 18 L", meta: "Branch generator · live alert" },
  { title: "Container CX-4471", meta: "Solar · satellite link · door closed" },
  null,
];

const focusXZ = (fx) => (typeof fx === "string" ? toXZ(...CITIES[fx]) : toXZ(...fx));

export default function MapStory() {
  const section = useRef(null);
  const pin = useRef(null);
  const mapEl = useRef(null);
  const labelsEl = useRef(null);
  const reticle = useRef(null);
  const toast = useRef(null);
  const counter = useRef(null);
  const [stop, setStop] = useState(0);
  const [ready, setReady] = useState(false);
  const stRef = useRef(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const mobile = window.innerWidth < 1024;
    const s0 = STOPS[0];
    const state = {
      ...s0.cam,
      fov: mobile ? 46 : 36,
      offX: mobile ? 0 : 0.42,
      offY: mobile ? 0.52 : 0,
      dragYaw: 0,
      fade: 0,
      hover: mobile ? 0 : 1,
      focus: 0,
      fx: 0,
      fz: 0,
      fr: 0.2,
      cut: 0,
      fleet: 0,
      branch: 0,
      sea: 0,
      city: 1,
      roads: 1,
      ret: 0,
      reduce,
    };
    if (reduce) Object.assign(state, STOPS[5].cam, { fade: 1 });
    // Phones: pull the camera back so the whole map sits in the top of the screen, above the copy
    const camFor = (c) => (mobile ? { ...c, dist: c.dist * 1.35 } : c);
    Object.assign(state, camFor(reduce ? STOPS[5].cam : s0.cam));

    let map;
    let raf = 0;
    let running = false;
    let lockIdx = 0;
    let tl, st, ctx;
    const labelNodes = labelsEl.current ? [...labelsEl.current.children] : [];
    const ret = { x: 0, y: 0, init: false };
    const cleanupFns = [];

    import("./createMap").then(({ createMap }) => {
      try {
        map = createMap(mapEl.current, state, (proj, W, H) => {
          // City labels
          labelNodes.forEach((el, i) => {
            const p = proj(...CITIES[LABELS[i][1]]);
            const on = p.w > 0 && p.x > -40 && p.x < W + 40 && p.y > 0 && p.y < H;
            el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
            el.style.opacity = on ? String(Math.min(1, state.city) * state.fade) : "0";
          });
          // Reticle lock
          const lock = STOPS[lockIdx].lock;
          if (lock) {
            const ll = lock === "sea" ? seaPoint(state.sea) : lock;
            const p = proj(ll[0], ll[1]);
            if (!ret.init) {
              ret.x = p.x;
              ret.y = p.y;
              ret.init = true;
            }
            ret.x += (p.x - ret.x) * 0.25;
            ret.y += (p.y - ret.y) * 0.25;
          }
          reticle.current.style.transform = `translate3d(${ret.x.toFixed(1)}px, ${ret.y.toFixed(1)}px, 0)`;
          reticle.current.style.opacity = String(state.ret);
          const flip = ret.x > W - 300;
          const tw = toast.current.offsetWidth;
          const tx = Math.min(Math.max(12, flip ? ret.x - tw - 40 : ret.x + 40), W - tw - 12);
          toast.current.style.transform = `translate3d(${tx.toFixed(1)}px, ${(ret.y - 30).toFixed(1)}px, 0)`;
          toast.current.style.opacity = String(state.ret);
          if (counter.current) counter.current.textContent = String(Math.round(700 - 300 * Math.min(1, Math.max(0, (state.cut - 0.35) / 0.65))));
        });
      } catch (e) {
        console.warn("[map] WebGL unavailable", e);
        return;
      }
      if (!map) return;
      setReady(true);

      const loop = () => {
        map.frame();
        if (running) raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || document.hidden) return;
        running = true;
        raf = requestAnimationFrame(loop);
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stopLoop()));
      io.observe(section.current);
      const onVis = () => (document.hidden ? stopLoop() : start());
      document.addEventListener("visibilitychange", onVis);

      if (reduce) {
        requestAnimationFrame(() => map.frame());
        stRef.current = { kill: () => {} };
        cleanupFns.push(() => io.disconnect(), () => document.removeEventListener("visibilitychange", onVis));
        return;
      }

      // Drag to turn the map
      let dragging = false;
      let lx = 0;
      let vel = 0;
      const down = (e) => {
        if (e.pointerType !== "mouse") return;
        dragging = true;
        lx = e.clientX;
      };
      const move = (e) => {
        if (!dragging) return;
        vel = (e.clientX - lx) * 0.004;
        state.dragYaw = Math.max(-0.9, Math.min(0.9, state.dragYaw + vel));
        lx = e.clientX;
      };
      const up = () => (dragging = false);
      const settle = setInterval(() => {
        if (!dragging) state.dragYaw *= 0.96;
      }, 16);
      mapEl.current.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);

      loadGsap().then(({ gsap, ScrollTrigger }) => {
        gsap.to(state, { fade: 1, duration: 1.6, ease: "power2.out" });
        ctx = gsap.context(() => {
          const panels = gsap.utils.toArray(".story-panel", section.current);
          tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
          tl.addLabel("s0");
          STOPS.forEach((s, i) => {
            if (!i) return;
            const L = s.layers;
            const f = L.fx ? focusXZ(L.fx) : [state.fx, state.fz];
            const at = `s${i}`;
            tl.addLabel(at, i === 1 ? 0.6 : "+=0.9");
            tl.to(state, { ...camFor(s.cam), duration: 1.2 }, at)
              .to(state, { city: L.city, focus: L.focus, fleet: L.fleet, branch: L.branch, roads: L.roads, fr: L.fr || state.fr, ret: s.lock ? 1 : 0, duration: 0.9 }, at)
              .set(state, { fx: f[0], fz: f[1] }, at)
              .to(panels[i - 1], { autoAlpha: 0, y: -50, duration: 0.4, ease: "power2.in" }, at)
              .fromTo(panels[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, `${at}+=0.55`);
            if (i === 2) tl.to(state, { cut: 1, duration: 1.4, ease: "none" }, `${at}+=1.1`);
            if (i === 4) tl.fromTo(state, { sea: 0 }, { sea: 1, duration: 1.6, ease: "none" }, `${at}+=0.4`);
          });
          tl.to({}, { duration: 0.6 });
          tl.addLabel("end");

          st = ScrollTrigger.create({
            trigger: section.current,
            pin: pin.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 5.5}`,
            scrub: 1,
            animation: tl,
            snap: { snapTo: "labelsDirectional", duration: { min: 0.3, max: 0.9 }, delay: 0.15, ease: "power2.inOut" },
            onUpdate: () => {
              const labels = STOPS.map((_, i) => tl.labels[`s${i}`]);
              const t = tl.time();
              let idx = 0;
              labels.forEach((l, i) => {
                if (t >= l - 0.05) idx = i;
              });
              if (idx !== lockIdx) {
                lockIdx = idx;
                setStop(idx);
              }
            },
          });
          stRef.current = st;
          stRef.current.labels = () => STOPS.map((_, i) => tl.labels[`s${i}`] / tl.duration());
        }, section);
      });

      cleanupFns.push(
        () => io.disconnect(),
        () => document.removeEventListener("visibilitychange", onVis),
        () => clearInterval(settle),
        () => window.removeEventListener("pointermove", move),
        () => window.removeEventListener("pointerup", up)
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      cleanupFns.forEach((f) => f());
      ctx?.revert();
      map?.destroy();
    };
  }, []);

  const goTo = (i) => {
    const st = stRef.current;
    if (!st?.labels) return;
    const p = st.labels()[i];
    const y = st.start + (st.end - st.start) * p + 2;
    window.__lenis ? window.__lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const t = TOASTS[stop];

  return (
    <section ref={section} id="story" data-header-dark aria-label="Connexis across Pakistan" className="story relative -mt-16 bg-[#0d0d0f] text-white lg:-mt-[88px]">
      <div ref={pin} className="story-pin relative overflow-hidden">
        {/* Map */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`} aria-hidden="true">
          <StaticMap />
        </div>
        <div ref={mapEl} className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(225,37,27,0.12),transparent_55%)]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#0d0d0f_0%,rgba(13,13,15,0.96)_48%,rgba(13,13,15,0)_72%)] lg:bg-[linear-gradient(90deg,#0d0d0f_0%,rgba(13,13,15,0.88)_30%,rgba(13,13,15,0)_56%)]"
          aria-hidden="true"
        />

        {/* Overlay: labels, reticle, toast */}
        <div ref={labelsEl} className="pointer-events-none absolute inset-0 max-lg:hidden" aria-hidden="true">
          {LABELS.map(([name]) => (
            <span key={name} className="absolute left-0 top-0 whitespace-nowrap pl-3 text-[12px] font-medium text-white/70 opacity-0 will-change-transform">
              {name}
              {name === "Lahore" ? " · HQ" : ""}
            </span>
          ))}
        </div>
        <div ref={reticle} className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform" aria-hidden="true">
          <svg viewBox="-60 -60 120 120" className="-ml-11 -mt-11 h-22 w-22 overflow-visible">
            <g className="origin-center motion-safe:animate-[spin_14s_linear_infinite]">
              <circle r="46" fill="#e1251b" opacity=".12" />
              <path d="M 22.98 -19.28 A 30 30 0 1 0 22.98 19.28" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <circle r="18" fill="none" stroke="#e1251b" strokeWidth="3" />
              <path d="M0 -46V-12M0 12V46M-46 0H-12M12 0H46" stroke="#e1251b" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <div ref={toast} className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform max-lg:hidden" aria-hidden="true">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink-900 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500 text-[12px] font-bold text-white">✓</span>
            <span>
              <span key={t?.title} className="block whitespace-nowrap text-[14px] font-semibold">{t?.title}</span>
              <span className="block whitespace-nowrap text-[12px] text-grey-600">{t?.meta}</span>
            </span>
          </div>
        </div>

        {/* Panels (one per stop) */}
        <div className="story-panels container-x relative h-full">
          <article className="story-panel story-panel-0">
            <p className="inline-flex items-center gap-2.5 text-[14px] text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live across Pakistan · Lahore <LiveClock />
            </p>
            <h1 data-split="hero" className="mt-5 font-display text-[42px] font-bold leading-[0.95] tracking-[-0.05em] sm:text-[64px] lg:text-[clamp(58px,5vw,98px)]">
              Vehicle tracking that cuts your fleet costs.
            </h1>
            <p className="mt-6 hidden max-w-[460px] text-[17px] text-white/70 sm:block md:text-[19px]">
              GPS fleet management, fuel monitoring and AI dashcams on one live dashboard, trusted by PepsiCo distributors, Meezan Bank and 150,000+ installed devices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-a-demo/" className="pill pill-red" data-track="demo_cta_click" data-location="hero">
                Book a live demo <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
              </Link>
              <button type="button" onClick={() => goTo(1)} className="pill pill-ghost">
                Fly the map
              </button>
            </div>
            <p className="mt-8 hidden text-[14px] text-white/50 sm:block">PTA licensed · Field teams in 29 cities · Android &amp; iOS app</p>
          </article>

          <article className="story-panel">
            <p className="story-kicker">Head office</p>
            <h2 className="story-title">Lahore, since 2015.</h2>
            <p className="story-body">
              Connexis tracks vehicles, generators, cold rooms and containers from Lahore, under a nationwide PTA licence for Data Class Value Added Services.
            </p>
            <dl className="mt-8 grid max-w-[460px] grid-cols-2 gap-6">
              <div>
                <dt className="sr-only">Devices installed</dt>
                <dd className="font-display text-[40px] font-bold leading-none tracking-[-0.04em] md:text-[52px]">150,000+</dd>
                <dd className="mt-2 text-[14px] text-white/60">devices installed</dd>
              </div>
              <div>
                <dt className="sr-only">Cities with technicians</dt>
                <dd className="font-display text-[40px] font-bold leading-none tracking-[-0.04em] md:text-[52px]">29</dd>
                <dd className="mt-2 text-[14px] text-white/60">cities with field technicians</dd>
              </div>
            </dl>
          </article>

          <article className="story-panel">
            <p className="story-kicker">Case study · Pepsi distributor, South Punjab</p>
            <p className="mt-4 font-display text-[88px] font-bold leading-[0.85] tracking-[-0.06em] text-red-500 md:text-[132px]" aria-hidden="true">
              <span ref={counter}>700</span>
            </p>
            <h2 className="story-title !mt-4">One distributor. 300 fewer vehicles.</h2>
            <p className="story-body">
              A PepsiCo distributor was paying for 700 vehicles with no view of routes or outlet coverage. Tracking and a custom distributor portal took the fleet from 700 to 400.
            </p>
            <Link href="/case-studies/pepsi-distributor-fleet-management/" scroll={false} className="pill pill-light mt-8">
              Read the case study <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
            </Link>
          </article>

          <article className="story-panel">
            <p className="story-kicker">Case study · Meezan Bank</p>
            <p className="mt-4 font-display text-[88px] font-bold leading-[0.85] tracking-[-0.06em] text-red-500 md:text-[132px]">−16%</p>
            <h2 className="story-title !mt-4">Every branch generator on one screen.</h2>
            <p className="story-body">Fuel sensors in branch gensets replaced paper fill records. Meezan Bank cut generator fuel cost by 16% and caught fuel fraud as it happened.</p>
            <Link href="/case-studies/meezan-bank-generator-fuel-monitoring/" scroll={false} className="pill pill-light mt-8">
              Read the case study <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
            </Link>
          </article>

          <article className="story-panel">
            <p className="story-kicker">Asset &amp; container tracking</p>
            <h2 className="story-title">Containers that keep reporting with no power on board.</h2>
            <p className="story-body">Solar trackers follow containers, trailers and vessels out of Karachi and beyond, switching to satellite where the cellular signal ends.</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-[14px]">
              {["Solar + 12,000mAh battery", "IP67 · ATEX", "Optional satellite link", "Door + tamper alerts"].map((c) => (
                <li key={c} className="rounded-full border border-white/15 px-3.5 py-1.5 text-white/80">
                  {c}
                </li>
              ))}
            </ul>
            <Link href="/asset-tracking/" className="pill pill-light mt-8">
              Asset tracking <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
            </Link>
          </article>

          <article className="story-panel">
            <p className="story-kicker">Nationwide</p>
            <h2 className="story-title">Karachi to Gilgit. One live map.</h2>
            <p className="story-body">Technicians in 29 cities fit devices at your depot, branch or site. You get one login for every vehicle, tank, cold room and container.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-a-demo/" className="pill pill-red" data-track="demo_cta_click" data-location="story">
                Book a live demo <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
              </Link>
              <a href="#solutions" className="pill pill-ghost">
                See all solutions
              </a>
            </div>
          </article>
        </div>

        {/* Stop navigation */}
        <nav aria-label="Map stops" className="story-nav absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <ol className="space-y-3 text-right">
            {STOPS.map((s, i) => (
              <li key={s.name}>
                <button type="button" onClick={() => goTo(i)} className={`group inline-flex items-center gap-3 text-[13px] transition-colors ${i === stop ? "text-white" : "text-white/40 hover:text-white/80"}`}>
                  {s.name}
                  <span className={`h-px transition-all duration-500 ${i === stop ? "w-10 bg-red-500" : "w-4 bg-white/30 group-hover:w-6"}`} />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Scroll cue + badge */}
        <div className={`story-cue pointer-events-none absolute inset-x-0 bottom-6 z-10 transition-opacity duration-500 ${stop === 0 ? "opacity-100" : "opacity-0"}`}>
          <div className="container-x flex items-end justify-between">
            <span className="hidden items-center gap-3 text-[13px] text-white/50 lg:inline-flex">
              <ArrowDown size={16} className="motion-safe:animate-bounce" /> Scroll to fly · drag to turn the map
            </span>
            <RotatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

function seaPoint(f) {
  // lon/lat along the sea route
  const pts = SEA_ROUTE;
  let L = 0;
  const seg = [];
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(l);
    L += l;
  }
  let d = Math.max(0.0001, f) * L;
  for (let i = 1; i < pts.length; i++) {
    if (d <= seg[i - 1]) {
      const k = d / seg[i - 1];
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
    }
    d -= seg[i - 1];
  }
  return pts[pts.length - 1];
}

function RotatingBadge() {
  return (
    <a href="#results" className="pointer-events-auto relative hidden h-[104px] w-[104px] lg:grid place-items-center rounded-full bg-red-500 text-white transition-transform hover:scale-105 lg:h-[120px] lg:w-[120px]" aria-label="See results">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_16s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fill="#fff" fontSize="10.5" fontWeight="600" letterSpacing="2.6">
          <textPath href="#badge-circle">SINCE 2015 · 150,000+ DEVICES · PTA LICENSED ·</textPath>
        </text>
      </svg>
      <ArrowDown size={26} strokeWidth={2} />
    </a>
  );
}
