import { Check } from "lucide-react";
import { Head } from "@/components/ui/Page";
import Screen from "@/components/ui/Screen";

// Platform screens. Two or more sit in a grid; a single screen gets a split layout with the
// heading, caption and key points beside it, so the section never reads as one lonely image.
export default function Showcase({ id, tag = "On the platform", title, items, points = [] }) {
  if (!items.length) return null;
  const single = items.length === 1;
  return (
    <section className="section gallery" data-theme="night" aria-labelledby={id}>
      <div className={`wrap ${single ? "split showcase--single" : ""}`}>
        {single ? (
          <>
            <div className="split__copy">
              <Head id={id} tag={tag} title={title} intro={items[0].caption} size="d-m" />
              {points.length > 0 && (
                <ul className="ticks rv">
                  {points.slice(0, 4).map((p) => (
                    <li key={p}>
                      <Check size={18} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="split__media rv">
              <Screen kind={items[0].visual} />
            </div>
          </>
        ) : (
          <>
            <Head id={id} tag={tag} title={title} />
            <div className={`gallery__grid gallery__grid--${Math.min(items.length, 3)}`}>
              {items.slice(0, 3).map((g) => (
                <div key={g.visual} className="rv">
                  <Screen kind={g.visual} caption={g.caption} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
