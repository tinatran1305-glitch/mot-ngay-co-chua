import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF5EB",
          200: "#F3E9D2",
          300: "#E8D7B4",
        },
        sage: {
          50: "#F2F7F4",
          100: "#E1EFE6",
          200: "#C5E0CF",
          300: "#9BC7AD",
          500: "#4F8A6B",
          600: "#3D6F55",
          700: "#2F5642",
        },
        skysoft: {
          50: "#F0F7FC",
          100: "#E0EFFA",
          200: "#BAE0F5",
          300: "#89C7EC",
          500: "#3B8AC4",
          600: "#2B6EA0",
        },
        sungold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#D99B16",
          600: "#B47B0E",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -4px rgba(120, 100, 75, 0.08)",
        card: "0 4px 20px -2px rgba(95, 82, 63, 0.07)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;

