import Image from "next/image";

// Cover art for case-study tiles and galleries. These are brand illustrations standing in until the
// project photos arrive (spec §8.2); pass `image` to show a real photo instead.
export default function CaseCover({ kind, image, alt = "", className = "", sizes = "(min-width: 1024px) 50vw, 100vw" }) {
  if (image) {
    return <Image src={image} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />;
  }
  const Art = ART[kind] || ART.pepsi;
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#16171a] ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={`cg-${kind}`} cx="70%" cy="30%" r="70%">
            <stop offset="0" stopColor="#2a2c31" />
            <stop offset="1" stopColor="#141518" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill={`url(#cg-${kind})`} />
        <Grid />
        <Art />
      </svg>
    </div>
  );
}

function Grid() {
  return (
    <g stroke="#ffffff" strokeOpacity=".05">
      {Array.from({ length: 17 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
      ))}
    </g>
  );
}

const R = "#e1251b";

const ART = {
  // 700 dots thinning to 400: a fleet getting leaner
  pepsi: function Pepsi() {
    const dots = [];
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 25; c++) {
        const x = 40 + c * 30;
        const y = 70 + r * 30;
        const cut = (c * 7 + r * 13) % 7 < 3 && c > 8;
        dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={cut ? 3 : 4.5} fill={cut ? "#3a3d43" : c > 16 ? R : "#cfd2d6"} opacity={cut ? 1 : c > 16 ? 0.9 : 0.55} />);
      }
    }
    return (
      <g>
        {dots}
        <path d="M40 520 C 220 440, 380 520, 520 380 S 720 260, 780 120" stroke={R} strokeWidth="3" fill="none" />
      </g>
    );
  },
  meezan: function Meezan() {
    const pts = [[0, 300], [90, 290], [100, 160], [260, 230], [270, 120], [420, 200], [430, 110], [590, 190], [600, 100], [800, 170]];
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y + 140}`).join("");
    return (
      <g>
        <path d={`${d}L800 600L0 600Z`} fill="#ffffff" opacity=".06" />
        <path d={d} stroke="#cfd2d6" strokeWidth="3" fill="none" strokeLinejoin="round" />
        {[[100, 300], [270, 260], [430, 250], [600, 240]].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <circle r="16" fill={R} opacity=".2" />
            <circle r="6" fill={R} />
          </g>
        ))}
        <g transform="translate(560 70)" fill="none" stroke="#cfd2d6" strokeOpacity=".6" strokeWidth="2">
          <rect width="170" height="110" rx="10" />
          <rect x="20" y="22" width="56" height="66" rx="4" />
          <path d="M100 30h50M100 50h50M100 70h34" />
        </g>
      </g>
    );
  },
  waste: function Waste() {
    return (
      <g>
        <g stroke="#cfd2d6" strokeOpacity=".22" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M0 160H800M0 320H800M0 470H800M150 0V600M380 0V600M610 0V600" />
        </g>
        <path d="M60 160H380V320H610V470H760" stroke={R} strokeWidth="4" fill="none" strokeLinejoin="round" />
        <path d="M150 600V320H380" stroke="#cfd2d6" strokeWidth="3" strokeDasharray="10 10" fill="none" />
        {[[380, 220], [610, 400], [250, 320]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="13" fill="#16171a" />
            <circle r="8" fill={i === 0 ? R : "#cfd2d6"} />
          </g>
        ))}
      </g>
    );
  },
  cctv: function Cctv() {
    return (
      <g>
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 70 + (i % 4) * 170;
          const y = 80 + Math.floor(i / 4) * 140;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width="150" height="120" rx="6" fill="#22252a" stroke={i === 5 ? R : "#34373d"} strokeWidth={i === 5 ? 3 : 1.5} />
              <path d={`M0 ${86 - (i % 3) * 8}L${50 + (i % 4) * 14} 52L150 ${74 - (i % 2) * 14}V120H0Z`} fill="#2d3036" />
              <circle cx="136" cy="14" r="4" fill={i === 5 ? R : "#5b5f66"} />
            </g>
          );
        })}
      </g>
    );
  },
  insurance: function Insurance() {
    return (
      <g>
        <path d="M400 110 L540 160 V290 C540 380 470 440 400 470 C330 440 260 380 260 290 V160 Z" fill="none" stroke="#cfd2d6" strokeOpacity=".5" strokeWidth="4" />
        <g transform="translate(400 290)">
          <circle r="70" fill={R} opacity=".12" />
          <circle r="34" fill="none" stroke={R} strokeWidth="5" />
          <path d="M0 -62V-38M0 38V62M-62 0H-38M38 0H62" stroke={R} strokeWidth="5" strokeLinecap="round" />
          <circle r="9" fill="#cfd2d6" />
        </g>
        {[[140, 180], [660, 220], [180, 450], [640, 470], [100, 330], [700, 360]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#cfd2d6" opacity=".5" />
        ))}
      </g>
    );
  },
  container: function Container() {
    return (
      <g>
        <g transform="translate(170 230)">
          <rect width="460" height="210" rx="6" fill="#2a2d33" stroke="#4a4e56" strokeWidth="2" />
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={20 + i * 29} y1="14" x2={20 + i * 29} y2="196" stroke="#3a3e45" strokeWidth="6" />
          ))}
          <g transform="translate(300 -46)">
            <rect width="120" height="40" rx="4" fill="#1a1a1a" stroke="#cfd2d6" strokeOpacity=".6" strokeWidth="2" />
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={i} x1={20 + i * 20} y1="4" x2={20 + i * 20} y2="36" stroke="#cfd2d6" strokeOpacity=".3" />
            ))}
            <circle cx="60" cy="58" r="8" fill={R} />
          </g>
        </g>
        <g transform="translate(560 120)" stroke="#cfd2d6" strokeOpacity=".5" strokeWidth="3" fill="none">
          <circle r="26" />
          <path d="M0 -44v-12M0 44v12M-44 0h-12M44 0h12M-31 -31l-9 -9M31 31l9 9M-31 31l-9 9M31 -31l9 -9" />
        </g>
        <path d="M0 500 Q 200 470 400 500 T 800 500" stroke="#cfd2d6" strokeOpacity=".2" strokeWidth="3" fill="none" />
      </g>
    );
  },
  fuel: function Tanker() {
    return (
      <g>
        <path d="M0 470 L800 380" stroke="#cfd2d6" strokeOpacity=".18" strokeWidth="60" />
        <path d="M0 470 L800 380" stroke="#cfd2d6" strokeOpacity=".35" strokeWidth="2" strokeDasharray="24 20" />
        <g transform="translate(250 270) rotate(-6.4)">
          <rect x="0" y="0" width="300" height="110" rx="55" fill="#2a2d33" stroke="#4a4e56" strokeWidth="2" />
          <rect x="300" y="20" width="90" height="90" rx="10" fill="#22252a" stroke="#4a4e56" strokeWidth="2" />
          <rect x="22" y="30" width="256" height="50" rx="25" fill="none" stroke="#3a3e45" strokeWidth="2" />
          <rect x="22" y="48" width="150" height="32" rx="16" fill={R} opacity=".85" />
          {[60, 220, 340].map((x) => (
            <circle key={x} cx={x} cy="122" r="18" fill="#141518" stroke="#4a4e56" strokeWidth="3" />
          ))}
        </g>
        <g transform="translate(620 120)">
          <circle r="54" fill="none" stroke="#cfd2d6" strokeOpacity=".35" strokeWidth="3" />
          <path d="M-38 24 A46 46 0 1 1 38 24" fill="none" stroke="#cfd2d6" strokeOpacity=".5" strokeWidth="6" strokeLinecap="round" />
          <path d="M0 0 L-26 -22" stroke={R} strokeWidth="5" strokeLinecap="round" />
          <circle r="7" fill={R} />
        </g>
      </g>
    );
  },
};
