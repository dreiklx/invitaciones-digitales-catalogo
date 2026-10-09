import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";

// Miniatura del catálogo: bloque vino con los nombres gigantes y la foto.
export default function BorgonaPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  return (
    <div className="relative flex h-full w-full flex-col bg-primary text-on-primary">
      <div className="relative h-[46%] w-full">
        <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 26vw, 90vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
      </div>
      <div className="flex flex-1 flex-col justify-between px-[6cqw] pb-[6cqw] pt-[4cqw]">
        <div className="flex justify-between text-[2.6cqw] font-semibold uppercase tracking-[0.25em] text-secondary">
          <span>{content.hero.eyebrow}</span>
          <span>{dates.dotted}</span>
        </div>
        <p className="font-display text-[17cqw] italic leading-[0.82] text-secondary">
          {names.one}
          <span className="block whitespace-nowrap pl-[10%]">&amp; {names.two}</span>
        </p>
      </div>
    </div>
  );
}
