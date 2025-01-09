/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./main/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "lacquer": ["Lacquer", 'serif'],
        "Gabarito": ["Gabarito", 'serif'],
        "Inter":["Inter", 'serif']
      }
    },
  },
  plugins: [],
}

