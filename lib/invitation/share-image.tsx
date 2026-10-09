// Tarjeta al compartir el enlace (WhatsApp, Facebook…) e ícono de la
// pestaña. Se generan en el build con los nombres, la fecha y la paleta de
// cada invitación: no se diseñan a mano por cliente.

import { ImageResponse } from "next/og";
import type { ResolvedInvitation } from "./resolve";

export const shareImageSize = { width: 1200, height: 630 };

// Descarga una tipografía de Google Fonts (TTF) para next/og. Sin internet
// en el build devuelve null y la imagen se genera con la tipografía por
// defecto en vez de fallar.
export async function loadGoogleFont(family: string, text?: string): Promise<ArrayBuffer | null> {
  try {
    const query = `family=${family.replace(/ /g, "+")}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
    const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((res) => res.text());
    const url = css.match(/src: url\((https:[^)]+)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

type Font = { name: string; data: ArrayBuffer; weight: 400; style: "normal" };

async function fonts(display: string, body: string, text: string): Promise<Font[]> {
  const [d, b] = await Promise.all([loadGoogleFont(display, text), loadGoogleFont(body, text)]);
  return [
    d && { name: "Display", data: d, weight: 400 as const, style: "normal" as const },
    b && { name: "Body", data: b, weight: 400 as const, style: "normal" as const },
  ].filter((f): f is Font => f !== null);
}

export async function invitationShareImage(inv: ResolvedInvitation): Promise<ImageResponse> {
  const { palette: c, names, dates } = inv;
  const eyebrow = inv.content.welcome.eyebrow;
  const text = `${eyebrow}${names.joined}${dates.display}`;
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
    { ...shareImageSize, fonts: await fonts(inv.meta.fonts.display, inv.meta.fonts.body, text) }
  );
}

// Monograma con las iniciales sobre el color principal.
export async function monogramIcon(
  initials: string,
  colors: { background: string; foreground: string },
  family: string,
  size: number
): Promise<ImageResponse> {
  const font = await loadGoogleFont(family, initials);
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
      fonts: font ? [{ name: "Display", data: font, weight: 400, style: "normal" }] : [],
    }
  );
}
