import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { toRoman } from "@/lib/invitation/time";

// Miniatura del catálogo: retrato a la derecha, el nombre monumental en
// cursiva y el medallón con los XV sobre el bloque vino.
export default function CameliaPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  const roman = toRoman(inv.honoree?.age ?? 15);
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-primary px-[6cqw] pb-[6cqw] pt-[6cqw] text-on-primary">
      <div className="flex justify-between text-[2.6cqw] font-semibold uppercase tracking-[0.25em] text-secondary">
        <span>{content.hero.eyebrow}</span>
        <span>{dates.dotted}</span>
      </div>
      <div className="relative ml-auto mt-[4cqw] w-[60%]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 16vw, 55vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
        </div>
        <div className="absolute -left-[7cqw] bottom-[4cqw] flex h-[16cqw] w-[16cqw] items-center justify-center rounded-full border border-secondary/80 p-[0.8cqw]">
          <div className="flex h-full w-full items-center justify-center rounded-full border-[0.5cqw] border-secondary bg-primary">
            <span className="font-display text-[6cqw] italic leading-none text-secondary">{roman}</span>
          </div>
        </div>
      </div>
      <p className="-mt-[6cqw] font-display text-[24cqw] italic leading-[0.85] text-secondary">{names.one}</p>
    </div>
  );
}
