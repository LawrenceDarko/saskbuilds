import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#185FA5',
          light: '#E6F1FB',
          border: '#378ADD',
          dark: '#0e4a80',
        },
        riskH: {
          DEFAULT: '#A32D2D',
          bg: '#FCEBEB',
          accent: '#E24B4A',
        },
        riskM: {
          DEFAULT: '#854F0B',
          bg: '#FAEEDA',
          accent: '#EF9F27',
        },
        riskL: {
          DEFAULT: '#3B6D11',
          bg: '#EAF3DE',
          accent: '#639922',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
