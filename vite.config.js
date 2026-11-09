import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// GitHub Pages without a custom domain serves the site from /<repo>/; set BASE_PATH for that.
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules") || process.env.SSR_BUILD) return;
          if (/gsap|lenis/.test(id)) return "motion";
          if (/react|scheduler/.test(id)) return "react";
        },
      },
    },
  },
  ssr: { noExternal: ["@gsap/react"] },
});
