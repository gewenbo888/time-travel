"use client";

import { useMemo, useState } from "react";
import { PARADOXES } from "./content";
import { useLang, T } from "./lang";

type ParadoxId = "grandfather" | "bootstrap" | "predestination";
type ResolutionId = string;

/* ── setup glyphs: 280×120, gold/rose palette ─────────────────────────── */

function GlyphGrandfather() {
  return (
    <svg
      viewBox="0 0 280 120"
      width={280}
      height={120}
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* ── timeline arrow top ──────────────────────────── */}
      <line x1="60" y1="30" x2="220" y2="30" stroke="#ffd277" strokeWidth="1.5" strokeDasharray="4 5" />
      <polygon points="220,26 228,30 220,34" fill="#ffd277" />
      <text x="232" y="34" fontSize="9" fill="#ffd277" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">PAST</text>

      {/* ── traveller figure (you) ───────────────────────── */}
      <circle cx="80" cy="56" r="7" stroke="#ff93b6" strokeWidth="1.5" />
      <line x1="80" y1="63" x2="80" y2="82" stroke="#ff93b6" strokeWidth="1.5" />
      <line x1="80" y1="70" x2="70" y2="78" stroke="#ff93b6" strokeWidth="1.5" />
      <line x1="80" y1="70" x2="90" y2="78" stroke="#ff93b6" strokeWidth="1.5" />
      <line x1="80" y1="82" x2="72" y2="96" stroke="#ff93b6" strokeWidth="1.5" />
      <line x1="80" y1="82" x2="88" y2="96" stroke="#ff93b6" strokeWidth="1.5" />
      <text x="64" y="106" fontSize="8" fill="#ff93b6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">YOU</text>

      {/* ── causal arrow downward ────────────────────────── */}
      <path d="M 80 100 C 80 115 140 115 140 100" stroke="#ffd277" strokeWidth="1.2" />
      <path d="M 140 100 C 140 115 200 115 200 100" stroke="#ffd277" strokeWidth="1.2" />
      <text x="108" y="114" fontSize="7.5" fill="#ffd277" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">travels back</text>

      {/* ── grandfather figure ───────────────────────────── */}
      <circle cx="200" cy="56" r="7" stroke="#ffd277" strokeWidth="1.5" />
      <line x1="200" y1="63" x2="200" y2="82" stroke="#ffd277" strokeWidth="1.5" />
      <line x1="200" y1="70" x2="190" y2="78" stroke="#ffd277" strokeWidth="1.5" />
      <line x1="200" y1="70" x2="210" y2="78" stroke="#ffd277" strokeWidth="1.5" />
      <line x1="200" y1="82" x2="192" y2="96" stroke="#ffd277" strokeWidth="1.5" />
      <line x1="200" y1="82" x2="208" y2="96" stroke="#ffd277" strokeWidth="1.5" />
      <text x="178" y="106" fontSize="8" fill="#ffd277" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">GRANDPA</text>

      {/* ── red X over grandpa ───────────────────────────── */}
      <line x1="188" y1="48" x2="212" y2="72" stroke="#ff5d8f" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="212" y1="48" x2="188" y2="72" stroke="#ff5d8f" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── contradiction arrow back ──────────────────────── */}
      <path
        d="M 198 26 C 198 12 82 12 82 26"
        stroke="#ff5d8f"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      <polygon points="82,22 76,28 88,28" fill="#ff5d8f" />
      <text x="108" y="10" fontSize="7.5" fill="#ff5d8f" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">∴ never born</text>
    </svg>
  );
}
function GlyphBootstrap() {
  return (
    <svg
      viewBox="0 0 280 120"
      width={280}
      height={120}
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* ── outer circular arrow ─────────────────────────── */}
      <path
        d="M 140 18 A 52 52 0 1 1 92 97"
        stroke="#ffd277"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <polygon points="88,90 86,103 98,97" fill="#ffd277" />

      {/* ── book in centre ───────────────────────────────── */}
      <rect x="119" y="47" width="42" height="30" rx="2" stroke="#ffd277" strokeWidth="1.4" fill="rgba(255,210,119,0.06)" />
      <line x1="140" y1="47" x2="140" y2="77" stroke="#ffd277" strokeWidth="0.8" />
      <line x1="124" y1="53" x2="138" y2="53" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />
      <line x1="124" y1="57" x2="138" y2="57" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />
      <line x1="124" y1="61" x2="138" y2="61" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />
      <line x1="142" y1="53" x2="156" y2="53" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />
      <line x1="142" y1="57" x2="156" y2="57" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />
      <line x1="142" y1="61" x2="156" y2="61" stroke="#ffd277" strokeWidth="0.7" opacity="0.5" />

      {/* ── "?" label ────────────────────────────────────── */}
      <text x="132" y="98" fontSize="18" fill="#ff93b6" fontFamily="Space Grotesk, sans-serif" fontWeight="700">?</text>

      {/* ── "who wrote it?" label ──────────────────────────── */}
      <text x="66" y="17" fontSize="8" fill="#ff93b6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">WHO WROTE IT?</text>

      {/* ── "you → Shakespeare" label ──────────────────────── */}
      <text x="154" y="113" fontSize="7.5" fill="#ffd277" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">no origin</text>

      {/* ── timeline tick: future → past → future ─────────── */}
      <text x="14" y="62" fontSize="7" fill="#ffd277" opacity="0.6" fontFamily="JetBrains Mono, monospace">FUTURE</text>
      <text x="236" y="62" fontSize="7" fill="#ffd277" opacity="0.6" fontFamily="JetBrains Mono, monospace">PAST</text>
    </svg>
  );
}
function GlyphPredestination() {
  return (
    <svg
      viewBox="0 0 280 120"
      width={280}
      height={120}
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* ── horizontal timeline ──────────────────────────── */}
      <line x1="30" y1="60" x2="250" y2="60" stroke="#ffd277" strokeWidth="1.2" opacity="0.35" />
      <polygon points="250,56 258,60 250,64" fill="#ffd277" opacity="0.35" />

      {/* ── "PAST" → "FUTURE" labels ─────────────────────── */}
      <text x="22" y="54" fontSize="7" fill="#ffd277" opacity="0.5" fontFamily="JetBrains Mono, monospace">PAST</text>
      <text x="238" y="54" fontSize="7" fill="#ffd277" opacity="0.5" fontFamily="JetBrains Mono, monospace">FUTURE</text>

      {/* ── "CAUSE" event node ───────────────────────────── */}
      <circle cx="80" cy="60" r="9" stroke="#ffd277" strokeWidth="1.4" fill="rgba(255,210,119,0.08)" />
      <text x="63" y="79" fontSize="7.5" fill="#ffd277" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">CAUSE</text>

      {/* ── "DISASTER" event node ────────────────────────── */}
      <circle cx="200" cy="60" r="9" stroke="#ff5d8f" strokeWidth="1.4" fill="rgba(255,93,143,0.08)" />
      <text x="178" y="79" fontSize="7.5" fill="#ff5d8f" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">DISASTER</text>

      {/* ── forward causal arrow cause → disaster ─────────── */}
      <path d="M 89 60 L 190 60" stroke="#ffd277" strokeWidth="1.2" markerEnd="url(#arrowGold)" />
      <defs>
        <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#ffd277" />
        </marker>
        <marker id="arrowPlasm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#ff93b6" />
        </marker>
      </defs>

      {/* ── "intervention" hand arc from future to past ──── */}
      <path
        d="M 200 48 C 200 16 80 16 80 48"
        stroke="#ff93b6"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        markerEnd="url(#arrowPlasm)"
      />
      <text x="106" y="13" fontSize="7.5" fill="#ff93b6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">intervention</text>

      {/* ── recursive label at bottom ─────────────────────── */}
      <text x="90" y="100" fontSize="7.5" fill="#ff5d8f" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">∴ you caused it</text>
    </svg>
  );
}

/* ── resolution diagrams: 280×110, mint/cyan palette ──────────────────── */

function DiagramNovikov() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      {/* ── closed loop ──────────────────────────────────── */}
      <ellipse cx="140" cy="54" rx="80" ry="34" stroke="#86ffd0" strokeWidth="1.5" strokeDasharray="5 6" />
      <polygon points="62,50 56,56 68,56" fill="#86ffd0" />

      {/* ── green check on loop ───────────────────────────── */}
      <circle cx="140" cy="54" r="16" fill="rgba(134,255,208,0.08)" stroke="#86ffd0" strokeWidth="1.2" />
      <polyline points="131,54 138,61 150,46" stroke="#86ffd0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── crossed out contradiction ─────────────────────── */}
      <text x="30" y="26" fontSize="7" fill="#ff5d8f" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em" opacity="0.7">kill grandpa</text>
      <line x1="28" y1="29" x2="100" y2="18" stroke="#ff5d8f" strokeWidth="1.2" opacity="0.7" />
      <line x1="28" y1="18" x2="100" y2="29" stroke="#ff5d8f" strokeWidth="1.2" opacity="0.7" />

      {/* ── label ────────────────────────────────────────── */}
      <text x="92" y="100" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">CONSISTENT ONLY</text>
    </svg>
  );
}
function DiagramBranching() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      {/* ── original timeline ─────────────────────────────── */}
      <line x1="20" y1="55" x2="110" y2="55" stroke="#86ffd0" strokeWidth="1.6" />
      <text x="16" y="49" fontSize="7" fill="#86ffd0" opacity="0.55" fontFamily="JetBrains Mono, monospace">A</text>

      {/* ── fork node ─────────────────────────────────────── */}
      <circle cx="110" cy="55" r="5" fill="#86ffd0" opacity="0.9" />

      {/* ── your branch (unchanged, continues straight) ────── */}
      <line x1="115" y1="55" x2="260" y2="55" stroke="#86ffd0" strokeWidth="1.6" />
      <polygon points="260,51 268,55 260,59" fill="#86ffd0" />
      <text x="232" y="49" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">YOURS</text>

      {/* ── new branch (altered, angles down) ─────────────── */}
      <line x1="114" y1="58" x2="260" y2="88" stroke="#36e6ff" strokeWidth="1.4" strokeDasharray="4 5" />
      <polygon points="256,82 264,91 263,80" fill="#36e6ff" />
      <text x="228" y="103" fontSize="7.5" fill="#36e6ff" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">ALTERED</text>

      {/* ── labels ───────────────────────────────────────── */}
      <text x="22" y="72" fontSize="7" fill="#86ffd0" opacity="0.6" fontFamily="JetBrains Mono, monospace">SHARED</text>
      <text x="14" y="80" fontSize="7" fill="#86ffd0" opacity="0.6" fontFamily="JetBrains Mono, monospace">HISTORY</text>
    </svg>
  );
}

function DiagramDeutsch() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      {/* ── CTC loop ──────────────────────────────────────── */}
      <ellipse cx="140" cy="52" rx="86" ry="32" stroke="#36e6ff" strokeWidth="1.5" />
      <polygon points="56,48 50,54 62,54" fill="#36e6ff" />

      {/* ── quantum state dots on loop ─────────────────────── */}
      <circle cx="100" cy="36" r="4.5" stroke="#86ffd0" strokeWidth="1.2" fill="rgba(134,255,208,0.1)" />
      <text x="95" y="40" fontSize="8" fill="#86ffd0" fontFamily="JetBrains Mono, monospace">ψ</text>
      <circle cx="180" cy="36" r="4.5" stroke="#86ffd0" strokeWidth="1.2" fill="rgba(134,255,208,0.1)" />
      <text x="175" y="40" fontSize="8" fill="#86ffd0" fontFamily="JetBrains Mono, monospace">ψ</text>
      <circle cx="140" cy="84" r="4.5" stroke="#86ffd0" strokeWidth="1.2" fill="rgba(134,255,208,0.1)" />
      <text x="135" y="88" fontSize="8" fill="#86ffd0" fontFamily="JetBrains Mono, monospace">ψ</text>

      {/* ── FIXED POINT badge ─────────────────────────────── */}
      <rect x="100" y="45" width="80" height="16" rx="3" fill="rgba(54,230,255,0.1)" stroke="#36e6ff" strokeWidth="0.9" />
      <text x="108" y="57" fontSize="7.5" fill="#36e6ff" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">FIXED POINT</text>

      {/* ── bottom label ──────────────────────────────────── */}
      <text x="68" y="104" fontSize="7.5" fill="#36e6ff" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">ρ(U·ρ·U†) = ρ  only</text>
    </svg>
  );
}
function DiagramSelfConsistent() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      {/* ── closed causal loop ────────────────────────────── */}
      <ellipse cx="140" cy="50" rx="88" ry="30" stroke="#86ffd0" strokeWidth="1.5" strokeDasharray="5 6" />
      <polygon points="54,46 48,52 60,52" fill="#86ffd0" />

      {/* ── loop label ────────────────────────────────────── */}
      <rect x="98" y="40" width="84" height="16" rx="3" fill="rgba(134,255,208,0.07)" stroke="#86ffd0" strokeWidth="0.8" />
      <text x="104" y="52" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">self-cause = ok</text>

      {/* ── dashed origin removed ─────────────────────────── */}
      <line x1="46" y1="76" x2="234" y2="76" stroke="#36e6ff" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.45" />
      <text x="60" y="88" fontSize="7" fill="#36e6ff" opacity="0.7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">no external origin needed</text>

      {/* ── bottom note ───────────────────────────────────── */}
      <text x="78" y="103" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">causal loop is self-sufficient</text>
    </svg>
  );
}

function DiagramInfoBound() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      <ellipse cx="140" cy="50" rx="80" ry="26" stroke="#36e6ff" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" />
      <text x="115" y="62" fontSize="32" fill="none" stroke="#86ffd0" strokeWidth="1.2" fontFamily="Space Grotesk, sans-serif" fontWeight="700">𝒮</text>
      <text x="152" y="51" fontSize="9" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">≤ A/4lp²</text>
      <line x1="222" y1="50" x2="200" y2="50" stroke="#36e6ff" strokeWidth="1.2" strokeDasharray="3 4" />
      <text x="224" y="46" fontSize="7.5" fill="#36e6ff" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">BOUND</text>
      <text x="56" y="88" fontSize="7.5" fill="#ff5d8f" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em" opacity="0.8">ΔI_loop &gt; 0</text>
      <line x1="52" y1="91" x2="140" y2="80" stroke="#ff5d8f" strokeWidth="1.2" opacity="0.8" />
      <line x1="52" y1="80" x2="140" y2="91" stroke="#ff5d8f" strokeWidth="1.2" opacity="0.8" />
      <text x="148" y="100" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">loop bounded</text>
    </svg>
  );
}
function DiagramCompatibilist() {
  return (
    <svg viewBox="0 0 280 110" width={280} height={110} fill="none" aria-hidden="true" className="mx-auto">
      {/* ── person figure (centre) ───────────────────────── */}
      <circle cx="140" cy="34" r="9" stroke="#86ffd0" strokeWidth="1.5" />
      <line x1="140" y1="43" x2="140" y2="64" stroke="#86ffd0" strokeWidth="1.5" />
      <line x1="140" y1="52" x2="128" y2="60" stroke="#86ffd0" strokeWidth="1.5" />
      <line x1="140" y1="52" x2="152" y2="60" stroke="#86ffd0" strokeWidth="1.5" />
      <line x1="140" y1="64" x2="130" y2="78" stroke="#86ffd0" strokeWidth="1.5" />
      <line x1="140" y1="64" x2="150" y2="78" stroke="#86ffd0" strokeWidth="1.5" />

      {/* ── "choice" arrow (left, cyan) ───────────────────── */}
      <path d="M 100 52 L 128 52" stroke="#36e6ff" strokeWidth="1.6" markerEnd="url(#arrowCyan)" />
      <defs>
        <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#36e6ff" />
        </marker>
        <marker id="arrowMint" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#86ffd0" />
        </marker>
      </defs>
      <text x="62" y="48" fontSize="7.5" fill="#36e6ff" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">CHOICE</text>

      {/* ── "predetermined" arrow (right, mint dashed) ──────── */}
      <path d="M 154 52 L 178 52" stroke="#86ffd0" strokeWidth="1.6" strokeDasharray="3 4" markerEnd="url(#arrowMint)" />
      <text x="182" y="48" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">PRE-SET</text>

      {/* ── both arrows point to same outcome ─────────────── */}
      <circle cx="210" cy="90" r="12" stroke="#86ffd0" strokeWidth="1.2" fill="rgba(134,255,208,0.07)" />
      <text x="200" y="94" fontSize="9" fill="#86ffd0" fontFamily="JetBrains Mono, monospace">OUT</text>
      <path d="M 100 58 C 100 90 196 90 196 90" stroke="#36e6ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
      <path d="M 182 58 L 196 88" stroke="#86ffd0" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />

      {/* ── "= same outcome" label ────────────────────────── */}
      <text x="54" y="104" fontSize="7.5" fill="#86ffd0" fontFamily="JetBrains Mono, monospace" letterSpacing="0.05em">both arrows → same outcome</text>
    </svg>
  );
}

/* ── diagram selector ──────────────────────────────────────────────────── */

function ResolutionDiagram({
  paradoxId,
  resolutionId,
}: {
  paradoxId: ParadoxId;
  resolutionId: ResolutionId;
}) {
  return useMemo(() => {
    if (resolutionId === "novikov" && paradoxId === "grandfather") return <DiagramNovikov />;
    if (resolutionId === "branching") return <DiagramBranching />;
    if (resolutionId === "deutsch-ctc") return <DiagramDeutsch />;
    if (resolutionId === "self-consistent") return <DiagramSelfConsistent />;
    if (resolutionId === "info-bound") return <DiagramInfoBound />;
    if (resolutionId === "compatibilist") return <DiagramCompatibilist />;
    if (resolutionId === "novikov" && paradoxId === "predestination") return <DiagramSelfConsistent />;
    return <DiagramNovikov />;
  }, [paradoxId, resolutionId]);
}

/* ── setup diagram selector ────────────────────────────────────────────── */

function SetupGlyph({ paradoxId }: { paradoxId: ParadoxId }) {
  return useMemo(() => {
    if (paradoxId === "grandfather") return <GlyphGrandfather />;
    if (paradoxId === "bootstrap") return <GlyphBootstrap />;
    return <GlyphPredestination />;
  }, [paradoxId]);
}

/* ── accent colours per paradox ────────────────────────────────────────── */

const PARADOX_ACCENT: Record<ParadoxId, string> = {
  grandfather: "#ff5d8f",
  bootstrap: "#ffd277",
  predestination: "#ff93b6",
};

/* ── main component ────────────────────────────────────────────────────── */

export default function ParadoxResolver() {
  const { lang } = useLang();

  const [activeParadox, setActiveParadox] = useState<ParadoxId>("grandfather");
  const [activeRes, setActiveRes] = useState<ResolutionId>("novikov");

  const paradox = PARADOXES.find((p) => p.id === activeParadox)!;
  const resolution = paradox.resolutions.find((r) => r.id === activeRes) ?? paradox.resolutions[0];

  /* when switching paradox, default to that paradox's first resolution */
  function handleParadoxSwitch(id: ParadoxId) {
    setActiveParadox(id);
    const p = PARADOXES.find((x) => x.id === id)!;
    setActiveRes(p.resolutions[0].id);
  }

  const accent = PARADOX_ACCENT[activeParadox];

  return (
    <section id="paradox-resolver" className="relative w-full py-20 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* ── section header ────────────────────────────────── */}
      <div className="mb-12 text-center">
        <p className="label-mono mb-3">
          <T v={{ en: "System VI · the loops", zh: "系统六 · 闭环" }} />
        </p>
        <h2 className="display text-3xl sm:text-4xl text-ink-50 mb-4">
          <T v={{ en: "Temporal Paradoxes", zh: "时间悖论" }} />
        </h2>
        <p className="text-ink-300 text-sm max-w-xl mx-auto" style={{ fontFamily: "Spectral, serif" }}>
          <T
            v={{
              en: "Three classical time-travel paradoxes · 三大经典时间旅行悖论",
              zh: "三大经典时间旅行悖论",
            }}
          />
        </p>
      </div>

      {/* ── paradox tab row ───────────────────────────────── */}
      <div className="flex gap-2 sm:gap-3 mb-8 justify-center flex-wrap" role="tablist">
        {PARADOXES.map((p) => {
          const isActive = p.id === activeParadox;
          const col = PARADOX_ACCENT[p.id as ParadoxId];
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleParadoxSwitch(p.id as ParadoxId)}
              className={`
                relative px-5 py-2.5 rounded-md text-sm transition-all duration-200
                ${lang === "zh" ? "zh" : ""}
                ${
                  isActive
                    ? "bg-void-800 text-ink-50"
                    : "bg-void-900/60 text-ink-300 hover:text-ink-100"
                }
              `}
              style={{
                borderBottom: isActive ? `2px solid ${col}` : "2px solid transparent",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                fontFamily: lang === "zh" ? "Noto Serif SC, serif" : "Space Grotesk, sans-serif",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {p.name[lang]}
            </button>
          );
        })}
      </div>

      {/* ── setup panel ───────────────────────────────────── */}
      <div className="panel panel-gold rounded-xl p-6 sm:p-8 mb-6 rise-in" key={`setup-${activeParadox}`}>
        <p className="label-mono mb-4" style={{ color: accent }}>
          Setup · 设定
        </p>

        <h3
          className="display text-2xl sm:text-3xl mb-5"
          style={{ color: accent }}
        >
          {paradox.name[lang]}
        </h3>

        <p
          className={`text-ink-100 leading-relaxed text-base sm:text-lg mb-8 ${lang === "zh" ? "zh" : ""}`}
          style={{ fontFamily: lang === "zh" ? "Noto Serif SC, serif" : "Spectral, serif" }}
        >
          {paradox.setup[lang]}
        </p>

        {/* setup glyph */}
        <div
          className="overflow-hidden rounded-lg py-4"
          style={{
            background: "rgba(255,210,119,0.03)",
            border: "1px solid rgba(255,210,119,0.12)",
          }}
        >
          <SetupGlyph paradoxId={activeParadox} />
        </div>
      </div>

      {/* ── resolution selector ────────────────────────────── */}
      <div className="mb-6">
        <p className="label-mono mb-4 text-center">Resolutions · 解法</p>
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center" role="group">
          {paradox.resolutions.map((r) => {
            const isActive = r.id === resolution.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRes(r.id)}
                className={`
                  px-4 py-2 rounded-md text-sm transition-all duration-200
                  ${lang === "zh" ? "zh" : ""}
                  ${
                    isActive
                      ? "text-ink-50"
                      : "text-ink-300 hover:text-ink-100"
                  }
                `}
                style={{
                  background: isActive
                    ? "rgba(134,255,208,0.12)"
                    : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? "1px solid rgba(134,255,208,0.45)"
                    : "1px solid rgba(255,255,255,0.08)",
                  fontFamily:
                    lang === "zh"
                      ? "Noto Serif SC, serif"
                      : "Space Grotesk, sans-serif",
                  boxShadow: isActive
                    ? "0 0 18px -6px rgba(134,255,208,0.45)"
                    : "none",
                }}
              >
                {r.name[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── selected resolution panel ─────────────────────── */}
      <div
        className="panel rounded-xl p-6 sm:p-8 rise-in"
        key={`res-${activeParadox}-${resolution.id}`}
        style={{ borderColor: "rgba(134,255,208,0.22)" }}
      >
        <p className="label-mono mb-4" style={{ color: "#86ffd0" }}>
          Resolution · 解法
        </p>

        <h4
          className="display text-xl sm:text-2xl mb-4"
          style={{ color: "#86ffd0" }}
        >
          {resolution.name[lang]}
        </h4>

        <p
          className={`text-ink-100 leading-relaxed text-base sm:text-lg mb-8 ${lang === "zh" ? "zh" : ""}`}
          style={{ fontFamily: lang === "zh" ? "Noto Serif SC, serif" : "Spectral, serif" }}
        >
          {resolution.line[lang]}
        </p>

        {/* resolution diagram */}
        <div
          className="overflow-hidden rounded-lg py-4"
          style={{
            background: "rgba(134,255,208,0.03)",
            border: "1px solid rgba(134,255,208,0.12)",
          }}
        >
          <ResolutionDiagram
            paradoxId={activeParadox}
            resolutionId={resolution.id}
          />
        </div>
      </div>

      {/* ── decorative rule ───────────────────────────────── */}
      <div className="rule-flux h-px w-full mt-14 opacity-50" />
    </section>
  );
}
