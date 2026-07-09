import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F4C81",
        secondary: "#FF9933",
        accent: "#138808",
        surface: "#F4F6F8",
        ink: "#1A1A1A",
        muted: "#4B5563",
        border: "#E2E8F0"
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 76, 129, 0.08)"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        hindi: ["var(--font-devanagari)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

