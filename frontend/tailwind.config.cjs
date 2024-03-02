/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      body: ['"Patua One"']
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 5s 5s linear infinite',
        'wiggle': 'wiggle 15s ease-in-out infinite',
        'wiggle-slow': 'wiggle 20s ease-in-out infinite',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: '#6351e5',
          dark: '#2e3d7f'
        },
        neongruen: '#17fbb6',
        jelb: "#e8d046",
        kupfer: "#23c392",

      },
    },
  },

  plugins: [],
};

module.exports = config;
