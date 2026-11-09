"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function NotFoundSearch({ pages }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => (q.length < 2 ? [] : pages.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())).slice(0, 6)), [q, pages]);
  return (
    <div className="relative mx-auto mt-8 max-w-[440px] text-left">
      <label className="relative block">
        <span className="sr-only">Search the site</span>
        <Search size={18} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-600" aria-hidden="true" />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search solutions, industries, pages" className="field !pl-11" />
      </label>
      {hits.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-grey-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          {hits.map((h) => (
            <li key={h.href}>
              <Link href={h.href} className="block px-4 py-3 text-[15px] hover:bg-grey-100">
                {h.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
