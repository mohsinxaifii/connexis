import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { getService } from "@/content/services";

export default function RelatedCards({ slugs, title = "Related solutions" }) {
  const list = slugs.map(getService).filter(Boolean);
  if (!list.length) return null;
  return (
    <section aria-labelledby="related-title" className="section">
      <div className="container-x">
        <h2 id="related-title" data-split className="t-h2 reveal">
          {title}
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {list.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ "--i": i }}>
              <Link href={`/${s.slug}/`} className="card card-hover group flex h-full flex-col p-6">
                <Icon name={s.icon} size={26} className="transition-colors group-hover:text-red-500" />
                <h3 className="mt-5 font-display text-[19px] font-semibold">{s.menuName}</h3>
                <p className="mt-2 flex-1 text-[15px] text-grey-600">{s.short}</p>
                <span className="link-arrow mt-5 text-[15px]">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
