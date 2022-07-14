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
        'my-purple': '#5f00d2',
        'my-purple2': '#6900c5',
        'my-purple3': '#7900D2',
        'my-gray': '#5c5c5c',
        'my-gray2': '#C1CAD7',
        'lightGray': '#F5F5F5',
        'lightGray2': '#F5F5F5',
        'my-orange': '#FFC531',
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
