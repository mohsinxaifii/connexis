import { ArrowRight } from "lucide-react";

export default function PainStrip({ pairs }) {
  return (
    <section aria-label="Problems and outcomes" className="bg-grey-100">
      <div className="container-x grid gap-px overflow-hidden py-10 md:grid-cols-3 md:gap-0 md:py-12">
        {pairs.map(([pain, out], i) => (
          <div key={pain} className={`reveal py-5 md:px-8 md:py-0 ${i ? "border-t border-grey-200 md:border-l md:border-t-0" : "md:pl-0"}`} style={{ "--i": i }}>
            <p className="text-[15px] text-grey-600">{pain}</p>
            <p className="mt-2 flex gap-2 font-display text-[18px] font-semibold leading-snug">
              <ArrowRight size={18} strokeWidth={2} className="mt-1 shrink-0 text-red-500" aria-hidden="true" />
              {out}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
