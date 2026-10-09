import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { Balloon, Cloud } from "./ornaments";

// Miniatura del diseño para el catálogo (proporción 4:5). Usa unidades de
// contenedor (cqw) para verse igual en cualquier ancho de tarjeta.
export default function NubePreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, content } = inv;
  const ageText = inv.honoree?.ageText ?? "";
  const match = ageText.match(/^(\d+)\s*(.*)$/);
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden bg-paper pt-[9cqw] text-center text-ink">
      <div className="absolute inset-0 bg-primary/30" />
      <Cloud className="absolute left-[5cqw] top-[7cqw] w-[20cqw] text-paper" />
      <Cloud className="absolute right-[6cqw] top-[30cqw] w-[14cqw] text-paper" />
      <Balloon className="absolute bottom-[14cqw] right-[9cqw] w-[7cqw] text-accent/70" />
      <Balloon className="absolute bottom-[20cqw] left-[8cqw] w-[6cqw] text-secondary" />
      <p className="relative rounded-full bg-paper/80 px-[3cqw] py-[1cqw] text-[2.6cqw] font-extrabold uppercase tracking-[0.2em]">{content.hero.eyebrow}</p>
      <div className="relative mt-[5cqw] w-[46cqw]">
        <div className="relative aspect-square overflow-hidden rounded-full border-[1.6cqw] border-paper">
          <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
        </div>
        <div className="absolute -bottom-[1cqw] -right-[2cqw] flex h-[17cqw] w-[17cqw] flex-col items-center justify-center rounded-full bg-secondary ring-[1cqw] ring-paper">
          <span className="font-display text-[8cqw] font-semibold leading-none">{match ? match[1] : inv.honoree?.age}</span>
          <span className="text-[2.2cqw] font-extrabold uppercase">{match ? match[2] : ageText}</span>
        </div>
      </div>
      <p className="relative mt-[4cqw] font-display text-[13cqw] font-semibold leading-none">{names.one}</p>
      <p className="relative mt-[2cqw] font-display text-[4cqw] text-ink/80">Cumple {ageText}</p>
    </div>
  );
}
