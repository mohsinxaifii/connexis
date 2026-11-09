import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

export default function FeatureGrid({ features, title = "What you get", eyebrow = "Features", outcomes }) {
  return (
    <section aria-labelledby="features-title" className="section">
      <div className="container-x">
        <SectionHead id="features-title" eyebrow={eyebrow} title={title} />
        {outcomes && (
          <ul className="reveal mt-6 flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <li key={o} className="chip !border-red-500/30 !bg-red-050 !text-red-600">
                {o}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-grey-200 bg-grey-200 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <li key={f.title} className="reveal bg-white p-6" style={{ "--i": i % 4 }}>
              <Icon name={f.icon} size={26} />
              <h3 className="mt-5 font-display text-[17px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[15px] text-grey-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
