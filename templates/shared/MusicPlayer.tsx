"use client";

import { useEffect, useRef, useState } from "react";
import type { InvitationContent, MusicPlayerStyle } from "@/lib/invitation/types";
import { registerMusicStarter } from "./music-start";
import { players, type PlayerState } from "./players";

// Si en este tiempo no llega confirmación real de reproducción, se asume que
// la fuente no está disponible (no todos los navegadores disparan "error").
// Es generoso porque el audio no se descarga hasta el primer toque.
const LOAD_TIMEOUT_MS = 12000;

// Música de fondo: una sola lógica de audio para todos los diseños; cada
// diseño elige su presentación (`players.tsx`).
// - Empieza al tocar "Abrir invitación": la portada llama a
//   `startMusicFromGesture()` (music-start.ts) dentro de ese mismo clic.
//   Antes de eso no suena ni se descarga nada (`preload="none"`). No hay
//   listeners de "primer toque en cualquier parte".
// - Después, el reproductor pausa y reanuda.
// - Si el navegador rechaza el play() de la portada, queda en "blocked":
//   el reproductor invita a tocarlo para escuchar.
// - El estado visual sale de eventos nativos del <audio>, nunca de un
//   "Sonando" optimista.
export default function MusicPlayer({
  music,
  fallback,
}: {
  music: NonNullable<InvitationContent["music"]>;
  fallback: MusicPlayerStyle;
}) {
  const variant = players[music.player ?? fallback];
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const stateRef = useRef<PlayerState>("idle");
  // < lg se oculta mientras están en pantalla el formulario de confirmación
  // (quedaba encima de "Confirmar por WhatsApp") o los créditos de la música
  // del pie (los tapaba). La música sigue sonando.
  const [covering, setCovering] = useState(false);
  // < lg, mientras se ve la portada (justo al abrir, cuando empieza la
  // música) va arriba a la derecha: abajo tapaba fecha, nombres o
  // "Desliza hacia abajo" en teléfonos bajos. Al bajar vuelve a su lugar,
  // sobre la barra de confirmar.
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearLoadTimeout = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  };

  const settle = (next: PlayerState) => {
    clearLoadTimeout();
    setState(next);
  };

  // play() SIEMPRE en la misma pila de llamadas del gesto (clic en la
  // portada o en el reproductor).
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setState("loading");
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => setState((prev) => (prev === "loading" ? "error" : prev)), LOAD_TIMEOUT_MS);
    audio.play().catch((err: unknown) => {
      // NotAllowedError = el navegador no aceptó el gesto: se puede reintentar
      // tocando el reproductor. Cualquier otro = archivo no disponible.
      settle(err instanceof DOMException && err.name === "NotAllowedError" ? "blocked" : "error");
    });
  };
  const playRef = useRef(play);
  useEffect(() => {
    stateRef.current = state;
    playRef.current = play;
  });

  useEffect(
    () =>
      registerMusicStarter(() => {
        const current = stateRef.current;
        if (current === "idle" || current === "blocked") playRef.current();
      }),
    [],
  );

  useEffect(() => {
    const targets = [document.getElementById("confirmar"), document.querySelector("[data-music-credit]")].filter((el): el is Element => !!el);
    if (!targets.length) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCovering(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    },
    [],
  );

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || state === "error") return;
    if (state === "playing" || state === "loading") {
      audio.pause();
      settle("paused");
      return;
    }
    play();
  };

  const label =
    state === "error"
      ? `${music.title}: no disponible por ahora`
      : state === "playing" || state === "loading"
        ? `Pausar la música: ${music.title}`
        : `Escuchar música: ${music.title}`;

  return (
    <div
      className={`fixed z-40 transition-opacity duration-300 lg:pointer-events-auto lg:opacity-100 ${variant.position} ${atTop ? "max-lg:bottom-auto max-lg:right-3 max-lg:top-2" : ""} ${
        covering ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onPlaying={() => settle("playing")}
        onPause={() => setState((prev) => (prev === "error" || prev === "blocked" ? prev : "paused"))}
        onWaiting={() => setState((prev) => (prev === "playing" ? "loading" : prev))}
        onError={() => settle("error")}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={state === "error"}
        aria-pressed={state === "playing" || state === "loading"}
        aria-label={label}
        title={music.artist ? `${music.title} — ${music.artist}` : music.title}
        className={`disabled:cursor-not-allowed disabled:opacity-60 ${variant.button}`}
      >
        <variant.Face state={state} title={music.title} artist={music.artist} />
      </button>
    </div>
  );
}
