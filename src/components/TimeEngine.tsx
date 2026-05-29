"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, T } from "./lang";
import { TIME_MODELS } from "./content";

/* The arrow of time as a statistical fact. A box of particles starts in one
   ordered corner (low entropy) and spontaneously spreads to fill the box (high
   entropy). Run it forward and disorder grows; it never spontaneously re-orders.
   The entropy meter only climbs — that one-way climb is the arrow of time. */

type Pt = { x: number; y: number; vx: number; vy: number };

function EntropyBox() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const [entropy, setEntropy] = useState(0);
  const stateRef = useRef<Pt[]>([]);
  const runRef = useRef(true);
  runRef.current = running;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const N = 260;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      const pts: Pt[] = [];
      for (let i = 0; i < N; i++) {
        pts.push({ x: Math.random() * w * 0.22 + 4, y: Math.random() * h * 0.4 + h * 0.3, vx: (Math.random() - 0.5) * 1.8, vy: (Math.random() - 0.5) * 1.8 });
      }
      stateRef.current = pts;
    }
    resize();
    seed();
    (canvas as HTMLCanvasElement & { _reseed?: () => void })._reseed = seed;

    const GRID = 8;
    let frameN = 0;
    function frame() {
      frameN++;
      ctx!.clearRect(0, 0, w, h);
      const pts = stateRef.current;
      if (runRef.current) {
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 2 || p.x > w - 2) p.vx *= -1;
          if (p.y < 2 || p.y > h - 2) p.vy *= -1;
          p.x = Math.max(2, Math.min(w - 2, p.x));
          p.y = Math.max(2, Math.min(h - 2, p.y));
        }
      }
      // draw
      for (const p of pts) {
        ctx!.beginPath();
        ctx!.fillStyle = "rgba(134,241,255,0.8)";
        ctx!.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx!.fill();
      }
      // entropy estimate: occupancy of a coarse grid (how spread out)
      if (frameN % 6 === 0) {
        const cells = new Set<number>();
        const cw = w / GRID, ch = h / GRID;
        for (const p of pts) cells.add(Math.floor(p.x / cw) * GRID + Math.floor(p.y / ch));
        setEntropy(Math.round((cells.size / (GRID * GRID)) * 100));
      }
      raf = requestAnimationFrame(frame);
    }
    frame();
    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-flux-500/15 bg-void-950/60">
        <canvas ref={ref} className="h-52 w-full" aria-hidden />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-full border border-flux-500/50 bg-flux-500/10 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-flux-400 transition hover:bg-flux-500/20"
        >
          {running ? "⏸ pause" : "▶ run"}
        </button>
        <button
          onClick={() => { const c = ref.current as (HTMLCanvasElement & { _reseed?: () => void }) | null; c?._reseed?.(); }}
          className="rounded-full border border-ink-100/15 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400 transition hover:text-flux-400"
        >
          ↺ reset (low entropy)
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-500">entropy</span>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-void-700">
            <div className="h-full rounded-full transition-all" style={{ width: `${entropy}%`, background: "linear-gradient(90deg,#86f1ff,#ffd277,#ff5d8f)" }} />
          </div>
          <span className="display w-8 text-sm text-gold-300">{entropy}</span>
        </div>
      </div>
    </div>
  );
}

export default function TimeEngine() {
  const { lang } = useLang();
  return (
    <div className="space-y-12">
      <div className="panel rounded-2xl p-5 md:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <EntropyBox />
          <div>
            <div className="display text-xl flux-glow">{lang === "zh" ? "时间之箭 = 熵之箭" : "the arrow = the climb of entropy"}</div>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              {lang === "zh"
                ? "粒子从有序的一角扩散，填满整个盒子。它从不自发地重新聚回角落——并非因为物理定律禁止，而是因为无序的排列方式压倒性地多于有序的。我们称之为『过去』的，就是熵更低的那一端。"
                : "The particles spread from an ordered corner to fill the box. They never spontaneously regroup — not because the laws forbid it, but because there are overwhelmingly more disordered arrangements than ordered ones. What we call 'the past' is simply the lower-entropy end."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="label-mono mb-4">{lang === "zh" ? "时间的四种模型" : "four models of time"}</div>
        <div className="grid gap-4 sm:grid-cols-2">
          {TIME_MODELS.map((m, i) => (
            <div key={i} className="panel rounded-xl p-5">
              <div className="display text-lg text-ink-50"><T v={m.name} /></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-200"><T v={m.claim} /></p>
              <p className="mt-3 border-t border-ink-100/10 pt-3 text-xs leading-relaxed text-flux-400"><T v={m.verdict} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
