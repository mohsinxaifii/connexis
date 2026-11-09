// Lazy GSAP loader. Everything motion-related is imported after first paint, so it never counts
// toward first-load JS (spec §9.7) and the page is fully usable before it arrives.
let promise = null;

export function loadGsap() {
  if (!promise) {
    promise = Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
      ([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        gsap.defaults({ ease: "power3.out", duration: 0.9 });
        return { gsap, ScrollTrigger, SplitText };
      }
    );
  }
  return promise;
}

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
