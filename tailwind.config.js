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
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        }
      },
      fontFamily: {
        // erica: ['Erica One', 'cursive'],
        //   poppins: ['Poppins', 'sans-serif']
        // marker: ['Permanent Marker', 'cursive'],
        // indie: ['Indie Flower', 'cursive'],
        // heading: ['Baloo Da 2', 'cursive'],
        // paragraph: ['Lora', 'serif']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        popin: 'popin 2s',
        swing: 'swing 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        jello: 'jello 1s ease 0s 1 normal forwards'
      },
      keyframes: {
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
  ],
  purge: {
    content: ['./src/**/*.{html,js,md,njk,svg}'],
    enabled: process.env.NODE_ENV.startsWith('prod'),
  },
}
