import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { Garland, Moon } from "./ornaments";

// Miniatura del catálogo: arco con la luna, la frase (o el nombre del bebé)
// y quién invita, entre dos guirnaldas.
export default function ArrulloPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, dates, content } = inv;
  const headline = inv.shower?.babyName ?? content.hero.title ?? "Un bebé en camino";
  return (
    <div className="flex h-full w-full flex-col bg-paper text-ink">
      <Garland id="preview-top" className="!h-[8cqw] flex-shrink-0 text-accent" />
      <div className="flex flex-1 flex-col items-center justify-center px-[5cqw] text-center">
        <p className="text-[2.6cqw] font-medium uppercase tracking-[0.3em] text-primary">{content.hero.eyebrow}</p>
        <div className="relative mt-[3cqw] w-[40%]">
          <Moon className="absolute -right-[8cqw] -top-[6cqw] z-10 h-[15cqw] w-[15cqw] text-secondary" />
          <div className="relative overflow-hidden rounded-t-full border-[1.2cqw] border-paper shadow-[0_0_0_1.5px_var(--c-primary)]" style={{ aspectRatio: "3 / 4" }}>
            <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 12vw, 40vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
          </div>
        </div>
        <p className="mt-[4cqw] font-display text-[8.5cqw] leading-[1.05]">{headline}</p>
        <p className="mt-[1.5cqw] text-[3cqw] text-muted">{inv.shower?.parentsText}</p>
        <p className="mt-[1.5cqw] text-[2.6cqw] tracking-[0.2em] text-muted">{dates.display}</p>
      </div>
    </div>
  );
}
