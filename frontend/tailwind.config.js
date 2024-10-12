/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        notosans: ["Noto Sans KR"],
      },
      colors: {
        orange: "#fb6134",
        darkGray: "#797979",
      },
    },
  },
  plugins: [],
};
