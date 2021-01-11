const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      helha_blue: {
        DEFAULT: "#009790",
      },
      helha_grey: {
        DEFAULT: "#424D58",
      },
      helha_dark_grey: {
        DEFAULT: "#252D36",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      yellow: colors.amber,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
