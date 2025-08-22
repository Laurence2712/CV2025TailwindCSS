module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        combo: ['Combo', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],

      },
      colors: {
        primary: {
          light: '#a855f7',
          DEFAULT: '#6366f1',
          dark: '#4338ca',
        },
        secondary: {
          light: '#ec4899',
          DEFAULT: '#db2777',
          dark: '#9d174d',
        },
      },
    },
  },
  plugins: [],
}
