import SolutionsList from "@/components/home/SolutionsList";
import { services } from "@/content/services";

const VISUAL = {
  "vehicle-tracking-system": "map",
  "fleet-management-system": "dashboard",
  "fuel-monitoring-system": "fuel",
  "generator-fuel-monitoring": "genset",
  "ai-dashcam-mdvr": "dashcam",
  "temperature-monitoring": "temperature",
  "asset-tracking": "asset",
};

export default function Solutions() {
  const items = services.map((s) => ({ slug: s.slug, name: s.name, short: s.short, order: s.order, visual: VISUAL[s.slug] }));
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section bg-white">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[14px] text-grey-600">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Solutions
            </p>
            <h2 id="solutions-title" data-split className="mt-4 font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[80px]">
              One platform for every moving asset.
            </h2>
          </div>
          <p className="reveal max-w-[420px] text-[17px] text-grey-600 lg:justify-self-end md:text-[19px]">
            Seven services on one login. Hover a row to see the screen your team will use.
          </p>
        </div>
        <SolutionsList items={items} />
      </div>
    </section>
  );
}
