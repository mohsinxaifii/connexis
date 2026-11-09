"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import CaseGallery from "./CaseGallery";
import { track } from "@/lib/analytics";

let opener = null;

// Case-study popup (spec §5.4). Rendered by the intercepting route, so the address bar shows the
// real case-study URL, Back closes it, and a refresh or shared link loads the full page instead.
export default function CaseModal({ cs, prev, next, services }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const headingId = `cs-${cs.slug}`;

  const close = useCallback(() => router.back(), [router]);

  // Remember the tile that opened the popup (only on first open, not on prev/next)
  useEffect(() => {
    if (!opener) opener = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      html.style.overflow = prevOverflow;
      window.__lenis?.start();
    };
  }, []);

  useEffect(() => {
    track("case_study_open", { slug: cs.slug });
    closeRef.current?.focus({ preventScroll: true });
  }, [cs.slug]);

  useEffect(() => {
    return () => {
      // Runs when the modal unmounts for good (Back / close)
      setTimeout(() => {
        if (!document.querySelector("[data-case-modal]") && opener) {
          opener.focus?.({ preventScroll: true });
          opener = null;
        }
      }, 0);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const f = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowRight" && e.target === document.body) router.replace(`/case-studies/${next.slug}/`, { scroll: false });
      if (e.key === "ArrowLeft" && e.target === document.body) router.replace(`/case-studies/${prev.slug}/`, { scroll: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, next.slug, prev.slug, router]);

  const cta = (button) => track("case_study_cta_click", { slug: cs.slug, button });
  const results = cs.results || [];

  return (
    <div data-case-modal data-lenis-prevent className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px] motion-safe:animate-[fadeIn_200ms_ease-out]" onClick={close} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white motion-safe:animate-[sheetUp_320ms_cubic-bezier(.25,1,.5,1)] md:h-auto md:max-h-[min(860px,92vh)] md:max-w-[1180px] md:rounded-[16px] md:motion-safe:animate-[modalIn_700ms_cubic-bezier(.16,1,.3,1)]"
      >
        <div className="flex items-center justify-between border-b border-grey-200 px-4 py-2.5 md:px-5">
          <div className="flex items-center gap-1">
            <Link href={`/case-studies/${prev.slug}/`} replace scroll={false} aria-label={`Previous case study: ${prev.clientShort}`} className="grid h-11 w-11 place-items-center rounded-full hover:bg-grey-100">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </Link>
            <Link href={`/case-studies/${next.slug}/`} replace scroll={false} aria-label={`Next case study: ${next.clientShort}`} className="grid h-11 w-11 place-items-center rounded-full hover:bg-grey-100">
              <ChevronRight size={20} strokeWidth={1.5} />
            </Link>
            <span className="t-small ml-2 hidden text-grey-600 sm:inline">Case studies</span>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close case study" className="grid h-11 w-11 place-items-center rounded-full hover:bg-grey-100">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[55fr_45fr] md:overflow-hidden">
          <div className="relative h-[42vh] bg-ink-900 md:h-auto">
            <CaseGallery key={cs.slug} items={cs.gallery} label={`${cs.clientShort} photos and screenshots`} />
          </div>

          <div className="p-6 md:overflow-y-auto md:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-ink-900 px-2.5 py-1 font-display text-[13px] font-bold text-white">{cs.clientShort}</span>
              <span className="chip !min-h-[28px] !text-[13px]">{cs.sector}</span>
            </div>
            <dl className="t-small mt-3 flex flex-wrap gap-x-4 gap-y-1 text-grey-600">
              <div>
                <dt className="sr-only">Location</dt>
                <dd>{cs.location}</dd>
              </div>
              <div>
                <dt className="sr-only">Fleet or asset size</dt>
                <dd>{cs.size}</dd>
              </div>
            </dl>

            <h2 id={headingId} className="mt-5 font-display text-[24px] font-bold leading-tight md:text-[30px]">
              {cs.headline}
            </h2>

            <h3 className="eyebrow mt-7">Challenge</h3>
            <p className="mt-2 text-[16px] text-ink-900">{cs.challenge}</p>

            <h3 className="eyebrow mt-6">What we did</h3>
            <ul className="mt-2 space-y-2 text-[16px]">
              {cs.actions.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>

            {results.length > 0 ? (
              <>
                <h3 className="eyebrow mt-7">Result</h3>
                <div className="mt-3 grid grid-cols-[1.5fr_1fr_1fr] gap-4 border-y border-grey-200 py-5">
                  {results.map((r) => (
                    <div key={r.label}>
                      <p className="stat-num whitespace-nowrap text-[22px] leading-none md:text-[28px]">{r.value}</p>
                      <p className="t-small mt-1.5 text-grey-600">{r.label}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="t-small mt-6 rounded-lg bg-grey-100 p-4 text-grey-600">Results for this project are being confirmed with the client.</p>
            )}

            <h3 className="eyebrow mt-6">Services used</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/`} className="chip">
                  {s.name}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/request-a-demo/?case=${cs.slug}`} onClick={() => cta("get_results")} className="btn btn-primary" data-track="demo_cta_click" data-location="popup">
                Get results like this
              </Link>
              <a href={`/case-studies/${cs.slug}/`} onClick={() => cta("read_full")} className="btn btn-secondary">
                Read full case study <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
