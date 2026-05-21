/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'bounce-once': 'bounce-once 0.5s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
} 
