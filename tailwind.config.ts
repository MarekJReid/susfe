/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

// Import the custom configuration data from customerConfig.json
import configData from "./customerConfig.json";

const config = {
  purge: {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: [],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        300: "300ms",
      },
      transitionTimingFunction: {
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      },
      width: ["group-hover"],
      colors: {
        ...configData.colors, // Use custom colors from customerConfig.json
        gray: colors.gray,
      },
      fontFamily: {
        ...configData.fonts,
      },
      fontSize: {
        ...configData.fontSizes,
      },
      boxShadow: {
        "ms-soft":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        // This is a softer box-shadow reminiscent of Fluent's soft UI.
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
