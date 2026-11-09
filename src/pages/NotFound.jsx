import { ArrowRight } from "lucide-react";
import { Seo } from "@/lib/head";
import Link from "@/components/ui/Link";
import { Reticle } from "@/components/ui/Bits";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Connexis" description="This page has gone off route." path="/404/" noindex />
      <section className="nf" data-theme="night">
        <div className="wrap nf__inner">
          <p className="mono nf__code">
            <span className="dot dot--red" /> GEOFENCE EXIT · 404
          </p>
          <Reticle size={96} className="red" spin />
          <h1 className="d-xl">Off route.</h1>
          <p className="lead">This page has left the geofence. Here's where most people were heading:</p>
          <ul className="nf__links">
            {[{ slug: "", name: "Home" }, ...services.slice(0, 5)].map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug ? s.slug + "/" : ""}`} className="indrow">
                  <span>{s.name}</span>
                  <ArrowRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
