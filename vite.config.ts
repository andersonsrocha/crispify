import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts()],
  resolve: {
    mainFields: ["module"],
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "@tecno/notion",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
