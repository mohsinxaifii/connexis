import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Seo } from "@/lib/head";
import { graph, breadcrumbs, localBusiness } from "@/lib/schema";
import Link from "@/components/ui/Link";
import { Clock, Photo, Reticle } from "@/components/ui/Bits";
import { PageHero, Crumbs } from "@/components/ui/Page";
import DemoForm from "@/components/forms/DemoForm";
import { site, waLink } from "@/content/site";
import { photos } from "@/content/media";
import { getService, services } from "@/content/services";

export function Contact() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact/" },
  ];
  const lines = [
    { icon: MapPin, k: "Head office", v: `${site.address.street}, ${site.address.city}`, href: site.address.mapUrl },
    ...site.phones.map((p) => ({ icon: Phone, k: "Phone", v: p.label, href: `tel:${p.tel}` })),
    { icon: Mail, k: "Email", v: site.email, href: `mailto:${site.email}` },
    { icon: MessageCircle, k: "WhatsApp", v: "Message sales", href: waLink("Hi Connexis, I have a question.") },
    { icon: ArrowUpRight, k: "Existing customers", v: "Customer login", href: site.customerLogin },
  ];
  return (
    <>
      <Seo
        title="Contact Connexis | Vehicle Tracking in Lahore, Pakistan"
        description="Call, email or WhatsApp Connexis, or visit our Lahore head office. Book a vehicle tracking demo and a consultant will call you within one working day."
        path="/contact/"
        jsonLd={graph(localBusiness(), breadcrumbs(crumbs))}
      />
      <PageHero crumbs={crumbs} tag="Contact" title="Talk to a person, not a ticket." intro={site.callbackPromise} photo={photos.lahoreNight} ctas={false}>
        <p className="mono phero__fade contact__clock">
          Lahore now <Clock /> PKT
        </p>
      </PageHero>
      <section className="section" data-theme="paper" aria-label="Contact details and form">
        <div className="wrap contact">
          <ul className="contact__lines">
            {lines.map((l) => (
              <li key={l.k + l.v}>
                <Link to={l.href} className="contact__line" {...(l.href === site.customerLogin ? { rel: "nofollow noopener" } : {})}>
                  <l.icon size={20} aria-hidden="true" />
                  <span>
                    <small className="mono">{l.k}</small>
                    <b>{l.v}</b>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="contact__form">
            <h2 className="d-s">Book a demo</h2>
            <DemoForm location="contact" id="demo-contact" />
          </div>
        </div>
      </section>
    </>
  );
}

const NEXT = [
  { t: "Within one working day", d: "A consultant calls to understand your fleet." },
  { t: "20 minutes", d: "We map your vehicles, the sensors you need and the reports you want." },
  { t: "Live demo", d: "You see the platform with data like yours, then get a written quote." },
];

export function Demo() {
  return (
    <>
      <Seo
        title="Book a Vehicle Tracking Demo | Connexis"
        description="Book a free 20-minute fleet review and live demo of Connexis vehicle tracking, fuel monitoring and AI dashcams. We'll call you within one working day."
        path="/request-a-demo/"
      />
      <section className="demo" data-theme="night">
        <Photo photo={photos.truckNight} className="demo__bg" eager />
        <div className="wrap demo__grid">
          <div className="demo__copy">
            <Crumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Book a demo", href: "/request-a-demo/" },
              ]}
            />
            <Reticle size={56} className="amber" spin />
            <h1 className="d-l">Book your live demo.</h1>
            <p className="lead">A free 20-minute fleet review, then the platform live on screen. No obligation.</p>
            <ol className="demo__steps">
              {NEXT.map((n, i) => (
                <li key={n.t}>
                  <span className="mono amber">{String(i + 1).padStart(2, "0")}</span>
                  <b>{n.t}</b>
                  <span>{n.d}</span>
                </li>
              ))}
            </ol>
            <p className="mono demo__call">
              Rather talk now?{" "}
              <a href={`tel:${site.phones[0].tel}`} className="ulink">
                {site.phones[0].label}
              </a>
            </p>
          </div>
          <div className="demo__form" data-theme="paper">
            <DemoForm location="demo-page" id="demo-page" />
          </div>
        </div>
      </section>
    </>
  );
}

export function ThankYou() {
  const { search } = useLocation();
  const [info, setInfo] = useState({ fleet: "", service: "" });
  useEffect(() => {
    const q = new URLSearchParams(search);
    setInfo({ fleet: q.get("fleet") || "", service: q.get("service") || "" });
  }, [search]);
  const svc = services.find((s) => s.interest === info.service) || getService(info.service);

  return (
    <>
      <Seo title="Thank you | Connexis" description="Your demo request has reached Connexis." path="/thank-you/" noindex />
      <section className="thanks" data-theme="night">
        <div className="wrap thanks__inner">
          <Reticle size={84} className="amber" spin />
          <p className="tag">Request received</p>
          <h1 className="d-xl">Locked on. We'll call you.</h1>
          <p className="lead">
            {site.callbackPromise}
            {info.fleet ? ` We've noted a fleet of ${info.fleet.replace("-", "–")} vehicles.` : ""}
          </p>
          <div className="thanks__ctas">
            {svc && (
              <Link to={`/${svc.slug}/`} className="btn btn--line">
                Read about {svc.name} <ArrowRight size={18} />
              </Link>
            )}
            <Link to="/case-studies/" className="btn btn--line">
              See case studies
            </Link>
            <a href={waLink("Hi Connexis, I just booked a demo.")} target="_blank" rel="noopener" className="btn btn--signal">
              WhatsApp us now <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
