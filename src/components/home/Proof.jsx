import { useRef } from "react";
import { ArrowRight, Truck, Fuel } from "lucide-react";
import Link from "@/components/ui/Link";
import { Head } from "@/components/ui/Page";
import { gsap, useGSAP, reducedMotion } from "@/lib/motion";
import { getCase } from "@/content/caseStudies";

// 700 cells; the same pseudo-random 300 switch off on the server and in the browser.
const OFF = new Set(
  Array.from({ length: 700 }, (_, i) => [i, Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 300)
    .map(([i]) => i)
);

export default function Proof() {
  const root = useRef(null);
  const pepsi = getCase("pepsi-distributor-fleet-management");
  const meezan = getCase("meezan-bank-generator-fuel-monitoring");

  useGSAP(
    () => {
      const count = root.current.querySelector(".pc__count");
      const pct = root.current.querySelector(".pc__pct");
      const cut = gsap.utils.toArray(".fleet__cell.is-cut", root.current);
      if (reducedMotion()) {
        cut.forEach((c) => c.classList.add("is-off"));
        count.textContent = "400";
        pct.textContent = "−16%";
        gsap.set(".tank__fill", { scaleX: 0.84 });
        return;
      }
      const n = { v: 700 };
      const p = { v: 0 };
      gsap
        .timeline({ scrollTrigger: { trigger: root.current.querySelector(".proof__grid"), start: "top 75%", once: true } })
        .to(cut, { opacity: 0.1, duration: 0.5, stagger: { each: 0.003, from: "random" } }, 0)
        .to(n, { v: 400, duration: 1.4, ease: "power2.out", onUpdate: () => (count.textContent = Math.round(n.v)) }, 0)
        .fromTo(".tank__fill", { scaleX: 1 }, { scaleX: 0.84, duration: 1.4, ease: "power2.out" }, 0)
        .to(p, { v: 16, duration: 1.4, ease: "power2.out", onUpdate: () => (pct.textContent = `−${Math.round(p.v)}%`) }, 0);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section proof" data-theme="night" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="proof__top">
          <Head id="proof-title" tag="Results" title="Two results our clients signed off on" />
          <Link to="/case-studies/" className="ulink">
            All case studies <ArrowRight size={16} />
          </Link>
        </div>
        <div className="proof__grid">
          <article className="pc">
            <p className="pc__who">
              <span className="pc__icon"><Truck size={18} /></span> {pepsi.brand}
            </p>
            <p className="pc__big num" aria-label="From 700 to 400 vehicles">
              700 → <span className="pc__count amber">700</span>
            </p>
            <p className="pc__label">vehicles in the fleet</p>
            <div className="pc__visual" aria-hidden="true">
            <div className="fleet__grid">
              {Array.from({ length: 700 }, (_, i) => (
                <i key={i} className={`fleet__cell ${OFF.has(i) ? "is-cut" : ""}`} />
              ))}
            </div>
            </div>
            <p className="pc__text">{pepsi.summary}</p>
            <Link to={`/case-studies/${pepsi.slug}/`} className="ulink">
              Read the case <ArrowRight size={16} />
            </Link>
          </article>
          <article className="pc">
            <p className="pc__who">
              <span className="pc__icon"><Fuel size={18} /></span> {meezan.brand}
            </p>
            <p className="pc__big num">
              <span className="pc__pct red">−16%</span>
            </p>
            <p className="pc__label">branch generator fuel cost</p>
            <div className="pc__visual" aria-hidden="true">
              <div className="tank">
                <span className="tank__fill" />
                <span className="tank__note">−16%</span>
              </div>
            </div>
            <p className="pc__text">{meezan.summary}</p>
            <Link to={`/case-studies/${meezan.slug}/`} className="ulink">
              Read the case <ArrowRight size={16} />
            </Link>
          </article>
        </div>
      </div>

    </section>
  );
}
