"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { reports, reportGroups } from "@/content/misc";

export default function ReportsGrid() {
  const [q, setQ] = useState("");
  const [g, setG] = useState(null);
  const groups = [...new Set(Object.values(reportGroups))];
  const list = useMemo(
    () => reports.filter((r) => (!q || r.toLowerCase().includes(q.toLowerCase())) && (!g || reportGroups[r] === g)),
    [q, g]
  );
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className="relative block md:w-[320px]">
          <span className="sr-only">Search reports</span>
          <Search size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-600" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 26 reports" className="field !pl-11" type="search" />
        </label>
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
          {[null, ...groups].map((x) => (
            <button
              key={x || "all"}
              type="button"
              aria-pressed={g === x}
              onClick={() => setG(x)}
              className={`min-h-[40px] shrink-0 rounded-full border px-4 text-[14px] font-medium ${g === x ? "border-ink-900 bg-ink-900 text-white" : "border-grey-200 bg-white hover:border-grey-400"}`}
            >
              {x || "All"}
            </button>
          ))}
        </div>
      </div>
      <p className="t-small mt-4 text-grey-600" aria-live="polite">
        {list.length} {list.length === 1 ? "report" : "reports"}
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((r) => (
          <li key={r} className="card flex min-h-[84px] flex-col justify-between p-4">
            <span className="text-[12px] font-medium uppercase tracking-wider text-grey-600">{reportGroups[r]}</span>
            <span className="mt-2 font-display text-[16px] font-semibold leading-tight">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
