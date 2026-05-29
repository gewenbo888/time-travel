"use client";

import { useEffect, useRef } from "react";
import { useLang, T } from "./lang";
import { BLACKHOLE_LAYERS } from "./content";

/* A black hole, rendered from its parts: a starfield lensed by gravity, a tilted
   accretion disk glowing in X-ray heat (Doppler-brightened on its approaching
   side), a thin photon ring of light that looped the hole, the black event
   horizon, and a faint shimmer of Hawking radiation escaping the edge. */

export default function BlackHole() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    let stars: { x: number; y: number; r: number; ph: number }[] = [];
    const hawk: { a: number; r: number; life: number }[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = [];
      const n = w < 768 ? 90 : 170;
      for (let i = 0; i < n; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2, ph: Math.random() * 6.28 });
    }
    resize();

    function frame() {
      t += 1;
      const cx = w / 2, cy = h / 2;
      const Rh = Math.min(w, h) * 0.13; // horizon radius
      ctx!.clearRect(0, 0, w, h);

      // lensed starfield — push stars away from the hole a little
      for (const s of stars) {
        const dx = s.x - cx, dy = s.y - cy;
        const d = Math.hypot(dx, dy) + 0.01;
        const push = Math.min(40, (Rh * Rh * 1.4) / d);
        const lx = s.x + (dx / d) * push;
        const ly = s.y + (dy / d) * push;
        const a = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.02 + s.ph));
        if (d > Rh * 1.05) {
          ctx!.fillStyle = `rgba(200,220,255,${a})`;
          ctx!.beginPath(); ctx!.arc(lx, ly, s.r, 0, Math.PI * 2); ctx!.fill();
        }
      }

      ctx!.save();
      ctx!.translate(cx, cy);

      // accretion disk — tilted ellipse, drawn as many arcs with heat colour + Doppler
      const tilt = 0.34;
      for (let i = 0; i < 220; i++) {
        const ang = (i / 220) * Math.PI * 2 + t * 0.01;
        const rad = Rh * (1.55 + 1.5 * ((i * 97) % 60) / 60);
        const x = Math.cos(ang) * rad;
        const y = Math.sin(ang) * rad * tilt;
        // Doppler: brighter on the left (approaching)
        const doppler = 0.45 + 0.55 * (0.5 - Math.cos(ang) * 0.5);
        const heat = rad < Rh * 2 ? "255,227,166" : "255,150,90";
        ctx!.fillStyle = `rgba(${heat},${(0.5 * doppler).toFixed(2)})`;
        ctx!.beginPath(); ctx!.arc(x, y, 1.5, 0, Math.PI * 2); ctx!.fill();
      }

      // the bright arc of the disk lensed up over the top
      ctx!.globalCompositeOperation = "lighter";
      ctx!.strokeStyle = "rgba(255,210,119,0.5)";
      ctx!.lineWidth = 3;
      ctx!.beginPath(); ctx!.arc(0, 0, Rh * 1.9, Math.PI * 1.08, Math.PI * 1.92); ctx!.stroke();

      // photon ring — thin, bright, just outside the horizon
      ctx!.strokeStyle = "rgba(134,241,255,0.85)";
      ctx!.lineWidth = 1.6;
      ctx!.beginPath(); ctx!.arc(0, 0, Rh * 1.18, 0, Math.PI * 2); ctx!.stroke();
      ctx!.globalCompositeOperation = "source-over";

      // event horizon — pure black with a faint rim
      const g = ctx!.createRadialGradient(0, 0, Rh * 0.6, 0, 0, Rh * 1.1);
      g.addColorStop(0, "#000000");
      g.addColorStop(0.86, "#000000");
      g.addColorStop(1, "rgba(0,0,0,0.2)");
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(0, 0, Rh * 1.08, 0, Math.PI * 2); ctx!.fill();

      // Hawking radiation — rare faint motes escaping
      if (t % 14 === 0) hawk.push({ a: Math.random() * 6.28, r: Rh * 1.12, life: 1 });
      for (let i = hawk.length - 1; i >= 0; i--) {
        const p = hawk[i];
        p.r += 0.7; p.life -= 0.012;
        if (p.life <= 0) { hawk.splice(i, 1); continue; }
        ctx!.fillStyle = `rgba(196,171,255,${(p.life * 0.7).toFixed(2)})`;
        ctx!.beginPath(); ctx!.arc(Math.cos(p.a) * p.r, Math.sin(p.a) * p.r, 1.2, 0, Math.PI * 2); ctx!.fill();
      }

      ctx!.restore();
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();
    if (reduce) for (let i = 0; i < 60; i++) frame();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="panel rounded-2xl p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
        <div className="overflow-hidden rounded-xl border border-plasm-500/15 bg-black">
          <canvas ref={ref} className="h-72 w-full md:h-96" aria-hidden />
        </div>
        <div>
          <div className="label-mono">{lang === "zh" ? "由内而外的解剖" : "anatomy, inside out"}</div>
          <ul className="mt-4 space-y-3">
            {BLACKHOLE_LAYERS.map((l, i) => (
              <li key={i} className="rounded-lg border border-ink-100/10 bg-void-900/50 p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }} />
                  <span className="display text-sm text-ink-50"><T v={l.name} /></span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-400"><T v={l.desc} /></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
