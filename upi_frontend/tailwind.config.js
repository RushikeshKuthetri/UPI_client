module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'left-drawer-light': '0 -2px 6px rgba(0, 0, 0, 0.1), 2px 0 6px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)',
        'left-drawer-dark': '0 -2px 6px rgba(255, 255, 255, 0.12), 2px 0 6px rgba(255, 255, 255, 0.12), 0 2px 6px rgba(255, 255, 255, 0.12)',
        'header-shadow-light': '0 2px 6px rgba(0, 0, 0, 0.25)',
        'header-shadow-dark': '0 2px 6px rgba(255, 255, 255, 0.25)',
        'onhover-card-shadow-light': '0 0px 8px rgba(0, 0, 0, 0.25)',
        'onhover-card-shadow-dark': '0 0px 8px rgba(255, 255, 255, 0.25)',
        'card-top-border': 'radial-gradient(circle, #FFCD94, #FD9F35)',
      },
    }
  },
  plugins: [],
};