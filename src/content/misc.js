// Shared lists: client names, platform reports, FAQs, portfolio mix.

// ClientLogo model . Official SVG logos render only once `approved` is true and
// `logo` is set; until then the marquee shows the name as a neutral wordmark.
export const clients = [
  { name: "PepsiCo distributor", industry: "fmcg-distribution", approved: false, logo: null },
  { name: "Meezan Bank", industry: "banks-telecom", approved: false, logo: null },
  { name: "Bank Alfalah", industry: "banks-telecom", approved: false, logo: null },
  { name: "Zong", industry: "banks-telecom", approved: false, logo: null },
  { name: "Jazz", industry: "banks-telecom", approved: false, logo: null },
  { name: "IGI", industry: "insurance-leasing", approved: false, logo: null },
  { name: "EFU General", industry: "insurance-leasing", approved: false, logo: null },
  { name: "Faisal Movers", industry: "logistics-transport", approved: false, logo: null },
  { name: "WASA Lahore", industry: "waste-municipal", approved: false, logo: null },
  { name: "Sindh Bank", industry: "banks-telecom", approved: false, logo: null },
  { name: "Alfalah Insurance", industry: "insurance-leasing", approved: false, logo: null },
  { name: "MWMC Multan", industry: "waste-municipal", approved: false, logo: null },
];

export const reports = [
  "Events & Alerts", "History", "Movement", "Trip", "Journey", "Stop Over", "Over Speed", "Idle",
  "Excess Idling", "Geofence", "Geofence Detail", "POI Visit", "Working Hours", "Fleet Summary",
  "Driving Quality", "Distance", "Distance with Fuel", "Trip with Fuel", "Vehicle Fuel", "Gen-set Fuel",
  "Temperature Sensor", "IO Status", "NR", "Consolidated", "Consolidated Corporate",
  "Distance with Fuel Consolidated",
];

export const reportGroups = {
  "Events & Alerts": "Alerts", History: "Movement", Movement: "Movement", Trip: "Trips", Journey: "Trips",
  "Stop Over": "Movement", "Over Speed": "Driving", Idle: "Driving", "Excess Idling": "Driving",
  Geofence: "Geofence", "Geofence Detail": "Geofence", "POI Visit": "Geofence", "Working Hours": "Fleet",
  "Fleet Summary": "Fleet", "Driving Quality": "Driving", Distance: "Trips", "Distance with Fuel": "Fuel",
  "Trip with Fuel": "Fuel", "Vehicle Fuel": "Fuel", "Gen-set Fuel": "Fuel", "Temperature Sensor": "Sensors",
  "IO Status": "Sensors", NR: "Fleet", Consolidated: "Fleet", "Consolidated Corporate": "Fleet",
  "Distance with Fuel Consolidated": "Fuel",
};

export const homeFaqs = [
  {
    q: "How much does vehicle tracking cost in Pakistan?",
    a: "Price depends on fleet size, sensors and reports. Connexis quotes after a short fleet review, and the device, installation and monthly platform fee are shown separately.",
  },
  {
    q: "Can you track generators and containers, not just vehicles?",
    a: "Yes. Fuel sensors cover generators and storage tanks, and solar trackers cover containers, trailers and vessels with no power supply.",
  },
  {
    q: "Which cities do you install in?",
    a: "Technicians cover 29 cities, from Karachi and Lahore to Peshawar, Quetta and Gilgit.",
  },
  {
    q: "Can managers see everything on their phone?",
    a: "Yes. The Connexis app for Android and iOS shows live status, alerts and reports.",
  },
  // Spec §5.9 Q5 (ERP / dispatch integration) waits for the tech team's answer.
  { q: "Can Connexis connect to our ERP or dispatch system?", a: "", pending: true },
];

export const faqGroups = [
  {
    group: "Pricing",
    items: [
      homeFaqs[0],
      {
        q: "What happens in the fleet review?",
        a: "A 20-minute call to map your vehicles, the sensors you need and the reports you want. The quote follows from that.",
      },
      {
        q: "Can we start with part of our fleet?",
        a: "Yes. Many clients start with one depot or region, review the reports, then extend to the full fleet.",
      },
    ],
  },
  {
    group: "Installation",
    items: [
      homeFaqs[2],
      {
        q: "Who installs the devices?",
        a: "Connexis technicians fit every device at your depot or site, so your vehicles stay close to where they work.",
      },
      {
        q: "Can you fit sensors on generators and storage tanks?",
        a: "Yes. Fuel level sensors work on vehicle tanks, generator tanks, storage tanks and tankers.",
      },
    ],
  },
  {
    group: "Platform",
    items: [
      homeFaqs[3],
      {
        q: "How many reports are included?",
        a: "26 ready-made reports, including trip, idle, over-speed, geofence, fuel, working hours and driving quality, all exportable to Excel or PDF.",
      },
      {
        q: "Can distributors or branches have their own logins?",
        a: "Yes. Separate portal logins show each distributor, franchise or branch only its own vehicles or sites.",
      },
      {
        q: "Can you build a dashboard for our industry?",
        a: "Yes. Connexis has built custom portals for FMCG distribution and waste management, filtered the way those businesses run.",
      },
    ],
  },
  {
    group: "Hardware",
    items: [
      homeFaqs[1],
      {
        q: "What do the AI dashcams detect?",
        a: "The driver camera flags smoking, phone use, yawning and distraction. The road camera warns of lane deviation and short following distance.",
      },
      {
        q: "How many temperature sensors can one unit take?",
        a: "Up to four, for multi-zone monitoring in reefer trucks, chillers and stores.",
      },
      {
        q: "Are the container trackers waterproof?",
        a: "Yes. They are IP67 waterproof and ATEX explosion-proof rated, with solar charging and a 12,000mAh battery.",
      },
    ],
  },
  {
    group: "Support",
    items: [
      {
        q: "Is Connexis licensed?",
        a: "Yes. Connexis holds a nationwide PTA licence for Data Class Value Added Services.",
      },
      {
        q: "Who is behind Connexis?",
        a: "Connexis was established in 2015 as a project of Niche Marketing Management, Dubai, a group with 24 offices in 14+ countries.",
      },
      {
        q: "How do existing customers log in?",
        a: "Use Customer Login at the top of every page, or the Connexis app for Android and iOS.",
      },
    ],
  },
];

export const portfolio = [
  ["Insurance", 18.8],
  ["Individuals", 18],
  ["Logistics", 14.7],
  ["FMCG", 12],
  ["Public sector", 11],
  ["Corporate institutions", 11],
  ["Textile & transit", 7.4],
  ["Oil & gas", 5.4],
  ["Heavy equipment", 1.7],
];
