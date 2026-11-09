import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Faq from "@/components/ui/Faq";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { faqGroups } from "@/content/misc";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Vehicle Tracking FAQ: Pricing, Installation | Connexis",
  description:
    "Answers on vehicle tracking cost in Pakistan, installation in 29 cities, the Connexis app and reports, fuel sensors, dashcams and support. Ask us anything.",
  path: "/faq/",
});

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function FaqPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq/" },
  ];
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs), faqPage(all))} />
      <section className="section !pt-6">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[720px]">
            <p className="eyebrow">FAQ</p>
            <h1 data-split="hero" className="t-h1 mt-4">Questions about vehicle tracking with Connexis</h1>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 lg:self-start">
              <ul className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:block lg:space-y-1 lg:px-0">
                {faqGroups.map((g) => (
                  <li key={g.group} className="shrink-0">
                    <a href={`#${slug(g.group)}`} className="chip lg:!flex lg:!rounded-lg lg:!border-0 lg:hover:!bg-grey-100">
                      {g.group}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-14">
              {faqGroups.map((g) => (
                <div key={g.group} id={slug(g.group)} className="scroll-mt-28">
                  <h2 className="t-h3 mb-4">{g.group}</h2>
                  <Faq items={g.items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FinalCta location="faq" title="Still have a question? Ask on a live demo." />
    </>
  );
}
