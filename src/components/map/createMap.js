// WebGL renderer for the Lock-On map. Plain module: createMap(container, state) returns { destroy, frame }.
// `state` is a mutable object the GSAP timeline writes to (camera + layer amounts); this file only reads it.
import data from "./mapData.json";
import { CITIES, ROADS, SEA_ROUTE, GLSL_HEIGHT, toXZ, height, perspective, lookAt, mul, project, polyLength, pointAt, rng } from "./geo";

const VERT = `
attribute vec2 aPos;
attribute vec3 aData; // seed / t, flag, kind
uniform mat4 uPV;
uniform float uTime, uPR, uAspect, uFade;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform vec3 uFocus;     // x, z, radius
uniform float uFocusAmt, uCut, uFleet, uBranch, uSea, uCity, uRoads;
varying vec4 vColor;
varying float vRing;
${GLSL_HEIGHT}
void main(){
  float kind = aData.z;
  float seed = aData.x;
  vec2 p = aPos;
  // fleet vehicles drift on tiny loops
  if (kind > 2.5 && kind < 3.5) p += 0.012*vec2(sin(uTime*0.6+seed*30.0), cos(uTime*0.5+seed*21.0));
  vec3 w = vec3(p.x, terrain(p), p.y);
  if (kind > 3.5) w.y += 0.02;
  vec4 c = uPV*vec4(w,1.0);
  vec2 ndc = c.xy/c.w;
  float inf = uMouseOn*smoothstep(0.32,0.0,length((ndc-uMouse)*vec2(uAspect,1.0)));
  w.y += inf*inf*0.12;
  c = uPV*vec4(w,1.0);
  float depth = clamp(3.2/c.w, 0.35, 3.0);

  vec3 white = vec3(0.94,0.94,0.95);
  vec3 red = vec3(0.882,0.145,0.106);
  float a = 0.0; float size = 1.0; vec3 col = white; vRing = 0.0;
  float focus = uFocusAmt * smoothstep(uFocus.z, uFocus.z*0.35, distance(p, uFocus.xy));

  if (kind < 0.5) {               // Pakistan
    a = 0.78; size = 2.3;
    col = mix(white, red, max(focus, smoothstep(0.1,0.8,inf)));
    size += focus*1.4;
  } else if (kind < 1.5) {        // neighbours
    a = 0.13; size = 1.7;
    col = mix(white, red, smoothstep(0.1,0.8,inf)*0.7);
    a += inf*0.25;
  } else if (kind < 2.5) {        // highways with moving traffic
    float ph = fract(seed*4.0 - uTime*0.045 + aData.y*0.37);
    float pulse = smoothstep(0.86, 1.0, ph);
    a = uRoads*(0.28 + 0.72*pulse); size = 2.2 + pulse*2.6; col = red;
  } else if (kind < 3.5) {        // fleet: 300 of 700 get cut
    float cut = aData.y;
    a = uFleet * (1.0 - cut*smoothstep(0.35, 1.0, uCut));
    col = mix(white, red, cut*smoothstep(0.0, 0.5, uCut));
    size = 3.2 + cut*uCut*2.0;
  } else if (kind < 4.5) {        // branch generators
    float pul = 0.5+0.5*sin(uTime*2.4+seed*20.0);
    a = uBranch; size = 7.0 + pul*4.0; col = red; vRing = 1.0;
  } else if (kind < 5.5) {        // city pins
    a = uCity; size = 9.0; col = white; vRing = 1.0;
  } else {                        // sea route
    float d = uSea - seed;
    float trail = d >= 0.0 ? exp(-d*14.0) : 0.0;
    a = step(0.001, uSea) * (0.22 + 0.78*trail); size = 2.4 + trail*4.0; col = red;
  }
  size *= (1.0 + inf*0.8);
  gl_PointSize = size * depth * uPR;
  vColor = vec4(col, a * uFade);
  gl_Position = c;
}`;

const FRAG = `
precision mediump float;
varying vec4 vColor;
varying float vRing;
void main(){
  vec2 q = gl_PointCoord*2.0-1.0;
  float r = length(q);
  float a = (1.0 - smoothstep(0.62, 1.0, r));
  if (vRing > 0.5) {
    float ring = smoothstep(0.55,0.68,r) * (1.0 - smoothstep(0.86,1.0,r));
    float core = 1.0 - smoothstep(0.22,0.34,r);
    a = max(ring, core);
  }
  a *= vColor.a;
  gl_FragColor = vec4(vColor.rgb*a, a);
}`;

function buildPoints() {
  const out = [];
  const push = (x, z, seed, flag, kind) => out.push(x, z, seed, flag, kind);
  const { bbox, step, cols, rows, grid } = data;
  const rand = rng(11);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = grid[r * cols + c];
      if (k === "0") continue;
      if (k === "1" && (r + c) % 2) continue;
      const [x, z] = toXZ(bbox.lon0 + c * step, bbox.lat0 + r * step);
      push(x, z, rand(), 0, k === "2" ? 0 : 1);
    }
  // highways
  ROADS.forEach((road, ri) => {
    const pts = road.map(([lo, la]) => toXZ(lo, la));
    const n = Math.ceil(polyLength(pts) / 0.01);
    for (let s = 0; s <= n; s++) {
      const [x, z] = pointAt(pts, s / n);
      push(x, z, s / n, ri, 2);
    }
  });
  // fleet around South Punjab: 700 vehicles, 300 flagged as cut
  const [fx, fz] = toXZ(71.6, 29.8);
  const fr = rng(5);
  for (let i = 0; i < 700; i++) {
    const a = fr() * Math.PI * 2;
    const d = Math.sqrt(fr()) * 0.32;
    push(fx + Math.cos(a) * d * 1.2, fz + Math.sin(a) * d, fr(), i % 7 < 3 ? 1 : 0, 3);
  }
  // branch generators, weighted to the big cities
  const br = rng(9);
  [["karachi", 14], ["lahore", 12], ["islamabad", 8], ["faisalabad", 5], ["multan", 5], ["peshawar", 5], ["quetta", 3], ["hyderabad", 4], ["sialkot", 3], ["gujranwala", 3]].forEach(([c, n]) => {
    const [cx, cz] = toXZ(...CITIES[c]);
    for (let i = 0; i < n; i++) push(cx + (br() - 0.5) * 0.12, cz + (br() - 0.5) * 0.1, br(), 0, 4);
  });
  // city pins
  ["karachi", "lahore", "islamabad", "peshawar", "quetta", "multan", "faisalabad", "gilgit", "hyderabad", "sialkot"].forEach((c) => {
    const [x, z] = toXZ(...CITIES[c]);
    push(x, z, 0, 0, 5);
  });
  // sea route out of Karachi port
  const sea = SEA_ROUTE.map(([lo, la]) => toXZ(lo, la));
  const ns = Math.ceil(polyLength(sea) / 0.01);
  for (let s = 0; s <= ns; s++) {
    const [x, z] = pointAt(sea, s / ns);
    push(x, z, s / ns, 0, 6);
  }
  return new Float32Array(out);
}

export function camera(state, W, H) {
  const aspect = W / H;
  const d = state.dist;
  const pitch = state.pitch;
  const yaw = state.yaw + state.dragYaw;
  const target = [state.tx, 0, state.tz];
  const eye = [target[0] + d * Math.cos(pitch) * Math.sin(yaw), d * Math.sin(pitch), target[2] + d * Math.cos(pitch) * Math.cos(yaw)];
  const P = perspective((state.fov * Math.PI) / 180, aspect, 0.05, 40);
  // Screen offset: shift the projection so the focus sits right of the copy on desktop / above it on mobile
  P[8] -= state.offX;
  P[9] -= state.offY;
  return mul(P, lookAt(eye, target));
}

export function createMap(container, state, onFrame) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y";
  container.appendChild(canvas);
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
  if (!gl) return null;

  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const pts = buildPoints();
  const count = pts.length / 5;
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  const aData = gl.getAttribLocation(prog, "aData");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(aData);
  gl.vertexAttribPointer(aData, 3, gl.FLOAT, false, 20, 8);

  const U = {};
  ["uPV", "uTime", "uPR", "uAspect", "uFade", "uMouse", "uMouseOn", "uFocus", "uFocusAmt", "uCut", "uFleet", "uBranch", "uSea", "uCity", "uRoads"].forEach(
    (n) => (U[n] = gl.getUniformLocation(prog, n))
  );

  let W = 0, H = 0, PR = 1;
  const resize = () => {
    const r = container.getBoundingClientRect();
    PR = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * PR);
    canvas.height = Math.round(H * PR);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    mouse.ton = e.pointerType === "mouse" && e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
  };
  const onLeave = () => (mouse.ton = 0);
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  const mobile = window.innerWidth < 768;
  let t = 0;
  let last = performance.now();

  function frame(now = performance.now()) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!state.reduce) t += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    mouse.on += (mouse.ton - mouse.on) * 0.06;

    const PV = camera(state, W, H);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix4fv(U.uPV, false, PV);
    gl.uniform1f(U.uTime, t);
    gl.uniform1f(U.uPR, PR * (mobile ? 1.15 : 1));
    gl.uniform1f(U.uAspect, W / H);
    gl.uniform1f(U.uFade, state.fade);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.uniform1f(U.uMouseOn, mouse.on * state.hover);
    gl.uniform3f(U.uFocus, state.fx, state.fz, state.fr);
    gl.uniform1f(U.uFocusAmt, state.focus);
    gl.uniform1f(U.uCut, state.cut);
    gl.uniform1f(U.uFleet, state.fleet);
    gl.uniform1f(U.uBranch, state.branch);
    gl.uniform1f(U.uSea, state.sea);
    gl.uniform1f(U.uCity, state.city);
    gl.uniform1f(U.uRoads, state.roads);
    gl.drawArrays(gl.POINTS, 0, count);

    onFrame?.((lon, lat) => {
      const [x, z] = toXZ(lon, lat);
      return project(PV, x, height(x, z), z, W, H);
    }, W, H, t);
  }

  return {
    frame,
    destroy() {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    },
  };
}
