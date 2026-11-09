import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function LegalPage({ title, path, updated, children }) {
  return (
    <section className="section !pt-6">
      <div className="container-x">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title, href: path }]} />
        <div className="mx-auto mt-10 max-w-[760px]">
          <h1 data-split="hero" className="t-h1">{title}</h1>
          <p className="t-small mt-3 text-grey-600">Last updated {updated}</p>
          <div className="mt-10 space-y-5 text-[17px] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-grey-600 [&_ul]:space-y-2 [&_ul]:text-grey-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
