import { Plus } from "lucide-react";

// Native <details> accordion: keyboard accessible and works with no JavaScript.
export default function Faq({ items }) {
  const list = items.filter((f) => !f.pending);
  return (
    <div className="divide-y divide-grey-200 border-y border-grey-200">
      {list.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[17px] font-semibold md:text-[19px] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-grey-200 transition-[transform,border-color] duration-200 group-open:rotate-45 group-open:border-red-500 group-open:text-red-500">
              <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-[720px] pb-6 pr-14 text-grey-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
