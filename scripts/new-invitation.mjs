// npm run nueva -- <diseño>
// Empieza una invitación nueva: copia la demo del diseño elegido a
// config/invitation.ts para editarla. Después `npm run check` señala los
// datos que siguen siendo los de la demo.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ids = ["olivo", "tierra", "gala", "aurora", "camelia", "riviera", "nube"];
const id = process.argv[2];

if (!ids.includes(id)) {
  console.error(`Uso: npm run nueva -- <diseño>\nDiseños: ${ids.join(", ")}`);
  process.exit(1);
}

const root = process.cwd();
const target = path.join(root, "config", "invitation.ts");
const current = await readFile(target, "utf8");
if (!/export const invitation: Invitation \| null = null;/.test(current) && !process.argv.includes("--forzar")) {
  console.error("config/invitation.ts ya tiene una invitación. Para reemplazarla: npm run nueva -- " + id + " --forzar");
  process.exit(1);
}

let source = await readFile(path.join(root, "templates", id, "demo.ts"), "utf8");

source = source
  // Encabezado
  .replace(
    /^\/\/ Demo del diseño[\s\S]*?\n\n/,
    `// INVITACIÓN DEL CLIENTE — diseño "${id}". Guía: docs/templates/ y README.md.\n` +
      "// Reemplazar todo lo que es de la demo (nombres, fecha, lugares, número de\n" +
      "// WhatsApp, padres, fotos en public/images/…). `npm run check` señala lo pendiente.\n" +
      "// Para volver al catálogo: `export const invitation: Invitation | null = null;`\n\n"
  )
  // La URL de la demo depende del catálogo; la del cliente es propia.
  .replace(/import \{ catalog \} from "@\/config\/catalog";\n/, "")
  .replace(/url: `\$\{catalog\.url\}\/plantillas\/[a-z]+`,/, 'url: "https://REEMPLAZAR.vercel.app",')
  .replace(/import type \{ InvitationOf \} from "@\/lib\/invitation\/types";/, 'import type { Invitation } from "@/lib/invitation/types";')
  .replace(/export const demo: InvitationOf<"[a-z]+"> =/, "export const invitation: Invitation | null =")
  // Nombres (pareja, festejado o futuros padres): nunca se heredan de la
  // demo. `npm run check` exige reemplazarlos.
  .replace(/couple: \{ partnerOne: "[^"]*", partnerTwo: "[^"]*" \}/, 'couple: { partnerOne: "REEMPLAZAR", partnerTwo: "REEMPLAZAR" }')
  .replace(/honoree: \{ name: "[^"]*"/, 'honoree: { name: "REEMPLAZAR"')
  // Baby shower: sin el nombre del bebé (opcional: solo si la familia quiere mostrarlo).
  .replace(/shower: \{ parents: \[[^\]]*\](, babyName: "[^"]*")? \}/, 'shower: { parents: ["REEMPLAZAR", "REEMPLAZAR"] }')
  // Fotos: una por espacio en public/images/ del cliente (galeria1 →
  // galeria-1.jpg), con su texto alternativo por escribir.
  .replace(
    /^(\s+)(\w+): \{ src: "\/plantillas\/[a-z]+\/[^"]+", alt: "[^"]*",/gm,
    (_, indent, slot) =>
      `${indent}${slot}: { src: "/images/${slot.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase()}.jpg", alt: "REEMPLAZAR: quién aparece y qué hacen",`
  )
  .replaceAll(`/plantillas/${id}/`, "/images/");

await writeFile(target, source);
console.log(`config/invitation.ts creado a partir del diseño "${id}".`);
console.log("Siguiente: editar los datos, poner las fotos en public/images/ (nombres en el archivo) y correr `npm run check`.");
