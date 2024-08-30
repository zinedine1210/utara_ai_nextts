import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        basic:"#ffffff",
        primary:"#00526c",
        secondary:"#326087",
        dark:"#000000",
        darkPrimary:"#111827",
        darkSecondary:"#1F2937"
      }
    },
  },
  mode: 'jit',
  darkMode: 'class',
  plugins: [],
};
export default config;
