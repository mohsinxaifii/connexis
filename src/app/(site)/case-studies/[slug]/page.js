import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CaseCover from "@/components/case/CaseCover";
import CaseGallery from "@/components/case/CaseGallery";
import CaseTile from "@/components/case/CaseTile";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { caseStudies, getCase } from "@/content/caseStudies";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { article, breadcrumbs, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCase(slug);
  if (!cs) return {};
  return pageMeta({
    title: `${cs.headline} | Connexis`.slice(0, 70),
    description: `${cs.challenge} ${cs.summary}`.slice(0, 155),
    path: `/case-studies/${cs.slug}/`,
    // Unapproved projects stay out of the index until name, metric and photos are confirmed.
    noindex: !cs.approved,
  });
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCase(slug);
  if (!cs) notFound();

  const path = `/case-studies/${cs.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies/" },
    { name: cs.clientShort, href: path },
  ];
  const services = cs.services.map(getService).filter(Boolean);
  const related = caseStudies.filter((c) => c.slug !== cs.slug && c.approved).slice(0, 2);
  const relatedFill = related.length < 2 ? caseStudies.filter((c) => c.slug !== cs.slug && !related.includes(c)).slice(0, 2 - related.length) : [];

  const glance = [
    ["Client", cs.client],
    ["Sector", cs.sector],
    ["Location", cs.location],
    ["Fleet or assets", cs.size],
    ["Services used", services.map((s) => s.name).join(", ")],
    ["Headline result", cs.tileResult],
  ];

  const story = [
    ["Challenge", cs.challenge],
    ["Our recommendation", cs.recommendation],
    ["Actions taken", cs.actions],
    ["Methods used", cs.methods],
    ["Success factors", cs.successFactors],
  ].filter(([, v]) => (Array.isArray(v) ? v.length : v));

  return (
    <>
      <JsonLd data={graph(article({ headline: cs.headline, path, date: cs.datePublished }), breadcrumbs(crumbs))} />

      <section data-header-dark className="relative -mt-16 overflow-hidden bg-[#0d0d0f] text-white lg:-mt-[88px]">
        <div className="absolute inset-0 opacity-70">
          <CaseCover kind={cs.cover} image={cs.image} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />
        <div className="container-x relative pb-16 pt-24 md:pb-24 lg:pt-[120px]">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_nav]:text-white/70 [&_span[aria-current]]:text-white">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-16 max-w-[860px] md:mt-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-white px-2.5 py-1.5 font-display text-[13px] font-bold text-ink-900">{cs.clientShort}</span>
              <span className="rounded-full border border-white/25 px-3 py-1 text-[13px]">{cs.sector}</span>
            </div>
            <h1 data-split="hero" className="mt-6 font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] md:text-[72px]">{cs.headline}</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <article className="min-w-0">
            {cs.results.length > 0 && (
              <div className="reveal grid grid-cols-[1.5fr_1fr_1fr] gap-4 border-b border-grey-200 pb-10">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <p className="stat-num whitespace-nowrap text-[26px] leading-none md:text-[48px]">{r.value}</p>
                    <p className="mt-2 text-[15px] text-grey-600">{r.label}</p>
                  </div>
                ))}
              </div>
            )}
            {!cs.approved && (
              <p className="t-small rounded-lg bg-grey-100 p-4 text-grey-600">This project summary is awaiting client approval; results will be added once confirmed.</p>
            )}
            <div className="mt-10 space-y-10">
              {story.map(([title, body]) => (
                <div key={title} className="reveal grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
                  <h2 className="font-display text-[19px] font-semibold">{title}</h2>
                  {Array.isArray(body) ? (
                    <ul className="space-y-2.5">
                      {body.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{body}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="reveal mt-14 h-[320px] overflow-hidden rounded-[12px] bg-ink-900 md:h-[460px]">
              <CaseGallery items={cs.gallery} label={`${cs.clientShort} photos and screenshots`} />
            </div>

            {cs.quote?.approved && (
              <blockquote className="mt-14 border-l-4 border-red-500 pl-6">
                <p className="font-display text-[22px] font-semibold leading-snug">“{cs.quote.text}”</p>
                <footer className="mt-3 text-grey-600">
                  {cs.quote.name}, {cs.quote.role}
                </footer>
              </blockquote>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="eyebrow">At a glance</h2>
              <dl className="mt-4 divide-y divide-grey-200">
                {glance.map(([k, v]) => (
                  <div key={k} className="py-3">
                    <dt className="t-small text-grey-600">{k}</dt>
                    <dd className={`mt-0.5 font-medium ${k === "Headline result" ? "stat-num text-[22px]" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className="chip">
                    {s.name}
                  </Link>
                ))}
              </div>
              <Link href="#demo" className="btn btn-primary mt-6 w-full" data-track="demo_cta_click" data-location="case_page">
                Get results like this
              </Link>
              {cs.pdf && (
                <a href={cs.pdf} className="link-arrow mt-4 text-[15px]" data-track="pdf_download">
                  <Download size={16} /> Download the PDF
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      <FinalCta location={`case_${cs.slug}`} title="Get results like this." />

      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 data-split className="t-h2">More results</h2>
            <Link href="/case-studies/" className="link-arrow shrink-0">
              All case studies <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 md:auto-rows-[300px]">
            {[...related, ...relatedFill].map((c, i) => (
              <CaseTile key={c.slug} cs={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
