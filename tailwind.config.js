/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan your src folder for files
  ],
  theme: {
    extend: {}, // You can extend the default theme here if needed
  },
  plugins: [], // Add any Tailwind plugins here if needed
};