import { useParams } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Seo } from "@/lib/head";
import { graph, breadcrumbs, article } from "@/lib/schema";
import Link from "@/components/ui/Link";
import { Photo } from "@/components/ui/Bits";
import { PageHero, Head, useReveal } from "@/components/ui/Page";
import Showcase from "@/components/ui/Showcase";

const CAPTIONS = {
  "dashboard": "Running, stopped, idle and inactive vehicles beside the live map.",
  "reports": "Ready-made reports, exported to Excel or PDF.",
  "map": "Every vehicle on the map, with its route and stops.",
  "genset": "Tank level, fills, burn and running hours for every branch generator.",
  "fuel": "Fills and drops on one chart, with the exact time of each.",
  "app": "Live location, alerts and trip history in the Android and iOS app.",
  "asset": "The container's route, battery, door and tamper status in one view."
};
import { CaseCard, ServiceCard, LogoWall } from "@/components/ui/Cards";
import { DemoCta } from "@/components/home/Closing";
import { caseStudies, getCase, caseNeighbours } from "@/content/caseStudies";
import { casePhoto, photos } from "@/content/media";
import NotFound from "./NotFound";

export function Cases() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies/" },
  ];
  const approved = caseStudies.filter((c) => c.approved);
  const delivered = caseStudies.filter((c) => !c.approved);
  const reveal = useReveal();
  return (
    <div ref={reveal}>
      <Seo
        title="Fleet Tracking Case Studies | Connexis"
        description="How a PepsiCo distributor cut its fleet from 700 to 400 vehicles and Meezan Bank cut generator fuel cost by 16% with Connexis. Read the case studies."
        path="/case-studies/"
        jsonLd={graph(breadcrumbs(crumbs))}
      />
      <PageHero
        crumbs={crumbs}
        tag="Case studies"
        title="What changed once they could see it."
        intro="Two results our clients have signed off on, and the projects we have delivered for distributors, city councils, insurers and container operators."
        photo={photos.trailerDusk}
      />

      <section className="section" data-theme="paper" aria-labelledby="res-t">
        <div className="wrap">
          <Head id="res-t" tag="Signed-off results" title="The numbers." />
          <div className="cases2">
            {approved.map((c) => (
              <CaseCard key={c.slug} c={c} wide />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-theme="night" aria-labelledby="del-t">
        <div className="wrap">
          <Head id="del-t" tag="Delivered" title="More projects on the road." intro="Results for these are waiting on client approval, so we only show what we built." />
          <ol className="dlist">
            {delivered.map((c, i) => (
              <li key={c.slug} className="rv">
                <Link to={`/case-studies/${c.slug}/`} className="dlist__row" data-cursor="Read">
                  <span className="mono dlist__n">{String(i + 1).padStart(2, "0")}</span>
                  <Photo photo={casePhoto[c.cover]} className="dlist__photo" />
                  <span className="dlist__title">
                    <b>{c.headline}</b>
                    <span className="mono">{c.sector}</span>
                  </span>
                  <span className="dlist__result">{c.tileResult}</span>
                  <ArrowRight size={20} />
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-xl">
            <LogoWall />
          </div>
        </div>
      </section>

      <DemoCta location="case-studies" title="Be the next case study." />
    </div>
  );
}

export function Case() {
  const { slug } = useParams();
  const c = getCase(slug);
  const reveal = useReveal();
  if (!c) return <NotFound />;
  const path = `/case-studies/${c.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies/" },
    { name: c.clientShort, href: path },
  ];
  const { prev, next } = caseNeighbours(c.slug);

  return (
    <div ref={reveal} key={c.slug}>
      <Seo
        title={`${c.headline} | Connexis`}
        description={c.summary}
        path={path}
        noindex={!c.approved}
        jsonLd={graph(article({ headline: c.headline, path, date: c.datePublished }), breadcrumbs(crumbs))}
      />
      <PageHero crumbs={crumbs} tag={`${c.sector} · ${c.location}`} title={c.headline} intro={c.summary} photo={casePhoto[c.cover]} size="d-l" />

      <section className="section" data-theme="paper" aria-label="Case summary">
        <div className="wrap">
          {c.results.length > 0 && (
            <ul className="kpis">
              {c.results.map((r) => (
                <li key={r.label} className="rv">
                  <b className="num">{r.value}</b>
                  <span className="mono">{r.label}</span>
                </li>
              ))}
            </ul>
          )}
          <dl className="facts rv">
            <div>
              <dt className="mono">Client</dt>
              <dd>{c.client}</dd>
            </div>
            <div>
              <dt className="mono">Sector</dt>
              <dd>{c.sector}</dd>
            </div>
            <div>
              <dt className="mono">Where</dt>
              <dd>{c.location}</dd>
            </div>
            <div>
              <dt className="mono">Scale</dt>
              <dd>{c.size}</dd>
            </div>
          </dl>

          <div className="story2">
            <Block n="01" title="The challenge">
              <p>{c.challenge}</p>
            </Block>
            <Block n="02" title="What we recommended">
              <p>{c.recommendation}</p>
            </Block>
            <Block n="03" title="What we did">
              <ul className="ticks">
                {c.actions.map((a) => (
                  <li key={a}>
                    <Check size={18} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </Block>
            {c.methods.length > 0 && (
              <Block n="04" title="How it works day to day">
                <ul className="ticks">
                  {c.methods.map((a) => (
                    <li key={a}>
                      <Check size={18} aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {c.successFactors.length > 0 && (
              <Block n="05" title="Why it worked">
                <ul className="ticks">
                  {c.successFactors.map((a) => (
                    <li key={a}>
                      <Check size={18} aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
          {!c.approved && <p className="mono note">Metrics for this project are pending client approval.</p>}
        </div>
      </section>

      <Showcase
        id="cg-t"
        title="What they see every day"
        items={c.gallery.slice(1, 4).map((g) => ({ visual: g, caption: CAPTIONS[g] }))}
        points={[...c.methods, ...c.actions]}
      />

      <section className="section" data-theme="paper" aria-labelledby="cs-t">
        <div className="wrap">
          <Head id="cs-t" tag="Used in this project" title="The instruments." />
          <div className="cards3">
            {c.services.map((s) => (
              <ServiceCard key={s} slug={s} />
            ))}
          </div>
          <nav className="pager" aria-label="More case studies">
            <Link to={`/case-studies/${prev.slug}/`} className="pager__link">
              <ArrowLeft size={18} />
              <span>
                <small className="mono">Previous</small>
                {prev.clientShort}
              </span>
            </Link>
            <Link to={`/case-studies/${next.slug}/`} className="pager__link pager__link--next">
              <span>
                <small className="mono">Next</small>
                {next.clientShort}
              </span>
              <ArrowRight size={18} />
            </Link>
          </nav>
        </div>
      </section>

      <DemoCta location={`case-${c.slug}`} caseSlug={c.slug} title="Want results like these?" />
    </div>
  );
}

function Block({ n, title, children }) {
  return (
    <div className="story2__block rv">
      <p className="mono story2__n">{n}</p>
      <h2 className="d-s">{title}</h2>
      <div className="story2__body">{children}</div>
    </div>
  );
}
