// GA4 events go through the GTM dataLayer. Safe to call before GTM loads.
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const GTM_ID = import.meta.env.VITE_GTM_ID;

// Consent Mode v2 defaults to denied; the consent banner upgrades it.
export function loadGtm() {
  if (!GTM_ID || typeof window === "undefined" || window.__gtm) return;
  window.__gtm = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", wait_for_update: 500 });
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.append(s);
}
