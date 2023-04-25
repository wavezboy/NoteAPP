/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Source Sans Pro",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
