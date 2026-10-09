"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "up" | "fade" | "scale" | "blur" | "curtain";

// Aparición suave al entrar en pantalla. Cada diseño elige la variante que
// va con su estética (CSS en app/globals.css). Respeta prefers-reduced-motion.
// "curtain" recorta un hijo y no el elemento observado: Chrome no avisa la
// intersección de un elemento recortado por completo (la foto no aparecía).
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-variant={variant} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {variant === "curtain" ? <div className="reveal-curtain">{children}</div> : children}
    </div>
  );
}
