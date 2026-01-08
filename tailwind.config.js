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
        // Gaming-inspired neon color palette
        primary: {
          DEFAULT: '#00f0ff',
          50: '#e0ffff',
          100: '#b3ffff',
          200: '#80ffff',
          300: '#4dffff',
          400: '#1affff',
          500: '#00f0ff',
          600: '#00d4e6',
          700: '#00a8b8',
          800: '#007c8a',
          900: '#005c66',
        },
        accent: {
          DEFAULT: '#ff00ff',
          50: '#ffe0ff',
          100: '#ffb3ff',
          200: '#ff80ff',
          300: '#ff4dff',
          400: '#ff1aff',
          500: '#ff00ff',
          600: '#e600e6',
          700: '#b800b8',
          800: '#8a008a',
          900: '#660066',
        },
        neon: {
          green: '#00ff88',
          pink: '#ff0080',
          purple: '#b600ff',
          yellow: '#ffff00',
          orange: '#ff6600',
        },
        game: {
          dark: '#0a0e27',
          darker: '#050814',
          card: '#151b3d',
          border: '#1e2a5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        game: ['Orbitron', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 20px currentColor',
          },
          '50%': {
            boxShadow: '0 0 10px currentColor, 0 0 40px currentColor',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.5)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 20px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
        'game': '0 4px 20px rgba(0, 240, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
