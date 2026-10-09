// Demo del diseño 05 · Borgoña (pareja ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- borgona`.
// Guía: docs/templates/05-borgona.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"borgona"> = {
  template: "borgona",

  site: {
    url: `${catalog.url}/plantillas/borgona`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "boda", article: "la" },
  couple: { partnerOne: "Sofía", partnerTwo: "Gabriel" },
  date: "2027-09-25",
  time: "17:00",
  durationHours: 6,

  welcome: { eyebrow: "Guarda la fecha", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Nos casamos" },

  openingQuote: {
    text: "Te elegiría a ti; en cien vidas, en cien mundos, en cualquier versión de la realidad.",
    reference: "Sofía y Gabriel",
  },

  story: {
    caption: "Ocho años, dos ciudades y un perro llamado Bruno después, decidimos que es hora de hacerlo oficial.",
    quote: { text: "Contigo todo es hogar.", reference: "Gabriel" },
  },

  family: {
    intro: "Junto a nuestros padres",
    groups: [
      { label: "Padres de la novia", names: ["Natalia Rojas Fallas", "Andrés Zúñiga Mora"] },
      { label: "Padres del novio", names: ["Eugenia Solís Brenes", "Luis Diego Navarro Mena"] },
    ],
  },

  countdown: {
    eyebrow: "Cuenta regresiva",
    title: "Faltan",
    todayMessage: "Es hoy.",
    afterMessage: "Gracias por estar.",
  },

  locations: [
    {
      label: "Ceremonia y recepción",
      name: "Casa Malva",
      address: "San Rafael, Escazú, San José",
      mapsUrl: "https://maps.google.com/?q=San+Rafael,+Escaz%C3%BA,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=San%20Rafael%20Escazu",
    },
  ],

  details: {
    eyebrow: "Información",
    title: "Lo que debes saber",
    notice: {
      label: "Importante",
      title: "Celebración *solo para adultos*.",
      body: "Habrá *parqueo* disponible en el lugar.",
    },
    dressCode: {
      title: "Cóctel elegante",
      avoidLabel: "Evita",
      avoidColors: [
        { name: "Blanco", hex: "#ffffff" },
        { name: "Vino", hex: "#5c1a2b" },
      ],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Lo importante es que estés",
    message: "Si quieres sumar a nuestra nueva etapa, puedes hacerlo aquí:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "RSVP",
    title: "¿Vienes?",
    deadline: "2027-08-31",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 6,
    allowDecline: true,
  },

  gallery: { eyebrow: "Galería", title: "Nosotros" },

  closingQuote: null,

  footer: { message: "Nos vemos ahí" },

  music: {
    src: "/audio/demo/debussy-clair-de-lune.mp3",
    title: "Clair de lune",
    artist: "Claude Debussy · Laurens Goedhart",
    credit: "Grabación de dominio público (vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/borgona/portada.jpg", alt: "Sofía y Gabriel", position: "50% 30%" },
    historia: { src: "/plantillas/borgona/historia.jpg", alt: "Sofía y Gabriel", position: "50% 40%" },
    galeria1: { src: "/plantillas/borgona/galeria-1.jpg", alt: "Sofía y Gabriel", position: "50% 35%" },
    galeria2: { src: "/plantillas/borgona/galeria-2.jpg", alt: "Sofía y Gabriel", position: "50% 35%" },
    galeria3: { src: "/plantillas/borgona/galeria-3.jpg", alt: "Sofía y Gabriel", position: "50% 45%" },
  },
};
