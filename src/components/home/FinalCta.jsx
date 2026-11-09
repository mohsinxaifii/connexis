import { Check, Phone } from "lucide-react";
import DemoForm from "@/components/forms/DemoForm";
import { site } from "@/content/site";

export default function FinalCta({ location = "home", service, title = "See your own fleet on the map.", line }) {
  return (
    <section id="demo" data-header-dark aria-labelledby="cta-title" className="section relative overflow-hidden bg-[#0d0d0f] text-white">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-red-500/15 blur-[130px]" aria-hidden="true" />
      <div className="bg-network pointer-events-none absolute inset-0 opacity-70 invert" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:pt-6">
          <p className="inline-flex items-center gap-2.5 text-[14px] text-white/60">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Book a live demo
          </p>
          <h2 id="cta-title" data-split className="mt-4 font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[72px]">
            {title}
          </h2>
          <p className="mt-5 max-w-[460px] text-[17px] text-white/75">{line || `Tell us your fleet size. ${site.callbackPromise}`}</p>
          <ul className="mt-8 space-y-3 text-[16px] text-white/85">
            {["See your routes, vehicles and reports live", "Get a quote with device, installation and platform fee shown separately", "Installation by our technicians in 29 cities"].map((t) => (
              <li key={t} className="flex gap-3">
                <Check size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <a href={`tel:${site.phones[0].tel}`} className="mt-10 inline-flex items-center gap-3 text-white/85 hover:text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20">
              <Phone size={18} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[13px] text-white/60">Prefer to talk?</span>
              <span className="font-semibold">{site.phones[0].label}</span>
            </span>
          </a>
        </div>
        <div className="reveal rounded-[16px] bg-white p-6 text-ink-900 shadow-[0_24px_64px_rgba(0,0,0,0.3)] md:p-8" style={{ "--i": 1 }}>
          <DemoForm location={location} service={service} />
        </div>
      </div>
    </section>
  );
}
