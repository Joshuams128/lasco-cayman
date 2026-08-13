import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d4307a",
        "primary-light": "#f472b6",
        "primary-dark": "#a8215e",
        cream: "#fdf8f3",
        "warm-gray": "#f5f0eb",
        "warm-border": "#e8ddd4",
        "warm-muted": "#9b8b7e",
        charcoal: "#1c1917",
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Bold Caribbean accent family — used alongside primary magenta
        sea: {
          DEFAULT: "#0d9488",
          light: "#2dd4bf",
          dark: "#0f766e",
        },
        sun: {
          DEFAULT: "#f5b700",
          light: "#ffd23f",
          dark: "#d69700",
        },
        palm: {
          DEFAULT: "#1a936f",
          light: "#4ade80",
          dark: "#146c53",
        },
        papaya: {
          DEFAULT: "#ff6b35",
          light: "#ff8c5a",
          dark: "#e0501f",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        // Bold display headings reuse the self-hosted Geist family at heavy
        // weights (see `font-extrabold` usage) rather than fetching an
        // external Google Font at build time.
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-2%, 3%) scale(0.97)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "blob-float": "blob-float 12s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
