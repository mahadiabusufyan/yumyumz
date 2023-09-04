import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#62d2a2',
        secondary: '#1fab89',
        accent: '#A2A378',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
