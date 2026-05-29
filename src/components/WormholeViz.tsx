"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLang, T } from "./lang";
import { WORMHOLE_KINDS, WormholeKind } from "./content";

/* ─── shared canvas helpers ──────────────────────────── */

function drawGrid(ctx: CanvasRenderingContext2D, W: number, H: number, alpha = 0.07) {
  ctx.strokeStyle = `rgba(54,230,255,${alpha})`;
  ctx.lineWidth = 0.8;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

function drawFunnel(
  ctx: CanvasRenderingContext2D,
  cx: number, halfH: number, topY: number, botY: number,
  throatR: number, funnelW: number,
  color: string,
) {
  const sides: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  sides.forEach(([sx, sy]) => {
    const startX = cx + sx * funnelW;
    const startY = sy < 0 ? topY : botY;
    const midY = halfH + sy * 20;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cx + sx * funnelW * 0.6, midY, cx + sx * throatR, halfH + sy * 14, cx + sx * throatR, halfH);
    ctx.stroke();
  });
}

function drawArrowAt(
  ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, len: number, color: string,
) {
  ctx.strokeStyle = color; ctx.lineWidth = 1.4;
  const tx = Math.cos(angle) * len * 0.5, ty = Math.sin(angle) * len * 0.5;
  ctx.beginPath(); ctx.moveTo(x - tx, y - ty); ctx.lineTo(x + tx, y + ty); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + tx, y + ty);
  ctx.lineTo(x + tx - 7 * Math.cos(angle - 0.4), y + ty - 7 * Math.sin(angle - 0.4));
  ctx.moveTo(x + tx, y + ty);
  ctx.lineTo(x + tx - 7 * Math.cos(angle + 0.4), y + ty - 7 * Math.sin(angle + 0.4));
  ctx.stroke();
}

function labelCenter(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.fillStyle = color; ctx.font = "11px JetBrains Mono, monospace"; ctx.textAlign = "center";
  ctx.fillText(text, x, y);
}

function useRaf(draw: (t: number) => void) {
  const rafRef = useRef<number>(0);
  useEffect(() => {
    let frame = 0;
    function loop() { draw(frame++); rafRef.current = requestAnimationFrame(loop); }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);
}

/* ─── Einstein-Rosen ─────────────────────────────────── */

function EinsteinRosenCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFn = useCallback((t: number) => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H);
    const cx = W / 2, topY = 40, botY = H - 40, halfH = H / 2;
    const throatT = (t % 180) / 180;
    const throatR = Math.max(2, 46 * (1 - throatT));
    drawFunnel(ctx, cx, halfH, topY, botY, throatR, 130, "rgba(134,241,255,0.45)");
    // faint fill
    ctx.save(); ctx.globalAlpha = 0.06; ctx.fillStyle = "#36e6ff";
    ctx.beginPath();
    ctx.moveTo(cx - 130, topY);
    ctx.bezierCurveTo(cx - 78, halfH - 20, cx - throatR, halfH - 14, cx - throatR, halfH);
    ctx.lineTo(cx + throatR, halfH);
    ctx.bezierCurveTo(cx + 78, halfH - 20, cx + 130, topY, cx + 130, topY);
    ctx.closePath(); ctx.fill(); ctx.restore();
    // collapsing throat ring
    const alpha = 0.6 + 0.4 * Math.sin(t * 0.12);
    ctx.strokeStyle = `rgba(255,93,143,${alpha})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, halfH, throatR, Math.max(1, throatR * 0.3), 0, 0, Math.PI * 2); ctx.stroke();
    labelCenter(ctx, cx, halfH + 28, "throat collapsing", `rgba(255,93,143,${0.5 + 0.3 * throatT})`);
  }, []);
  useRaf(drawFn);
  return <canvas ref={ref} width={720} height={420} className="w-full h-full" />;
}

/* ─── Morris-Thorne ──────────────────────────────────── */

function MorrisThorneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFn = useCallback((t: number) => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H);
    const cx = W / 2, topY = 40, botY = H - 40, halfH = H / 2, throatR = 30;
    drawFunnel(ctx, cx, halfH, topY, botY, throatR, 130, "rgba(134,241,255,0.6)");
    // exotic-matter glow
    const gAlpha = 0.18 + 0.12 * Math.sin(t * 0.06);
    const grad = ctx.createRadialGradient(cx, halfH, 0, cx, halfH, throatR + 24);
    grad.addColorStop(0, `rgba(134,255,208,${gAlpha * 3})`);
    grad.addColorStop(0.5, `rgba(54,230,255,${gAlpha})`);
    grad.addColorStop(1, "rgba(54,230,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.ellipse(cx, halfH, throatR + 24, (throatR + 24) * 0.38, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(134,255,208,0.85)"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(cx, halfH, throatR, throatR * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
    labelCenter(ctx, cx, halfH + 32, "exotic matter", "rgba(134,255,208,0.75)");
    // traversing dots
    for (let i = 0; i < 4; i++) {
      const p = ((i / 4) + t * 0.004) % 1;
      const py = p < 0.5 ? topY + (p / 0.5) * (halfH - topY) : halfH + ((p - 0.5) / 0.5) * (botY - halfH);
      const dotAlpha = 0.5 + 0.5 * Math.sin(p * Math.PI * 2);
      ctx.beginPath(); ctx.arc(cx, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(134,255,208,${dotAlpha})`; ctx.fill();
    }
  }, []);
  useRaf(drawFn);
  return <canvas ref={ref} width={720} height={420} className="w-full h-full" />;
}

/* ─── Kerr ring singularity ──────────────────────────── */

function KerrCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFn = useCallback((t: number) => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H, 0.06);
    const cx = W / 2, cy = H / 2, outerR = 100, ringR = 28;
    // ergosphere
    ctx.strokeStyle = "rgba(155,108,255,0.35)"; ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.ellipse(cx, cy, outerR + 30, (outerR + 30) * 0.55, t * 0.005, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    // event horizon disk
    const dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
    dg.addColorStop(0, "rgba(0,0,0,1)"); dg.addColorStop(0.75, "rgba(8,5,28,0.95)"); dg.addColorStop(1, "rgba(155,108,255,0.18)");
    ctx.fillStyle = dg;
    ctx.beginPath(); ctx.ellipse(cx, cy, outerR, outerR * 0.55, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(155,108,255,0.6)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(cx, cy, outerR, outerR * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
    // ring singularity
    const rg = ctx.createRadialGradient(cx, cy, ringR - 10, cx, cy, ringR + 18);
    rg.addColorStop(0, "rgba(255,147,182,0)"); rg.addColorStop(0.4, "rgba(255,147,182,0.55)"); rg.addColorStop(1, "rgba(255,147,182,0)");
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.ellipse(cx, cy, ringR + 18, (ringR + 18) * 0.35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,147,182,0.9)"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(cx, cy, ringR, ringR * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
    // frame-drag arrows
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2 + t * 0.018;
      const ax = cx + (outerR + 48) * Math.cos(ang);
      const ay = cy + (outerR + 48) * 0.5 * Math.sin(ang);
      drawArrowAt(ctx, ax, ay, ang + Math.PI / 2, 18, "rgba(155,108,255,0.75)");
    }
    labelCenter(ctx, cx, cy + outerR * 0.55 + 20, "ring singularity", "rgba(255,147,182,0.7)");
    labelCenter(ctx, cx, cy - outerR * 0.55 - 14, "frame-dragging", "rgba(155,108,255,0.6)");
  }, []);
  useRaf(drawFn);
  return <canvas ref={ref} width={720} height={420} className="w-full h-full" />;
}

/* ─── Gödel universe ─────────────────────────────────── */

const GODEL_CURVES = [
  { r: 55,  ry: 22, phase: 0,   color: "#9b6cff" },
  { r: 90,  ry: 35, phase: 0.4, color: "#ff93b6" },
  { r: 130, ry: 52, phase: 0.9, color: "#36e6ff" },
  { r: 165, ry: 65, phase: 1.5, color: "#ffd277" },
  { r: 200, ry: 78, phase: 2.2, color: "#86ffd0" },
];

function GodelCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFn = useCallback((t: number) => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2 + 10;
    // slowly rotating grid
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.001);
    ctx.strokeStyle = "rgba(54,230,255,0.06)"; ctx.lineWidth = 0.8;
    for (let x2 = -W; x2 < W; x2 += 40) { ctx.beginPath(); ctx.moveTo(x2, -H); ctx.lineTo(x2, H); ctx.stroke(); }
    for (let y2 = -H; y2 < H; y2 += 40) { ctx.beginPath(); ctx.moveTo(-W, y2); ctx.lineTo(W, y2); ctx.stroke(); }
    ctx.restore();
    // CTCs
    GODEL_CURVES.forEach((c) => {
      const rot = t * 0.006 + c.phase;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      ctx.strokeStyle = c.color + "99"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(0, 0, c.r, c.ry, 0, 0, Math.PI * 2); ctx.stroke();
      for (let k = 0; k < 2; k++) {
        const a = (k / 2) * Math.PI * 2;
        const px = c.r * Math.cos(a), py = c.ry * Math.sin(a);
        const tangent = Math.atan2(c.ry * Math.cos(a), -c.r * Math.sin(a));
        drawArrowAt(ctx, px, py, tangent, 10, c.color + "cc");
      }
      ctx.restore();
    });
    labelCenter(ctx, cx, cy + 6, "rotating universe", "rgba(155,108,255,0.7)");
    labelCenter(ctx, cx, cy + 22, "closed timelike curves", "rgba(255,210,119,0.65)");
  }, []);
  useRaf(drawFn);
  return <canvas ref={ref} width={720} height={420} className="w-full h-full" />;
}

/* ─── Tipler cylinder ────────────────────────────────── */

function TiplerCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawFn = useCallback((t: number) => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cylW = 52, cylTopY = 10, cylH = H - 20;
    // spiral spacetime grid
    for (let i = 0; i < 12; i++) {
      const base = (i / 12) * Math.PI * 2 + t * 0.015;
      const alpha = 0.12 + 0.1 * Math.abs(Math.cos(base));
      ctx.strokeStyle = `rgba(54,230,255,${alpha})`; ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let s = 0; s <= 80; s++) {
        const frac = s / 80;
        const twist = frac * Math.PI * 3 + base;
        const x2 = cx + Math.cos(twist) * (cylW + 80 * (1 - Math.exp(-frac * 2)));
        const y2 = cylTopY + frac * cylH;
        s === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
    // CTC loops
    for (let l = 0; l < 4; l++) {
      const yc = H * 0.3 + l * H * 0.15;
      const ph = l * 0.7 + t * 0.02;
      const loopR = 90 + l * 20;
      const alpha = 0.55 + 0.25 * Math.sin(ph);
      ctx.strokeStyle = `rgba(255,210,119,${alpha})`; ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.ellipse(cx, yc, loopR, loopR * 0.22, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      drawArrowAt(ctx,
        cx + loopR * Math.cos(ph), yc + loopR * 0.22 * Math.sin(ph),
        ph + Math.PI / 2, 10, `rgba(255,210,119,${alpha + 0.1})`
      );
    }
    // cylinder body
    const cg = ctx.createLinearGradient(cx - cylW, 0, cx + cylW, 0);
    cg.addColorStop(0, "rgba(12,11,34,0.95)"); cg.addColorStop(0.45, "rgba(39,36,85,0.75)");
    cg.addColorStop(0.55, "rgba(54,230,255,0.18)"); cg.addColorStop(1, "rgba(12,11,34,0.95)");
    ctx.fillStyle = cg; ctx.fillRect(cx - cylW, cylTopY, cylW * 2, cylH);
    ctx.strokeStyle = "rgba(54,230,255,0.5)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx - cylW, cylTopY); ctx.lineTo(cx - cylW, cylTopY + cylH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + cylW, cylTopY); ctx.lineTo(cx + cylW, cylTopY + cylH); ctx.stroke();
    ctx.strokeStyle = "rgba(54,230,255,0.4)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(cx, cylTopY, cylW, cylW * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
    labelCenter(ctx, cx, H - 8, "infinite rotating cylinder", "rgba(54,230,255,0.7)");
    labelCenter(ctx, cx, H * 0.29 - 10, "closed timelike curves", "rgba(255,210,119,0.6)");
  }, []);
  useRaf(drawFn);
  return <canvas ref={ref} width={720} height={420} className="w-full h-full" />;
}

/* ─── status helpers ─────────────────────────────────── */

function statusColor(en: string): string {
  if (en.startsWith("Mathematically valid") || en.startsWith("Allowed")) return "#86ffd0";
  if (en.includes("requires exotic matter")) return "#ffd277";
  return "#ff93b6";
}

function StatusChip({ status }: { status: string }) {
  const color = statusColor(status);
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[0.65rem] font-mono tracking-wide border"
      style={{ color, borderColor: color + "55", background: color + "18" }}
    >
      {status}
    </span>
  );
}

/* ─── canvas switcher ─────────────────────────────────── */

function VizCanvas({ id }: { id: string }) {
  switch (id) {
    case "er":     return <EinsteinRosenCanvas />;
    case "thorne": return <MorrisThorneCanvas />;
    case "kerr":   return <KerrCanvas />;
    case "godel":  return <GodelCanvas />;
    case "tipler": return <TiplerCanvas />;
    default:       return null;
  }
}

/* ─── main export ────────────────────────────────────── */

export default function WormholeViz() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<WormholeKind>(WORMHOLE_KINDS[0]);
  const handleSelect = useCallback((wk: WormholeKind) => setSelected(wk), []);
  const statusText = selected.status[lang];

  return (
    <section className="w-full py-8 space-y-6">
      {/* header */}
      <div className="space-y-1">
        <p className="label-mono"><T v={{ en: "wormhole catalogue", zh: "虫洞目录" }} /></p>
        <h2 className="display text-3xl sm:text-4xl text-ink-50">
          <T v={{ en: "Five doors in the math", zh: "数学中的五道门" }} />
        </h2>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap gap-2" role="tablist">
        {WORMHOLE_KINDS.map((wk) => {
          const active = wk.id === selected.id;
          return (
            <button
              key={wk.id}
              role="tab"
              aria-selected={active}
              onClick={() => handleSelect(wk)}
              className={[
                "px-3 py-1.5 rounded text-sm font-mono transition-all duration-200 border",
                active
                  ? "bg-void-800 text-ink-50 border-flux-500/70 shadow-[0_0_12px_-4px_rgba(54,230,255,0.5)]"
                  : "bg-void-900 text-ink-500 border-void-700 hover:text-ink-100 hover:border-flux-500/30",
              ].join(" ")}
            >
              <T v={wk.name} />
            </button>
          );
        })}
      </div>

      {/* viz + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
        {/* canvas area */}
        <div
          className="panel relative overflow-hidden rounded-xl"
          style={{ minHeight: "320px", background: "#04030d" }}
        >
          <div className="absolute inset-0">
            <VizCanvas key={selected.id} id={selected.id} />
          </div>
        </div>

        {/* sidebar */}
        <div className="panel rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h3 className="display text-lg text-ink-50 leading-snug">
              <T v={selected.name} />
            </h3>
            <p className="text-sm text-ink-300 leading-relaxed font-serif">
              <T v={selected.line} />
            </p>
          </div>
          <div className="space-y-3">
            <div className="rule-flux" />
            <div>
              <span className="label-mono text-ink-500 block mb-1.5">
                <T v={{ en: "status", zh: "状态" }} />
              </span>
              <StatusChip status={statusText} />
            </div>
            <div
              className="h-1 rounded-full w-full"
              style={{
                background: `linear-gradient(to right, ${statusColor(selected.status.en)}44, ${statusColor(selected.status.en)}cc)`,
                boxShadow: `0 0 8px -2px ${statusColor(selected.status.en)}88`,
              }}
            />
          </div>
        </div>
      </div>

      {/* caveat */}
      <p className="text-xs text-ink-500 leading-relaxed max-w-2xl border-l-2 border-void-600 pl-4">
        <T
          v={{
            en: "Allowed by general relativity. None observed as a time machine. Engineering would require exotic conditions or energies beyond current physics.",
            zh: "广义相对论允许。未观测到任何作为时间机器者。工程化需要超出当前物理的奇异条件或能量。",
          }}
        />
      </p>
    </section>
  );
}
