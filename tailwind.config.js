/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./constants.ts",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./i18n/**/*.{ts,tsx,js,jsx}",
    "./hooks/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        byte: {
          navy: '#050C16',
          purple: '#6200EA',
          purpleLight: '#7B2CBF',
          cyan: '#00F0FF',
          dark: '#020609',
          surface: '#0F2547',
          highlight: '#CCFF00',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
        mono: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6200EA, 0 0 10px #6200EA' },
          '100%': { boxShadow: '0 0 20px #6200EA, 0 0 30px #00F0FF' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'byte-gradient': 'linear-gradient(to bottom right, #050C16, #0F2547)',
      },
    },
  },
  plugins: [],
};
