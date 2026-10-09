// Demo del diseño 07 · Nube (bebé ficticio). También es el punto de partida
// de una invitación nueva: `npm run nueva -- nube` copia este archivo a
// config/invitation.ts. Guía: docs/templates/07-nube.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"nube"> = {
  template: "nube",

  site: {
    url: `${catalog.url}/plantillas/nube`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "primer cumpleaños", article: "el" },
  // `age` en años; para meses: age: 0, ageLabel: "6 meses".
  honoree: { name: "Mateo", age: 1 },
  date: "2027-06-12",
  time: "15:00",
  durationHours: 4,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.
  // para una niña: colors: { primary: "#e7a9bd", onPrimary: "#3a1f2a" },

  welcome: { eyebrow: "¡Estás invitado!", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Mi primer cumpleaños" },

  openingQuote: {
    text: "Un año de sonrisas, abrazos y primeras veces.",
  },

  story: {
    caption: "Este año aprendí a sonreír, a gatear y a dar mis primeros pasos. ¡Quiero celebrarlo contigo!",
    quote: { text: "Gracias por llenar de cariño su primer año.", reference: "Mamá y papá" },
  },

  family: {
    intro: "Con el cariño de",
    groups: [
      { label: "Sus papás", names: ["Natalia Herrera Soto", "José Pablo Brenes"] },
      { label: "Sus padrinos", names: ["Carolina Brenes Vega", "Andrés Herrera Soto"] },
    ],
  },

  countdown: {
    eyebrow: "¡Ya casi!",
    title: "Falta muy poco",
    todayMessage: "¡Hoy es la fiesta!",
    afterMessage: "¡Gracias por venir!",
  },

  locations: [
    {
      label: "Fiesta",
      name: "Parque La Sabana",
      address: "Rancho 4, frente al lago, San José",
      mapsUrl: "https://maps.google.com/?q=Parque+Metropolitano+La+Sabana,+San+Jos%C3%A9,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Parque%20La%20Sabana%20San%20Jose",
    },
  ],

  schedule: {
    eyebrow: "Programa",
    title: "Así será la fiesta",
    items: [
      { time: "15:00", title: "Bienvenida y juegos" },
      { time: "16:00", title: "Show de burbujas" },
      { time: "16:45", title: "Pastel y canción" },
      { time: "17:15", title: "Piñata y sorpresas" },
    ],
  },

  details: {
    eyebrow: "Ten en cuenta",
    title: "Para la fiesta",
    notice: {
      label: "Importante",
      title: "Habrá *área de juegos* para los niños.",
      body: "Recomendamos ropa *cómoda* y una muda extra para los más pequeños.",
    },
    dressCode: {
      title: "Ropa cómoda",
      description: "Colores pastel si quieren combinar con la fiesta.",
      avoidColors: [],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Tu visita es el mejor regalo",
    message: "Si deseas traer un detalle, Mateo usa tallas de 12 a 18 meses. También puedes colaborar por:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "Confirma",
    title: "¿Vienes a mi fiesta?",
    deadline: "2027-06-01",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 8,
    allowDecline: true,
  },

  gallery: { eyebrow: "Mi primer año", title: "¡Cómo he crecido!" },

  closingQuote: null,

  footer: { message: "¡Te espero!" },

  music: null,

  photos: {
    portada: { src: "/plantillas/nube/portada.jpg", alt: "Mateo", position: "50% 40%" },
    historia: { src: "/plantillas/nube/historia.jpg", alt: "Mateo", position: "50% 35%" },
    galeria1: { src: "/plantillas/nube/galeria-1.jpg", alt: "Mateo", position: "50% 35%" },
    galeria2: { src: "/plantillas/nube/galeria-2.jpg", alt: "Mateo", position: "50% 40%" },
    galeria3: { src: "/plantillas/nube/galeria-3.jpg", alt: "Mateo", position: "50% 40%" },
    galeria4: { src: "/plantillas/nube/galeria-4.jpg", alt: "Mateo", position: "50% 35%" },
  },
};
