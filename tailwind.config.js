/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fluffyPink: "#ffcce0",
        fluffyDark: "#331a2e",
        fluffyAccent: "#ff99cc",
        fluffyWhite: "#fffafc",
      },
      fontFamily: {
        kawaii: ['"Comic Neue"', "cursive"],
      },
      animation: {
        'cloud-move': 'cloudMove 60s linear infinite',
      },
      keyframes: {
        cloudMove: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
