import { Img } from "@/components/ui/Bits";
import { app, portal, photos } from "@/content/media";
import { reports, reportGroups } from "@/content/misc";

const TITLES = {
  map: "Live map",
  dashboard: "Fleet summary",
  app: "Mobile app",
  fuel: "Vehicle fuel",
  genset: "Gen-set fuel",
  temperature: "Temperature sensor",
  dashcam: "Driver events",
  asset: "Asset track",
  reports: "Reports",
  cctv: "Multi-site monitoring",
  pepsi: "Distributor portal",
  meezan: "Branch generators",
  waste: "Waste-segment portal",
  insurance: "Insured vehicles",
  container: "Container track",
};

// Platform visuals. Real portal screenshots and the real app where we have them; drawn
// charts in the portal's style for the rest.
export default function Screen({ kind, caption }) {
  const k = { pepsi: "dashboard", meezan: "genset", waste: "map", insurance: "map", container: "asset" }[kind] || kind;
  if (k === "app") {
    return (
      <figure className="screen screen--app">
        <div className="screen__appwrap">
          <Img src={app.src} alt={app.alt} width="1412" height="2006" />
        </div>
        {caption && <figcaption className="screen__cap">{caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="screen">
      <div className="screen__bar mono">
        <span className="screen__dot" />
        webtrack · {TITLES[kind] || TITLES[k]}
      </div>
      <div className="screen__body">{BODY[k]?.() ?? null}</div>
      {caption && <figcaption className="screen__cap">{caption}</figcaption>}
    </figure>
  );
}

const BODY = {
  map: () => <Img src={portal.vehicle.src} alt={portal.vehicle.alt} width="1140" height="872" className="screen__shot" />,
  dashboard: () => <Img src={portal.dashboard.src} alt={portal.dashboard.alt} width="1140" height="872" className="screen__shot" />,
  fuel: () => (
    <svg viewBox="0 0 600 300" className="screen__svg" role="img" aria-label="Fuel level over 24 hours with two fills and one sudden drain">
      <Grid />
      <path d="M40 220 L120 236 L126 70 L250 96 L330 112 L336 196 L430 214 L436 60 L560 92" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 220 L120 236 L126 70 L250 96 L330 112 L336 196 L430 214 L436 60 L560 92 L560 270 L40 270Z" fill="currentColor" opacity="0.06" />
      <circle cx="126" cy="70" r="6" fill="var(--ok)" />
      <circle cx="436" cy="60" r="6" fill="var(--ok)" />
      <circle cx="333" cy="154" r="7" fill="var(--signal)" />
      <line x1="333" y1="20" x2="333" y2="270" stroke="var(--signal)" strokeDasharray="4 5" />
      <g className="screen__label">
        <rect x="173" y="190" width="150" height="28" fill="var(--signal)" />
        <text x="183" y="209" fill="#fff">DRAIN −41 L · 02:10</text>
        <text x="132" y="62">FILL +160 L</text>
        <text x="442" y="52">FILL +150 L</text>
      </g>
      <Axis labels={["00:00", "06:00", "12:00", "18:00", "24:00"]} />
    </svg>
  ),
  temperature: () => (
    <svg viewBox="0 0 600 300" className="screen__svg" role="img" aria-label="Four temperature zones with a safe band; zone two rises above the limit">
      <Grid />
      <rect x="40" y="110" width="520" height="90" fill="var(--ok)" opacity="0.08" />
      <line x1="40" y1="110" x2="560" y2="110" stroke="var(--signal)" strokeDasharray="5 5" />
      <path d="M40 170 C120 160 200 175 280 165 S440 170 560 160" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.45" />
      <path d="M40 150 C110 140 200 150 260 120 S330 70 360 84 S430 150 560 146" fill="none" stroke="var(--signal)" strokeWidth="3" />
      <path d="M40 186 C140 180 240 192 340 182 S480 186 560 180" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <path d="M40 132 C150 140 250 128 350 136 S480 132 560 138" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
      <g className="screen__label">
        <rect x="300" y="36" width="168" height="28" fill="var(--signal)" />
        <text x="310" y="55" fill="#fff">ZONE 2 · 9.4 °C · 6 MIN</text>
        <text x="46" y="104">LIMIT 8 °C</text>
      </g>
      <Axis labels={["22:00", "00:00", "02:00", "04:00", "06:00"]} />
    </svg>
  ),
  genset: () => (
    <table className="screen__table">
      <thead>
        <tr>
          <th>Branch</th>
          <th>Tank</th>
          <th>Hours</th>
          <th>L/h</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Gulberg, Lahore", "78%", "6.2", "4.1", "ok"],
          ["Clifton, Karachi", "64%", "8.9", "4.4", "ok"],
          ["Blue Area, Isb", "41%", "3.1", "9.8", "alert"],
          ["Saddar, Peshawar", "88%", "2.4", "3.9", "ok"],
          ["Cantt, Multan", "55%", "7.0", "4.2", "ok"],
        ].map(([b, t, h, l, s]) => (
          <tr key={b} className={s === "alert" ? "is-alert" : ""}>
            <td>{b}</td>
            <td>
              <span className="screen__meter">
                <i style={{ width: t }} />
              </span>
              {t}
            </td>
            <td className="num">{h}</td>
            <td className="num">{l}</td>
            <td>{s === "alert" ? "Pilferage" : "Normal"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  dashcam: () => (
    <div className="screen__cam">
      <Img src={photos.driverCab.src} alt="Driver-facing camera view with a fatigue detection box" />
      <span className="screen__box" style={{ left: "34%", top: "12%", width: "26%", height: "40%" }}>
        <em className="mono">FATIGUE 0.92</em>
      </span>
      <ul className="screen__events mono">
        <li className="is-alert">00:52 · Fatigue · clip saved</li>
        <li>00:48 · Yawn</li>
        <li>00:45 · Yawn</li>
        <li>23:18 · Over-speed 96</li>
      </ul>
    </div>
  ),
  asset: () => (
    <div className="screen__cam">
      <Img src={photos.containers.src} alt="Shipping containers with a tracked container highlighted" />
      <svg viewBox="0 0 600 340" className="screen__overlay" aria-hidden="true">
        <path d="M60 300 C160 260 200 180 300 170 S470 90 540 60" fill="none" stroke="var(--sodium)" strokeWidth="3" strokeDasharray="8 7" />
        <circle cx="540" cy="60" r="9" fill="var(--signal)" />
        <circle cx="60" cy="300" r="7" fill="var(--sodium)" />
      </svg>
      <ul className="screen__events mono">
        <li>Solar · battery 86%</li>
        <li>Door · closed</li>
        <li className="is-alert">Tamper · none</li>
      </ul>
    </div>
  ),
  cctv: () => (
    <div className="screen__wall">
      {[photos.cctvWall, photos.warehouse, photos.loading, photos.lahoreNight].map((p, i) => (
        <div key={i} className="screen__feed">
          <Img src={p.src} alt="" />
          <span className="mono">CAM {String(i + 1).padStart(2, "0")}</span>
        </div>
      ))}
    </div>
  ),
  reports: () => (
    <div className="screen__reports">
      {reports.slice(0, 16).map((r, i) => (
        <span key={r} className={i === 3 ? "is-on" : ""}>
          <small className="mono">{reportGroups[r]}</small>
          {r}
        </span>
      ))}
    </div>
  ),
};

function Grid() {
  return (
    <g stroke="currentColor" opacity="0.1">
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="40" x2="560" y1={y} y2={y} />
      ))}
    </g>
  );
}

function Axis({ labels }) {
  return (
    <g className="screen__axis">
      {labels.map((l, i) => (
        <text key={l} x={40 + (i * 520) / (labels.length - 1)} y="292" textAnchor="middle">
          {l}
        </text>
      ))}
    </g>
  );
}
