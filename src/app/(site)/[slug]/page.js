import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/service/ServiceHero";
import PainStrip from "@/components/service/PainStrip";
import FeatureGrid from "@/components/service/FeatureGrid";
import Steps from "@/components/service/Steps";
import Gallery from "@/components/service/Gallery";
import Proof from "@/components/service/Proof";
import SpecsTable from "@/components/service/SpecsTable";
import RelatedCards from "@/components/service/RelatedCards";
import FinalCta from "@/components/home/FinalCta";
import Faq from "@/components/ui/Faq";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import { allServices, getService } from "@/content/services";
import { getIndustry } from "@/content/industries";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service as serviceSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.seo.title, description: s.seo.description, path: `/${s.slug}/` });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/#solutions" },
    { name: s.name, href: `/${s.slug}/` },
  ];
  const usedBy = (s.industries || []).map(getIndustry).filter(Boolean);
  const faqs = (s.faqs || []).filter((f) => !f.pending);

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({ name: s.menuName, type: s.primaryKeyword, path: `/${s.slug}/` }),
          breadcrumbs(crumbs.filter((c) => !c.href.includes("#"))),
          faqPage(faqs)
        )}
      />
      <ServiceHero s={s} crumbs={crumbs} />
      {s.pairs && <PainStrip pairs={s.pairs} />}
      <FeatureGrid features={s.features} outcomes={s.outcomes} title={s.low ? "What we offer" : `What ${s.name.toLowerCase()} gives you`} />
      {!s.low && <Steps />}
      {s.gallery && <Gallery items={s.gallery} />}
      <Proof caseSlug={s.caseStudy} industries={s.industries} />
      <SpecsTable specs={s.specs} />

      {usedBy.length > 0 && (
        <section aria-labelledby="usedby-title" className="border-y border-grey-200">
          <div className="container-x flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8">
            <h2 id="usedby-title" className="eyebrow shrink-0">
              Used by
            </h2>
            <ul className="flex flex-wrap gap-2">
              {usedBy.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}/`} className="chip !min-h-[40px]">
                    <Icon name={ind.icon} size={16} /> {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section aria-labelledby="sfaq-title" className="section">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div className="reveal">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 id="sfaq-title" data-split className="t-h2">
                {s.name} questions
              </h2>
            </div>
            <div className="reveal" style={{ "--i": 1 }}>
              <Faq items={faqs} />
            </div>
          </div>
        </section>
      )}

      <FinalCta location={`service_${s.slug}`} service={s.interest || undefined} title={s.low ? "Get a quote." : `See ${s.name.toLowerCase()} on your own fleet.`} />
      <RelatedCards slugs={s.related} />
    </>
  );
}
