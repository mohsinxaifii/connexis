"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

// One delegated listener for the GA4 events in spec §9.8. Elements opt in with
// data-track="demo_cta_click" data-location="hero"; tel:, wa.me and login links are detected.
export default function ClickTracker() {
  const pathname = usePathname();
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest("a, button");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const ev = a.dataset.track;
      if (ev) track(ev, { location: a.dataset.location, page: pathname });
      if (href.startsWith("tel:")) track("phone_click", { page: pathname });
      if (href.includes("wa.me/")) track("whatsapp_click", { page: pathname });
      if (href.includes("webtrack.connexistracking.com")) track("login_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
  return null;
}
