// Site-wide settings (spec §9.2 "Settings"). Facts come only from the Connexis Company Profile 2026.
// Anything marked CONFIRM must be checked with Connexis before launch (spec §10.1).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.connexistracking.com";

export const site = {
  name: "Connexis",
  legalName: "Connexis (Pvt) Ltd",
  tagline: "Vehicle tracking and fleet management in Pakistan",
  founded: "2015",
  parent: { name: "Niche Marketing Management", city: "Dubai", url: "https://www.nicheme.com/" },
  address: {
    street: "1201-C, LDA Avenue-1",
    city: "Lahore",
    region: "Punjab",
    country: "PK",
    countryName: "Pakistan",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1201-C+LDA+Avenue-1+Lahore",
  },
  phones: [
    { label: "+92 42 381 00 900", tel: "+924238100900" },
    { label: "+92 42 345 00 786", tel: "+924234500786" },
  ],
  email: "info@connexistracking.com",
  // CONFIRM: the WhatsApp Business number. Falls back to the second landline until confirmed.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "924234500786",
  customerLogin: "https://webtrack.connexistracking.com",
  // CONFIRM: real app store links (the current site's Android link points to the Apple store).
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  // CONFIRM: real social profile URLs. Empty entries never render (no facebook.com dummies).
  social: [],
  ptaLicence: "Nationwide PTA licence for Data Class Value Added Services",
  // CONFIRM: ISO standard + certificate number before showing the badge.
  iso: null,
  // CONFIRM: call-back time for new leads.
  callbackPromise: "A Connexis consultant will call you within one working day.",
};

// Proof stats, server-rendered so crawlers always read the real number (spec §5.3).
export const stats = [
  { value: 150000, suffix: "+", label: "devices installed", source: "Company Profile 2026" },
  { value: 2015, suffix: "", label: "operating since", source: "Company Profile 2026", plain: true },
  { value: 29, suffix: "", label: "cities with field technicians", source: "Karachi to Gilgit" },
  { value: 26, suffix: "", label: "ready-made reports", source: "Web portal + mobile app" },
];

export const group = {
  offices: "24 offices in 14+ countries",
  staff: "1,000+ office and field staff",
};

export const cities = [
  // 29 technician cities. CONFIRM the full list; these are the ones named in the profile copy.
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Gilgit",
];

export function waLink(text) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
