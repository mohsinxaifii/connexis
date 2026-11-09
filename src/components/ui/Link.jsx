import { useLocation } from "react-router";
import { asset } from "@/lib/asset";
import { reducedMotion } from "@/lib/motion";

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export function scrollToHash(hash) {
  const el = hash && document.getElementById(hash.replace(/^#/, ""));
  if (!el) return false;
  const lenis = window.__lenis;
  if (lenis && !reducedMotion()) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  return true;
}

// Internal links go through the page-transition wipe (components/layout/Wipe.jsx).
export default function Link({ to, children, onClick, external, ...rest }) {
  const location = useLocation();

  if (external || EXTERNAL.test(to)) {
    const newTab = /^https?:/.test(to);
    return (
      <a href={to} {...(newTab ? { target: "_blank", rel: "noopener" } : {})} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const [path, hash] = to.split("#");
  const href = asset(path || location.pathname) + (hash ? `#${hash}` : "");

  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const samePage = !path || path === location.pathname;
    if (samePage && hash) {
      if (scrollToHash(hash)) return;
    }
    if (samePage && !hash) {
      window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.dispatchEvent(new CustomEvent("cx:navigate", { detail: { to: (path || location.pathname) + (hash ? `#${hash}` : "") } }));
  };

  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
