import { useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";
import Faq from "@/components/ui/Faq";
import DemoForm from "@/components/forms/DemoForm";
import { Photo } from "@/components/ui/Bits";
import Link from "@/components/ui/Link";
import { useGSAP, revealLines } from "@/lib/motion";
import { site, waLink } from "@/content/site";
import { photos } from "@/content/media";

export function FaqBlock({ items, title = "Common questions", more = true }) {
  const root = useRef(null);
  useGSAP(() => revealLines(root.current.querySelector(".fq__title")), { scope: root });
  return (
    <section ref={root} className="fq section" data-theme="paper" aria-labelledby="fq-title">
      <div className="wrap fq__grid">
        <div className="fq__side">
          <p className="tag">FAQ</p>
          <h2 id="fq-title" className="d-l fq__title">
            {title}
          </h2>
          <div className="fq__help" data-theme="night">
            <Photo photo={photos.lahoreNight} className="fq__helpbg" grade={false} />
            <p className="fq__helptitle">Still have a question?</p>
            <p className="fq__helptext">Talk to a person at our Lahore office, by phone or on WhatsApp.</p>
            <div className="fq__helpbtns">
              <a href={`tel:${site.phones[0].tel}`} className="btn btn--signal btn--sm">
                <Phone size={16} /> Call us
              </a>
              <a href={waLink("Hi Connexis, I have a question.")} target="_blank" rel="noopener" className="btn btn--glass btn--sm">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
          {more && (
            <Link to="/faq/" className="ulink fq__more">
              See all questions
            </Link>
          )}
        </div>
        <Faq items={items} />
      </div>
    </section>
  );
}

export function DemoCta({ location = "home", service, caseSlug, title = "Book a free 20-minute fleet review", photo = photos.lahoreNight }) {
  const root = useRef(null);
  useGSAP(() => revealLines(root.current.querySelector(".cta__title")), { scope: root });
  return (
    <section ref={root} id="demo" className="cta section" data-theme="night" aria-labelledby="cta-title">
      <Photo photo={photo} className="cta__bg" />
      <div className="wrap cta__grid">
        <div className="cta__copy">
          <p className="tag">Live demo</p>
          <h2 id="cta-title" className="d-l cta__title">
            {title}
          </h2>
          <p className="lead">We'll map your vehicles, the sensors you need and the reports you want, then show you the platform live. {site.callbackPromise}</p>
          <div className="cta__direct">
            <a href={`tel:${site.phones[0].tel}`} className="cta__line">
              <Phone size={18} />
              <span>
                <small className="mono">Call sales</small>
                <b className="num">{site.phones[0].label}</b>
              </span>
            </a>
            <a href={waLink("Hi Connexis, I'd like a demo.")} target="_blank" rel="noopener" className="cta__line">
              <MessageCircle size={18} />
              <span>
                <small className="mono">WhatsApp</small>
                <b>Message us</b>
              </span>
            </a>
          </div>
        </div>
        <div className="cta__form" data-theme="paper">
          <DemoForm location={location} service={service} caseSlug={caseSlug} id={`demo-${location}`} />
        </div>
      </div>
    </section>
  );
}
