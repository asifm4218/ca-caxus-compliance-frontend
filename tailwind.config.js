/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Project-specific color tokens (used by components and global classes)
      colors: {
        primary: '#1E3A8A',
        secondary: '#6B7280',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        background: '#F8FAFC',
        accent: '#E0E7FF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        // Use a single family for consistency across the app
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        // Custom typography tokens used in the app
        heading: ['1.5rem', { lineHeight: '2rem' }],       // 24px
        subheading: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        body: ['1rem', { lineHeight: '1.5rem' }],          // 16px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'soft': '0px 0px 10px rgba(0,0,0,0.04)',
        'medium': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'large': '0px 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}

