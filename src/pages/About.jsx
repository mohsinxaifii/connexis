import { BadgeCheck } from "lucide-react";
import { Seo, abs } from "@/lib/head";
import { graph, breadcrumbs, organization } from "@/lib/schema";
import { PageHero, Head, useReveal } from "@/components/ui/Page";
import { Img, Photo } from "@/components/ui/Bits";
import { LogoWall } from "@/components/ui/Cards";
import Coverage from "@/components/home/Coverage";
import { DemoCta } from "@/components/home/Closing";
import { Bars } from "./Industries";
import { site, group } from "@/content/site";
import { photos, isoBadge } from "@/content/media";

const timeline = [
  { y: "2015", t: "Connexis starts", d: `Established in Lahore as a project of ${site.parent.name}, ${site.parent.city}.` },
  { y: "PTA", t: "Licensed nationwide", d: "A nationwide PTA licence for Data Class Value Added Services." },
  { y: "29", t: "Cities with technicians", d: "A field team that fits devices from Karachi to Gilgit, at the client's depot." },
  { y: "150k+", t: "Devices installed", d: "Vehicles, generators, cold rooms and containers for banks, insurers, distributors and public bodies." },
];

export default function About() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about/" },
  ];
  const reveal = useReveal();
  return (
    <div ref={reveal}>
      <Seo
        title="About Connexis | Vehicle Tracking in Pakistan Since 2015"
        description="Connexis has tracked vehicles in Pakistan since 2015: 150,000+ devices, technicians in 29 cities and a nationwide PTA licence. A Niche Marketing Management company."
        path="/about/"
        jsonLd={graph({ "@type": "AboutPage", url: abs("/about/"), name: "About Connexis" }, organization(), breadcrumbs(crumbs))}
      />
      <PageHero
        crumbs={crumbs}
        tag="About Connexis"
        title="On Pakistan's roads since 2015."
        intro={`Connexis was established in ${site.founded} as a project of ${site.parent.name}, ${site.parent.city}. Today we track vehicles, generators, cold rooms and containers for banks, insurers, distributors and public bodies across Pakistan.`}
        photo={photos.pakistanRoad}
      />

      <section className="section" data-theme="paper" aria-labelledby="tl-t">
        <div className="wrap">
          <Head id="tl-t" tag="The short version" title="Since 2015, in four numbers." />
          <ol className="tline">
            {timeline.map((s) => (
              <li key={s.t} className="tline__item rv">
                <b className="tline__y">{s.y}</b>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Coverage />

      <section className="section" data-theme="paper" aria-labelledby="mix-t">
        <div className="wrap split">
          <div className="split__copy">
            <Head id="mix-t" tag="Who we serve" title="Portfolio by sector." intro="Insurance is our largest segment, followed closely by individual owners and logistics fleets." size="d-m" />
          </div>
          <Bars />
        </div>
        <div className="wrap mt-xl">
          <LogoWall />
        </div>
      </section>

      <section className="section" data-theme="night" aria-labelledby="grp-t">
        <div className="wrap split">
          <Photo photo={photos.lahoreNight} className="split__photo rv" />
          <div className="split__copy">
            <Head id="grp-t" tag="The group" title={`Part of ${site.parent.name}.`} size="d-m" />
            <ul className="ticks rv">
              <li>
                <BadgeCheck size={20} aria-hidden="true" />
                {site.ptaLicence}
              </li>
              {site.iso && (
                <li>
                  <BadgeCheck size={20} aria-hidden="true" />
                  {site.iso}
                </li>
              )}
              <li>
                <BadgeCheck size={20} aria-hidden="true" />A group with {group.offices} and {group.staff}
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden="true" />
                Head office: {site.address.street}, {site.address.city}
              </li>
            </ul>
            {site.iso && (
              <div className="iso rv">
                <Img src={isoBadge.src} alt={isoBadge.alt} />
              </div>
            )}
          </div>
        </div>
      </section>

      <DemoCta location="about" title="Talk to the team." />
    </div>
  );
}
