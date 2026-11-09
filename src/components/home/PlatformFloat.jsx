import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Camera, Fuel, Gauge, Thermometer, FileChartColumn, MapPin } from "lucide-react";
import Link from "@/components/ui/Link";
import { Img } from "@/components/ui/Bits";
import { gsap, useGSAP, finePointer, reducedMotion, revealLines } from "@/lib/motion";
import { app, photos } from "@/content/media";
import { site } from "@/content/site";

// The real Connexis app in the middle; the night's alerts float around it at different depths.
export default function PlatformFloat() {
  const root = useRef(null);

  useGSAP(
    () => {
      revealLines(root.current.querySelector(".pf__title"));
      if (reducedMotion()) return;
      const cards = gsap.utils.toArray(".pf__card", root.current);
      cards.forEach((c) => {
        const d = parseFloat(c.dataset.depth);
        const dx = parseFloat(c.dataset.fromx || 0);
        gsap.fromTo(
          c.firstElementChild,
          { x: dx * 140 * d, y: 160 * d, rotate: dx * 8, opacity: 0 },
          { x: 0, y: 0, rotate: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: ".pf__stage", start: "top 95%", end: "top 25%", scrub: 1 } }
        );
      });
      gsap.from(".pf__phone", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".pf__stage", start: "top bottom", end: "bottom bottom", scrub: true } });

      if (!finePointer()) return;
      const stage = root.current.querySelector(".pf__stage");
      const items = cards.map((n) => ({
        d: parseFloat(n.dataset.depth),
        x: gsap.quickTo(n, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(n, "y", { duration: 1, ease: "power3" }),
      }));
      const move = (e) => {
        const r = stage.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        items.forEach((it) => {
          it.x(mx * it.d * 70);
          it.y(my * it.d * 46);
        });
      };
      stage.addEventListener("pointermove", move);
      return () => stage.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="pf" data-theme="paper" aria-labelledby="pf-title">
      <div className="pf__head wrap">
        <p className="tag">The platform</p>
        <h2 id="pf-title" className="d-l pf__title">
          Every alert, on your phone before your first chai
        </h2>
        <p className="lead">
          Every alert, clip, litre and temperature reading, on the web portal and the Android and iOS app, with 26 reports ready to export.
        </p>
        <div className="pf__ctas">
          <Link to="/platform/" className="btn btn--solid">
            Explore the platform <ArrowRight size={18} />
          </Link>
          <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="btn btn--line">
            Customer login <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="pf__stage">
        <div className="pf__col pf__col--left">
          <Card depth={1.3} fromx={-1}>
            <p className="pf__k">
              <Fuel size={15} /> Tank · LEC-4471
            </p>
            <svg viewBox="0 0 240 74" className="pf__chart" aria-hidden="true">
              <path d="M0 10 L60 16 L120 22 L150 25 L156 58 L240 66" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <circle cx="153" cy="42" r="5" fill="var(--signal)" />
              <line x1="153" y1="0" x2="153" y2="74" stroke="var(--signal)" strokeDasharray="3 4" />
            </svg>
            <p className="pf__chip">Drain −41 L · 02:10</p>
          </Card>
          <Card depth={1.6} fromx={-1}>
            <p className="pf__k">
              <FileChartColumn size={15} /> 26 ready-made reports
            </p>
            <div className="pf__reports">
              {["Trip", "Over speed", "Stop over", "Vehicle fuel", "Driving quality", "Temperature"].map((r, i) => (
                <span key={r} className={i === 0 ? "is-on" : ""}>
                  {r}
                </span>
              ))}
            </div>
          </Card>
          <Card depth={1} fromx={-1}>
            <p className="pf__k">
              <Thermometer size={15} /> Reefer · Zone 2
            </p>
            <p className="pf__big red num">9.4 °C</p>
            <p className="pf__sub">Above 8 °C for 6 min · SMS sent</p>
          </Card>
        </div>

        <div className="pf__phone">
          <Img src={app.src} alt={app.alt} width="1412" height="2006" />
        </div>

        <div className="pf__col pf__col--right">
          <Card depth={1.7} fromx={1} dark>
            <p className="pf__k">
              <Camera size={15} /> DMS camera · Cab
            </p>
            <div className="pf__cam">
              <Img src={photos.driverCab.src} alt="" />
              <span className="pf__box" />
              <span className="pf__rec mono">
                <span className="dot dot--red" /> REC 00:52:14
              </span>
            </div>
            <p className="pf__sub">Fatigue flagged · clip saved</p>
          </Card>
          <Card depth={0.9} fromx={1}>
            <p className="pf__k">
              <Gauge size={15} /> Over-speed
            </p>
            <p className="pf__big num">
              96 <small>km/h</small>
            </p>
            <p className="pf__sub">Limit 65 · N-5 near Pattoki</p>
          </Card>
          <Card depth={1.4} fromx={1}>
            <p className="pf__k">
              <span className="dot" /> Gate-in · Multan depot
            </p>
            <p className="pf__sub">
              <MapPin size={13} /> 05:12 · trip closed · 342 km
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ depth, fromx, dark, children }) {
  return (
    <div className="pf__card" data-depth={depth} data-fromx={fromx}>
      <div className={`pf__panel ${dark ? "is-dark" : ""}`}>{children}</div>
    </div>
  );
}
