import Image from "next/image";
import type { Photo } from "@/lib/invitation/types";
import type { CSSProperties } from "react";

// Marco de foto con la proporción FIJA del espacio (meta.ts). La proporción
// es la misma en teléfono y en escritorio: lo que dice la documentación de
// cada diseño es exactamente lo que se ve.
export default function Frame({
  photo,
  ratio,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
  style,
}: {
  photo: Photo;
  ratio: [number, number];
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${ratio[0]} / ${ratio[1]}`, ...style }}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
    </div>
  );
}
