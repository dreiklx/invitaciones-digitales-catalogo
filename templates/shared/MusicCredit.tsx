import type { InvitationContent } from "@/lib/invitation/types";

// Créditos de la música al pie de la invitación: obra, intérprete y la
// atribución que pida su licencia (p. ej. CC BY). Sin música, no aparece.
export default function MusicCredit({ music, className = "" }: { music: InvitationContent["music"]; className?: string }) {
  if (!music) return null;
  return (
    <p data-music-credit className={`mx-auto max-w-md text-xs leading-relaxed ${className}`}>
      Música: {music.title}
      {music.artist && ` — ${music.artist}`}
      {music.credit && `. ${music.credit}`}
    </p>
  );
}
