/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    colors: {
      'first': "#f3f169",
      'second': "#cb3b3b",
      'third': "#85203b",
    },
    extend: {
    },
  },
  plugins: [require('daisyui')],
}
