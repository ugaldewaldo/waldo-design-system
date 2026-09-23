import { resolve } from "node:path";

import tailwind from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/* `adveron-src` is a symlink to the app that ships the components:
   waldo-agentic/packages/adveron-web/src. Nothing is copied in — if Adveron
   changes a component, this page changes with it.

   preserveSymlinks keeps those files at their symlinked path, so their bare
   imports (react, @radix-ui/*, lucide) resolve against THIS project's
   node_modules instead of the monorepo's. Without it every import fails. */
export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: {
    alias: { "@": resolve(__dirname, "adveron-src") },
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"],
  },
  server: { port: 4500 },
});
