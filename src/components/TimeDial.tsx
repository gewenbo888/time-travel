"use client";

import { useState } from "react";
import { useLang, T } from "./lang";
import { DIAL_LENSES } from "./content";
import LightClock from "./LightClock";

/* The marquee interactive. Three lenses, each a slider that computes a real
   physical quantity live:
     I  Velocity → Time     special relativity: gamma, dilation, contraction
     II Mass → Geometry     a body compressed toward its Schwarzschild radius
     III Scale → Regime     62 orders of magnitude, Planck to cosmos          */

function Readout({ k, v, accent }: { k: React.ReactNode; v: string; accent?: string }) {
  return (
    <div className="rounded-lg border border-ink-100/10 bg-void-900/60 p-3">
      <div className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-500">{k}</div>
      <div className="display mt-1 text-xl" style={{ color: accent ?? "#e7e9fb" }}>{v}</div>
    </div>
  );
}

/* ── lens I ── */
function VelocityLens({ lang }: { lang: "en" | "zh" }) {
  const [v, setV] = useState(600); // 0..999 → beta = v/1000
  const beta = v / 1000;
  const gamma = 1 / Math.sqrt(1 - Math.min(beta, 0.99999) ** 2);
  const clockPct = (100 / gamma).toFixed(gamma > 9 ? 1 : 0);
  const lenPct = (100 / gamma).toFixed(gamma > 9 ? 1 : 0);
  return (
    <div>
      <LightClock beta={beta} />
      <div className="mt-4">
        <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500">
          <span>{lang === "zh" ? "速度 (光速的比例)" : "velocity (fraction of c)"}</span>
          <span className="text-gold-300">{beta.toFixed(3)} c</span>
        </div>
        <input type="range" min={0} max={999} value={v} onChange={(e) => setV(Number(e.target.value))}
          className="mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent" style={{ accentColor: "#ffd277" }} aria-label="velocity" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Readout k={lang === "zh" ? "洛伦兹因子 γ" : "Lorentz γ"} v={gamma > 99 ? gamma.toFixed(0) : gamma.toFixed(2)} accent="#ffd277" />
        <Readout k={lang === "zh" ? "运动钟走速" : "moving clock runs at"} v={`${clockPct}%`} accent="#86f1ff" />
        <Readout k={lang === "zh" ? "长度收缩至" : "length shrinks to"} v={`${lenPct}%`} accent="#9b6cff" />
        <Readout k={lang === "zh" ? "总能量 (×mc²)" : "total energy (×mc²)"} v={gamma > 99 ? gamma.toFixed(0) : gamma.toFixed(2)} accent="#ff93b6" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-300">
        {beta < 0.1
          ? (lang === "zh" ? "在日常速度下，相对论效应小到无法察觉——这正是为何牛顿物理学在三个世纪里看似完美。" : "At everyday speeds, relativistic effects are far too small to notice — which is why Newtonian physics looked perfect for three centuries.")
          : beta < 0.87
          ? (lang === "zh" ? "效应已显著：运动的钟明显变慢，长度明显收缩。粒子加速器中的粒子每天都经历这些。" : "The effects are now significant: the moving clock visibly slows and lengths visibly contract. Particles in accelerators live this every day.")
          : (lang === "zh" ? "逼近光速：γ 飞涨，时间几乎冻结，所需能量趋于无穷。任何有质量之物都到不了 c。" : "Near light-speed: γ soars, time nearly freezes, and the energy required diverges. Nothing with mass ever reaches c.")}
      </p>
    </div>
  );
}

/* ── lens II ── */
function MassLens({ lang }: { lang: "en" | "zh" }) {
  const [v, setV] = useState(40); // 0..100
  // R/Rs ratio: diffuse (large) at v=0 → horizon (1) at v=100, log-spaced
  const ratio = Math.pow(10, ((100 - v) / 100) * 3.4); // ~2511 → 1
  const escFrac = Math.min(1, Math.sqrt(1 / ratio));   // v_esc / c
  const timeFactor = ratio > 1 ? Math.sqrt(1 - 1 / ratio) : 0; // surface clock rate
  const horizon = ratio <= 1.02;
  const body =
    ratio > 1000 ? { en: "Diffuse gas / ordinary star", zh: "弥散气体 / 普通恒星" }
    : ratio > 100 ? { en: "Dense star", zh: "致密恒星" }
    : ratio > 10 ? { en: "White dwarf", zh: "白矮星" }
    : ratio > 1.5 ? { en: "Neutron star", zh: "中子星" }
    : horizon ? { en: "Event horizon — black hole", zh: "事件视界 — 黑洞" }
    : { en: "On the brink of collapse", zh: "坍缩的边缘" };

  // well cross-section depth scales with how compact it is
  const depth = 30 + (1 - Math.min(1, Math.log10(ratio) / 3.4)) * 120;
  const W = 320, H = 190, cx = W / 2;
  const path = (() => {
    let d = `M 0 40`;
    for (let x = 0; x <= W; x += 8) {
      const r = Math.abs(x - cx) / cx; // 0 at centre
      const y = 40 + depth * Math.exp(-r * r * 5);
      d += ` L ${x} ${y}`;
    }
    return d;
  })();

  return (
    <div>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[420px]">
          <path d={path} fill="none" stroke="#36e6ff" strokeOpacity={0.5} strokeWidth={1.4} />
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#wellg)" opacity={0.5} />
          <defs>
            <linearGradient id="wellg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9b6cff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#04030d" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* the mass at the bottom of the well */}
          <circle cx={cx} cy={40 + depth} r={horizon ? 16 : 9} fill={horizon ? "#04030d" : "#ffd277"} stroke={horizon ? "#ff5d8f" : "#ffe3a6"} strokeWidth={horizon ? 2 : 1} />
          {horizon && <circle cx={cx} cy={40 + depth} r={20} fill="none" stroke="#ff5d8f" strokeOpacity={0.5} strokeWidth={1} className="pulse" />}
        </svg>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500">
          <span>{lang === "zh" ? "压缩程度 →" : "compression →"}</span>
          <span className="text-gold-300">R / R_s = {ratio < 2 ? ratio.toFixed(2) : ratio < 100 ? ratio.toFixed(0) : ratio.toExponential(1)}</span>
        </div>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))}
          className="mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent" style={{ accentColor: "#ff5d8f" }} aria-label="compression" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Readout k={lang === "zh" ? "天体类型" : "object"} v={body[lang]} accent="#ffd277" />
        <Readout k={lang === "zh" ? "逃逸速度" : "escape velocity"} v={`${(escFrac * 100).toFixed(escFrac > 0.99 ? 1 : 0)}% c`} accent="#86f1ff" />
        <Readout k={lang === "zh" ? "表面时钟走速" : "surface clock rate"} v={horizon ? "0%" : `${(timeFactor * 100).toFixed(0)}%`} accent="#9b6cff" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-300">
        {horizon
          ? (lang === "zh" ? "在史瓦西半径处，逃逸速度等于光速：事件视界形成。从外部看，表面的时钟仿佛冻结。引力在此就是纯粹的几何。" : "At the Schwarzschild radius the escape velocity equals the speed of light: an event horizon forms. Seen from outside, a clock on the surface appears frozen. Gravity here is pure geometry.")
          : (lang === "zh" ? "把同样的质量压入更小的半径，时空的弯曲就更陡，逃逸更难，表面的时间也越走越慢。" : "Pack the same mass into a smaller radius and spacetime curves more steeply — escape gets harder, and time on the surface runs slower and slower.")}
      </p>
    </div>
  );
}

/* ── lens III ── */
const BANDS: { max: number; obj: { en: string; zh: string }; rules: { en: string; zh: string }; color: string }[] = [
  { max: -34, obj: { en: "Planck length", zh: "普朗克长度" }, rules: { en: "Quantum gravity · spacetime foam", zh: "量子引力 · 时空泡沫" }, color: "#9b6cff" },
  { max: -18, obj: { en: "Quarks · nuclei", zh: "夸克 · 原子核" }, rules: { en: "Quantum field theory", zh: "量子场论" }, color: "#c4abff" },
  { max: -9, obj: { en: "Atoms · molecules", zh: "原子 · 分子" }, rules: { en: "Quantum mechanics", zh: "量子力学" }, color: "#86f1ff" },
  { max: -3, obj: { en: "Cells · dust", zh: "细胞 · 尘埃" }, rules: { en: "Chemistry · statistical physics", zh: "化学 · 统计物理" }, color: "#36e6ff" },
  { max: 2, obj: { en: "Humans · everyday scale", zh: "人类 · 日常尺度" }, rules: { en: "Newtonian mechanics", zh: "牛顿力学" }, color: "#86f1ff" },
  { max: 7, obj: { en: "Mountains · planets", zh: "山脉 · 行星" }, rules: { en: "Newtonian gravity", zh: "牛顿引力" }, color: "#ffd277" },
  { max: 13, obj: { en: "Stars · solar systems", zh: "恒星 · 行星系" }, rules: { en: "General relativity matters", zh: "广义相对论开始重要" }, color: "#ffd277" },
  { max: 22, obj: { en: "Galaxies · clusters", zh: "星系 · 星系团" }, rules: { en: "GR · dark matter", zh: "广义相对论 · 暗物质" }, color: "#ff93b6" },
  { max: 99, obj: { en: "Cosmic web · observable universe", zh: "宇宙网 · 可观测宇宙" }, rules: { en: "Cosmology · dark energy", zh: "宇宙学 · 暗能量" }, color: "#ff5d8f" },
];

function ScaleLens({ lang }: { lang: "en" | "zh" }) {
  const [v, setV] = useState(50); // 0..100
  const exp = -35 + (v / 100) * 62; // log10 metres, −35 → +27
  const band = BANDS.find((b) => exp <= b.max) ?? BANDS[BANDS.length - 1];
  const mantissa = Math.pow(10, exp - Math.floor(exp));
  const meters = `${mantissa.toFixed(1)} × 10${supExp(Math.floor(exp))} m`;
  // marker position on a logarithmic ruler
  return (
    <div>
      <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg,#9b6cff,#86f1ff 30%,#ffd277 70%,#ff5d8f)" }}>
        <span className="absolute top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-flux-400 bg-void-900 shadow-glow" style={{ left: `${v}%` }}>
          <span className="h-2 w-2 rounded-full" style={{ background: band.color }} />
        </span>
      </div>
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))}
        className="mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent" style={{ accentColor: "#36e6ff" }} aria-label="scale" />
      <div className="mt-1 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-500">
        <span>{lang === "zh" ? "普朗克 10⁻³⁵ m" : "Planck 10⁻³⁵ m"}</span>
        <span>{lang === "zh" ? "宇宙 10²⁷ m" : "cosmos 10²⁷ m"}</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Readout k={lang === "zh" ? "尺度" : "length scale"} v={meters} accent="#86f1ff" />
        <Readout k={lang === "zh" ? "此处之物" : "what lives here"} v={band.obj[lang]} accent={band.color} />
        <Readout k={lang === "zh" ? "主宰的物理" : "physics in charge"} v={band.rules[lang]} accent="#ffd277" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-300">
        {lang === "zh"
          ? "没有任何单一理论贯穿这整条标尺。量子力学统治微小，广义相对论统治宏大，而它们在最小与最极端之处相撞——那正是量子引力必须接管的地方。"
          : "No single theory spans this whole ruler. Quantum mechanics rules the tiny, general relativity rules the vast, and they collide at the smallest and most extreme scales — exactly where quantum gravity must take over."}
      </p>
    </div>
  );
}

function supExp(n: number) {
  const map: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(n).split("").map((c) => map[c] ?? c).join("");
}

export default function TimeDial() {
  const { lang } = useLang();
  const [li, setLi] = useState(0);
  const lens = DIAL_LENSES[li];

  return (
    <div className="panel rounded-2xl p-5 md:p-8">
      <div className="flex flex-wrap gap-2">
        {DIAL_LENSES.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setLi(i)}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition ${
              i === li ? "border-flux-500/60 bg-flux-500/10 text-flux-400" : "border-ink-100/10 text-ink-500 hover:border-flux-500/30 hover:text-flux-400"
            }`}
          >
            <span className="text-flux-400/70">{x.index}</span>
            <T v={x.name} />
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-3xl font-serif text-base leading-relaxed text-ink-200 md:text-lg">
        <T v={lens.intro} />
      </p>

      <div className="mt-7">
        {li === 0 && <VelocityLens lang={lang} />}
        {li === 1 && <MassLens lang={lang} />}
        {li === 2 && <ScaleLens lang={lang} />}
      </div>
    </div>
  );
}
