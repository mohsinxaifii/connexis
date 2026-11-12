import { useId, useState } from "react";

// A plus whose vertical bar folds flat into a minus when the answer opens.
function Toggle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 9h12" />
      <path className="faq__bar" d="M9 3v12" />
    </svg>
  );
}

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
                  <Toggle />
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
