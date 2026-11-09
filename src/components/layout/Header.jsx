import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, ArrowRight, Phone } from "lucide-react";
import Link from "@/components/ui/Link";
import { Logo, Img } from "@/components/ui/Bits";
import { services, lowServices } from "@/content/services";
import { industries } from "@/content/industries";
import { servicePhoto, industryPhoto } from "@/content/media";
import { site } from "@/content/site";

const MENUS = {
  solutions: {
    label: "Solutions",
    items: services.map((s) => ({ to: `/${s.slug}/`, name: s.name, text: s.short, photo: servicePhoto[s.slug]?.photo })),
    extra: lowServices.map((s) => ({ to: `/${s.slug}/`, name: s.name })),
  },
  industries: {
    label: "Industries",
    items: industries.map((i) => ({ to: `/industries/${i.slug}/`, name: i.name, text: i.intro.split(". ")[0] + ".", photo: industryPhoto[i.slug] })),
    extra: [{ to: "/industries/", name: "All industries" }],
  },
};

const LINKS = [
  { to: "/platform/", label: "Platform" },
  { to: "/case-studies/", label: "Case studies" },
  { to: "/about/", label: "About" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [tone, setTone] = useState("night");
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef(0);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const probe = 44;
      const sections = document.querySelectorAll("main [data-theme], footer[data-theme]");
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTone(s.dataset.theme);
          break;
        }
      }
      setHidden(y > last && y > 320);
      setCompact(y > 40);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", mobile);
    mobile ? window.__lenis?.stop() : window.__lenis?.start();
  }, [mobile]);

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobile]);

  const enter = (key) => {
    clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const effectiveTone = open || mobile ? "night" : tone;

  return (
    <header
      className={`nav nav--${effectiveTone} ${compact ? "is-compact" : ""} ${hidden && !open && !mobile ? "is-hidden" : ""}`}
      data-open={open || undefined}
    >
      <div className="nav__bar">
        <Link to="/" className="nav__logo" aria-label="Connexis home">
          <Logo />
        </Link>

        <nav className="nav__main" aria-label="Main">
          {Object.entries(MENUS).map(([key, m]) => (
            <div key={key} className="nav__item" onMouseEnter={() => enter(key)} onMouseLeave={leave}>
              <button type="button" className="nav__link" aria-expanded={open === key} aria-controls={`mega-${key}`} onClick={() => setOpen(open === key ? null : key)}>
                {m.label}
                <span className="nav__caret" aria-hidden="true" />
              </button>
            </div>
          ))}
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={`nav__link ${pathname.startsWith(l.to) ? "is-current" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__end">
          <a href={`tel:${site.phones[0].tel}`} className="nav__call" data-track="call_click" data-location="header">
            <span className="nav__callicon">
              <Phone size={15} />
            </span>
            <span>
              <small>Call sales</small>
              <b>{site.phones[0].label}</b>
            </span>
          </a>
          <Link to="/request-a-demo/" className="btn btn--signal btn--sm nav__cta" data-track="demo_cta_click" data-location="header">
            Book a demo
          </Link>
          <button type="button" className="nav__burger" aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile(!mobile)}>
            <span className="sr-only">{mobile ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {Object.entries(MENUS).map(([key, m]) => (
        <Mega key={key} id={`mega-${key}`} menu={m} open={open === key} onEnter={() => enter(key)} onLeave={leave} />
      ))}

      <MobileMenu open={mobile} />
    </header>
  );
}

function Mega({ id, menu, open, onEnter, onLeave }) {
  const [active, setActive] = useState(0);
  const item = menu.items[active];
  return (
    <div id={id} className={`mega ${open ? "is-open" : ""}`} onMouseEnter={onEnter} onMouseLeave={onLeave} hidden={!open}>
      <div className="mega__inner wrap">
        <ul className="mega__list">
          {menu.items.map((it, i) => (
            <li key={it.to}>
              <Link to={it.to} className={`mega__link ${i === active ? "is-active" : ""}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <span className="mono mega__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="mega__name">{it.name}</span>
                <ArrowRight size={18} className="mega__arrow" />
              </Link>
            </li>
          ))}
          <li className="mega__extra">
            {menu.extra.map((x) => (
              <Link key={x.to} to={x.to} className="mono">
                {x.name} →
              </Link>
            ))}
          </li>
        </ul>
        <div className="mega__preview" aria-hidden="true">
          {menu.items.map((it, i) => (
            <div key={it.to} className={`mega__photo ${i === active ? "is-on" : ""}`}>
              {it.photo && <Img src={it.photo.src} alt="" style={{ objectPosition: it.photo.pos }} />}
            </div>
          ))}
          <p className="mega__text">{item?.text}</p>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open }) {
  const groups = [
    { label: "Solutions", items: MENUS.solutions.items },
    { label: "Industries", items: MENUS.industries.items },
  ];
  return (
    <div id="mobile-menu" className={`mmenu ${open ? "is-open" : ""}`} hidden={!open} data-lenis-prevent>
      <div className="mmenu__inner wrap">
        <ul className="mmenu__top">
          {[{ to: "/", label: "Home" }, ...LINKS, { to: "/contact/", label: "Contact" }].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="d-m">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        {groups.map((g) => (
          <div key={g.label} className="mmenu__group">
            <p className="tag">{g.label}</p>
            <ul>
              {g.items.map((it) => (
                <li key={it.to}>
                  <Link to={it.to}>{it.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mmenu__foot">
          <Link to="/request-a-demo/" className="btn btn--signal btn--block">
            Book a demo
          </Link>
          <a href={`tel:${site.phones[0].tel}`} className="btn btn--line btn--block">
            <Phone size={16} /> Call sales {site.phones[0].label}
          </a>
          <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="btn btn--line btn--block">
            Customer login <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
