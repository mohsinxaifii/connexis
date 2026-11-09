import { Seo } from "@/lib/head";
import { graph, breadcrumbs, faqPage } from "@/lib/schema";
import Link from "@/components/ui/Link";
import Faq from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/Page";
import { DemoCta } from "@/components/home/Closing";
import { faqGroups } from "@/content/misc";

const slug = (g) => g.toLowerCase().replace(/\s+/g, "-");

export default function FaqPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq/" },
  ];
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <Seo
        title="Vehicle Tracking FAQ: Pricing, Installation & Platform | Connexis"
        description="Answers on Connexis pricing, installation in 29 cities, the web portal and app, fuel sensors, AI dashcams and support."
        path="/faq/"
        jsonLd={graph(faqPage(all), breadcrumbs(crumbs))}
      />
      <PageHero crumbs={crumbs} tag="FAQ" title="Straight answers." intro="Pricing, installation, the platform, hardware and support. If yours isn't here, ask us directly." ctas={false} />
      <section className="section" data-theme="paper" aria-label="Questions by topic">
        <div className="wrap faqp">
          <nav className="faqp__nav mono" aria-label="FAQ topics">
            {faqGroups.map((g) => (
              <Link key={g.group} to={`#${slug(g.group)}`}>
                {g.group}
              </Link>
            ))}
          </nav>
          <div className="faqp__groups">
            {faqGroups.map((g) => (
              <section key={g.group} id={slug(g.group)} aria-labelledby={`${slug(g.group)}-t`} className="faqp__group">
                <h2 id={`${slug(g.group)}-t`} className="d-m">
                  {g.group}
                </h2>
                <Faq items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <DemoCta location="faq" title="Still have a question? Ask it live." />
    </>
  );
}
