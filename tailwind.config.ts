import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#6C63FF",
        "accent-light": "#8B85FF",
        success: "#4ADE80",
        danger: "#F87171",
        warning: "#FBBF24",
        "dark-bg": "#0F0F1A",
        "dark-card": "#1A1A2E",
        "dark-card2": "#16213E",
        "dark-border": "#2A2A4A",
        "dark-text": "#E2E8F0",
        "dark-muted": "#94A3B8",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #6C63FF 0%, #a78bfa 100%)",
        "gradient-result-up": "linear-gradient(135deg, #6C63FF 0%, #4f46e5 50%, #2563eb 100%)",
        "gradient-result-down": "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
        "gradient-result-same": "linear-gradient(135deg, #475569 0%, #334155 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(99,102,241,0.04) 100%)",
      },
      boxShadow: {
        "accent-glow": "0 0 20px rgba(108, 99, 255, 0.3)",
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-light": "0 4px 24px rgba(0, 0, 0, 0.08)",
        "pill-selected": "0 2px 12px rgba(108, 99, 255, 0.5)",
      },
      animation: {
        "slide-up": "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 99, 255, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(108, 99, 255, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
