import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: '#fafafa',
        border: '#e5e5e5',
        'text-primary': '#0a0a0a',
        'text-secondary': '#6b6b6b',
        'text-tertiary': '#a3a3a3',
        hover: '#f5f5f5',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
