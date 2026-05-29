"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLang, T } from "./lang";
import { BRANCH_INTERPS } from "./content";

/* ─── types ──────────────────────────────────────────────────────────────── */
interface TreeNode {
  id: number;
  parentId: number | null;
  depth: number;
  x: number;
  y: number;
  brightness: number; // 0..1
  born: number; // timestamp ms, for animation
}

/* ─── constants ──────────────────────────────────────────────────────────── */
const MAX_DEPTH = 9;
const SVG_W = 640;
const SVG_H = 460;
const PAD_LEFT = 28;
const PAD_RIGHT = 20;
const PAD_TOP = 28;
const PAD_BOT = 18;
const NODE_R = 4;
const ANIM_MS = 380; // edge draw duration

/* ─── layout helper ──────────────────────────────────────────────────────── */
function assignPositions(
  nodes: TreeNode[],
  branchFactor: number,
): TreeNode[] {
  const maxD = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
  const depthW = (SVG_W - PAD_LEFT - PAD_RIGHT) / Math.max(maxD, 1);
  const nodesByDepth: Map<number, TreeNode[]> = new Map();
  for (const n of nodes) {
    if (!nodesByDepth.has(n.depth)) nodesByDepth.set(n.depth, []);
    nodesByDepth.get(n.depth)!.push(n);
  }

  const updated = [...nodes];
  for (const [d, group] of nodesByDepth) {
    const count = group.length;
    const usableH = SVG_H - PAD_TOP - PAD_BOT;
    for (let i = 0; i < count; i++) {
      const idx = updated.findIndex((n) => n.id === group[i].id);
      const spacing = count > 1 ? usableH / (count - 1) : 0;
      const yOff = count > 1 ? i * spacing : usableH / 2;
      updated[idx] = {
        ...updated[idx],
        x: PAD_LEFT + d * depthW,
        y: PAD_TOP + yOff,
      };
    }
  }
  return updated;
}

/* ─── tree operations ────────────────────────────────────────────────────── */
let _nextId = 1;
function freshRoot(): TreeNode[] {
  _nextId = 2;
  return [{ id: 1, parentId: null, depth: 0, x: PAD_LEFT, y: SVG_H / 2, brightness: 1, born: Date.now() }];
}

function growLeaves(
  nodes: TreeNode[],
  branchFactor: number,
  decoherence: number,
): TreeNode[] {
  const leaves = nodes.filter((n) => {
    const hasChild = nodes.some((c) => c.parentId === n.id);
    return !hasChild;
  });
  if (!leaves.length) return nodes;

  const eligibleLeaves = leaves.filter((l) => l.depth < MAX_DEPTH);
  if (!eligibleLeaves.length) return nodes;

  const now = Date.now();
  const newNodes: TreeNode[] = [...nodes];

  for (const leaf of eligibleLeaves) {
    const brightChild = Math.floor(Math.random() * branchFactor);
    for (let c = 0; c < branchFactor; c++) {
      const bright =
        decoherence < 0.01
          ? 1
          : c === brightChild
          ? 1
          : Math.max(0.2, 1 - decoherence * 0.85);
      newNodes.push({
        id: _nextId++,
        parentId: leaf.id,
        depth: leaf.depth + 1,
        x: 0,
        y: 0,
        brightness: bright,
        born: now,
      });
    }
  }

  return assignPositions(newNodes, branchFactor);
}

/* ─── SVG edge component ─────────────────────────────────────────────────── */
function AnimEdge({
  x1, y1, x2, y2, brightness, born,
}: {
  x1: number; y1: number; x2: number; y2: number;
  brightness: number; born: number;
}) {
  const elapsed = Date.now() - born;
  const progress = Math.min(1, elapsed / ANIM_MS);
  const mx = x1 + (x2 - x1) * progress;
  const my = y1 + (y2 - y1) * progress;
  const alpha = (0.15 + brightness * 0.7).toFixed(2);
  // bright = cyan/violet gradient; faded = dim rose
  const stroke = brightness > 0.7 ? `rgba(54,230,255,${alpha})` : `rgba(155,108,255,${alpha})`;
  return (
    <line
      x1={x1} y1={y1} x2={mx} y2={my}
      stroke={stroke}
      strokeWidth={brightness > 0.7 ? 1.2 : 0.7}
    />
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function TimelineBranchSim() {
  const { lang } = useLang();
  const [nodes, setNodes] = useState<TreeNode[]>(() => assignPositions(freshRoot(), 2));
  const [branchFactor, setBranchFactor] = useState(2);
  const [decoherence, setDecoherence] = useState(0.3);
  const [auto, setAuto] = useState(false);
  const [interpIdx, setInterpIdx] = useState(0);
  const [tick, setTick] = useState(0); // force rerender for animations
  const autoRef = useRef(false);
  const nodesRef = useRef(nodes);
  const bfRef = useRef(branchFactor);
  const dcRef = useRef(decoherence);
  const rafRef = useRef<number>(0);
  const lastStepRef = useRef(0);

  // keep refs in sync
  useEffect(() => { nodesRef.current = nodes; }, [nodes]);
  useEffect(() => { bfRef.current = branchFactor; }, [branchFactor]);
  useEffect(() => { dcRef.current = decoherence; }, [decoherence]);

  /* animation tick for edge draws */
  useEffect(() => {
    const recent = nodes.some((n) => Date.now() - n.born < ANIM_MS + 50);
    if (!recent) return;
    const id = requestAnimationFrame(() => setTick((t) => t + 1));
    return () => cancelAnimationFrame(id);
  }, [nodes, tick]);

  /* auto-grow loop */
  useEffect(() => {
    autoRef.current = auto;
    if (!auto) {
      if (rafRef.current) clearTimeout(rafRef.current);
      return;
    }
    function schedule() {
      if (!autoRef.current) return;
      const cur = nodesRef.current;
      const currentDepth = cur.reduce((m, n) => Math.max(m, n.depth), 0);
      // slow down as tree fills: base 600ms + 100ms per depth
      const delay = 600 + currentDepth * 120;
      rafRef.current = window.setTimeout(() => {
        if (!autoRef.current) return;
        const leaves = cur.filter((n) => !cur.some((c) => c.parentId === n.id));
        const eligibleLeaves = leaves.filter((l) => l.depth < MAX_DEPTH);
        if (!eligibleLeaves.length) { setAuto(false); return; }
        setNodes((prev) => {
          const next = growLeaves(prev, bfRef.current, dcRef.current);
          nodesRef.current = next;
          return next;
        });
        schedule();
      }, delay) as unknown as number;
    }
    schedule();
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  }, [auto]);

  const handleStep = useCallback(() => {
    setNodes((prev) => growLeaves(prev, bfRef.current, dcRef.current));
  }, []);

  const handleReset = useCallback(() => {
    setAuto(false);
    autoRef.current = false;
    _nextId = 2;
    const root: TreeNode[] = [{ id: 1, parentId: null, depth: 0, x: PAD_LEFT, y: SVG_H / 2, brightness: 1, born: Date.now() }];
    const laid = assignPositions(root, branchFactor);
    setNodes(laid);
  }, [branchFactor]);

  /* derived stats */
  const currentDepth = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
  const leaves = nodes.filter((n) => !nodes.some((c) => c.parentId === n.id)).length;
  const maxReached = currentDepth >= MAX_DEPTH || leaves >= Math.pow(branchFactor, MAX_DEPTH) * 0.98;

  /* build edge list */
  const edges: { id: string; x1: number; y1: number; x2: number; y2: number; brightness: number; born: number }[] = [];
  for (const n of nodes) {
    if (n.parentId === null) continue;
    const parent = nodes.find((p) => p.id === n.parentId);
    if (!parent) continue;
    edges.push({ id: `e-${n.id}`, x1: parent.x, y1: parent.y, x2: n.x, y2: n.y, brightness: n.brightness, born: n.born });
  }

  /* interp panel */
  const interp = BRANCH_INTERPS[interpIdx];
  const total = BRANCH_INTERPS.length;

  return (
    <div className="panel w-full">
      {/* title */}
      <div className="mb-4">
        <p className="label-mono text-flux-400 mb-1">System V · 系统五</p>
        <h3 className="display text-ink-50 text-xl">
          {lang === "en" ? "Timeline Branching Simulator" : "时间线分支模拟器"}
        </h3>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        {/* ─── left: SVG tree ─────────────────────────────────────────────── */}
        <div className="relative rounded-lg overflow-hidden border border-flux-500/20 bg-void-950">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            height={SVG_H}
            style={{ display: "block" }}
            aria-label={lang === "en" ? "Many-worlds branching tree" : "多世界分支树"}
          >
            {/* background grid hint */}
            <defs>
              <radialGradient id="bg-grad" cx="10%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1a0a3a" stopOpacity="1" />
                <stop offset="100%" stopColor="#050510" stopOpacity="1" />
              </radialGradient>
            </defs>
            <rect width={SVG_W} height={SVG_H} fill="url(#bg-grad)" />

            {/* depth-level column lines (faint) */}
            {Array.from({ length: currentDepth + 1 }, (_, d) => {
              const x = PAD_LEFT + d * ((SVG_W - PAD_LEFT - PAD_RIGHT) / Math.max(currentDepth, 1));
              return (
                <line
                  key={`col-${d}`}
                  x1={x} y1={PAD_TOP} x2={x} y2={SVG_H - PAD_BOT}
                  stroke="rgba(54,230,255,0.04)"
                  strokeWidth={1}
                  strokeDasharray="2 6"
                />
              );
            })}

            {/* edges */}
            {edges.map((e) => (
              <AnimEdge key={e.id} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} brightness={e.brightness} born={e.born} />
            ))}

            {/* nodes */}
            {nodes.map((n) => {
              const isLeaf = !nodes.some((c) => c.parentId === n.id);
              const r = isLeaf ? NODE_R : NODE_R - 1;
              const elapsed = Date.now() - n.born;
              const appear = Math.min(1, elapsed / 200);
              const col = n.brightness > 0.7
                ? `rgba(54,230,255,${(0.5 + n.brightness * 0.5 * appear).toFixed(2)})`
                : n.brightness > 0.4
                ? `rgba(155,108,255,${(0.3 + n.brightness * 0.5 * appear).toFixed(2)})`
                : `rgba(255,147,182,${(0.2 + n.brightness * 0.4 * appear).toFixed(2)})`;
              return (
                <circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={r * appear}
                  fill={col}
                  style={{ filter: n.brightness > 0.85 ? "drop-shadow(0 0 3px rgba(54,230,255,0.6))" : "none" }}
                />
              );
            })}

            {/* depth label at left */}
            <text x={8} y={SVG_H - 8} fontSize={9} fill="rgba(134,255,208,0.4)" fontFamily="monospace">
              {lang === "en" ? `depth ${currentDepth}` : `深度 ${currentDepth}`}
            </text>
            {/* leaf count at right */}
            <text x={SVG_W - 8} y={SVG_H - 8} fontSize={9} fill="rgba(134,255,208,0.4)" fontFamily="monospace" textAnchor="end">
              {lang === "en" ? `${leaves} leaves` : `${leaves} 叶`}
            </text>
          </svg>
        </div>

        {/* ─── right panel ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* stats bar */}
          <div className="flex gap-3 text-[0.7rem] font-mono text-ink-400 border-b border-flux-500/20 pb-2">
            <span className="text-flux-400">{lang === "en" ? "Depth" : "深度"}&nbsp;<strong className="text-ink-100">{currentDepth}</strong></span>
            <span className="text-flux-400">{lang === "en" ? "Leaves" : "叶子"}&nbsp;<strong className="text-ink-100">{leaves.toLocaleString()}</strong></span>
            <span className="text-flux-400">{lang === "en" ? "Nodes" : "节点"}&nbsp;<strong className="text-ink-100">{nodes.length.toLocaleString()}</strong></span>
          </div>

          {/* control buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleStep}
              disabled={maxReached}
              className="px-4 py-2 rounded text-[0.75rem] font-mono border border-flux-400/40 text-flux-300 bg-flux-500/10 hover:bg-flux-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {lang === "en" ? "Step · 步进" : "步进"}
            </button>
            <button
              onClick={() => setAuto((a) => !a)}
              disabled={maxReached}
              className={`px-4 py-2 rounded text-[0.75rem] font-mono border transition ${
                auto
                  ? "border-gold-400/60 text-gold-300 bg-gold-400/10 hover:bg-gold-400/20"
                  : "border-flux-400/40 text-flux-300 bg-flux-500/10 hover:bg-flux-500/20"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {auto
                ? (lang === "en" ? "Stop · 停止" : "停止")
                : (lang === "en" ? "Auto · 自动" : "自动")}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded text-[0.75rem] font-mono border border-ink-500/30 text-ink-400 hover:text-ink-200 hover:border-ink-400/50 transition"
            >
              {lang === "en" ? "Reset · 重置" : "重置"}
            </button>
          </div>

          {/* sliders */}
          <div className="flex flex-col gap-4 pt-1">
            {/* branching factor */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="label-mono text-ink-400 text-[0.7rem]">
                  {lang === "en" ? "Branching factor · 分支因子" : "分支因子"}
                </span>
                <span className="font-mono text-flux-300 text-[0.75rem]">{branchFactor}</span>
              </div>
              <input
                type="range" min={2} max={4} step={1}
                value={branchFactor}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setBranchFactor(v);
                  // reset on change to avoid inconsistent tree
                  setAuto(false);
                  autoRef.current = false;
                  _nextId = 2;
                  const root: TreeNode[] = [{ id: 1, parentId: null, depth: 0, x: PAD_LEFT, y: SVG_H / 2, brightness: 1, born: Date.now() }];
                  setNodes(assignPositions(root, v));
                }}
                className="w-full accent-flux-400 cursor-pointer"
              />
              <div className="flex justify-between text-[0.6rem] font-mono text-ink-500">
                <span>2</span><span>3</span><span>4</span>
              </div>
            </div>

            {/* decoherence */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="label-mono text-ink-400 text-[0.7rem]">
                  {lang === "en" ? "Decoherence · 退相干" : "退相干"}
                </span>
                <span className="font-mono text-flux-300 text-[0.75rem]">{decoherence.toFixed(2)}</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.01}
                value={decoherence}
                onChange={(e) => setDecoherence(Number(e.target.value))}
                className="w-full accent-violet-400 cursor-pointer"
              />
              <div className="flex justify-between text-[0.6rem] font-mono text-ink-500">
                <span>{lang === "en" ? "All equal" : "全部均等"}</span>
                <span>{lang === "en" ? "One survives" : "一枝独明"}</span>
              </div>
            </div>
          </div>

          {/* legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] font-mono text-ink-500 border-t border-flux-500/15 pt-2">
            <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-cyan-400 opacity-80" />{lang === "en" ? "bright branch" : "明亮分支"}</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-violet-400 opacity-60" />{lang === "en" ? "dim branch" : "暗淡分支"}</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-rose-400 opacity-40" />{lang === "en" ? "decohered" : "已退相干"}</span>
          </div>

          {/* ─── interpretation panel ────────────────────────────────────── */}
          <div className="border border-flux-500/25 rounded-lg p-4 bg-void-900/60 flex flex-col gap-3 mt-1">
            <div className="flex items-center justify-between">
              <span className="label-mono text-flux-400 text-[0.65rem]">
                {lang === "en" ? "Interpretation" : "诠释"}&nbsp;
                <span className="text-ink-500">{interpIdx + 1}/{total}</span>
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setInterpIdx((i) => (i - 1 + total) % total)}
                  className="w-6 h-6 rounded flex items-center justify-center border border-flux-500/20 text-flux-400 hover:bg-flux-500/10 text-[0.7rem] transition"
                  aria-label="Previous"
                >‹</button>
                <button
                  onClick={() => setInterpIdx((i) => (i + 1) % total)}
                  className="w-6 h-6 rounded flex items-center justify-center border border-flux-500/20 text-flux-400 hover:bg-flux-500/10 text-[0.7rem] transition"
                  aria-label="Next"
                >›</button>
              </div>
            </div>

            <div>
              <p className="text-ink-100 font-semibold text-[0.85rem] mb-1 lang-fade" key={`name-${interpIdx}-${lang}`}>
                {interp.name[lang]}
              </p>
              <p className={`text-ink-400 text-[0.78rem] leading-relaxed lang-fade ${lang === "zh" ? "zh" : ""}`} key={`idea-${interpIdx}-${lang}`}>
                {interp.idea[lang]}
              </p>
            </div>

            {/* dot indicators */}
            <div className="flex gap-1.5 justify-center pt-1">
              {BRANCH_INTERPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setInterpIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition ${i === interpIdx ? "bg-flux-400" : "bg-ink-600 hover:bg-ink-400"}`}
                  aria-label={`Interpretation ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── caveat strip ─────────────────────────────────────────────────── */}
      <div className="mt-5 border-t border-flux-500/15 pt-4">
        <p className={`text-ink-500 text-[0.73rem] leading-relaxed max-w-3xl ${lang === "zh" ? "zh" : ""}`}>
          {lang === "en"
            ? "Each branch is a parallel history. Many-Worlds reads them as real; Copenhagen reads only the observed branch as real; decoherent histories formalises which sets of branches are mutually consistent."
            : "每一分支都是一段平行的历史。多世界把它们读作真实；哥本哈根只把被观测的分支读作真实；退相干历史则形式化地说明，哪些分支集合彼此自洽。"}
        </p>
      </div>
    </div>
  );
}
