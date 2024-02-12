/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
         primary: "#F5385D",
        lightBlack: "bg-[#0000005f]",
      },
    },
  },
  plugins: [],
};
