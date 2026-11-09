import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "@/components/ui/Link";
import { Photo } from "@/components/ui/Bits";
import Icon from "@/components/ui/Icon";
import { Head, useReveal } from "@/components/ui/Page";
import { services } from "@/content/services";
import { servicePhoto } from "@/content/media";

export const KEY_FACT = {
  "vehicle-tracking-system": "150,000+ devices installed",
  "fleet-management-system": "700 → 400 vehicles for one distributor",
  "fuel-monitoring-system": "Drain alerts in minutes",
  "generator-fuel-monitoring": "−16% fuel cost at Meezan Bank",
  "ai-dashcam-mdvr": "Road + driver cameras",
  "temperature-monitoring": "Up to 4 zones per unit",
  "asset-tracking": "Solar, IP67, optional satellite",
};

export default function Services() {
  const ref = useReveal();
  return (
    <section ref={ref} id="services" className="section svcs" data-theme="paper" aria-labelledby="svcs-title">
      <div className="wrap">
        <Head
          id="svcs-title"
          tag="What we do"
          title="Tracking, fuel, cameras and sensors, all in one app"
          intro="Pick what your business needs. Everything reports to the same web portal and the Android and iOS app."
        />
        <ul className="svcs__grid">
          {services.map((s) => (
            <li key={s.slug} className="rv">
              <Link to={`/${s.slug}/`} className="svc">
                <div className="svc__media">
                  <Photo photo={servicePhoto[s.slug]?.photo} className="svc__photo" />
                  <span className="svc__icon">
                    <Icon name={s.icon} size={20} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="svc__body">
                  <h3 className="svc__name">{s.name}</h3>
                  <p className="svc__short">{s.short}</p>
                  <p className="svc__fact mono">{KEY_FACT[s.slug]}</p>
                </div>
                <ArrowUpRight className="svc__arrow" size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li className="rv">
            <Link to="/request-a-demo/" className="svc svc--cta" data-track="demo_cta_click" data-location="services-grid">
              <div className="svc__body">
                <h3 className="svc__name">Not sure what you need?</h3>
                <p className="svc__short">A free 20-minute fleet review tells you which devices and reports fit your operation.</p>
                <span className="btn btn--signal btn--sm">
                  Book a review <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
