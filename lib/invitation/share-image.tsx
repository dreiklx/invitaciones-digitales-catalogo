// Tarjeta al compartir el enlace (WhatsApp, Facebook…) e ícono de la
// pestaña. Se generan en el build con los nombres, la fecha y la paleta de
// cada invitación: no se diseñan a mano por cliente.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { ResolvedInvitation } from "./resolve";

export const shareImageSize = { width: 1200, height: 630 };

// Tipografía para next/og desde los archivos del proyecto (fonts/<familia>/,
// licencia OFL): el build no consulta Google Fonts. next/og no lee woff2, por
// eso cada familia trae además su 400 en woff. Si falta el archivo, el build
// falla con un mensaje claro (antes, sin internet, la imagen salía con otra
// letra sin avisar).
export async function loadFont(family: string, style: "normal" | "italic" = "normal"): Promise<ArrayBuffer> {
  const slug = family.toLowerCase().replace(/ /g, "-");
  const file = path.join(process.cwd(), "fonts", slug, `${slug}-latin-400-${style}.woff`);
  try {
    const data = await readFile(file);
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  } catch {
    throw new Error(`Falta la tipografía "${family}" para las imágenes al compartir: ${path.relative(process.cwd(), file)} (ver PROJECT-CONTEXT, "Tipografías").`);
  }
}

type Font = { name: string; data: ArrayBuffer; weight: 400; style: "normal" | "italic" };

async function fonts(display: string, body: string): Promise<Font[]> {
  const [d, b] = await Promise.all([loadFont(display), loadFont(body)]);
  return [
    { name: "Display", data: d, weight: 400, style: "normal" },
    { name: "Body", data: b, weight: 400, style: "normal" },
  ];
}

export async function invitationShareImage(inv: ResolvedInvitation): Promise<ImageResponse> {
  const { palette: c, names, dates } = inv;
  const eyebrow = inv.content.welcome.eyebrow;
  const namesSize = Math.min(96, Math.floor(1500 / names.joined.length));
  const line = { width: 70, height: 2, background: c.secondary, opacity: 0.8 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: c.surface,
        }}
      >
        <div
          style={{
            width: 900,
            height: 470,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: c.background,
            border: `2px solid ${c.secondary}`,
          }}
        >
          <div style={{ fontFamily: "Body", fontSize: 22, letterSpacing: 10, textTransform: "uppercase", color: c.accent }}>
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 26,
              display: "flex",
              alignItems: "center",
              fontFamily: "Display",
              fontSize: namesSize,
              color: c.text,
            }}
          >
            {names.one}
            {names.two ? <span style={{ margin: "0 26px", fontSize: namesSize * 0.62, color: c.secondary }}>&amp;</span> : null}
            {names.two}
          </div>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 22 }}>
            <div style={line} />
            <div style={{ fontFamily: "Body", fontSize: 26, letterSpacing: 8, color: c.textMuted }}>{dates.display}</div>
            <div style={line} />
          </div>
        </div>
      </div>
    ),
    { ...shareImageSize, fonts: await fonts(inv.meta.fonts.display, inv.meta.fonts.body) }
  );
}

// Monograma con las iniciales sobre el color principal.
export async function monogramIcon(
  initials: string,
  colors: { background: string; foreground: string },
  family: string,
  size: number
): Promise<ImageResponse> {
  const font = await loadFont(family);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.background,
          color: colors.foreground,
          fontFamily: "Display",
          fontSize: size * (initials.length > 2 ? 0.36 : 0.5),
          borderRadius: size * 0.22,
          letterSpacing: size * 0.01,
        }}
      >
        {initials}
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Display", data: font, weight: 400, style: "normal" }],
    }
  );
}
