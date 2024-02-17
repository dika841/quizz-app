import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@libs": path.resolve(__dirname, "./src/libs"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  plugins: [react()],
});
