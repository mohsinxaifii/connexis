import { notFound } from "next/navigation";
import CaseModal from "@/components/case/CaseModal";
import { getCase, caseNeighbours } from "@/content/caseStudies";
import { getService } from "@/content/services";

export default async function CaseModalPage({ params }) {
  const { slug } = await params;
  const cs = getCase(slug);
  if (!cs) notFound();
  const { prev, next } = caseNeighbours(slug);
  const services = cs.services.map(getService).filter(Boolean).map((s) => ({ slug: s.slug, name: s.name }));
  return <CaseModal cs={cs} prev={prev} next={next} services={services} />;
}
