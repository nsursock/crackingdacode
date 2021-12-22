module.exports = {
  mode: 'jit',
  darkMode: 'media',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {
      // fontFamily: {
      //   indie: ['Indie Flower', 'cursive'],
      // },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
  purge: {
    content: ['./src/**/*.{html,js,md,njk,svg}'],
    enabled: process.env.NODE_ENV.startsWith('prod'),
  },
}
