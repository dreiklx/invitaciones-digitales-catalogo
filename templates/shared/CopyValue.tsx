"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

// Número o cuenta con botón "Copiar". Si el navegador no permite copiar
// (navegadores dentro de apps, permisos), intenta el método antiguo y, si
// tampoco funciona, selecciona el número y explica cómo copiarlo a mano:
// nunca falla en silencio.
export default function CopyValue({
  value,
  copyLabel = "Copiar número",
  copiedLabel = "Número copiado",
  valueClassName,
  buttonClassName,
  noteClassName = "",
  align = "center",
}: {
  value: string;
  copyLabel?: string;
  copiedLabel?: string;
  valueClassName: string;
  buttonClassName: string;
  noteClassName?: string;
  align?: "center" | "start";
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const valueRef = useRef<HTMLSpanElement>(null);
  const plain = value.replace(/\s/g, "");

  const legacyCopy = () => {
    const area = document.createElement("textarea");
    area.value = plain;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  };

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(plain);
      ok = true;
    } catch {
      ok = legacyCopy();
    }
    if (ok) {
      setState("copied");
      setTimeout(() => setState("idle"), 2500);
      return;
    }
    setState("failed");
    const node = valueRef.current;
    if (node) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center" : "items-start"}`}>
      <span ref={valueRef} className={`select-all ${valueClassName}`}>
        {value}
      </span>
      <button type="button" onClick={copy} className={`inline-flex min-h-12 items-center gap-2 transition active:scale-[0.98] ${buttonClassName}`}>
        {state === "copied" ? <CheckIcon /> : <CopyIcon />}
        {state === "copied" ? copiedLabel : copyLabel}
      </button>
      <p aria-live="polite" className={`text-sm ${noteClassName}`}>
        {state === "failed" ? "No se pudo copiar automáticamente. Mantén presionado el número para copiarlo." : ""}
      </p>
    </div>
  );
}
