// Photography and logos. Stock photos are from Pexels (free licence, no attribution required);
// client logos, portal screenshots and the ISO badge come from the live connexistracking.com site.

const ph = (name, alt, pos = "50% 50%") => ({ src: `/images/photos/${name}.webp`, alt, pos });

export const photos = {
  truckNight: ph("truck-night-headlights", "A heavy truck with its headlights on, driving at night", "50% 40%"),
  truckDusk: ph("truck-highway-dusk", "A truck on an empty highway at dusk"),
  truckMotion: ph("truck-motion-night", "A delivery truck moving through a city at night"),
  trailerDusk: ph("trailer-dusk", "A trailer truck crossing open country at dusk"),
  driverCab: ph("driver-cab", "A truck driver at the wheel in the cab", "40% 40%"),
  driverNight: ph("driver-night", "A driver looking out from a truck cab"),
  pakistanTruckArt: ph("pakistan-truck-art", "A hand-painted Pakistani truck with traditional truck art", "50% 35%"),
  pakistanRoad: ph("pakistan-truck-road", "A goods truck on a road in Pakistan"),
  lahoreNight: ph("lahore-night", "Lahore at night with traffic light trails around Arfa Software Technology Park"),
  port: ph("port-containers", "A container port with cranes, stacked containers and a cargo ship"),
  containers: ph("containers-stacked", "Stacked shipping containers"),
  loading: ph("loading-boxes", "Two workers loading cartons into a delivery vehicle"),
  warehouse: ph("warehouse", "A distribution warehouse with stock on pallets"),
  refuelling: ph("refuelling", "A fuel nozzle filling a vehicle tank"),
  fuelNozzles: ph("fuel-nozzles", "Diesel and petrol nozzles at a fuel station"),
  generator: ph("diesel-generator", "A trailer-mounted diesel generator on site"),
  towers: ph("telecom-towers", "Telecom towers with antennas and microwave dishes", "50% 40%"),
  cctvWall: ph("cctv-wall", "A security camera on the corner of a brick building"),
  cctvDome: ph("cctv-dome", "A dome security camera on a ceiling"),
  waste: ph("waste-collection", "A municipal waste crew loading a collection truck"),
  technician: ph("technician-hands", "A technician's hands working on vehicle wiring with a spanner"),
  car: ph("car-refuel", "A private car at a fuel pump"),
};

export const devices = {
  terminal: { src: "/images/devices/connexis-cxc270-can-adapters.webp", alt: "Connexis CXC270 LTE/GNSS terminal with CX-CAN adapters" },
  dashcam: { src: "/images/devices/ai-dashcam.webp", alt: "Connexis AI dashcam units" },
  fuelSensor: { src: "/images/devices/fuel-level-sensor.webp", alt: "Connexis fuel level sensor probe" },
  sensors: { src: "/images/devices/sensors-range.webp", alt: "Connexis sensor range: door, temperature, load, fuel, tyre pressure and RFID" },
};

export const app = { src: "/images/brand/connexis-app.png", alt: "The Connexis mobile app showing vehicle status, mileage, fuel, temperature and door" };

export const portal = {
  vehicle: { src: "/images/platform/portal-vehicle.png", alt: "Connexis web portal: a vehicle's live position and status panel on the map" },
  dashboard: { src: "/images/platform/portal-dashboard.png", alt: "Connexis web portal: fleet summary counters beside the live map of Pakistan" },
};

export const isoBadge = { src: "/images/brand/iso-9001.png", alt: "ISO 9001 certification marks: IGC, IAS accredited, IAF" };

export const clientLogos = [
  { name: "Pepsi", src: "/images/clients/pepsi.png" },
  { name: "Meezan Bank", src: "/images/clients/meezan-bank.png" },
  { name: "Faisal Movers", src: "/images/clients/faisal-movers.png" },
  { name: "Jalal Sons", src: "/images/clients/jalal-sons.png" },
  { name: "Kohistan Express", src: "/images/clients/kohistan-express.png" },
  { name: "WASA Lahore", src: "/images/clients/wasa-lahore.png" },
  { name: "Multan Waste Management Company", src: "/images/clients/mwmc-multan.png" },
  { name: "Gujranwala Waste Management Company", src: "/images/clients/gwmc-gujranwala.png" },
  { name: "Water and Sanitation Services Peshawar", src: "/images/clients/wssp-peshawar.png" },
];

export const servicePhoto = {
  "vehicle-tracking-system": { photo: photos.truckDusk, device: devices.terminal },
  "fleet-management-system": { photo: photos.truckMotion, device: null },
  "fuel-monitoring-system": { photo: photos.refuelling, device: devices.fuelSensor },
  "generator-fuel-monitoring": { photo: photos.generator, device: devices.fuelSensor },
  "ai-dashcam-mdvr": { photo: photos.driverCab, device: devices.dashcam },
  "temperature-monitoring": { photo: photos.warehouse, device: devices.sensors },
  "asset-tracking": { photo: photos.port, device: null },
  "cctv-surveillance": { photo: photos.cctvWall, device: null },
  "car-tracker": { photo: photos.car, device: devices.terminal },
};

export const industryPhoto = {
  "fmcg-distribution": photos.loading,
  "banks-telecom": photos.towers,
  "insurance-leasing": photos.car,
  "logistics-transport": photos.truckNight,
  "oil-gas": photos.fuelNozzles,
  "waste-municipal": photos.waste,
};

export const casePhoto = {
  pepsi: photos.loading,
  meezan: photos.generator,
  waste: photos.waste,
  cctv: photos.cctvDome,
  insurance: photos.car,
  container: photos.containers,
};

// Three field photos per service page, shown as a mosaic with captions.
const f = (name, alt, caption, pos) => ({ ...ph(name, alt, pos), caption });
export const serviceField = {
  "vehicle-tracking-system": [
    f("trucks-rows-aerial", "Rows of trucks parked at a logistics yard, seen from above", "Every vehicle in the yard, and every one on the road."),
    f("truck-driver-white", "A driver at the wheel of a white truck", "Live speed, stops and route for each driver."),
    f("truck-parked-night", "A truck parked in a logistics area at night", "Unauthorised use after hours triggers an alert."),
  ],
  "fleet-management-system": [
    f("trucks-depot-aerial", "Aerial view of trucks lined up at a depot", "See which vehicles work and which sit idle."),
    f("vans-row", "A fleet of white vans parked in a row", "Separate views for each distributor or branch."),
    f("loading-checklist", "A worker checking cartons at a loading bay", "Gate-out and gate-in times on every trip."),
  ],
  "fuel-monitoring-system": [
    f("fuel-nozzles", "Diesel and petrol nozzles at a fuel station", "Every fill matched against the fuel bill."),
    f("trailer-open-road", "A trailer truck on an open road", "Consumption per kilometre, per vehicle."),
    f("engine-check", "A mechanic checking a vehicle engine", "Sensors fitted by Connexis technicians."),
  ],
  "generator-fuel-monitoring": [
    f("telecom-mast", "A telecom mast with antennas and dishes", "Telecom sites with gensets running unattended."),
    f("radio-tower", "A lattice radio tower against the sky", "Every site on one dashboard, grouped by region."),
    f("engine-workshop", "Engine parts in a workshop", "Running hours recorded for maintenance."),
  ],
  "ai-dashcam-mdvr": [
    f("dashcam-night-road", "A night highway seen through a windscreen from the cab", "The road camera watches lanes and following distance."),
    f("driver-window", "A truck driver seen through the cab window", "The driver camera flags fatigue and phone use."),
    f("in-cab-screen", "A camera display on a vehicle dashboard", "Live video and evidence clips on the platform."),
  ],
  "temperature-monitoring": [
    f("cold-room", "A worker inside a chilled storage room", "Chillers and cold rooms on the same platform."),
    f("reefer-trailers", "Refrigerated trailers parked at loading docks", "Up to four zones per reefer trailer."),
    f("warehouse-aisle", "A warehouse aisle with racked stock", "Temperature history ready for audits."),
  ],
  "asset-tracking": [
    f("container-ship", "A loaded container ship at sea", "Optional satellite link where there is no coverage."),
    f("container-yard", "Stacked containers at a container yard", "Solar-powered, with no power supply needed."),
    f("containers-aerial", "Shipping containers seen from above", "Door and tamper alarms on every container."),
  ],
  "cctv-surveillance": [
    f("cctv-mono", "A security camera mounted on a building wall", "Indoor, outdoor, dome, bullet and PTZ cameras."),
    f("warehouse-worker", "A worker checking stock in a warehouse", "Multi-site monitoring for warehouses and offices."),
    f("cctv-dome", "A dome security camera on a ceiling", "After-sales support under a service agreement."),
  ],
  "car-tracker": [
    f("car-interior", "The interior of a car with a dashboard screen", "A tracker fitted discreetly by our technicians."),
    f("night-road-lights", "Headlights on a road at night", "Know when your car moves, day or night."),
    f("lahore-night", "Lahore at night with traffic light trails", "Installed in 29 cities across Pakistan."),
  ],
};
