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

        // Waldo brand palette — marketing use only
        brand: {
          green:  { 700: "#1b8c8c", 600: "#2db4b4", 500: "#63dbdb", 300: "#8cfaf5", 100: "#dafffd" },
          yellow: { 700: "#de8d13", 600: "#e3ac38", 500: "#fac034", 300: "#f7d372", 100: "#ffedc0" },
          pink:   { 700: "#9a164e", 600: "#c10b59", 500: "#d40a60", 300: "#f8589e", 100: "#fdc9df" },
          chrome: { 700: "#7a9fa0", 600: "#a7d3d3", 500: "#bdd8d8", 300: "#d5e9e9", 100: "#ecfbfb" },
          purple: { 700: "#4d12a5", 600: "#6616de", 500: "#813aef", 300: "#ba91f7", 100: "#f0e7fe" },
        },

        // Zinc custom steps (Waldo-specific)
        zinc: {
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#323539",
          750: "#2d2f33",
          800: "#242528",
          850: "#242528",
          900: "#18181b",
          950: "#09090b",
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
