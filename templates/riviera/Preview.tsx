import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { Sun, TileBand } from "./ornaments";

// Miniatura del catálogo: arco con el sol de limón entre bandas de azulejo.
export default function RivieraPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates } = inv;
  return (
    <div className="flex h-full w-full flex-col bg-paper text-ink">
      <TileBand id="preview-top" className="!h-[7cqw] flex-shrink-0 text-primary" />
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative w-[42%]">
          <Sun className="absolute -right-[7cqw] -top-[7cqw] z-10 h-[16cqw] w-[16cqw] text-secondary" />
          <div className="relative overflow-hidden rounded-t-full border-[1.2cqw] border-paper shadow-[0_0_0_1.5px_var(--c-primary)]" style={{ aspectRatio: "3 / 4" }}>
            <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 12vw, 40vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
          </div>
        </div>
        <p className="mt-[5cqw] font-display text-[9.5cqw] leading-[1.02]">
          {names.one}
          <span className="block text-primary">&amp; {names.two}</span>
        </p>
        <p className="mt-[2.5cqw] text-[2.8cqw] tracking-[0.2em] text-muted">{dates.display}</p>
      </div>
      <TileBand id="preview-bottom" className="!h-[7cqw] flex-shrink-0 text-primary" />
    </div>
  );
}
