import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"], // Build for commonJS and ESmodules + browser-compatible build
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  globalName: "InAppSpy", // Global variable for the UMD build
});
