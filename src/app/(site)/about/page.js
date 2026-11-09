import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CountUp from "@/components/ui/CountUp";
import CoverageMap from "@/components/visuals/CoverageMap";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { group, site } from "@/content/site";
import { portfolio } from "@/content/misc";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, organization } from "@/lib/schema";
import { abs } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Connexis | Vehicle Tracking in Pakistan Since 2015",
  description:
    "Connexis has tracked vehicles in Pakistan since 2015: 150,000+ devices, technicians in 29 cities and a nationwide PTA licence. A Niche Marketing Management company.",
  path: "/about/",
});

const numbers = [
  { value: 150000, suffix: "+", label: "devices installed" },
  { value: 29, label: "cities with technicians" },
  { value: 24, label: "group offices in 14+ countries" },
  { value: 1000, suffix: "+", label: "group office and field staff" },
];

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about/" },
  ];
  const max = Math.max(...portfolio.map(([, v]) => v));
  return (
    <>
      <JsonLd data={graph({ "@type": "AboutPage", url: abs("/about/"), name: "About Connexis" }, organization(), breadcrumbs(crumbs))} />

      <section className="relative overflow-hidden">
        <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pb-16 pt-6 md:pb-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">About Connexis</p>
              <h1 data-split="hero" className="t-h1 mt-4">About Connexis: Vehicle Tracking in Pakistan Since 2015</h1>
            </div>
            <p className="text-[17px] text-grey-600 md:text-[19px]">
              Connexis was established in {site.founded} as a project of {site.parent.name}, {site.parent.city}. Today we track vehicles, generators, cold rooms and
              containers for banks, insurers, distributors and public bodies across Pakistan.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Connexis in numbers" className="border-y border-grey-200 bg-grey-100">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
          {numbers.map((n, i) => (
            <div key={n.label} className="reveal" style={{ "--i": i }}>
              <dt className="sr-only">{n.label}</dt>
              <dd>
                <CountUp value={n.value} suffix={n.suffix} className="stat-num block text-[36px] leading-none md:text-[48px]" />
                <span className="mt-2 block text-[15px] text-grey-600">{n.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="cov-t" className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Coverage</p>
            <h2 id="cov-t" data-split className="t-h2 mt-3">
              Technicians from Karachi to Gilgit.
            </h2>
            <p className="mt-4 text-grey-600">
              Our technical team works in 29 cities, so devices are fitted at your depot or branch, not shipped to you. Head office is in Lahore at {site.address.street}.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex gap-3">
                <BadgeCheck size={22} strokeWidth={1.5} className="shrink-0 text-red-500" aria-hidden="true" />
                {site.ptaLicence}
              </li>
              <li className="flex gap-3">
                <BadgeCheck size={22} strokeWidth={1.5} className="shrink-0 text-red-500" aria-hidden="true" />
                Part of a group with {group.offices} and {group.staff}
              </li>
            </ul>
          </div>
          <div className="reveal" style={{ "--i": 1 }}>
            <CoverageMap />
          </div>
        </div>
      </section>

      <section aria-labelledby="mix-t" className="section bg-grey-100">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Who we serve</p>
            <h2 id="mix-t" data-split className="t-h2 mt-3">
              Portfolio by sector.
            </h2>
            <p className="mt-4 text-grey-600">Insurance is our largest segment, followed closely by individual owners and logistics fleets.</p>
            <Link href="/industries/" className="link-arrow mt-6">
              Explore industries <ArrowRight size={18} />
            </Link>
          </div>
          <figure className="reveal" style={{ "--i": 1 }}>
            <figcaption className="sr-only">Share of the Connexis portfolio by sector</figcaption>
            <ul className="space-y-3">
              {portfolio.map(([label, v], i) => (
                <li key={label} className="grid grid-cols-[150px_1fr_52px] items-center gap-4 text-[15px] md:grid-cols-[200px_1fr_56px]">
                  <span>{label}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-white">
                    <span className={`block h-full rounded-full ${i === 0 ? "bg-red-500" : "bg-ink-900"}`} style={{ width: `${(v / max) * 100}%` }} />
                  </span>
                  <span className="text-right font-display font-semibold tabular-nums">{v}%</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </section>

      {/* Leadership photos and names go here once supplied (spec §7.4, §10.1). */}

      <FinalCta location="about" title="Talk to the team." />
    </>
  );
}
