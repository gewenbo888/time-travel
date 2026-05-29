import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep cosmic void — near-black with a blue-violet undertone
        void: {
          950: "#04030d",
          900: "#070617",
          800: "#0c0b22",
          700: "#13122e",
          600: "#1b1942",
          500: "#272455",
        },
        // spacetime cyan — the grid, light, geometry, the structural pole
        flux: {
          600: "#1796b4",
          500: "#36e6ff",
          400: "#86f1ff",
        },
        // quantum violet — the small scale, probability, dimensions
        iris: {
          600: "#6f4be6",
          500: "#9b6cff",
          400: "#c4abff",
        },
        // starlight amber — energy, mass, light, the warm radiant pole
        gold: {
          600: "#cf9b2e",
          500: "#f0bb4d",
          400: "#ffd277",
          300: "#ffe3a6",
          200: "#fff0cf",
        },
        // singularity rose — extreme gravity, horizons, collapse
        plasm: {
          600: "#cf3a78",
          500: "#ff5d8f",
          400: "#ff93b6",
        },
        ink: {
          50: "#f4f6ff",
          100: "#e7e9fb",
          300: "#b2b4d6",
          500: "#777a9e",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Spectral"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Serif SC"', "serif"],
        zhsans: ['"Noto Sans SC"', "sans-serif"],
      },
      boxShadow: {
        panel: "inset 0 1px 0 rgba(54,230,255,0.07), 0 24px 64px -30px rgba(0,0,0,0.95)",
        glow: "0 0 48px -10px rgba(54,230,255,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
