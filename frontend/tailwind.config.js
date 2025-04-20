/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f5e8',
          100: '#f3ebd1',
          200: '#e7d7a3',
          300: '#dcc266', // Secondary color
          400: '#c4a54d',
          500: '#9b6217', // Primary color
          600: '#7c4e12',
          700: '#5d3a0e',
          800: '#3e2709',
          900: '#1f1305',
        },
        accent: {
          50: '#fff7e6',
          100: '#ffefcc',
          200: '#ffdf99',
          300: '#ffcf66',
          400: '#ffbf33',
          500: '#ff8400', // Minor color
          600: '#cc6a00',
          700: '#994f00',
          800: '#663500',
          900: '#331a00',
        },
        highlight: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#000000', // Minor color
        },
        success: {
          50: '#F0FDF4',
          500: '#22C55E',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          900: '#7F1D1D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};