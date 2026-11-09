import { useRef } from "react";
import { ArrowRight, MapPin, Building2, FileChartColumn, ShieldCheck, Fuel } from "lucide-react";
import Link from "@/components/ui/Link";
import { Img } from "@/components/ui/Bits";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/motion";
import { photos, portal, clientLogos } from "@/content/media";


const PROOF = [
  { icon: MapPin, value: "150,000+", label: "devices installed" },
  { icon: Building2, value: "29", label: "cities with technicians" },
  { icon: FileChartColumn, value: "26", label: "ready-made reports" },
  { icon: ShieldCheck, value: "PTA", label: "licensed since 2015" },
];

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = SplitText.create(".hero__title", { type: "lines", mask: "lines", linesClass: "ln" });
      gsap
        .timeline({ delay: 0.1 })
        .from(split.lines, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, onComplete: () => split.revert() }, 0.1)
        .from(".hero__reveal", { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.4)
        .from(".hero__photo", { clipPath: "inset(100% 0 0 0 round 24px)", duration: 1.3, ease: "expo.inOut" }, 0)
        .from(".hero__photo img", { scale: 1.2, duration: 1.8, ease: "expo.out" }, 0)
        .from(".hero__screen", { y: 80, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.7)
        .from(".hero__alert", { x: 40, opacity: 0, duration: 1, ease: "expo.out" }, 1.1);
      gsap.to(".hero__screen", { yPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero" data-theme="paper" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <p className="tag hero__reveal">Vehicle tracking and fleet management in Pakistan</p>
          <h1 id="hero-title" className="hero__title">
            Track every vehicle, live.
          </h1>
          <p className="lead hero__reveal">GPS trackers, fuel sensors and AI dashcams for businesses across Pakistan, fitted by our own technicians and shown on one app.</p>
          <div className="hero__ctas hero__reveal">
            <Link to="/request-a-demo/" className="btn btn--signal" data-track="demo_cta_click" data-location="hero">
              Book a free demo <ArrowRight size={18} />
            </Link>
            <Link to="#services" className="btn btn--line">
              Explore solutions
            </Link>
          </div>
          <div className="hero__trust hero__reveal">
            <p>Trusted by</p>
            <div className="trust__viewport">
              {/* two identical sets; the track slides exactly one set width, so the loop has no seam */}
              <ul className="trust__track">
                {[...clientLogos, ...clientLogos].map((l, i) => (
                  <li key={i} aria-hidden={i >= clientLogos.length || undefined}>
                    <Img src={l.src} alt={i < clientLogos.length ? l.name : ""} width="800" height="600" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo">
            <Img src={photos.pakistanTruckArt.src} alt={photos.pakistanTruckArt.alt} eager />
          </div>
          <p className="hero__alert">
            <span className="hero__alerticon">
              <Fuel size={18} />
            </span>
            <span>
              <b>Fuel drain alert</b>
              <small>Truck LEC-4471 · −41 L · 2 min ago</small>
            </span>
          </p>
          <figure className="hero__screen">
            <Img src={portal.dashboard.src} alt={portal.dashboard.alt} width="1140" height="872" eager />
            <figcaption>
              <span className="dot" /> The Connexis portal, live
            </figcaption>
          </figure>
        </div>
      </div>

      <ul className="hero__proof wrap">
        {PROOF.map((p) => (
          <li key={p.label} className="hero__reveal">
            <span className="hero__icon">
              <p.icon size={20} />
            </span>
            <span>
              <b>{p.value}</b> {p.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
