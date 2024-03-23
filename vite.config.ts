import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const MODE = {
  DEV: "development",
  PROD: "production",
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const generateScopedName =
    mode === MODE.DEV
      ? "[folder]--[local]-[hash:base64:5]"
      : "[local]-[hash:base64:5]";

  return {
    plugins: [react({ babel: { babelrc: true } })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      modules: {
        generateScopedName,
        localsConvention: "camelCase",
      },
    },
  };
});
