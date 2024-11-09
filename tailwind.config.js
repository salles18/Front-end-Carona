/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7E39',
        secondary: '#48C9A9',
      },
    },
  },
  plugins: [],
};