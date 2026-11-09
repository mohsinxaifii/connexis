import { SITE_URL } from "@/content/site";
import { allServices } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/caseStudies";

// Indexable pages only (thank-you and unapproved case studies are excluded).
export default function sitemap() {
  const now = new Date();
  const u = (path, priority = 0.7) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority });
  return [
    u("/", 1),
    ...allServices.map((s) => u(`/${s.slug}/`, s.low ? 0.4 : 0.9)),
    u("/platform/", 0.8),
    u("/case-studies/", 0.8),
    ...caseStudies.filter((c) => c.approved).map((c) => u(`/case-studies/${c.slug}/`, 0.8)),
    u("/industries/", 0.7),
    ...industries.map((i) => u(`/industries/${i.slug}/`, 0.7)),
    u("/about/", 0.6),
    u("/request-a-demo/", 0.8),
    u("/contact/", 0.6),
    u("/faq/", 0.5),
    u("/privacy-policy/", 0.2),
    u("/terms/", 0.2),
  ];
}
