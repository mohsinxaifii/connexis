"use client";

import { useMemo, useState } from "react";
import CaseTile from "./CaseTile";

// Client-side filter chips (spec §7.3). Every tile is still a crawlable link in the HTML.
export default function CaseFilter({ cases, industries, services }) {
  const [ind, setInd] = useState(null);
  const [svc, setSvc] = useState(null);

  const list = useMemo(
    () => cases.filter((c) => (!ind || c.industry === ind) && (!svc || c.services.includes(svc))),
    [cases, ind, svc]
  );

  return (
    <>
      <div className="space-y-4">
        <ChipRow label="Industry" options={industries} value={ind} onChange={setInd} />
        <ChipRow label="Solution" options={services} value={svc} onChange={setSvc} />
      </div>
      <p className="t-small mt-6 text-grey-600" aria-live="polite">
        Showing {list.length} of {cases.length} case studies
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
        {list.map((cs, i) => (
          <CaseTile key={cs.slug} cs={cs} index={i} wide={cs.tileSize === "wide" && !ind && !svc} className="is-visible" />
        ))}
      </div>
    </>
  );
}

function ChipRow({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <span className="eyebrow w-20 shrink-0">{label}</span>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
        <Chip active={!value} onClick={() => onChange(null)}>
          All
        </Chip>
        {options.map((o) => (
          <Chip key={o.value} active={value === o.value} onClick={() => onChange(value === o.value ? null : o.value)}>
            {o.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-[40px] shrink-0 rounded-full border px-4 text-[14px] font-medium transition-colors ${
        active ? "border-ink-900 bg-ink-900 text-white" : "border-grey-200 bg-white hover:border-grey-400"
      }`}
    >
      {children}
    </button>
  );
}
