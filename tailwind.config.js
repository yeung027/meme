/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  theme: {
    fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
    extend: {
      colors: {
        'my-purple': '#6900c5',
        'my-gray': '#5c5c5c',
      },
    },
  },
  plugins: [],
}
