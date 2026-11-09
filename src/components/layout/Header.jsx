"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { services, lowServices } from "@/content/services";
import { industries } from "@/content/industries";
import { site } from "@/content/site";

// Mega menu columns (spec §5.1): "Fleet & vehicles" = priority 1–3 and 5; "Fuel, cold chain & assets" = 4, 6, 7.
const byOrder = (o) => services.find((s) => s.order === o);
const columns = [
  { title: "Fleet & vehicles", items: [1, 2, 3, 5].map(byOrder) },
  { title: "Fuel, cold chain & assets", items: [4, 6, 7].map(byOrder) },
];

const links = [
  { href: "/platform/", label: "Platform" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Header({ minimal = false }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null); // "solutions" | "industries" | null
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef();
  const navRef = useRef();

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Switch to the light-on-dark header while it sits over a [data-header-dark] section
      let d = false;
      document.querySelectorAll("[data-header-dark]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 40 && r.bottom > 40) d = true;
      });
      setDark(d);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    if (drawer) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [drawer]);

  const hoverOpen = (k) => {
    clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const hoverClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const solid = (scrolled || open || drawer) && !(dark && !open && !drawer);
  const onDark = dark && !open && !drawer;

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-[background-color,border-color,color] duration-300 ${
        onDark ? `border-b text-white ${scrolled ? "border-white/10 bg-[#0d0d0f]/70 backdrop-blur-md" : "border-transparent"}` : solid ? "border-b border-grey-200 bg-white/90 text-ink-900 backdrop-blur-md" : "border-b border-transparent text-ink-900"
      }`}
    >
      <div className={`container-x flex items-center gap-6 transition-[height] duration-200 ${scrolled ? "h-16" : "h-16 lg:h-[88px]"}`}>
        <Logo height={30} scale={scrolled ? 0.87 : 1} light={onDark} />

        {!minimal && (
          <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            <MenuButton id="solutions" label="Solutions" open={open} setOpen={setOpen} onEnter={hoverOpen} onLeave={hoverClose} />
            <MenuButton id="industries" label="Industries" open={open} setOpen={setOpen} onEnter={hoverOpen} onLeave={hoverClose} />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-red-500 ${
                  pathname.startsWith(l.href) ? "text-red-500" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div className={`ml-auto flex items-center gap-4 ${minimal ? "" : "xl:ml-0"}`}>
          <a href={`tel:${site.phones[0].tel}`} className="hidden items-center gap-2 whitespace-nowrap text-[15px] font-medium hover:text-red-500 lg:inline-flex">
            <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className={minimal ? "" : "hidden min-[1800px]:inline"}>{site.phones[0].label}</span>
            {!minimal && <span className="min-[1800px]:hidden">Call</span>}
          </a>
          {!minimal && (
            <a
              href={site.customerLogin}
              target="_blank"
              rel="nofollow noopener"
              className={`hidden whitespace-nowrap text-[15px] font-medium lg:inline ${onDark ? "text-white/70 hover:text-white" : "text-grey-600 hover:text-ink-900"}`}
            >
              Customer Login
            </a>
          )}
          {!minimal && (
            <Link href="/request-a-demo/" className="pill pill-red hidden !min-h-[46px] !pl-5 !pr-1.5 text-[15px] sm:inline-flex" data-track="demo_cta_click" data-location="header">
              Book a live demo
              <span className="pill-icon !h-[34px] !w-[34px]">
                <ArrowUpRight size={15} strokeWidth={2} />
              </span>
            </Link>
          )}
          {!minimal && (
            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full border xl:hidden ${onDark ? "border-white/25" : "border-grey-200"}`}
              aria-label={drawer ? "Close menu" : "Open menu"}
              aria-expanded={drawer}
              aria-controls="mobile-menu"
              onClick={() => setDrawer((d) => !d)}
            >
              {drawer ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          )}
        </div>
      </div>

      {!minimal && (
        <>
          <MegaPanel id="solutions" open={open} onEnter={hoverOpen} onLeave={hoverClose}>
            <div className="grid gap-10 py-8 lg:grid-cols-[1fr_1fr_320px]">
              {columns.map((col) => (
                <div key={col.title}>
                  <p className="eyebrow mb-3">{col.title}</p>
                  <ul className="space-y-1">
                    {col.items.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}/`} className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-grey-100">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-grey-200 bg-white transition-colors group-hover:border-red-500 group-hover:text-red-500">
                            <Icon name={s.icon} size={20} />
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold text-ink-900">{s.menuName}</span>
                            <span className="block text-[13px] leading-snug text-grey-600">{s.short}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/case-studies/pepsi-distributor-fleet-management/"
                className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-ink-900 p-6 text-white"
              >
                <span className="absolute inset-0 bg-network opacity-60 invert" aria-hidden="true" />
                <span className="eyebrow relative !text-white/60">Case study</span>
                <span className="stat-num relative mt-2 text-[40px] !text-white">700 → 400</span>
                <span className="relative mt-1 text-[15px] text-white/80">A PepsiCo distributor cut its fleet by 300 vehicles.</span>
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                  Read the story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-grey-200 py-4 text-[14px] text-grey-600">
              <span>Also from Connexis:</span>
              {lowServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/`} className="hover:text-ink-900">
                  {s.name}
                </Link>
              ))}
            </div>
          </MegaPanel>

          <MegaPanel id="industries" open={open} onEnter={hoverOpen} onLeave={hoverClose}>
            <div className="grid gap-2 py-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind) => (
                <Link key={ind.slug} href={`/industries/${ind.slug}/`} className="group flex items-center gap-3 rounded-lg p-3 hover:bg-grey-100">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-grey-200 bg-white group-hover:border-red-500 group-hover:text-red-500">
                    <Icon name={ind.icon} size={20} />
                  </span>
                  <span className="text-[15px] font-semibold">{ind.name}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-grey-200 py-4">
              <Link href="/industries/" className="link-arrow text-[14px]">
                All industries <ArrowRight size={16} />
              </Link>
            </div>
          </MegaPanel>

          <MobileDrawer open={drawer} />
        </>
      )}
    </header>
  );
}

function MenuButton({ id, label, open, setOpen, onEnter, onLeave }) {
  const isOpen = open === id;
  return (
    <div onMouseEnter={() => onEnter(id)} onMouseLeave={onLeave}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        onClick={() => setOpen(isOpen ? null : id)}
        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-red-500 ${
          isOpen ? "text-red-500" : ""
        }`}
      >
        {label}
        <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}

function MegaPanel({ id, open, onEnter, onLeave, children }) {
  const isOpen = open === id;
  return (
    <div
      id={`panel-${id}`}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
      hidden={!isOpen}
      className="absolute inset-x-0 top-full hidden border-b border-grey-200 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.06)] xl:block"
    >
      <div className="container-x">{children}</div>
    </div>
  );
}

function MobileDrawer({ open }) {
  const [section, setSection] = useState("solutions");
  return (
    <div
      id="mobile-menu"
      data-lenis-prevent
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white xl:hidden"
    >
      <div className="container-x pb-32 pt-4">
        <Accordion title="Solutions" id="solutions" section={section} setSection={setSection}>
          {services.map((s) => (
            <DrawerLink key={s.slug} href={`/${s.slug}/`} icon={s.icon} label={s.menuName} />
          ))}
          <p className="px-3 pt-3 text-[13px] text-grey-600">
            Also: {lowServices.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && " · "}
                <Link href={`/${s.slug}/`} className="underline">
                  {s.name}
                </Link>
              </span>
            ))}
          </p>
        </Accordion>
        <Accordion title="Industries" id="industries" section={section} setSection={setSection}>
          {industries.map((i) => (
            <DrawerLink key={i.slug} href={`/industries/${i.slug}/`} icon={i.icon} label={i.name} />
          ))}
        </Accordion>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex min-h-[56px] items-center border-b border-grey-200 font-display text-[18px] font-semibold">
            {l.label}
          </Link>
        ))}
        <a href={site.customerLogin} target="_blank" rel="nofollow noopener" className="flex min-h-[56px] items-center border-b border-grey-200 text-grey-600">
          Customer Login
        </a>
        <div className="mt-6 grid gap-3">
          <Link href="/request-a-demo/" className="btn btn-primary" data-track="demo_cta_click" data-location="header">
            Book a live demo
          </Link>
          <a href={`tel:${site.phones[0].tel}`} className="btn btn-secondary">
            <Phone size={18} strokeWidth={1.5} /> {site.phones[0].label}
          </a>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, id, section, setSection, children }) {
  const isOpen = section === id;
  return (
    <div className="border-b border-grey-200">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setSection(isOpen ? null : id)}
        className="flex min-h-[56px] w-full items-center justify-between font-display text-[18px] font-semibold"
      >
        {title}
        <ChevronDown size={20} strokeWidth={1.5} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

function DrawerLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex min-h-[48px] items-center gap-3 rounded-lg px-3 hover:bg-grey-100">
      <Icon name={icon} size={20} />
      <span className="text-[16px] font-medium">{label}</span>
    </Link>
  );
}
