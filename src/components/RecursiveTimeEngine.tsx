"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, T } from "./lang";
import { DOMAINS, ENGINE_STATES } from "./content";

/* The Future Spacetime Engine — a toy recursive simulator. Toggle which domains
   of physics a civilization has integrated and raise the coupling; the engine
   sums weighted mastery, densifies its own lattice, and steps through emergent
   states from Observer → Modeler → Manipulator → Engineer. "Run" ramps coupling. */

const SIZE = 440;
const C = SIZE / 2;
const RING = SIZE * 0.37;

function nodePos(i: number, n: number): [number, number] {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [C + Math.cos(a) * RING, C + Math.sin(a) * RING];
}

export default function RecursiveTimeEngine() {
  const { lang } = useLang();
  const [active, setActive] = useState<boolean[]>(DOMAINS.map(() => true));
  const [coupling, setCoupling] = useState(0.4);
  const [running, setRunning] = useState(false);
  const raf = useRef<number | null>(null);

  const totalW = DOMAINS.reduce((s, d) => s + d.weight, 0);
  const activeW = DOMAINS.reduce((s, d, i) => s + (active[i] ? d.weight : 0), 0);
  const activeCount = active.filter(Boolean).length;
  const mastery = (activeW / totalW) * coupling; // 0..1

  let state = ENGINE_STATES[0];
  for (const s of ENGINE_STATES) if (mastery >= s.min) state = s;

  function run() {
    if (running) return;
    setRunning(true);
    setCoupling(0.05);
    const start = performance.now();
    const dur = 2600;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setCoupling(0.05 + e * 0.93);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(step);
  }

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const coreGlow = 14 + mastery * 64;
  const coreR = 16 + mastery * 14;

  return (
    <div className="panel rounded-2xl p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center">
        <div className="relative mx-auto w-full max-w-[440px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
            <defs>
              <radialGradient id="st-core-g" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#86f1ff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#36e6ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1796b4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {DOMAINS.map((d, i) => {
              if (!active[i]) return null;
              const [x, y] = nodePos(i, DOMAINS.length);
              return (
                <line key={`l-${i}`} x1={C} y1={C} x2={x} y2={y} stroke="#36e6ff" strokeWidth={0.6 + coupling * 1.8} strokeOpacity={0.12 + coupling * 0.5} className={coupling > 0.55 ? "flow" : undefined} />
              );
            })}

            {coupling > 0.5 &&
              DOMAINS.map((_, i) => {
                const j = (i + 1) % DOMAINS.length;
                if (!active[i] || !active[j]) return null;
                const [x1, y1] = nodePos(i, DOMAINS.length);
                const [x2, y2] = nodePos(j, DOMAINS.length);
                return <line key={`c-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9b6cff" strokeWidth={0.5} strokeOpacity={(coupling - 0.5) * 0.9} />;
              })}

            <circle cx={C} cy={C} r={coreGlow + coreR} fill="url(#st-core-g)" className="breathe" />
            <circle cx={C} cy={C} r={coreR} fill="#0c0b22" stroke="#36e6ff" strokeWidth={1.5} />
            <circle cx={C} cy={C} r={coreR * 0.5} fill="#86f1ff" fillOpacity={0.5 + mastery * 0.5} />

            {DOMAINS.map((d, i) => {
              const [x, y] = nodePos(i, DOMAINS.length);
              const a = active[i];
              return (
                <g key={d.id} className="cursor-pointer" onClick={() => setActive((arr) => arr.map((v, k) => (k === i ? !v : v)))}>
                  <circle cx={x} cy={y} r={a ? 7 : 5} fill={a ? "#13122e" : "#0a0a14"} stroke={a ? "#36e6ff" : "#3a3a52"} strokeWidth={a ? 1.6 : 1} />
                  {a && <circle cx={x} cy={y} r={2.6} fill="#86f1ff" />}
                </g>
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0">
            {DOMAINS.map((d, i) => {
              const [x, y] = nodePos(i, DOMAINS.length);
              const lx = (x / SIZE) * 100;
              const ly = (y / SIZE) * 100;
              const out = x > C + 4 ? "translate(8px,-50%)" : x < C - 4 ? "translate(-100%,-50%) translateX(-8px)" : "translate(-50%,-50%)";
              return (
                <span
                  key={d.id}
                  className={`absolute whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.06em] ${active[i] ? "text-flux-400" : "text-ink-500/60"}`}
                  style={{ left: `${lx}%`, top: `${ly}%`, transform: out }}
                >
                  {d.name[lang]}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="label-mono">{lang === "zh" ? "时间掌控度" : "temporal mastery"}</div>
            <div className="display text-3xl flux-glow">{Math.round(mastery * 100)}%</div>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-void-700">
            <div className="h-full rounded-full transition-all duration-200" style={{ width: `${mastery * 100}%`, background: "linear-gradient(90deg,#36e6ff,#9b6cff,#ffd277)" }} />
          </div>

          <div key={state.title.en} className="mt-5 rounded-xl border border-flux-500/25 bg-gradient-to-br from-flux-500/[0.08] to-transparent p-5 lang-fade">
            <div className="flex items-baseline justify-between">
              <div className="display text-xl flux-glow"><T v={state.title} /></div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-500">
                {activeCount}/{DOMAINS.length} {lang === "zh" ? "领域" : "domains"}
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-200"><T v={state.body} /></p>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500">
              <span>{lang === "zh" ? "理论耦合强度" : "theory coupling"}</span>
              <span className="text-flux-400">{Math.round(coupling * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(coupling * 100)}
              onChange={(e) => setCoupling(Number(e.target.value) / 100)}
              className="mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent"
              style={{ accentColor: "#36e6ff" }}
              aria-label="theory coupling"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={running}
              className="rounded-full border border-flux-500/50 bg-flux-500/10 px-5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-flux-400 transition hover:bg-flux-500/20 disabled:opacity-40"
            >
              {running ? (lang === "zh" ? "整合中…" : "integrating…") : lang === "zh" ? "▶ 运行引擎" : "▶ run engine"}
            </button>
            <button
              onClick={() => setActive(DOMAINS.map(() => true))}
              className="rounded-full border border-ink-100/15 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400 transition hover:text-flux-400"
            >
              {lang === "zh" ? "全选" : "all on"}
            </button>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-500">
              {lang === "zh" ? "点节点可开关领域" : "tap nodes to toggle domains"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
