import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="t-small text-grey-600">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />}
            {i < items.length - 1 ? (
              <Link href={it.href} className="hover:text-ink-900">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-900">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
