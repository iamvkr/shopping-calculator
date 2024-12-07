/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');
export default konstaConfig({
  konsta: {
    colors: {
      // "primary" is the main app color, if not specified will be default to '#007aff'
      primary: '#65548f'
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [],
})

