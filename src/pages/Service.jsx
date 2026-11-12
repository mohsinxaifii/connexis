import { ArrowRight } from "lucide-react";
import { Seo } from "@/lib/head";
import { graph, breadcrumbs, faqPage, service as serviceSchema } from "@/lib/schema";
import Link from "@/components/ui/Link";
import { Img, Photo } from "@/components/ui/Bits";
import { PageHero, Head, useReveal } from "@/components/ui/Page";
import Icon from "@/components/ui/Icon";
import Showcase from "@/components/ui/Showcase";
import { ServiceCard, CaseCard } from "@/components/ui/Cards";
import { Problem } from "@/components/ui/Markers";
import { FaqBlock, DemoCta } from "@/components/home/Closing";
import { servicePhoto, serviceField, industryPhoto } from "@/content/media";
import { getCase } from "@/content/caseStudies";
import { services } from "@/content/services";
import { getIndustry } from "@/content/industries";

export default function Service({ service: s }) {
  const media = servicePhoto[s.slug] || {};
  const path = `/${s.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: s.menuName, href: path },
  ];
  const caseStudy = s.caseStudy ? getCase(s.caseStudy) : null;
  const faqs = (s.faqs || []).filter((f) => !f.pending);
  const reveal = useReveal();
  const field = serviceField[s.slug] || [];
  // always offer three related services, topping up from the main line-up
  const related = [...new Set([...(s.related || []), ...services.map((x) => x.slug)])].filter((x) => x !== s.slug).slice(0, 3);
  const pairsPhoto = s.industries?.length ? industryPhoto[s.industries[0]] : null;

  return (
    <div ref={reveal}>
      <Seo
        title={s.seo.title}
        description={s.seo.description}
        path={path}
        jsonLd={graph(serviceSchema({ name: s.menuName, type: s.primaryKeyword, path, audience: "Businesses with vehicle fleets" }), breadcrumbs(crumbs), faqPage(faqs))}
      />

      <PageHero
        crumbs={crumbs}
        tag={s.name}
        title={s.h1}
        intro={s.intro}
        photo={media.photo}
        size="d-l"
        aside={
          media.device ? (
            <div className="phero__device">
              <Img src={media.device.src} alt={media.device.alt} />
            </div>
          ) : null
        }
        ctas={
          <Link to="/platform/" className="btn btn--line">
            See the platform
          </Link>
        }
      >
      </PageHero>

      {s.pairs?.length > 0 && (
        <section className="section" data-theme="paper" aria-labelledby="pairs-t">
          <div className={`wrap ${pairsPhoto ? "pairs-split" : ""}`}>
            {pairsPhoto && <Photo photo={pairsPhoto} className="pairs-split__photo rv" />}
            <div>
            <Head id="pairs-t" tag="Before and after" title="What changes in the first week." />
            <ul className="pairs">
              {s.pairs.map(([before, after, icon]) => (
                <li key={before} className="pairs__row rv">
                  <p className="pairs__before">
                    <Problem icon={icon} />
                    <span>{before}</span>
                  </p>
                  <ArrowRight className="pairs__arrow" size={22} aria-hidden="true" />
                  <p className="pairs__after">{after}</p>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </section>
      )}

      {field.length > 0 && (
        <section className="section" data-theme="paper" aria-labelledby="field-t">
          <div className="wrap">
            <Head id="field-t" tag="In the field" title={`${s.name} in the field`} />
            <ul className="shots">
              {field.map((p) => (
                <li key={p.src} className="shots__item rv">
                  <Photo photo={p} className="shots__photo">
                    <p className="shots__cap">{p.caption}</p>
                  </Photo>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" data-theme="paper" aria-labelledby="feat-t">
        <div className="wrap">
          <Head id="feat-t" tag="What you get" title={`${s.name}, feature by feature.`} />
          <ul className="feats">
            {s.features.map((f, i) => (
              <li key={f.title} className="feats__item rv">
                <span className="mono feats__n">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={f.icon} size={26} className="feats__icon" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          {s.outcomes && (
            <ul className="outcomes rv">
              {s.outcomes.map((o) => (
                <li key={o} className="mono">
                  {o}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Showcase id="gal-t" title="What you'll see on screen" items={s.gallery || []} points={s.features.map((f) => f.text)} />

      {s.specs && (
        <section className="section" data-theme="paper" aria-labelledby="spec-t">
          <div className="wrap specs">
            <Head id="spec-t" tag="Specifications" title="The hardware." />
            <dl className="specs__table rv">
              {s.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v.replace(/ ?CONFIRM[^.]*\./, "")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {(caseStudy || s.industries?.length > 0) && (
        <section className="section" data-theme="paper" aria-labelledby="proof-t">
          <div className="wrap svc-proof">
            <Head id="proof-t" tag="Where it works" title="Who runs it today." />
            <div className="svc-proof__grid">
              {caseStudy && <CaseCard c={caseStudy} wide />}
              {s.industries?.length > 0 && (
                <ul className="svc-proof__inds rv">
                  {s.industries.map((slug) => {
                    const ind = getIndustry(slug);
                    return ind ? (
                      <li key={slug}>
                        <Link to={`/industries/${slug}/`} className="indrow">
                          <Icon name={ind.icon} size={22} />
                          <span>{ind.name}</span>
                          <ArrowRight size={18} />
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && <FaqBlock items={faqs} title={`Questions about ${s.name.toLowerCase()}.`} />}

      {related.length > 0 && (
        <section className="section" data-theme="paper" aria-labelledby="rel-t">
          <div className="wrap">
            <Head id="rel-t" tag="Works with" title="Add it to the same login." />
            <div className="cards3">
              {related.map((slug) => (
                <ServiceCard key={slug} slug={slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DemoCta location={`service-${s.slug}`} service={s.interest} title={`See ${s.name.toLowerCase()} on your own vehicles.`} />
    </div>
  );
}
