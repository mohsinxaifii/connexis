import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { services, lowServices } from "@/content/services";
import { industries } from "@/content/industries";
import { site, waLink } from "@/content/site";

const company = [
  { href: "/about/", label: "About" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/platform/", label: "Platform" },
  { href: "/faq/", label: "FAQ" },
  { href: "/request-a-demo/", label: "Book a demo" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-grey-200 bg-white">
      <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.15fr_1fr_0.9fr_0.7fr_1.15fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo height={28} />
            <p className="t-small mt-5 max-w-[280px] text-grey-600">
              Vehicle tracking, fleet management and fuel monitoring for businesses across Pakistan since {site.founded}.
            </p>
            <Link href="/request-a-demo/" className="btn btn-primary btn-sm mt-6" data-track="demo_cta_click" data-location="footer">
              Book a live demo
            </Link>
          </div>

          <FooterCol title="Solutions">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/${s.slug}/`}>
                {s.menuName}
              </FooterLink>
            ))}
            {lowServices.map((s) => (
              <FooterLink key={s.slug} href={`/${s.slug}/`} muted>
                {s.menuName}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Industries">
            {industries.map((i) => (
              <FooterLink key={i.slug} href={`/industries/${i.slug}/`}>
                {i.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            {company.map((c) => (
              <FooterLink key={c.href} href={c.href}>
                {c.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="col-span-2 sm:col-span-1">
            <li className="flex gap-2.5">
              <MapPin size={16} strokeWidth={1.5} className="mt-1 shrink-0" aria-hidden="true" />
              <a href={site.address.mapUrl} target="_blank" rel="noopener" className="hover:text-ink-900">
                {site.address.street}, {site.address.city}
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.tel} className="flex gap-2.5">
                <Phone size={16} strokeWidth={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                <a href={`tel:${p.tel}`} className="hover:text-ink-900">
                  {p.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2.5">
              <Mail size={16} strokeWidth={1.5} className="mt-1 shrink-0" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-ink-900">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle size={16} strokeWidth={1.5} className="mt-1 shrink-0" aria-hidden="true" />
              <a href={waLink()} target="_blank" rel="noopener" className="hover:text-ink-900">
                WhatsApp us
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="pointer-events-none relative left-1/2 mt-16 w-screen -translate-x-1/2 select-none overflow-hidden" aria-hidden="true">
          <p data-speed="-0.6" className="text-outline whitespace-nowrap text-center font-display text-[19vw] font-bold leading-[0.82] tracking-[-0.06em] !opacity-[.22]">
            CONNEXIS
          </p>
        </div>
        <div className="t-small relative mt-6 flex flex-col gap-4 border-t border-grey-200 pt-6 text-grey-600 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5">
            <span>
              A project of{" "}
              <a href={site.parent.url} target="_blank" rel="noopener" className="font-medium text-ink-900 hover:text-red-500">
                {site.parent.name}
              </a>
            </span>
            <span>{site.ptaLicence}</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {site.social.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener" className="hover:text-ink-900">
                {s.label}
              </a>
            ))}
            <Link href="/privacy-policy/" className="hover:text-ink-900">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="hover:text-ink-900">
              Terms
            </Link>
            <span>© 2026 {site.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }) {
  return (
    <div className={className}>
      <p className="mb-4 font-display text-[15px] font-semibold text-ink-900">{title}</p>
      <ul className="t-small space-y-2.5 text-grey-600">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, muted }) {
  return (
    <li>
      <Link href={href} className={`hover:text-ink-900 ${muted ? "text-[13px]" : ""}`}>
        {children}
      </Link>
    </li>
  );
}
