import { Seo } from "@/lib/head";
import { graph, organization, localBusiness, website, faqPage } from "@/lib/schema";
import { homeFaqs } from "@/content/misc";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import PlatformFloat from "@/components/home/PlatformFloat";
import Proof from "@/components/home/Proof";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import Coverage from "@/components/home/Coverage";
import { FaqBlock, DemoCta } from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <Seo
        title="Vehicle Tracking Company in Pakistan | Connexis"
        description="GPS vehicle tracking, fleet management, fuel monitoring and AI dashcams for businesses. 150,000+ devices installed since 2015. Book a live demo."
        path="/"
        jsonLd={graph(organization(), localBusiness(), website(), faqPage(homeFaqs))}
      />
      <Hero />
      <Services />
      <PlatformFloat />
      <Proof />
      <IndustriesGrid />
      <Coverage />
      <FaqBlock items={homeFaqs} />
      <DemoCta />
    </>
  );
}
