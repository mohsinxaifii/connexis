import { ArrowRight } from "lucide-react";
import Link from "@/components/ui/Link";
import { Clock, Logo, Reticle } from "@/components/ui/Bits";
import { services, lowServices } from "@/content/services";
import { industries } from "@/content/industries";
import { site, waLink } from "@/content/site";

const company = [
  { to: "/platform/", label: "Platform" },
  { to: "/case-studies/", label: "Case studies" },
  { to: "/about/", label: "About" },
  { to: "/faq/", label: "FAQ" },
  { to: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="foot" data-theme="night">
      <div className="wrap">
        <div className="foot__hero">
          <Reticle size={72} className="foot__reticle amber" spin />
          <p className="d-xl foot__line" aria-hidden="true">
            Nothing moves unseen.
          </p>
          <div className="foot__cta">
            <p className="lead">Tell us what moves your business. We'll show it to you, live, on your own vehicles.</p>
            <Link to="/request-a-demo/" className="btn btn--signal" data-track="demo_cta_click" data-location="footer">
              Book a demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="foot__cols">
          <div>
            <p className="tag">Solutions</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}/`}>{s.menuName}</Link>
                </li>
              ))}
              {lowServices.map((s) => (
                <li key={s.slug} className="foot__muted">
                  <Link to={`/${s.slug}/`}>{s.menuName}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tag">Industries</p>
            <ul>
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries/${i.slug}/`}>{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tag">Company</p>
            <ul>
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>{c.label}</Link>
                </li>
              ))}
              <li>
                <a href={site.customerLogin} target="_blank" rel="nofollow noopener">
                  Customer login ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="tag">Head office</p>
            <address className="foot__addr">
              <a href={site.address.mapUrl} target="_blank" rel="noopener">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.countryName}
              </a>
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="num">
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={waLink()} target="_blank" rel="noopener">
                WhatsApp us ↗
              </a>
            </address>
          </div>
        </div>

        <div className="foot__base mono">
          <Logo tone="light" className="foot__logo" />
          <span>
            Lahore <Clock /> PKT
          </span>
          <span>{site.ptaLicence}</span>
          <span>
            A{" "}
            <a href={site.parent.url} target="_blank" rel="noopener" className="ulink">
              {site.parent.name}
            </a>{" "}
            company
          </span>
          <span className="foot__legal">
            <Link to="/privacy-policy/">Privacy</Link>
            <Link to="/terms/">Terms</Link>© {new Date().getFullYear()} {site.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
