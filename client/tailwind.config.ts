import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
     container: {
        center: true,      // always centered
        padding: "1rem",   // horizontal padding
        screens: {
          sm: "640px",     // small screens
          md: "768px",     // medium screens
          lg: "1024px",    // large screens
          xl: "1324px",    // extra-large screens match your Figma design
          "2xl": "1536px", // optional for very wide screens
        },
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",

        primary: {
          DEFAULT: '#02b290',
          50: '#e6f9f4',
          100: '#ccf3e9',
          200: '#99e7d3',
          300: '#66dbbd',
          400: '#33cfa7',
          500: '#02b290',
          600: '#029a7d',
          700: '#01826a',
          800: '#016a57',
          900: '#015244',
          foreground: "oklch(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },

        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config