import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { industries } from "@/content/industries";

const ORDER = ["fmcg-distribution", "banks-telecom", "insurance-leasing", "logistics-transport", "oil-gas", "waste-municipal"];

// Dark industry cards in the Niche family style: icon, name, the client names that prove it.
export default function IndustriesGrid() {
  const list = ORDER.map((s) => industries.find((i) => i.slug === s));
  return (
    <section aria-labelledby="ind-title" data-header-dark className="section relative bg-[#0d0d0f] text-white">
      <div className="container-x">
        <p className="inline-flex items-center gap-2.5 text-[14px] text-white/60">
          <span className="h-2 w-2 rounded-full bg-red-500" /> Industries
        </p>
        <h2 id="ind-title" data-split className="mt-4 max-w-[900px] font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[80px]">
          Six industries, one way of tracking.
        </h2>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ind, i) => (
            <li key={ind.slug} className="reveal" style={{ "--i": i }}>
              <Link
                href={`/industries/${ind.slug}/`}
                data-cursor="Explore"
                className={`group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[20px] border p-7 transition-colors duration-300 ${
                  i === 0 ? "border-red-500 bg-red-500" : "border-white/10 bg-white/[0.04] hover:border-red-500 hover:bg-red-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <Icon name={ind.icon} size={34} strokeWidth={1.25} />
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[28px] font-bold leading-none tracking-[-0.04em]">{ind.name}</h3>
                  <p className={`mt-3 text-[14px] ${i === 0 ? "text-white/85" : "text-white/55 group-hover:text-white/85"}`}>
                    {ind.clients.length ? ind.clients.slice(0, 3).join(" · ") : ind.pains.map((p) => p.title).slice(0, 2).join(" · ")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
