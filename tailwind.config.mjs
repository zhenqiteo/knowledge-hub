/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1360px", // Customize for 2xl screens
      },
      container: {
        center: true, // Center the container by default
        padding: "1.25rem", // Default horizontal padding
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1360px", // Customize for 2xl screens
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#F58634",
        mainD: "#F05A28",
        sec: "#0098DB",
        secD: "#006CB5",
        light: "#fff",
        dark: "#111",
        gray: "#797979",
        grayL: "#e4e4e4",
        grayD: "#555",
      },
      fontFamily:{
        poppins:"var(--font-poppins)"
      }
    },
  },
  plugins: [],
};
