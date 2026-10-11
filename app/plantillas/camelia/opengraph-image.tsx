import { shareImage, shareImageFor } from "@/lib/invitation/routes";

export const alt = shareImage.alt;
export const size = shareImage.size;
export const contentType = shareImage.contentType;

export default function Image() {
  return shareImageFor("camelia");
}
