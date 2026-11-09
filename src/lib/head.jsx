import { createContext, useContext, useEffect } from "react";
import { SITE_URL } from "@/content/site";

const HeadContext = createContext(null);

export const abs = (path = "/") => new URL(path, SITE_URL).toString();

// During prerender the provider holds a plain object that <Seo> fills in; in the browser there
// is no provider and <Seo> writes the tags into <head> itself.
export function HeadProvider({ store, children }) {
  return <HeadContext.Provider value={store}>{children}</HeadContext.Provider>;
}

export function Seo({ title, description, path = "/", noindex = false, jsonLd = null }) {
  const store = useContext(HeadContext);
  const data = { title, description, url: abs(path), noindex, jsonLd };
  if (store) store.data = data;

  const key = JSON.stringify(data);
  useEffect(() => {
    document.title = title;
    document.head.querySelectorAll("[data-head]").forEach((n) => n.remove());
    const t = document.createElement("template");
    t.innerHTML = headTags(data, { withTitle: false });
    document.head.append(t.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function headTags({ title, description, url, noindex, jsonLd }, { withTitle = true } = {}) {
  const image = abs("/og.png");
  const tags = [
    withTitle ? `<title>${esc(title)}</title>` : "",
    `<meta data-head name="description" content="${esc(description)}">`,
    `<link data-head rel="canonical" href="${esc(url)}">`,
    noindex ? `<meta data-head name="robots" content="noindex, follow">` : "",
    `<meta data-head property="og:type" content="website">`,
    `<meta data-head property="og:site_name" content="Connexis">`,
    `<meta data-head property="og:locale" content="en_PK">`,
    `<meta data-head property="og:title" content="${esc(title)}">`,
    `<meta data-head property="og:description" content="${esc(description)}">`,
    `<meta data-head property="og:url" content="${esc(url)}">`,
    `<meta data-head property="og:image" content="${esc(image)}">`,
    `<meta data-head property="og:image:width" content="1200">`,
    `<meta data-head property="og:image:height" content="630">`,
    `<meta data-head name="twitter:card" content="summary_large_image">`,
    jsonLd ? `<script data-head type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}
