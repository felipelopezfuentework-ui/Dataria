import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens (source of truth from Manual de Marca)
        'azul-nucleo':    '#1B5BC1',
        'azul-accion':    '#306ECF',
        'celeste-dataria':'#45B5F3',
        'celeste-luz':    '#56BCFA',
        'tinte-interfaz': '#EAF5FD',
        'fondo-suave':    '#F3F6F5',
        'carbon':         '#353C42',
        'texto-sec':      '#5A6871',
        'borde':          '#DCE5E9',
        // Semantic aliases (used in components)
        primary:                    '#1B5BC1',
        'on-surface':               '#151c22',
        'on-surface-variant':       '#424753',
        'surface-container':        '#e8eff6',
        'surface-container-low':    '#eef4fc',
        'surface-container-high':   '#e2e9f1',
        'surface-container-lowest': '#ffffff',
        'outline-variant':          '#c3c6d5',
        outline:                    '#737784',
        secondary:                  '#00658f',
        'secondary-container':      '#53c0ff',
        error:                      '#ba1a1a',
        'error-container':          '#ffdad6',
      },
      backgroundImage: {
        'gradient-dataria': 'linear-gradient(135deg, #1B5BC1 0%, #3572D0 35%, #45B5F3 68%, #56BCFA 100%)',
        'gradient-hero':    'linear-gradient(180deg, #F3F6F5 0%, #EAF5FD 100%)',
      },
      fontFamily: {
        sans: ['var(--font-text)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        card: '24px',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        soft:    '0 8px 32px rgba(53, 60, 66, 0.08)',
        primary: '0 4px 16px rgba(27, 91, 193, 0.20)',
        card:    '0 2px 8px rgba(53, 60, 66, 0.06)',
      },
      animation: {
        'scroll':   'scroll 30s linear infinite',
        'fade-in':  'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 240ms ease-out',
      },
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '160': '160ms',
        '240': '240ms',
        '280': '280ms',
      },
    },
  },
  plugins: [],
}

export default config
