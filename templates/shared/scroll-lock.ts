// Bloquea el desplazamiento de la página mientras una capa fija la cubre
// (portada "Abrir invitación", visor de fotos).
// - overflow: hidden en <body> (el navegador lo aplica a la ventana).
// - En escritorio, `html { scrollbar-gutter: stable }` (globals.css) deja
//   reservado el hueco de la barra vertical aunque la barra desaparezca, así
//   el contenido no salta de lado al abrir o cerrar la capa. Ese hueco queda
//   vacío mientras dure el bloqueo: se pinta con el fondo de la capa para
//   que no se vea una franja del color de la página junto a ella.

function layerBackground(layer: HTMLElement): { color: string; image: string } | null {
  for (const el of [layer, ...layer.querySelectorAll<HTMLElement>(":scope > *, :scope > * > *")]) {
    const cs = getComputedStyle(el);
    if (cs.backgroundImage !== "none" || cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
      return { color: cs.backgroundColor, image: cs.backgroundImage };
    }
  }
  return null;
}

export function lockPageScroll(layer: HTMLElement | null): () => void {
  const html = document.documentElement;
  const body = document.body;
  const previous = { overflow: body.style.overflow, color: html.style.backgroundColor, image: html.style.backgroundImage };
  body.style.overflow = "hidden";
  const bg = layer ? layerBackground(layer) : null;
  if (bg) {
    html.style.backgroundColor = bg.color;
    html.style.backgroundImage = bg.image;
  }
  return () => {
    body.style.overflow = previous.overflow;
    html.style.backgroundColor = previous.color;
    html.style.backgroundImage = previous.image;
  };
}
