module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,css}",
    "./**/*.html",
    "./components/**/*.js" // Добавлен путь к JS-файлам в папке components
  ],
  safelist: [
    'animate-base',
    'animate-visible',
    'visible',
    'hero-section',
    'hero-item',
    'section-block',
    'fixed-header',
    '-translate-y-full'
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