import { SITE_URL } from "@/content/site";

// Builds Next metadata with a self-referencing canonical (spec §9.3).
export function pageMeta({ title, description, path = "/", noindex = false, absoluteTitle = true }) {
  const url = new URL(path, SITE_URL).toString();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Connexis", type: "website", locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export function abs(path) {
  return new URL(path, SITE_URL).toString();
}
