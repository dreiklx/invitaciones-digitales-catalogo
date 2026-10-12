// npm run build:offline — el mismo `npm run build` (con `check` antes),
// pero sin red: Node cortado (scripts/block-network.cjs) y Turbopack sin
// salida (proxy inexistente). Si algo del
// build necesitara internet (p. ej. bajar tipografías de Google Fonts),
// falla aquí. `npm run verify` compila así.

import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --require ./scripts/block-network.cjs`.trim(),
    // Turbopack (Rust) no usa la red de Node: un proxy que no existe corta
    // sus descargas (así falla `next/font/google` sin conexión).
    HTTPS_PROXY: "http://127.0.0.1:9",
    HTTP_PROXY: "http://127.0.0.1:9",
    ALL_PROXY: "http://127.0.0.1:9",
    NO_PROXY: "localhost,127.0.0.1",
    NEXT_TELEMETRY_DISABLED: "1",
  },
});
process.exit(result.status ?? 1);
