/** @type {import('tailwindcss').Config} */
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          wiggle: "wiggle 0.3s ease-in-out",
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-5deg)' },
            '50%': { transform: 'rotate(5deg)' },
          },
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // optional
        },
      },
    },
    plugins: [],
  }
  