// Demo del diseño 07 · Nube (primer cumpleaños de un bebé ficticio: Mateo).
// También es el punto de partida de una invitación nueva: `npm run nueva --
// nube` copia este archivo a config/invitation.ts. Guía: docs/templates/07-nube.md.
// Fotos: una sola sesión de primer cumpleaños de stock (Pexels; licencia de
// Pexels) en public/plantillas/nube/fotos/. Fuentes: photo-map.md.

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
  // `age` en años; `ageLabel` cambia el texto ("1 añito", "6 meses" con age: 0).
  honoree: { name: "Mateo", age: 1, ageLabel: "1 añito" },
  date: "2027-06-12",
  time: "15:00",
  durationHours: 4,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.
  // para una niña: colors: { primary: "#e7a9bd", onPrimary: "#3a1f2a" },

  welcome: { eyebrow: "¡Estás invitado a mi fiesta!", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Mi primer cumpleaños" },

  openingQuote: {
    text: "Un año de sonrisas, abrazos, primeras veces… ¡y ahora mi primera fiesta!",
  },

  story: {
    caption: "Este año aprendí a sonreír, a gatear y a dar mis primeros pasos. ¡Quiero celebrarlo contigo!",
    quote: { text: "Gracias por llenar de cariño su primer año.", reference: "Mamá y papá" },
  },

  family: {
    intro: "Con el cariño de",
    groups: [
      { label: "Sus papás", names: ["Daniela Herrera Soto", "José Pablo Brenes"] },
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
    message: "Si deseas traer un detalle, uso tallas de 12 a 18 meses. También puedes colaborar por:",
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

  gallery: { eyebrow: "Mi primer añito", title: "¡Cómo he crecido!" },

  closingQuote: null,

  footer: { message: "¡Te espero!" },

  music: {
    src: "/audio/demo/cajita-musical-cuna.mp3",
    title: "Canción de cuna",
    artist: "Johannes Brahms · cajita musical",
    credit: "Grabación de dominio público (pdsounds.org, vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/nube/fotos/globos.jpg", alt: "Mateo sentado en un cajón de madera con globos de colores", position: "50% 55%" },
    historia: { src: "/plantillas/nube/fotos/globos-amarillos.jpg", alt: "Mateo junto a sus globos amarillos", position: "50% 35%" },
    galeria1: { src: "/plantillas/nube/fotos/letras-one.jpg", alt: "Mateo con sus globos y las letras de su primer año", position: "50% 50%" },
    galeria2: { src: "/plantillas/nube/fotos/en-su-cajon.jpg", alt: "Mateo sentado en el parque", position: "45% 40%" },
    galeria3: { src: "/plantillas/nube/fotos/en-el-pasto.jpg", alt: "Mateo sonríe sentado en el pasto", position: "50% 45%" },
    galeria4: { src: "/plantillas/nube/fotos/puente-rojo.jpg", alt: "Mateo con las letras de su primer año", position: "50% 45%" },
  },
};
