import { SITE_URL, site } from "@/content/site";
import { abs } from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#org`;

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    url: `${SITE_URL}/`,
    logo: abs("/images/brand/connexis-logo.png"),
    foundingDate: site.founded,
    parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  };
}

export function localBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#lahore`,
    name: "Connexis — Vehicle Tracking & Fleet Management",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    telephone: "+92-42-38100900",
    email: site.email,
    areaServed: { "@type": "Country", name: "Pakistan" },
    url: `${SITE_URL}/`,
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Connexis",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function faqPage(faqs) {
  const list = faqs.filter((f) => !f.pending);
  if (!list.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function service({ name, type, path, audience }) {
  return {
    "@type": "Service",
    name,
    serviceType: type,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Pakistan" },
    ...(audience ? { audience: { "@type": "BusinessAudience", audienceType: audience } } : {}),
  };
}

export function article({ headline, path, date }) {
  return {
    "@type": "Article",
    headline,
    image: abs("/opengraph-image"),
    datePublished: date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: abs(path),
  };
}

export function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
