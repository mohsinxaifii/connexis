import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CaseFilter from "@/components/case/CaseFilter";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { caseStudies } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { allServices } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Fleet Tracking Case Studies | Connexis",
  description:
    "Real results from Connexis clients: a PepsiCo distributor cut its fleet from 700 to 400 vehicles and Meezan Bank cut genset fuel cost by 16%. Read how.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies/" },
  ];
  const usedInd = industries.filter((i) => caseStudies.some((c) => c.industry === i.slug)).map((i) => ({ value: i.slug, label: i.name }));
  const usedSvc = allServices.filter((s) => caseStudies.some((c) => c.services.includes(s.slug))).map((s) => ({ value: s.slug, label: s.name }));
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <section className="section !pt-6">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[760px]">
            <p className="eyebrow">Case studies</p>
            <h1 data-split="hero" className="t-h1 mt-4">Results on fleets you know.</h1>
            <p className="mt-5 text-[17px] text-grey-600 md:text-[19px]">Named clients, real numbers. Filter by industry or solution, then open any project for the full story.</p>
          </div>
          <div className="mt-12">
            <CaseFilter cases={caseStudies} industries={usedInd} services={usedSvc} />
          </div>
        </div>
      </section>
      <FinalCta location="case_index" title="Want results like these?" />
    </>
  );
}
