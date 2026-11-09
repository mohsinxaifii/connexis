import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Faq from "@/components/ui/Faq";
import { homeFaqs } from "@/content/misc";

export default function HomeFaq() {
  return (
    <section aria-labelledby="faq-title" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <p className="inline-flex items-center gap-2.5 text-[14px] text-grey-600">
            <span className="h-2 w-2 rounded-full bg-red-500" /> FAQ
          </p>
          <h2 id="faq-title" data-split className="mt-4 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[60px]">
            Questions buyers ask first.
          </h2>
          <Link href="/faq/" className="link-arrow mt-6">
            All questions <ArrowRight size={18} />
          </Link>
        </div>
        <div className="reveal" style={{ "--i": 1 }}>
          <Faq items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
