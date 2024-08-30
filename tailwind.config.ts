import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      'sm': '430px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1300px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1580px',
      // => @media (min-width: 1536px) { ... }
    },
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
