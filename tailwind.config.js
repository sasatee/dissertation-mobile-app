/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulishextrabold: "Mulish_800ExtraBold",
        mulishregular: "Mulish_400Regular",
        mulishbold: "Mulish_700Bold",
        mulishsemibold: "Mulish_600SemiBold",
      },
    },
  
  },
  plugins: [],
};
