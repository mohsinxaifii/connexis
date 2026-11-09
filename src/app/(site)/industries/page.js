import Industries from "@/components/home/Industries";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Fleet Tracking by Industry | Connexis",
  description:
    "Vehicle tracking, genset fuel monitoring and AI dashcams for FMCG, logistics, banks, telecom, insurance, oil & gas and municipal fleets in Pakistan.",
  path: "/industries/",
});

export default function IndustriesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/" },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <section className="pt-6">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[760px]">
            <p className="eyebrow">Industries</p>
            <h1 data-split="hero" className="t-h1 mt-4">Fleet tracking built around your industry.</h1>
            <p className="mt-5 text-[17px] text-grey-600 md:text-[19px]">
              Every sector loses money in a different place. Pick yours to see the problems we solve, the tools we use and the clients we already serve.
            </p>
          </div>
        </div>
      </section>
      <div className="[&_section]:!pt-12 [&_section_h2]:sr-only [&_section_.eyebrow]:hidden">
        <Industries />
      </div>
      <FinalCta location="industries_index" />
    </>
  );
}
