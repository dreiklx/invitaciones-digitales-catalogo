// Corta la red de Node (salvo localhost) para comprobar que el build no
// depende de servicios externos, en particular de Google Fonts. Lo carga
// `npm run build:offline` con NODE_OPTIONS=--require, así que también
// aplica a los procesos que lanza `next build`. Cada intento bloqueado se
// anota en stderr y falla como fallaría sin conexión. Turbopack descarga
// con su propio cliente (no Node): build-offline.mjs lo corta además con
// un proxy inexistente.

/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS: se carga con NODE_OPTIONS=--require. */
const net = require("node:net");
const tls = require("node:tls");
const dns = require("node:dns");

const LOCAL = /^(|localhost|127\.\d+\.\d+\.\d+|::1|\[::1\]|0\.0\.0\.0)$/i; // "" = sin host (local)

function hostOf(args) {
  const [a, b] = args;
  if (a && typeof a === "object") return a.path ? null : a.host ?? a.hostname ?? "localhost";
  if (typeof a === "string" && !/^\d+$/.test(a)) return null; // socket o tubería local
  return typeof b === "string" ? b : "localhost";
}

function refuse(host) {
  const err = new Error(`[sin red] conexión bloqueada a ${host} (build:offline)`);
  err.code = "ENETUNREACH";
  process.stderr.write(`${err.message}\n`);
  return err;
}

for (const [mod, name] of [
  [net, "connect"],
  [net, "createConnection"],
  [tls, "connect"],
]) {
  const original = mod[name];
  mod[name] = function (...args) {
    const host = hostOf(args);
    if (host && !LOCAL.test(host)) {
      // Como sin conexión: el error llega por el evento "error" del socket.
      const socket = new net.Socket();
      const err = refuse(host);
      process.nextTick(() => socket.destroy(err));
      return socket;
    }
    return original.apply(this, args);
  };
}

const lookup = dns.lookup;
dns.lookup = function (host, ...rest) {
  if (typeof host === "string" && !LOCAL.test(host)) {
    const cb = rest[rest.length - 1];
    const err = refuse(host);
    if (typeof cb === "function") return process.nextTick(() => cb(err));
    throw err;
  }
  return lookup.call(this, host, ...rest);
};

// fetch() de Node usa sus propios sockets: se corta aparte.
if (typeof globalThis.fetch === "function") {
  const original = globalThis.fetch;
  globalThis.fetch = function (input, init) {
    const url = new URL(typeof input === "string" ? input : input.url ?? String(input));
    if (!LOCAL.test(url.hostname)) return Promise.reject(refuse(url.hostname));
    return original.call(this, input, init);
  };
}
