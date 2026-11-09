// 29-city coverage drawn as a brand SVG: city pins placed by longitude/latitude on a faint grid.
// No country outline is drawn. CONFIRM the full city list; pins below are the cities named in the profile.
const CITIES = [
  ["Karachi", 67.0, 24.86, "r"],
  ["Hyderabad", 68.37, 25.4, "r"],
  ["Quetta", 67.0, 30.18, "l"],
  ["Multan", 71.47, 30.2, "l"],
  ["Faisalabad", 73.08, 31.42, "l"],
  ["Lahore", 74.35, 31.55, "r", true],
  ["Islamabad", 73.05, 33.68, "l"],
  ["Rawalpindi", 73.07, 33.6, "r"],
  ["Peshawar", 71.58, 34.0, "l"],
  ["Gilgit", 74.31, 35.92, "r"],
];

const X = (lon) => 40 + (lon - 61) * 52;
const Y = (lat) => 40 + (37.2 - lat) * 46;

export default function CoverageMap() {
  return (
    <svg viewBox="0 0 860 640" className="h-auto w-full" role="img" aria-label="Map of Connexis technician coverage from Karachi to Gilgit, with head office in Lahore">
      <rect width="860" height="640" rx="16" fill="#f4f5f7" />
      <g fill="#d5d8dc">
        {Array.from({ length: 34 }).flatMap((_, i) =>
          Array.from({ length: 26 }).map((_, j) => <circle key={`${i}-${j}`} cx={20 + i * 25} cy={20 + j * 24} r="1.4" />)
        )}
      </g>
      <path
        d={`M${X(67)} ${Y(24.86)} L${X(71.47)} ${Y(30.2)} L${X(74.35)} ${Y(31.55)} L${X(73.05)} ${Y(33.68)} L${X(74.31)} ${Y(35.92)}`}
        fill="none"
        stroke="#e1251b"
        strokeOpacity=".35"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      {CITIES.map(([name, lon, lat, side, hq]) => {
        const x = X(lon);
        const y = Y(lat);
        return (
          <g key={name} transform={`translate(${x} ${y})`}>
            {hq && <circle r="26" fill="#e1251b" opacity=".12" />}
            <circle r={hq ? 9 : 6} fill="#e1251b" stroke="#fff" strokeWidth="3" />
            <text
              x={side === "r" ? 14 : -14}
              y="5"
              textAnchor={side === "r" ? "start" : "end"}
              fontFamily="Inter, sans-serif"
              fontSize={hq ? 17 : 15}
              fontWeight={hq ? 700 : 500}
              fill="#1a1a1a"
            >
              {name}
              {hq ? " · HQ" : ""}
            </text>
          </g>
        );
      })}
      <text x="40" y="606" fontFamily="Inter, sans-serif" fontSize="14" fill="#5b5f66">
        Technicians in 29 cities · selected cities shown
      </text>
    </svg>
  );
}
