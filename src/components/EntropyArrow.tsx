"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useLang, T } from "./lang";
import { ENTROPY_STATES } from "./content";

// ─── constants ───────────────────────────────────────────────────────────────
const N = 80;
const BOX = 480;          // simulation box px (logical)
const HISTORY_LEN = 600;  // frames of position history for rewind
const BINS = 10;
const LOG_BINS = Math.log(BINS * BINS); // max entropy = log(100)

// ─── types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  /** 0 = lower-left quadrant at init, 1 = elsewhere — used for tint during rewind */
  origin: 0 | 1;
}

type SimMode = "idle" | "forward" | "rewind" | "paused";

// ─── particle helpers ─────────────────────────────────────────────────────────
function makeParticles(): Particle[] {
  const ps: Particle[] = [];
  for (let i = 0; i < N; i++) {
    // Start ordered: tight cluster in upper-left quadrant
    const x = 20 + Math.random() * (BOX / 4 - 30);
    const y = 20 + Math.random() * (BOX / 4 - 30);
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * 0.9;
    ps.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, origin: 0 });
  }
  return ps;
}

function computeEntropy(ps: Particle[]): number {
  const counts = new Int32Array(BINS * BINS);
  for (const p of ps) {
    const bx = Math.min(BINS - 1, Math.floor((p.x / BOX) * BINS));
    const by = Math.min(BINS - 1, Math.floor((p.y / BOX) * BINS));
    counts[by * BINS + bx]++;
  }
  let H = 0;
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 0) {
      const p = counts[i] / N;
      H -= p * Math.log(p);
    }
  }
  return Math.min(1, H / LOG_BINS);
}

function step(ps: Particle[]): void {
  for (const p of ps) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
    if (p.x > BOX) { p.x = BOX; p.vx = -Math.abs(p.vx); }
    if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
    if (p.y > BOX) { p.y = BOX; p.vy = -Math.abs(p.vy); }
  }
}

// ─── color helpers ────────────────────────────────────────────────────────────
function particleColor(p: Particle, mode: SimMode, entropy: number): string {
  if (mode === "rewind") {
    // During rewind: mint → rose-pink as they're more dispersed; chilling effect
    const cx = p.x / BOX;
    const cy = p.y / BOX;
    const dist = Math.sqrt((cx - 0.15) ** 2 + (cy - 0.15) ** 2);
    // near origin cluster → mint; far → rose-pink
    const t = Math.min(1, dist / 0.7);
    // lerp #86ffd0 → #ff5d8f
    const r = Math.round(0x86 + t * (0xff - 0x86));
    const g = Math.round(0xff + t * (0x5d - 0xff));
    const b = Math.round(0xd0 + t * (0x8f - 0xd0));
    return `rgba(${r},${g},${b},0.85)`;
  }
  // forward/idle/paused: mint (ordered) → gold → rose-pink (disordered)
  if (entropy < 0.45) {
    const t = entropy / 0.45;
    const r = Math.round(0x86 + t * (0xff - 0x86));
    const g = Math.round(0xff + t * (0xd2 - 0xff));
    const b = Math.round(0xd0 + t * (0x77 - 0xd0));
    return `rgba(${r},${g},${b},0.85)`;
  } else {
    const t = (entropy - 0.45) / 0.55;
    const r = Math.round(0xff + t * (0xff - 0xff));
    const g = Math.round(0xd2 + t * (0x5d - 0xd2));
    const b = Math.round(0x77 + t * (0x8f - 0x77));
    return `rgba(${r},${g},${b},0.85)`;
  }
}

// ─── draw ─────────────────────────────────────────────────────────────────────
function draw(
  ctx: CanvasRenderingContext2D,
  ps: Particle[],
  mode: SimMode,
  entropy: number,
  size: number
): void {
  const scale = size / BOX;
  ctx.clearRect(0, 0, size, size);

  // box background
  ctx.fillStyle = "rgba(8,6,20,0.97)";
  ctx.fillRect(0, 0, size, size);

  // quadrant hint when idle
  if (mode === "idle") {
    ctx.fillStyle = "rgba(134,255,208,0.06)";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.strokeStyle = "rgba(134,255,208,0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, size / 2, size / 2);
  }

  // rewind: subtle blue tint overlay for "time reversal" feel
  if (mode === "rewind") {
    ctx.fillStyle = "rgba(54,230,255,0.04)";
    ctx.fillRect(0, 0, size, size);
  }

  // box border
  ctx.strokeStyle = "rgba(155,108,255,0.3)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0.75, 0.75, size - 1.5, size - 1.5);

  // particles
  const col = particleColor(ps[0] ?? { x: 0, y: 0, vx: 0, vy: 0, origin: 0 }, mode, entropy);
  for (const p of ps) {
    const c = particleColor(p, mode, entropy);
    ctx.beginPath();
    ctx.arc(p.x * scale, p.y * scale, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  }
  void col; // suppress unused warning
}

// ─── component ────────────────────────────────────────────────────────────────
export default function EntropyArrow() {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // simulation state in refs (mutated in rAF loop)
  const psRef = useRef<Particle[]>(makeParticles());
  const historyRef = useRef<Float32Array[]>(
    Array.from({ length: N }, () => new Float32Array(HISTORY_LEN * 2))
  );
  const headRef = useRef(0);    // ring buffer write head
  const filledRef = useRef(0);  // how many frames recorded
  const rewindIdxRef = useRef(0); // how many frames we've rewound
  const modeRef = useRef<SimMode>("idle");
  const entropyRef = useRef(computeEntropy(psRef.current));
  const rafRef = useRef<number>(0);

  const [mode, setMode] = useState<SimMode>("idle");
  const [entropy, setEntropy] = useState(() => computeEntropy(psRef.current));
  const [canvasSize, setCanvasSize] = useState(360);

  // Observe container to size the canvas responsively
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width ?? 360;
      setCanvasSize(Math.min(w, 520));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // record current positions into history ring buffer
  const recordFrame = useCallback(() => {
    const head = headRef.current;
    for (let i = 0; i < N; i++) {
      const p = psRef.current[i];
      historyRef.current[i][head * 2] = p.x;
      historyRef.current[i][head * 2 + 1] = p.y;
    }
    headRef.current = (head + 1) % HISTORY_LEN;
    filledRef.current = Math.min(filledRef.current + 1, HISTORY_LEN);
  }, []);

  // main rAF loop
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const currentMode = modeRef.current;

    if (currentMode === "forward") {
      recordFrame();
      step(psRef.current);
      const e = computeEntropy(psRef.current);
      entropyRef.current = e;
      setEntropy(e);
    } else if (currentMode === "rewind") {
      const filled = filledRef.current;
      if (filled === 0 || rewindIdxRef.current >= filled) {
        // nothing more to rewind — stop
        modeRef.current = "paused";
        setMode("paused");
      } else {
        rewindIdxRef.current++;
        const frame = (headRef.current - rewindIdxRef.current + HISTORY_LEN) % HISTORY_LEN;
        for (let i = 0; i < N; i++) {
          psRef.current[i].x = historyRef.current[i][frame * 2];
          psRef.current[i].y = historyRef.current[i][frame * 2 + 1];
        }
        const e = computeEntropy(psRef.current);
        entropyRef.current = e;
        setEntropy(e);
      }
    }

    draw(ctx, psRef.current, currentMode, entropyRef.current, canvas.width);
    rafRef.current = requestAnimationFrame(loop);
  }, [recordFrame]);

  // start / stop rAF based on mode
  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  // ─── controls ──────────────────────────────────────────────────────────────
  const handleStartOrdered = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    psRef.current = makeParticles();
    historyRef.current = Array.from({ length: N }, () => new Float32Array(HISTORY_LEN * 2));
    headRef.current = 0;
    filledRef.current = 0;
    rewindIdxRef.current = 0;
    const e = computeEntropy(psRef.current);
    entropyRef.current = e;
    setEntropy(e);
    modeRef.current = "idle";
    setMode("idle");
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const handlePlay = useCallback(() => {
    // If we had rewound, rebuild a coherent history from current state
    if (rewindIdxRef.current > 0) {
      rewindIdxRef.current = 0;
      filledRef.current = 0;
      headRef.current = 0;
    }
    modeRef.current = "forward";
    setMode("forward");
  }, []);

  const handleRewind = useCallback(() => {
    if (filledRef.current === 0) return;
    rewindIdxRef.current = 0;
    modeRef.current = "rewind";
    setMode("rewind");
  }, []);

  const handlePause = useCallback(() => {
    modeRef.current = "paused";
    setMode("paused");
  }, []);

  const handleReset = useCallback(() => {
    handleStartOrdered();
  }, [handleStartOrdered]);

  // ─── labels ────────────────────────────────────────────────────────────────
  const entropyPct = Math.round(entropy * 100);
  const entropyBarColor =
    entropy < 0.35 ? "#86ffd0" : entropy < 0.65 ? "#ffd277" : "#ff5d8f";

  const todayIdx = ENTROPY_STATES.findIndex(s => s.label.en === "Today");

  return (
    <section className="w-full space-y-6">
      {/* heading */}
      <div className="space-y-1">
        <p className="label-mono text-flux-400">
          <T v={{ en: "System IV · the arrow", zh: "系统四 · 那道箭头" }} />
        </p>
        <h2 className="display text-3xl md:text-4xl text-ink-50">
          <T v={{ en: "The Arrow of Time & Entropy", zh: "时间之箭与熵" }} />
        </h2>
        <p className="text-ink-400 text-sm max-w-2xl">
          <T
            v={{
              en: "Almost every equation in physics is reversible — yet the world runs only one way. That asymmetry is the second law: a statistical gradient, not a fundamental prohibition.",
              zh: "物理中几乎每一个方程都是可逆的——然而世界只朝一个方向奔流。那种不对称，就是第二定律：一个统计性的梯度，而非基本的禁令。",
            }}
          />
        </p>
      </div>

      {/* main grid */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* ── left: particle simulator ── */}
        <div className="panel space-y-4">
          <div className="flex items-center justify-between">
            <span className="label-mono text-ink-400 text-xs">
              <T v={{ en: "Particles · 粒子", zh: "粒子 · Particles" }} />
              <span className="ml-2 text-flux-400">N={N}</span>
            </span>
            <span className="label-mono text-xs" style={{ color: entropyBarColor }}>
              {mode === "rewind" && (
                <span className="text-[#36e6ff] mr-2 animate-pulse">⟲ REWIND</span>
              )}
              {mode === "forward" && <span className="text-[#86ffd0] mr-2">▶ FWD</span>}
              {mode === "paused" && <span className="text-ink-500 mr-2">⏸</span>}
            </span>
          </div>

          {/* canvas */}
          <div ref={containerRef} className="w-full">
            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              style={{ width: "100%", aspectRatio: "1/1", display: "block", borderRadius: "6px" }}
            />
          </div>

          {/* controls */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleStartOrdered}
              className="px-3 py-1.5 text-xs font-mono rounded border border-[#86ffd0]/40 text-[#86ffd0] hover:bg-[#86ffd0]/10 transition"
            >
              <T v={{ en: "Start ordered", zh: "从有序开始" }} />
            </button>
            <button
              onClick={handlePlay}
              disabled={mode === "forward"}
              className="px-3 py-1.5 text-xs font-mono rounded border border-flux-400/40 text-flux-300 hover:bg-flux-400/10 transition disabled:opacity-40"
            >
              <T v={{ en: "Play forward", zh: "向前播放" }} />
            </button>
            <button
              onClick={handleRewind}
              disabled={filledRef.current === 0 && mode !== "forward" && mode !== "paused"}
              className="px-3 py-1.5 text-xs font-mono rounded border border-[#36e6ff]/40 text-[#36e6ff] hover:bg-[#36e6ff]/10 transition disabled:opacity-40"
            >
              <T v={{ en: "Rewind", zh: "倒带" }} />
            </button>
            <button
              onClick={handlePause}
              disabled={mode === "paused" || mode === "idle"}
              className="px-3 py-1.5 text-xs font-mono rounded border border-ink-500/40 text-ink-400 hover:bg-ink-500/10 transition disabled:opacity-40"
            >
              <T v={{ en: "Pause", zh: "暂停" }} />
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-mono rounded border border-[#ff93b6]/30 text-[#ff93b6] hover:bg-[#ff93b6]/10 transition"
            >
              <T v={{ en: "Reset", zh: "重置" }} />
            </button>
          </div>

          {/* entropy meter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="label-mono text-xs text-ink-400">
                <T v={{ en: "Entropy S", zh: "熵 S" }} />
              </span>
              <span className="label-mono text-xs" style={{ color: entropyBarColor }}>
                {entropyPct}%{" "}
                <span className="text-ink-500">
                  (S/{lang === "en" ? "S_max" : "S_最大"})
                </span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${entropyPct}%`,
                  backgroundColor: entropyBarColor,
                  boxShadow: `0 0 8px ${entropyBarColor}80`,
                }}
              />
            </div>
            <p className="text-ink-500 text-[10px] leading-snug">
              {mode === "rewind" ? (
                <span style={{ color: "#36e6ff" }}>
                  <T
                    v={{
                      en: "Entropy falling — particles flying back into the cluster. The laws allow this; the universe never does it spontaneously.",
                      zh: "熵在下降——粒子飞回聚簇。定律允许这样；宇宙从不自发地这样做。",
                    }}
                  />
                </span>
              ) : mode === "forward" ? (
                <T
                  v={{
                    en: "Entropy rising — diffusion is spontaneous and overwhelmingly probable.",
                    zh: "熵在上升——扩散是自发的，且以压倒性的概率发生。",
                  }}
                />
              ) : mode === "idle" ? (
                <T
                  v={{
                    en: "All particles clustered in the upper-left — a low-entropy initial state, mirroring the Big Bang.",
                    zh: "所有粒子聚集在左上角——低熵初始态，映射大爆炸。",
                  }}
                />
              ) : (
                <T v={{ en: "Simulation paused.", zh: "模拟已暂停。" }} />
              )}
            </p>
          </div>

          {/* caveat */}
          <div className="rule-flux pt-3">
            <p className="text-ink-500 text-[11px] leading-relaxed italic">
              <T
                v={{
                  en: "The microscopic laws allow rewind. The universe never does it spontaneously — that asymmetry is the arrow of time.",
                  zh: "微观的定律允许倒带。宇宙从不自发地做这件事——那种不对称，就是时间之箭。",
                }}
              />
            </p>
          </div>
        </div>

        {/* ── right: cosmic entropy timeline ── */}
        <div className="panel space-y-3">
          <p className="label-mono text-xs text-ink-400">
            <T v={{ en: "Cosmic timeline · 宇宙的时间线", zh: "宇宙的时间线 · Cosmic timeline" }} />
          </p>
          <p className="text-ink-500 text-[11px] leading-relaxed">
            <T
              v={{
                en: "The box is a microcosm. The universe has been climbing the same entropy gradient for 13.8 billion years.",
                zh: "这个盒子是个缩影。宇宙已在同一条熵的梯度上攀升了 138 亿年。",
              }}
            />
          </p>

          <div className="space-y-1 mt-2">
            {ENTROPY_STATES.map((state, idx) => {
              const isToday = idx === todayIdx;
              const pct = Math.round(state.entropy * 100);
              const barColor =
                state.entropy < 0.35
                  ? "#86ffd0"
                  : state.entropy < 0.65
                  ? "#ffd277"
                  : "#ff5d8f";
              return (
                <div
                  key={state.label.en}
                  className={`rounded-lg p-3 transition ${
                    isToday
                      ? "border border-flux-400/40 bg-flux-400/5"
                      : "border border-ink-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-semibold ${
                        isToday ? "text-flux-300" : "text-ink-200"
                      }`}
                    >
                      {state.label[lang]}
                      {isToday && (
                        <span className="ml-1.5 label-mono text-[9px] text-flux-400 border border-flux-400/30 px-1 py-0.5 rounded">
                          <T v={{ en: "Today", zh: "今日" }} />
                        </span>
                      )}
                    </span>
                    <span
                      className="label-mono text-[10px]"
                      style={{ color: barColor }}
                    >
                      {pct}%
                    </span>
                  </div>
                  {/* bar */}
                  <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: barColor,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                  {/* note */}
                  <p className="text-ink-500 text-[10px] leading-snug">
                    {state.note[lang]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* connector note */}
          <div className="rule-flux pt-2">
            <p className="text-ink-500 text-[10px] leading-relaxed">
              <T
                v={{
                  en: "Each bar is the same kind of quantity as the box's live meter — just coarse-grained over 13.8 billion years instead of milliseconds.",
                  zh: "每一条横栏，与盒子的实时仪表，是同一种量——只是被粗粒化到 138 亿年，而非毫秒。",
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
