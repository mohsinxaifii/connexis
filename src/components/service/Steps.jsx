import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import { steps } from "@/content/services";

export default function Steps() {
  return (
    <section aria-labelledby="steps-title" className="section bg-grey-100">
      <div className="container-x">
        <SectionHead id="steps-title" eyebrow="How it works" title="From sensor to decision." />
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal card relative p-6" style={{ "--i": i }}>
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-grey-100">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-display text-[28px] font-bold tabular-nums text-grey-200">{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-[17px] font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-grey-600">{s.text}</p>
              {i < steps.length - 1 && (
                <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-grey-200 bg-white text-[12px] text-red-500 md:grid" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
