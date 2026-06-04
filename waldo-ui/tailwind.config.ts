import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    // Consuming apps should extend this pattern:
    // "./app/**/*.{ts,tsx}",
    // "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors ────────────────────────────────────────────────────
      colors: {
        // shadcn semantic (consumed via CSS vars)
        border:      "rgb(var(--border) / <alpha-value>)",
        input:       "rgb(var(--input) / <alpha-value>)",
        ring:        "rgb(var(--ring) / <alpha-value>)",
        background:  "rgb(var(--background) / <alpha-value>)",
        foreground:  "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT:    "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT:    "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },

        // Waldo semantic accent aliases
        warning: {
          DEFAULT:    "rgb(var(--accent-warning) / <alpha-value>)",
        },
        highlight: {
          DEFAULT:    "rgb(var(--accent-highlight) / <alpha-value>)",
        },

        // Waldo product green scale (mapped to CSS vars — NOT for components, use semantic tokens)
        // Only use these when no semantic token covers the need (e.g. input hover border)
        "waldo-green": {
          500: "rgb(var(--green-500) / <alpha-value>)",
          600: "rgb(var(--green-600) / <alpha-value>)",
          700: "rgb(var(--green-700) / <alpha-value>)",
          800: "rgb(var(--green-800) / <alpha-value>)",
        },

        // Waldo brand palette — marketing only, mapped to CSS vars
        brand: {
          green:  { 500: "rgb(var(--brand-green-500)  / <alpha-value>)", 700: "rgb(var(--brand-green-700)  / <alpha-value>)" },
          yellow: { 500: "rgb(var(--brand-yellow-500) / <alpha-value>)" },
          pink:   { 500: "rgb(var(--brand-pink-500)   / <alpha-value>)" },
          chrome: { 500: "rgb(var(--brand-chrome-500) / <alpha-value>)" },
          purple: { 500: "rgb(var(--brand-purple-500) / <alpha-value>)" },
        },

        // Zinc custom steps (Waldo-specific)
        // Waldo zinc — mapped to CSS vars in globals.css (source of truth)
        zinc: {
          50:  "rgb(var(--zinc-50)  / <alpha-value>)",
          100: "rgb(var(--zinc-100) / <alpha-value>)",
          200: "rgb(var(--zinc-200) / <alpha-value>)",
          300: "rgb(var(--zinc-300) / <alpha-value>)",
          400: "rgb(var(--zinc-400) / <alpha-value>)",
          500: "rgb(var(--zinc-500) / <alpha-value>)",
          600: "rgb(var(--zinc-600) / <alpha-value>)",
          700: "rgb(var(--zinc-700) / <alpha-value>)",
          750: "rgb(var(--zinc-750) / <alpha-value>)",
          800: "rgb(var(--zinc-800) / <alpha-value>)",
          850: "rgb(var(--zinc-850) / <alpha-value>)",
          900: "rgb(var(--zinc-900) / <alpha-value>)",
          950: "rgb(var(--zinc-950) / <alpha-value>)",
        },
      },

      // ── Border radius ──────────────────────────────────────────────
      // Tight radii — product/tool aesthetic (Linear-style)
      borderRadius: {
        none:   "0",
        sm:     "calc(var(--radius) - 2px)",   // 4px  → token radius.sm
        DEFAULT: "var(--radius)",              // 6px  → token radius.md
        md:     "var(--radius)",               // 6px  → token radius.md
        lg:     "calc(var(--radius) + 2px)",   // 8px  → token radius.lg
        xl:     "calc(var(--radius) + 6px)",   // 12px → token radius.xl
        "2xl":  "calc(var(--radius) + 10px)", // 16px → token radius.2xl
        "2-5xl":"calc(var(--radius) + 14px)", // 20px → token radius.2_5xl (dropdowns)
        "4xl":  "calc(var(--radius) + 26px)", // 32px → token radius.4xl (file input)
        full:   "9999px",                     //        token radius.full
      },

      // ── Shadows ────────────────────────────────────────────────────
      boxShadow: {
        popover: "var(--shadow-popover)",   // dropdowns, menus, select
        surface: "var(--shadow-surface)",   // cards, panels
        dialog:  "var(--shadow-dialog)",    // modals
      },

      // ── Typography ─────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: [
          "ui-monospace",
          "SF Mono",
          "JetBrains Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },

      fontSize: {
        // UI track (product surfaces) — standard scale, tracking -0.02em
        xs:   ["0.75rem",  { lineHeight: "1rem",    letterSpacing: "-0.02em" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.02em" }],
        base: ["1rem",     { lineHeight: "1.5rem",  letterSpacing: "-0.02em" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.02em" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem", letterSpacing: "-0.02em" }],
        "2xl":["1.5rem",   { lineHeight: "2rem",    letterSpacing: "-0.02em" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem",  letterSpacing: "-0.02em" }],

        // Display track (marketing heroes) — tracking -0.04em
        "display-xs": ["1.5rem",  { lineHeight: "2rem",   letterSpacing: "-0.04em" }],
        "display-sm": ["2rem",    { lineHeight: "2.5rem", letterSpacing: "-0.04em" }],
        "display-md": ["2.5rem",  { lineHeight: "3rem",   letterSpacing: "-0.04em" }],
        "display-lg": ["3.5rem",  { lineHeight: "4rem",   letterSpacing: "-0.04em" }],
        "display-xl": ["4.5rem",  { lineHeight: "5rem",   letterSpacing: "-0.04em" }],
        "display-2xl":["6rem",    { lineHeight: "6.25rem",letterSpacing: "-0.04em" }],
      },

      // ── Animations ─────────────────────────────────────────────────
      keyframes: {
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-4px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(4px)", opacity: "0" },
          to:   { transform: "translateY(0)",   opacity: "1" },
        },
      },
      animation: {
        "blink":            "blink 1s ease-in-out infinite",
        "shimmer":          "shimmer 2s linear infinite",
        "accordion-down":   "accordion-down 0.2s ease-out",
        "accordion-up":     "accordion-up 0.2s ease-out",
        "fade-in":          "fade-in 0.15s ease-out",
        "slide-in-top":     "slide-in-from-top 0.15s ease-out",
        "slide-in-bottom":  "slide-in-from-bottom 0.15s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
