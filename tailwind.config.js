/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headerBackground: "#F6F6F7",
        fontPrimary: "#222222",
        fontSecondary: "#888888",
        requiredStar: "#C90000",
        borderLightGrey: "#CCCCCC",
        borderDarkGrey: "#222222",
      },
    },
  },
  plugins: [],
};
