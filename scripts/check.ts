// npm run check — revisa la configuración antes de desplegar. También corre
// automáticamente antes de `npm run build` (y por lo tanto en Vercel): si
// hay errores, el despliegue no se hace.
//
// - Invitación de cliente (config/invitation.ts con datos): todo lo de
//   lib/invitation/validate.ts + datos copiados de la demo.
// - Catálogo (config/invitation.ts = null): revisa todas las demos.

import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { invitation } from "../config/invitation";
import { demos } from "../templates/demos";
import { templateIds, templateMetas } from "../templates/registry";
import { validateInvitation, type Issue } from "../lib/invitation/validate";
import type { Invitation } from "../lib/invitation/types";

const publicDir = path.join(process.cwd(), "public");
const fileExists = (p: string) => existsSync(path.join(publicDir, decodeURIComponent(p)));

async function imageSizes(inv: Invitation): Promise<Map<string, { width: number; height: number }>> {
  const sizes = new Map<string, { width: number; height: number }>();
  for (const photo of Object.values(inv.photos as Record<string, { src: string }>)) {
    if (!photo?.src || !fileExists(photo.src)) continue;
    try {
      const meta = await sharp(path.join(publicDir, photo.src)).metadata();
      // Orientación EXIF 5-8 = la foto se muestra girada 90°.
      const rotated = (meta.orientation ?? 1) >= 5;
      if (meta.width && meta.height) sizes.set(photo.src, rotated ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height });
    } catch {
      // Si no se puede leer, el chequeo de existencia ya informa lo necesario.
    }
  }
  return sizes;
}

function print(title: string, issues: Issue[]): number {
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "aviso");
  console.log(`\n${title}`);
  if (!issues.length) console.log("  ✓ Sin problemas");
  for (const e of errors) console.log(`  ✗ ${e.message}`);
  for (const w of warnings) console.log(`  ! ${w.message}`);
  return errors.length;
}

async function main() {
  let errors = 0;
  if (invitation) {
    const sizes = await imageSizes(invitation);
    const issues = validateInvitation(invitation, {
      kind: "cliente",
      demo: demos[invitation.template],
      fileExists,
      imageSize: (p) => sizes.get(p) ?? null,
    });
    errors += print(`Invitación — diseño ${templateMetas[invitation.template]?.name ?? invitation.template}`, issues);
  } else {
    console.log(`Modo catálogo (config/invitation.ts = null): se revisan las ${templateIds.length} demos.`);
    for (const id of templateIds) {
      const demo = demos[id];
      const sizes = await imageSizes(demo);
      const issues = validateInvitation(demo, { kind: "demo", fileExists, imageSize: (p) => sizes.get(p) ?? null });
      errors += print(`Demo ${templateMetas[id].number} · ${templateMetas[id].name}`, issues);
    }
  }

  if (errors) {
    console.log(`\n${errors} error(es). Corregir antes de desplegar.\n`);
    process.exit(1);
  }
  console.log("\nTodo en orden.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
