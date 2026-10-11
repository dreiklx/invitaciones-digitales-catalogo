// Genera imágenes de demostración abstractas en
// public/plantillas/<diseño>/<espacio>.jpg: escenas de luz desenfocadas
// (cielo, horizonte, sol y bokeh) con el ambiente de cada diseño, la
// proporción exacta de cada espacio y una etiqueta discreta
// ("Foto · Portada · 4:5"). No son fotos reales ni de ningún cliente.
// Hoy todas las demos usan fotos reales en public/plantillas/<diseño>/fotos/
// (ver photo-map.md), que este script nunca toca: sirve para un diseño
// nuevo mientras no tenga sus fotos.
//
// Uso: npm run placeholders   (sobrescribe esos archivos)

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { templateIds } from "../templates/registry";
import { templateMetas } from "../templates/registry";
import { demos } from "../templates/demos";
import type { PhotoSlotSpec, TemplateId } from "../lib/invitation/types";

// Ambiente de cada diseño: cielo → horizonte → suelo, sol y destellos.
const MOODS: Record<TemplateId, { sky: string; horizon: string; ground: string; deep: string; sun: string; bokeh: string }> = {
  olivo: { sky: "#e6dcc2", horizon: "#cdb98b", ground: "#5d6640", deep: "#2c3320", sun: "#fbeec6", bokeh: "#fff6dc" },
  tierra: { sky: "#e9cfb3", horizon: "#c48f62", ground: "#6b442c", deep: "#2e1d13", sun: "#ffd9ab", bokeh: "#fbe7cf" },
  gala: { sky: "#25252a", horizon: "#3a3833", ground: "#141416", deep: "#050506", sun: "#8a7444", bokeh: "#e3c98d" },
  aurora: { sky: "#e7dcf6", horizon: "#f3c6cf", ground: "#8a6cc0", deep: "#382858", sun: "#fff3f0", bokeh: "#ffffff" },
  camelia: { sky: "#f3dcd5", horizon: "#dca7a2", ground: "#7a2a3c", deep: "#3a0f1a", sun: "#fff0ea", bokeh: "#ffe9e4" },
  arrullo: { sky: "#e9ecdf", horizon: "#f3e6cf", ground: "#a7b39a", deep: "#5d6656", sun: "#fff6e3", bokeh: "#ffffff" },
  nube: { sky: "#d8e8f4", horizon: "#fbe7c6", ground: "#e8c7a6", deep: "#9a8270", sun: "#fff7df", bokeh: "#ffffff" },
};

// Generador pseudoaleatorio con semilla (mismas imágenes en cada corrida).
function seeded(text: string) {
  let s = [...text].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const LABELS: Record<string, string> = {
  portada: "Portada",
  historia: "Historia",
  cuentaRegresiva: "Cuenta regresiva",
  regalos: "Regalos",
  retrato: "Retrato",
  cierre: "Cierre",
  galeria1: "Galería 1",
  galeria2: "Galería 2",
  galeria3: "Galería 3",
  galeria4: "Galería 4",
};

function art(id: TemplateId, slot: string, spec: PhotoSlotSpec): { svg: string; width: number; height: number } {
  const m = MOODS[id];
  const [rw, rh] = spec.ratio;
  const long = 1600;
  const width = rw >= rh ? long : Math.round((long * rw) / rh);
  const height = rw >= rh ? Math.round((long * rh) / rw) : long;
  const short = Math.min(width, height);
  const rand = seeded(`${id}-${slot}`);

  const horizonY = 0.52 + rand() * 0.16;
  const sunX = 0.25 + rand() * 0.5;
  const sunY = horizonY - 0.08 - rand() * 0.12;
  const sunR = short * (0.16 + rand() * 0.1);

  const bokeh = Array.from({ length: 14 }, () => {
    const cx = rand() * width;
    const cy = (0.15 + rand() * 0.75) * height;
    const r = short * (0.015 + rand() * 0.045);
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${m.bokeh}" opacity="${(0.12 + rand() * 0.3).toFixed(2)}"/>`;
  }).join("");

  const label = `FOTO · ${(LABELS[slot] ?? slot).toUpperCase()} · ${rw}:${rh}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="scene" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${m.sky}"/>
      <stop offset="${(horizonY - 0.04).toFixed(2)}" stop-color="${m.horizon}"/>
      <stop offset="${(horizonY + 0.03).toFixed(2)}" stop-color="${m.ground}"/>
      <stop offset="1" stop-color="${m.deep}"/>
    </linearGradient>
    <radialGradient id="sun" cx="${sunX.toFixed(2)}" cy="${sunY.toFixed(2)}" r="${((sunR * 3.2) / short).toFixed(2)}" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="${m.sun}" stop-opacity="0.95"/>
      <stop offset="0.25" stop-color="${m.sun}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${m.sun}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(short * 0.035).toFixed(0)}"/></filter>
    <filter id="bokehBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${(short * 0.006).toFixed(1)}"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.8">
      <stop offset="0.5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.4"/>
    </radialGradient>
  </defs>
  <g filter="url(#blur)">
    <rect x="-5%" y="-5%" width="110%" height="110%" fill="url(#scene)"/>
  </g>
  <rect width="100%" height="100%" fill="url(#sun)"/>
  <g filter="url(#bokehBlur)">${bokeh}</g>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.08"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  <text x="${(width / 2).toFixed(0)}" y="${(height - short * 0.1).toFixed(0)}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${(short * 0.024).toFixed(0)}" letter-spacing="${(short * 0.006).toFixed(1)}" fill="#ffffff" fill-opacity="0.55">${label}</text>
</svg>`;
  return { svg, width, height };
}

async function main() {
  for (const id of templateIds) {
    const slots = templateMetas[id].photoSlots as Record<string, PhotoSlotSpec>;
    const photos = demos[id].photos as Record<string, { src: string }>;
    for (const [slot, spec] of Object.entries(slots)) {
      // Fotos reales de una demo (p. ej. Olivo): nunca se reemplazan.
      if (photos[slot].src.includes("/fotos/")) continue;
      const out = path.join(process.cwd(), "public", photos[slot].src);
      await mkdir(path.dirname(out), { recursive: true });
      const { svg, width, height } = art(id, slot, spec);
      await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
      console.log(`public${photos[slot].src} (${width}×${height})`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
