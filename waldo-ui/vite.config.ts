import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The preview app renders the REAL components out of src/, so what it shows is
// what a consuming app gets — not a re-implementation that can drift.
export default defineConfig({
  root: resolve(__dirname, "preview"),
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  server: { port: 4400, open: true },
});
