const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {
      fontFamily: {
        // erica: ['Erica One', 'cursive'],
        //   poppins: ['Poppins', 'sans-serif']
        // marker: ['Permanent Marker', 'cursive'],
        // indie: ['Indie Flower', 'cursive'],
        // heading: ['Baloo Da 2', 'cursive'],
        // paragraph: ['Lora', 'serif']
        // website: ['Work Sans', 'sans-serif'],
        // website: ['Special Elite', 'cursive'],
        website: ['Aldrich', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        popin: 'popin 1s',
        swing: 'swing 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        jello: 'jello 1s ease 0s 1 normal forwards',
        random: 'random 2s ease 0s 1 normal forwards',
      },
      keyframes: {
        random: {
          '0%, 100%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '25%': {
            transform: `scale3d(${Math.random().toFixed(2) + 1}, ${
              Math.random().toFixed(2) + 1
            }, ${Math.random().toFixed(2)}+1)`,
          },
          '50%': {
            transform: `scale3d(${Math.random().toFixed(
              2
            )}, ${Math.random().toFixed(2)}, ${Math.random().toFixed(2)})`,
          },
          '75%': {
            transform: `scale3d(${Math.random().toFixed(2) + 1}, ${
              Math.random().toFixed(2) + 1
            }, ${Math.random().toFixed(2) + 1})`,
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        jello: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '30%': {
            transform: 'scale3d(1.25, 0.75, 1)',
          },
          '40%': {
            transform: 'scale3d(0.75, 1.25, 1)',
          },
          '50%': {
            transform: 'scale3d(1.15, 0.85, 1)',
          },
          '65%': {
            transform: 'scale3d(0.95, 1.05, 1)',
          },
          '75%': {
            transform: 'scale3d(1.05, 0.95, 1)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        swing: {
          '0%': {
            transform: 'rotateX(180deg)',
            transformOrigin: 'top',
          },
          '100%': {
            transform: 'rotateX(0)',
            transformOrigin: 'top',
          },
        },
        popin: {
          '0%': {
            transform: 'scale3d(0, 0, 0)',
            opacity: 0,
          },
          '20%': {
            opacity: 1,
          },
          '40%': {
            transitionTimingFunction: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
            transform: 'scale3d(1.08, 1.08, 1.08)',
          },
          '60%': {
            transitionTimingFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
            transform: 'scale3d(1, 1, 1)',
          },
          '80%': {
            transitionTimingFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },
          '100%': {
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'scale3d(1, 1, 1)',
          },
        },
      },
    },
  },
  variants: {
    extend: { typography: ['dark'] },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
        // '.rotate-y-m180': {
        //   transform: 'rotateY(-180deg)',
        // },
      })
    }),
  ],
  content: ['./src/**/*.{html,js,md,njk,svg}'],
  safelist: [],
}
