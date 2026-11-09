// Geography + camera maths shared by the map shader and the DOM overlay (labels, reticle).

export const CITIES = {
  karachi: [67.01, 24.86],
  hyderabad: [68.37, 25.4],
  sukkur: [68.86, 27.7],
  jacobabad: [68.44, 28.28],
  multan: [71.47, 30.2],
  bahawalpur: [71.68, 29.4],
  faisalabad: [73.08, 31.42],
  lahore: [74.35, 31.55],
  gujranwala: [74.19, 32.16],
  sialkot: [74.53, 32.49],
  islamabad: [73.05, 33.68],
  peshawar: [71.58, 34.01],
  quetta: [67.0, 30.18],
  khuzdar: [66.6, 27.8],
  gilgit: [74.31, 35.92],
  abbottabad: [73.21, 34.15],
  chilas: [74.1, 35.42],
  gwadar: [62.33, 25.13],
  ormara: [64.63, 25.21],
  dikhan: [70.9, 31.83],
};

// Cities named in the Connexis profile get a label on the map.
export const LABELS = [
  ["Karachi", "karachi"],
  ["Lahore", "lahore"],
  ["Islamabad", "islamabad"],
  ["Peshawar", "peshawar"],
  ["Quetta", "quetta"],
  ["Multan", "multan"],
  ["Faisalabad", "faisalabad"],
  ["Gilgit", "gilgit"],
];

// Major highway corridors, drawn as glowing traffic
const C = CITIES;
export const ROADS = [
  [C.karachi, C.hyderabad, C.sukkur, C.multan, C.lahore, C.gujranwala, C.islamabad, C.peshawar], // N5
  [C.multan, C.faisalabad, C.islamabad], // M4 / M2
  [C.karachi, C.khuzdar, C.quetta], // N25
  [C.islamabad, C.abbottabad, C.chilas, C.gilgit], // KKH
  [C.karachi, C.ormara, C.gwadar], // coastal
  [C.quetta, C.jacobabad, C.sukkur], // N65
  [C.lahore, C.sialkot], // M11
  [C.multan, C.dikhan, C.peshawar], // Indus
];

export const SEA_ROUTE = [C.karachi, [66.2, 24.2], [64.6, 23.4], [62.4, 22.6], [60.0, 22.0]];

const ORIGIN = [69.6, 30.2];
const KX = 0.16;
const KZ = 0.185;
export const toXZ = (lon, lat) => [(lon - ORIGIN[0]) * KX, -(lat - ORIGIN[1]) * KZ];

// Terrain: the north rises into the Hindu Kush / Karakoram. Mirrored in the vertex shader.
export function height(x, z) {
  const north = Math.min(1, Math.max(0, (-z - 0.55) / 0.6));
  const n = north * north * (3 - 2 * north);
  return 0.24 * n * (0.55 + 0.45 * Math.sin(x * 9.0) * Math.cos(z * 7.0)) + 0.012 * Math.sin(x * 20.0 + z * 17.0);
}

export const GLSL_HEIGHT = `
float terrain(vec2 p){
  float north = clamp((-p.y - 0.55) / 0.6, 0.0, 1.0);
  float n = north*north*(3.0-2.0*north);
  return 0.24*n*(0.55+0.45*sin(p.x*9.0)*cos(p.y*7.0)) + 0.012*sin(p.x*20.0+p.y*17.0);
}`;

/* ---- mat4 helpers (column-major) ---- */
export function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

export function lookAt(e, c) {
  let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
  let l = Math.hypot(zx, zy, zz);
  zx /= l; zy /= l; zz /= l;
  let xx = zz, xy = 0, xz = -zx; // up = (0,1,0)
  l = Math.hypot(xx, xy, xz) || 1;
  xx /= l; xz /= l;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
    -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1]);
}

export function mul(a, b) {
  const o = new Float32Array(16);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
      o[i * 4 + j] = s;
    }
  return o;
}

export function project(m, x, y, z, W, H) {
  const cx = m[0] * x + m[4] * y + m[8] * z + m[12];
  const cy = m[1] * x + m[5] * y + m[9] * z + m[13];
  const cw = m[3] * x + m[7] * y + m[11] * z + m[15];
  return { x: (cx / cw * 0.5 + 0.5) * W, y: (1 - (cy / cw * 0.5 + 0.5)) * H, w: cw };
}

export function polyLength(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return L;
}

export function pointAt(pts, f) {
  let d = Math.min(1, Math.max(0, f)) * polyLength(pts);
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (d <= l) {
      const k = l ? d / l : 0;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
    }
    d -= l;
  }
  return pts[pts.length - 1];
}

// Seeded random so the server and client agree
export function rng(seed = 7) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
