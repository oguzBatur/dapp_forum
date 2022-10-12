/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'first': "#161B3B",
      'second': "#1C2146",
      'third': "#3436f4",
      'button': "#656C9E",
        
      }
    },
  },
  plugins: []
}
