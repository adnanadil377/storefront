// tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
  ],
};
