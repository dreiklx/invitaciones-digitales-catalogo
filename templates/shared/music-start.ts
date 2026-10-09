// Puente entre la portada ("Abrir invitación") y el reproductor de música.
//
// Los navegadores (sobre todo Safari en iPhone) solo dejan llamar a
// audio.play() DENTRO del gesto del usuario: si la llamada pasa por un
// cambio de estado, un efecto o un setTimeout, se pierde el permiso. Por eso
// la portada llama a `startMusicFromGesture()` de forma síncrona en su
// onClick, y el reproductor registra aquí una función que hace play() en ese
// mismo instante. Sin música (`music: null`) no hay nada registrado y la
// portada solo abre la invitación.

type Starter = () => void;

let starter: Starter | null = null;

export function registerMusicStarter(fn: Starter): () => void {
  starter = fn;
  return () => {
    if (starter === fn) starter = null;
  };
}

export function startMusicFromGesture(): void {
  starter?.();
}
