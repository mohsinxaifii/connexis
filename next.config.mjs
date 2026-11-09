/** @type {import('next').NextConfig} */

// 301s from the old site (spec §9.6). One hop each, no chains. Crawl the live site with
// Screaming Frog before launch and add every old URL that has traffic or backlinks.
const redirects = [
  ["/fleet-management/", "/fleet-management-system/"],
  ["/fleet-safety-and-maintenance/", "/ai-dashcam-mdvr/"],
  ["/integration-partners/", "/platform/"],
  ["/elementor-8883/", "/"],
  ["/elementor-8892/", "/"],
  ["/elementor-8897/", "/"],
  ["/shop/:path*", "/vehicle-tracking-system/"],
  ["/product/:path*", "/vehicle-tracking-system/"],
  ["/cart/", "/request-a-demo/"],
];

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://www.clarity.ms" +
        (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms",
      "frame-src https://www.google.com https://challenges.cloudflare.com https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75] },
  async redirects() {
    return redirects.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
  async headers() {
    const h = [{ source: "/:path*", headers: securityHeaders }];
    // Staging: keep it out of Google (spec §9.5). Set NEXT_PUBLIC_NOINDEX=1 on staging only.
    if (process.env.NEXT_PUBLIC_NOINDEX === "1") h.push({ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] });
    return h;
  },
};

export default nextConfig;
