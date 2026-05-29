"use client";

import { useEffect, useRef } from "react";
import { useLang, T } from "./lang";
import { COSMIC_EPOCHS, ENERGY_BUDGET } from "./content";

/* The universe as an expanding thing. A field of galaxies pinned to comoving
   coordinates drifts apart as the scale factor grows — it is the space between
   them stretching, not the galaxies moving through space, and light from the
   most distant ones reddens. Alongside, the scale-factor curve: a violent
   inflationary kick, a long slow coast, then the dark-energy upturn. */

function GalaxyField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    let gals: { u: number; v: number; r: number }[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      gals = [];
      for (let i = 0; i < 90; i++) gals.push({ u: Math.random() * 2 - 1, v: Math.random() * 2 - 1, r: Math.random() * 1.6 + 0.6 });
    }
    resize();

    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const phase = (t % 520) / 520;        // 0..1 loop
      const a = 0.28 + phase * 1.25;          // scale factor grows
      for (const g of gals) {
        const x = cx + g.u * (w * 0.5) * a;
        const y = cy + g.v * (h * 0.5) * a;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;
        const dist = Math.hypot(g.u, g.v);
        // redshift with expansion + distance
        const z = Math.min(1, (a - 0.4) * 0.6 + dist * 0.3);
        const col = `rgba(${(150 + z * 105) | 0},${(200 - z * 110) | 0},${(255 - z * 150) | 0},0.9)`;
        ctx!.fillStyle = col;
        ctx!.beginPath(); ctx!.arc(x, y, g.r, 0, Math.PI * 2); ctx!.fill();
      }
      // fade flash at the loop start (big bang)
      if (phase < 0.06) {
        ctx!.fillStyle = `rgba(255,240,210,${(0.06 - phase) * 8})`;
        ctx!.fillRect(0, 0, w, h);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();
    if (reduce) for (let i = 0; i < 120; i++) frame();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="h-60 w-full md:h-72" aria-hidden />;
}

function ScaleCurve({ lang }: { lang: "en" | "zh" }) {
  // a(t): inflation kick, decelerating coast, dark-energy upturn
  const W = 360, H = 200;
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * W;
    const tt = i / 100;
    let a: number;
    if (tt < 0.08) a = Math.pow(tt / 0.08, 0.35) * 0.28;          // inflation
    else { const s = (tt - 0.08) / 0.92; a = 0.28 + Math.pow(s, 1.6) * 0.55 + Math.pow(s, 3) * 0.55; } // coast then accelerate
    const y = H - a / 1.4 * (H - 16) - 8;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <line x1="0" y1={H - 8} x2={W} y2={H - 8} stroke="rgba(120,128,180,0.3)" />
      <line x1="0" y1="8" x2="0" y2={H - 8} stroke="rgba(120,128,180,0.3)" />
      <polyline points={pts.join(" ")} fill="none" stroke="#ffd277" strokeWidth={2} />
      <text x="4" y="20" className="fill-[#777a9e]" fontSize="9" fontFamily="JetBrains Mono">{lang === "zh" ? "尺度因子 a" : "scale factor a"}</text>
      <text x={W - 4} y={H - 12} textAnchor="end" className="fill-[#777a9e]" fontSize="9" fontFamily="JetBrains Mono">{lang === "zh" ? "时间 →" : "time →"}</text>
      <text x={W * 0.04} y={H - 30} className="fill-[#c4abff]" fontSize="8.5" fontFamily="JetBrains Mono">{lang === "zh" ? "暴胀" : "inflation"}</text>
      <text x={W * 0.78} y={H * 0.28} textAnchor="middle" className="fill-[#ff93b6]" fontSize="8.5" fontFamily="JetBrains Mono">{lang === "zh" ? "暗能量加速" : "dark-energy"}</text>
    </svg>
  );
}

export default function CosmicExpansion() {
  const { lang } = useLang();
  return (
    <div className="space-y-12">
      <div className="panel rounded-2xl p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-xl border border-flux-500/15 bg-void-950/60"><GalaxyField /></div>
          <div>
            <div className="label-mono">{lang === "zh" ? "尺度因子的一生" : "the life of the scale factor"}</div>
            <ScaleCurve lang={lang} />
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              {lang === "zh" ? "并非星系在静止的空间中飞散，而是星系之间的空间本身在拉伸。" : "It is not galaxies flying apart through static space — it is the space between galaxies that stretches."}
            </p>
          </div>
        </div>
      </div>

      {/* epochs */}
      <div>
        <div className="label-mono mb-4">{lang === "zh" ? "时空的编年史" : "a chronology of spacetime"}</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COSMIC_EPOCHS.map((e, i) => (
            <div key={i} className="panel rounded-xl p-4">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-gold-300"><T v={e.t} /></div>
              <div className="display mt-1 text-base text-ink-50"><T v={e.name} /></div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400"><T v={e.desc} /></p>
            </div>
          ))}
        </div>
      </div>

      {/* energy budget */}
      <div className="panel rounded-2xl p-5 md:p-7">
        <div className="label-mono">{lang === "zh" ? "宇宙的能量预算" : "the energy budget of the cosmos"}</div>
        <div className="mt-4 flex h-7 overflow-hidden rounded-full">
          {ENERGY_BUDGET.map((e, i) => (
            <div key={i} className="grid place-items-center" style={{ width: `${e.pct}%`, background: e.color }}>
              <span className="text-[0.6rem] font-mono font-semibold text-void-950">{e.pct}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {ENERGY_BUDGET.map((e, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-ink-300">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: e.color }} />
              <T v={e.name} />
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-400">
          {lang === "zh" ? "我们能看见、能触摸、由之构成的一切，只占宇宙的约 5%。其余 95% 是暗物质与暗能量——以名字标记的、我们尚不理解之物。" : "Everything we can see, touch, or are made of is about 5% of the universe. The other 95% — dark matter and dark energy — is a pair of names marking what we do not yet understand."}
        </p>
      </div>
    </div>
  );
}
