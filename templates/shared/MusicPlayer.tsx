"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, SpinnerIcon } from "./icons";

type Status = "loading" | "playing" | "paused" | "error";

// Si en este tiempo no llega confirmación real de reproducción, se asume que
// la fuente no está disponible (no todos los navegadores disparan "error").
const LOAD_TIMEOUT_MS = 4000;

export type MusicPlayerClasses = {
  // Botón (fondo, texto). < sm es solo el círculo del ícono.
  button: string;
  // Círculo del ícono.
  icon: string;
  // Texto secundario de la píldora (≥ sm).
  status: string;
};

// Máquina de estados simple, reescrita tras varios intentos fallidos en la
// boda original (ver PROJECT-CONTEXT.md, "Música"). NO reintroducir trucos
// de `muted`, ciclos pause()→play(), refs de supresión ni listeners de
// pointerdown/touchstart/mousedown:
// 1. Un solo intento de autoplay al montar.
// 2. Un único listener de primera interacción (click + keydown) que se
//    retira para siempre en cuanto se dispara.
// 3. Si esa interacción fue sobre el propio reproductor, no hace nada; si
//    no, y nunca sonó, reintenta play() una vez.
// 4. El botón solo hace play/pause.
// El estado visual refleja eventos nativos del <audio>, nunca un
// "Reproduciendo" optimista.
export default function MusicPlayer({
  song,
  classes,
}: {
  song: { title: string; src: string };
  classes: MusicPlayerClasses;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const everPlayedRef = useRef(false);
  const [status, setStatus] = useState<Status>("loading");
  // < lg se oculta mientras el formulario de confirmación está en pantalla
  // (quedaba encima de "Confirmar por WhatsApp"); la música sigue sonando.
  const [rsvpInView, setRsvpInView] = useState(false);

  useEffect(() => {
    const target = document.getElementById("confirmar");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setRsvpInView(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isError = status === "error";

  const clearLoadTimeout = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  };

  const setStatusSafe = (next: Status) => {
    if (next !== "loading") clearLoadTimeout();
    setStatus(next);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const attemptPlay = () => {
      setStatus("loading");
      clearLoadTimeout();
      loadTimeoutRef.current = setTimeout(() => {
        setStatus((prev) => (prev === "loading" ? "error" : prev));
      }, LOAD_TIMEOUT_MS);
      audio.play().catch(() => {
        // Bloqueado por la política de autoplay: queda listo para el visitante.
        clearLoadTimeout();
        setStatus("paused");
      });
    };

    attemptPlay();

    let unlocked = false;
    const events = ["click", "keydown"] as const;
    const unlockOnFirstInteraction = (event: Event) => {
      if (unlocked) return;
      unlocked = true;
      events.forEach((e) => window.removeEventListener(e, unlockOnFirstInteraction));
      const target = event.target as Node | null;
      if (containerRef.current && target && containerRef.current.contains(target)) return;
      if (!everPlayedRef.current) attemptPlay();
    };
    events.forEach((e) => window.addEventListener(e, unlockOnFirstInteraction));

    return () => {
      events.forEach((e) => window.removeEventListener(e, unlockOnFirstInteraction));
      clearLoadTimeout();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || isError) return;
    if (isPlaying) {
      audio.pause();
      return;
    }
    setStatus("loading");
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => setStatus("error"), LOAD_TIMEOUT_MS);
    audio.play().catch(() => setStatusSafe("error"));
  };

  const statusLabel = isError ? "No disponible por ahora" : isLoading ? "Cargando…" : isPlaying ? "Reproduciendo" : "Música";

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-24 right-4 z-40 transition-opacity duration-300 lg:bottom-8 lg:right-8 lg:pointer-events-auto lg:opacity-100 ${
        rsvpInView ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <audio
        ref={audioRef}
        src={song.src}
        loop
        preload="auto"
        onPlaying={() => {
          everPlayedRef.current = true;
          setStatusSafe("playing");
        }}
        onPause={() => setStatus((prev) => (prev === "error" ? prev : "paused"))}
        onWaiting={() => setStatus("loading")}
        onStalled={() => setStatusSafe("error")}
        onCanPlay={() => setStatus((prev) => (prev === "loading" ? "paused" : prev))}
        onEnded={(e) => {
          const el = e.currentTarget;
          el.currentTime = 0;
          el.play().catch(() => {});
        }}
        onError={() => setStatusSafe("error")}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={isError}
        aria-pressed={isPlaying}
        aria-label={isError ? `${song.title} no disponible por ahora` : isPlaying ? `Pausar ${song.title}` : `Reproducir ${song.title}`}
        title={song.title}
        // < sm solo el círculo: la píldora con el nombre tapaba contenido en 390px.
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 sm:h-auto sm:w-auto sm:justify-start sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-5 ${classes.button}`}
      >
        <span className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${classes.icon}`}>
          {isPlaying && <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-20" aria-hidden="true" />}
          <span className="relative">{isLoading ? <SpinnerIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
        </span>
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="max-w-[12rem] truncate text-sm font-semibold">{song.title}</span>
          <span className={`text-[11px] uppercase tracking-wide ${classes.status}`}>{statusLabel}</span>
        </span>
      </button>
    </div>
  );
}
