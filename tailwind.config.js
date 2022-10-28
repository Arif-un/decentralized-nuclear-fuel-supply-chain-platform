const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./index.html",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    darkTheme: true,
    themes: [
      {
        'cdark': {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          "primary": "#a4f96b",
          "--rounded-btn": "0.8rem",
        }
      },
      "light",
      // "dark",
      // 'night',
      // "dark-blue",
    ],
  }
}
