# Connexis website

Vite + React + GSAP, with a WebGL night-road hero. Every route is prerendered to static HTML at
build time, so it deploys to GitHub Pages (or any static host) with full SEO.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # vite build + SSR bundle + prerender into dist/
npm run preview   # serve dist/
```

## Where things live

- `src/content/` — all copy and data: services, industries, case studies, FAQs, the home-page
  night trip (`night.js`) and photo/logo assignments (`media.js`). Edit content here.
- `src/pages/` — one file per page type; `src/App.jsx` holds the routes.
- `src/components/home/` — home-page sections; `src/components/ui/` — shared pieces.
- `src/gl/road.js` — the WebGL night road shader.
- `src/styles/` — `base.css` (tokens, type, buttons), `layout.css`, `home.css`, `pages.css`.
- `scripts/prerender.mjs` — writes each route's HTML, `sitemap.xml`, `robots.txt`, `404.html`
  and meta-refresh pages for old WordPress URLs.

## Before launch

- Set `VITE_WEB3FORMS_KEY` (see `.env.example`). Without it the production form shows a
  "please call us" message instead of sending.
- Confirm the items marked `CONFIRM` in `src/content/` (WhatsApp number, app store links, ISO
  certificate number, the full list of technician cities, pending FAQ answers).
- Stock photos are from Pexels (free licence). Client logos, portal screenshots and the ISO badge
  are taken from the current connexistracking.com site.
