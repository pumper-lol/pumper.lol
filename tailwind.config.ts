import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "glow-sm": "0px 0px 4px 0px",
        "glow-sm-a": "0px 1px 4px 0px #26282E5E",
      },
      fontFamily: {
        dmSans: ["var(--font-dm-sans)", "sans-serif"],
        dokdo: ["var(--font-dokdo)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
