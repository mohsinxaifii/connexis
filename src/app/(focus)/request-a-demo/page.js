import Link from "next/link";
import { Check } from "lucide-react";
import DemoForm from "@/components/forms/DemoForm";
import { site } from "@/content/site";
import { getCase } from "@/content/caseStudies";
import { allServices } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Live Demo of Connexis | Vehicle Tracking Pakistan",
  description:
    "See your own fleet on the Connexis platform: live tracking, fuel, dashcams and reports. A PepsiCo distributor cut 700 vehicles to 400. Book a live demo.",
  path: "/request-a-demo/",
});

const INTEREST = Object.fromEntries(allServices.filter((s) => s.interest).map((s) => [s.slug, s.interest]));

export default async function RequestDemoPage({ searchParams }) {
  const sp = await searchParams;
  const cs = sp?.case ? getCase(sp.case) : null;
  const service = cs ? INTEREST[cs.services[0]] : undefined;
  return (
    <section className="relative overflow-hidden">
      <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid gap-12 pb-20 pt-8 md:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:pt-6">
          <p className="eyebrow">Live demo</p>
          <h1 data-split="hero" className="t-h1 mt-4">Book a Live Demo of Connexis</h1>
          <p className="mt-5 max-w-[480px] text-[17px] text-grey-600 md:text-[19px]">Tell us about your fleet. {site.callbackPromise}</p>

          <ul className="mt-8 space-y-4">
            {["See live tracking, fuel and reports on real screens", "Get a quote with device, installation and platform fee shown separately", "PTA licensed, with technicians in 29 cities"].map((t) => (
              <li key={t} className="flex gap-3 text-[17px]">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-050 text-red-500">
                  <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-[12px] border border-grey-200 bg-white p-6">
            <p className="stat-num text-[40px] leading-none">700 → 400</p>
            <p className="mt-2 text-[15px]">vehicles for a PepsiCo distributor in South Punjab after tracking and a custom distributor portal.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-grey-200 pt-4 font-display text-[15px] font-bold text-ink-900 opacity-60">
              <span>PepsiCo distributor</span>
              <span>Meezan Bank</span>
            </div>
          </div>
          {cs && (
            <p className="t-small mt-4 text-grey-600">
              You came from: <Link href={`/case-studies/${cs.slug}/`} className="font-medium text-ink-900 underline">{cs.headline}</Link>
            </p>
          )}
        </div>

        <div className="rounded-[16px] border border-grey-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:p-8">
          <DemoForm location={cs ? "popup" : "demo_page"} service={service} caseSlug={cs?.slug} id="demo-page-form" />
        </div>
      </div>
    </section>
  );
}
