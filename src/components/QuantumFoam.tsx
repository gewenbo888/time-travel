"use client";

import { useEffect, useRef } from "react";
import { useLang, T } from "./lang";
import { UNIFICATION } from "./content";

/* Quantum foam. At the Planck scale, the smooth sheet of spacetime is expected to
   seethe — virtual geometry bubbling in and out of existence, distances and
   topology fluctuating. A jittering lattice with bubbles that pop into being and
   vanish, suggesting a fabric that is anything but smooth up close. */

export default function QuantumFoam() {
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
    const bubbles: { x: number; y: number; r: number; life: number; max: number; c: string }[] = [];
    const COLORS = ["134,241,255", "155,108,255", "255,210,119", "255,93,143"];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);

      // jittering lattice
      const GAP = 26;
      ctx!.strokeStyle = "rgba(120,128,180,0.16)";
      ctx!.lineWidth = 1;
      for (let y = GAP / 2; y < h; y += GAP) {
        ctx!.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const j = Math.sin(x * 0.09 + y * 0.05 + t * 0.06) * 3 + Math.cos(x * 0.21 - t * 0.05) * 2;
          if (x === 0) ctx!.moveTo(x, y + j); else ctx!.lineTo(x, y + j);
        }
        ctx!.stroke();
      }
      for (let x = GAP / 2; x < w; x += GAP) {
        ctx!.beginPath();
        for (let y = 0; y <= h; y += 8) {
          const j = Math.cos(y * 0.09 + x * 0.05 + t * 0.06) * 3 + Math.sin(y * 0.21 - t * 0.05) * 2;
          if (y === 0) ctx!.moveTo(x + j, y); else ctx!.lineTo(x + j, y);
        }
        ctx!.stroke();
      }

      // spawn bubbles
      if (bubbles.length < (w < 768 ? 26 : 48) && Math.random() < 0.6) {
        const max = 6 + Math.random() * 22;
        bubbles.push({ x: Math.random() * w, y: Math.random() * h, r: 0, max, life: 0, c: COLORS[(Math.random() * COLORS.length) | 0] });
      }
      ctx!.globalCompositeOperation = "lighter";
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life += 0.02;
        b.r = Math.sin(Math.min(b.life, 1) * Math.PI) * b.max; // grow then shrink
        if (b.life >= 1) { bubbles.splice(i, 1); continue; }
        const a = Math.sin(Math.min(b.life, 1) * Math.PI) * 0.5;
        ctx!.strokeStyle = `rgba(${b.c},${a.toFixed(2)})`;
        ctx!.lineWidth = 1.4;
        ctx!.beginPath(); ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx!.stroke();
        const g = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.c},${(a * 0.25).toFixed(2)})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath(); ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";

      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();
    if (reduce) for (let i = 0; i < 60; i++) frame();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="space-y-12">
      <div className="panel rounded-2xl p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-iris-500/15 bg-void-950/60">
            <canvas ref={ref} className="h-64 w-full md:h-72" aria-hidden />
          </div>
          <div>
            <div className="display text-xl flux-glow">{lang === "zh" ? "10⁻³⁵ 米处的时空" : "spacetime at 10⁻³⁵ metres"}</div>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              {lang === "zh"
                ? "在普朗克尺度，量子不确定性被预期会让几何本身沸腾——距离、曲率，乃至拓扑，都在不停涨落。平滑的时空，或许只是这片『泡沫』在巨大尺度上被抹平后的平均样貌。把广义相对论强行用于此处，方程便给出无穷大——这是它不完整的信号。"
                : "At the Planck scale, quantum uncertainty is expected to make geometry itself boil — distances, curvature, even topology fluctuating without rest. Smooth spacetime may be only the large-scale average of this 'foam'. Force general relativity to operate here and the equations return infinities — the signal that it is incomplete."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="label-mono mb-4">{lang === "zh" ? "通向量子引力的路径" : "roads toward quantum gravity"}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNIFICATION.map((u, i) => (
            <div key={i} className="panel rounded-xl p-5">
              <div className="display text-base text-flux-400"><T v={u.name} /></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-300"><T v={u.idea} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
