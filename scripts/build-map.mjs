// Builds src/components/map/mapData.json from Natural Earth (world-atlas 50m):
// a dot-matrix grid over Pakistan and its neighbours plus Pakistan's outline.
// Run: node scripts/build-map.mjs
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { createRequire } from "module";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const world = JSON.parse(readFileSync(require.resolve("world-atlas/countries-50m.json"), "utf8"));
const countries = feature(world, world.objects.countries).features;

const BBOX = { lon0: 56, lon1: 82, lat0: 21, lat1: 39 };
const STEP = 0.13;

const rings = (f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates);
function inPoly(lon, lat, polys) {
  for (const poly of polys) {
    let inside = false;
    const ring = poly[0];
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    if (inside) {
      let hole = false;
      for (const h of poly.slice(1)) {
        let ins = false;
        for (let i = 0, j = h.length - 1; i < h.length; j = i++) {
          const [xi, yi] = h[i];
          const [xj, yj] = h[j];
          if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) ins = !ins;
        }
        if (ins) hole = true;
      }
      if (!hole) return true;
    }
  }
  return false;
}

const pak = countries.find((c) => c.properties.name === "Pakistan");
const pakPolys = rings(pak);
const others = countries
  .filter((c) => c !== pak)
  .map((c) => ({ polys: rings(c) }))
  .filter(({ polys }) =>
    polys.some((p) => p[0].some(([x, y]) => x > BBOX.lon0 - 2 && x < BBOX.lon1 + 2 && y > BBOX.lat0 - 2 && y < BBOX.lat1 + 2))
  );

const cols = Math.round((BBOX.lon1 - BBOX.lon0) / STEP) + 1;
const rows = Math.round((BBOX.lat1 - BBOX.lat0) / STEP) + 1;
let grid = "";
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const lon = BBOX.lon0 + c * STEP;
    const lat = BBOX.lat0 + r * STEP;
    let k = "0";
    if (inPoly(lon, lat, pakPolys)) k = "2";
    else if (others.some((o) => inPoly(lon, lat, o.polys))) k = "1";
    grid += k;
  }
}

// Outline: largest Pakistan ring, decimated
const ring = pakPolys.map((p) => p[0]).sort((a, b) => b.length - a.length)[0];
const outline = [];
ring.forEach(([x, y], i) => {
  if (i % 2 === 0) outline.push(+x.toFixed(2), +y.toFixed(2));
});

mkdirSync("src/components/map", { recursive: true });
writeFileSync("src/components/map/mapData.json", JSON.stringify({ bbox: BBOX, step: STEP, cols, rows, grid, outline }));
const count = (ch) => grid.split("").filter((x) => x === ch).length;
console.log({ cols, rows, pakistan: count("2"), neighbours: count("1"), outline: outline.length / 2, bytes: grid.length });
