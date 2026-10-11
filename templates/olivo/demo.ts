// Demo del diseño 01 · Olivo (Ramón y Florinda, con las fotos de su sesión). También es el punto de
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
  couple: { partnerOne: "Ramón", partnerTwo: "Florinda" },
  date: "2027-04-17",
  time: "16:00",
  durationHours: 6,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { accent: "#8a5a3c" },

  welcome: { eyebrow: "Nos casamos", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Nos casamos" },

  openingQuote: {
    kind: "verse",
    text: "Y sobre todas estas cosas vestíos de caridad, la cual es el vínculo de la perfección.",
    reference: "Colosenses 3:14",
    translation: "Reina-Valera 1909",
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

  music: {
    src: "/audio/demo/pachelbel-canon-macleod.mp3",
    title: "Canon en re mayor",
    artist: "Johann Pachelbel · Kevin MacLeod",
    credit: "Kevin MacLeod (incompetech.com), licencia CC BY 3.0 (creativecommons.org/licenses/by/3.0)",
  },

  photos: {
    // Sesión de pareja real (public/plantillas/olivo/fotos/): cada foto una
    // sola vez, contada en orden (abrazo → propuesta → rosa → el anillo).
    portada: { src: "/plantillas/olivo/fotos/abrazo.jpg", alt: "Ramón y Florinda abrazados en el patio", position: "54% 12%" },
    historia: { src: "/plantillas/olivo/fotos/propuesta.jpg", alt: "Ramón, de rodillas, le propone matrimonio a Florinda", position: "50% 45%" },
    retrato: { src: "/plantillas/olivo/fotos/rosa.jpg", alt: "Ramón le lanza una rosa a Florinda", position: "50% 40%" },
    galeria1: { src: "/plantillas/olivo/fotos/anillo-vertical.jpg", alt: "Florinda enseña el anillo junto a Ramón", position: "50% 28%" },
    galeria2: { src: "/plantillas/olivo/fotos/patio.jpg", alt: "Ramón le ofrece una rosa a Florinda", position: "50% 30%" },
    galeria3: { src: "/plantillas/olivo/fotos/sentados.jpg", alt: "Ramón y Florinda sentados en el patio, felices", position: "50% 35%" },
    galeria4: { src: "/plantillas/olivo/fotos/anillo-horizontal.jpg", alt: "Florinda enseña el anillo y Ramón celebra", position: "50% 35%" },
  },
};
