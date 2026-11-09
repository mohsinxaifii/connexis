import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import CaseTile from "@/components/case/CaseTile";
import LeadEvent from "@/components/forms/LeadEvent";
import { caseStudies } from "@/content/caseStudies";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Thank you | Connexis",
  description: "Your demo request has been received.",
  path: "/thank-you/",
  noindex: true,
});

export default async function ThankYouPage({ searchParams }) {
  const sp = await searchParams;
  const shown = caseStudies.filter((c) => c.approved).slice(0, 2);
  return (
    <>
      <LeadEvent formLocation={sp?.loc || ""} service={sp?.service || ""} fleetSize={sp?.fleet || ""} />
      <section className="section">
        <div className="container-x max-w-[760px] text-center">
          <CheckCircle2 size={56} strokeWidth={1.25} className="mx-auto text-red-500" aria-hidden="true" />
          <h1 data-split="hero" className="t-h1 mt-6">Thanks. Your demo request is in.</h1>
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] text-grey-600 md:text-[19px]">
            {site.callbackPromise} If it&apos;s urgent, call{" "}
            <a href={`tel:${site.phones[0].tel}`} className="font-semibold text-ink-900 underline">
              {site.phones[0].label}
            </a>
            .
          </p>
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-x">
          <h2 className="t-h3 text-center">While you wait, see what changed for these clients.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 md:auto-rows-[320px]">
            {shown.map((c, i) => (
              <CaseTile key={c.slug} cs={c} index={i} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/" className="link-arrow">
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
