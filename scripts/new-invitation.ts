// npm run nueva -- <diseño> [--forzar] [--salida <archivo>]
// Empieza una invitación nueva en config/invitation.ts a partir de la demo
// del diseño, sin los datos de la demo (ver scripts/lib/new-invitation.ts).
// Después `npm run check` señala lo que falta completar.
// --salida escribe en otro archivo (lo usan las pruebas; no toca config/).

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { demos } from "../templates/demos";
import { templateIds } from "../templates/registry";
import type { TemplateId } from "../lib/invitation/types";
import { invitationSource, newInvitationFrom } from "./lib/new-invitation";

const args = process.argv.slice(2);
const id = args[0] as TemplateId;
const outIndex = args.indexOf("--salida");
const out = outIndex >= 0 ? args[outIndex + 1] : undefined;

if (!templateIds.includes(id) || (outIndex >= 0 && !out)) {
  console.error(`Uso: npm run nueva -- <diseño> [--forzar]\nDiseños: ${templateIds.join(", ")}`);
  process.exit(1);
}

async function main() {
  const target = out ? path.resolve(out) : path.join(process.cwd(), "config", "invitation.ts");
  if (!out) {
    const current = await readFile(target, "utf8");
    if (!/export const invitation: Invitation \| null = null;/.test(current) && !args.includes("--forzar")) {
      console.error(`config/invitation.ts ya tiene una invitación. Para reemplazarla: npm run nueva -- ${id} --forzar`);
      process.exit(1);
    }
  }

  await writeFile(target, invitationSource(newInvitationFrom(demos[id])));
  console.log(`${out ? path.relative(process.cwd(), target) : "config/invitation.ts"} creado a partir del diseño "${id}".`);
  console.log('Siguiente: completar todo lo que dice "REEMPLAZAR", poner las fotos en public/images/ (nombres en el archivo) y correr `npm run check`.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
