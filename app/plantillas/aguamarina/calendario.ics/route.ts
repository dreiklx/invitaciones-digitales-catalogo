import { calendarFor } from "@/lib/invitation/routes";

export const dynamic = "force-static";

export function GET() {
  return calendarFor("aguamarina");
}
