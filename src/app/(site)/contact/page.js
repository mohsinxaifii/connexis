import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DemoForm from "@/components/forms/DemoForm";
import MapFacade from "@/components/visuals/MapFacade";
import JsonLd from "@/components/ui/JsonLd";
import { site, waLink } from "@/content/site";
import { pageMeta, abs } from "@/lib/seo";
import { breadcrumbs, graph, localBusiness } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Contact Connexis | Vehicle Tracking Lahore, Pakistan",
  description:
    "Call +92 42 381 00 900, WhatsApp or visit Connexis at 1201-C, LDA Avenue-1, Lahore. Sales, demos and existing-customer support for vehicle tracking.",
  path: "/contact/",
});

export default function ContactPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact/" },
  ];
  const addr = `${site.address.street}, ${site.address.city}`;
  const rows = [
    { icon: Phone, label: "Sales", items: site.phones.map((p) => ({ text: p.label, href: `tel:${p.tel}` })) },
    { icon: MessageCircle, label: "WhatsApp", items: [{ text: "Message us on WhatsApp", href: waLink(), ext: true }] },
    { icon: Mail, label: "Email", items: [{ text: site.email, href: `mailto:${site.email}` }] },
    { icon: MapPin, label: "Head office", items: [{ text: addr, href: site.address.mapUrl, ext: true }] },
  ];
  return (
    <>
      <JsonLd data={graph({ "@type": "ContactPage", url: abs("/contact/"), name: "Contact Connexis" }, localBusiness(), breadcrumbs(crumbs))} />
      <section className="section !pt-6">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[720px]">
            <p className="eyebrow">Contact</p>
            <h1 data-split="hero" className="t-h1 mt-4">Contact Connexis</h1>
            <p className="mt-5 text-[17px] text-grey-600 md:text-[19px]">Talk to sales, book a demo or get help with an existing account.</p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <dl className="divide-y divide-grey-200 border-y border-grey-200">
                {rows.map(({ icon: I, label, items }) => (
                  <div key={label} className="flex gap-4 py-5">
                    <I size={22} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="t-small text-grey-600">{label}</dt>
                      {items.map((it) => (
                        <dd key={it.text}>
                          <a href={it.href} {...(it.ext ? { target: "_blank", rel: "noopener" } : {})} className="text-[17px] font-medium hover:text-red-500">
                            {it.text}
                          </a>
                        </dd>
                      ))}
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-[12px] bg-grey-100 p-6">
                <h2 className="font-display text-[18px] font-semibold">Already a customer?</h2>
                <p className="mt-2 text-[15px] text-grey-600">
                  Log in to your account, or call {site.phones[1].label} for support with devices, reports or access.
                </p>
                <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="link-arrow mt-4 text-[15px]">
                  Customer login <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="mt-8">
                <MapFacade query={`${addr}, Pakistan`} label={addr} />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[16px] border border-grey-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:p-8">
                <h2 className="t-h3">Book a live demo</h2>
                <p className="mt-2 text-[15px] text-grey-600">{site.callbackPromise}</p>
                <div className="mt-6">
                  <DemoForm location="contact" id="contact-form" />
                </div>
              </div>
              <p className="t-small mt-4 text-grey-600">
                Prefer a full page? <Link href="/request-a-demo/" className="font-medium text-ink-900 underline">Request a demo</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
