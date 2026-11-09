import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Connexis",
  description: "How Connexis collects, stores and protects website, lead and vehicle tracking data, and who can access it.",
  path: "/privacy-policy/",
});

// LEGAL REVIEW: confirm retention periods, hosting location and processors with Connexis before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="October 2026">
      <p>
        This policy explains how {site.legalName} (&ldquo;Connexis&rdquo;) handles personal data on this website and on the Connexis tracking platform.
      </p>
      <h2>Information you give us</h2>
      <p>When you request a demo or contact us we collect your name, company, phone number, email, city, fleet size and the services you are interested in. We use it only to respond to you and arrange the demo.</p>
      <h2>Website analytics</h2>
      <p>With your consent we use Google Analytics and Microsoft Clarity to understand how visitors use the site. You can accept or decline these cookies in the banner, and change your choice by clearing this site&apos;s cookies.</p>
      <h2>Tracking data on the platform</h2>
      <p>For customers, Connexis devices record vehicle, asset and sensor data such as location, speed, ignition, fuel level, temperature and camera events. This data:</p>
      <ul>
        <li>belongs to the customer that owns or operates the vehicle or asset;</li>
        <li>is visible only to the user accounts the customer authorises, such as head office, managers or distributors;</li>
        <li>is accessed by Connexis staff only to install, support and maintain the service;</li>
        <li>is kept for the retention period set out in the customer&apos;s agreement.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell personal data. We share it only with service providers that help us run the website and platform, or where the law requires it.</p>
      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the personal data we hold about you by emailing <a href={`mailto:${site.email}`} className="font-medium text-ink-900 underline">{site.email}</a>.
      </p>
      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}, {site.address.countryName}. Phone {site.phones[0].label}.
      </p>
    </LegalPage>
  );
}
