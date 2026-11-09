import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { gsap, reducedMotion } from "@/lib/motion";
import { Reticle } from "@/components/ui/Bits";
import Link, { scrollToHash } from "@/components/ui/Link";
import { loadGtm } from "@/lib/analytics";

// Page transition: a night panel sweeps up, the route changes underneath, then it sweeps away.
export function Wipe() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const ref = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);
  const pending = useRef(false);

  useEffect(() => {
    const go = (e) => {
      const to = e.detail.to;
      if (busy.current) return;
      if (reducedMotion()) {
        navigate(to);
        return;
      }
      busy.current = true;
      pending.current = true;
      if (label.current) label.current.textContent = to.replace(/\/$/, "").split("/").pop()?.replace(/-/g, " ") || "home";
      gsap
        .timeline()
        .set(ref.current, { display: "flex", clipPath: "inset(100% 0 0 0)" })
        .to(ref.current, { clipPath: "inset(0% 0 0 0)", duration: 0.55, ease: "expo.inOut" })
        .call(() => navigate(to));
    };
    window.addEventListener("cx:navigate", go);
    return () => window.removeEventListener("cx:navigate", go);
  }, [navigate]);

  useEffect(() => {
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0);
    const reveal = () => {
      if (hash) setTimeout(() => scrollToHash(hash), 60);
      if (!pending.current) return;
      pending.current = false;
      gsap.to(ref.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.inOut",
        delay: 0.08,
        onComplete: () => {
          gsap.set(ref.current, { display: "none" });
          busy.current = false;
        },
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(reveal));
  }, [pathname, hash]);

  return (
    <div ref={ref} className="wipe" aria-hidden="true">
      <Reticle size={56} className="amber" spin />
      <span ref={label} className="mono wipe__label" />
    </div>
  );
}

const KEY = "cx-consent";

export function Consent() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    loadGtm();
    if (saved) {
      apply(saved === "granted");
      return;
    }
    const onScroll = () => {
      // On the home page wait until the reader has finished the night ride.
      const drive = document.querySelector(".drive");
      const passed = drive ? drive.getBoundingClientRect().bottom < window.innerHeight * 0.5 : window.scrollY > 700;
      if (passed) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.dataLayer?.push({ event: "page_view", page_path: pathname });
  }, [pathname]);

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
    <div role="region" aria-label="Cookie consent" className="consent" data-theme="night">
      <p>
        We use cookies to measure how the site is used. See our{" "}
        <Link to="/privacy-policy/" className="ulink">
          privacy policy
        </Link>
        .
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--sm btn--solid" onClick={() => choose(true)}>
          Accept
        </button>
        <button type="button" className="btn btn--sm btn--line" onClick={() => choose(false)}>
          Decline
        </button>
      </div>
    </div>
  );
}
