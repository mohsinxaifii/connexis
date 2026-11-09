import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Search } from "lucide-react";
import { Seo } from "@/lib/head";
import { graph, breadcrumbs } from "@/lib/schema";
import { PageHero, Head, useReveal } from "@/components/ui/Page";
import Screen from "@/components/ui/Screen";
import { Img } from "@/components/ui/Bits";
import { DemoCta } from "@/components/home/Closing";
import { site } from "@/content/site";
import { reports, reportGroups } from "@/content/misc";
import { app } from "@/content/media";

const blocks = [
  {
    id: "live",
    tag: "Live map and playback",
    title: "Know where everything is, and where it has been.",
    visual: "map",
    caption: "Open any vehicle to check ignition, speed, battery and signal without calling the driver.",
    points: ["Single or multi-vehicle tracking", "Route playback for any trip, with stops and speeds", "IO, asset and sensor info per vehicle"],
  },
  {
    id: "alerts",
    tag: "Alerts and events",
    title: "Hear about problems while you can still act.",
    visual: "fuel",
    caption: "A drop in the tank shows up as an alert with the time and place it happened.",
    points: ["Over-speed, idle, stop-over and unauthorised use", "Geofence entry and exit", "Fuel drain, temperature and dashcam events", "By app, email and optional SMS"],
  },
  {
    id: "portals",
    tag: "Custom industry portals",
    title: "Dashboards that match how your business runs.",
    visual: "dashboard",
    caption: "Running, stopped, idle and inactive vehicles beside the live map.",
    points: ["FMCG portals by franchise, DSM, ASM and distributor", "A waste-segment portal for sweepers and dumpers", "Separate logins for distributors, branches and management"],
  },
];

const GROUPS = ["All", ...new Set(Object.values(reportGroups))];

export default function Platform() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Platform", href: "/platform/" },
  ];
  const reveal = useReveal();
  const [group, setGroup] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => reports.filter((r) => (group === "All" || reportGroups[r] === group) && r.toLowerCase().includes(q.trim().toLowerCase())),
    [group, q]
  );

  return (
    <div ref={reveal}>
      <Seo
        title="Fleet Tracking Software: Web Portal & App | Connexis"
        description="The Connexis platform: live map and playback, alerts, 26 ready-made reports, custom industry portals and an Android and iOS app. See it live in a demo."
        path="/platform/"
        jsonLd={graph(breadcrumbs(crumbs))}
      />
      <PageHero
        crumbs={crumbs}
        tag="Fleet tracking software"
        title="Your whole fleet on one web portal and one app"
        intro="The Connexis web portal and Android and iOS app: tracking, fuel, temperature, cameras and assets, with 26 reports ready on day one."
        aside={<Screen kind="dashboard" />}
        ctas={
          <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="btn btn--line">
            Customer login <ArrowUpRight size={18} />
          </a>
        }
      />

      {blocks.map((b, i) => (
        <section key={b.id} className="section" data-theme={i === 1 ? "night" : "paper"} aria-labelledby={`${b.id}-t`}>
          <div className={`wrap split ${i % 2 ? "split--flip" : ""}`}>
            <div className="split__media rv">
              <Screen kind={b.visual} caption={b.caption} />
            </div>
            <div className="split__copy">
              <Head id={`${b.id}-t`} tag={b.tag} title={b.title} size="d-m" />
              <ul className="ticks rv">
                {b.points.map((p) => (
                  <li key={p}>
                    <Check size={18} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="section" data-theme="paper" aria-labelledby="reports-t">
        <div className="wrap">
          <Head id="reports-t" tag="Reports" title="26 ready-made reports." intro="Every one exports to Excel or PDF. Filter by group or search for the one you need." />
          <div className="rfilter rv">
            <div className="rfilter__groups" role="group" aria-label="Filter reports by group">
              {GROUPS.map((g) => (
                <button key={g} type="button" className={`rfilter__g mono ${group === g ? "is-on" : ""}`} aria-pressed={group === g} onClick={() => setGroup(g)}>
                  {g}
                </button>
              ))}
            </div>
            <label className="rfilter__search">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search reports</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reports" />
            </label>
          </div>
          <ul className="rgrid" aria-live="polite">
            {list.map((r) => (
              <li key={r} className="rgrid__item">
                <span className="mono">{reportGroups[r]}</span>
                <b>{r}</b>
              </li>
            ))}
            {!list.length && <li className="rgrid__none">No report matches “{q}”. Try “fuel” or “trip”.</li>}
          </ul>
        </div>
      </section>

      <section className="section" data-theme="night" aria-labelledby="app-t">
        <div className="wrap split">
          <div className="split__copy">
            <Head id="app-t" tag="Mobile app" title="The whole fleet in your pocket." intro="Android and iOS. Managers see what head office sees, wherever they are." size="d-m" />
            <ul className="ticks rv">
              {["Live status of every vehicle", "Mileage, fuel, temperature and door status", "Violations and push notifications", "History and reports on the go"].map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="split__media split__media--app rv">
            <Img src={app.src} alt={app.alt} width="1412" height="2006" />
          </div>
        </div>
      </section>

      <DemoCta location="platform" title="See the platform with your own vehicles." />
    </div>
  );
}
