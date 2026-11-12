import { ArrowUpRight } from "lucide-react";
import Link from "@/components/ui/Link";
import { Photo } from "@/components/ui/Bits";
import { Head, useReveal } from "@/components/ui/Page";
import { Problem } from "@/components/ui/Markers";
import Icon from "@/components/ui/Icon";
import { industries } from "@/content/industries";
import { industryPhoto } from "@/content/media";

export default function IndustriesGrid() {
  const ref = useReveal();
  return (
    <section ref={ref} className="section" data-theme="paper" aria-labelledby="inds-title">
      <div className="wrap">
        <Head id="inds-title" tag="Industries" title="Who we work with" />
        <ul className="inds">
          {industries.map((ind) => (
            <li key={ind.slug} className="rv">
              <Link to={`/industries/${ind.slug}/`} className="ind">
                <div className="ind__media">
                  <Photo photo={industryPhoto[ind.slug]} className="ind__photo" />
                  <span className="svc__icon">
                    <Icon name={ind.icon} size={20} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="ind__body">
                  <h3 className="ind__name">
                    {ind.name} <ArrowUpRight size={18} aria-hidden="true" />
                  </h3>
                  <ul className="ind__pains">
                    {ind.pains.map((p) => (
                      <li key={p.title}>
                        <Problem icon={p.icon} size="sm" /> {p.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
