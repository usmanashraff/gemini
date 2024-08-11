/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito: ['Nunito'],
        poppins:['Poppins']
      },


      // animations
      animation: {
        pulse: 'pulse 8s ease-in-out infinite alternate',
        backForth: 'backForth 3s ease-in-out infinite alternate',
        rotateLogo: 'rotateLogo 2s ease-in-out infinite alternate',
      },

      keyframes: {
        pulse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-10%)' },
        },
        backForth: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(-5deg)' },
        },
        rotateLogo: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

