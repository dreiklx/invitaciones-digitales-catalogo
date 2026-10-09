import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";

// Miniatura del catálogo: portada de revista (4:5, unidades de contenedor).
export default function TierraPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  return (
    <div className="flex h-full w-full flex-col bg-paper px-[6cqw] pb-[6cqw] pt-[6cqw] text-ink">
      <div className="flex items-baseline justify-between border-b border-ink/25 pb-[2cqw] text-[2.6cqw] uppercase tracking-[0.25em] text-muted">
        <span>{content.hero.eyebrow}</span>
        <span className="font-display text-[3cqw] normal-case italic tracking-normal">{dates.dotted}</span>
      </div>
      <p className="mt-[5cqw] font-display text-[15cqw] font-light leading-[0.82] tracking-tight [font-variation-settings:'opsz'_144,'SOFT'_50]">
        {names.one}
        <span className="block italic text-accent">&amp; {names.two}</span>
      </p>
      <div className="relative mt-auto ml-auto w-[48%]" style={{ aspectRatio: "4 / 5" }}>
        <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
      </div>
    </div>
  );
}
