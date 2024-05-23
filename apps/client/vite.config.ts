import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { z } from "zod";
import { schemas } from "@internal/shared";

// The client assumes these environment variables WILL be present during build
// If not the build must fail
z.object({ UNSAFE_BACKEND_URL: schemas.env.UNSAFE_BACKEND_URL }).parse(process.env);

export default defineConfig({
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  envPrefix: "UNSAFE",
  plugins: [TanStackRouterVite({ generatedRouteTree: "src/generated-routes.tsx" })]
});
