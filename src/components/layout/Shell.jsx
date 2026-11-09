import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/motion";
import Header from "./Header";
import Footer from "./Footer";
import { Wipe, Consent } from "./Overlay";
import { track } from "@/lib/analytics";

export default function Shell() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      clearTimeout(id);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest?.("[data-track]");
      if (t) track(t.dataset.track, { cta_location: t.dataset.location || "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Wipe />
      <Consent />
    </>
  );
}
