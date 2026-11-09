import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use | Connexis",
  description: "Terms for using the Connexis website. Tracking services are provided under each customer's signed service agreement.",
  path: "/terms/",
});

// LEGAL REVIEW: replace with counsel-approved terms before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" updated="October 2026">
      <p>These terms cover your use of this website. Connexis tracking, monitoring and camera services are provided under each customer&apos;s signed service agreement, which takes precedence.</p>
      <h2>Website content</h2>
      <p>Content on this site describes Connexis services in general terms. Features, hardware and pricing are confirmed in your written quote.</p>
      <h2>Case studies and logos</h2>
      <p>Client names, logos and results are shown with the client&apos;s permission and remain the property of their owners.</p>
      <h2>Acceptable use</h2>
      <p>Do not attempt to disrupt the website, access other users&apos; accounts or submit false information through our forms.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Pakistan.</p>
      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}. Email{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-ink-900 underline">
          {site.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
