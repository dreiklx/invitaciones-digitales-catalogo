// Íconos de trazo simple usados por los cinco diseños (heredan el color).

import type { ReactNode } from "react";

type IconProps = { size?: number; className?: string };

function svg(size: number, className: string | undefined, children: ReactNode, filled = false) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const PinIcon = ({ size = 20, className }: IconProps) =>
  svg(size, className, <>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>);

export const CalendarIcon = ({ size = 20, className }: IconProps) =>
  svg(size, className, <>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4" />
  </>);

export const CopyIcon = ({ size = 20, className }: IconProps) =>
  svg(size, className, <>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </>);

export const CheckIcon = ({ size = 20, className }: IconProps) => svg(size, className, <path d="M5 13l4 4L19 7" />);

export const CloseIcon = ({ size = 18, className }: IconProps) => svg(size, className, <path d="M6 6l12 12M18 6L6 18" />);

export const ArrowDownIcon = ({ size = 20, className }: IconProps) => svg(size, className, <path d="M12 5v14M6 13l6 6 6-6" />);

export const ArrowLeftIcon = ({ size = 18, className }: IconProps) => svg(size, className, <path d="M19 12H5M11 6l-6 6 6 6" />);

export const ArrowRightIcon = ({ size = 18, className }: IconProps) => svg(size, className, <path d="M5 12h14M13 6l6 6-6 6" />);

export const PlayIcon = ({ size = 16, className }: IconProps) => svg(size, className, <path d="M8 5v14l11-7z" />, true);

export const PauseIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </>, true);

export const SpinnerIcon = ({ size = 18 }: IconProps) =>
  svg(size, "animate-spin", <path d="M12 3a9 9 0 1 0 9 9" />);

export const WhatsAppIcon = ({ size = 22, className }: IconProps) =>
  svg(size, className, (
    <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.35 5.07L2 22l5.07-1.33A9.96 9.96 0 0 0 12.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2Zm5.8 14.2c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.1.09-1.77-.11-.4-.13-.93-.3-1.6-.6-2.8-1.2-4.6-4.05-4.75-4.24-.14-.19-1.14-1.52-1.14-2.9s.72-2.06.97-2.34c.25-.28.55-.35.73-.35h.5c.16 0 .38-.03.58.44.24.56.8 1.94.87 2.08.07.14.11.3.02.48-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.63-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.35Z" />
  ), true);

// Muestra de color "a evitar" con una línea diagonal.
export function AvoidSwatch({ hex, size = 24 }: { hex: string; size?: number }) {
  return (
    <span
      className="relative inline-block flex-shrink-0 rounded-full border-2 border-current/30"
      style={{ background: hex, width: size, height: size }}
    >
      <svg className="absolute inset-0" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="4" y1="20" x2="20" y2="4" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="4" y1="20" x2="20" y2="4" stroke="#7a2318" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
