/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#6B7280",
        success: "#10B981",
        error: "#EF4444",
        background: "#F3E8FF",
        surface: "#FFFFFF",
        text: "#374151"
      }
    }
  },
  plugins: []
};
