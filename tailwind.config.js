/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: '#FADADD',
        pastelBlue: '#DAEAF6',
        pastelGreen: '#E2F0CB',
        pastelPurple: '#E5D4ED',
      },
    },
  },
  plugins: [],
}
