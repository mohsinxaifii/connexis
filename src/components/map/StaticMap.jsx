import data from "./mapData.json";

// Server-rendered first frame (and no-WebGL fallback): Pakistan's outline filled with a dot pattern.
export default function StaticMap() {
  const { outline, bbox } = data;
  const X = (lon) => ((lon - bbox.lon0) / (bbox.lon1 - bbox.lon0)) * 1000;
  const Y = (lat) => ((bbox.lat1 - lat) / (bbox.lat1 - bbox.lat0)) * 800;
  let d = "";
  for (let i = 0; i < outline.length; i += 2) d += `${i ? "L" : "M"}${X(outline[i]).toFixed(1)} ${Y(outline[i + 1]).toFixed(1)}`;
  d += "Z";
  return (
    <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" className="absolute right-[-6%] top-[8%] h-[70%] w-[78%] opacity-90 max-lg:left-[-10%] max-lg:right-auto max-lg:top-[4%] max-lg:h-[52%] max-lg:w-[120%] lg:top-[12%] lg:h-[80%] lg:w-[62%]">
      <defs>
        <pattern id="sm-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.7" fill="#efeff1" />
        </pattern>
        <clipPath id="sm-clip">
          <path d={d} />
        </clipPath>
      </defs>
      <rect width="1000" height="800" fill="url(#sm-dots)" clipPath="url(#sm-clip)" opacity=".75" />
      <path d={d} fill="none" stroke="#e1251b" strokeOpacity=".5" strokeWidth="1.5" />
    </svg>
  );
}
