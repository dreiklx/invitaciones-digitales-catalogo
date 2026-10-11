import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";

// Miniatura del catálogo (4:5): fotografía arriba y bloque olivo con los
// nombres en columna y la ficha de la fecha, como la portada del diseño.
export default function OlivoPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  return (
    <div className="flex h-full w-full flex-col bg-primary text-on-primary">
      <div className="relative h-[52%] w-full">
        <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 26vw, 90vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
      </div>
      <div className="flex flex-1 flex-col justify-between px-[6cqw] pb-[5cqw] pt-[4cqw]">
        <p className="text-[2.5cqw] font-semibold uppercase tracking-[0.3em] text-secondary">{content.hero.eyebrow}</p>
        <p className="font-display text-[11cqw] font-light leading-[0.92] tracking-tight">
          <span className="block">{names.one}</span>
          <span className="block pl-[0.55em] italic text-secondary">y {names.two}</span>
        </p>
        <div className="grid grid-cols-[1fr_1fr_1.45fr] border-t border-on-primary/25 pt-[2cqw] font-display text-[6cqw] font-light leading-none">
          <span>{dates.day}</span>
          <span className="border-l border-on-primary/25 pl-[2.5cqw]">{String(dates.monthNumber).padStart(2, "0")}</span>
          <span className="border-l border-on-primary/25 pl-[2.5cqw]">{dates.year}</span>
        </div>
      </div>
    </div>
  );
}
