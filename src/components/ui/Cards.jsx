import { ArrowUpRight } from "lucide-react";
import Link from "@/components/ui/Link";
import { Img, Photo } from "@/components/ui/Bits";
import { servicePhoto, casePhoto, clientLogos } from "@/content/media";
import { getService } from "@/content/services";

export function ServiceCard({ slug, index }) {
  const s = getService(slug);
  if (!s) return null;
  return (
    <Link to={`/${s.slug}/`} className="scard rv" data-cursor="Open">
      <Photo photo={servicePhoto[s.slug]?.photo} className="scard__photo" />
      <div className="scard__body">
        {index != null && <span className="mono scard__idx">{String(index + 1).padStart(2, "0")}</span>}
        <h3 className="d-s">{s.name}</h3>
        <p>{s.short}</p>
        <ArrowUpRight className="scard__arrow" size={22} />
      </div>
    </Link>
  );
}

export function CaseCard({ c, wide = false }) {
  const result = c.approved ? c.results[0] : null;
  return (
    <Link to={`/case-studies/${c.slug}/`} className={`ccard rv ${wide ? "ccard--wide" : ""}`} data-cursor="Read">
      <Photo photo={casePhoto[c.cover]} className="ccard__photo">
        <span className="ccard__sector mono">{c.sector}</span>
      </Photo>
      <div className="ccard__body">
        {result ? (
          <p className="ccard__result num">
            {result.value} <small className="mono">{result.label}</small>
          </p>
        ) : (
          <p className="ccard__result ccard__result--soft">{c.tileResult}</p>
        )}
        <h3 className="ccard__title">{c.headline}</h3>
        <p className="mono ccard__meta">
          {c.clientShort} · {c.location}
        </p>
      </div>
    </Link>
  );
}

export function LogoWall({ names }) {
  const list = names ? clientLogos.filter((l) => names.some((n) => l.name.toLowerCase().includes(n.toLowerCase().split(" ")[0]))) : clientLogos;
  if (!list.length) return null;
  return (
    <ul className="lwall">
      {list.map((l) => (
        <li key={l.name} className="lwall__tile">
          <Img src={l.src} alt={l.name} width="800" height="600" />
        </li>
      ))}
    </ul>
  );
}
