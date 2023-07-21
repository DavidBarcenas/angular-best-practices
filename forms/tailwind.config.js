/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'fade-message': 'fade-in-message 300ms',
      },
    },
    keyframes: {
      'fade-in-message': {
        '0%': { opacity: 0, transform: 'translateY(-5px)' },
        '100%': { opacity: 1, transform: 'translateY(0px)' },
      },
    },
  },
  plugins: [],
};
