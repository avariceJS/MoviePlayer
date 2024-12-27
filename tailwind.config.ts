/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#423d6a',
        header:'#282640',
        body:'#1c1a28',
      },
      screens:{
        'mobile':{
          max: '768px'
        }
      }
    },
  },
  plugins: [],
}