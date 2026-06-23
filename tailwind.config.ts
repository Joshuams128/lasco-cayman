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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
