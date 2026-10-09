import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { toRoman } from "@/lib/invitation/time";
import { Sparkle } from "./ornaments";

// Miniatura del diseño para el catálogo (proporción 4:5). Usa unidades de
// contenedor (cqw) para verse igual en cualquier ancho de tarjeta.
export default function AuroraPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  const roman = toRoman(inv.honoree?.age ?? 15);
  return (
    <div className="aurora-glow relative flex h-full w-full flex-col items-center overflow-hidden pt-[9cqw] text-center text-ink">
      <span aria-hidden="true" className="xv-outline absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 font-display text-[78cqw] leading-none">
        {roman}
      </span>
      <Sparkle className="absolute left-[10cqw] top-[12cqw] h-[4cqw] w-[4cqw] text-primary/50" />
      <Sparkle className="absolute right-[11cqw] top-[30cqw] h-[5cqw] w-[5cqw] text-accent" />
      <Sparkle className="absolute bottom-[22cqw] left-[12cqw] h-[3cqw] w-[3cqw] text-primary/50" />
      <p className="relative text-[2.8cqw] font-semibold uppercase tracking-[0.35em] text-primary">{content.hero.eyebrow}</p>
      <div className="relative mt-[4cqw] w-[44cqw] rounded-[50%] border border-primary/40 p-[1.4cqw]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[50%]">
          <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
        </div>
      </div>
      <p className="relative mt-[2cqw] font-script text-[13cqw] leading-[1.15] text-primary">{names.one}</p>
      <p className="relative whitespace-nowrap text-[2.8cqw] font-medium tracking-[0.3em] text-muted">{dates.display}</p>
    </div>
  );
}
