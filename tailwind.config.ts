import lineClamp from '@tailwindcss/line-clamp'
import scrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423d6a',
        header: '#23252b',
        body: '#000000',
      },
      screens: {
        mobile: {
          max: '768px',
        },
      },
    },
  },
  plugins: [lineClamp, scrollbar],
}
