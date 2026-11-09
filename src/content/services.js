// Service pages (spec §6). One template, filled from this data (the "Service" CMS model in §9.2).
// FAQ items with `pending: true` are waiting on a technical answer from Connexis and never render.

const howItWorks = [
  { icon: "Cpu", title: "Device or sensor", text: "Fitted by our technicians at your depot or site." },
  { icon: "RadioTower", title: "Mobile network", text: "Readings stream securely over cellular data." },
  { icon: "LayoutDashboard", title: "Connexis platform", text: "Data is processed, stored and turned into reports." },
  { icon: "Bell", title: "Alerts and reports", text: "On the web portal and the Android and iOS app." },
];

export const services = [
  {
    slug: "vehicle-tracking-system",
    order: 1,
    name: "Vehicle Tracking",
    menuName: "Vehicle Tracking System",
    short: "Live location, speed and stops for every vehicle, on web and mobile.",
    icon: "MapPin",
    interest: "Tracking",
    primaryKeyword: "vehicle tracking system in Pakistan",
    seo: {
      title: "Vehicle Tracking System in Pakistan | Connexis",
      description:
        "Track every company vehicle live on web and mobile. Alerts for speeding, idling and geofence exits. 150,000+ devices installed. Book a demo.",
    },
    h1: "Vehicle Tracking System for Businesses in Pakistan",
    intro:
      "See where every vehicle is, how fast it is moving and where it stopped, live on your dashboard and phone. Connexis has installed 150,000+ tracking devices since 2015.",
    heroVisual: "map",
    pairs: [
      ["Drivers take detours you never see", "Every route is recorded and can be played back"],
      ["Vehicles are used after hours", "Unauthorised-use alerts reach you the moment ignition turns on"],
      ["You call drivers to ask where they are", "The live map answers before you pick up the phone"],
    ],
    features: [
      { icon: "Map", title: "Live map", text: "Follow one vehicle or the whole fleet in real time." },
      { icon: "History", title: "Route playback", text: "Replay any trip with stops, speeds and times." },
      { icon: "LocateFixed", title: "Geofences", text: "Entry and exit alerts for depots, sites and zones." },
      { icon: "Gauge", title: "Driving alerts", text: "Over-speed, idle, stop-over and unauthorised use." },
      { icon: "LayoutDashboard", title: "Fleet summary", text: "Running, stopped, idle and inactive at a glance." },
      { icon: "Activity", title: "Vehicle panel", text: "Ignition, battery, power, GSM, satellites and speed." },
      { icon: "FileChartColumn", title: "26 reports", text: "Trip, idle, geofence, distance and more, ready to export." },
      { icon: "Smartphone", title: "Android & iOS app", text: "Live status and alerts wherever managers are." },
    ],
    gallery: [
      { visual: "dashboard", caption: "See running, stopped and idle vehicles in one glance." },
      { visual: "map", caption: "Open any vehicle to check ignition, speed and signal." },
      { visual: "app", caption: "Managers get the same live view on their phone." },
    ],
    caseStudy: "pepsi-distributor-fleet-management",
    industries: ["fmcg-distribution", "logistics-transport", "insurance-leasing"],
    faqs: [
      {
        q: "Is Connexis licensed to provide vehicle tracking?",
        a: "Yes. Connexis holds a nationwide PTA licence for Data Class Value Added Services and has operated in Pakistan since 2015.",
      },
      {
        q: "Can I track my vehicles from my phone?",
        a: "Yes. The Connexis app for Android and iOS shows live location, vehicle status, violations and push notifications.",
      },
      { q: "What happens when a vehicle has no signal?", a: "", pending: true },
      { q: "How long is location history kept?", a: "", pending: true },
      {
        q: "Which cities do you install in?",
        a: "Our technical team covers 29 cities across Pakistan, from Karachi and Lahore to Peshawar, Quetta and Gilgit.",
      },
    ],
    related: ["fleet-management-system", "fuel-monitoring-system", "ai-dashcam-mdvr"],
  },
  {
    slug: "fleet-management-system",
    order: 2,
    name: "Fleet Management",
    menuName: "Fleet Management System",
    short: "Trips, routes, geofences and driver scores in one dashboard.",
    icon: "Route",
    interest: "Tracking",
    primaryKeyword: "fleet management system Pakistan",
    seo: {
      title: "Fleet Management System Pakistan | Connexis",
      description:
        "Plan trips, geofence routes, score drivers and cut unused vehicles. One PepsiCo distributor went from 700 to 400 vehicles. Book a demo.",
    },
    h1: "Fleet Management System That Shows Where Money Leaks",
    intro:
      "Know which vehicles work, which sit idle and which drivers cost you money. Connexis builds dashboards around how your business runs: by franchise, area manager or distributor.",
    heroVisual: "dashboard",
    pairs: [
      ["You pay for vehicles that barely move", "Daily trip counts expose under-used vehicles"],
      ["Outlet visits are claimed, not proven", "Geofenced outlets log every visit automatically"],
      ["Distributors run fleets you cannot see", "Each distributor gets a portal; you see them all"],
    ],
    features: [
      { icon: "Filter", title: "Custom dashboards", text: "Filter by franchise, DSM, ASM, distributor and vehicle." },
      { icon: "Clock", title: "Gate-out and gate-in", text: "Exact departure and return times for every trip." },
      { icon: "ClipboardList", title: "Trip assignment", text: "Assign trips by fleet category and track completion." },
      { icon: "Warehouse", title: "Geofenced sites", text: "Factories, warehouses, distributors and retail outlets." },
      { icon: "Store", title: "Outlet coverage", text: "POI visit reports prove which outlets were served." },
      { icon: "TriangleAlert", title: "Violation alerts", text: "Route and area violations flagged as they happen." },
      { icon: "Gauge", title: "Driver quality", text: "Over-speed, harsh braking, harsh cornering, excess idling." },
      { icon: "Users", title: "Separate logins", text: "Portals for distributors, franchises and management." },
    ],
    gallery: [
      { visual: "dashboard", caption: "Spot under-used vehicles by daily trips." },
      { visual: "reports", caption: "Trip reports grouped by vehicle category." },
      { visual: "map", caption: "Check route and area violations on the map." },
    ],
    caseStudy: "pepsi-distributor-fleet-management",
    industries: ["fmcg-distribution", "logistics-transport", "waste-municipal"],
    faqs: [
      {
        q: "Can distributors see only their own vehicles?",
        a: "Yes. Each distributor, franchise or manager gets a separate login that shows only the vehicles assigned to them, while head office sees the whole fleet.",
      },
      {
        q: "Can you build reports around our business?",
        a: "Yes. Dashboards can be filtered by franchise, DSM, ASM, distributor and vehicle, and we built a custom distributor portal for a PepsiCo distributor.",
      },
      {
        q: "How do you measure outlet coverage?",
        a: "Outlets are mapped as geofences. Every time a vehicle enters one, the visit is logged, and POI visit reports show which outlets were and were not served.",
      },
      {
        q: "Can we start with part of the fleet?",
        a: "Yes. Many clients start with one depot or region, review the reports, then extend to the full fleet.",
      },
    ],
    related: ["vehicle-tracking-system", "fuel-monitoring-system", "temperature-monitoring"],
  },
  {
    slug: "fuel-monitoring-system",
    order: 3,
    name: "Fuel Monitoring",
    menuName: "Fuel Monitoring System",
    short: "Sensor-level fuel readings that catch theft the moment it happens.",
    icon: "Fuel",
    interest: "Fuel",
    primaryKeyword: "fuel monitoring system",
    seo: {
      title: "Fuel Monitoring System | Stop Fuel Theft | Connexis",
      description:
        "Fuel sensors log every fill, drain and litre burned, with instant theft alerts. For trucks, tankers and storage tanks. Book a live demo today.",
    },
    h1: "Fuel Monitoring System That Catches Theft as It Happens",
    intro:
      "Fuel level sensors report every fill, drain and litre burned with time and GPS location, so theft shows up in minutes, not at month-end.",
    heroVisual: "fuel",
    heroImage: { src: "/images/devices/fuel-level-sensor.webp", alt: "Connexis fuel level sensor probe with connector cable", w: 640, h: 960 },
    pairs: [
      ["Fuel disappears between fill-ups", "Every drop is logged with time and location"],
      ["Fuel bills don't match the kilometres", "Consumption per km or per hour, per vehicle"],
      ["Theft is found weeks later", "Drain alerts arrive by email and app straight away"],
    ],
    features: [
      { icon: "Cpu", title: "European controllers", text: "European-manufactured controller devices." },
      { icon: "Droplets", title: "Accurate sensors", text: "Digital or analogue liquid level sensors." },
      { icon: "FileText", title: "Fill and use records", text: "Every fill and litre consumed, on record." },
      { icon: "Siren", title: "Theft alerts", text: "Draining alerts by email, app and optional SMS." },
      { icon: "Gauge", title: "Average consumption", text: "Per kilometre or per engine hour." },
      { icon: "BatteryCharging", title: "Offline storage", text: "Data storage with a backup battery." },
      { icon: "Banknote", title: "Fuel bill records", text: "Match fuel bills against sensor readings." },
      { icon: "Container", title: "Any tank", text: "Works on moving and stationary tanks." },
    ],
    outcomes: ["Fuelling control", "Theft control", "Engine consumption measurement", "Theft and quality control"],
    gallery: [
      { visual: "fuel", caption: "Fills and drops on one chart, with the exact time of each." },
      { visual: "reports", caption: "Distance with fuel and vehicle fuel reports, ready to export." },
    ],
    specs: [
      ["Controller", "European-manufactured controller device"],
      ["Sensor", "Digital or analogue liquid level sensor"],
      ["Tanks", "Vehicle, generator, storage tanks and tankers"],
      ["Alerts", "Email, app, optional SMS"],
      ["Offline", "Local data storage with backup battery"],
      ["Reports", "Fill, drain, consumption per km or per hour, fuel bills"],
    ],
    caseStudy: "meezan-bank-generator-fuel-monitoring",
    industries: ["oil-gas", "logistics-transport", "banks-telecom"],
    faqs: [
      {
        q: "Which tanks can you monitor?",
        a: "Vehicle tanks, generator tanks, storage tanks and tankers. The system works on both moving and stationary tanks.",
      },
      {
        q: "How are theft alerts sent?",
        a: "Draining and theft alerts arrive by email and in the Connexis app, with SMS available as an option.",
      },
      {
        q: "Can it show average consumption?",
        a: "Yes. Reports show average consumption per kilometre for vehicles and per engine hour for generators and machines.",
      },
      { q: "Does the sensor need drilling into the tank?", a: "", pending: true },
    ],
    related: ["generator-fuel-monitoring", "vehicle-tracking-system", "fleet-management-system"],
  },
  {
    slug: "generator-fuel-monitoring",
    order: 4,
    name: "Genset Fuel Monitoring",
    menuName: "Generator Fuel Monitoring",
    short: "Filling, burn rate and running hours for every generator.",
    icon: "Zap",
    interest: "Genset",
    primaryKeyword: "generator fuel monitoring system",
    seo: {
      title: "Generator Fuel Monitoring System | Connexis",
      description:
        "Track filling, fuel burn and running hours for every generator across branches and sites. Meezan Bank cut fuel cost by 16%. Book a demo.",
    },
    h1: "Generator Fuel Monitoring for Banks, Telecom Sites and Factories",
    intro:
      "Every generator, every branch, one screen: tank level, fills, fuel burned and running hours. Built for organisations running dozens or hundreds of gensets.",
    heroVisual: "genset",
    pairs: [
      ["Fill records are written by hand", "Every fill is measured by the sensor"],
      ["Running hours are a guess", "Hours and litres per hour, per generator"],
      ["Each branch reports differently", "Head office sees every site, grouped by region"],
    ],
    features: [
      { icon: "CalendarCheck", title: "Daily opening and closing", text: "Tank level at the start and end of every day." },
      { icon: "Droplet", title: "Filling and pouring", text: "Every fill and pour, with time and quantity." },
      { icon: "Timer", title: "Running hours", text: "Consumption and running hours side by side." },
      { icon: "Gauge", title: "Litres per hour", text: "Average burn rate for every generator." },
      { icon: "Siren", title: "Pilferage report", text: "Abnormal drops collected in one report." },
      { icon: "Building2", title: "Group by site", text: "By branch, city or region." },
      { icon: "Download", title: "Export", text: "Excel or PDF for finance and audit." },
      { icon: "Bell", title: "Drop alerts", text: "Alerts the moment fuel falls unexpectedly." },
    ],
    gallery: [
      { visual: "genset", caption: "Tank level, fills and burn for every branch generator." },
      { visual: "fuel", caption: "Find the exact hour a drop happened." },
    ],
    caseStudy: "meezan-bank-generator-fuel-monitoring",
    industries: ["banks-telecom"],
    faqs: [
      { q: "Does it work with any generator brand?", a: "", pending: true },
      {
        q: "Can head office see all branches together?",
        a: "Yes. Generators can be grouped by branch, city or region, and head office sees every site on one dashboard.",
      },
      {
        q: "How quickly does a theft alert arrive?",
        a: "Abnormal drops trigger an alert as soon as the sensor reports them, by email and in the app, so you are not waiting for a month-end report.",
      },
      {
        q: "Can you track running hours for maintenance?",
        a: "Yes. Running hours are recorded for every generator and appear alongside consumption in the reports.",
      },
    ],
    related: ["fuel-monitoring-system", "temperature-monitoring", "asset-tracking"],
  },
  {
    slug: "ai-dashcam-mdvr",
    order: 5,
    name: "AI Dashcam & MDVR",
    menuName: "AI Dashcam & MDVR",
    short: "Cameras that flag phone use, fatigue and harsh driving.",
    icon: "Camera",
    interest: "Dashcam",
    primaryKeyword: "AI dashcam for fleets",
    seo: {
      title: "AI Dashcam & MDVR for Fleets | Connexis",
      description:
        "AI cameras flag phone use, smoking, fatigue and harsh driving, with live video and evidence clips for every event. Book a fleet safety demo.",
    },
    h1: "AI Dashcam and MDVR for Safer Fleet Driving",
    intro:
      "AI cameras watch the road and the driver, flag risky behaviour as it happens and save the clip as evidence.",
    heroVisual: "dashcam",
    heroImage: { src: "/images/devices/ai-dashcam.webp", alt: "Connexis AI dashcam units, front, side and windscreen-mounted views", w: 1024, h: 1024 },
    pairs: [
      ["You hear about crashes after the fact", "Crash and harsh-driving warnings arrive live"],
      ["Disputes come down to one word against another", "Evidence clips settle them"],
      ["Tired drivers keep driving", "Fatigue and yawning are flagged in the cab"],
    ],
    features: [
      { icon: "Video", title: "ADAS road camera", text: "Lane and road deviation and short-distance warnings." },
      { icon: "ScanFace", title: "DMS driver camera", text: "Flags smoking, phone use, yawning and distraction." },
      { icon: "TriangleAlert", title: "Crash warning", text: "Harsh driving and crash events detected." },
      { icon: "Play", title: "Live video", text: "Watch any cab live, or review the recording." },
      { icon: "FileText", title: "Evidence reports", text: "Every event saved with images." },
      { icon: "FileChartColumn", title: "Behaviour reports", text: "Driving behaviour, alarm and mileage reports." },
    ],
    gallery: [
      { visual: "dashcam", caption: "Every alert comes with the clip that proves it." },
      { visual: "reports", caption: "Driving behaviour and alarm reports by driver." },
    ],
    specs: [
      ["MDVR unit", "Multi-channel recorder. CONFIRM channel count, storage and connectivity from the vendor datasheet."],
      ["ADAS camera", "Road-facing: lane and road deviation, short-distance warning"],
      ["DMS camera", "Driver-facing: smoking, phone use, yawning, distraction"],
      ["AI dashcam", "All-in-one unit with built-in road camera"],
    ],
    caseStudy: null,
    industries: ["logistics-transport", "oil-gas", "insurance-leasing"],
    faqs: [
      { q: "Can drivers' faces be blurred for privacy?", a: "", pending: true },
      { q: "How long is video stored?", a: "", pending: true },
      {
        q: "Does it work in buses and trailers?",
        a: "Yes. The MDVR supports road and driver cameras across trucks, buses and trailer combinations, fitted by our technicians.",
      },
      {
        q: "Can we watch live?",
        a: "Yes. Live video and recordings are available on the Connexis platform alongside evidence reports for every event.",
      },
    ],
    related: ["vehicle-tracking-system", "fleet-management-system", "fuel-monitoring-system"],
  },
  {
    slug: "temperature-monitoring",
    order: 6,
    name: "Temperature Monitoring",
    menuName: "Temperature Monitoring",
    short: "Up to four sensors per vehicle or chiller, with alerts at your thresholds.",
    icon: "Thermometer",
    interest: "Temperature",
    primaryKeyword: "temperature monitoring system",
    seo: {
      title: "Temperature Monitoring System | Connexis",
      description:
        "Live temperature for reefer trucks, chillers and warehouses. Up to four sensors with SMS and email alerts at your limits. Book a demo now.",
    },
    h1: "Temperature Monitoring for Cold Chain Vehicles and Warehouses",
    intro:
      "Know the temperature inside every reefer truck, chiller and store, and get an alert the moment it leaves your safe range.",
    heroVisual: "temperature",
    pairs: [
      ["Spoilage is found at delivery", "Alerts fire the moment a zone leaves range"],
      ["Audit logs are filled in by hand", "Temperature history is recorded automatically"],
      ["Door opens cause false alarms", "Duration rules and alarm delays cut the noise"],
    ],
    features: [
      { icon: "Layers", title: "Four sensors", text: "Up to four per unit for multi-zone monitoring." },
      { icon: "Snowflake", title: "Your thresholds", text: "Custom minimum and maximum limits." },
      { icon: "Hourglass", title: "Duration rule", text: "Alarm only after a set time out of range." },
      { icon: "Timer", title: "Set-point delay", text: "Alarm delay after a set-point change." },
      { icon: "Activity", title: "On-demand status", text: "Latest reading whenever you ask." },
      { icon: "History", title: "History reports", text: "Printable temperature history." },
      { icon: "Bell", title: "SMS and email", text: "Alerts to the people you choose." },
      { icon: "Route", title: "With route tracking", text: "Temperature and location on one timeline." },
    ],
    gallery: [{ visual: "temperature", caption: "Four zones, one chart, with the limits drawn in." }],
    caseStudy: null,
    industries: ["fmcg-distribution", "logistics-transport"],
    faqs: [
      { q: "What temperature range do the sensors cover?", a: "", pending: true },
      {
        q: "Can we monitor warehouses and vehicles together?",
        a: "Yes. Chillers, stores and reefer trucks all report to the same platform, with up to four sensors per unit.",
      },
      {
        q: "Who gets the alerts?",
        a: "You choose. Alerts go by SMS and email to the people you set for each vehicle or site, and appear in the mobile app.",
      },
      {
        q: "Is the history printable for audits?",
        a: "Yes. Temperature history reports can be exported and printed for audits.",
      },
    ],
    related: ["fleet-management-system", "vehicle-tracking-system", "asset-tracking"],
  },
  {
    slug: "asset-tracking",
    order: 7,
    name: "Asset & Container Tracking",
    menuName: "Asset & Container Tracking",
    short: "Solar trackers for containers, trailers and vessels with no power.",
    icon: "Container",
    interest: "Assets",
    primaryKeyword: "asset tracking system",
    seo: {
      title: "Asset & Container Tracking | Solar GPS | Connexis",
      description:
        "Solar-powered trackers for containers, trailers and vessels: 12,000mAh battery, IP67, optional satellite link. Book an asset tracking demo.",
    },
    h1: "Solar Asset and Container Tracking, Even Without Power",
    intro:
      "Portable solar trackers follow containers, trailers and vessels for long periods with no power supply, on cellular or optional satellite networks.",
    heroVisual: "asset",
    pairs: [
      ["Containers go dark between ports", "Solar power keeps the tracker reporting"],
      ["Doors are opened in transit", "Door sensors and tamper alarms report it"],
      ["Rough handling damages cargo", "Motion sensors flag dumping and rollover"],
    ],
    features: [
      { icon: "Sun", title: "Solar charging", text: "Plus a 12,000mAh battery for long periods." },
      { icon: "Satellite", title: "Cellular + satellite", text: "Optional satellite link where there is no coverage." },
      { icon: "ShieldCheck", title: "IP67 and ATEX", text: "Waterproof and explosion-proof rated." },
      { icon: "Bluetooth", title: "BLE sensors", text: "Temperature, humidity, beacon and door sensors." },
      { icon: "Move3d", title: "6-axis motion", text: "Detects dumping, rollover and abnormal movement." },
      { icon: "Lock", title: "Anti-tamper", text: "Hall-effect tamper alarm." },
      { icon: "Waves", title: "Water-fall detection", text: "Know if an asset goes into water." },
      { icon: "Power", title: "Optional controls", text: "Ignition detection, fuel and power cut-off, fuel level, SOS." },
    ],
    gallery: [{ visual: "asset", caption: "Track a container's journey with no power on board." }],
    specs: [
      ["Power", "Solar charging + 12,000mAh battery"],
      ["Network", "Cellular, optional satellite"],
      ["Rating", "IP67 waterproof, ATEX explosion-proof"],
      ["Sensors", "BLE temperature, humidity, beacon and door"],
      ["Motion", "6-axis sensor: dumping, rollover, abnormal movement"],
      ["Security", "Hall-effect anti-tamper alarm, water-fall detection"],
      ["Options", "Ignition detection, fuel and power cut-off, fuel level, SOS"],
    ],
    caseStudy: null,
    industries: ["logistics-transport", "oil-gas"],
    faqs: [
      { q: "How long does the battery last without sun?", a: "", pending: true },
      {
        q: "Does it work at sea?",
        a: "Yes. With the optional satellite link the tracker reports where there is no cellular coverage, and it is IP67 waterproof.",
      },
      {
        q: "Can it tell if a door is opened?",
        a: "Yes. A BLE door sensor reports openings, and a Hall-effect anti-tamper alarm flags interference with the tracker.",
      },
      {
        q: "Can it be moved between assets?",
        a: "Yes. The tracker is portable and solar powered, so it can be moved from one container, trailer or vessel to another.",
      },
    ],
    related: ["vehicle-tracking-system", "temperature-monitoring", "fuel-monitoring-system"],
  },
];

// Low-priority lines: footer-linked only, never on the home page (spec §1, §6.10).
export const lowServices = [
  {
    slug: "cctv-surveillance",
    low: true,
    name: "CCTV & Surveillance",
    menuName: "CCTV & Surveillance",
    short: "Cameras, multi-site monitoring and access control for buildings and sites.",
    icon: "Cctv",
    interest: null,
    primaryKeyword: "CCTV installation company Lahore",
    seo: {
      title: "CCTV & Surveillance Systems | Connexis",
      description:
        "CCTV, IP cameras and access control for offices, buildings and sites, with multi-site remote monitoring and SLA-backed support. Get a quote.",
    },
    h1: "CCTV and Surveillance Systems for Offices, Buildings and Sites",
    intro:
      "Analogue and IP camera systems, remote monitoring across sites and access control, installed and maintained by Connexis under a service agreement.",
    heroVisual: "cctv",
    features: [
      { icon: "Cctv", title: "Every camera type", text: "Indoor, outdoor, IR day/night, dome, bullet, vandal-proof and PTZ." },
      { icon: "Server", title: "Multi-site monitoring", text: "DVR and IP systems watched remotely from one place." },
      { icon: "Lock", title: "Access control", text: "Smart cards and biometrics." },
      { icon: "Wrench", title: "SLA support", text: "After-sales service under a service-level agreement." },
    ],
    caseStudy: "high-rise-building-cctv",
    faqs: [],
    related: ["vehicle-tracking-system", "generator-fuel-monitoring", "asset-tracking"],
  },
  {
    slug: "car-tracker",
    low: true,
    name: "Car & personal trackers",
    menuName: "Car Tracker",
    short: "A GPS tracker for your own car or bike, with a live app.",
    icon: "Car",
    interest: null,
    primaryKeyword: "car tracker in Pakistan",
    seo: {
      title: "Car Tracker in Pakistan | Connexis",
      description:
        "A GPS car tracker with a live app, alerts and trip history for your own car or bike, installed by Connexis technicians. Get a price today.",
    },
    h1: "Car Tracker in Pakistan, Installed by Connexis",
    intro:
      "Keep an eye on your own car or bike from your phone: live location, alerts and trip history, fitted by our technicians in 29 cities.",
    heroVisual: "app",
    features: [
      { icon: "Smartphone", title: "Live app", text: "See where your car is on Android or iOS." },
      { icon: "Bell", title: "Alerts", text: "Know when the ignition turns on or the car leaves an area." },
      { icon: "History", title: "Trip history", text: "Every trip with stops and times." },
      { icon: "Wrench", title: "Professional install", text: "Fitted by Connexis technicians." },
    ],
    caseStudy: null,
    faqs: [],
    related: ["vehicle-tracking-system"],
  },
];

export const allServices = [...services, ...lowServices];
export const steps = howItWorks;

export function getService(slug) {
  return allServices.find((s) => s.slug === slug);
}
