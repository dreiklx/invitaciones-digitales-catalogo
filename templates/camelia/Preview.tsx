import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { toRoman } from "@/lib/invitation/time";
import { gemClip, Tiara } from "./ornaments";

// Miniatura del catálogo: retrato en el marco tallado, tiara, el nombre en
// cursiva y los XV, sobre perla con bruma aguamarina.
export default function CameliaPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates, content } = inv;
  const roman = toRoman(inv.honoree?.age ?? 15);
  return (
    <div className="flex h-full w-full flex-col items-center bg-gradient-to-b from-surface via-paper to-paper px-[6cqw] pt-[7cqw] text-center">
      <div className="w-[52%] bg-secondary p-[0.4cqw]" style={{ clipPath: gemClip(14) }}>
        <div className="relative aspect-[4/5] overflow-hidden" style={{ clipPath: gemClip(13) }}>
          <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 14vw, 46vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
        </div>
      </div>
      <Tiara className="mt-[4cqw] h-[5cqw] w-[10cqw] text-secondary" />
      <p className="mt-[1.5cqw] text-[2.4cqw] font-medium uppercase tracking-[0.4em] text-accent">{content.hero.eyebrow}</p>
      <p className="mt-[1cqw] font-display text-[14cqw] font-medium italic leading-none text-primary">{names.one}</p>
      <p className="mt-[1.5cqw] font-display text-[5cqw] italic text-secondary">— {roman} —</p>
      <p className="mt-[1cqw] text-[2.6cqw] tracking-[0.12em] text-muted">{dates.display}</p>
    </div>
  );
}
