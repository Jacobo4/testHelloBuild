/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Libre Franklin', 'ui-sans-serif', 'system-ui'],
      serif: ['Libre Franklin', 'ui-serif', 'Georgia'],
      mono: ['Libre Franklin', 'SFMono-Regular'],
    },
    extend: {
      colors:{
        primary: "#18d399",
        secondary: "#172c45",
        third: "#6ef0fa",
      }
    },
  },
    plugins: [require('@tailwindcss/forms')],

}
