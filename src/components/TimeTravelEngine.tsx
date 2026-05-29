"use client";

import { ReactNode } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import { SECTIONS, PANELS } from "./content";
import TimeField from "./TimeField";
import TimeDial from "./TimeDial";
import HistoryTimeline from "./HistoryTimeline";
import TimeEngine from "./TimeEngine";
import GravityWell from "./GravityWell";
import BlackHole from "./BlackHole";
import WormholeViz from "./WormholeViz";
import EntropyArrow from "./EntropyArrow";
import TimelineBranchSim from "./TimelineBranchSim";
import QuantumFoam from "./QuantumFoam";
import ParadoxResolver from "./ParadoxResolver";
import HolographicMap from "./HolographicMap";
import CosmicExpansion from "./CosmicExpansion";
import RealityAnalyst from "./RealityAnalyst";
import TimeRadar from "./TimeRadar";
import RecursiveTimeEngine from "./RecursiveTimeEngine";

function ConceptPanels({ id }: { id: string }) {
  const { lang } = useLang();
  const set = PANELS[id];
  if (!set) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {set.map((c, i) => (
        <div key={i} className="panel rounded-xl p-5">
          <div key={lang} className={`display text-base text-flux-400 lang-fade ${lang === "zh" ? "zh" : ""}`}>{c.t[lang]}</div>
          <p key={`d-${lang}`} className={`mt-2 text-sm leading-relaxed text-ink-300 lang-fade ${lang === "zh" ? "zh" : ""}`}>{c.d[lang]}</p>
        </div>
      ))}
    </div>
  );
}

const VIS: Record<string, ReactNode> = {
  what: <TimeEngine />,
  relativity: <GravityWell />,
  wormhole: (
    <div className="space-y-12">
      <BlackHole />
      <WormholeViz />
    </div>
  ),
  arrow: <EntropyArrow />,
  branch: (
    <div className="space-y-12">
      <TimelineBranchSim />
      <QuantumFoam />
    </div>
  ),
  paradox: <ParadoxResolver />,
  mind: <ConceptPanels id="mind" />,
  info: <HolographicMap />,
  civ: (
    <div className="space-y-12">
      <CosmicExpansion />
      <ConceptPanels id="future" />
    </div>
  ),
};

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-ink-100/10 bg-void-950/80 px-5 py-3 backdrop-blur md:px-9">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-md border border-flux-500/30 bg-void-800">
          <svg viewBox="0 0 32 32" className="h-5 w-5">
            {/* time mark: clock-like radii + warped ring */}
            <circle cx="16" cy="16" r="11" fill="none" stroke="#36e6ff" strokeWidth="1.4" opacity="0.85" />
            <ellipse cx="16" cy="16" rx="11" ry="6" fill="none" stroke="#9b6cff" strokeWidth="1.4" opacity="0.8" transform="rotate(35 16 16)" />
            <line x1="16" y1="16" x2="16" y2="6.5" stroke="#ffd277" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="16" y1="16" x2="22" y2="20" stroke="#ff93b6" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.8" fill="#86ffd0" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="display text-base text-ink-50">Time Travel Engine</div>
          <div className="zh text-[0.6rem] text-ink-500">时间旅行引擎</div>
        </div>
      </div>
      <nav className="hidden gap-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-500 lg:flex">
        <a href="#dial" className="hover:text-flux-400">Dial</a>
        <a href="#wormhole" className="hover:text-flux-400">Wormholes</a>
        <a href="#arrow" className="hover:text-flux-400">Arrow</a>
        <a href="#paradox" className="hover:text-flux-400">Paradoxes</a>
        <a href="#analyst" className="hover:text-flux-400">Analyst</a>
        <a href="#future" className="hover:text-flux-400">Future</a>
      </nav>
      <div className="flex items-center gap-3">
        <LangToggle />
        <a href="https://psyverse.fun" className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-flux-500 hover:text-flux-400 sm:block">← Psyverse</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <TimeField />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-void-950/30 via-transparent to-void-950" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="label-mono">Psyverse · the time travel engine</div>
        <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink-500">
          EN · 中文 · time × causality × wormholes × paradox × consciousness
        </div>
        <h1 className="display mt-6 text-5xl leading-[0.94] text-ink-50 md:text-8xl">
          Time <span className="spark-text">Travel</span> Engine
        </h1>
        <h2 className="zh mt-3 text-3xl text-ink-200 md:text-5xl">时间旅行引擎</h2>

        <p className="mt-9 max-w-2xl font-serif text-lg leading-relaxed text-ink-100 md:text-xl">
          <T v={{
            en: "We feel time as a flowing river, but physics increasingly suggests it may not flow at all — only branch, leak, dilate, and run in the direction entropy chooses. This is an atlas of what we know and what we don't: special and general relativity, wormholes, the arrow of time, many-worlds branching, the three classical paradoxes, the consciousness of time, and the unfinished question of whether any civilization could ever build a real time machine.",
            zh: "我们感受时间为一条奔流之河，然而物理学越来越多地暗示，它或许根本不流动——只是分支、泄漏、膨胀，并沿熵所选择的方向奔走。这是一张图志：关于我们所知与所不知——狭义与广义相对论、虫洞、时间之箭、多世界分支、三大经典悖论、时间的意识，以及那个未完的问题：任何文明能否真正建造一台时间机器。",
          }} />
        </p>

        <div className="mt-10 max-w-2xl panel rounded-lg p-6">
          <div className="label-mono">Central thesis · 核心论点</div>
          <p className="mt-3 font-serif text-xl leading-relaxed text-ink-50 md:text-2xl">
            <T v={{
              en: "Time travel may not be moving through time. It may be manipulating causality, information and the structure of reality itself.",
              zh: "时间旅行也许并非穿越时间。它也许是操作因果、信息，与现实结构本身。",
            }} />
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-500">
          <span>10 systems · 十大系统</span>
          <span>change · entropy · information · causality · observation</span>
          <span>relativity · wormholes · many-worlds · paradoxes · engineering</span>
        </div>
      </div>
    </section>
  );
}

function SectionBlock({ s, vis }: { s: (typeof SECTIONS)[number]; vis?: ReactNode }) {
  return (
    <section id={s.id} className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="label-mono"><T v={s.kicker} /></div>
        <div className="mt-3 flex items-baseline gap-4">
          <span className="display text-5xl text-flux-500/30">{s.num}</span>
          <div>
            <h2 className="display text-3xl text-ink-50 md:text-5xl"><T v={s.title} /></h2>
            <h3 className="mt-1 text-base text-flux-400 md:text-lg"><T v={s.sub} /></h3>
          </div>
        </div>
        <div className="mt-5 h-px rule-flux opacity-60" />
        <p className="mt-8 max-w-3xl font-serif text-lg leading-relaxed text-ink-200"><T v={s.body} /></p>
        <div className="mt-5 flex items-start gap-3 max-w-3xl">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-400" />
          <p className="font-serif text-base italic leading-relaxed text-gold-300/90"><T v={s.ask} /></p>
        </div>
        {vis && <div className="mt-12">{vis}</div>}
      </div>
    </section>
  );
}

function Body() {
  const { lang } = useLang();
  const future = SECTIONS.find((s) => s.id === "future")!;
  const rest = SECTIONS.filter((s) => s.id !== "future");

  return (
    <main className="relative bg-void-950 text-ink-100">
      <Header />
      <Hero />

      {/* historical climb */}
      <section className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">The long climb · 漫长的攀升</div>
          <h2 className="display mt-3 text-4xl text-ink-50 md:text-5xl">
            <T v={{ en: "How time stopped being absolute", zh: "时间，如何不再绝对" }} />
          </h2>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-ink-200">
            <T v={{
              en: "Two and a half millennia of trying to pin time down. From Aristotle's 'measure of motion' to Newton's universal clock, then Boltzmann's statistical arrow, Einstein's relative one, Gödel's loops, Everett's branches, and finally — perhaps — time as something that emerges, like temperature, from a deeper layer.",
              zh: "试图把时间钉住的两千五百年。从亚里士多德的『运动的度量』，到牛顿的普适之钟，再到玻尔兹曼的统计之箭、爱因斯坦的相对之箭、哥德尔的闭环、埃弗雷特的分支，最终——或许——时间，作为某种、像温度一样、从一个更深之层中涌现之物。",
            }} />
          </p>
          <div className="mt-12"><HistoryTimeline /></div>
        </div>
      </section>

      {/* ticker */}
      <div className="border-y border-ink-100/10 bg-void-900 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-flux-400/80">
          {(lang === "zh"
            ? "时间 · 因果 · 时空 · 相对论 · 时间膨胀 · 黑洞 · 虫洞 · 闭合类时曲线 · 时间之箭 · 多世界 · 祖父悖论 · 自举悖论 · 预定悖论 · 块状宇宙 · 涌现时间 · 时间或许是被建构之物 · "
            : "TIME · CAUSALITY · SPACETIME · RELATIVITY · TIME DILATION · BLACK HOLES · WORMHOLES · CLOSED TIMELIKE CURVES · ARROW OF TIME · MANY-WORLDS · GRANDFATHER PARADOX · BOOTSTRAP PARADOX · PREDESTINATION · BLOCK UNIVERSE · EMERGENT TIME · TIME MAY BE CONSTRUCTED · ").repeat(2)}
        </div>
      </div>

      {/* Feature — the time dial */}
      <section id="dial" className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">The time dial · 时间旋钮</div>
          <h2 className="display mt-3 text-4xl text-ink-50 md:text-5xl">
            <T v={{ en: "Turn the dial, bend the clock", zh: "转动旋钮，弯曲钟" }} />
          </h2>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-ink-200">
            <T v={{
              en: "Three lenses, three mechanisms by which established physics already lets time bend. Push a clock toward light speed and γ climbs. Drop a clock toward a black hole and time slows on its surface. Zoom across sixty orders of magnitude in time and meet the regime each scale belongs to — from quantum-gravity Planck-time foam to the longest-lived black holes.",
              zh: "三道透镜，三种已确立的物理学允许时间弯曲的机制。把一只钟推向光速，γ 攀升。把一只钟掷向黑洞，其表面的时间放慢。在时间上横跨六十个数量级缩放，遇见每一个尺度所属的物理区域——从量子引力的普朗克时间泡沫，到寿命最长的黑洞。",
            }} />
          </p>
          <div className="mt-10"><TimeDial /></div>
        </div>
      </section>

      {/* Sections 01–09 */}
      {rest.map((s) => (
        <SectionBlock key={s.id} s={s} vis={VIS[s.id]} />
      ))}

      {/* The Reality Analyst — AI layer */}
      <section id="analyst" className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">The reality analyst · 现实分析者</div>
          <h2 className="display mt-3 text-4xl text-ink-50 md:text-5xl">
            <T v={{ en: "Ask the open questions", zh: "追问那些开放的问题" }} />
          </h2>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-ink-200">
            <T v={{
              en: "The hardest questions about time don't have one answer — they have several, depending on which expert you ask. Pose a question, then hear it from a physicist, a cosmologist, a philosopher, an information theorist, a consciousness researcher and a temporal-systems analyst in turn. Where they agree is solid ground; where they diverge is the live frontier.",
              zh: "关于时间最困难的问题，并没有单一的答案——而是有数个，取决于你问的是哪位专家。提出一个问题，再依次听物理学家、宇宙学家、哲学家、信息论者、意识研究者，与时间系统分析者作答。他们一致之处，是坚实的地面；他们分歧之处，便是活跃的前沿。",
            }} />
          </p>
          <div className="mt-10"><RealityAnalyst /></div>
        </div>
      </section>

      {/* Meta-model — the time architecture radar */}
      <section id="model" className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">Meta-model · 元模型</div>
          <h2 className="display mt-3 text-4xl text-ink-50 md:text-5xl">
            <T v={{ en: "The architecture of time", zh: "时间的建构" }} />
          </h2>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-ink-200">
            <T v={{
              en: "If time has an anatomy, it has ingredients. Score each major regime of physics across seven of them — change, entropy, information, causality, observer, geometry and probability — and a distinctive shape appears. Newtonian, relativistic, thermal, quantum and holographic accounts each trace a very different polygon.",
              zh: "如果时间有一套解剖结构，它便有其成分。把每一个主要的物理区域，在七者上打分——变化、熵、信息、因果、观察者、几何与概率——一个独特的形状便会显现。牛顿式、相对论、热力学、量子与全息的叙述，各自描出截然不同的多边形。",
            }} />
          </p>
          <div className="mt-6 max-w-3xl rounded-lg border border-flux-500/20 bg-void-900/50 p-4 font-mono text-[0.7rem] leading-relaxed text-flux-400/90">
            {lang === "zh"
              ? "时间 = 变化 + 熵 + 信息 + 因果 + 观察者 + 几何 + 概率"
              : "Time = Change + Entropy + Information + Causality + Observer + Geometry + Probability"}
          </div>
          <div className="mt-12"><TimeRadar /></div>
        </div>
      </section>

      {/* Section 10 — the unified time model */}
      <section id={future.id} className="relative border-t border-ink-100/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono"><T v={future.kicker} /></div>
          <div className="mt-3 flex items-baseline gap-4">
            <span className="display text-5xl text-flux-500/30">{future.num}</span>
            <div>
              <h2 className="display text-3xl text-ink-50 md:text-5xl"><T v={future.title} /></h2>
              <h3 className="mt-1 text-base text-flux-400 md:text-lg"><T v={future.sub} /></h3>
            </div>
          </div>
          <div className="mt-5 h-px rule-flux opacity-60" />
          <p className="mt-8 max-w-3xl font-serif text-lg leading-relaxed text-ink-200"><T v={future.body} /></p>
          <div className="mt-5 flex items-start gap-3 max-w-3xl">
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-400" />
            <p className="font-serif text-base italic leading-relaxed text-gold-300/90"><T v={future.ask} /></p>
          </div>
          <div className="mt-12"><RecursiveTimeEngine /></div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-ink-100/8 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-4xl leading-snug text-ink-50 md:text-6xl">
            <T v={{ en: "Past, present and future may all coexist within a deeper architecture beyond ordinary perception.", zh: "过去、现在与未来，或许都共存于一个超出寻常感知的、更深建构之中。" }} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg leading-relaxed text-ink-300">
            <T v={{
              en: "We have a one-way ticket to the future — that's textbook relativity. We have mathematical doors to the past — wormholes, Kerr interiors, Gödel universes — none of which we can yet open. We have several ways to talk about paradoxes without contradiction — Novikov, branching, fixed-point CTCs — and no way to test which is right. We have, perhaps, a horizon: if time itself is emergent, then 'travelling' in it is a question about navigating correlations in a deeper substrate. The river image may not survive the next century. What survives is the question.",
              zh: "我们持有一张单向去往未来的车票——这是教科书相对论。我们持有数扇通向过去的数学之门——虫洞、克尔内部、哥德尔宇宙——其中没有一扇我们能开启。我们持有数种谈论悖论而不陷于矛盾的方式——诺维科夫、分支、不动点 CTC——而没有任何方式去检验哪一种正确。我们或许持有一道地平线：若时间本身是涌现的，那么『在其中旅行』，便变成一个关于在更深基底中航行关联的问题。河流这一意象，或许撑不过下一个世纪。能撑下去的，是那个问题。",
            }} />
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-flux-500/25 bg-void-900 p-5">
            <p className="text-xs leading-relaxed text-ink-500">
              <T v={{
                en: "A conceptual, educational resource synthesising relativity, quantum theory, thermodynamics, information physics and consciousness studies. Interpretive, not the last word — every frontier here remains an open scientific and philosophical question, and speculation is marked as such.",
                zh: "一份概念性、教育性的资料，综合了相对论、量子理论、热力学、信息物理与意识研究。它是诠释，而非定论——此处的每一道前沿，都仍是开放的科学与哲学问题，推测之处亦已如实标明。",
              }} />
            </p>
          </div>
          <div className="mx-auto mt-12 h-px w-40 rule-flux" />
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-flux-500/70">
            Time Travel Engine · 时间旅行引擎 · Psyverse · 2026
          </p>
        </div>
      </section>

      <footer className="border-t border-ink-100/10 bg-void-950 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="display text-xl text-ink-50">Time Travel Engine</div>
            <div className="zh mt-1 text-sm text-ink-300">时间旅行引擎</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              <T v={{ en: "Time, causality, relativity, wormholes, entropy, many-worlds, paradoxes, consciousness, simulation and temporal engineering — and the question of whether time itself is fundamental, emergent, or something we have not yet learned to ask the right question about.", zh: "时间、因果、相对论、虫洞、熵、多世界、悖论、意识、模拟与时间工程——以及那个问题：时间本身是基本的、涌现的，还是某种我们尚未学会以正确方式追问之物。" }} />
            </p>
          </div>
          <div>
            <div className="label-mono">Systems · 系统</div>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-500">
              {SECTIONS.slice(0, 6).map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-flux-400">{s.num} · <T v={s.title} /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-mono">Companion archives</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-300">
              <li><a href="https://spacetime-engine.psyverse.fun" className="hover:text-flux-300">Spacetime Engine · 时空引擎</a></li>
              <li><a href="https://eleven-dimensions.psyverse.fun" className="hover:text-flux-300">Eleven-Dimensions Engine · 十一维引擎</a></li>
              <li><a href="https://entropy.psyverse.fun" className="hover:text-flux-300">Entropy · 熵</a></li>
              <li><a href="https://quantum-reality.psyverse.fun" className="hover:text-flux-300">Quantum Reality · 量子现实</a></li>
              <li><a href="https://consciousness.psyverse.fun" className="hover:text-flux-300">Consciousness · 意识</a></li>
              <li className="pt-3"><a href="https://psyverse.fun" className="text-flux-500 hover:text-flux-300">↩ All Psyverse archives</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-7xl rule-flux" />
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-[0.58rem] uppercase tracking-[0.3em] text-ink-500">
          <div>© 2026 Gewenbo · Psyverse</div>
          <div>EN · 中文 · educational</div>
        </div>
      </footer>
    </main>
  );
}

export default function TimeTravelEngine() {
  return (
    <LangProvider>
      <Body />
    </LangProvider>
  );
}
