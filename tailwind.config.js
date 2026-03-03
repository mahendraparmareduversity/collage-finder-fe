/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        // College Eduversity logo palette (from logo: cap + COLLEGE = orange, laurel + EDUVERSITY = blue)
        primary: {
          DEFAULT: '#2A476F', // Deep blue – logo laurel wreaths & "EDUVERSITY"
          dark: '#1E3550',
          light: '#3D5A80',
        },
        navy: {
          DEFAULT: '#1E3550', // Hero / dark sections (darker blue)
          deep: '#152A40',
          mid: '#2A476F',
        },
        cta: {
          DEFAULT: '#F47C3C', // Vibrant orange – logo graduation cap & "COLLEGE"
          hover: '#E06D2E',
          light: '#FDE8DE',
        },
        success: '#16A34A', // Verified / Placements
        neutral: {
          bg: '#F7F9FB', // Soft off-white (logo background feel)
          border: '#E2E8F0',
          text: '#1E293B',
          muted: '#64748B',
          'on-dark': '#CBD5E1',
        },
        // Logo-derived surfaces – no pure white
        surface: '#F7F9FB',       // Soft grey-blue (logo bg)
        'surface-light': '#EEF2F7', // Slightly more blue-tinted for cards
        'surface-warm': '#FBF6F2',  // Subtle orange tint for variety
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
      backgroundImage: {
        'card-gradient': 'linear-gradient(165deg, #E8EEF5 0%, #E2E8F0 100%)',
      },
      boxShadow: {
        'card': '0 10px 25px rgba(42,71,111,0.12)',
        'card-hover': '0 20px 40px rgba(42,71,111,0.18), 0 0 0 1px rgba(42,71,111,0.1)',
        'card-cta': '0 12px 28px rgba(244,124,60,0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite reverse',
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
        'marquee': 'marquee 40s linear infinite',
        'card-glow': 'cardGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
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
        cardGlow: {
          '0%, 100%': { boxShadow: '0 10px 25px rgba(42,71,111,0.1)' },
          '50%': { boxShadow: '0 16px 32px rgba(42,71,111,0.16)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
