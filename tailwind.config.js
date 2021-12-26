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
      fontFamily: {
        //   erica: ['Erica One', 'cursive'],
        //   poppins: ['Poppins', 'sans-serif']
        // marker: ['Permanent Marker', 'cursive'],
        // indie: ['Indie Flower', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
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
