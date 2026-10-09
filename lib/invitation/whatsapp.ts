// Mensajes de WhatsApp del RSVP. Funciones puras: las usan los componentes
// cliente con los textos ya armados en `resolve.ts` (`RsvpContext`).

export type RsvpContext = {
  whatsappNumber: string;
  // "la boda de Ana y Luis el 17 de abril de 2027 a las 4:00 p. m."
  eventPhrase: string;
  // "la boda de Ana y Luis el 17 de abril de 2027"
  eventPhraseShort: string;
};

export type AttendanceType = "individual" | "grupo";

export type RsvpDetails = {
  // guestNames[0] es quien llena el formulario. En "grupo" también se
  // incluye: el total de nombres coincide con las personas confirmadas.
  guestNames: string[];
  // null cuando la invitación no pregunta de parte de quién viene.
  referrer: string | null;
  attendanceType: AttendanceType;
};

function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildRsvpMessage(ctx: RsvpContext, { guestNames, referrer, attendanceType }: RsvpDetails): string {
  const intro = referrer
    ? `Hola, soy ${guestNames[0]}. Recibí la invitación de parte de ${referrer} y quiero confirmar`
    : `Hola, soy ${guestNames[0]}. Quiero confirmar`;
  // eventPhrase termina en "p. m." (con punto): no se agrega otro.
  if (attendanceType === "individual") {
    return `${intro} mi asistencia a ${ctx.eventPhrase}`;
  }
  const list = guestNames.map((name) => `- ${name}`).join("\n");
  return `${intro} la asistencia de un grupo de ${guestNames.length} personas a ${ctx.eventPhrase}\n\nInvitados:\n${list}`;
}

export function buildRsvpUrl(ctx: RsvpContext, details: RsvpDetails): string {
  return whatsappUrl(ctx.whatsappNumber, buildRsvpMessage(ctx, details));
}

export function buildDeclineUrl(ctx: RsvpContext, name: string): string {
  return whatsappUrl(
    ctx.whatsappNumber,
    `Hola, soy ${name}. Muchas gracias por la invitación; lamentablemente no podré asistir a ${ctx.eventPhraseShort}. ¡Les deseo lo mejor!`
  );
}

export function contactUrl(number: string): string {
  return `https://wa.me/${number}`;
}

// "50688887777" → "8888 7777"; otros países → "+44 7700 900123" aproximado.
export function formatPhone(number: string): string {
  if (number.startsWith("506") && number.length === 11) {
    return `${number.slice(3, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}
