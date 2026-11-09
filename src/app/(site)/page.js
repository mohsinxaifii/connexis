import MapStory from "@/components/map/MapStory";
import CaseRoute from "@/components/home/CaseRoute";
import ProofBar from "@/components/home/ProofBar";
import Solutions from "@/components/home/Solutions";
import PlatformFloat from "@/components/home/PlatformFloat";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import HomeFaq from "@/components/home/HomeFaq";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { graph, organization, localBusiness, website, faqPage } from "@/lib/schema";
import { homeFaqs } from "@/content/misc";
import { homeCases } from "@/content/caseStudies";

export const metadata = pageMeta({
  title: "Vehicle Tracking Company in Pakistan | Connexis",
  description:
    "GPS vehicle tracking, fleet management, fuel monitoring and AI dashcams for businesses. 150,000+ devices installed since 2015. Book a live demo.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(organization(), localBusiness(), website(), faqPage(homeFaqs))} />
      <MapStory />
      <CaseRoute cases={homeCases} />
      <ProofBar />
      <Solutions />
      <PlatformFloat />
      <IndustriesGrid />
      <HowItWorks />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
