"use client";

import { useState } from "react";
import { useLang, T } from "./lang";
import { META_AXES, META_AXIS_NOTES, REGIME_PROFILES } from "./content";

/* Seven-axis radar of the meta-model:
   Spacetime Structure = Geometry + Energy + Information + Causality + Entropy +
   Observation + Dimensional Relationships. Toggle four physical regimes. */

const SIZE = 460;
const C = SIZE / 2;
const R = SIZE * 0.36;
const N = META_AXES.length;

function pt(i: number, frac: number): [number, number] {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return [C + Math.cos(a) * R * frac, C + Math.sin(a) * R * frac];
}

export default function TimeRadar() {
  const { lang } = useLang();
  const [on, setOn] = useState<boolean[]>(REGIME_PROFILES.map(() => true));
  const [axis, setAxis] = useState<number | null>(null);
  const [prof, setProf] = useState<number | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
      <div className="relative mx-auto w-full max-w-[540px]">
        <svg viewBox={`-118 -46 ${SIZE + 236} ${SIZE + 92}`} className="w-full">
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <polygon
              key={f}
              points={META_AXES.map((_, i) => pt(i, f).join(",")).join(" ")}
              fill="none"
              stroke="rgba(54,230,255,0.10)"
              strokeWidth={1}
            />
          ))}
          {META_AXES.map((_, i) => {
            const [x, y] = pt(i, 1);
            return (
              <g key={i}>
                <line x1={C} y1={C} x2={x} y2={y} stroke="rgba(54,230,255,0.12)" strokeWidth={1} />
                <circle cx={x} cy={y} r={14} fill="transparent" className="cursor-pointer" onMouseEnter={() => setAxis(i)} onMouseLeave={() => setAxis(null)} />
              </g>
            );
          })}
          {REGIME_PROFILES.map((p, pi) =>
            on[pi] ? (
              <g key={pi} style={{ opacity: prof === null || prof === pi ? 1 : 0.25, transition: "opacity 0.2s" }}>
                <polygon
                  points={p.scores.map((s, i) => pt(i, s).join(",")).join(" ")}
                  fill={p.color}
                  fillOpacity={0.1}
                  stroke={p.color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
                {p.scores.map((s, i) => {
                  const [x, y] = pt(i, s);
                  return <circle key={i} cx={x} cy={y} r={2.6} fill={p.color} />;
                })}
              </g>
            ) : null
          )}
          {META_AXES.map((ax, i) => {
            const [x, y] = pt(i, 1.13);
            const anchor = Math.abs(x - C) < 36 ? "middle" : x > C ? "start" : "end";
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={anchor as "middle" | "start" | "end"}
                dominantBaseline="middle"
                fontSize={11}
                className={`font-mono uppercase ${axis === i ? "fill-flux-400" : "fill-[#777a9e]"}`}
                style={{ letterSpacing: "0.04em", cursor: "pointer" }}
                onMouseEnter={() => setAxis(i)}
                onMouseLeave={() => setAxis(null)}
              >
                {ax[lang]}
              </text>
            );
          })}
        </svg>
      </div>

      <div>
        <div className="label-mono">{lang === "zh" ? "物理区域 · 切换" : "physical regimes · toggle"}</div>
        <div className="mt-4 space-y-2.5">
          {REGIME_PROFILES.map((p, pi) => (
            <button
              key={pi}
              onClick={() => setOn((o) => o.map((v, i) => (i === pi ? !v : v)))}
              onMouseEnter={() => setProf(pi)}
              onMouseLeave={() => setProf(null)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-2.5 text-left transition ${
                on[pi] ? "border-ink-100/15 bg-void-900/70" : "border-ink-100/5 opacity-45"
              }`}
            >
              <span className="mt-1 h-3 w-3 flex-none rounded-sm" style={{ background: p.color, boxShadow: on[pi] ? `0 0 10px ${p.color}` : "none" }} />
              <span>
                <span className="display block text-sm text-ink-100"><T v={p.name} /></span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-500"><T v={p.note} /></span>
              </span>
            </button>
          ))}
        </div>

        <div key={axis ?? -1} className="mt-6 min-h-[92px] rounded-xl border border-flux-500/20 bg-void-900/60 p-4 lang-fade">
          {axis === null ? (
            <p className="text-sm leading-relaxed text-ink-400">
              <T v={{ en: "Hover an axis to read what it measures. Each polygon is how one regime of physics treats the seven ingredients of time.", zh: "悬停某个轴以阅读它度量什么。每个多边形，是某种物理区域处理时间七种成分的方式。" }} />
            </p>
          ) : (
            <>
              <div className="display text-base flux-glow"><T v={META_AXES[axis]} /></div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-300"><T v={META_AXIS_NOTES[axis]} /></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
