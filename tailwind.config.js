/** @type {import('tailwindcss').Config} */
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

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
        'my-purple4': '#BCA9F1',
        'my-gray': '#5c5c5c',
        'my-gray2': '#C1CAD7',
        'lightGray': '#F5F5F5',
        'lightGray2': '#EEEEEE',
        'my-orange': '#FFC531',
        'my-orange2': '#ffd66e',
        'dark-purple': '#1e013d',
        'my-yellow' :'#ebdb02',
        'my-dark' : '#242323',
        'my-darkGray' : '#292929',
        'my-darkGray2' : '#403f3f',
      },
    },
    screens: {
      
      'myLandscape': { 'raw': '(orientation: landscape) and (max-width:1279px)' },
      'mobile': '390px',
      'mobileDark': { 'raw': '(max-width:1279px) and (prefers-color-scheme: dark)' },
      'desktop': '1280px',
      'desktopDark': { 'raw': '(min-width:180px) and (prefers-color-scheme: dark)' },
    },
  },
  plugins: [iOSHeight,],
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      translate: ['group-hover', 'hover'],
      textColor:['hover']
    }
  },
}
