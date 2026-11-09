import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlatformVisual from "@/components/visuals/PlatformVisual";
import { waLink } from "@/content/site";

export default function ServiceHero({ s, crumbs }) {
  return (
    <section data-header-dark className="relative -mt-16 overflow-hidden bg-[#0d0d0f] text-white lg:-mt-[88px]">
      <div className="pointer-events-none absolute -right-40 top-0 h-[620px] w-[620px] rounded-full bg-red-500/20 blur-[150px]" aria-hidden="true" />
      <div className="container-x relative pb-20 pt-24 md:pb-28 lg:pt-[120px]">
        <div className="[&_a]:text-white/60 [&_a:hover]:text-white [&_nav]:text-white/60 [&_span[aria-current]]:text-white">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow !text-white/60">{s.name}</p>
            <h1 data-split="hero" className="mt-6 font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] md:text-[60px] lg:text-[64px]">
              {s.h1}
            </h1>
            <p className="mt-6 max-w-[540px] text-[17px] text-white/70 md:text-[19px]">{s.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#demo" className="pill pill-red" data-track="demo_cta_click" data-location="hero">
                Book a demo <span className="pill-icon"><ArrowUpRight size={16} strokeWidth={2} /></span>
              </Link>
              <a href={waLink(`Hi Connexis, I'd like to know more about ${s.name}.`)} target="_blank" rel="noopener" className="pill pill-ghost">
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" /> WhatsApp us
              </a>
            </div>
          </div>
          <div className="relative" data-speed="0.4">
            <span className="absolute -left-3 -top-3 z-10 h-5 w-5 border-l-2 border-t-2 border-red-500" aria-hidden="true" />
            <span className="absolute -bottom-3 -right-3 z-10 h-5 w-5 border-b-2 border-r-2 border-red-500" aria-hidden="true" />
            {s.heroImage ? (
              <div className="grid grid-cols-[1fr_0.55fr] items-end gap-4">
                <PlatformVisual kind={s.heroVisual} priority />
                <div className="frame relative grid aspect-[3/4] place-items-center bg-white p-4">
                  <Image src={s.heroImage.src} alt={s.heroImage.alt} width={s.heroImage.w} height={s.heroImage.h} sizes="240px" priority className="h-full w-auto object-contain" />
                </div>
              </div>
            ) : (
              <PlatformVisual kind={s.heroVisual} priority />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
