import { useId, useState } from "react";
import { Plus } from "lucide-react";

export default function Faq({ items }) {
  const list = items.filter((f) => !f.pending);
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <div className="faq">
      {list.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={`faq__item ${on ? "is-open" : ""}`}>
            <h3>
              <button type="button" className="faq__q" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div id={`${id}-${i}`} className="faq__a" role="region">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
