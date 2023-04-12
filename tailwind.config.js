/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        success: '#5AAC44',
        primary: colors.blue
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
