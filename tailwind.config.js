/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        vantequ: ['VANTEQU', 'sans-serif'], // Add the font here
      },
    },
  },
  plugins: [],
};