/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom light theme colors
        light: {
          bg: '#F3F6FB',
          card: '#FFFFFF',
          text: '#111827',
          border: '#E4EAF3',
          accent: '#2563EB',
        },
        // Custom dark theme colors
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          text: '#FFFFFF',
          textSecondary: '#CBD5E1',
          border: '#334155',
          accent: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '24px': '24px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
