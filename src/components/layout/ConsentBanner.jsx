"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cx-consent";

// Google Consent Mode v2 banner (spec §9.8). Defaults are "denied" in the root layout.
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved) {
      apply(saved === "granted");
      return;
    }
    // Ask once the visitor starts reading, so the banner never covers the hero CTA
    const onScroll = () => {
      if (window.scrollY > 600) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function apply(granted) {
    const v = granted ? "granted" : "denied";
    window.gtag?.("consent", "update", { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v });
  }

  function choose(granted) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    apply(granted);
    setShow(false);
  }

  if (!show) return null;
  return (
    <div role="region" aria-label="Cookie consent" className="fixed bottom-4 left-4 z-[60] max-w-[400px] rounded-xl border border-grey-200 bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] max-sm:right-4">
      <p className="t-small text-grey-600">
        We use cookies to measure how the site is used and improve it. See our{" "}
        <Link href="/privacy-policy/" className="font-medium text-ink-900 underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => choose(true)} className="btn btn-primary btn-sm flex-1">
          Accept
        </button>
        <button type="button" onClick={() => choose(false)} className="btn btn-secondary btn-sm flex-1">
          Decline
        </button>
      </div>
    </div>
  );
}
