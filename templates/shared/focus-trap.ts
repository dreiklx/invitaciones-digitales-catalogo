// Mantiene el foco del teclado dentro de una capa modal (panel de
// secciones, "Otros diseños", visor de fotos): Tab y Shift+Tab dan la vuelta
// dentro de ella en vez de seguir por la página que está detrás (hasta el
// 2026-10-12 el foco salía a los botones de la invitación, tapados por la
// capa). Escape y "Cerrar" siguen cerrándola como siempre.

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function trapFocus(layer: HTMLElement | null): () => void {
  if (!layer) return () => {};
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const items = Array.from(layer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (!layer.contains(active)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}
