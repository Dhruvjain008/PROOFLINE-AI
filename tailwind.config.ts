import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#121E36",
        creamyYellow: "#FFF1C1",
        ivory: "#FAF7EF",
        teal: "#50BEB8",
        royalBlue: "#4C6EF5",
        slate: "#69778F",
        softBorder: "#E5E8EF",
        amber: "#D99019",
        red: "#C94C4C",
      },
    },
  },
  plugins: [],
};

export default config;
