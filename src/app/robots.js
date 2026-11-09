import { SITE_URL } from "@/content/site";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
