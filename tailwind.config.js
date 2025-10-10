const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/*.html",
    "./node_modules/flyonui/dist/js/*.js",
    "../path/to/notyf/**/*.js",
  ],
  theme: {
  extend: {
    keyframes: {
      scroll: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
    animation: {
      scroll: "scroll 60s linear infinite",
    },
    skew: {
      "-2": "-2deg",
      "2": "2deg",
    },
  },
},
  flyonui: {
    vendors: true, // Enable vendor-specific CSS generation
  },
  plugins: [
    addDynamicIconSelectors(),
    require("flyonui"),
    require("flyonui/plugin"),
  ],
};
