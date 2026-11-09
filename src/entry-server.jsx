import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { HeadProvider, headTags } from "./lib/head";
import { services, lowServices } from "./content/services";
import { industries } from "./content/industries";
import { caseStudies } from "./content/caseStudies";

export function render(url) {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;
  const store = {};
  const html = renderToString(
    <StrictMode>
      <HeadProvider store={store}>
        <StaticRouter location={(basename || "") + url} basename={basename}>
          <App />
        </StaticRouter>
      </HeadProvider>
    </StrictMode>
  );
  return { html, head: store.data ? headTags(store.data) : "", data: store.data };
}

export const routes = [
  "/",
  "/platform/",
  "/industries/",
  "/case-studies/",
  "/about/",
  "/contact/",
  "/request-a-demo/",
  "/thank-you/",
  "/faq/",
  "/privacy-policy/",
  "/terms/",
  ...services.map((s) => `/${s.slug}/`),
  ...lowServices.map((s) => `/${s.slug}/`),
  ...industries.map((i) => `/industries/${i.slug}/`),
  ...caseStudies.map((c) => `/case-studies/${c.slug}/`),
];

// Old WordPress URLs and where they now live. GitHub Pages cannot send 301s, so the prerender
// writes a canonical + meta-refresh page at each old path.
export const redirects = [
  ["/fleet-management/", "/fleet-management-system/"],
  ["/fleet-safety-and-maintenance/", "/ai-dashcam-mdvr/"],
  ["/integration-partners/", "/platform/"],
  ["/cart/", "/request-a-demo/"],
  ["/shop/", "/vehicle-tracking-system/"],
];
