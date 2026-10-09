import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";

// Miniatura del diseño para el catálogo (proporción 4:5). Usa unidades de
// contenedor (cqw) para verse igual en cualquier ancho de tarjeta.
export default function OlivoPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink text-paper">
      <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 26vw, 90vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/85" />
      <div className="absolute inset-[5cqw] border border-paper/35" />
      <div className="absolute inset-x-0 bottom-[11cqw] flex flex-col items-center text-center">
        <p className="font-display text-[3.4cqw] uppercase italic tracking-[0.35em] text-secondary">{content.hero.eyebrow}</p>
        <p className="mt-[3cqw] font-display text-[11cqw] leading-none">
          {names.one}
          <span className="mx-[2cqw] align-middle text-[7cqw] text-secondary">&amp;</span>
          {names.two}
        </p>
        <div className="ornament mt-[4cqw] text-secondary">
          <span className="whitespace-nowrap font-display text-[3.2cqw] tracking-[0.25em] text-paper/90">{dates.display}</span>
        </div>
      </div>
    </div>
  );
}
