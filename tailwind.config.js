/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: "#2563EB",
                    dark: "#1E40AF",
                },
                gray: {
                    light: "#f3f4f6",
                    DEFAULT: "#6B7280",
                    dark: "#374151",
                },
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
