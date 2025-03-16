import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true,
    sourcemap: true,
    splitting: false,
    clean: true,
    outDir: "dist",
    define: {
      __GLOBAL__: "false", // No global attachment in module builds
    },
  },
  {
    entry: ["src/index.ts"],
    format: ["iife"], // Build for CDN browser-compatible
    dts: true,
    outDir: "dist",
    sourcemap: true,
    splitting: false,
    clean: true,
    minify: true,
    define: {
      __GLOBAL__: "true", // Enable global attachment in the UMD build
    },
  },
]);
