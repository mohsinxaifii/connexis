import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlatformVisual from "@/components/visuals/PlatformVisual";
import ReportsGrid from "@/components/visuals/ReportsGrid";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Fleet Tracking Software: Web Portal & App | Connexis",
  description:
    "The Connexis platform: live map and playback, alerts, 26 ready-made reports, custom industry portals and an Android and iOS app. See it live in a demo.",
  path: "/platform/",
});

// Every screenshot carries a caption saying what the manager learns from it (spec §7.2).
const blocks = [
  {
    id: "live",
    eyebrow: "Live map and playback",
    title: "Know where everything is, and where it has been.",
    visual: "map",
    caption: "Open any vehicle to check ignition, speed, battery and signal without calling the driver.",
    points: ["Single or multi-vehicle tracking", "Route playback for any trip, with stops and speeds", "IO, asset and sensor info per vehicle"],
  },
  {
    id: "alerts",
    eyebrow: "Alerts and events",
    title: "Hear about problems while you can still act.",
    visual: "fuel",
    caption: "A drop in the tank shows up as an alert with the time and place it happened.",
    points: ["Over-speed, idle, stop-over and unauthorised use", "Geofence entry and exit", "Fuel drain, temperature and dashcam events", "By app, email and optional SMS"],
  },
  {
    id: "portals",
    eyebrow: "Custom industry portals",
    title: "Dashboards that match how your business runs.",
    visual: "dashboard",
    caption: "Spot under-used vehicles by daily trips, filtered by franchise or distributor.",
    points: ["FMCG portals by franchise, DSM, ASM and distributor", "A waste-segment portal for sweepers and dumpers", "Separate logins for distributors, branches and management"],
  },
];

export default function PlatformPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Platform", href: "/platform/" },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <section className="relative overflow-hidden">
        <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pb-12 pt-6">
          <Breadcrumbs items={crumbs} />
          <div className="mx-auto mt-12 max-w-[820px] text-center">
            <p className="eyebrow">Fleet tracking software</p>
            <h1 data-split="hero" className="t-h1 mt-4">The Connexis Platform: Web Portal and Mobile App</h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[17px] text-grey-600 md:text-[19px]">
              One login for tracking, fuel, temperature, cameras and assets, with 26 reports ready on day one.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#demo" className="btn btn-primary" data-track="demo_cta_click" data-location="hero">
                See it live
              </Link>
              <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="btn btn-secondary">
                Customer login <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="reveal mx-auto mt-14 max-w-[1040px]">
            <PlatformVisual kind="dashboard" priority />
          </div>
        </div>
      </section>

      {blocks.map((b, i) => (
        <section key={b.id} aria-labelledby={`${b.id}-t`} className={`section ${i % 2 ? "" : "bg-grey-100"}`}>
          <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <figure className={`reveal ${i % 2 ? "lg:order-2" : ""}`}>
              <PlatformVisual kind={b.visual} />
              <figcaption className="t-small mt-3 text-grey-600">{b.caption}</figcaption>
            </figure>
            <div className="reveal" style={{ "--i": 1 }}>
              <p className="eyebrow">{b.eyebrow}</p>
              <h2 id={`${b.id}-t`} className="t-h2 mt-3">
                {b.title}
              </h2>
              <ul className="mt-6 space-y-3">
                {b.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check size={20} strokeWidth={2} className="mt-1 shrink-0 text-red-500" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="reports-t" className="section">
        <div className="container-x">
          <div className="reveal max-w-[720px]">
            <p className="eyebrow">Reports</p>
            <h2 id="reports-t" data-split className="t-h2 mt-3">
              26 ready-made reports.
            </h2>
            <p className="mt-4 text-grey-600">Every one exports to Excel or PDF. Search or filter to find the one you need.</p>
          </div>
          <div className="mt-10">
            <ReportsGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="app-t" className="section bg-grey-100">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Mobile app</p>
            <h2 id="app-t" data-split className="t-h2 mt-3">
              The whole fleet in your pocket.
            </h2>
            <p className="mt-4 text-grey-600">Android and iOS. Managers see what head office sees, wherever they are.</p>
            <ul className="mt-6 space-y-3">
              {["Live status of every vehicle", "Mileage, fuel, temperature and door status", "Violations and push notifications", "History and reports on the go"].map((p) => (
                <li key={p} className="flex gap-3">
                  <Check size={20} strokeWidth={2} className="mt-1 shrink-0 text-red-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <figure className="reveal" style={{ "--i": 1 }}>
            <PlatformVisual kind="app" />
            <figcaption className="t-small mt-3 text-grey-600">Check a vehicle&apos;s status, mileage and fuel without opening a laptop.</figcaption>
          </figure>
        </div>
      </section>

      <FinalCta location="platform" title="See the platform with your own vehicles." />
    </>
  );
}
