import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "@/components/ui/Link";
import { Photo } from "@/components/ui/Bits";
import { useGSAP, gsap, SplitText, reducedMotion, revealLines } from "@/lib/motion";

export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs mono">
      <ol>
        {items.map((it, i) => (
          <li key={it.href}>
            {i < items.length - 1 ? <Link to={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Inner-page hero, editorial: breadcrumb, a wide headline, then intro and actions on one ruled row,
// then a cinematic image across the full content width. Everything shares the page grid's edges.
export function PageHero({ crumbs, tag, title, intro, photo, aside, ctas = true, demoService, children, size = "d-xl" }) {
  const root = useRef(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = SplitText.create(root.current.querySelector(".phero__title"), { type: "lines", mask: "lines", linesClass: "ln" });
      gsap
        .timeline({ delay: 0.1 })
        .from(split.lines, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, onComplete: () => split.revert() })
        .from(root.current.querySelectorAll(".phero__fade"), { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.25)
        .from(root.current.querySelector(".phero__media"), { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "expo.inOut" }, 0.15);
      const img = root.current.querySelector(".phero__photo img");
      // the image is 115% tall; it starts lifted and settles as it scrolls, so its frame never shows
      if (img) gsap.fromTo(img, { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current.querySelector(".phero__media"), start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );
  const showTag = tag && tag !== crumbs?.at(-1)?.name;
  return (
    <section ref={root} className={`phero ${photo || aside ? "phero--media" : ""} ${photo ? "" : "phero--nophoto"}`} data-theme="night">
      <div className="wrap">
        {crumbs && (
          <div className="phero__crumbs phero__fade">
            <Crumbs items={crumbs} />
            {showTag && <span className="phero__tag">{tag}</span>}
          </div>
        )}
        <h1 className={`${size} phero__title`}>{title}</h1>
        {(intro || ctas) && (
          <div className="phero__row">
            {intro && <p className="lead phero__fade">{intro}</p>}
            {ctas && (
              <div className="phero__ctas phero__fade">
                <Link to="#demo" className="btn btn--signal" data-track="demo_cta_click" data-location="page-hero">
                  Book a demo <ArrowRight size={18} />
                </Link>
                {typeof ctas === "object" && ctas}
              </div>
            )}
          </div>
        )}
        {children}
        {(photo || aside) && (
          <div className="phero__media">
            {photo && <Photo photo={photo} eager className="phero__photo" />}
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

export function Head({ tag, title, intro, center = false, size = "d-l", id }) {
  const ref = useRef(null);
  useGSAP(() => revealLines(ref.current.querySelector("h2")), { scope: ref });
  return (
    <header ref={ref} className={`shead ${center ? "shead--center" : ""}`}>
      {tag && <p className="tag">{tag}</p>}
      <h2 id={id} className={size}>
        {title}
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </header>
  );
}

// Fades children in as they scroll into view.
export function useReveal(selector = ".rv") {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray(selector, ref.current).forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    },
    { scope: ref }
  );
  return ref;
}
