import { Bi } from "./lang";

export type Panel = { t: Bi; d: Bi };

/* ═══════════════════════════════ THE TEN SYSTEMS ═══════════════════════════════
   Each section is one chamber in the Time Travel Engine. id maps to a dedicated
   visualization in TimeTravelEngine.tsx. */

export interface Section {
  num: string;
  id: string;
  kicker: Bi;
  title: Bi;
  sub: Bi;
  body: Bi;
  ask: Bi;
}

export const SECTIONS: Section[] = [
  {
    num: "01",
    id: "what",
    kicker: { en: "System I · the question", zh: "系统一 · 问题" },
    title: { en: "What Is Time?", zh: "时间是什么？" },
    sub: { en: "Four answers, none agreed on", zh: "四个答案，无一被一致接受" },
    body: {
      en: "Time is the most familiar thing in human experience and one of the worst-understood in physics. We use it constantly — to plan, to remember, to coordinate — yet four serious answers compete for what it actually is. Presentism: only the present is real, the past is gone, the future doesn't yet exist. Eternalism, or the block universe: past, present and future all exist equally; 'now' is like 'here', a label for where you happen to be. The growing block: past and present are real and fixed, the future is open. Thermal or statistical time: direction is not fundamental but emerges from entropy and statistics. Each answer is internally coherent. Each clashes with the others. Relativity quietly favors eternalism by removing universal simultaneity; quantum mechanics keeps a special role for measurement; thermodynamics insists the arrow is real. The question is not academic. How you answer determines whether 'going back in time' is a coherent concept at all.",
      zh: "时间，是人类经验中最熟悉之物，也是物理学中最被误解之物之一。我们时刻都在使用它——为了规划、为了记忆、为了协调——然而对于它究竟是什么，有四种严肃的答案在彼此竞争。现在主义：只有当下是真实的，过去已逝，未来尚不存在。永恒主义或块状宇宙：过去、现在与未来同等地存在；『此刻』就像『此处』，是一个标签，标记你恰好身处之地。生长块：过去与现在是真实而固定的，未来是开放的。热力学或统计学时间：方向并非基本，而是从熵与统计中涌现。每一种答案，在其自身之内都是自洽的。每一种，都与其他相冲突。相对论安静地偏爱永恒主义，因为它取消了普适的同时性；量子力学则为测量保留了一个特殊角色；热力学则坚称那条箭头是真实的。这个问题并非学院式的。你如何作答，决定了『回到过去』是否还是一个自洽的概念。",
    },
    ask: { en: "If 'now' is just where we are in a block universe, what does it mean to travel?", zh: "若『此刻』只是我们在块状宇宙中的所处之地，『旅行』又意味着什么？" },
  },
  {
    num: "02",
    id: "relativity",
    kicker: { en: "System II · the relativity of clocks", zh: "系统二 · 钟的相对性" },
    title: { en: "Relativity & Spacetime", zh: "相对论与时空" },
    sub: { en: "Moving clocks tick slow; clocks deep in gravity tick slower still", zh: "运动的钟走得慢；深陷引力中的钟走得更慢" },
    body: {
      en: "Einstein in 1905 took the constancy of the speed of light seriously and the price was time itself. If light has the same speed for every observer, then clocks moving relative to me must be observed to tick slower; rulers, to be shorter; and 'now' to no longer be universal. Ten years later he generalized: gravity is geometry, mass curves spacetime, and clocks deeper in a gravity well tick slower than clocks higher up. Both predictions have been confirmed to extreme precision — GPS satellites correct for both special-relativistic and gravitational time dilation, otherwise positions would drift by kilometers a day. This is the closest thing to 'time travel' that established physics actually delivers: a one-way trip to the future. Travel close to light speed or sit near a black hole long enough and, by your clock, the world ages faster than you do. Returning younger than your twin is not paradox but textbook.",
      zh: "1905 年，爱因斯坦严肃对待了光速恒定这一事实，而代价是时间本身。若光对每一个观察者都有同样的速度，那么相对于我运动的钟，被观察到必走得更慢；尺，必更短；而『此刻』，不再普适。十年后他把这一切推广：引力即几何，质量弯曲时空，深陷引力井中的钟，比高处的钟走得更慢。两项预言均已被极高精度证实——GPS 卫星同时修正狭义相对论与引力时间膨胀，否则位置每天会漂移数公里。这是已确立的物理学真正交付的、最接近『时间旅行』之物：一张单向去往未来的车票。靠近光速旅行，或在黑洞附近停留得够久，按你的钟看，世界比你老得更快。比你的孪生兄弟更年轻地归来，不是悖论，而是教科书。",
    },
    ask: { en: "If clocks can already disagree, in what sense is 'one time' shared between us at all?", zh: "若钟已经可以彼此不一致，又是在何种意义上，我们之间共享着『一个时间』？" },
  },
  {
    num: "03",
    id: "wormhole",
    kicker: { en: "System III · the loopholes", zh: "系统三 · 漏洞" },
    title: { en: "Black Holes, Wormholes & Temporal Geometry", zh: "黑洞、虫洞与时间几何" },
    sub: { en: "Schwarzschild · Kerr · Einstein-Rosen · the open mathematical doors", zh: "史瓦西 · 克尔 · 爱因斯坦-罗森 · 开着的数学之门" },
    body: {
      en: "Einstein's equations are unusually permissive: among their valid solutions are black holes, rotating Kerr black holes, Einstein-Rosen bridges, Gödel's rotating universes, traversable wormholes (Morris-Thorne), and closed timelike curves — paths in spacetime that loop back to their own past. None of these has been observed as a time-travel mechanism, and most require exotic conditions: negative-energy-density 'exotic matter' to hold a wormhole's throat open, rotational energies beyond any astrophysical object, or carefully tuned topology. But they sit in the math, not banished as illegal but flagged as expensive. The honest summary: time travel into the past is not forbidden by general relativity as we know it. What forbids it, perhaps, is some yet-undiscovered protection — Hawking's chronology protection conjecture — that ensures the universe never lets the loop close. Whether nature is shy or merely frugal is open.",
      zh: "爱因斯坦的方程异常宽容：在其有效解中，有黑洞、旋转的克尔黑洞、爱因斯坦-罗森桥、哥德尔的旋转宇宙、可穿越虫洞（莫里斯-索恩）、以及闭合类时曲线——在时空中回到自身过去的路径。这些之中没有一项作为时间旅行机制被观测到，且大多需要奇异的条件：用以撑开虫洞咽喉的、负能量密度的『奇异物质』；超出任何天体的旋转能量；或被精心调校的拓扑结构。但它们栖息于数学之中，并未被作为非法之物逐出，只是被标记为代价高昂。诚实的总结：以我们所知的广义相对论而言，回到过去的时间旅行，并未被禁止。或许禁止它的，是某种尚未被发现的保护——霍金的『时序保护猜想』——它确保宇宙永远不让闭环合拢。自然究竟是腼腆，还是仅仅节俭，仍属开放。",
    },
    ask: { en: "Are wormholes physics, or mathematical decorations general relativity tolerates?", zh: "虫洞是物理，还是广义相对论所容忍的数学装饰？" },
  },
  {
    num: "04",
    id: "arrow",
    kicker: { en: "System IV · the arrow", zh: "系统四 · 那道箭头" },
    title: { en: "The Arrow of Time & Entropy", zh: "时间之箭与熵" },
    sub: { en: "Why eggs break but never unbreak", zh: "为何鸡蛋会碎，却从不复原" },
    body: {
      en: "Almost every fundamental equation in physics is reversible: run it backwards and you get a perfectly valid prediction. Yet the world we experience runs only one way — heat flows from hot to cold, eggs break and never unbreak, memories accumulate of the past and never of the future. The reconciliation is statistical: the macroscopic 'arrow of time' is the second law of thermodynamics, the gradient of entropy. There are many more disordered microstates than ordered ones, so a system left alone almost certainly evolves toward disorder. But this answers only half the question. Why was entropy ever low? Boltzmann's brilliant statistical mechanics has no explanation for the spectacularly low-entropy state of the very early universe — what cosmologists call the 'past hypothesis'. Time's arrow, in this view, points away from a special initial condition, not from a special law. The arrow is real; its origin is borrowed from the Big Bang.",
      zh: "物理学中几乎每一个基本方程，都是可逆的：把它倒着跑，你得到一个完全有效的预言。然而我们所经验的世界，只朝一个方向奔流——热由热处流向冷处，鸡蛋碎了从不复原，记忆只为过去积累、从不为未来积累。调和之策是统计性的：宏观的『时间之箭』，是热力学第二定律，是熵的梯度。无序的微观态远多于有序的，所以一个自我演化的系统，几乎必定朝向无序。但这只回答了一半的问题。熵当初为何低？玻尔兹曼天才的统计力学，对极早期宇宙那种惊人低熵的态没有任何解释——宇宙学家称之为『过去假设』。在此视角下，时间之箭，指向远离一种特殊的初始条件，而非远离一种特殊的定律。箭是真实的；它的来源，是从大爆炸借来的。",
    },
    ask: { en: "Is the arrow of time a law, or just a memory of a fluke beginning?", zh: "时间之箭，是一条定律，还是仅仅一次罕异开端的余响？" },
  },
  {
    num: "05",
    id: "branch",
    kicker: { en: "System V · the branches", zh: "系统五 · 分支" },
    title: { en: "Quantum Mechanics & Multiple Timelines", zh: "量子力学与多重时间线" },
    sub: { en: "If every measurement branches, where do timelines go?", zh: "若每一次测量都分支，时间线又流向何方？" },
    body: {
      en: "Quantum mechanics describes systems in superpositions of states — every measurement appears to pick one outcome out of many. The interpretation of that 'picking' is one of the great unsettled questions in physics. The Copenhagen reading says the wavefunction collapses, mysteriously, when measured. The Many-Worlds Interpretation (Everett, 1957) says nothing collapses: every outcome happens, in a separate branch of an ever-multiplying universe. Decoherent histories formalizes which sets of branches are mutually consistent. The branching reading reframes time travel dramatically: if you 'go back', the act of arriving counts as a measurement, which splits the universe; you arrive in a branch where you arrive. The grandfather paradox dissolves, because the grandfather you kill is in a branch where you exist as a visitor, not as a descendant. We have, presently, no way to test which interpretation is right. We do have a vocabulary in which branching timelines are not science fiction but quantum bookkeeping.",
      zh: "量子力学描述的，是处于多个态之叠加中的系统——每一次测量，似乎从众多可能之中挑出一个结果。对这一『挑选』的诠释，是物理学中悬而未决的大问题之一。哥本哈根诠释说，波函数被测量时神秘地塌缩。多世界诠释（埃弗雷特，1957）说什么都没有塌缩：每一种结果都发生，发生在一个不断增殖的宇宙的、不同的分支中。退相干历史则形式化地说明，哪些分支集合彼此自洽。分支读法戏剧性地重构了时间旅行：若你『回到过去』，抵达这一举动本身便算作一次测量，它使宇宙分裂；你抵达的，是一个『你抵达』的分支。祖父悖论由此消解，因为你杀死的那位祖父，处在一个你以访客、而非以后裔身份存在的分支中。我们目前没有办法检验哪一种诠释正确。但我们已拥有一种词汇，在其中，分支的时间线，不再是科幻，而是量子记账。",
    },
    ask: { en: "Is each measurement a real branching, or only a useful fiction?", zh: "每一次测量，是真实的分支，还是仅仅一种有用的虚构？" },
  },
  {
    num: "06",
    id: "paradox",
    kicker: { en: "System VI · the loops", zh: "系统六 · 闭环" },
    title: { en: "Temporal Paradoxes & Causality", zh: "时间悖论与因果性" },
    sub: { en: "Grandfather · bootstrap · predestination — three loops, three escapes", zh: "祖父 · 自举 · 预定 — 三个闭环，三种出口" },
    body: {
      en: "Three paradoxes haunt every conversation about time travel. The grandfather paradox: you go back and kill your grandfather; therefore you are never born; therefore you cannot go back. The bootstrap paradox: you travel back and give Shakespeare his plays — but who wrote them originally? The predestination paradox: every attempt to change the past becomes the very thing that caused the past. Each has rival resolutions. Novikov self-consistency: the laws of physics conspire to prevent contradiction; you cannot kill your grandfather because something always intervenes. Branching universes: you kill a grandfather in a branch that splits off, leaving your own branch intact. Closed timelike curves with consistency constraints: only globally self-consistent histories are realized; the universe is its own copy editor. Each resolution comes with a price — strange coincidences, a multiplying multiverse, a heavily restricted set of possible histories. None of these are problems with the physics; they are problems with how stories want to be told.",
      zh: "三个悖论缠绕着关于时间旅行的每一段对话。祖父悖论：你回到过去杀死你的祖父；因此你从未出生；因此你无法回到过去。自举悖论：你回到过去，把莎士比亚的剧本交给他——但最初是谁写的？预定悖论：每一次改变过去的尝试，恰恰成为导致过去之事。每一个悖论都有彼此竞争的解法。诺维科夫自洽性：物理定律合谋以防止矛盾；你无法杀死祖父，因为总有事情介入。分支宇宙：你在一个分裂而出的分支中杀死了一位祖父，使你自己的分支保持完整。带自洽性约束的闭合类时曲线：只有全局自洽的历史会被实现；宇宙，是它自己的校对编辑。每一种解法都自带代价——离奇的巧合、不断增殖的多重宇宙、严重受限的可能历史集合。这些都不是物理的问题；它们是故事想被讲述的方式的问题。",
    },
    ask: { en: "Is the universe a copy editor, or just very, very lucky?", zh: "宇宙是一位校对编辑，还是仅仅极其、极其幸运？" },
  },
  {
    num: "07",
    id: "mind",
    kicker: { en: "System VII · the felt", zh: "系统七 · 被感受者" },
    title: { en: "Consciousness, Memory & Subjective Time", zh: "意识、记忆与主观时间" },
    sub: { en: "Why a boring hour and an exciting hour are not the same hour", zh: "为何无聊的一小时与精彩的一小时，并非同一小时" },
    body: {
      en: "Whatever physics says about time, consciousness experiences it. We feel a flowing present, a memorized past, and an anticipated future — none of which appear directly in the equations. Cognitive science calls this 'chronoception': time perception is built from multiple neural systems (interval timing, circadian rhythms, episodic memory) and is famously plastic. Time slows in danger, accelerates in flow, dilates under psychedelics, fragments in dissociation. The 'specious present' — the few seconds we feel as 'now' — is itself a construction. This raises a serious question for any time-travel discussion. If subjective time is a model the brain builds from records, then 'travelling' might be less about physically reaching another moment than about altering which records the system holds. A future civilization able to edit memory, perception or the substrate of mind has, in a meaningful sense, time-travel technology — without breaking a single physical law.",
      zh: "无论物理学如何谈论时间，意识都在经验着它。我们感受到流动的当下、被记忆的过去、与被预期的未来——这些都不直接出现在方程之中。认知科学称之为『时知觉』：时间感由多个神经系统建构而成（间隔计时、生理节律、情景记忆），并出了名的可塑。时间在危险中变慢，在心流中加速，在迷幻药下膨胀，在解离中破碎。『似是而非的当下』——我们感受为『此刻』的那几秒——本身就是一种建构。这给关于时间旅行的任何讨论提出了一个严肃问题。若主观时间是大脑由记录所建构的模型，那么『旅行』也许不在于物理上抵达另一刻，而在于改变系统所持有的记录。一个未来的、能编辑记忆、知觉或心智基底的文明，便在某种有意义的意义上，拥有了时间旅行的技术——而无需打破任何一条物理定律。",
    },
    ask: { en: "Is moving through time something you do, or just something you remember doing?", zh: "穿越时间，是你正在做之事，还是仅仅是你记得自己做过之事？" },
  },
  {
    num: "08",
    id: "info",
    kicker: { en: "System VIII · the ticks", zh: "系统八 · 时刻" },
    title: { en: "Simulation Theory & Information Time", zh: "模拟论与信息时间" },
    sub: { en: "If time is computation, what is one tick?", zh: "若时间就是计算，一个时刻又是什么？" },
    body: {
      en: "Information physics reframes time again. In any computational view of the universe, 'time' is the order in which states update. A simulation has discrete ticks; a cellular automaton has step counts; a quantum computer has gate depth. In each, there's a clean operational definition: the next state depends on the current state via a rule. If reality is fundamentally computational, time is the chain of dependencies along which information propagates. Holographic and 'it from qubit' programmes go further: spacetime — and the time direction inside it — may emerge from entanglement patterns in a more primitive quantum system. None of this proves the universe is a simulation; it just notes that physics already speaks fluent computation. Time travel, in this language, is a question about whether the dependency chain can fold back on itself. Some interesting attempts at consistent quantum-mechanical CTCs (Deutsch, post-selection models) suggest the answer is 'yes, but only for very strange computations'.",
      zh: "信息物理又一次重构了时间。在任何对宇宙的计算观下，『时间』就是态被更新的次序。一个模拟有离散的时刻；一个元胞自动机有步数计数；一台量子计算机有门深度。在每一种之中，都有一个干净的操作性定义：下一个态，经一条规则，依赖于当前态。若现实归根结底是计算性的，时间，便是信息沿之传播的依赖链。全息原理与『万物源于量子比特』纲领走得更远：时空——以及其中的时间方向——可能从一个更原始量子系统中的纠缠图样涌现。这些都不证明宇宙是一场模拟；它们只是注意到，物理学，早已能流利地说计算的语言。在此语言中，时间旅行变成一个关于依赖链能否折回自身的问题。一些关于自洽量子力学闭合类时曲线（Deutsch、后选择模型）的有趣尝试暗示，答案是『可以——但只对非常奇怪的计算而言』。",
    },
    ask: { en: "If time is the order of computation, what is the universe's clock cycle?", zh: "若时间是计算的次序，宇宙的时钟周期又是什么？" },
  },
  {
    num: "09",
    id: "civ",
    kicker: { en: "System IX · the engineers", zh: "系统九 · 工程师" },
    title: { en: "Future Civilizations & Temporal Engineering", zh: "未来文明与时间工程" },
    sub: { en: "What does a Type-II civilization do with general relativity?", zh: "一个 II 型文明，用广义相对论做什么？" },
    body: {
      en: "Kardashev classified civilizations by the energy they wield: Type I commands a planet, Type II a star, Type III a galaxy. None of these levels guarantees control over time, but each unlocks the option. Relativistic interstellar travel — already feasible in principle — gives a one-way ticket to the future via time dilation. Black-hole computation, proposed by Lloyd and others, would use rotating Kerr black holes as gravitational engines for both energy and information manipulation. Closed timelike curves, if they exist, would permit certain computations exponentially faster than ordinary physics — and would let an information loop become its own answer. None of these technologies is buildable today. But they are not magic: they sit within the same equations that already predicted GPS time corrections to nanosecond precision. The question for any far-future civilization is not 'is time travel allowed' but 'is it cheap enough to do anything worth doing with'.",
      zh: "卡尔达肖夫按文明所驾驭的能量来分类：I 型驾驭一颗行星，II 型一颗恒星，III 型一个星系。这些等级中没有任何一种保证对时间的掌控，但每一种都为这一选项开门。相对论性恒星际旅行——原则上已可行——经时间膨胀，给出一张单向去往未来的车票。劳埃德等人提出的黑洞计算，将以旋转的克尔黑洞作为引力引擎，用于能量与信息的操作。闭合类时曲线，若存在，将允许某些计算比普通物理指数级地更快——并允许一个信息回路成为其自身的答案。这些技术今日皆不可建。但它们并非魔法：它们栖息于同一组方程中，这组方程已把 GPS 的时间修正预言到纳秒级精度。对任何遥远未来的文明而言，问题不是『时间旅行是否被允许』，而是『它是否便宜到足以做任何值得做之事』。",
    },
    ask: { en: "When does a civilization stop describing time and start editing it?", zh: "一个文明，何时才会从描述时间，转而编辑时间？" },
  },
  {
    num: "10",
    id: "future",
    kicker: { en: "System X · the synthesis", zh: "系统十 · 综合" },
    title: { en: "The Unified Time Model", zh: "统一时间模型" },
    sub: { en: "Change + Entropy + Information + Causality + Observation + Geometry + Probability", zh: "变化 + 熵 + 信息 + 因果 + 观察 + 几何 + 概率" },
    body: {
      en: "Set aside the slogan 'a theory of everything' for a moment. The honest synthesis emerging across relativity, quantum theory, thermodynamics, information physics, cosmology and consciousness studies looks less like one master equation and more like a shape. Time, in this composite picture, is at once geometric (curved spacetime, light cones), entropic (the gradient that gives 'past' and 'future' their distinct flavors), informational (an order of dependency), causal (which event can influence which), probabilistic (a tree of decoherent branches), observer-involving (memory and measurement matter) and dimensional (one axis among four — but possibly emergent from a more primitive layer). No piece is finished. None of it is established as the last word. But the directions are converging: arrow from entropy, branching from quantum, simultaneity from frame, dependency from information, perception from neuroscience. A future physics may well not look like 'more equations for time' but like a picture in which 'time' itself is a derived quantity, and what we call passage is the projection that survives onto the three directions our biology happened to be built for.",
      zh: "暂且把『万物之理』这一口号搁置一旁。在相对论、量子理论、热力学、信息物理、宇宙学与意识研究之间正在浮现的、诚实的综合，看起来不太像一个主方程，而更像一个形状。在此复合图景中，时间同时是几何的（弯曲的时空、光锥）、熵的（赋予『过去』与『未来』各自风味的梯度）、信息的（一种依赖的次序）、因果的（哪一事件能影响哪一事件）、概率的（退相干分支之树）、与观察者相涉的（记忆与测量重要）、与维度的（四维中的一根轴——但或许从一个更原始的层涌现）。其中没有一块已经完工。没有一块被立为最终定论。但方向正在汇聚：箭头从熵而出，分支从量子而出，同时性从参考系而出，依赖从信息而出，知觉从神经科学而出。未来的物理或许根本不会像『为时间增添方程』，而是像一幅图景，其中『时间』本身是一个导出量，而我们称之为流逝的，是在我们生物学碰巧被造就来识别的那三个方向上、所幸存的投影。",
    },
    ask: { en: "What survives of 'time' when geometry, entropy and information all claim the throne?", zh: "当几何、熵与信息都来争夺王座时，『时间』还有什么会幸存？" },
  },
];

/* ═══════════════════════════════ THE TIME DIAL ═══════════════════════════════ */

export interface DialLens { id: string; index: string; name: Bi; poleA: Bi; poleB: Bi; intro: Bi; }

export const DIAL_LENSES: DialLens[] = [
  { id: "velocity", index: "I", name: { en: "Velocity → Time", zh: "速度 → 时间" }, poleA: { en: "At rest", zh: "静止" }, poleB: { en: "Lightspeed", zh: "光速" }, intro: { en: "Special relativity. Slide a clock from rest toward the speed of light. As it approaches c, the Lorentz factor γ climbs without bound — moving clocks tick slower, moving rulers shrink, and the energy needed to push further diverges. Nothing with mass reaches c. This is the only mechanism for time travel that's been observed: muons created in cosmic-ray showers reach the ground because their internal clocks tick slow in our frame.", zh: "狭义相对论。把一只钟从静止滑向光速。当它逼近 c，洛伦兹因子 γ 无限上升——运动的钟走得更慢，运动的尺收缩，而继续推进所需的能量发散。任何有质量之物都无法抵达 c。这是已被观测到的、唯一一种时间旅行机制：宇宙射线簇射中产生的μ介子能抵达地面，因为它们的内部钟，在我们的参考系中走得慢。" } },
  { id: "gravity", index: "II", name: { en: "Gravity → Time", zh: "引力 → 时间" }, poleA: { en: "Free space", zh: "自由空间" }, poleB: { en: "Event horizon", zh: "事件视界" }, intro: { en: "General relativity. Drop a clock toward a more massive object. Spacetime curves, time slows. At the event horizon of a black hole, the rate goes to zero from a distant observer's view — anyone falling in appears to freeze. GPS satellites correct for this effect daily. Sit near a black hole long enough, by your clock, and millennia pass for the outside universe. A one-way ticket to the future, written in geometry.", zh: "广义相对论。把一只钟朝向一个更大质量的对象掷去。时空弯曲，时间变慢。在黑洞的事件视界处，从远处观察者看，速率趋于零——任何坠入者，看起来都被冻结。GPS 卫星每日都对此修正。在黑洞附近停留得够久，按你的钟看，外部宇宙便已过千年。一张单向去往未来的车票，写在几何之中。" } },
  { id: "scale", index: "III", name: { en: "Scale → Regime", zh: "尺度 → 区域" }, poleA: { en: "Planck time", zh: "普朗克时间" }, poleB: { en: "Universe age", zh: "宇宙年龄" }, intro: { en: "Zoom across the timescales physics knows how to handle. At 10⁻⁴³ s, the Planck time, time itself may break down into quantum foam. Atomic vibrations: 10⁻¹⁵ s. Heartbeats: 1 s. A human life: 10⁹ s. The universe's age: 10¹⁷ s. The expected lifetime of the longest-lived black holes: 10¹⁰⁰ s. No single theory yet spans this whole range — the Planck end is where quantum gravity is supposed to live.", zh: "横跨物理学知道如何处理的时间尺度缩放。在 10⁻⁴³ 秒，即普朗克时间，时间本身可能崩塌为量子泡沫。原子振动：10⁻¹⁵ 秒。心跳：1 秒。一段人生：10⁹ 秒。宇宙的年龄：10¹⁷ 秒。寿命最长的黑洞的预期寿命：10¹⁰⁰ 秒。至今没有任何单一理论能贯穿这一整段范围——普朗克这一端，是量子引力理应栖身之处。" } },
];

/* ═══════════════════════════════ META-MODEL RADAR ═══════════════════════════════
   Time = Change + Entropy + Information + Causality + Observer + Geometry + Probability. */

export const META_AXES: Bi[] = [
  { en: "Change", zh: "变化" },
  { en: "Entropy", zh: "熵" },
  { en: "Information", zh: "信息" },
  { en: "Causality", zh: "因果" },
  { en: "Observer", zh: "观察者" },
  { en: "Geometry", zh: "几何" },
  { en: "Probability", zh: "概率" },
];

export const META_AXIS_NOTES: Bi[] = [
  { en: "How fundamentally the picture relies on something changing — whether time is a label on change or its source.", zh: "图景在多大根本程度上依赖于某物在变化——时间是变化的标签，还是其源头。" },
  { en: "How strongly the second law and irreversibility shape the picture of time itself.", zh: "第二定律与不可逆性，在多大程度上塑造了时间的图景本身。" },
  { en: "How central bits, dependencies and encoding are to the description of temporal order.", zh: "比特、依赖与编码，在描述时间次序中的核心程度。" },
  { en: "How strictly cause-before-effect is enforced; whether the structure permits loops or only forwards arrows.", zh: "因先于果被强制执行的严格程度；结构是否允许闭环，还是只允许向前的箭头。" },
  { en: "How big a role memory, measurement and the observer play in fixing what 'now' is.", zh: "记忆、测量与观察者，在确定『此刻』为何物中所扮演角色之大。" },
  { en: "How much time is treated as a feature of curved spacetime — geometric, not a separate axis.", zh: "时间被当作弯曲时空之特征的程度——是几何的，而非一根独立的轴。" },
  { en: "How fundamentally the description speaks in amplitudes and branches rather than single histories.", zh: "描述以振幅与分支、而非以单一历史发声的根本程度。" },
];

export interface RegimeProfile { name: Bi; color: string; scores: number[]; note: Bi; }

export const REGIME_PROFILES: RegimeProfile[] = [
  { name: { en: "Newtonian", zh: "牛顿式" }, color: "#86f1ff", scores: [0.8, 0.2, 0.1, 0.9, 0.1, 0.2, 0.05], note: { en: "Absolute time, universal and unidirectional. Change is primary; observer plays no role. The picture of time most humans still feel.", zh: "绝对时间，普适而单向。变化为先；观察者无角色。绝大多数人仍能感受到的、那幅时间图景。" } },
  { name: { en: "Relativistic", zh: "相对论" }, color: "#ffd277", scores: [0.7, 0.3, 0.2, 0.6, 0.3, 0.95, 0.2], note: { en: "Time is a coordinate in a four-dimensional manifold. Simultaneity is frame-dependent; gravity slows clocks. No universal 'now'.", zh: "时间是四维流形中的一个坐标。同时性依赖参考系；引力使钟变慢。没有普适的『此刻』。" } },
  { name: { en: "Thermal / statistical", zh: "热力学 / 统计" }, color: "#9b6cff", scores: [0.55, 0.98, 0.45, 0.7, 0.25, 0.25, 0.3], note: { en: "The arrow of time is the entropy gradient. The 'past' is the direction of lower entropy; the 'future' is where the second law points.", zh: "时间之箭，是熵的梯度。『过去』是更低熵的方向；『未来』是第二定律所指之处。" } },
  { name: { en: "Quantum", zh: "量子" }, color: "#ff93b6", scores: [0.5, 0.4, 0.6, 0.5, 0.9, 0.4, 0.95], note: { en: "Probabilistic, observer-entangled. Many-Worlds branches every measurement; histories become a tree, not a line.", zh: "概率的，与观察者纠缠的。多世界在每一次测量上分支；历史变成一棵树，而非一条线。" } },
  { name: { en: "Holographic / informational", zh: "全息 / 信息论" }, color: "#86ffd0", scores: [0.45, 0.7, 0.98, 0.8, 0.6, 0.7, 0.65], note: { en: "Time is the order of dependency in a more primitive quantum-information substrate. Spacetime — including its time direction — is emergent.", zh: "时间是某个更原始的量子信息基底中、依赖的次序。时空——包括其时间方向——是涌现的。" } },
];

/* ═══════════════════════════════ HISTORY TIMELINE ═══════════════════════════════ */

export interface Era { when: Bi; who: Bi; shift: Bi; detail: Bi; color: string; }

export const HISTORY: Era[] = [
  { when: { en: "c. 350 BCE", zh: "约公元前 350" }, who: { en: "Aristotle", zh: "亚里士多德" }, shift: { en: "Time as the measure of motion", zh: "时间作为运动的度量" }, detail: { en: "Time is not a thing; it is the count of changes — the number-of-before-and-after. There is no time without something moving.", zh: "时间不是一物；它是变化的计数——前与后之数。没有事物在运动，便没有时间。" }, color: "#777a9e" },
  { when: { en: "1687", zh: "1687" }, who: { en: "Newton", zh: "牛顿" }, shift: { en: "Absolute time, universal and uniform", zh: "绝对时间，普适而均匀" }, detail: { en: "Time flows equably, the same for every observer, independent of anything happening. A universal cosmic clock. Astonishingly useful for three centuries.", zh: "时间均匀流动，对每个观察者都相同，独立于发生之事。一只普适的宇宙钟。在三个世纪里出奇地有用。" }, color: "#9b6cff" },
  { when: { en: "1865 – 1877", zh: "1865 – 1877" }, who: { en: "Clausius · Boltzmann", zh: "克劳修斯 · 玻尔兹曼" }, shift: { en: "The arrow of time becomes entropy", zh: "时间之箭，成为熵" }, detail: { en: "Clausius coins 'entropy'. Boltzmann shows it as the logarithm of the number of indistinguishable microstates — time's direction is statistical.", zh: "克劳修斯铸造『熵』。玻尔兹曼揭示它是不可分辨微观态数目的对数——时间的方向，是统计性的。" }, color: "#86f1ff" },
  { when: { en: "1905", zh: "1905" }, who: { en: "Einstein", zh: "爱因斯坦" }, shift: { en: "Time becomes relative to motion", zh: "时间，相对于运动" }, detail: { en: "Special relativity. The speed of light is the same for every observer; therefore moving clocks tick slower, moving rulers shrink, simultaneity is local.", zh: "狭义相对论。光速对每一个观察者都相同；因此运动的钟走得更慢，运动的尺收缩，同时性是局域的。" }, color: "#ffd277" },
  { when: { en: "1908", zh: "1908" }, who: { en: "Minkowski", zh: "闵可夫斯基" }, shift: { en: "Space and time fuse into spacetime", zh: "空间与时间融为时空" }, detail: { en: "Hermann Minkowski's famous lecture: 'Henceforth space by itself, and time by itself, are doomed to fade away into mere shadows.' Spacetime is born.", zh: "赫尔曼·闵可夫斯基的著名演讲：『从此以后，空间本身与时间本身，都注定要褪入纯粹的影子。』时空，由此诞生。" }, color: "#ffd277" },
  { when: { en: "1915", zh: "1915" }, who: { en: "Einstein", zh: "爱因斯坦" }, shift: { en: "Gravity slows clocks", zh: "引力使钟变慢" }, detail: { en: "General relativity. Mass curves spacetime, clocks deeper in a gravity well tick slower than clocks higher up. Confirmed for GPS satellites, by 1919's eclipse, by Pound-Rebka in 1959.", zh: "广义相对论。质量弯曲时空，深陷引力井中的钟，比高处的钟走得更慢。GPS 卫星、1919 年的日食、1959 年的庞德-雷布卡实验均已证实。" }, color: "#ffd277" },
  { when: { en: "1935", zh: "1935" }, who: { en: "Einstein · Rosen", zh: "爱因斯坦 · 罗森" }, shift: { en: "Wormholes appear in the math", zh: "虫洞在数学中现身" }, detail: { en: "The Einstein-Rosen bridge: a mathematical solution to general relativity that connects two distant regions of spacetime by a 'throat'. Stable enough to draw; not stable enough to walk through.", zh: "爱因斯坦-罗森桥：广义相对论的一个数学解，它以一条『咽喉』连接时空中两块遥远区域。稳定到足以被画出；却不稳定到可被走过。" }, color: "#ff93b6" },
  { when: { en: "1949", zh: "1949" }, who: { en: "Gödel", zh: "哥德尔" }, shift: { en: "A universe that loops back on itself", zh: "一个会回环自身的宇宙" }, detail: { en: "Kurt Gödel finds a solution to Einstein's equations describing a rotating universe with closed timelike curves — paths through spacetime that loop back to the past. The math allows it.", zh: "库尔特·哥德尔找到爱因斯坦方程的一个解，它描述一个旋转宇宙，其中含有闭合类时曲线——回到过去的时空路径。数学允许它。" }, color: "#9b6cff" },
  { when: { en: "1957", zh: "1957" }, who: { en: "Everett", zh: "埃弗雷特" }, shift: { en: "Many-Worlds — branches instead of collapse", zh: "多世界——以分支代替塌缩" }, detail: { en: "Hugh Everett proposes that the wavefunction never collapses; instead, every measurement outcome happens in a separate branch of an ever-multiplying universe.", zh: "休·埃弗雷特提出，波函数从不塌缩；相反，每一种测量结果都发生在一个不断增殖的宇宙的、不同的分支中。" }, color: "#ff93b6" },
  { when: { en: "1988", zh: "1988" }, who: { en: "Morris · Thorne · Yurtsever", zh: "莫里斯 · 索恩 · 尤特赛弗" }, shift: { en: "Traversable wormholes (in principle)", zh: "可穿越虫洞（原则上）" }, detail: { en: "Kip Thorne and collaborators publish the first detailed model of a wormhole that could in principle be traversed — at the price of needing exotic 'negative-energy' matter to hold the throat open.", zh: "基普·索恩与合作者发表第一种可在原则上被穿越的虫洞详细模型——代价是需要奇异的『负能量』物质来撑开咽喉。" }, color: "#ff93b6" },
  { when: { en: "1992", zh: "1992" }, who: { en: "Hawking", zh: "霍金" }, shift: { en: "Chronology protection conjecture", zh: "时序保护猜想" }, detail: { en: "Stephen Hawking conjectures that the laws of physics conspire to prevent closed timelike curves from forming — the universe protects itself from time-travel paradoxes.", zh: "斯蒂芬·霍金猜测，物理定律合谋以防止闭合类时曲线的形成——宇宙保护自己免受时间旅行悖论。" }, color: "#9b6cff" },
  { when: { en: "2015 – today", zh: "2015 至今" }, who: { en: "ER = EPR · holographic time", zh: "ER = EPR · 全息时间" }, shift: { en: "Time from entanglement", zh: "时间从纠缠而出" }, detail: { en: "Maldacena and Susskind conjecture wormholes are entanglement; the AdS/CFT programme suggests time direction may emerge from a more primitive layer of quantum information.", zh: "马尔达西那与苏斯金猜测虫洞即纠缠；AdS/CFT 纲领暗示时间方向，或许从一个更原始的量子信息层中涌现。" }, color: "#86ffd0" },
];

/* ═══════════════════════════════ TIME MODELS (section 01 — used by TimeEngine) ═══════════════════════════════ */

export interface TimeModel { name: Bi; claim: Bi; verdict: Bi; }
export const TIME_MODELS: TimeModel[] = [
  { name: { en: "Presentism", zh: "现在主义" }, claim: { en: "Only the present moment is real. The past is gone; the future does not yet exist.", zh: "只有当下这一刻是真实的。过去已逝；未来尚不存在。" }, verdict: { en: "Matches intuition perfectly, but hard to reconcile with relativity's lack of a universal 'now'.", zh: "完美契合直觉，却难以与相对论中缺乏普适的『此刻』相调和。" } },
  { name: { en: "Eternalism (block universe)", zh: "永恒主义（块状宇宙）" }, claim: { en: "Past, present and future all exist equally. Time is a dimension; 'now' is like 'here'.", zh: "过去、现在与未来同等地存在。时间是一维；『此刻』就像『此处』。" }, verdict: { en: "Fits relativity naturally — but then why does time seem to flow at all?", zh: "自然契合相对论——但那么，时间为何看上去会流动？" } },
  { name: { en: "Growing block", zh: "生长块" }, claim: { en: "The past and present are real and fixed; the future is open and not yet real.", zh: "过去与现在是真实而固定的；未来是开放的、尚未真实。" }, verdict: { en: "A compromise: keeps an open future, but needs a privileged 'edge' of becoming.", zh: "一种折中：保留开放的未来，却需要一个特权的『生成之缘』。" } },
  { name: { en: "Thermal time", zh: "热力学时间" }, claim: { en: "Time's direction is not fundamental but emerges from entropy and statistics.", zh: "时间的方向并非基本，而是从熵与统计中涌现。" }, verdict: { en: "Explains the arrow without flow — direction is the second law in disguise.", zh: "在没有『流动』的情况下解释了『箭头』——方向，是第二定律的伪装。" } },
  { name: { en: "Relational time", zh: "关系时间" }, claim: { en: "There is no time, only correlations between things that change relative to each other.", zh: "没有时间，只有彼此相对变化之物之间的关联。" }, verdict: { en: "Eliminates time as a primitive — but at the cost of explaining what 'change' even means.", zh: "把时间作为基本量消除——代价却是解释『变化』本身意味着什么。" } },
];

/* ═══════════════════════════════ BLACK HOLE / WORMHOLE LAYERS ═══════════════════════════════ */

export interface BHLayer { name: Bi; desc: Bi; color: string; }
export const BLACKHOLE_LAYERS: BHLayer[] = [
  { name: { en: "Accretion disk", zh: "吸积盘" }, desc: { en: "In-falling matter, heated to millions of degrees by friction, blazing in X-rays as it spirals inward. The 'light' of a black hole.", zh: "坠入的物质被摩擦加热至数百万度，向内盘旋时以 X 射线炽烈发光。黑洞之『光』。" }, color: "#ffd277" },
  { name: { en: "Photon ring", zh: "光子环" }, desc: { en: "Light bent so hard by gravity that it loops the hole one or more times before escaping. Imaged by the Event Horizon Telescope.", zh: "光被引力弯曲得如此剧烈，以至在逃离之前绕黑洞一圈或多圈。已被事件视界望远镜成像。" }, color: "#86f1ff" },
  { name: { en: "Event horizon", zh: "事件视界" }, desc: { en: "The boundary of no return. From outside, anyone falling in appears to freeze and redshift forever. Time itself slows to a halt here in the outside view.", zh: "有去无回的边界。从外部看，任何坠入者似乎永远被冻结并红移。在外部视角下，时间本身在此变为停滞。" }, color: "#ff5d8f" },
  { name: { en: "Kerr ergosphere", zh: "克尔能层" }, desc: { en: "A rotating black hole drags spacetime around with it. Inside the ergosphere, nothing can stand still relative to distant stars.", zh: "一个旋转的黑洞，把时空一同拖动。在能层之内，没有任何东西能相对遥远恒星保持静止。" }, color: "#9b6cff" },
  { name: { en: "Inner Cauchy horizon", zh: "内柯西视界" }, desc: { en: "A second horizon inside a rotating black hole where the predictability of physics formally breaks down. Some Einstein-equation solutions extend beyond it — into other universes, or other times.", zh: "旋转黑洞内的第二道视界，物理可预测性在此正式崩溃。一些爱因斯坦方程解，可延展至其外——通向其他宇宙，或其他时间。" }, color: "#86ffd0" },
];

/* ═══════════════════════════════ WORMHOLE / CTC TYPES (section 03) ═══════════════════════════════ */

export interface WormholeKind { id: string; name: Bi; line: Bi; status: Bi; }
export const WORMHOLE_KINDS: WormholeKind[] = [
  { id: "er", name: { en: "Einstein-Rosen bridge", zh: "爱因斯坦-罗森桥" }, line: { en: "The original 1935 solution — a 'bridge' connecting two Schwarzschild geometries, collapsing too fast for anything to traverse.", zh: "1935 年最初的解——连接两个史瓦西几何的『桥』，坍缩得过快，任何东西都无法穿过。" }, status: { en: "Mathematically valid · physically untraversable", zh: "数学上有效 · 物理上不可穿越" } },
  { id: "thorne", name: { en: "Morris-Thorne wormhole", zh: "莫里斯-索恩虫洞" }, line: { en: "A stabilised version using exotic 'negative-energy' matter to hold the throat open. In principle traversable; in practice no such matter has been produced in macroscopic amounts.", zh: "一种稳定化的版本，使用奇异的『负能量』物质把咽喉撑开。原则上可穿越；实践中尚未以宏观量产出过这种物质。" }, status: { en: "Allowed by general relativity · requires exotic matter", zh: "被广义相对论允许 · 需要奇异物质" } },
  { id: "kerr", name: { en: "Kerr ring singularity", zh: "克尔环奇点" }, line: { en: "Inside a rotating black hole, the singularity is a ring. Mathematical extensions of the solution include passages to other universes — or other times.", zh: "在旋转的黑洞内部，奇点是一个环。该解的数学延展，包含通向其他宇宙——或其他时间——的通道。" }, status: { en: "Inside an event horizon · escape unknown", zh: "在事件视界之内 · 能否逃离未知" } },
  { id: "godel", name: { en: "Gödel universe (CTCs)", zh: "哥德尔宇宙（CTC）" }, line: { en: "A rotating cosmology where closed timelike curves are everywhere. Not our universe — but proof that general relativity allows them.", zh: "一种旋转的宇宙学，其中闭合类时曲线遍地皆是。不是我们的宇宙——但证明了广义相对论允许它们。" }, status: { en: "Doesn't match observations · proves possibility", zh: "与观测不符 · 证明可能性" } },
  { id: "tipler", name: { en: "Tipler cylinder", zh: "蒂普勒圆柱" }, line: { en: "An infinitely long, infinitely dense rotating cylinder. Its gravity would drag spacetime hard enough to form closed timelike curves around it.", zh: "一个无限长、无限致密的旋转圆柱。它的引力会把时空拖动得足以在其周围形成闭合类时曲线。" }, status: { en: "Mathematical idealisation · physically unbuildable", zh: "数学上的理想化 · 物理上无法建造" } },
];

/* ═══════════════════════════════ MANY-WORLDS / BRANCHING (section 05) ═══════════════════════════════ */

export interface BranchInterp { id: string; name: Bi; idea: Bi; }
export const BRANCH_INTERPS: BranchInterp[] = [
  { id: "copenhagen", name: { en: "Copenhagen", zh: "哥本哈根" }, idea: { en: "The wavefunction collapses, mysteriously and irreversibly, when a measurement is made. Pragmatic; ontologically silent.", zh: "波函数在测量时神秘地、不可逆地塌缩。实用主义的；对本体论保持沉默。" } },
  { id: "manyworlds", name: { en: "Many-Worlds (Everett)", zh: "多世界（埃弗雷特）" }, idea: { en: "Nothing collapses. Every measurement outcome happens in a separate branch of an ever-multiplying universe. Branches don't communicate.", zh: "什么都没有塌缩。每一种测量结果都发生在一个不断增殖的宇宙的、不同的分支中。分支不相互通信。" } },
  { id: "decoherent", name: { en: "Decoherent histories", zh: "退相干历史" }, idea: { en: "A formal way to assign probabilities to sets of mutually consistent histories. Lets you talk about branches without committing to which is 'real'.", zh: "一种形式化的办法，为彼此自洽的历史集合赋予概率。允许你谈论分支，而不必承诺哪一个是『真实』的。" } },
  { id: "deutsch", name: { en: "Deutsch CTC model", zh: "Deutsch CTC 模型" }, idea: { en: "A consistency condition for closed timelike curves: only quantum density matrices that are fixed points of the loop are allowed. Time travel as a fixed-point computation.", zh: "对闭合类时曲线的一种自洽条件：只有作为该闭环不动点的量子密度矩阵才被允许。时间旅行，作为一种不动点计算。" } },
  { id: "postselect", name: { en: "Post-selection (PCTC)", zh: "后选择（PCTC）" }, idea: { en: "An alternative CTC model based on quantum post-selection. Different predictions from Deutsch's; clarifies what 'consistency' costs.", zh: "基于量子后选择的另一种 CTC 模型。其预言与 Deutsch 的不同；澄清了『自洽性』的代价。" } },
];

/* ═══════════════════════════════ PARADOXES (section 06 — for ParadoxResolver) ═══════════════════════════════ */

export interface Paradox { id: string; name: Bi; setup: Bi; resolutions: { id: string; name: Bi; line: Bi }[]; }
export const PARADOXES: Paradox[] = [
  {
    id: "grandfather",
    name: { en: "Grandfather paradox", zh: "祖父悖论" },
    setup: { en: "You travel to the past and kill your grandfather before he meets your grandmother. You are therefore never born. If you are never born, you never travel back, and your grandfather lives. If he lives, you are born — and travel back. Logical loop.", zh: "你回到过去，在祖父遇见祖母之前杀了他。因此你从未出生。若你从未出生，你便从未回到过去，于是祖父活着。若他活着，你便出生——并回到过去。逻辑闭环。" },
    resolutions: [
      { id: "novikov", name: { en: "Novikov self-consistency", zh: "诺维科夫自洽性" }, line: { en: "Something always prevents the murder — a slip, a misfire, a coincidence. Only globally self-consistent histories are realized.", zh: "总有什么阻止了那次谋杀——一次失足、一次误射、一种巧合。只有全局自洽的历史，才被实现。" } },
      { id: "branching", name: { en: "Branching universes", zh: "分支宇宙" }, line: { en: "Your action creates a new branch where you exist as a visitor and your grandfather dies. Your own branch — where he lived — is untouched.", zh: "你的举动创造了一个新分支，在其中你以访客身份存在、祖父死去。你自己的分支——他活着的那个——未受影响。" } },
      { id: "deutsch-ctc", name: { en: "Deutsch CTCs", zh: "Deutsch CTC" }, line: { en: "Only quantum states that are fixed points of the time-travel loop survive. The 'kill grandfather' state is not a fixed point, so it can't form.", zh: "只有时间旅行闭环的不动点量子态能存活。『杀死祖父』这一态并非不动点，故无法形成。" } },
    ],
  },
  {
    id: "bootstrap",
    name: { en: "Bootstrap paradox", zh: "自举悖论" },
    setup: { en: "You travel back and give Shakespeare a copy of Hamlet. He publishes it. Centuries later, you buy the published Hamlet and travel back with it. Who wrote it? The play has no origin — information looping with no source.", zh: "你回到过去，把一本《哈姆雷特》交给莎士比亚。他将其出版。数个世纪后，你买下已出版的《哈姆雷特》，并带着它回到过去。是谁写的？这部剧没有起源——信息在闭环中循环，没有源头。" },
    resolutions: [
      { id: "self-consistent", name: { en: "Causal loops allowed", zh: "因果闭环被允许" }, line: { en: "Some theories permit causal loops where the loop itself is the cause. Strange but logically consistent — the play simply exists 'in the loop'.", zh: "一些理论允许因果闭环——闭环本身就是原因。奇怪但逻辑自洽——这部剧仅仅存在于『闭环之中』。" } },
      { id: "branching", name: { en: "Branching origin", zh: "分支起源" }, line: { en: "The original branch had a human author; you carry it to a different branch where Shakespeare receives it ready-made.", zh: "原始分支有人类作者；你把它带到另一个分支，在其中莎士比亚收到了现成的它。" } },
      { id: "info-bound", name: { en: "Information bounds", zh: "信息上限" }, line: { en: "Bekenstein-style information bounds may forbid net creation of information from a loop — what comes out cannot exceed what was put in.", zh: "贝肯斯坦式的信息上限或许禁止从一个闭环中净创造信息——出来之物不能超过放入之物。" } },
    ],
  },
  {
    id: "predestination",
    name: { en: "Predestination paradox", zh: "预定悖论" },
    setup: { en: "You travel back to prevent a disaster. Your interventions are the very thing that caused the disaster — you have always already done them. Free will and causality collide.", zh: "你回到过去以防止一场灾难。你的干预，恰恰是导致那场灾难之事——你一直以来都已做了它们。自由意志与因果性相撞。" },
    resolutions: [
      { id: "novikov", name: { en: "Self-consistency", zh: "自洽性" }, line: { en: "The universe only allows histories with no internal contradiction; 'preventing' the past was always part of the past.", zh: "宇宙只允许没有内在矛盾的历史；『阻止』过去，一直就是过去的一部分。" } },
      { id: "compatibilist", name: { en: "Compatibilist free will", zh: "相容论自由意志" }, line: { en: "Determinism and free will are not opposed — you genuinely chose, and your choice was always part of the only consistent history.", zh: "决定论与自由意志并不对立——你确实做出了选择，而你的选择，一直就是唯一自洽历史的一部分。" } },
      { id: "branching", name: { en: "Branch off", zh: "分支离开" }, line: { en: "Your intervention spawns a new branch where the disaster is averted. Your own branch keeps the original timeline.", zh: "你的干预衍生出一个新分支，在其中灾难被避免。你自己的分支，保持着原始的时间线。" } },
    ],
  },
];

/* ═══════════════════════════════ ENTROPY STATES (section 04 — for EntropyArrow) ═══════════════════════════════ */

export interface EntropyState { label: Bi; entropy: number; note: Bi; }
export const ENTROPY_STATES: EntropyState[] = [
  { label: { en: "Big Bang", zh: "大爆炸" }, entropy: 0.05, note: { en: "An astonishingly low-entropy initial condition. Why so low remains the 'past hypothesis' open question.", zh: "一个惊人低熵的初始条件。为何如此低，仍是『过去假设』这一悬而未决的问题。" } },
  { label: { en: "First nuclei", zh: "最初的原子核" }, entropy: 0.12, note: { en: "Three minutes in. Hydrogen and helium form; the cosmos is hot, dense, smooth — order is still mostly intact.", zh: "三分钟后。氢与氦形成；宇宙又热、又密、又平滑——秩序仍大体完好。" } },
  { label: { en: "First light (CMB)", zh: "最初的光" }, entropy: 0.22, note: { en: "380,000 years in. Atoms form; light decouples; the afterglow we still detect. Tiny ripples seed everything later.", zh: "38 万年后。原子形成；光去耦；那余晖，我们至今仍能探测到。微小的涟漪，为之后的一切播种。" } },
  { label: { en: "Galaxies", zh: "星系" }, entropy: 0.38, note: { en: "Gravity pulls gas into structures. Locally, order increases — but the universe's total entropy keeps climbing.", zh: "引力把气体拉聚成结构。局部上，秩序增加——但宇宙的总熵，仍在攀升。" } },
  { label: { en: "Today", zh: "今日" }, entropy: 0.55, note: { en: "Stars, planets, life. Locally low-entropy beings powered by the high-entropy waste they dump into space.", zh: "恒星、行星、生命。局部上低熵的存在，由其倾入太空的高熵废物所驱动。" } },
  { label: { en: "Stelliferous end", zh: "恒星纪元终结" }, entropy: 0.78, note: { en: "10¹⁴ years out. The last stars die. The universe goes dark; only black holes and cold matter remain.", zh: "10¹⁴ 年后。最后的恒星熄灭。宇宙陷入黑暗；只剩黑洞与冷物质。" } },
  { label: { en: "Heat death", zh: "热寂" }, entropy: 0.98, note: { en: "10¹⁰⁰ years out. Black holes have evaporated. Maximum entropy. No usable energy gradient remains; 'time' loses operational meaning.", zh: "10¹⁰⁰ 年后。黑洞已蒸发。最大熵。不再有任何可用的能量梯度；『时间』失去操作性意义。" } },
];

/* ═══════════════════════════════ APPROACHES (used by QuantumFoam as branching interpretations) ═══════════════════════════════ */

export interface UniApproach { name: Bi; idea: Bi; }
export const UNIFICATION: UniApproach[] = [
  { name: { en: "Block universe (eternalism)", zh: "块状宇宙（永恒主义）" }, idea: { en: "All moments coexist in a four-dimensional manifold. 'Now' is just where you are in it. Fits relativity beautifully.", zh: "所有时刻都共存于一个四维流形之中。『此刻』只是你在其中所处之地。完美契合相对论。" } },
  { name: { en: "Many-Worlds", zh: "多世界" }, idea: { en: "Every quantum measurement branches. Histories are a tree, not a line. Time travel splits rather than rewrites.", zh: "每一次量子测量都分支。历史是一棵树，而非一条线。时间旅行是分裂，而非重写。" } },
  { name: { en: "Loop quantum gravity", zh: "圈量子引力" }, idea: { en: "Spacetime — including time itself — is quantized into discrete loops. There may be no smallest interval below the Planck time.", zh: "时空——包括时间本身——被量子化为离散的圈。可能没有比普朗克时间更小的间隔。" } },
  { name: { en: "Causal sets", zh: "因果集" }, idea: { en: "Spacetime is fundamentally a discrete set of events linked by cause-and-effect. Time is the partial order of that set.", zh: "时空根本上是一组离散事件，事件之间以因果相连。时间，是该集合的偏序。" } },
  { name: { en: "Thermal time", zh: "热力学时间" }, idea: { en: "Rovelli's idea: there is no fundamental time, only correlations between systems. What we call 'time' emerges from the statistics of a many-body state.", zh: "罗韦利的想法：没有基本的时间，只有系统之间的关联。我们所称的『时间』，从多体态的统计中涌现。" } },
  { name: { en: "It from qubit", zh: "万物源于量子比特" }, idea: { en: "Reality is built from quantum information. Spacetime — and its time direction — emerges from entanglement patterns.", zh: "现实由量子信息构成。时空——以及其时间方向——从纠缠图样中涌现。" } },
];

/* ═══════════════════════════════ COSMIC EPOCHS (for CosmicExpansion) ═══════════════════════════════ */

export interface Epoch { t: Bi; name: Bi; desc: Bi; }
export const COSMIC_EPOCHS: Epoch[] = [
  { t: { en: "10⁻⁴³ s", zh: "10⁻⁴³ 秒" }, name: { en: "Planck era", zh: "普朗克时代" }, desc: { en: "Time itself may be undefined here — quantum gravity rules. The 'first moment' is not first in any classical sense.", zh: "时间本身在此或许尚未被定义——量子引力主宰。『第一刻』在任何经典意义上都不是第一。" } },
  { t: { en: "10⁻³⁶ s", zh: "10⁻³⁶ 秒" }, name: { en: "Inflation", zh: "暴胀" }, desc: { en: "Space expands exponentially, smoothing the cosmos and stretching quantum ripples into the seeds of galaxies.", zh: "空间指数式膨胀，抚平宇宙，并把量子涟漪拉伸为星系的种子。" } },
  { t: { en: "3 min", zh: "3 分钟" }, name: { en: "First nuclei", zh: "最初的原子核" }, desc: { en: "Protons and neutrons fuse into hydrogen and helium. The arrow of time is already pointing forward.", zh: "质子与中子聚变为氢与氦。时间之箭，已指向前方。" } },
  { t: { en: "380,000 yr", zh: "38 万年" }, name: { en: "First light", zh: "最初的光" }, desc: { en: "Atoms form, fog clears, light streams free — the afterglow we still detect today as the CMB.", zh: "原子形成，迷雾散去，光自由奔涌——那余晖，我们至今仍能作为微波背景探测到。" } },
  { t: { en: "13.8 Gyr", zh: "138 亿年" }, name: { en: "Now", zh: "当下" }, desc: { en: "Stars, planets, biology, computers — and a species building models of the time that made it.", zh: "恒星、行星、生物、计算机——以及一个物种，在为造就它的时间建模。" } },
  { t: { en: "10¹⁴ yr", zh: "10¹⁴ 年" }, name: { en: "Stellar end", zh: "恒星终结" }, desc: { en: "All stars die. The universe is dark and cold. Only black holes and degenerate matter remain.", zh: "所有恒星死去。宇宙黑暗而冰冷。只有黑洞与简并物质留存。" } },
  { t: { en: "10¹⁰⁰ yr", zh: "10¹⁰⁰ 年" }, name: { en: "Heat death", zh: "热寂" }, desc: { en: "Black holes evaporate. Maximum entropy. The arrow of time runs out of gradient to point along.", zh: "黑洞蒸发。最大熵。时间之箭，再无任何梯度可以指向。" } },
];

export interface EnergyShare { name: Bi; pct: number; color: string; }
export const ENERGY_BUDGET: EnergyShare[] = [
  { name: { en: "Dark energy", zh: "暗能量" }, pct: 68, color: "#ff5d8f" },
  { name: { en: "Dark matter", zh: "暗物质" }, pct: 27, color: "#9b6cff" },
  { name: { en: "Ordinary matter", zh: "普通物质" }, pct: 5, color: "#ffd277" },
];

/* ═══════════════════════════════ PANELS (info, mind, future) ═══════════════════════════════ */

export const PANELS: Record<string, Panel[]> = {
  info: [
    { t: { en: "Time = order of dependency", zh: "时间 = 依赖的次序" }, d: { en: "In any computational view of the universe, 'time' is the chain of which state depends on which. Past is upstream; future is downstream.", zh: "在对宇宙的任何计算观下，『时间』是『哪一态依赖于哪一态』的链条。过去在上游；未来在下游。" } },
    { t: { en: "Discrete ticks", zh: "离散时刻" }, d: { en: "Cellular automata, lattice gauge theory and quantum computation all run on countable steps. Is the universe a continuum or a clock cycle?", zh: "元胞自动机、格点规范论与量子计算，皆运行于可数的步骤之上。宇宙是连续体，还是时钟周期？" } },
    { t: { en: "Holographic time", zh: "全息时间" }, d: { en: "In AdS/CFT, the bulk's time direction is encoded in a boundary quantum theory. Time may be a feature of correlations, not a primitive.", zh: "在 AdS/CFT 中，体空间的时间方向，被编码在一个边界量子理论之中。时间或许是关联的一种特征，而非基本量。" } },
    { t: { en: "Landauer's principle", zh: "兰道尔原理" }, d: { en: "Erasing one bit of information costs at least kT ln 2 of energy. Information is physical — and so is time, which orders erasures.", zh: "擦除一个比特的信息，至少耗费 kT ln 2 的能量。信息是物理的——而时间，作为擦除的次序者，亦然。" } },
    { t: { en: "Reversibility limits", zh: "可逆性极限" }, d: { en: "Quantum gates are reversible by construction — but measurement is not. Time travel into the past collides with these one-way operations.", zh: "量子门按构造是可逆的——但测量不是。回到过去的时间旅行，与这些单向操作相撞。" } },
    { t: { en: "CTC computation", zh: "CTC 计算" }, d: { en: "Closed timelike curves, if they exist, could solve NP-hard problems in polynomial time. The price: an extremely constrained set of allowed states.", zh: "闭合类时曲线若存在，可在多项式时间内解 NP-难问题。代价是：一组被极度约束的允许态。" } },
  ],
  mind: [
    { t: { en: "The specious present", zh: "似是而非的当下" }, d: { en: "The 'now' we feel is a few seconds long — already a brain-constructed window, not an instant.", zh: "我们感受到的『此刻』有几秒长——已是大脑建构的窗口，而非一个瞬间。" } },
    { t: { en: "Multiple internal clocks", zh: "多重内部钟" }, d: { en: "Circadian rhythms, interval timing, episodic memory — chronoception is not one sense but many, each with its own pathologies.", zh: "生理节律、间隔计时、情景记忆——时知觉不是一种感觉，而是多种，每一种都有自己的病理。" } },
    { t: { en: "Time dilates with attention", zh: "时间随注意力而膨胀" }, d: { en: "Danger, novelty and emotion stretch perceived duration; routine compresses it. Felt time is not constant.", zh: "危险、新奇与情绪拉伸所感受的持续时间；常规则压缩它。被感受到的时间，并不恒定。" } },
    { t: { en: "Memory is reconstruction", zh: "记忆是重建" }, d: { en: "We do not replay the past; we reconstruct it from cues, each time slightly differently. Time-travel-via-memory is genuine but lossy.", zh: "我们并不重放过去；我们从线索中重建它，每次都略有不同。藉记忆的时间旅行是真实的，却有损。" } },
    { t: { en: "Anticipation as time travel", zh: "预期，作为时间旅行" }, d: { en: "Simulating future states is a core function of cognition; the same neural systems power memory and prediction.", zh: "模拟未来态，是认知的核心功能；同一组神经系统，驱动着记忆与预测。" } },
    { t: { en: "Editing the substrate", zh: "编辑基底" }, d: { en: "A civilization able to rewrite memory, attention and the substrate of mind achieves a kind of time travel without breaking physics.", zh: "一个能改写记忆、注意力与心智基底的文明，达成了某种时间旅行——而无需打破物理。" } },
  ],
  future: [
    { t: { en: "Relativistic interstellar travel", zh: "相对论性恒星际旅行" }, d: { en: "A starship at 0.9 c reaches Alpha Centauri in ~5 years ship-time while Earth ages ~10. A one-way future ticket, no exotic physics required.", zh: "一艘 0.9 c 的星舰在船时 ~5 年内抵达半人马座阿尔法，而地球已老 ~10 年。一张单向去往未来的车票，无需奇异物理。" } },
    { t: { en: "Black-hole computation", zh: "黑洞计算" }, d: { en: "Rotating Kerr black holes have been proposed as ultimate computational substrates — extracting work from frame-dragging and entropy.", zh: "旋转的克尔黑洞，已被提议为终极计算基底——从参考系拖曳与熵中提取功。" } },
    { t: { en: "Temporal communication", zh: "时间通信" }, d: { en: "Even without physical travel, sending information backwards in time has been studied via post-selection and weak-measurement protocols.", zh: "即便没有物理旅行，藉后选择与弱测量协议，向过去发送信息已被研究。" } },
    { t: { en: "Engineered spacetime", zh: "被建造的时空" }, d: { en: "Far-future engineering may include controllable curvature — warp metrics, stable wormholes, programmable causal structure.", zh: "遥远未来的工程，或可能包含可控的曲率——曲速度规、稳定的虫洞、可编程的因果结构。" } },
    { t: { en: "Causality manipulation", zh: "因果操作" }, d: { en: "Editing the dependency graph itself: choosing which past states a given future depends on, within whatever consistency constraints physics enforces.", zh: "编辑依赖图本身：在物理所强制的自洽约束之内，选择某一未来依赖哪些过去态。" } },
    { t: { en: "Post-time civilization", zh: "后时间文明" }, d: { en: "A civilization that experiences itself as a static structure rather than a flowing process — eternalism, lived from the inside.", zh: "一个把自身经验为静态结构、而非流动过程的文明——从内部活出的永恒主义。" } },
  ],
};

/* ═══════════════════════════════ REALITY VIEWS (for HolographicMap) ═══════════════════════════════ */

export interface RealityView { name: Bi; desc: Bi; color: string; }
export const REALITY_VIEWS: RealityView[] = [
  { name: { en: "Block universe", zh: "块状宇宙" }, desc: { en: "Past, present and future all coexist. 'Now' is a location, not a process. Time is geometry.", zh: "过去、现在与未来共存。『此刻』是一个地点，而非过程。时间即几何。" }, color: "#86f1ff" },
  { name: { en: "Many-Worlds", zh: "多世界" }, desc: { en: "Every quantum branch is real. Time travel splits rather than overwrites; paradoxes dissolve into branch choice.", zh: "每一道量子分支都真实。时间旅行是分裂，而非覆写；悖论消解为分支选择。" }, color: "#9b6cff" },
  { name: { en: "Thermal time", zh: "热力学时间" }, desc: { en: "There is no fundamental time — only correlations. What feels like flow is the statistics of a many-body state.", zh: "没有基本的时间——只有关联。感觉为流动之物，是多体态的统计。" }, color: "#ffd277" },
  { name: { en: "Emergent / holographic", zh: "涌现 / 全息" }, desc: { en: "Time direction is encoded in a more primitive quantum-information substrate. Both 'past' and 'future' are readings of correlations.", zh: "时间方向被编码在一个更原始的量子信息基底中。『过去』与『未来』，皆为关联的读法。" }, color: "#ff93b6" },
];

/* ═══════════════════════════════ RECURSIVE ENGINE (section 10) ═══════════════════════════════ */

export interface Domain { id: string; name: Bi; short: Bi; weight: number; }
export const DOMAINS: Domain[] = [
  { id: "relativity", name: { en: "Relativity", zh: "相对论" }, short: { en: "spacetime", zh: "时空" }, weight: 0.10 },
  { id: "quantum", name: { en: "Quantum mechanics", zh: "量子力学" }, short: { en: "branches", zh: "分支" }, weight: 0.10 },
  { id: "entropy", name: { en: "Thermodynamics", zh: "热力学" }, short: { en: "arrow", zh: "箭头" }, weight: 0.10 },
  { id: "information", name: { en: "Information theory", zh: "信息论" }, short: { en: "bits", zh: "比特" }, weight: 0.10 },
  { id: "causality", name: { en: "Causal structure", zh: "因果结构" }, short: { en: "dependencies", zh: "依赖" }, weight: 0.10 },
  { id: "wormholes", name: { en: "Wormhole physics", zh: "虫洞物理" }, short: { en: "geometry", zh: "几何" }, weight: 0.10 },
  { id: "consciousness", name: { en: "Consciousness", zh: "意识" }, short: { en: "memory", zh: "记忆" }, weight: 0.10 },
  { id: "computation", name: { en: "Computation", zh: "计算" }, short: { en: "simulation", zh: "模拟" }, weight: 0.10 },
  { id: "cosmology", name: { en: "Cosmology", zh: "宇宙学" }, short: { en: "history", zh: "历史" }, weight: 0.10 },
  { id: "engineering", name: { en: "Temporal engineering", zh: "时间工程" }, short: { en: "control", zh: "操控" }, weight: 0.10 },
];

export const ENGINE_STATES: { min: number; title: Bi; body: Bi }[] = [
  { min: 0,    title: { en: "Observer of time", zh: "时间的观察者" }, body: { en: "Time is taken at face value: a flowing river bearing events along. A civilization in this state lives within time but does not yet recognize it as a thing with parts.", zh: "时间被照单全收：一条载着事件前行的奔流之河。处于此态的文明栖居于时间之内，却尚未把它视作一个有部分的事物。" } },
  { min: 0.3,  title: { en: "Modeler of time",  zh: "时间的建模者" }, body: { en: "Relativity, thermodynamics and quantum mechanics click into place as different views of the same structure. Time becomes a property of geometry, statistics and dependency, not a backdrop. GPS works.", zh: "相对论、热力学与量子力学，作为同一结构的不同视图，咬合就位。时间变成几何、统计与依赖的属性，而非背景。GPS 运作。" } },
  { min: 0.55, title: { en: "Engineer of time", zh: "时间的工程师" }, body: { en: "Relativistic travel, gravitational time dilation, quantum branching as practical tools. Information clocks reach Planck-time precision. The civilization no longer only watches time — it perturbs it precisely.", zh: "相对论性旅行、引力时间膨胀、作为实用工具的量子分支。信息钟达到普朗克时间精度。这个文明不再只是观察时间——它精确地扰动它。" } },
  { min: 0.8,  title: { en: "Architect of time", zh: "时间的建筑师" }, body: { en: "A speculative horizon. A working theory of quantum gravity, controllable wormholes or closed timelike curves, programmable causal structure. Whether physics permits any of this — and at what cost — is the open question. Intelligence and the temporal substrate begin to look like the same kind of system.", zh: "一道推测性的地平线。一个可用的量子引力理论、可控的虫洞或闭合类时曲线、可编程的因果结构。物理是否允许其中任何一项——以及代价几何——是那个开放的问题。智能与时间基底，开始看起来像是同一种系统。" } },
];

/* ═══════════════════════════════ REALITY ANALYST ═══════════════════════════════ */

export interface Lens { id: string; role: Bi; }
export const LENSES: Lens[] = [
  { id: "physicist",     role: { en: "Theoretical physicist", zh: "理论物理学家" } },
  { id: "cosmologist",   role: { en: "Cosmologist",           zh: "宇宙学家"     } },
  { id: "philosopher",   role: { en: "Philosopher",           zh: "哲学家"       } },
  { id: "information",   role: { en: "Information theorist",  zh: "信息论者"     } },
  { id: "consciousness", role: { en: "Consciousness researcher", zh: "意识研究者" } },
  { id: "engineer",      role: { en: "Temporal-systems analyst", zh: "时间系统分析者" } },
];

export interface AnalystQ { q: Bi; answers: Record<string, Bi>; }
export const ANALYST: AnalystQ[] = [
  {
    q: { en: "Could we ever travel backwards in time?", zh: "我们能否真的回到过去？" },
    answers: {
      physicist:     { en: "Backwards in time is not formally forbidden by general relativity — closed timelike curves appear in valid solutions (Gödel universe, Kerr interior, Tipler cylinders). What's forbidden is having the energy to engineer one, and possibly Hawking's chronology protection conjecture: a yet-undiscovered effect that prevents the loop from closing. The honest answer: we don't have a working time machine, but the math hasn't ruled one out.", zh: "回到过去并未被广义相对论形式上禁止——闭合类时曲线在有效解中出现（哥德尔宇宙、克尔内部、蒂普勒圆柱）。被禁止的，是工程化一道所需的能量，以及可能存在的霍金时序保护猜想：一种尚未被发现的效应，阻止闭环合拢。诚实的回答：我们没有一台能用的时间机器，但数学也没有排除一台。" },
      cosmologist:   { en: "Astronomically, we already 'see' the past: light from distant galaxies left billions of years ago. The CMB is the universe at 380,000 years old. We routinely receive information from the past; what we cannot do is send any back. The asymmetry between reception and transmission of past-information is itself a clue about how time works.", zh: "天文学上，我们已经『看见』过去：来自遥远星系的光，是数十亿年前发出的。微波背景是 38 万岁的宇宙。我们日常接收来自过去的信息；我们做不到的，是把任何东西送回去。接收与发送过去信息之间的不对称，本身就是关于时间如何运作的一条线索。" },
      philosopher:   { en: "Even granting the physics, there are conceptual problems with 'travel'. To which past — your own remembered past, or a numerically identical four-dimensional location? If past, present and future all already exist (block universe), then 'going back' is more like changing your address than rewriting the building. The metaphor of travel may be the wrong one.", zh: "纵使物理上可行，『旅行』仍有概念上的问题。回到哪一个过去——你所记得的那一个，还是一个数值上同一的四维位置？若过去、现在与未来全都已存在（块状宇宙），那么『回去』更像是改变地址，而非重写大楼。旅行这个隐喻，或许就是错的那一个。" },
      information:   { en: "Reframe: can information from a future state reach a past state, satisfying consistency? Deutsch CTCs and post-selection models say 'yes, but only for inputs that are fixed points of the loop'. This dramatically restricts what you could 'know about the future' in advance — the universe acts as its own consistency checker.", zh: "重新框定：来自一个未来态的信息，能否抵达一个过去态，并保持自洽？Deutsch CTC 与后选择模型说『可以，但只对作为闭环不动点的输入而言』。这极大地限制了你能否提前『知晓未来』——宇宙，作为它自己的自洽性校验者运作。" },
      consciousness: { en: "Subjectively, we 'travel' to the past every time we remember, and to the future every time we plan. Both are simulations the brain runs in the present. Time travel as a felt experience is already routine; time travel as a physical relocation is the harder question.", zh: "主观上，我们每一次记起，都『旅行』至过去，每一次计划，都『旅行』至未来。两者都是大脑在当下运行的模拟。作为被感受的体验，时间旅行早已是常规；作为物理位置的转移，则是更难的问题。" },
      engineer:      { en: "Practically, a Type-II civilization could route a starship close to a Kerr black hole, dip into its ergosphere, and emerge with significant time dilation relative to home — effectively a future-ward time machine. Backwards is harder by many orders of magnitude. The engineering question is energy density per cubic meter, not philosophy.", zh: "实务上，一个 II 型文明可以让一艘星舰靠近一个克尔黑洞，潜入其能层，并在相对家园显著时间膨胀的情况下浮现——实际上一台朝向未来的时间机器。回到过去，难上数个数量级。工程问题是每立方米的能量密度，而非哲学。" },
    },
  },
  {
    q: { en: "What stops a grandfather-paradox-style contradiction?", zh: "是什么阻止了祖父悖论式的矛盾？" },
    answers: {
      physicist:     { en: "We don't strictly know. Three working hypotheses: Novikov self-consistency (only globally consistent histories exist), Many-Worlds (the contradictory branch is somewhere, but not yours), and chronology protection (the universe never lets the loop close in the first place). All three are consistent with current physics. We have no experiment to distinguish them.", zh: "我们并不严格知道。三种工作假设：诺维科夫自洽性（只有全局自洽的历史存在）、多世界（矛盾的分支存在于某处，但不是你的）、以及时序保护（宇宙根本不让闭环合拢）。三者皆与当前物理相容。我们没有实验能区分它们。" },
      cosmologist:   { en: "Cosmologically, the universe seems to have a strict arrow of time on every scale we can observe — entropy increases monotonically over 14 billion years with no observed exceptions. That's not proof a paradox cannot occur; it is strong empirical evidence that something keeps the bookkeeping tidy.", zh: "宇宙学上，在我们所能观测的每一个尺度上，宇宙似乎都有一条严格的时间之箭——熵在 140 亿年中单调增加，未观测到任何例外。这不是悖论不可能发生的证明；却是某物使账目保持整齐的有力实证。" },
      philosopher:   { en: "Maybe the paradox is the point. If a self-contradictory history cannot exist, then asking 'what stops the contradiction' is like asking what stops a married bachelor — the contradiction itself does. The universe doesn't need a mechanism; the contradiction is its own veto.", zh: "或许悖论本身就是关键。若一段自相矛盾的历史无法存在，那么追问『是什么阻止了矛盾』，就像追问什么阻止了一个已婚的单身汉——矛盾本身就阻止了。宇宙不需要一种机制；矛盾即其自身的否决。" },
      information:   { en: "From information theory: a loop with no fixed point is computationally undefined — there is no consistent state for it to be in. The 'paradox' is a non-state. CTC models like Deutsch's enforce this formally: only fixed-point density matrices are allowed.", zh: "从信息论的视角：一个没有不动点的闭环，是计算上未定义的——它没有任何自洽的态可处。『悖论』是一个非态。Deutsch 等 CTC 模型形式化地强制这一点：只有不动点密度矩阵被允许。" },
      consciousness: { en: "If the past is, in some sense, what you remember, the paradox softens. Two memories cannot coexist; either you remember killing the grandfather and being unborn — which you can't, you cease — or only one history reaches your present. The subjective vantage trims the possibilities.", zh: "若过去在某种意义上是你所记得之物，悖论便软化。两份记忆无法共存；要么你记得杀了祖父并未出生——你不能，你停止存在——要么只有一段历史抵达你的当下。主观视角，修剪了那些可能。" },
      engineer:      { en: "From a control-systems view, the paradox is an unstable equilibrium. Any feedback loop with a sign-flip blows up. A working time machine would need either a sign convention that keeps the loop stable (Novikov), a branch escape valve (Many-Worlds), or a hard interlock that won't let you reach the past in the first place.", zh: "从控制系统的视角，悖论是一个不稳定平衡。任何符号翻转的反馈环都会发散。一台可用的时间机器需要：保持环路稳定的符号约定（诺维科夫），分支逃逸阀（多世界），或一道根本不让你回到过去的硬锁。" },
    },
  },
  {
    q: { en: "Is time fundamental, or does it emerge from something deeper?", zh: "时间是基本的，还是从更深之物中涌现？" },
    answers: {
      physicist:     { en: "Increasingly, the betting is on emergent. The Wheeler-DeWitt equation of canonical quantum gravity has no time variable at all; what looks like time comes from correlations between subsystems. AdS/CFT lets bulk time emerge from boundary quantum information. We don't have a finished theory, but the direction is clear.", zh: "越来越多的赌注押在『涌现』上。正则量子引力的惠勒-德威特方程根本没有时间变量；看起来像时间之物，从子系统之间的关联中涌现。AdS/CFT 让体空间的时间，从边界量子信息中涌现。我们没有完工的理论，但方向已明朗。" },
      cosmologist:   { en: "If time is emergent, the Big Bang isn't really 'the first moment' — there's no moment 'before' because there's no global time function at that regime. Asking what came before is a category error; it's like asking what's north of the North Pole.", zh: "若时间是涌现的，大爆炸便不是真正的『第一刻』——在该区域中，并不存在『之前』的时刻，因为没有全局时间函数。追问『之前』是什么，是范畴错误；就像追问北极的北边是什么。" },
      philosopher:   { en: "Emergence has been a productive frame for many things — temperature emerges from molecular motion, consciousness arguably emerges from neural patterns. If time joins that list, it joins as the deepest example: the very thing in which 'emerging' is supposed to happen turns out to itself emerge.", zh: "涌现，作为框架，在许多事情上都富有成效——温度从分子运动中涌现，意识可能从神经图样中涌现。若时间加入此列，它便以最深的范例加入：『涌现』理应在其中发生之物，本身竟也涌现。" },
      information:   { en: "The cleanest version: start with a Hilbert space and a tensor-network structure of entanglement; coarse-grain; and time appears as the order along which information dependencies unfold. Space, time and dimension are all features of how qubits are correlated.", zh: "最干净的版本：从一个希尔伯特空间与纠缠的张量网络结构出发；粗粒化；时间便作为信息依赖展开的次序而出现。空间、时间与维度，都是量子比特如何相互关联的特征。" },
      consciousness: { en: "If physical time emerges from correlations, subjective time may emerge from a similar substrate: the brain's network of mutually-conditioning processes. We may already know what it's like to live inside an emergent time; it's just the only time we know.", zh: "若物理时间从关联中涌现，主观时间也许从类似的基底中涌现：大脑相互制约的过程网络。我们或许已经知道、栖居于一段涌现时间之内是怎样的感觉；它正是我们所知的唯一时间。" },
      engineer:      { en: "For engineering, the answer matters less than the operational definition. As long as you can label dependencies and measure intervals, you can build clocks, run computations and predict states. Whether time is 'fundamental' is theology; whether it's measurable is practice.", zh: "对工程而言，答案不如操作性定义重要。只要你能标记依赖、测量间隔，你就能造钟、运行计算、预测态。时间是否『基本』是神学；它是否可测量，则是实践。" },
    },
  },
  {
    q: { en: "If past, present and future all exist, do we have free will?", zh: "若过去、现在与未来都存在，我们还有自由意志吗？" },
    answers: {
      physicist:     { en: "Physics doesn't have a special variable for free will; what it has is determinism (or its absence). General relativity is deterministic given a complete initial slice; quantum mechanics injects irreducible probabilities at measurement. Both are compatible with the block universe — they're just different rules for how the block is shaped.", zh: "物理没有为自由意志而设的特殊变量；它有的，是决定论（或其缺席）。广义相对论在给定完整初始切片时是决定论的；量子力学在测量处注入不可约的概率。两者都与块状宇宙相容——它们只是塑造那个块的不同规则。" },
      cosmologist:   { en: "Cosmologically, the universe's evolution looks lawful and seamless. There's no observed 'free' nudge anywhere — but the laws permit chaotic amplification of tiny quantum events into macroscopic outcomes, which leaves plenty of room for unpredictability without leaving room for breaking the rules.", zh: "宇宙学上，宇宙的演化看上去合乎规律、天衣无缝。任何地方都未观测到『自由』的轻推——但定律允许微小量子事件被混沌地放大为宏观结果，这为不可预测性留出了余地，却没有为打破规则留出余地。" },
      philosopher:   { en: "The honest position is compatibilism: 'free will' is the relevant property of being responsive to reasons and choosing under no external coercion, and that property is fully compatible with determinism. The block universe doesn't take it away; you and your choices simply have a location in the block, not above it.", zh: "诚实的立场是相容论：『自由意志』是对理由作出回应、在没有外部强迫下作出选择这一相关属性，而该属性与决定论完全相容。块状宇宙并未夺走它；你和你的选择，仅仅在块中拥有一个位置，而非位于块之上。" },
      information:   { en: "Operationally, an agent has free will to the extent its actions are not predictable from coarse-grained inputs; the residual unpredictability is freedom. By that standard, modern humans, octopuses and sufficiently complex LLMs all have varying amounts of it.", zh: "操作性地说，一个代理在其行为无法从粗粒化输入中被预测的程度上拥有自由意志；那残余的不可预测性，即是自由。按此标准，现代人类、章鱼与足够复杂的 LLM，皆拥有不等的份额。" },
      consciousness: { en: "Subjectively, free will feels real: we deliberate, choose, regret. Neuroscience finds that conscious 'decision' often lags the brain's commit by hundreds of milliseconds — yet the conscious experience itself is part of the system, not separate from it. The 'feeling of choice' is what choosing-by-a-physical-system feels like from the inside.", zh: "主观上，自由意志感觉真实：我们斟酌、选择、悔恨。神经科学发现，意识的『决定』常滞后于大脑的承诺数百毫秒——但意识体验本身，是该系统的一部分，而非与之分离。『选择之感』，正是『一个物理系统从内部进行选择』的感觉。" },
      engineer:      { en: "From a controls view, an agent has 'free will' to the extent its policy is locally well-defined and globally underdetermined. That's enough to plan, optimise and be responsible for outcomes. Whether the policy is metaphysically 'free' doesn't change the engineering.", zh: "从控制视角，一个代理在其策略局部良定义、全局欠定的程度上拥有『自由意志』。这足以规划、优化与对结果负责。该策略是否形而上地『自由』，并不改变工程。" },
    },
  },
  {
    q: { en: "Will any civilization ever build a real time machine?", zh: "会有任何文明真正建造一台时间机器吗？" },
    answers: {
      physicist:     { en: "Future-ward, yes — relativistic spacecraft and gravitational time dilation give you a one-way machine. Past-ward, we don't know. The math allows it; the engineering looks fantastical; and chronology protection may forbid it altogether. We won't know which until we try the energies involved.", zh: "朝向未来：会的——相对论性飞船与引力时间膨胀，给你一台单向机器。朝向过去：我们不知道。数学允许它；工程看上去如幻；而时序保护或可彻底禁止它。直到我们尝试所涉及的能量之前，我们都不会知道。" },
      cosmologist:   { en: "The energy budget of a Type-III civilization (a galaxy's worth of starlight) is enough to manipulate spacetime on cosmological scales. Whether they would use it to time-travel — versus, say, computation or interstellar travel — is another question. The selection pressures of cosmic timescales matter.", zh: "一个 III 型文明的能量预算（一整个星系的星光），足以在宇宙学尺度上操作时空。他们是否会用它来时间旅行——还是用来做、比如计算或恒星际旅行——是另一个问题。宇宙尺度的选择压力，至关重要。" },
      philosopher:   { en: "There's a subtle constraint: if civilizations routinely built time machines, we should arguably already have visits from the future — and we don't, as far as we can tell. Either no civilization in our past light cone has, or chronology protection works, or they're here but careful. The negative evidence is real but ambiguous.", zh: "有一个微妙的约束：若文明日常地建造时间机器，我们理应已经收到来自未来的访问——而据我们所知，并没有。要么我们过去光锥中没有任何文明做到，要么时序保护奏效，要么他们在但很小心。否定性证据是真实的，却含糊。" },
      information:   { en: "Information-theoretically, the question is whether a loop can be made stable. Deutsch CTCs suggest yes, but only for inputs that are fixed points — which collapses the apparent power of time travel. A real time machine may exist but be useless for most things you'd want to use it for.", zh: "信息论上，问题在于一个闭环能否被稳定化。Deutsch CTC 说可以，但只对作为不动点的输入而言——这令时间旅行的表观威力骤减。一台真正的时间机器，或许存在，却对你最想用它做之事大都无用。" },
      consciousness: { en: "If 'time travel' includes editing memory, perception or the substrate of mind, a civilization need not warp spacetime at all — only its own subjectivity. That kind of time travel is technologically nearer and ethically harder.", zh: "若『时间旅行』包括编辑记忆、知觉或心智基底，那么一个文明根本无需弯曲时空——只需弯曲它自身的主观性。这种时间旅行，在技术上更近，在伦理上更难。" },
      engineer:      { en: "I'll give an honest number: at current trajectories, no time machine in any meaningful sense is on our roadmap. Future humans, if they survive a few more centuries, will have orders of magnitude more energy and computation. Whether they choose to spend it on this is a culture problem, not a physics problem.", zh: "我给一个诚实的数：按当下的轨迹，任何有意义的时间机器都不在我们的路线图上。未来的人类，若再存续数个世纪，将拥有指数级更多的能量与计算。他们是否选择把这些花在这上面，是文化问题，而非物理问题。" },
    },
  },
];
