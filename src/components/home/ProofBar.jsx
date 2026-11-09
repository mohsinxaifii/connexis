import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { clients } from "@/content/misc";

// Client names marquee (spec §5.3). Official logos replace the names once permission is in.
export default function ProofBar() {
  return (
    <section aria-label="Clients" className="border-b border-grey-200 bg-white py-10 md:py-14">
      <p className="container-x mb-8 text-[14px] text-grey-600">Trusted by banks, insurers, distributors and public bodies across Pakistan</p>
      <VelocityMarquee speed={50}>
        {clients.map((c) => (
          <span key={c.name} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-8 font-display text-[30px] font-bold tracking-[-0.04em] text-ink-900/45 transition-colors hover:text-ink-900 md:px-12 md:text-[44px]">
              {c.approved && c.logo ? <img src={c.logo} alt={c.name} className="h-10 w-auto grayscale" /> : c.name}
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
