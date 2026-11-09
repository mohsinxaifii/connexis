"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

// Click-to-load map (spec §7.5, §9.7): Google Maps loads only after the visitor asks for it.
export default function MapFacade({ query, label }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        title={`Map: ${label}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="aspect-[4/3] w-full rounded-[12px] border border-grey-200"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-grey-200 bg-grey-100 text-left"
    >
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="#fff" strokeLinecap="round" fill="none">
          <path d="M0 80H400M0 190H400M0 260H400M90 0V300M230 0V300M330 0V300" strokeWidth="10" />
          <path d="M0 300L320 0" strokeWidth="14" />
          <path d="M0 130H400M160 0V300M290 0V300" strokeWidth="4" />
        </g>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-red-500">
        <MapPin size={44} strokeWidth={1.5} fill="#fff" />
      </span>
      <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <span className="text-[15px] font-medium">{label}</span>
        <span className="text-[14px] font-semibold text-red-500 group-hover:underline">Load map</span>
      </span>
    </button>
  );
}
