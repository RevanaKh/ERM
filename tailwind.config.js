const flowbiteReact = require('flowbite-react/plugin/tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Menambahkan folder Flowbite
    'node_modules/flowbite-react/**/*.js',
    '.flowbite-react\\class-list.json',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'), flowbiteReact],
};
