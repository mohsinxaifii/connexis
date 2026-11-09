import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CaseCover from "@/components/case/CaseCover";
import CaseTile from "@/components/case/CaseTile";
import FinalCta from "@/components/home/FinalCta";
import Faq from "@/components/ui/Faq";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import PlatformVisual from "@/components/visuals/PlatformVisual";
import { industries, getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { getCase } from "@/content/caseStudies";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMeta({ title: ind.seo.title, description: ind.seo.description, path: `/industries/${ind.slug}/` });
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const path = `/industries/${ind.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/" },
    { name: ind.name, href: path },
  ];
  const sols = ind.solutions.map(getService).filter(Boolean);
  const cs = ind.caseStudy && getCase(ind.caseStudy);
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <JsonLd data={graph(service({ name: ind.h1, type: ind.primaryKeyword, path, audience: ind.name }), breadcrumbs(crumbs), faqPage(ind.faqs))} />

      <section data-header-dark className="relative -mt-16 overflow-hidden bg-[#0d0d0f] text-white lg:-mt-[88px]">
        <div className="absolute inset-0 opacity-60">
          <CaseCover kind={ind.cover} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/30" />
        <div className="container-x relative pb-16 pt-24 md:pb-24 lg:pt-[120px]">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_nav]:text-white/70 [&_span[aria-current]]:text-white">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-14 max-w-[720px] md:mt-24">
            <p className="eyebrow inline-flex items-center gap-2 !text-white/70">
              <Icon name={ind.icon} size={16} /> {ind.name}
            </p>
            <h1 data-split="hero" className="mt-5 font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[80px]">{ind.h1}</h1>
            <p className="mt-6 text-[17px] text-white/75 md:text-[19px]">{ind.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#demo" className="pill pill-red" data-track="demo_cta_click" data-location="hero">
                Book a demo <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
              </Link>
              {cs && (
                <Link href={`/case-studies/${cs.slug}/`} scroll={false} className="pill pill-ghost">
                  See the results <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pains-title" className="section">
        <div className="container-x">
          <div className="reveal max-w-[720px]">
            <p className="eyebrow mb-3">The problem</p>
            <h2 id="pains-title" data-split className="t-h2">
              Where {ind.name.split(" &")[0]} fleets lose money.
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {ind.pains.map((p, i) => (
              <li key={p.title} className="reveal card p-6" style={{ "--i": i }}>
                <span className="font-display text-[14px] font-bold tabular-nums text-red-500">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[19px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] text-grey-600">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sol-title" className="section bg-grey-100">
        <div className="container-x">
          <div className="reveal max-w-[720px]">
            <p className="eyebrow mb-3">The fix</p>
            <h2 id="sol-title" data-split className="t-h2">
              What Connexis puts in place.
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {sols.map((s, i) => (
              <li key={s.slug} className="reveal" style={{ "--i": i }}>
                <Link href={`/${s.slug}/`} className="card card-hover group flex h-full flex-col p-6">
                  <Icon name={s.icon} size={26} className="group-hover:text-red-500" />
                  <h3 className="mt-5 font-display text-[19px] font-semibold">{s.menuName}</h3>
                  <p className="mt-2 flex-1 text-[15px] text-grey-600">{s.short}</p>
                  <span className="link-arrow mt-5 text-[15px]">
                    Learn more <ArrowRight size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <figure className="reveal mt-14 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
            <PlatformVisual kind={ind.portal} />
            <figcaption>
              <p className="eyebrow">Your view</p>
              <p className="mt-3 font-display text-[22px] font-semibold leading-snug">{ind.portalCaption}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {(cs || ind.clients.length > 0) && (
        <section aria-labelledby="ind-proof" className="section">
          <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow mb-3">Proof</p>
              <h2 id="ind-proof" data-split className="t-h2">
                {ind.name} clients
              </h2>
              {ind.clients.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {ind.clients.map((c) => (
                    <li key={c} className="font-display text-[17px] font-bold opacity-60">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cs && (
              <div className="grid lg:h-[360px]">
                <CaseTile cs={cs} wide />
              </div>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="ifaq-title" className="section border-t border-grey-200">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 id="ifaq-title" data-split className="t-h2">
              Common questions
            </h2>
          </div>
          <div className="reveal">
            <Faq items={ind.faqs} />
          </div>
        </div>
      </section>

      <FinalCta location={`industry_${ind.slug}`} title={`See it working for ${ind.name}.`} />

      <nav aria-label="Other industries" className="border-t border-grey-200">
        <div className="container-x flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8">
          <span className="eyebrow shrink-0">Other industries</span>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}/`} className="chip !min-h-[40px]">
                  <Icon name={o.icon} size={16} /> {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
