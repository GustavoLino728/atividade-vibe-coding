/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC857',
          light: '#FFD97D',
          dark: '#E6A600',
        },
        secondary: {
          DEFAULT: '#2D3142',
          light: '#4F5D75',
        },
      },
    },
  },
  plugins: [],
}