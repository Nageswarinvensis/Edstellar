"use client";

import { useEffect, useRef } from "react";

import Box from "@/components/ui/Box";

/*
 * The "Training Delivered Across the Globe" wireframe globe — a port of the
 * design's canvas globe (`etl-testing-training` → `#whyGlobe`).
 *
 * Navy hairline sphere on paper; lime is the single glow: region pins and
 * pulses travelling along delivery arcs between regions. Navy label pills name
 * the regions facing the viewer (front-most wins a label collision). It spins
 * slowly, leans a little toward the pointer inside its section, and pauses off
 * screen. Reduced motion: one still frame, no spin, no pulses.
 *
 * Decorative (`aria-hidden`); the figure's caption and its screen-reader
 * region list carry the meaning. Colours come from the theme tokens
 * (`--color-navy`, `--color-lime`, `--color-paper`), read at runtime.
 */

const D2R = Math.PI / 180;
const CFG = {
  meridians: 24,
  parallels: 12,
  res: 96,
  pitch: 22,
  roll: -12,
  spin: 7,
  zoom: 0.78,
  frontW: 0.85,
  backW: 0.8,
  backA: 0.12,
  edge: 0.2,
  pull: 10,
  ease: 0.08,
};
const BK = 14;

/** lat/lon → unit sphere (y up, east to the right when facing the viewer). */
function ll(lat, lon) {
  const a = lat * D2R;
  const o = lon * D2R;
  return [Math.cos(a) * Math.cos(o), Math.sin(a), -Math.cos(a) * Math.sin(o)];
}

const REGIONS = [
  ["North America", 42, -100],
  ["Latin America", -12, -58],
  ["Europe", 50, 12],
  ["Middle East", 25, 48],
  ["Africa", 2, 21],
  ["India", 21, 79],
  ["Southeast Asia", 6, 108],
  ["East Asia", 36, 125],
  ["Australia & NZ", -27, 140],
].map(([label, lat, lon]) => ({ label, p: ll(lat, lon) }));

/** Delivery arcs between hubs (indices into REGIONS), lifted off the sphere. */
const ARCS = [[0, 2], [2, 3], [3, 5], [5, 6], [6, 8], [5, 7], [2, 4], [0, 1], [2, 5], [7, 8]].map(([ai, bi], i) => {
  const A = REGIONS[ai].p;
  const B = REGIONS[bi].p;
  const n = 48;
  const dot = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
  const om = Math.acos(Math.max(-1, Math.min(1, dot)));
  const so = Math.sin(om);
  const pts = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const s1 = Math.sin((1 - t) * om) / so;
    const s2 = Math.sin(t * om) / so;
    const lift = 1 + 0.12 * om * Math.sin(Math.PI * t);
    pts.push([(A[0] * s1 + B[0] * s2) * lift, (A[1] * s1 + B[1] * s2) * lift, (A[2] * s1 + B[2] * s2) * lift]);
  }
  return { pts, off: i * 0.37 };
});

/** Meridians and parallels, as point lists on the unit sphere. */
const LINES = (() => {
  const lines = [];
  const N = CFG.res;
  for (let i = 0; i < CFG.meridians; i++) {
    const lon = (i / CFG.meridians) * 2 * Math.PI;
    const m = [];
    for (let k = 0; k <= N; k++) {
      const la = (k / N) * Math.PI;
      m.push([Math.sin(la) * Math.cos(lon), Math.cos(la), Math.sin(la) * Math.sin(lon)]);
    }
    lines.push(m);
  }
  for (let j = 1; j <= CFG.parallels; j++) {
    const lat = (j / (CFG.parallels + 1)) * Math.PI;
    const pr = [];
    for (let k = 0; k <= N; k++) {
      const lo = (k / N) * 2 * Math.PI;
      pr.push([Math.sin(lat) * Math.cos(lo), Math.cos(lat), Math.sin(lat) * Math.sin(lo)]);
    }
    lines.push(pr);
  }
  return lines;
})();

function mul(a, b) {
  const o = new Array(9);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) o[3 * r + c] = a[3 * r] * b[c] + a[3 * r + 1] * b[3 + c] + a[3 * r + 2] * b[6 + c];
  return o;
}
function rot(p, y, r) {
  const cp = Math.cos(p * D2R), sp = Math.sin(p * D2R);
  const cy = Math.cos(y * D2R), sy = Math.sin(y * D2R);
  const cr = Math.cos(r * D2R), sr = Math.sin(r * D2R);
  return mul([cr, -sr, 0, sr, cr, 0, 0, 0, 1], mul([1, 0, 0, 0, cp, -sp, 0, sp, cp], [cy, 0, sy, 0, 1, 0, -sy, 0, cy]));
}
function sm(t) {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
}

export default function WhyGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext?.("2d");
    if (!canvas || !ctx) return undefined;

    const root = getComputedStyle(document.documentElement);
    const token = (name) => root.getPropertyValue(name).trim();
    const NAVY = token("--color-navy");
    const LIME = token("--color-lime");
    const PAPER = token("--color-paper");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = canvas.closest("section");

    let W = 1, H = 1;
    let tx = 0, ty = 0, px = 0, py = 0;
    let yaw = 250; // start with Europe / Africa / India facing the viewer
    let clock = 0;
    let running = false, last = 0, raf = 0;

    function draw(dt) {
      if (!reduce) {
        yaw += CFG.spin * dt;
        clock += dt;
      }
      px += (tx - px) * CFG.ease;
      py += (ty - py) * CFG.ease;
      const M = rot(CFG.pitch + py * CFG.pull, yaw + px * CFG.pull, CFG.roll);
      const R = 0.5 * Math.min(W, H) * CFG.zoom, cx = W / 2, cy = H / 2;
      const P = (v) => [
        cx + (M[0] * v[0] + M[1] * v[1] + M[2] * v[2]) * R,
        cy - (M[3] * v[0] + M[4] * v[1] + M[5] * v[2]) * R,
        M[6] * v[0] + M[7] * v[1] + M[8] * v[2],
      ];
      ctx.clearRect(0, 0, W, H);

      // soft lime halo behind the sphere
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(200,241,53,0.10)");
      g.addColorStop(1, "rgba(200,241,53,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // grid, bucketed by facing so each opacity band strokes once
      const paths = Array.from({ length: BK }, () => new Path2D());
      const inv = 1 / (2 * CFG.edge);
      LINES.forEach((pts) => {
        let prev = null, pb = -1;
        pts.forEach((v) => {
          const q = P(v);
          const b = Math.round(sm((q[2] + CFG.edge) * inv) * (BK - 1));
          if (prev) {
            const pa = paths[Math.max(b, pb)];
            pa.moveTo(prev[0], prev[1]);
            pa.lineTo(q[0], q[1]);
          }
          prev = q;
          pb = b;
        });
      });
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = NAVY;
      for (let b = 0; b < BK; b++) {
        const t = b / (BK - 1);
        ctx.globalAlpha = (CFG.backA + (1 - CFG.backA) * t) * 0.55;
        ctx.lineWidth = CFG.backW + (CFG.frontW - CFG.backW) * t;
        ctx.stroke(paths[b]);
      }

      // delivery arcs: navy dashed on the front face, a lime pulse travelling each
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ARCS.forEach((arc) => {
        const q = arc.pts.map(P);
        for (let s = 1; s < q.length; s++) {
          const a = sm((Math.min(q[s][2], q[s - 1][2]) + 0.05) / 0.3);
          if (a < 0.02) continue;
          ctx.globalAlpha = a * 0.5;
          ctx.beginPath();
          ctx.moveTo(q[s - 1][0], q[s - 1][1]);
          ctx.lineTo(q[s][0], q[s][1]);
          ctx.stroke();
        }
        if (reduce) return;
        const u = (clock * 0.22 + arc.off) % 1;
        const h = q[Math.floor(u * (q.length - 1))];
        const ha = sm((h[2] + 0.05) / 0.3);
        if (ha < 0.02) return;
        ctx.save();
        ctx.setLineDash([]);
        ctx.globalAlpha = ha;
        ctx.shadowColor = LIME;
        ctx.shadowBlur = 10;
        ctx.fillStyle = LIME;
        ctx.beginPath();
        ctx.arc(h[0], h[1], 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.setLineDash([]);

      // region pins: lime glow dot + navy stem + navy label pill; front-most labels win collisions
      const fs = Math.max(9, Math.min(11, R / 18));
      ctx.font = `500 ${fs}px "DM Mono", ui-monospace, monospace`;
      const vis = REGIONS.map((r) => ({ r, q: P(r.p) }))
        .filter((o) => o.q[2] > 0.02)
        .sort((a, b) => b.q[2] - a.q[2]);
      const boxes = [];
      const draws = [];
      vis.forEach((o) => {
        const q = o.q;
        const a = sm((q[2] - 0.02) / 0.35);
        const label = o.r.label.toUpperCase();
        const pw = ctx.measureText(label).width + 16;
        const ph = fs + 10;
        const bx = Math.max(2, Math.min(W - pw - 2, q[0] - pw / 2));
        const by = Math.max(2, q[1] - 14 - ph);
        const box = [bx - 3, by - 3, bx + pw + 3, q[1] + 6];
        const hit =
          sm((q[2] - 0.12) / 0.2) < 0.98 || boxes.some((k) => !(box[2] < k[0] || box[0] > k[2] || box[3] < k[1] || box[1] > k[3]));
        if (!hit) boxes.push(box);
        draws.push({ q, a, show: !hit, bx, by, pw, ph, label });
      });
      draws.reverse().forEach((o) => {
        const q = o.q;
        if (o.show) {
          ctx.globalAlpha = o.a;
          ctx.strokeStyle = NAVY;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(q[0], q[1] - 4);
          ctx.lineTo(Math.max(o.bx + 6, Math.min(o.bx + o.pw - 6, q[0])), o.by + o.ph);
          ctx.stroke();
          ctx.fillStyle = NAVY;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(o.bx, o.by, o.pw, o.ph, o.ph / 2);
          else ctx.rect(o.bx, o.by, o.pw, o.ph);
          ctx.fill();
          ctx.fillStyle = PAPER;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(o.label, o.bx + o.pw / 2, o.by + o.ph / 2 + 0.5);
        }
        ctx.save();
        ctx.globalAlpha = o.a;
        ctx.shadowColor = LIME;
        ctx.shadowBlur = reduce ? 6 : 8 + 4 * Math.sin(clock * 2.4 + q[0]);
        ctx.fillStyle = LIME;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = o.a;
        ctx.strokeStyle = NAVY;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 4, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(0);
    }

    function loop(now) {
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
      last = now;
      draw(dt);
      if (running) raf = requestAnimationFrame(loop);
    }
    function setOn(on) {
      if (reduce) return;
      if (on && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!on && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    if (!reduce && section) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas);
    else window.addEventListener("resize", resize);
    resize();
    document.fonts?.ready?.then(() => {
      if (!running) draw(0);
    });

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => entries.forEach((e) => setOn(e.isIntersecting)), { threshold: 0.02 });
      io.observe(canvas);
    } else setOn(true);

    return () => {
      setOn(false);
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      section?.removeEventListener("pointermove", onMove);
      section?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Box className="relative aspect-square w-[min(500px,100%)] text-navy">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full" />
    </Box>
  );
}
