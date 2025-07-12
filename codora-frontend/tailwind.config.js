/** @type {import('tailwindcss').Config} */
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
  