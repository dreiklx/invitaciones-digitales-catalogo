import Image from "next/image";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";

// Miniatura del catálogo: retrato en blanco y negro con doble marco dorado.
export default function GalaPreview({ inv }: { inv: ResolvedInvitation }) {
  const { photos, names, dates } = inv;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-paper px-[8cqw] text-center">
      <span className="pointer-events-none absolute inset-[4cqw] border border-primary/45" />
      <span className="pointer-events-none absolute inset-[5.5cqw] border border-primary/20" />
      <p className="text-[2.6cqw] uppercase tracking-[0.4em] text-secondary">{inv.content.hero.eyebrow}</p>
      <div className="relative mt-[5cqw] w-[44%] border border-primary/70 p-[1.4cqw]" style={{ aspectRatio: "3 / 4" }}>
        <div className="relative h-full w-full">
          <Image src={photos.portada.src} alt="" fill sizes="(min-width: 1024px) 12vw, 40vw" className="object-cover grayscale contrast-[1.08]" style={{ objectPosition: photos.portada.position }} />
        </div>
      </div>
      <p className="mt-[5cqw] font-display text-[8cqw] leading-[1.05] text-ink">
        {names.one} <span className="italic text-primary">&amp;</span> {names.two}
      </p>
      <p className="mt-[3cqw] font-display text-[4cqw] tracking-[0.06em] text-muted">{dates.long}</p>
    </div>
  );
}
