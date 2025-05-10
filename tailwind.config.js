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
                    DEFAULT: "#2563EB", 
                    dark: "#1E40AF",
                },
                gray: {
                    light: "#f3f4f6", // gray-100
                    DEFAULT: "#6B7280", // gray-500
                    dark: "#374151", // gray-700
                },
                primary1: "#1C1F26", // Optional extra
                secondary2: "#818592", // Optional extra
                primary: "#4CAF50", // Green (optional)
                secondary: "#388E3C", // Green dark (optional)
            },
            keyframes: {
                bounceCustom: {
                    "0%, 100%": {transform: "translateY(0)"},
                    "50%": {transform: "translateY(-10px)"},
                },
            },
            animation: {
                "bounce-custom": "bounceCustom 0.8s ease-in-out infinite",
                "spin-slow": "spin 2s linear infinite",
            },
            fontFamily: {
                sans: ["SF Pro", "Helvetica", "Arial", "sans-serif"],
                Special_Gothic_Expanded_One: ["Special_Gothic_Expanded_One", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar"), flowbite.plugin()],
});
