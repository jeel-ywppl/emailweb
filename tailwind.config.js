/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary1: "#1C1F26",
                secondary2: "#818592",
                primary: "#4CAF50",
                secondary: "#388E3C",
            },
            // fontFamily: {
            //     sans: ["SF Pro", "Helvetica", "Arial", "sans-serif"],
            // },
        },
    },
    plugins: [require("tailwind-scrollbar"), flowbite.plugin()],
});
