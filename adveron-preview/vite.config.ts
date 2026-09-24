import { resolve } from "node:path";

import tailwind from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/* Two sources, one gallery.

   - `adveron-src` (`npm run dev`, port 4500) is a symlink to the app that ships
     the components: waldo-agentic/packages/adveron-web/src. Nothing is copied
     in — if Adveron changes a component, this page changes with it.
   - `adveron-baseline` (`npm run baseline`, port 4510) is a symlink to
     ../adveron-ds/baseline/src: the frozen snapshot of what Adveron shipped at
     the commit pinned in adveron-ds/UPSTREAM. Version zero, for comparison.

   preserveSymlinks keeps those files at their symlinked path, so their bare
   imports (react, @radix-ui/*, lucide) resolve against THIS project's
   node_modules instead of the monorepo's. Without it every import fails. */
const SRC = process.env.ADVERON_SRC === "baseline" ? "adveron-baseline" : "adveron-src";

/* styles.css names `adveron-src` in its @import and @source lines, which
   Tailwind reads before any alias applies. Point them at the chosen source. */
function pickSource(): Plugin {
  return {
    name: "adveron-pick-source",
    enforce: "pre",
    transform(code, id) {
      if (SRC === "adveron-src" || !id.endsWith("/src/styles.css")) return null;
      return code.replaceAll("adveron-src", SRC);
    },
  };
}

export default defineConfig({
  plugins: [pickSource(), react(), tailwind()],
  resolve: {
    alias: { "@": resolve(__dirname, SRC) },
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"],
  },
  define: { __ADVERON_SOURCE__: JSON.stringify(SRC === "adveron-src" ? "live" : "baseline") },
  server: { port: SRC === "adveron-src" ? 4500 : 4510, strictPort: true },
});
