/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'fade-message': 'fade-in-message 300ms',
        'checked-option': 'checked-option 300ms ease-out',
      },
    },
    keyframes: {
      'fade-in-message': {
        '0%': { opacity: 0, transform: 'translateY(-8px)' },
        '100%': { opacity: 1, transform: 'translateY(0px)' },
      },
      'checked-option': {
        '0%': { opacity: 0, transform: 'scale(0.9)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
};
