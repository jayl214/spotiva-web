/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation:{
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'quickBounce': 'quickBounce 0.5s'
      },
      keyframes: {
        'shake' : {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%' : {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'   
          }
        },
        quickBounce : {
          '0%, 50%, 100%' : {
            'transform': 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
          '25%' : {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '75%' : {
            transform: 'translateY(-20%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          }
        },
      },
      'scale': {
        '200': '2'
      }
    }
  },
  plugins: [],
  safelist: [
    'bg-rose-300',
    'bg-fuchsia-300',
    'bg-violet-300',
    'bg-blue-300',
    'bg-cyan-300',
    'bg-amber-300',
  ]
};

module.exports = config;
