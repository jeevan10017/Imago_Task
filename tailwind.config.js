/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx}",
  ],
   darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-light': '#E7E7E780',
      },
  },
},
  plugins: [
     require('tailwind-scrollbar-hide')
  ],
}

