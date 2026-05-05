import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: "#00d4ff",
          purple: "#7b2fff",
        },
        bg: {
          dark: "#0a0e27",
          darker: "#060918",
          card: "rgba(255,255,255,0.03)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 4px rgba(0, 212, 255, 0.3)" },
          "100%": { boxShadow: "0 0 12px rgba(0, 212, 255, 0.6)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
