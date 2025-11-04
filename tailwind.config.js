module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'popup': 'popup 0.4s ease-out forwards',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        popup: {
          '0%': { 
            opacity: '0',
            transform: 'translate(-50%, 10px)'
          },
          '50%': {
            transform: 'translate(-50%, -5px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate(-50%, 0)'
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}