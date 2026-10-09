// Demo del diseño 01 · Olivo (pareja ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- olivo` copia este
// archivo a config/invitation.ts. Guía: docs/templates/01-olivo.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"olivo"> = {
  template: "olivo",

  site: {
    url: `${catalog.url}/plantillas/olivo`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "boda", article: "la" },
  couple: { partnerOne: "Valeria", partnerTwo: "Andrés" },
  date: "2027-04-17",
  time: "16:00",
  durationHours: 6,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { accent: "#8a5a3c" },

  welcome: { eyebrow: "Nos casamos", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Nos casamos" },

  openingQuote: {
    text: "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.",
    reference: "Antoine de Saint-Exupéry",
  },

  story: {
    caption: "Gracias por acompañarnos en el comienzo de este nuevo capítulo.",
    quote: { text: "Ser profundamente amado te da fuerza; amar profundamente te da valor.", reference: "Lao Tse" },
  },

  family: {
    intro: "Con la bendición de nuestros padres",
    groups: [
      { label: "Padres de la novia", names: ["Laura Jiménez Solano", "Ricardo Mora Vargas"] },
      { label: "Padres del novio", names: ["Patricia Rojas Castro", "Esteban Quesada Brenes"] },
    ],
  },

  countdown: {
    eyebrow: "Falta poco",
    title: "Nos vemos pronto",
    todayMessage: "¡Hoy es el gran día!",
    afterMessage: "Gracias por acompañarnos",
  },

  locations: [
    {
      label: "Ceremonia",
      name: "Parroquia Santa Ana",
      address: "Santa Ana centro, San José",
      mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Ana,+San+Jos%C3%A9,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Iglesia%20de%20Santa%20Ana%20Costa%20Rica",
    },
    {
      label: "Recepción",
      name: "Hacienda Los Olivos",
      address: "Piedades, Santa Ana, San José",
      time: "18:00",
      mapsUrl: "https://maps.google.com/?q=Piedades,+Santa+Ana,+Costa+Rica",
    },
  ],

  details: {
    eyebrow: "Detalles",
    title: "Antes de venir",
    notice: {
      label: "Importante",
      title: "La celebración será *solo para adultos*.",
      body: "La recepción comenzará a las *6:00 p. m.* en Hacienda Los Olivos.",
      note: "Gracias por tenerlo en cuenta al organizar su asistencia.",
    },
    dressCode: {
      title: "Vestimenta formal",
      avoidLabel: "Colores reservados",
      avoidColors: [{ name: "Blanco", hex: "#ffffff" }],
      notice: "Les pedimos amablemente no asistir vestidos de blanco.",
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Su presencia es lo más importante",
    message:
      "Contar con ustedes ese día es el mejor regalo. Si aun así desean tener un detalle con nosotros, pueden hacerlo mediante:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "Confirmar asistencia",
    title: "¿Nos acompañas?",
    deadline: "2027-03-01",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 10,
    allowDecline: true,
  },

  gallery: { eyebrow: "Momentos", title: "Un vistazo a nuestra historia" },

  closingQuote: { text: "La vida es una flor de la cual el amor es la miel.", reference: "Victor Hugo" },

  footer: { message: "Con todo nuestro amor" },

  music: null,

  photos: {
    portada: { src: "/plantillas/olivo/portada.jpg", alt: "Valeria y Andrés", position: "50% 30%" },
    historia: { src: "/plantillas/olivo/historia.jpg", alt: "Valeria y Andrés", position: "50% 40%" },
    cuentaRegresiva: { src: "/plantillas/olivo/cuenta-regresiva.jpg", alt: "Valeria y Andrés", position: "50% 30%" },
    regalos: { src: "/plantillas/olivo/regalos.jpg", alt: "Valeria y Andrés", position: "50% 30%" },
    galeria1: { src: "/plantillas/olivo/galeria-1.jpg", alt: "Valeria y Andrés", position: "50% 40%" },
    galeria2: { src: "/plantillas/olivo/galeria-2.jpg", alt: "Valeria y Andrés", position: "50% 35%" },
    galeria3: { src: "/plantillas/olivo/galeria-3.jpg", alt: "Valeria y Andrés", position: "50% 35%" },
    galeria4: { src: "/plantillas/olivo/galeria-4.jpg", alt: "Valeria y Andrés", position: "50% 45%" },
    cierre: { src: "/plantillas/olivo/cierre.jpg", alt: "Valeria y Andrés", position: "50% 30%" },
  },
};
