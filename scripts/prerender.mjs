// Renders every route to static HTML after `vite build`, so crawlers and first paint get real
// content, then writes sitemap.xml, robots.txt, 404.html and redirect pages for old URLs.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(".");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, routes, redirects } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.connexistracking.com").replace(/\/$/, "");
const BASE = (process.env.BASE_PATH || "/").replace(/\/$/, "");

const write = (file, html) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};
const page = (url) => {
  const { html, head, data } = render(url);
  return { out: template.replace("<!--app-head-->", head).replace("<!--app-html-->", html), data };
};

const indexable = [];
for (const url of routes) {
  const { out, data } = page(url);
  write(join(dist, url, "index.html"), out);
  if (data && !data.noindex) indexable.push(url);
}

write(join(dist, "404.html"), page("/404/").out);

for (const [from, to] of redirects) {
  const target = `${SITE_URL}${to}`;
  write(
    join(dist, from, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${target}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${BASE}${to}"><a href="${BASE}${to}">This page has moved.</a>`
  );
}

const today = new Date().toISOString().slice(0, 10);
write(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`
);
const noindex = process.env.VITE_NOINDEX === "1";
write(join(dist, "robots.txt"), noindex ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write(join(dist, ".nojekyll"), "");

rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes, ${indexable.length} in the sitemap, ${redirects.length} redirects`);
