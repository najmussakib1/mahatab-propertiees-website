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
        brand: {
          teal: "#0d6e7e",
          "teal-dark": "#074853",
          "teal-light": "#158ca0",
          "teal-accent": "#2dd4bf",
        },
      },
    },
  },
  plugins: [],
};
export default config;
