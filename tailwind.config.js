/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      translate: ['group-hover', 'hover'],
      textColor:['hover']
    }
  },
}
