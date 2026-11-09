import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

export const ease = { out: "expo.out", inOut: "power3.inOut", soft: "power2.out" };

// Headline reveal: lines rise out of a mask. Returns nothing when motion is reduced.
export function revealLines(el, opts = {}) {
  if (!el || reducedMotion()) return;
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "ln" });
  gsap.from(split.lines, {
    yPercent: 110,
    duration: 1.1,
    ease: ease.out,
    stagger: 0.08,
    // the masks clip glyph overhang (y, g, full stops), so they are removed once the lines are in
    onComplete: () => split.revert(),
    ...opts,
    scrollTrigger: opts.scrollTrigger === false ? undefined : { trigger: el, start: "top 85%", once: true, ...(opts.scrollTrigger || {}) },
  });
}
