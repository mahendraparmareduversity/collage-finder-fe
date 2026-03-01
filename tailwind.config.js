/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        // College Eduversity logo palette
        primary: {
          DEFAULT: '#2A3B60', // Dark blue (logo text / laurel)
          dark: '#1E2A45',
        },
        navy: {
          DEFAULT: '#1E2A45', // Hero / dark sections
          deep: '#151F33',
          mid: '#2A3B60',
        },
        cta: {
          DEFAULT: '#EB6A2D', // Orange (logo accent)
          hover: '#D95A22',
        },
        success: '#16A34A', // Verified / Placements
        neutral: {
          bg: '#F5F5F5', // Light grey (logo background)
          border: '#E5E7EB',
          text: '#111827',
          muted: '#6B7280',
          'on-dark': '#CBD5E1',
        },
      },
      fontSize: {
        'hero': ['clamp(2.5rem,5vw,3.5rem)', { lineHeight: '1.1' }],
        'h2': ['2rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': '5rem', // 80px
      },
      borderRadius: {
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 10px 25px rgba(0,0,0,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite reverse',
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
}
