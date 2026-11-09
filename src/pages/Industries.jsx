import { useParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/lib/head";
import { graph, breadcrumbs, faqPage, service as serviceSchema } from "@/lib/schema";
import Link from "@/components/ui/Link";
import { PageHero, Head, useReveal } from "@/components/ui/Page";
import Screen from "@/components/ui/Screen";
import { ServiceCard, CaseCard, LogoWall } from "@/components/ui/Cards";
import { CrossX } from "@/components/home/Crossouts";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import { FaqBlock, DemoCta } from "@/components/home/Closing";
import { industries, getIndustry } from "@/content/industries";
import { getCase } from "@/content/caseStudies";
import { industryPhoto, photos } from "@/content/media";
import { portfolio } from "@/content/misc";
import NotFound from "./NotFound";

export function Industries() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/" },
  ];
  return (
    <>
      <Seo
        title="Fleet Tracking by Industry | Connexis"
        description="Vehicle tracking, fuel monitoring and fleet management for FMCG distributors, banks, insurers, logistics, oil and gas and municipal fleets in Pakistan."
        path="/industries/"
        jsonLd={graph(breadcrumbs(crumbs))}
      />
      <PageHero
        crumbs={crumbs}
        tag="Industries"
        title="Built around how your business already runs."
        intro="Distributors, banks, insurers, transporters, tanker fleets and city councils each leak money differently. Pick yours."
        photo={photos.truckNight}
      />
      <IndustriesGrid />
      <section className="section" data-theme="night" aria-labelledby="mix-t">
        <div className="wrap">
          <Head id="mix-t" tag="Portfolio" title="Who already runs on Connexis." intro="Share of the Connexis portfolio by sector." />
          <Bars />
          <div className="mt-xl">
            <LogoWall />
          </div>
        </div>
      </section>
      <DemoCta location="industries" />
    </>
  );
}

export function Bars() {
  const max = Math.max(...portfolio.map(([, v]) => v));
  const ref = useReveal(".bars__row");
  return (
    <figure ref={ref} className="bars">
      <figcaption className="sr-only">Share of the Connexis portfolio by sector</figcaption>
      <ul>
        {portfolio.map(([label, v], i) => (
          <li key={label} className="bars__row">
            <span>{label}</span>
            <span className="bars__track">
              <i className={i === 0 ? "is-top" : ""} style={{ width: `${(v / max) * 100}%` }} />
            </span>
            <b className="num">{v}%</b>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function Industry() {
  const { slug } = useParams();
  const ind = getIndustry(slug);
  const reveal = useReveal();
  if (!ind) return <NotFound />;
  const path = `/industries/${ind.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/" },
    { name: ind.name, href: path },
  ];
  const cs = ind.caseStudy ? getCase(ind.caseStudy) : null;
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <div ref={reveal} key={ind.slug}>
      <Seo
        title={ind.seo.title}
        description={ind.seo.description}
        path={path}
        jsonLd={graph(serviceSchema({ name: ind.h1, type: ind.primaryKeyword, path, audience: ind.name }), breadcrumbs(crumbs), faqPage(ind.faqs))}
      />
      <PageHero crumbs={crumbs} tag={ind.name} title={ind.h1} intro={ind.intro} photo={industryPhoto[ind.slug]} size="d-l" />

      <section className="section" data-theme="paper" aria-labelledby="pain-t">
        <div className="wrap">
          <Head id="pain-t" tag="The leaks" title="What we cross out first." />
          <ul className="bigpains">
            {ind.pains.map((p, i) => (
              <li key={p.title} className="bigpains__item rv">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="d-s">
                  <CrossX /> {p.title}
                </h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" data-theme="night" aria-labelledby="portal-t">
        <div className="wrap split">
          <div className="split__copy">
            <Head id="portal-t" tag="Your dashboard" title="One screen for the whole operation." intro={ind.portalCaption} size="d-m" />
          </div>
          <div className="split__media rv">
            <Screen kind={ind.portal} />
          </div>
        </div>
      </section>

      <section className="section" data-theme="paper" aria-labelledby="sol-t">
        <div className="wrap">
          <Head id="sol-t" tag="Solutions" title="The instruments that fix it." />
          <div className="cards3">
            {ind.solutions.map((s, i) => (
              <ServiceCard key={s} slug={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {(cs || ind.clients.length > 0) && (
        <section className="section" data-theme="paper" aria-labelledby="cl-t">
          <div className="wrap">
            <Head id="cl-t" tag="Clients" title={`${ind.name} on Connexis.`} />
            {cs && (
              <div className="mt-l">
                <CaseCard c={cs} wide />
              </div>
            )}
            {ind.clients.length > 0 && (
              <>
                <LogoWall names={ind.clients} />
                <p className="mono clientline">{ind.clients.join(" · ")}</p>
              </>
            )}
          </div>
        </section>
      )}

      <FaqBlock items={ind.faqs} title={`${ind.name}: common questions.`} />

      <section className="section section--tight" data-theme="paper" aria-label="Other industries">
        <div className="wrap">
          <ul className="indlist">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/industries/${o.slug}/`} className="indrow">
                  <span>{o.name}</span>
                  <ArrowRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DemoCta location={`industry-${ind.slug}`} title={`Book a fleet review for ${ind.name.toLowerCase()}.`} />
    </div>
  );
}
