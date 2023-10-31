/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
    },
    extend: {
      colors: {
        yellow: "#FAFF14",
        blue: "#8A74FF",
        // blue: "#1fb6ff",
        // pink: "#ff49db",
        // orange: "#ff7849",
        // green: "#13ce66",
        // "gray-dark": "#273444",
        // gray: "#8492a6",
        // "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
};
