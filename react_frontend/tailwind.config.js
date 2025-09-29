/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8B5CF6',
          secondary: '#6B7280',
          success: '#10B981',
          error: '#EF4444',
          background: '#F3E8FF',
          surface: '#FFFFFF',
          text: '#374151'
        }
      },
      boxShadow: {
        card: '0 10px 25px -10px rgba(0,0,0,0.15)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      backgroundImage: {
        'wildlife-gradient': 'linear-gradient(120deg, rgba(187,247,208,0.6), rgba(219,234,254,0.6))'
      }
    }
  },
  plugins: []
};
