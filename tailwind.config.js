/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        blue: {
          DEFAULT: "#2563EB", // Tailwind's blue-600
          dark: "#1E40AF", // blue-800
        },
        gray: {
          light: "#f3f4f6", // gray-100
          DEFAULT: "#6B7280", // gray-500
          dark: "#374151", // gray-700
        },
        primary1: "#1C1F26",   // Optional extra
        secondary2: "#818592", // Optional extra
        primary: "#4CAF50",    // Green (optional)
        secondary: "#388E3C",  // Green dark (optional)
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      fontFamily: {
        sans: ["SF Pro", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), flowbite.plugin()],
});
