// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Indica onde o Tailwind deve procurar classes CSS
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'], // Define 'Sora' como a fonte principal
      },
      colors: {
        'navbar-footer': '#451a8b', // Define a cor personalizada para o navbar e o rodapé
      },
    },
  },
  plugins: [],
};
