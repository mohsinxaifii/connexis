// GA4 events go through the GTM dataLayer (spec §9.8). Safe to call before GTM loads.
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
