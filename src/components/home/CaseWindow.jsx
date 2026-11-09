import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseTile from "@/components/case/CaseTile";
import SectionHead from "@/components/ui/SectionHead";
import { homeCases } from "@/content/caseStudies";

// The centrepiece (spec §5.4): 3 × 2 grid on desktop, first tile wide; swipe row on mobile.
export default function CaseWindow() {
  return (
    <section id="results" aria-labelledby="results-title" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead id="results-title" eyebrow="Case studies" title="Results on fleets you know." intro="Hover a project to see what changed. Click for the full story." />
          <Link href="/case-studies/" className="link-arrow reveal shrink-0">
            All case studies <ArrowRight size={18} />
          </Link>
        </div>
        <div className="no-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 lg:auto-rows-[300px]">
          {homeCases.map((cs, i) => (
            <CaseTile key={cs.slug} cs={cs} index={i} wide={cs.tileSize === "wide"} className="w-[85%] shrink-0 snap-center md:w-auto" />
          ))}
          <Link
            href="/request-a-demo/"
            className="reveal group relative hidden flex-col justify-between overflow-hidden rounded-[12px] border border-grey-200 bg-white p-6 md:flex lg:col-span-2 lg:p-8"
            data-track="demo_cta_click"
            data-location="case_grid"
          >
            <svg viewBox="-60 -60 120 120" className="pointer-events-none absolute -right-10 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 opacity-[.9] transition-transform duration-700 group-hover:rotate-90 lg:block" aria-hidden="true">
              <path d="M 22.98 -19.28 A 30 30 0 1 0 22.98 19.28" fill="none" stroke="#e3e5e8" strokeWidth="2.5" strokeLinecap="round" />
              <circle r="18" fill="none" stroke="#e1251b" strokeWidth="2" />
              <path d="M0 -44V-10M0 10V44M-44 0H-10M10 0H44" stroke="#e1251b" strokeWidth="1.8" strokeLinecap="round" />
              <circle r="4" fill="#1a1a1a" />
            </svg>
            <p className="eyebrow relative">Your fleet next</p>
            <div className="relative">
              <p className="max-w-[420px] font-display text-[24px] font-bold leading-tight lg:text-[30px]">See what Connexis would change in your fleet.</p>
              <span className="link-arrow mt-4 text-red-500">
                Get results like this <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
