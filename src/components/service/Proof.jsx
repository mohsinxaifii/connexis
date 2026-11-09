import CaseTile from "@/components/case/CaseTile";
import { getCase } from "@/content/caseStudies";
import { clients } from "@/content/misc";

export default function Proof({ caseSlug, industries = [] }) {
  const cs = caseSlug && getCase(caseSlug);
  const names = clients.filter((c) => industries.includes(c.industry)).slice(0, 6);
  if (!cs && !names.length) return null;
  return (
    <section aria-labelledby="proof-heading" className="section bg-grey-100">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="reveal">
          <p className="eyebrow mb-3">Proof</p>
          <h2 id="proof-heading" data-split className="t-h2">
            {cs ? "Results from a client like you." : "Trusted in your sector."}
          </h2>
          {names.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {names.map((c) => (
                <li key={c.name} className="font-display text-[17px] font-bold text-ink-900 opacity-60">
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {cs && (
          <div className="grid lg:h-[360px]">
            <CaseTile cs={cs} wide />
          </div>
        )}
      </div>
    </section>
  );
}
