"use client";

import { useState } from "react";
import { useLang, T } from "./lang";
import { ANALYST, LENSES } from "./content";

/* The AI layer, rendered honestly: not a live oracle, but a curated reality
   analyst that answers the hardest open questions from four expert lenses —
   physicist, cosmologist, philosopher, information theorist — comparing the
   views fairly rather than collapsing them into one tidy answer. */

export default function RealityAnalyst() {
  const { lang } = useLang();
  const [qi, setQi] = useState(0);
  const [lens, setLens] = useState("physicist");
  const q = ANALYST[qi];

  return (
    <div className="panel rounded-2xl p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* questions */}
        <div>
          <div className="label-mono">{lang === "zh" ? "选择一个问题" : "choose a question"}</div>
          <div className="mt-4 space-y-2">
            {ANALYST.map((a, i) => (
              <button
                key={i}
                onClick={() => setQi(i)}
                className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm leading-snug transition ${
                  i === qi ? "border-flux-500/50 bg-flux-500/10 text-flux-300" : "border-ink-100/10 text-ink-400 hover:border-flux-500/30 hover:text-ink-200"
                }`}
              >
                <T v={a.q} />
              </button>
            ))}
          </div>
        </div>

        {/* answer */}
        <div>
          <div className="flex flex-wrap gap-2">
            {LENSES.map((l) => (
              <button
                key={l.id}
                onClick={() => setLens(l.id)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] transition ${
                  lens === l.id ? "border-gold-500/60 bg-gold-500/10 text-gold-300" : "border-ink-100/10 text-ink-500 hover:text-gold-400"
                }`}
              >
                <T v={l.role} />
              </button>
            ))}
          </div>

          <h3 className="display mt-5 text-2xl text-ink-50"><T v={q.q} /></h3>

          <div key={`${qi}-${lens}`} className="mt-4 rounded-xl border border-flux-500/20 bg-gradient-to-br from-flux-500/[0.06] to-transparent p-5 lang-fade">
            <div className="label-mono">
              <T v={LENSES.find((l) => l.id === lens)!.role} /> · {lang === "zh" ? "视角" : "lens"}
            </div>
            <p className="mt-3 font-serif text-base leading-relaxed text-ink-100 md:text-lg">
              <T v={q.answers[lens]} />
            </p>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-500">
            {lang === "zh"
              ? "每条回答都力求忠实于该领域的主流理解，公平地呈现竞争性的理论，并标明何处仍是开放问题——而非把推测当作定论。"
              : "Each answer aims to be faithful to the mainstream understanding of its field, to present competing theories fairly, and to flag where the question remains genuinely open — rather than dressing speculation as settled fact."}
          </p>
        </div>
      </div>
    </div>
  );
}
