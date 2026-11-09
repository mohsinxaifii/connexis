import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseCover from "./CaseCover";

// Case-study tile (spec §5.4). A plain <a> to the case-study URL, so it works with no JavaScript;
// with JS, the intercepting route turns the click into the popup.
export default function CaseTile({ cs, index = 0, wide = false, className = "" }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}/`}
      scroll={false}
      data-cursor="View"
      data-tilt
      className={`reveal group relative block min-h-[300px] overflow-hidden rounded-[12px] bg-ink-900 text-white outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white ${
        wide ? "md:col-span-2" : ""
      } ${className}`}
      style={{ "--i": index }}
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
        <CaseCover kind={cs.cover} image={cs.image} sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden="true" />

      {/* Default state */}
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-md bg-white px-2.5 py-1.5 font-display text-[13px] font-bold text-ink-900">{cs.clientShort}</span>
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[12px] font-medium backdrop-blur-sm">{cs.sector}</span>
        </div>
        <div>
          <p className={`font-display font-bold leading-tight tracking-tight ${wide ? "text-[28px] md:text-[40px]" : "text-[22px] md:text-[26px]"}`}>
            {cs.tileResult}
          </p>
          <p className="mt-1 text-[14px] text-white/75">{cs.tileLine}</p>
        </div>
      </div>

      {/* Hover / focus state: red overlay slides up */}
      <div
        className="absolute inset-0 flex translate-y-full flex-col justify-end bg-red-500/[.88] p-5 transition-transform duration-200 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 md:p-6"
        aria-hidden="true"
      >
        <p className={`stat-num !text-white ${wide ? "text-[40px] md:text-[56px]" : "text-[32px] md:text-[40px]"}`}>{cs.tileResult}</p>
        <p className="mt-2 max-w-[440px] text-[15px] text-white/90">{cs.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
          View case study <ArrowRight size={18} />
        </span>
      </div>
    </Link>
  );
}
