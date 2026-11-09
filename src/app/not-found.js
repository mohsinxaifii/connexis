import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/Icon";
import NotFoundSearch from "@/components/ui/NotFoundSearch";
import { services, allServices } from "@/content/services";
import { industries } from "@/content/industries";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  const pages = [
    ...allServices.map((s) => ({ title: s.menuName, href: `/${s.slug}/` })),
    ...industries.map((i) => ({ title: i.name, href: `/industries/${i.slug}/` })),
    { title: "Platform", href: "/platform/" },
    { title: "Case studies", href: "/case-studies/" },
    { title: "About", href: "/about/" },
    { title: "Contact", href: "/contact/" },
    { title: "FAQ", href: "/faq/" },
  ];
  return (
    <>
      <Header />
      <main id="main" className="section relative overflow-hidden">
        <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative text-center">
          <svg viewBox="-60 -60 120 120" className="mx-auto h-28 w-28" aria-hidden="true">
            <path d="M 22.98 -19.28 A 30 30 0 1 0 22.98 19.28" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
            <circle r="18" fill="none" stroke="#e1251b" strokeWidth="3.5" />
            <path d="M0 -44V-10M0 10V44M-44 0H-10M10 0H44" stroke="#e1251b" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="eyebrow mt-6">Error 404</p>
          <h1 className="t-h1 mt-3">We lost the signal on this page.</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-grey-600">The link may be old or mistyped. Search below, or jump to one of our main services.</p>
          <NotFoundSearch pages={pages} />
          <ul className="mx-auto mt-12 grid max-w-[880px] gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="card card-hover flex h-full flex-col p-5">
                  <Icon name={s.icon} size={22} />
                  <span className="mt-4 font-display text-[16px] font-semibold">{s.menuName}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/request-a-demo/" className="btn btn-primary" data-track="demo_cta_click" data-location="404">
              Book a live demo
            </Link>
            <Link href="/" className="btn btn-secondary">
              Home <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
