/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    // ... Specify options here.
    setupFiles: ["src/test/setup.ts"],
  },
});
