import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

// Helper function to flatten the color palette
function flattenColorPalette(colors: Record<string, any>) {
  return Object.assign(
    {},
    ...Object.entries(colors).flatMap(([color, values]) => {
      if (typeof values !== "object") {
        return { [color]: values };
      }

      return Object.entries(values).map(([key, value]) => {
        return { [`${color}-${key}`]: value };
      });
    }),
  );
}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        kanit: ["var(--font-kanit)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "25%": {
            transform: "translate(15px, 15px) rotate(8deg) scale(1.05)",
            filter: "brightness(1.1)",
          },
          "50%": {
            transform: "translate(0, 30px) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "75%": {
            transform: "translate(-15px, 15px) rotate(-8deg) scale(0.95)",
            filter: "brightness(0.9)",
          },
        },
        float2: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "25%": {
            transform: "translate(-15px, 20px) rotate(-5deg) scale(1.1)",
            filter: "brightness(1.1)",
          },
          "50%": {
            transform: "translate(0, 40px) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "75%": {
            transform: "translate(15px, 20px) rotate(5deg) scale(0.9)",
            filter: "brightness(0.9)",
          },
        },
        float3: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "25%": {
            transform: "translate(20px, 10px) rotate(10deg) scale(1.15)",
            filter: "brightness(1.1)",
          },
          "50%": {
            transform: "translate(0, 20px) rotate(0deg) scale(1)",
            filter: "brightness(1)",
          },
          "75%": {
            transform: "translate(-20px, 10px) rotate(-10deg) scale(0.85)",
            filter: "brightness(0.9)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 15s ease-in-out infinite",
        float2: "float2 18s ease-in-out infinite",
        float3: "float3 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

export default config;

function addVariablesForColors({ addBase, theme }: any) {
  const flattenedColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
