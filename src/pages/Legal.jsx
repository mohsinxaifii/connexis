import { Seo } from "@/lib/head";
import { PageHero } from "@/components/ui/Page";
import { site } from "@/content/site";

function LegalPage({ title, path, description, updated, children }) {
  return (
    <>
      <Seo title={`${title} | Connexis`} description={description} path={path} />
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
        tag={`Last updated ${updated}`}
        title={title}
        ctas={false}
        size="d-l"
      />
      <section className="section" data-theme="paper">
        <div className="wrap">
          <div className="legal">{children}</div>
        </div>
      </section>
    </>
  );
}

const Mail = () => (
  <a href={`mailto:${site.email}`} className="ulink">
    {site.email}
  </a>
);

// LEGAL REVIEW: confirm retention periods, hosting location and processors with Connexis before launch.
export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="November 2026" description="How Connexis collects, stores and protects website, lead and vehicle tracking data, and who can access it.">
      <p>This policy explains how {site.legalName} (“Connexis”) handles personal data on this website and on the Connexis tracking platform.</p>
      <h2>Information you give us</h2>
      <p>
        When you request a demo or contact us we collect your name, company, phone number, email, city, fleet size and the services you are interested in. We use it only to respond to
        you and arrange the demo. Form submissions are relayed to our sales inbox by Web3Forms.
      </p>
      <h2>Website analytics</h2>
      <p>
        With your consent we use Google Analytics and Microsoft Clarity to understand how visitors use the site. You can accept or decline these cookies in the banner, and change your
        choice by clearing this site's cookies.
      </p>
      <h2>Tracking data on the platform</h2>
      <p>For customers, Connexis devices record vehicle, asset and sensor data such as location, speed, ignition, fuel level, temperature and camera events. This data:</p>
      <ul>
        <li>belongs to the customer that owns or operates the vehicle or asset;</li>
        <li>is visible only to the user accounts the customer authorises, such as head office, managers or distributors;</li>
        <li>is accessed by Connexis staff only to install, support and maintain the service;</li>
        <li>is kept for the retention period set out in the customer's agreement.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell personal data. We share it only with service providers that help us run the website and platform, or where the law requires it.</p>
      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the personal data we hold about you by emailing <Mail />.
      </p>
      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}, {site.address.countryName}. Phone {site.phones[0].label}.
      </p>
    </LegalPage>
  );
}

// LEGAL REVIEW: replace with counsel-approved terms before launch.
export function Terms() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" updated="November 2026" description="Terms for using the Connexis website. Tracking services are provided under each customer's signed service agreement.">
      <p>These terms cover your use of this website. Connexis tracking, monitoring and camera services are provided under each customer's signed service agreement, which takes precedence.</p>
      <h2>Website content</h2>
      <p>
        Content on this site describes Connexis services in general terms. Features, hardware and pricing are confirmed in your written quote. The overnight trip on the home page is an
        illustration built from event types the platform records; it is not a specific client's data.
      </p>
      <h2>Case studies, logos and photography</h2>
      <p>Client names, logos and results are shown with the client's permission and remain the property of their owners. Some photographs are licensed stock imagery.</p>
      <h2>Acceptable use</h2>
      <p>Do not attempt to disrupt the website, access other users' accounts or submit false information through our forms.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Pakistan.</p>
      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}. Email <Mail />.
      </p>
    </LegalPage>
  );
}
