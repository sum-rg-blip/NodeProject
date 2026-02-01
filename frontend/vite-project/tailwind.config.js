/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1D1D1D',
        'accent-teal': '#81D4FA',
        'accent-peach': '#FFEBD1',
        'bg-lavender': '#F3EFFF',
        'gray-light': '#F9F9FB',
        'gray-soft': '#E0E0E0',
        'gray-text': '#717171',
      },
      borderRadius: {
        'xl': '40px',
        'lg': '20px',
      },
      boxShadow: {
        'premium': '0 30px 60px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
