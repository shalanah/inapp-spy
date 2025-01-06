import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules + browser-compatible build
    dts: true,
    sourcemap: true,
    splitting: false,
    clean: true,
    outDir: "dist",
  },
  {
    entry: ["src/index.ts"],
    format: ["iife"], // Build for commonJS and ESmodules + browser-compatible build
    dts: true,
    outDir: "dist",
    sourcemap: true,
    splitting: false,
    clean: true,
    minify: true,
  },
]);
