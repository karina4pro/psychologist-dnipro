module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,css}",
    "./*.js"
  ],
  
  safelist: [
    'hero-section',
    'hero-item', 
    'section-block',
    'animate-base',
    'animate-visible',
    'visible',
    'fixed-header',
    '-translate-y-full',
    'carousel',
    'carousel-container',
    'review-item',
    'reviews-carousel',
    'modal-content',
    'call-button',
    'btn',
    'btn-primary',
    'btn-secondary',
    'heading-xl',
    'heading-lg'
  ],
  
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6",
          DEFAULT: "#2563EB", 
          dark: "#203351",
        },
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};