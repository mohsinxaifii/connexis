import { useEffect } from "react";
import { useLocation } from "react-router";
import { gsap, ScrollTrigger, reducedMotion, finePointer } from "@/lib/motion";

// Site-wide motion layer. Runs on every page after it renders, so each section gets the same
// vocabulary without every component wiring its own: rules that draw, photos that open,
// icons that draw their strokes, figures that count, cards that follow the cursor.

const PHOTOS = "main .photo";
const SKIP_PHOTOS = ".phero, .hero, .pf, .screen, .mega";
const ICONS = "main .problem svg, main .feats__icon svg, main .svc__icon svg, main .setup__icon svg, main .hero__icon svg";
const FIGURES = "main .ccard__result.num, main .kpis b, main .tline__y";
const CARDS = "main .bigpains__item, main .feats__item, main .svc, main .ind, main .ccard, main .faq__item, main .scard, main .pc, main .setup__step";

// "−16%", "150k+", "700 → 400", "29": count the last number, keep everything around it.
function countUp(el) {
  const text = el.firstChild?.nodeType === 3 ? el.firstChild : null;
  if (!text) return;
  const m = text.textContent.match(/^(.*?)(\d[\d,]*\.?\d*)([^\d]*)$/s);
  if (!m) return;
  const target = parseFloat(m[2].replace(/,/g, ""));
  if (!target || (target >= 1900 && target <= 2100)) return; // years stay as they are
  const decimals = (m[2].split(".")[1] || "").length;
  const commas = m[2].includes(",");
  const fmt = (v) => {
    const s = v.toFixed(decimals);
    return commas ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
  };
  const o = { v: 0 };
  text.textContent = m[1] + fmt(0) + m[3];
  gsap.to(o, {
    v: target,
    duration: 1.6,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
    onUpdate: () => (text.textContent = m[1] + fmt(o.v) + m[3]),
    onComplete: () => (text.textContent = m[1] + m[2] + m[3]),
  });
}

function drawStrokes(svg) {
  const parts = svg.querySelectorAll("path, line, circle, rect, polyline, polygon");
  parts.forEach((p) => {
    const len = p.getTotalLength?.() || 0;
    if (!len) return;
    gsap.fromTo(
      p,
      { strokeDasharray: len, strokeDashoffset: len },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: svg, start: "top 92%", once: true },
        onComplete: () => gsap.set(p, { clearProps: "strokeDasharray,strokeDashoffset" }),
      }
    );
  });
}

export default function Motion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (reducedMotion()) return;
    const cleanups = [];
    let ctx;
    // wait a frame pair so the route has rendered under the page wipe
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          // section rules draw across the page, the number ticks in
          gsap.utils.toArray("main .shead .tag").forEach((tag) => {
            ScrollTrigger.create({ trigger: tag, start: "top 90%", once: true, onEnter: () => tag.classList.add("is-in") });
          });

          // section intros follow their headline
          gsap.utils.toArray("main .shead .lead").forEach((el) => {
            gsap.from(el, { y: 24, opacity: 0, duration: 1, ease: "expo.out", delay: 0.2, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
          });

          // photos open with a wipe and settle out of a slight zoom
          gsap.utils.toArray(PHOTOS).forEach((ph) => {
            if (ph.closest(SKIP_PHOTOS)) return;
            const img = ph.querySelector("img");
            const tl = gsap.timeline({ scrollTrigger: { trigger: ph, start: "top 88%", once: true } });
            tl.fromTo(ph, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" });
            if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out", clearProps: "scale" }, 0.1);
          });

          gsap.utils.toArray(ICONS).forEach(drawStrokes);
          gsap.utils.toArray(FIGURES).forEach(countUp);

          // sector bars grow from zero, one after another
          gsap.utils.toArray("main .bars").forEach((bars) => {
            gsap.from(bars.querySelectorAll(".bars__track i"), {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: bars, start: "top 80%", once: true },
            });
          });

          // list rows slide in from the left
          gsap.utils.toArray("main .indlist, main .dlist").forEach((list) => {
            gsap.from(list.children, { x: -30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: list, start: "top 88%", once: true } });
          });
        });

        if (!finePointer()) return;

        // cards: a soft light follows the cursor across the surface
        document.querySelectorAll(CARDS).forEach((card) => {
          const glow = document.createElement("span");
          glow.className = "spot";
          glow.setAttribute("aria-hidden", "true");
          card.classList.add("has-spot");
          card.appendChild(glow);
          const move = (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
          };
          card.addEventListener("pointermove", move);
          cleanups.push(() => {
            card.removeEventListener("pointermove", move);
            glow.remove();
            card.classList.remove("has-spot");
          });
        });

        // red buttons lean toward the pointer
        document.querySelectorAll("main .btn--signal, .nav__cta").forEach((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
          const y = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - r.left - r.width / 2) * 0.18);
            y((e.clientY - r.top - r.height / 2) * 0.28);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          btn.addEventListener("pointermove", move);
          btn.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("pointermove", move);
            btn.removeEventListener("pointerleave", leave);
            gsap.set(btn, { clearProps: "x,y" });
          });
        });
      })
    );
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
