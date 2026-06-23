export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DAT One-inspired professional palette
        ink:      '#111827',       // gray-900  — primary text
        road:     '#374151',       // gray-700  — secondary text
        steel:    '#6b7280',       // gray-500  — muted/labels
        lane:     '#f3f4f6',       // gray-100  — page background
        signal:   '#1d55b0',       // professional blue — primary accent (DAT-style)
        amberline:'#d97706',       // amber-600 — warnings
        paper:    '#ffffff',

        // Sidebar-specific navy tokens
        navy:     '#0d1f3c',       // deep navy sidebar bg
        'navy-hover': '#162a50',   // sidebar item hover
        'navy-active': '#1d3a6b',  // sidebar active item bg
        'navy-border': '#1e3259',  // sidebar border/divider
      },
      fontFamily: {
        sans:   ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        outfit: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 4px rgb(0 0 0 / 0.07), 0 4px 16px rgb(0 0 0 / 0.04)',
        card:  '0 1px 3px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px rgb(0 0 0 / 0.10)',
      },
      animation: {
        'fade-in':  'fadeIn 0.25s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    }
  },
  plugins: []
};
