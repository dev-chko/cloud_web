/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      xs: "370px",
      sm: "476px",
      md: "835px",
      lg: "1280px",
      xl: "1920px",

      tablet: "835px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      // scrollMargin: {
      //   96: "36rem",
      // },
      // with: {
      //   600: "600px",
      // },
    },
  },
  plugins: [],
  // plugins: [require("@tailwindcss/forms")],
};
