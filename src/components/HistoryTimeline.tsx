"use client";

import { useState } from "react";
import { useLang, T } from "./lang";
import { HISTORY } from "./content";

/* The long revolution — a vertical timeline of how the picture of spacetime was
   rebuilt, era by era. A glowing spine threads colour-coded nodes; each card
   states the shift in what space and time were taken to be. */

export default function HistoryTimeline() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* spine */}
      <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-flux-500/10 via-iris-500/40 to-plasm-500/30 md:left-1/2" />

      <ol className="space-y-5">
        {HISTORY.map((e, i) => {
          const left = i % 2 === 0;
          const isOpen = open === i;
          return (
            <li key={i} className={`relative pl-12 md:w-1/2 md:pl-0 ${left ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10"}`}>
              {/* node */}
              <span
                className={`absolute top-3 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 left-[18px] ${left ? "md:left-full" : "md:left-0"}`}
                style={{ borderColor: e.color, background: "#070617", boxShadow: `0 0 12px ${e.color}` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.color }} />
              </span>

              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className={`panel block w-full rounded-xl p-4 text-left transition ${isOpen ? "border-flux-500/40" : ""}`}
              >
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: e.color }}>
                  <T v={e.when} />
                </div>
                <div className="display mt-1 text-lg text-ink-50"><T v={e.who} /></div>
                <div className="mt-0.5 text-sm text-flux-400"><T v={e.shift} /></div>
                <div className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden text-sm leading-relaxed text-ink-300"><T v={e.detail} /></p>
                </div>
                <div className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">
                  {isOpen ? (lang === "zh" ? "− 收起" : "− less") : (lang === "zh" ? "+ 展开" : "+ more")}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
