/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Geist', 'sans-serif'],
      },
      colors: {
        'primary': '#000',
        'secondary': '#1F2937',
        'accent': '#F59E0B',
        'white': '#fff',
      },
    },
  },
  plugins: [],
}
