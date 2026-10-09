// Demo del diseño 04 · Riviera (pareja ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- riviera`.
// Guía: docs/templates/04-riviera.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"riviera"> = {
  template: "riviera",

  site: {
    url: `${catalog.url}/plantillas/riviera`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "boda", article: "la" },
  couple: { partnerOne: "Lucía", partnerTwo: "Martín" },
  date: "2027-03-06",
  time: "16:30",
  durationHours: 7,

  welcome: { eyebrow: "Con mucha ilusión", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Nos casamos frente al mar" },

  openingQuote: {
    text: "Contigo, cualquier lugar se siente como el verano.",
    reference: "Lucía y Martín",
  },

  story: {
    caption: "Un viaje, una puesta de sol y una pregunta. Ahora queremos celebrarlo con ustedes junto al mar.",
    quote: { text: "El mar no tiene fin, como lo que siento por ti.", reference: "Martín" },
  },

  family: {
    intro: "Con el cariño de nuestros padres",
    groups: [
      { label: "Padres de la novia", names: ["Silvia Cordero Mata", "Rodrigo Esquivel Núñez"] },
      { label: "Padres del novio", names: ["Teresa Calvo Ramírez", "Alberto Ugalde Rivera"] },
    ],
  },

  countdown: {
    eyebrow: "Faltan",
    title: "Contando los días",
    todayMessage: "¡Hoy es el día!",
    afterMessage: "Gracias por celebrar con nosotros",
  },

  locations: [
    {
      label: "Ceremonia",
      name: "Villa Azul",
      address: "Playa Flamingo, Santa Cruz, Guanacaste",
      mapsUrl: "https://maps.google.com/?q=Playa+Flamingo,+Guanacaste,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Playa%20Flamingo%20Guanacaste",
    },
    {
      label: "Fiesta",
      name: "Terraza Villa Azul",
      address: "Playa Flamingo, Santa Cruz, Guanacaste",
      time: "18:30",
      mapsUrl: "https://maps.google.com/?q=Playa+Flamingo,+Guanacaste,+Costa+Rica",
    },
  ],

  details: {
    eyebrow: "Para que disfrutes",
    title: "Antes de venir",
    notice: {
      label: "Importante",
      title: "La ceremonia será *en la playa*.",
      body: "Te recomendamos *calzado bajo* y protector solar. Al atardecer refresca un poco.",
    },
    dressCode: {
      title: "Formal de playa",
      description: "Colores claros, lino y telas frescas.",
      avoidLabel: "Por favor evita",
      avoidColors: [{ name: "Blanco", hex: "#ffffff" }],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Tu presencia es el mejor regalo",
    message: "Si quieres tener un detalle con nosotros, puedes hacerlo por SINPE Móvil:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "Confirmación",
    title: "¿Vienes a celebrar?",
    deadline: "2027-02-10",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 8,
    allowDecline: true,
  },

  gallery: { eyebrow: "Postales", title: "Nuestros días de sol" },

  closingQuote: { text: "Que nunca nos falte el mar, ni la risa, ni el uno al otro.", reference: "Lucía y Martín" },

  footer: { message: "Te esperamos frente al mar" },

  music: null,

  photos: {
    portada: { src: "/plantillas/riviera/portada.jpg", alt: "Lucía y Martín", position: "50% 30%" },
    historia: { src: "/plantillas/riviera/historia.jpg", alt: "Lucía y Martín", position: "50% 35%" },
    galeria1: { src: "/plantillas/riviera/galeria-1.jpg", alt: "Lucía y Martín", position: "50% 35%" },
    galeria2: { src: "/plantillas/riviera/galeria-2.jpg", alt: "Lucía y Martín", position: "50% 40%" },
    galeria3: { src: "/plantillas/riviera/galeria-3.jpg", alt: "Lucía y Martín", position: "50% 40%" },
    galeria4: { src: "/plantillas/riviera/galeria-4.jpg", alt: "Lucía y Martín", position: "50% 45%" },
  },
};
