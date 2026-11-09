import SectionHead from "@/components/ui/SectionHead";
import IndustryList from "@/components/home/IndustryList";
import { industries } from "@/content/industries";

const ORDER = ["fmcg-distribution", "logistics-transport", "banks-telecom", "insurance-leasing", "oil-gas", "waste-municipal"];

export default function Industries() {
  const list = ORDER.map((s) => industries.find((i) => i.slug === s)).map((i) => ({
    slug: i.slug,
    name: i.name,
    cover: i.cover,
    pains: i.pains.map((p) => p.title).slice(0, 2).join(" · "),
  }));
  return (
    <section aria-labelledby="ind-title" className="section">
      <div className="container-x">
        <SectionHead id="ind-title" eyebrow="Industries" title="Built for how your industry runs." />
        <IndustryList items={list} />
      </div>
    </section>
  );
}
