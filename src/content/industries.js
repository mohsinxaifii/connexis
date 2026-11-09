// Industry pages (spec §7.1; "Industry" model in §9.2).

export const industries = [
  {
    slug: "fmcg-distribution",
    name: "FMCG & Distribution",
    icon: "Store",
    cover: "pepsi",
    primaryKeyword: "fleet tracking for FMCG distribution",
    seo: {
      title: "Fleet Tracking for FMCG Distribution | Connexis",
      description:
        "Stop paying for idle vehicles and prove every outlet visit. One PepsiCo distributor cut its fleet from 700 to 400 vehicles with Connexis. Book a demo.",
    },
    h1: "Fleet Tracking for FMCG Distributors",
    intro:
      "Distribution runs on beat plans, outlet visits and distributor fleets you rarely see. Connexis puts all of it on one dashboard.",
    pains: [
      { title: "Paying for idle vehicles", text: "Vehicles sit in the yard while the lease and driver costs keep running." },
      { title: "Missed outlet visits", text: "Beat plans say an outlet was served; nothing proves it." },
      { title: "No view of distributor fleets", text: "Each distributor runs its own vehicles, out of sight of head office." },
    ],
    solutions: ["fleet-management-system", "vehicle-tracking-system", "temperature-monitoring"],
    portal: "dashboard",
    portalCaption: "A distributor dashboard filtered by franchise, DSM, ASM and vehicle.",
    caseStudy: "pepsi-distributor-fleet-management",
    clients: ["PepsiCo distributor", "Volka Food", "Rainbow Cash & Carry"],
    faqs: [
      {
        q: "Can we prove which outlets were visited?",
        a: "Yes. Outlets are geofenced, so every visit is logged automatically and POI visit reports show coverage by route.",
      },
      {
        q: "Can each distributor have its own login?",
        a: "Yes. Distributors, franchises and management each get a separate portal login showing only their vehicles.",
      },
      {
        q: "Can we monitor chilled deliveries too?",
        a: "Yes. Temperature sensors can be added to the same vehicles, with up to four zones per unit.",
      },
    ],
  },
  {
    slug: "banks-telecom",
    name: "Banks & Telecom",
    icon: "Landmark",
    cover: "meezan",
    primaryKeyword: "fuel monitoring for banks",
    seo: {
      title: "Fuel Monitoring for Banks & Telecom Sites | Connexis",
      description:
        "Genset fuel monitoring for bank branches and telecom towers: fills, burn and running hours on one screen. Meezan Bank cut fuel cost by 16%. Book a demo.",
    },
    h1: "Fuel Monitoring for Bank Branches and Telecom Sites",
    intro:
      "Hundreds of generators, hundreds of fill records written by hand. Connexis measures each tank directly and shows every site on one screen.",
    pains: [
      { title: "Genset fuel theft", text: "Fuel leaves the tank without anyone noticing until the bill arrives." },
      { title: "No filling records", text: "Fills are logged on paper, if they are logged at all." },
      { title: "Unknown running hours", text: "Maintenance and fuel budgets are based on guesses." },
    ],
    solutions: ["generator-fuel-monitoring", "fuel-monitoring-system", "cctv-surveillance"],
    portal: "genset",
    portalCaption: "Every branch generator: tank level, fills, burn and running hours.",
    caseStudy: "meezan-bank-generator-fuel-monitoring",
    clients: ["Meezan Bank", "Bank Alfalah", "Sindh Bank", "Zong", "Jazz"],
    faqs: [
      {
        q: "Can head office see every branch at once?",
        a: "Yes. Generators are grouped by branch, city or region on one dashboard.",
      },
      {
        q: "What does the pilferage report show?",
        a: "Abnormal fuel drops for each generator, with the time they happened, collected in one report.",
      },
      {
        q: "Can reports go to finance and audit?",
        a: "Yes. Every report exports to Excel or PDF.",
      },
    ],
  },
  {
    slug: "insurance-leasing",
    name: "Insurance & Leasing",
    icon: "ShieldCheck",
    cover: "insurance",
    primaryKeyword: "tracker for insurance companies",
    seo: {
      title: "Vehicle Trackers for Insurance & Leasing | Connexis",
      description:
        "Trackers for insured and leased vehicles, installed nationwide in 29 cities. Insurance is Connexis's largest segment. Talk to us about a partnership.",
    },
    h1: "Vehicle Trackers for Insurance and Leasing Companies",
    intro:
      "Insurance is Connexis's largest segment, at 18.8% of the portfolio. We fit and support trackers on insured and leased vehicles across Pakistan.",
    pains: [
      { title: "Theft risk", text: "Every insured or leased car is exposure on your book." },
      { title: "Slow recovery", text: "Without a live location, recovery depends on luck." },
      { title: "Claim disputes", text: "No independent record of where and how a vehicle was driven." },
    ],
    solutions: ["vehicle-tracking-system", "car-tracker", "ai-dashcam-mdvr"],
    portal: "map",
    portalCaption: "Live location and trip history for every insured vehicle.",
    caseStudy: "insurance-partner-vehicle-trackers",
    clients: ["IGI", "EFU General", "Alfalah Insurance", "UIC", "SPI"],
    faqs: [
      {
        q: "Can you install for our customers nationwide?",
        a: "Yes. Our technical team covers 29 cities, from Karachi to Gilgit.",
      },
      {
        q: "Is Connexis licensed?",
        a: "Yes. Connexis holds a nationwide PTA licence for Data Class Value Added Services.",
      },
      {
        q: "Can the vehicle owner use the app too?",
        a: "Yes. Owners can see live location, alerts and trip history in the Connexis app for Android and iOS.",
      },
    ],
  },
  {
    slug: "logistics-transport",
    name: "Logistics & Transport",
    icon: "Truck",
    cover: "container",
    primaryKeyword: "truck tracking for logistics",
    seo: {
      title: "Truck Tracking for Logistics & Transport | Connexis",
      description:
        "Track trucks, containers and drivers: route deviation alerts, AI dashcams and solar container trackers. Trusted by Faisal Movers. Book a demo.",
    },
    h1: "Truck Tracking for Logistics and Transport Companies",
    intro:
      "Long routes, unaccounted stops and cargo you cannot see. Connexis tracks the truck, the driver and the container.",
    pains: [
      { title: "Route deviation", text: "Trucks leave the agreed route and you find out from the customer." },
      { title: "Driver behaviour", text: "Harsh driving and fatigue put cargo and people at risk." },
      { title: "Unaccounted stops and containers", text: "Stops go unexplained and containers go dark." },
    ],
    solutions: ["vehicle-tracking-system", "ai-dashcam-mdvr", "asset-tracking"],
    portal: "map",
    portalCaption: "Routes, stops and geofence alerts for every truck.",
    caseStudy: "solar-container-tracking",
    clients: ["Faisal Movers", "Trella"],
    faqs: [
      {
        q: "Can we be alerted when a truck leaves its route?",
        a: "Yes. Route and area violation alerts fire as soon as a vehicle leaves its assigned route or geofence.",
      },
      {
        q: "Can we track containers separately from trucks?",
        a: "Yes. Solar container trackers report on their own, even with no power on board.",
      },
      {
        q: "Do you cover inter-city routes?",
        a: "Yes. Tracking works nationwide, and our technicians install in 29 cities.",
      },
    ],
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    icon: "Fuel",
    cover: "fuel",
    primaryKeyword: "oil tanker tracking",
    seo: {
      title: "Oil Tanker Tracking & Fuel Monitoring | Connexis",
      description:
        "Track oil tankers and stop product pilferage in transit, with fuel sensors, live tracking and AI dashcams for hazardous loads. Book a demo.",
    },
    h1: "Oil Tanker Tracking and Fuel Monitoring",
    intro:
      "Product goes missing in transit and hazardous loads need careful drivers. Connexis watches the tank, the route and the cab.",
    pains: [
      { title: "Product pilferage in transit", text: "Litres disappear between the depot and the station." },
      { title: "Unsafe driving with hazardous loads", text: "One harsh manoeuvre can be a disaster." },
      { title: "Unexplained stops", text: "Stops off-route are where pilferage happens." },
    ],
    solutions: ["fuel-monitoring-system", "vehicle-tracking-system", "ai-dashcam-mdvr"],
    portal: "fuel",
    portalCaption: "Tank level with every fill and drop, matched to location.",
    caseStudy: null,
    clients: [],
    faqs: [
      {
        q: "Can you monitor the tanker's cargo tank?",
        a: "Yes. Fuel level sensors work on tankers and storage tanks, logging every fill and drain with time and location.",
      },
      {
        q: "Can we watch the driver as well?",
        a: "Yes. AI dashcams flag phone use, fatigue and harsh driving, with live video and evidence clips.",
      },
      {
        q: "How fast are pilferage alerts?",
        a: "Draining alerts are sent by email and app as soon as the sensor reports the drop, with SMS as an option.",
      },
    ],
  },
  {
    slug: "waste-municipal",
    name: "Waste & Municipal",
    icon: "Recycle",
    cover: "waste",
    primaryKeyword: "waste management vehicle tracking",
    seo: {
      title: "Waste Management Vehicle Tracking | Connexis",
      description:
        "Track sweepers and dumpers against collection routes with a custom waste-segment portal. Proof of coverage for municipal fleets. Book a demo.",
    },
    h1: "Waste Management Vehicle Tracking",
    intro:
      "Municipal fleets have to prove coverage, street by street. Connexis built a waste-segment portal for exactly that.",
    pains: [
      { title: "Missed collection routes", text: "Complaints arrive before the report does." },
      { title: "Idle sweepers and dumpers", text: "Vehicles stand still during shifts." },
      { title: "No proof of coverage", text: "Councils and citizens want evidence." },
    ],
    solutions: ["fleet-management-system", "vehicle-tracking-system"],
    portal: "map",
    portalCaption: "Sweepers and dumpers tracked against their collection routes.",
    caseStudy: "municipal-waste-fleet-tracking",
    clients: ["MWMC Multan", "WASA Lahore", "WSSP Peshawar", "Punjab Police"],
    faqs: [
      {
        q: "Can supervisors see coverage by route?",
        a: "Yes. The waste-segment portal shows which routes were covered and which vehicles sat idle.",
      },
      {
        q: "Do you work with public-sector clients?",
        a: "Yes. Public sector is 11% of the Connexis portfolio.",
      },
      {
        q: "Can we start with part of the fleet?",
        a: "Yes. Many clients start with one zone, review the reports, then extend.",
      },
    ],
  },
];

export function getIndustry(slug) {
  return industries.find((i) => i.slug === slug);
}
