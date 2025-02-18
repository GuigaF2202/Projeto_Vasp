/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLIGHT_API_URL: string;
  readonly VITE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
