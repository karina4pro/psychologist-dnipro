// tailwind.config
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.js", "./src/**/*.css"],
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
