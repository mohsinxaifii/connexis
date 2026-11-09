import PlatformVisual from "@/components/visuals/PlatformVisual";
import SectionHead from "@/components/ui/SectionHead";

export default function Gallery({ items, title = "Inside the platform" }) {
  if (!items?.length) return null;
  const [first, ...rest] = items;
  return (
    <section aria-labelledby="gallery-title" className="section">
      <div className="container-x">
        <SectionHead id="gallery-title" eyebrow="Screens" title={title} />
        <div className={`mt-10 grid gap-8 ${rest.length ? "lg:grid-cols-2" : ""}`}>
          {[first, ...rest].map((g, i) => (
            <figure key={g.caption} className={`reveal ${i === 0 && rest.length === 2 ? "lg:col-span-2" : ""}`} style={{ "--i": i }}>
              <PlatformVisual kind={g.visual} className={g.visual === "app" ? "" : ""} />
              <figcaption className="mt-3 flex gap-2 text-[15px] text-grey-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
