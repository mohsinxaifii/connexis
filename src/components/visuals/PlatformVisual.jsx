import Image from "next/image";

// Illustrative platform screens built in code with generic demo data (no real plates or names).
// Replace each with a real 2× capture from the Connexis demo account (spec §8.3) by passing `src`.

export default function PlatformVisual({ kind, src, alt, className = "", chrome = true, priority = false }) {
  if (src) {
    return (
      <Frame chrome={chrome} className={className}>
        <Image src={src} alt={alt || ""} width={1440} height={900} sizes="(min-width: 1024px) 720px, 100vw" priority={priority} className="h-auto w-full" />
      </Frame>
    );
  }
  if (kind === "app") return <AppVisual className={className} priority={priority} />;
  const Cmp = VIEWS[kind] || MapView;
  return (
    <Frame chrome={chrome} className={className} url={URLS[kind]}>
      <div role="img" aria-label={LABELS[kind] || "Connexis platform preview"} className="aspect-[16/10] w-full bg-white">
        <Cmp />
      </div>
    </Frame>
  );
}

const URLS = {
  map: "Live map",
  dashboard: "Fleet dashboard",
  reports: "Reports",
  fuel: "Fuel · Vehicle",
  genset: "Gen-set fuel",
  dashcam: "AI dashcam · Evidence",
  temperature: "Temperature sensor",
  asset: "Assets · Containers",
  cctv: "Monitor wall",
};

const LABELS = {
  map: "Live map with a vehicle panel showing ignition, speed, GSM and satellites",
  dashboard: "Fleet dashboard with running, stopped, idle and inactive vehicles and daily trips",
  reports: "Reports menu with ready-made report types",
  fuel: "Fuel chart showing fills and a sudden drop",
  genset: "Generator fuel dashboard by branch with tank levels and running hours",
  dashcam: "AI dashcam evidence view with driver alerts",
  temperature: "Temperature chart for four zones with limits",
  asset: "Container tracking map with a solar tracker panel",
  cctv: "CCTV monitor wall with camera feeds",
};

function Frame({ children, chrome, className, url }) {
  return (
    <div className={`frame ${className}`}>
      {chrome && (
        <div className="frame-bar">
          <i />
          <i />
          <i />
          <span className="ml-3 truncate rounded bg-grey-100 px-3 py-0.5 text-[11px] text-grey-600">
            webtrack.connexistracking.com{url ? ` · ${url}` : ""}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- shared bits ---------- */

const Txt = (p) => <text fontFamily="Inter, sans-serif" fill="#1a1a1a" {...p} />;

function MiniMap({ x = 0, y = 0, w = 400, h = 300, routes = true }) {
  const id = `mm${x}${y}${w}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={id}>
        <rect width={w} height={h} rx="6" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect width={w} height={h} fill="#f4f5f7" />
        <g stroke="#fff" strokeLinecap="round" fill="none">
          {[0.18, 0.46, 0.78].map((k) => (
            <path key={`h${k}`} d={`M0 ${h * k}H${w}`} strokeWidth="9" />
          ))}
          {[0.2, 0.52, 0.84].map((k) => (
            <path key={`v${k}`} d={`M${w * k} 0V${h}`} strokeWidth="9" />
          ))}
          <path d={`M0 ${h * 0.95}L${w * 0.9} 0`} strokeWidth="11" />
          {[0.32, 0.62].map((k) => (
            <path key={`m${k}`} d={`M0 ${h * k}H${w}`} strokeWidth="4" />
          ))}
          {[0.36, 0.68].map((k) => (
            <path key={`n${k}`} d={`M${w * k} 0V${h}`} strokeWidth="4" />
          ))}
        </g>
        {routes && (
          <path
            d={`M${w * 0.05} ${h * 0.18}H${w * 0.2}V${h * 0.46}H${w * 0.52}V${h * 0.78}H${w * 0.95}`}
            stroke="#e1251b"
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
        )}
      </g>
    </g>
  );
}

function Dot({ x, y, c = "#1a1a1a", r = 6 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 3} fill="#fff" />
      <circle r={r} fill={c} />
    </g>
  );
}

/* ---------- views (viewBox 640x400) ---------- */

function MapView() {
  const list = [
    ["Truck 07", "#1f9d55", "62 km/h"],
    ["Van 12", "#1f9d55", "48 km/h"],
    ["Truck 21", "#e8a317", "Idle"],
    ["Bike 04", "#9a9ea6", "Stopped"],
    ["Tanker 03", "#1f9d55", "55 km/h"],
    ["Van 18", "#9a9ea6", "Stopped"],
  ];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <rect x="0" y="0" width="168" height="400" fill="#fafafb" />
      <line x1="168" y1="0" x2="168" y2="400" stroke="#e3e5e8" />
      <Txt x="16" y="28" fontSize="12" fontWeight="700">Vehicles</Txt>
      <rect x="16" y="40" width="136" height="24" rx="5" fill="#fff" stroke="#e3e5e8" />
      <Txt x="26" y="56" fontSize="10" fill="#9a9ea6">Search vehicle</Txt>
      {list.map(([n, c, s], i) => (
        <g key={n} transform={`translate(0 ${80 + i * 44})`}>
          {i === 0 && <rect x="8" y="-14" width="152" height="40" rx="6" fill="#fdf2f1" />}
          <circle cx="24" cy="6" r="4" fill={c} />
          <Txt x="36" y="10" fontSize="11" fontWeight="600">{n}</Txt>
          <Txt x="36" y="23" fontSize="9.5" fill="#5b5f66">{s}</Txt>
        </g>
      ))}
      <MiniMap x={180} y={12} w={448} h={376} />
      <Dot x={180 + 448 * 0.2} y={12 + 376 * 0.36} c="#e1251b" />
      <Dot x={180 + 448 * 0.52} y={12 + 376 * 0.62} />
      <Dot x={180 + 448 * 0.76} y={12 + 376 * 0.78} />
      <Dot x={180 + 448 * 0.84} y={12 + 376 * 0.25} />
      <g transform="translate(282 40)">
        <rect width="196" height="132" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="14" y="24" fontSize="12" fontWeight="700">Truck 07</Txt>
        <rect x="132" y="12" width="50" height="18" rx="9" fill="#e9f6ee" />
        <Txt x="141" y="25" fontSize="9" fill="#1f7a45" fontWeight="600">Moving</Txt>
        {[
          ["Ignition", "On"],
          ["Speed", "62 km/h"],
          ["Battery", "12.6 V"],
          ["GSM", "Strong"],
          ["Satellites", "11"],
          ["Power", "Main"],
        ].map(([k, v], i) => (
          <g key={k} transform={`translate(${14 + (i % 2) * 92} ${50 + Math.floor(i / 2) * 26})`}>
            <Txt fontSize="9" fill="#5b5f66">{k}</Txt>
            <Txt y="12" fontSize="10.5" fontWeight="600">{v}</Txt>
          </g>
        ))}
      </g>
    </svg>
  );
}

function DashboardView() {
  const kpis = [
    ["Running", "128", "#1f9d55"],
    ["Stopped", "41", "#9a9ea6"],
    ["Idle", "17", "#e8a317"],
    ["Inactive", "6", "#e1251b"],
  ];
  const bars = [9, 7, 11, 2, 8, 10, 1, 6, 9, 3, 12, 8, 7, 1];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <Txt x="20" y="32" fontSize="14" fontWeight="700">Fleet summary</Txt>
      <Txt x="20" y="48" fontSize="10" fill="#5b5f66">All franchises · Today</Txt>
      {["Franchise", "DSM", "ASM", "Distributor"].map((f, i) => (
        <g key={f} transform={`translate(${352 + i * 70} 20)`}>
          <rect width="62" height="24" rx="12" fill={i === 0 ? "#1a1a1a" : "#fff"} stroke="#e3e5e8" />
          <Txt x="31" y="16" fontSize="9.5" textAnchor="middle" fill={i === 0 ? "#fff" : "#1a1a1a"}>{f}</Txt>
        </g>
      ))}
      {kpis.map(([k, v, c], i) => (
        <g key={k} transform={`translate(${20 + i * 152} 66)`}>
          <rect width="140" height="72" rx="10" fill="#fff" stroke="#e3e5e8" />
          <circle cx="16" cy="20" r="4" fill={c} />
          <Txt x="26" y="24" fontSize="10" fill="#5b5f66">{k}</Txt>
          <text x="14" y="56" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="24" fill="#1a1a1a">{v}</text>
        </g>
      ))}
      <g transform="translate(20 156)">
        <rect width="380" height="226" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="16" y="26" fontSize="11" fontWeight="700">Trips per vehicle · this week</Txt>
        <Txt x="16" y="42" fontSize="9.5" fill="#5b5f66">Red = under 3 trips: candidates to cut</Txt>
        {bars.map((b, i) => (
          <rect key={i} x={20 + i * 25} y={200 - b * 12} width="15" height={b * 12} rx="3" fill={b < 3 ? "#e1251b" : "#d5d8dc"} />
        ))}
        <line x1="16" y1="200" x2="364" y2="200" stroke="#e3e5e8" />
      </g>
      <g transform="translate(412 156)">
        <rect width="208" height="226" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="16" y="26" fontSize="11" fontWeight="700">Gate out / gate in</Txt>
        {[
          ["Truck 07", "07:42", "18:10"],
          ["Van 12", "08:05", "17:31"],
          ["Truck 21", "—", "—"],
          ["Van 18", "07:58", "16:45"],
          ["Tanker 03", "06:30", "19:02"],
        ].map(([n, o, g], i) => (
          <g key={n} transform={`translate(16 ${54 + i * 32})`}>
            <Txt fontSize="10" fontWeight="600">{n}</Txt>
            <Txt x="104" fontSize="10" fill="#5b5f66">{o}</Txt>
            <Txt x="148" fontSize="10" fill="#5b5f66">{g}</Txt>
            <line x1="0" y1="12" x2="176" y2="12" stroke="#f0f1f3" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ReportsView() {
  const items = ["Trip", "Idle", "Over Speed", "Geofence", "Stop Over", "Fleet Summary", "Driving Quality", "Vehicle Fuel", "Gen-set Fuel", "Working Hours", "POI Visit", "Temperature Sensor"];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <Txt x="24" y="36" fontSize="14" fontWeight="700">Reports</Txt>
      <Txt x="24" y="52" fontSize="10" fill="#5b5f66">26 ready-made reports · export to Excel or PDF</Txt>
      {items.map((t, i) => {
        const x = 24 + (i % 4) * 150;
        const y = 72 + Math.floor(i / 4) * 104;
        const hot = i === 0;
        return (
          <g key={t} transform={`translate(${x} ${y})`}>
            <rect width="138" height="92" rx="10" fill={hot ? "#e1251b" : "#fff"} stroke={hot ? "#e1251b" : "#e3e5e8"} />
            <rect x="14" y="14" width="26" height="26" rx="7" fill={hot ? "rgba(255,255,255,.2)" : "#fdf2f1"} />
            <path d="M21 33v-6m6 6v-10m6 10v-4" stroke={hot ? "#fff" : "#e1251b"} strokeWidth="2" strokeLinecap="round" />
            <Txt x="14" y="66" fontSize="11" fontWeight="600" fill={hot ? "#fff" : "#1a1a1a"}>{t}</Txt>
            <Txt x="14" y="80" fontSize="9" fill={hot ? "rgba(255,255,255,.8)" : "#5b5f66"}>Excel · PDF</Txt>
          </g>
        );
      })}
    </svg>
  );
}

function FuelView() {
  // Tank level over 24h: fill at 06:00, steady burn, theft drop at 15:00
  const pts = [[0, 120], [60, 128], [70, 40], [200, 80], [260, 98], [270, 168], [420, 205]];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${40 + x} ${y + 60}`).join("");
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <Txt x="24" y="32" fontSize="14" fontWeight="700">Tank level · Truck 07</Txt>
      <Txt x="24" y="48" fontSize="10" fill="#5b5f66">Last 24 hours · litres</Txt>
      <g transform="translate(0 0)">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="40" y1={80 + i * 50} x2="470" y2={80 + i * 50} stroke="#f0f1f3" />
        ))}
        <path d={`${d}L460 290L40 290Z`} fill="#f4f5f7" />
        <path d={d} fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <g transform="translate(110 100)">
          <rect x="-34" y="-30" width="68" height="20" rx="10" fill="#1a1a1a" />
          <Txt x="0" y="-16" fontSize="9.5" fill="#fff" textAnchor="middle" fontWeight="600">Fill +88 L</Txt>
        </g>
        <g transform="translate(310 190)">
          <circle r="22" fill="#e1251b" opacity=".12" />
          <circle r="5" fill="#e1251b" />
          <rect x="10" y="-38" width="96" height="22" rx="11" fill="#e1251b" />
          <Txt x="58" y="-23" fontSize="9.5" fill="#fff" textAnchor="middle" fontWeight="700">Drop −70 L · 15:12</Txt>
        </g>
        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((t, i) => (
          <Txt key={t} x={40 + i * 105} y="310" fontSize="9" fill="#5b5f66">{t}</Txt>
        ))}
      </g>
      <g transform="translate(488 66)">
        <rect width="136" height="316" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="14" y="26" fontSize="11" fontWeight="700">Today</Txt>
        {[
          ["Opening", "112 L"],
          ["Filled", "88 L"],
          ["Consumed", "41 L"],
          ["Drained", "70 L", true],
          ["Closing", "89 L"],
          ["Avg", "3.4 km/L"],
        ].map(([k, v, hot], i) => (
          <g key={k} transform={`translate(14 ${56 + i * 42})`}>
            <Txt fontSize="9.5" fill="#5b5f66">{k}</Txt>
            <text y="18" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="15" fill={hot ? "#e1251b" : "#1a1a1a"}>{v}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function GensetView() {
  const rows = [
    ["Branch 014 · Lahore", 0.74, "6.2 h", "4.1 L/h"],
    ["Branch 027 · Karachi", 0.38, "9.8 h", "4.4 L/h"],
    ["Branch 031 · Multan", 0.86, "2.1 h", "3.9 L/h"],
    ["Branch 046 · Peshawar", 0.21, "7.5 h", "5.9 L/h", true],
    ["Branch 052 · Islamabad", 0.63, "4.4 h", "4.0 L/h"],
    ["Branch 060 · Quetta", 0.55, "5.0 h", "4.2 L/h"],
  ];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <Txt x="24" y="32" fontSize="14" fontWeight="700">Generators · all regions</Txt>
      <Txt x="24" y="48" fontSize="10" fill="#5b5f66">Tank level, running hours and burn rate</Txt>
      {[
        ["Sites", "212"],
        ["Fuel today", "3,918 L"],
        ["Alerts", "3"],
      ].map(([k, v], i) => (
        <g key={k} transform={`translate(${24 + i * 200} 64)`}>
          <rect width="188" height="58" rx="10" fill={i === 2 ? "#fdf2f1" : "#fff"} stroke="#e3e5e8" />
          <Txt x="14" y="22" fontSize="9.5" fill="#5b5f66">{k}</Txt>
          <text x="14" y="46" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="18" fill={i === 2 ? "#e1251b" : "#1a1a1a"}>{v}</text>
        </g>
      ))}
      <g transform="translate(24 140)">
        <Txt fontSize="9" fill="#5b5f66" y="0">Site</Txt>
        <Txt x="232" fontSize="9" fill="#5b5f66">Tank</Txt>
        <Txt x="420" fontSize="9" fill="#5b5f66">Running</Txt>
        <Txt x="504" fontSize="9" fill="#5b5f66">Burn</Txt>
        {rows.map(([n, lvl, h, b, hot], i) => (
          <g key={n} transform={`translate(0 ${22 + i * 38})`}>
            <rect x="-8" y="-4" width="600" height="32" rx="6" fill={hot ? "#fdf2f1" : i % 2 ? "#fff" : "#fafafb"} />
            <Txt y="16" fontSize="10.5" fontWeight="600">{n}</Txt>
            <rect x="232" y="7" width="160" height="10" rx="5" fill="#eceef1" />
            <rect x="232" y="7" width={160 * lvl} height="10" rx="5" fill={hot ? "#e1251b" : "#1a1a1a"} />
            <Txt x="420" y="16" fontSize="10.5">{h}</Txt>
            <Txt x="504" y="16" fontSize="10.5" fontWeight={hot ? 700 : 400} fill={hot ? "#e1251b" : "#1a1a1a"}>{b}</Txt>
          </g>
        ))}
      </g>
    </svg>
  );
}

function DashcamView() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <defs>
        <linearGradient id="dc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d33" />
          <stop offset="1" stopColor="#3a3e45" />
        </linearGradient>
      </defs>
      <g transform="translate(16 16)">
        <rect width="400" height="250" rx="10" fill="url(#dc-sky)" />
        <path d="M0 250L170 120H230L400 250Z" fill="#4a4e56" />
        <path d="M200 250V124" stroke="#d5d8dc" strokeWidth="3" strokeDasharray="16 14" />
        <path d="M60 250L183 124M340 250L217 124" stroke="#e8a317" strokeWidth="2" opacity=".7" />
        <rect x="176" y="132" width="48" height="34" rx="3" fill="none" stroke="#e1251b" strokeWidth="2" />
        <rect x="176" y="114" width="70" height="15" rx="3" fill="#e1251b" />
        <text x="181" y="125" fontFamily="Inter" fontSize="8.5" fill="#fff" fontWeight="700">Distance 8 m</text>
        <rect x="12" y="12" width="66" height="18" rx="4" fill="rgba(0,0,0,.5)" />
        <text x="20" y="25" fontFamily="Inter" fontSize="9" fill="#fff">● REC · CH1</text>
        <g transform="translate(288 150)">
          <rect width="100" height="88" rx="6" fill="#1a1a1a" stroke="#5b5f66" />
          <circle cx="50" cy="40" r="20" fill="#3a3e45" />
          <rect x="30" y="64" width="40" height="18" rx="9" fill="#3a3e45" />
          <rect x="34" y="24" width="32" height="26" rx="3" fill="none" stroke="#e1251b" strokeWidth="1.5" />
          <text x="6" y="12" fontFamily="Inter" fontSize="8" fill="#d5d8dc">CH2 · Driver</text>
        </g>
      </g>
      <g transform="translate(432 16)">
        <rect width="192" height="368" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="14" y="26" fontSize="11" fontWeight="700">Events · Truck 07</Txt>
        {[
          ["Phone use", "09:14", true],
          ["Short distance", "09:02", true],
          ["Yawning", "08:47", false],
          ["Harsh braking", "08:31", false],
          ["Smoking", "07:55", false],
          ["Lane deviation", "07:40", false],
        ].map(([e, t, hot], i) => (
          <g key={e} transform={`translate(14 ${50 + i * 52})`}>
            <rect width="164" height="42" rx="8" fill={hot ? "#fdf2f1" : "#fafafb"} />
            <rect x="8" y="8" width="38" height="26" rx="4" fill="#3a3e45" />
            <Txt x="54" y="19" fontSize="10" fontWeight="600" fill={hot ? "#c01f17" : "#1a1a1a"}>{e}</Txt>
            <Txt x="54" y="32" fontSize="9" fill="#5b5f66">{t} · clip saved</Txt>
          </g>
        ))}
      </g>
      <g transform="translate(16 282)">
        <rect width="400" height="102" rx="10" fill="#fff" stroke="#e3e5e8" />
        <Txt x="14" y="24" fontSize="11" fontWeight="700">Driver score · week</Txt>
        {[78, 82, 80, 88, 85, 91, 92].map((v, i) => (
          <rect key={i} x={20 + i * 52} y={90 - (v - 60) * 1.6} width="30" height={(v - 60) * 1.6} rx="4" fill={i === 6 ? "#e1251b" : "#d5d8dc"} />
        ))}
      </g>
    </svg>
  );
}

function TemperatureView() {
  const zones = [
    ["Zone 1", "#1a1a1a", [4, 3.6, 3.9, 4.2, 3.8, 4.1, 3.7, 3.9]],
    ["Zone 2", "#5b5f66", [2.2, 2.5, 2.1, 2.4, 2.6, 2.2, 2.3, 2.5]],
    ["Zone 3", "#9a9ea6", [5.4, 5.8, 6.1, 7.6, 9.2, 6.4, 5.9, 5.6]],
    ["Zone 4", "#c4c7cc", [-17, -18, -17.5, -18.2, -17.8, -18, -17.6, -18.1]],
  ];
  const y = (v) => 210 - v * 14;
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#fff" />
      <Txt x="24" y="32" fontSize="14" fontWeight="700">Reefer · Van 18</Txt>
      <Txt x="24" y="48" fontSize="10" fill="#5b5f66">4 sensors · limits 0 °C to 8 °C (chiller zones)</Txt>
      <rect x="40" y={y(8)} width="420" height={y(0) - y(8)} fill="#f4f5f7" />
      <line x1="40" y1={y(8)} x2="460" y2={y(8)} stroke="#e1251b" strokeDasharray="4 4" />
      <Txt x="464" y={y(8) + 3} fontSize="9" fill="#c01f17">8 °C</Txt>
      {zones.slice(0, 3).map(([n, c, vals]) => (
        <path key={n} d={vals.map((v, i) => `${i ? "L" : "M"}${40 + i * 60} ${y(v)}`).join("")} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" />
      ))}
      <g transform={`translate(${40 + 4 * 60} ${y(9.2)})`}>
        <circle r="5" fill="#e1251b" />
        <rect x="10" y="-30" width="118" height="22" rx="11" fill="#e1251b" />
        <Txt x="69" y="-15" fontSize="9.5" fill="#fff" textAnchor="middle" fontWeight="700">Zone 3 · 9.2 °C · 12 min</Txt>
      </g>
      <g transform="translate(24 296)">
        {zones.map(([n, c, vals], i) => (
          <g key={n} transform={`translate(${i * 150} 0)`}>
            <rect width="138" height="80" rx="10" fill={i === 2 ? "#fdf2f1" : "#fff"} stroke="#e3e5e8" />
            <circle cx="16" cy="20" r="4" fill={c} />
            <Txt x="26" y="24" fontSize="10" fill="#5b5f66">{n}</Txt>
            <text x="14" y="60" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="22" fill={i === 2 ? "#e1251b" : "#1a1a1a"}>
              {vals[vals.length - 1 - (i === 2 ? 3 : 0)]} °C
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function AssetView() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#eef0f3" />
      <path d="M0 0H360C330 60 350 120 300 170C250 220 290 300 240 400H0Z" fill="#f7f8fa" />
      <path d="M360 0C330 60 350 120 300 170C250 220 290 300 240 400" fill="none" stroke="#e3e5e8" strokeWidth="2" />
      <path d="M60 340C120 300 160 280 210 230S300 140 420 120S560 80 610 40" fill="none" stroke="#e1251b" strokeWidth="2.5" strokeDasharray="0" />
      <path d="M60 340C120 300 160 280 210 230" fill="none" stroke="#e1251b" strokeWidth="2.5" />
      {[[60, 340], [210, 230], [420, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#1a1a1a" />
      ))}
      <Dot x={480} y={98} c="#e1251b" r={7} />
      <Txt x="40" y="368" fontSize="10" fill="#5b5f66">Dry port</Txt>
      <Txt x="430" y="150" fontSize="10" fill="#5b5f66">At sea · satellite</Txt>
      <g transform="translate(24 24)">
        <rect width="208" height="168" rx="12" fill="#fff" stroke="#e3e5e8" />
        <Txt x="16" y="28" fontSize="12" fontWeight="700">Container CX-4471</Txt>
        <Txt x="16" y="44" fontSize="9.5" fill="#5b5f66">Solar tracker · last report 4 min ago</Txt>
        {[
          ["Battery", "86%"],
          ["Charging", "Solar"],
          ["Door", "Closed"],
          ["Temp", "24 °C"],
          ["Network", "Satellite"],
          ["Tamper", "None"],
        ].map(([k, v], i) => (
          <g key={k} transform={`translate(${16 + (i % 2) * 96} ${68 + Math.floor(i / 2) * 32})`}>
            <Txt fontSize="9" fill="#5b5f66">{k}</Txt>
            <Txt y="13" fontSize="11" fontWeight="600">{v}</Txt>
          </g>
        ))}
      </g>
    </svg>
  );
}

function CctvView() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      <rect width="640" height="400" fill="#141518" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 12 + (i % 3) * 206;
        const y = 12 + Math.floor(i / 3) * 128;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="198" height="120" rx="6" fill={i === 4 ? "#2b2e34" : "#22252a"} stroke={i === 4 ? "#e1251b" : "#2f3238"} strokeWidth={i === 4 ? 2 : 1} />
            <path d={`M0 ${80 + (i % 3) * 6}L${60 + i * 6} ${50}L198 ${70 - (i % 2) * 12}V120H0Z`} fill="#2f3238" />
            <text x="10" y="18" fontFamily="Inter" fontSize="9" fill="#9a9ea6">CAM {String(i + 1).padStart(2, "0")} · Floor {Math.floor(i / 3) + 1}</text>
            <circle cx="186" cy="14" r="3.5" fill={i === 4 ? "#e1251b" : "#1f9d55"} />
          </g>
        );
      })}
    </svg>
  );
}

function AppVisual({ className, priority }) {
  return (
    <div className={`relative overflow-hidden rounded-[12px] border border-grey-200 bg-grey-100 ${className}`}>
      <div className="relative mx-auto aspect-[4/5] max-w-[420px]">
        <Image
          src="/images/brand/connexis-app.png"
          alt="Connexis mobile app showing vehicle status, mileage, fuel and temperature"
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          priority={priority}
          className="object-contain object-top pt-6"
        />
      </div>
    </div>
  );
}

const VIEWS = {
  map: MapView,
  dashboard: DashboardView,
  reports: ReportsView,
  fuel: FuelView,
  genset: GensetView,
  dashcam: DashcamView,
  temperature: TemperatureView,
  asset: AssetView,
  cctv: CctvView,
};
