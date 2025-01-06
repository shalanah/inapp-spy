import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"], // Build for commonJS and ESmodules + browser-compatible build
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
});
