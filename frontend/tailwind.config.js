/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#273c15",
          500: "#3f6122",
          400: "#496f27",
          300: "#689f38",
          200: "#82af5a",
          100: "#a7c78c",
          75: "#c1d8ad",
          50: "#f0f5eb",
        },
        brown: {
          500: "#392722",
          400: "#412d27",
          300: "#5d4037",
          200: "#796059",
          100: "#a1908b",
          75: "#bdb1ad",
          50: "#efeceb",
        },
      },
    },
    fontFamily: {
      body: ["Roboto"],
      sans: ["Roboto"],
    },
  },
  plugins: [],
};
