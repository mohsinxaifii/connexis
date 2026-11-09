"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import CaseCover from "@/components/case/CaseCover";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

const pad = (v) => String(v).padStart(2, "0");

// Case studies as stops on a route. On desktop the section pins and scrolling drives a tracked
// vehicle along a dotted road; each case locks on as the vehicle reaches it. On phones the road runs
// down the left edge. Without JS or with reduced motion the cases sit in a plain grid.
export default function CaseRoute({ cases }) {
  const section = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const svg = useRef(null);
  const marker = useRef(null);
  const car = useRef(null);
  const tag = useRef(null);
  const hud = useRef(null);
  const fill = useRef(null);
  const stops = useRef([]);
  const active = useRef(-1);
  const nav = useRef({ trigger: null, nodeX: [] });
  const n = cases.length;

  const setActive = (i, end = false) => {
    const t = tag.current;
    if (t) t.textContent = i >= 0 ? cases[i].clientShort : end ? "Next stop: your fleet" : "Scroll to follow";
    if (active.current === i) return;
    active.current = i;
    const sec = section.current;
    if (!sec) return;
    stops.current.forEach((el, k) => el?.classList.toggle("is-active", k === i));
    sec.querySelectorAll(".route-ghost span").forEach((el, k) => el.classList.toggle("on", k === i));
    sec.querySelectorAll(".route-tick").forEach((el, k) => el.classList.toggle("on", k === i));
    marker.current?.classList.toggle("locked", i >= 0);
    if (hud.current) hud.current.textContent = pad(Math.max(0, i + 1));
    if (i >= 0) scramble(stops.current[i]?.querySelector("[data-scramble]"));
  };

  const goTo = (i, immediate = false) => {
    const { trigger, nodeX } = nav.current;
    if (!trigger) return;
    const dist = trigger.end - trigger.start;
    const y = trigger.start + Math.min(dist, Math.max(0, nodeX[i] - innerWidth / 2));
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: immediate ? 0 : 1.4, immediate });
    else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let mm;
    let dead = false;
    const sec = section.current;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      sec.classList.add("route-js");
      mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        sec.classList.add("route-h");
        const tr = track.current;
        let path,
          prog,
          total = 0,
          lut = [],
          nodes = [],
          nodeX = [],
          snaps = [0, 1];

        const build = () => {
          const H = tr.clientHeight;
          const W = tr.scrollWidth;
          const routeY = H * 0.78;
          const box = tr.getBoundingClientRect();
          nodeX = stops.current.map((el) => el.offsetLeft + el.offsetWidth / 2);
          const nodeY = nodeX.map((_, i) => routeY + (i % 2 ? 26 : -18));
          const intro = stops.current[0].offsetLeft;
          const pts = [[0, routeY + 34], [intro * 0.55, routeY - 6], ...nodeX.map((x, i) => [x, nodeY[i]]), [W, routeY + 18]];
          const r = (v) => Math.round(v * 10) / 10;
          const d = pts.reduce((acc, p, i, a) => {
            if (!i) return `M${r(p[0])} ${r(p[1])}`;
            const p0 = a[i - 2] || a[i - 1];
            const p1 = a[i - 1];
            const p3 = a[i + 1] || p;
            const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
            const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
            return `${acc} C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p[0])} ${r(p[1])}`;
          }, "");
          const stems = stops.current
            .map((el, i) => {
              const bottom = el.querySelector(".route-card").getBoundingClientRect().bottom - box.top;
              return `<line x1="${nodeX[i]}" y1="${r(bottom + 10)}" x2="${nodeX[i]}" y2="${r(nodeY[i] - 12)}" class="route-stem"/>`;
            })
            .join("");
          const dots = nodeX.map((x, i) => `<circle cx="${x}" cy="${r(nodeY[i])}" r="7" class="route-node"/>`).join("");
          const s = svg.current;
          s.setAttribute("width", W);
          s.setAttribute("height", H);
          s.setAttribute("viewBox", `0 0 ${W} ${H}`);
          s.innerHTML = `<path d="${d}" class="route-road"/><path d="${d}" class="route-prog"/>${stems}${dots}`;
          path = s.querySelector(".route-road");
          prog = s.querySelector(".route-prog");
          nodes = [...s.querySelectorAll(".route-node")];
          total = path.getTotalLength();
          prog.style.strokeDasharray = `${total} ${total}`;
          lut = [];
          for (let k = 0; k <= 400; k++) {
            const len = (total * k) / 400;
            lut.push([path.getPointAtLength(len).x, len]);
          }
          const dist = W - innerWidth;
          snaps = [0, ...nodeX.map((x) => Math.min(1, Math.max(0, (x - innerWidth / 2) / dist))), 1];
          nav.current.nodeX = nodeX;
        };

        const update = () => {
          if (!path) return;
          const mx = -gsap.getProperty(tr, "x") + innerWidth / 2;
          let lo = 0;
          let hi = lut.length - 1;
          while (hi - lo > 1) {
            const m = (lo + hi) >> 1;
            if (lut[m][0] < mx) lo = m;
            else hi = m;
          }
          const a = lut[lo];
          const b = lut[hi];
          const len = a[1] + (b[1] - a[1]) * (b[0] === a[0] ? 0 : Math.min(1, Math.max(0, (mx - a[0]) / (b[0] - a[0]))));
          const p = path.getPointAtLength(len);
          const q = path.getPointAtLength(Math.min(total, len + 4));
          prog.style.strokeDashoffset = total - len;
          gsap.set(marker.current, { x: p.x, y: p.y });
          gsap.set(car.current, {
            rotation: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI,
          });
          nodes.forEach((c, k) => c.classList.toggle("on", nodeX[k] <= mx + 1));
          let near = -1;
          let best = Infinity;
          nodeX.forEach((x, k) => {
            const dd = Math.abs(x - mx);
            if (dd < best) {
              best = dd;
              near = k;
            }
          });
          const half = stops.current[0].offsetWidth * 0.5;
          setActive(best < half ? near : -1, mx > nodeX[n - 1]);
        };

        const tween = gsap.to(tr, {
          x: () => -(tr.scrollWidth - innerWidth),
          ease: "none",
          onUpdate: update,
        });
        const trigger = ScrollTrigger.create({
          trigger: sec,
          pin: pin.current,
          start: "top top",
          end: () => `+=${tr.scrollWidth - innerWidth}`,
          scrub: 0.8,
          animation: tween,
          invalidateOnRefresh: true,
          onRefresh: () => {
            build();
            update();
          },
          snap: {
            snapTo: (v) => snaps.reduce((c, s) => (Math.abs(s - v) < Math.abs(c - v) ? s : c), snaps[0]),
            duration: { min: 0.25, max: 0.8 },
            delay: 0.12,
            ease: "power2.inOut",
          },
        });
        nav.current.trigger = trigger;
        build();
        update();

        return () => {
          nav.current.trigger = null;
          sec.classList.remove("route-h");
          if (svg.current) svg.current.innerHTML = "";
          setActive(-1);
        };
      });

      mm.add("(max-width: 1023.98px)", () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: fill.current.parentNode,
              start: "top 65%",
              end: "bottom 65%",
              scrub: true,
            },
          },
        );
        stops.current.forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 65%",
            end: "bottom 65%",
            onToggle: (s) => (s.isActive ? setActive(i) : active.current === i && setActive(-1)),
          }),
        );
        return () => setActive(-1);
      });

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      dead = true;
      mm?.revert();
      sec.classList.remove("route-js");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={section} id="results" data-header-dark aria-labelledby="results-title" className="route relative text-white">
      <div ref={pin} className="route-pin">
        <div className="route-ghost" aria-hidden="true">
          {cases.map((cs) => (
            <span key={cs.slug}>{cs.clientShort}</span>
          ))}
        </div>

        <div ref={track} className="route-track">
          <svg ref={svg} className="route-svg" aria-hidden="true" />

          <div className="route-intro">
            <p className="inline-flex items-center gap-2.5 text-[14px] font-medium">
              <span className="h-2 w-2 rounded-full bg-white" /> Case studies
            </p>
            <h2
              id="results-title"
              data-split
              className="mt-5 font-display text-[46px] font-bold leading-[0.92] tracking-[-0.055em] md:text-[84px] lg:text-[clamp(72px,6.4vw,124px)]"
            >
              Results on fleets you know.
            </h2>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[1.55]">
              Six deployments, from a 700-vehicle distributor fleet to bank generators and solar-powered containers. Open any stop for the full story.
            </p>
          </div>

          <div className="route-list">
            <span ref={fill} className="route-vfill" aria-hidden="true" />
            <ol className="route-stops">
              {cases.map((cs, i) => (
                <li key={cs.slug} ref={(el) => (stops.current[i] = el)} className="route-stop" style={{ "--lift": i % 2 ? "44px" : "0px" }}>
                  <Link
                    href={`/case-studies/${cs.slug}/`}
                    scroll={false}
                    data-cursor="Open"
                    onFocus={(e) => e.currentTarget.matches(":focus-visible") && goTo(i, true)}
                    className="route-card group outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-red-500"
                  >
                    <span className="route-corners" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="route-cover">
                      <span className="route-art">
                        <CaseCover kind={cs.cover} image={cs.image} sizes="440px" />
                      </span>
                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-ink-900">{cs.clientShort}</span>
                    </span>
                    <span className="block p-5 md:p-6">
                      <span
                        className={`block font-display text-[28px] font-bold leading-[1.02] tracking-[-0.045em] md:text-[34px] ${cs.results.length ? "text-red-500" : "text-white"}`}
                      >
                        <span className="sr-only">{cs.tileResult}</span>
                        <span aria-hidden="true" data-scramble={cs.tileResult}>
                          {cs.tileResult}
                        </span>
                      </span>
                      <span className="mt-2.5 flex items-end justify-between gap-4">
                        <span className="text-[15px] leading-[1.45] text-white/70">{cs.tileLine}</span>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition duration-300 group-hover:rotate-45 group-hover:bg-red-500">
                          <ArrowUpRight size={17} />
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="route-end">
            <p className="max-w-[12ch] font-display text-[40px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[64px] lg:text-[clamp(64px,5.4vw,104px)]">
              Your fleet could be the next stop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-a-demo/" className="pill pill-dark">
                Book a demo
                <span className="pill-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
              <Link href="/case-studies/" className="pill pill-ghost route-ghost-btn">
                All case studies
              </Link>
            </div>
          </div>

          <div ref={marker} className="route-marker" aria-hidden="true">
            <span className="route-pulse" />
            <svg viewBox="-34 -34 68 68" className="route-reticle">
              <circle r="22" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M0 -32V-26M0 26V32M-32 0H-26M26 0H32" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span ref={car} className="route-car">
              <svg viewBox="-10 -10 20 20">
                <path d="M-5 -6 L7 0 L-5 6 L-2.5 0Z" fill="#e1251b" />
              </svg>
            </span>
            <span ref={tag} className="route-tag">
              Scroll to follow
            </span>
          </div>
        </div>

        <nav className="route-hud" aria-label="Case study stops">
          <span className="tabular-nums">
            Stop <span ref={hud}>00</span> / {pad(n)}
          </span>
          <span className="flex gap-1.5">
            {cases.map((cs, i) => (
              <button key={cs.slug} type="button" onClick={() => goTo(i)} aria-label={`Go to ${cs.clientShort}`} className="route-tick" />
            ))}
          </span>
        </nav>
      </div>
    </section>
  );
}

// Digits churn and settle left to right, like a tracker's readout locking on.
function scramble(el) {
  if (!el) return;
  const text = el.dataset.scramble;
  const t0 = performance.now();
  cancelAnimationFrame(el._raf);
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / 650);
    const shown = Math.floor(k * text.length);
    el.textContent = k < 1 ? [...text].map((ch, j) => (j < shown || ch === " " ? ch : (Math.random() * 10) | 0)).join("") : text;
    if (k < 1) el._raf = requestAnimationFrame(tick);
  };
  tick(t0);
}
