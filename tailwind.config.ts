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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          dark: "#050505",
          neon: "#00FF66",
          blue: "#0070F3",
        },
        aegis: {
          dark: "#050505",
          neon: "#00FF66",
          electric: "#0070F3",
        },
      },
      fontFamily: {
        clash: ['var(--font-clash)', 'sans-serif'],
        space: ['var(--font-space)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
