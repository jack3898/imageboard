/// <reference types="vite/client" />

// Add the env to schema validation in env-client.ts
interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}
