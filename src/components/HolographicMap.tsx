"use client";

import { useLang, T } from "./lang";
import { PANELS, REALITY_VIEWS } from "./content";

/* The holographic principle, drawn. Information about a 3D volume (the bulk) is
   encoded as bits on its 2D boundary; the depth, geometry and gravity we
   experience can be reconstructed from that surface. A ring of glowing boundary
   bits projects inward to assemble a wireframe interior — the world as a
   projection of data. */

const N = 36;
const R = 150;
const C = 180;

export default function HolographicMap() {
  const { lang } = useLang();
  const panels = PANELS.info;

  return (
    <div className="space-y-12">
      <div className="panel rounded-2xl p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="flex justify-center">
            <svg viewBox="0 0 360 360" className="w-full max-w-[420px]">
              {/* projection rays */}
              {Array.from({ length: N }).map((_, i) => {
                const a = (i / N) * Math.PI * 2;
                const x = C + Math.cos(a) * R, y = C + Math.sin(a) * R;
                const ix = C + Math.cos(a) * R * 0.42, iy = C + Math.sin(a) * R * 0.42;
                return <line key={`r${i}`} x1={x} y1={y} x2={ix} y2={iy} stroke="rgba(54,230,255,0.10)" strokeWidth={1} />;
              })}
              {/* inner reconstructed wireframe (the bulk) */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2;
                const r = 58;
                const x = C + Math.cos(a) * r, y = C + Math.sin(a) * r * 0.6;
                const a2 = ((i + 1) / 12) * Math.PI * 2;
                const x2 = C + Math.cos(a2) * r, y2 = C + Math.sin(a2) * r * 0.6;
                return <line key={`b${i}`} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(255,210,119,0.5)" strokeWidth={1.2} />;
              })}
              <ellipse cx={C} cy={C} rx={58} ry={35} fill="rgba(255,210,119,0.06)" stroke="rgba(255,210,119,0.3)" />
              <text x={C} y={C + 4} textAnchor="middle" className="fill-[#ffe3a6]" fontSize="10" fontFamily="JetBrains Mono">{lang === "zh" ? "体 (3D)" : "bulk (3D)"}</text>
              {/* boundary bits */}
              {Array.from({ length: N }).map((_, i) => {
                const a = (i / N) * Math.PI * 2;
                const x = C + Math.cos(a) * R, y = C + Math.sin(a) * R;
                return (
                  <rect key={`q${i}`} x={x - 3} y={y - 3} width={6} height={6} rx={1}
                    fill={i % 3 === 0 ? "#86f1ff" : i % 3 === 1 ? "#9b6cff" : "#ff93b6"}
                    className="pulse" style={{ animationDelay: `${(i % 9) * 0.18}s`, transformOrigin: "center" }} />
                );
              })}
              <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(134,241,255,0.25)" strokeWidth={1} strokeDasharray="3 5" />
              <text x={C} y={36} textAnchor="middle" className="fill-[#86f1ff]" fontSize="10" fontFamily="JetBrains Mono">{lang === "zh" ? "边界 (2D · 比特)" : "boundary (2D · bits)"}</text>
            </svg>
          </div>
          <div>
            <div className="display text-xl flux-glow">{lang === "zh" ? "万物源于比特" : "it from bit"}</div>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              {lang === "zh"
                ? "黑洞的熵正比于它视界的面积，而非体积——仿佛一块空间所能容纳的信息，被写在它的表面上。把这一点推到极致，便得到全息原理：我们所经验的三维深度，或许是编码在一个遥远二维边界上的数据的投影。在这一图景里，几何就是信息，被粗粒化之后的样子。"
                : "A black hole's entropy scales with the area of its horizon, not its volume — as if the information a region can hold is written on its surface. Push that to its limit and you get the holographic principle: the three-dimensional depth we experience may be a projection of data encoded on a distant two-dimensional boundary. In this picture, geometry just is information, coarse-grained."}
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {panels.map((p, i) => (
            <div key={i} className="rounded-xl border border-ink-100/10 bg-void-900/50 p-4">
              <div className="display text-sm text-flux-400"><T v={p.t} /></div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-300"><T v={p.d} /></p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="label-mono mb-4">{lang === "zh" ? "现实的几种读法" : "ways to read reality"}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REALITY_VIEWS.map((v, i) => (
            <div key={i} className="panel rounded-xl p-5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: v.color, boxShadow: `0 0 8px ${v.color}`, display: "inline-block" }} />
              <div className="display mt-2 text-base text-ink-50"><T v={v.name} /></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-300"><T v={v.desc} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
