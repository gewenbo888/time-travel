import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "Time Travel Engine · The Nature of Time, Causality, Wormholes, Many-Worlds & Temporal Engineering";
const TITLE_ZH =
  "时间旅行引擎 · 时间、因果、虫洞、多世界与时间工程的本质";
const DESC =
  "A civilisation-scale, bilingual exploration of time and time travel — relativity, time dilation, wormholes, the arrow of time, many-worlds, three classical paradoxes, consciousness, information time, future-civilisation temporal engineering, and the question of whether time itself fundamentally flows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://time-travel.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "time travel", "time", "causality", "relativity", "special relativity", "general relativity",
    "time dilation", "Lorentz factor", "twin paradox", "black holes", "Kerr black hole",
    "Einstein-Rosen bridge", "wormholes", "Morris-Thorne", "Gödel universe", "closed timelike curves",
    "chronology protection", "arrow of time", "entropy", "second law", "past hypothesis",
    "Boltzmann", "thermal time", "many-worlds", "Everett", "decoherent histories", "Deutsch CTC",
    "grandfather paradox", "bootstrap paradox", "predestination paradox", "Novikov self-consistency",
    "consciousness", "chronoception", "subjective time", "block universe", "eternalism",
    "presentism", "growing block", "simulation hypothesis", "information time", "Wheeler-DeWitt",
    "AdS/CFT", "ER=EPR", "emergent time", "holographic time", "Kardashev", "temporal engineering",
    "black-hole computation",
    "时间旅行", "时间", "因果", "相对论", "狭义相对论", "广义相对论", "时间膨胀", "洛伦兹因子",
    "孪生悖论", "黑洞", "克尔黑洞", "爱因斯坦-罗森桥", "虫洞", "莫里斯-索恩", "哥德尔宇宙",
    "闭合类时曲线", "时序保护", "时间之箭", "熵", "热力学第二定律", "过去假设", "玻尔兹曼",
    "热力学时间", "多世界", "埃弗雷特", "退相干历史", "Deutsch CTC", "祖父悖论", "自举悖论",
    "预定悖论", "诺维科夫自洽性", "意识", "时知觉", "主观时间", "块状宇宙", "永恒主义",
    "现在主义", "生长块", "模拟假说", "信息时间", "惠勒-德威特", "AdS/CFT", "ER=EPR",
    "涌现时间", "全息时间", "卡尔达肖夫", "时间工程", "黑洞计算",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    title: TITLE_EN,
    description:
      "Relativity · wormholes · the arrow of time · many-worlds · paradoxes · consciousness · information time · temporal engineering. A bilingual atlas of what time is and what time travel might mean.",
    url: "https://time-travel.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_EN,
    description: "Time · causality · wormholes · many-worlds · the three paradoxes. A bilingual atlas of whether time itself fundamentally flows.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#04030d" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://time-travel.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-void-950 text-ink-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
