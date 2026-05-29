"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, T } from "./lang";

/* Gravity as geometry. A grid sheet of spacetime is warped into a well by a
   central mass; a body orbits by coasting along the curved sheet — not pulled by
   a force, but following the straightest available path through bent space. Raise
   the mass and the well deepens, the orbit tightens and precesses. */

export default function GravityWell() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(55);
  const massRef = useRef(mass);
  massRef.current = mass;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function project(u: number, v: number, depth: number): [number, number] {
      // u,v in [-1,1] plane; perspective tilt + a central dip
      const cx = w / 2, cy = h * 0.46;
      const r = Math.sqrt(u * u + v * v);
      const dip = depth / (1 + r * r * 6);
      const sx = cx + u * w * 0.46;
      const sy = cy + v * h * 0.28 + dip;
      return [sx, sy];
    }

    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);
      const depth = 30 + (massRef.current / 100) * (h * 0.42);
      const STEP = 0.142;

      ctx!.lineWidth = 1;
      // grid lines along v
      for (let u = -1; u <= 1.001; u += STEP) {
        ctx!.beginPath();
        for (let v = -1; v <= 1.001; v += 0.05) {
          const [x, y] = project(u, v, depth);
          if (v <= -1 + 1e-9) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = "rgba(54,230,255,0.16)";
        ctx!.stroke();
      }
      // grid lines along u
      for (let v = -1; v <= 1.001; v += STEP) {
        ctx!.beginPath();
        for (let u = -1; u <= 1.001; u += 0.05) {
          const [x, y] = project(u, v, depth);
          if (u <= -1 + 1e-9) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = "rgba(155,108,255,0.13)";
        ctx!.stroke();
      }

      // central mass
      const [mx, my] = project(0, 0, depth);
      ctx!.globalCompositeOperation = "lighter";
      const mg = ctx!.createRadialGradient(mx, my, 0, mx, my, 38);
      mg.addColorStop(0, "rgba(255,227,166,0.95)");
      mg.addColorStop(0.4, "rgba(255,210,119,0.4)");
      mg.addColorStop(1, "rgba(255,210,119,0)");
      ctx!.fillStyle = mg;
      ctx!.beginPath(); ctx!.arc(mx, my, 38, 0, Math.PI * 2); ctx!.fill();
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "#ffe3a6";
      ctx!.beginPath(); ctx!.arc(mx, my, 7, 0, Math.PI * 2); ctx!.fill();

      // orbiting body: precessing ellipse, faster when closer to mass
      const speed = 0.012 + (massRef.current / 100) * 0.02;
      const theta = t * speed;
      const prec = theta * 0.12; // precession
      const a = 0.62, e = 0.45;
      const rr = (a * (1 - e * e)) / (1 + e * Math.cos(theta));
      const ou = rr * Math.cos(theta + prec);
      const ov = rr * Math.sin(theta + prec);
      const [ox, oy] = project(ou, ov, depth);
      // trail
      ctx!.strokeStyle = "rgba(134,241,255,0.25)";
      ctx!.beginPath();
      for (let s = 0; s < 64; s++) {
        const th = theta - s * 0.06;
        const r2 = (a * (1 - e * e)) / (1 + e * Math.cos(th));
        const [tx, ty] = project(r2 * Math.cos(th + prec), r2 * Math.sin(th + prec), depth);
        if (s === 0) ctx!.moveTo(tx, ty); else ctx!.lineTo(tx, ty);
      }
      ctx!.stroke();
      ctx!.fillStyle = "#86f1ff";
      ctx!.beginPath(); ctx!.arc(ox, oy, 4.5, 0, Math.PI * 2); ctx!.fill();

      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();
    if (reduce) for (let i = 0; i < 80; i++) frame();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="panel rounded-2xl p-5 md:p-8">
      <div className="overflow-hidden rounded-xl border border-flux-500/15 bg-void-950/40">
        <canvas ref={ref} className="h-72 w-full md:h-80" aria-hidden />
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center">
        <div>
          <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500">
            <span>{lang === "zh" ? "中心质量" : "central mass"}</span>
            <span className="text-gold-300">{mass}%</span>
          </div>
          <input type="range" min={5} max={100} value={mass} onChange={(e) => setMass(Number(e.target.value))}
            className="mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent" style={{ accentColor: "#ffd277" }} aria-label="mass" />
        </div>
        <p className="text-sm leading-relaxed text-ink-300">
          {lang === "zh"
            ? "这颗轨道上的小球没有被任何拉力牵引。它只是沿着质量在时空中压出的凹陷，走着它能走的最直的路。把这叫作『引力』，不过是给『沿弯曲几何的自由滑行』起的名字。质量越大，凹陷越深，轨道越紧、进动越明显——正是水星近日点进动所揭示的效应。"
            : "The orbiting marble is not being tugged by any force. It is simply taking the straightest path available along the dimple that mass has pressed into spacetime. Calling that 'gravity' is just a name for free coasting through curved geometry. More mass means a deeper well, a tighter orbit and visible precession — the very effect seen in the perihelion of Mercury."}
        </p>
      </div>
    </div>
  );
}
