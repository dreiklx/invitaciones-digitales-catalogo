// Demo del diseño 05 · Camelia (quinceañera ficticia: Renata). También es
// el punto de partida de una invitación nueva: `npm run nueva -- camelia`.
// Guía: docs/templates/05-camelia.md.
// Fotos: una sola sesión de quince años de stock en un salón de fiesta
// (Pexels, Juliano Astc; licencia de Pexels) en public/plantillas/camelia/fotos/.
// Fuentes y advertencias de uso: photo-map.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"camelia"> = {
  template: "camelia",

  site: {
    url: `${catalog.url}/plantillas/camelia`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "fiesta de quince años", article: "la" },
  honoree: { name: "Renata", age: 15 },
  date: "2027-10-23",
  time: "18:00",
  durationHours: 7,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { primary: "#5c1a2b" },

  welcome: { eyebrow: "Mis XV años", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Mis XV años" },

  openingQuote: {
    text: "Quince años de sueños cumplidos y otros tantos por cumplir. Esta noche quiero celebrarlos contigo.",
    reference: "Renata",
  },

  story: {
    caption: "Me gustan la música, bailar con mis amigas y las fotos espontáneas. Esta fiesta es para darles las gracias a quienes me han acompañado hasta aquí.",
    quote: { text: "Lo mejor de crecer es todo lo que todavía falta.", reference: "Renata" },
  },

  family: {
    intro: "Con el cariño de",
    groups: [
      { label: "Mis padres", names: ["Paola Jiménez Ureña", "Esteban Salas Montero"] },
      { label: "Mis padrinos", names: ["Viviana Ureña Castro", "Marco Salas Pérez"] },
      { label: "Mi corte de honor", names: ["Ana Lucía, Fernanda, Mariel y Sofía", "Rodrigo, Emilio, Julián y Pablo"] },
    ],
  },

  countdown: {
    eyebrow: "La noche se acerca",
    title: "Faltan",
    todayMessage: "¡Es hoy!",
    afterMessage: "Gracias por bailar conmigo.",
  },

  locations: [
    {
      label: "Misa",
      name: "Iglesia de Santa Ana",
      address: "Santa Ana centro, San José",
      mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Ana,+San+Jos%C3%A9,+Costa+Rica",
    },
    {
      label: "Fiesta",
      name: "Salón Rosa Mística",
      address: "Pozos, Santa Ana, San José",
      time: "19:30",
      mapsUrl: "https://maps.google.com/?q=Pozos,+Santa+Ana,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Pozos%20Santa%20Ana",
    },
  ],

  schedule: {
    eyebrow: "Programa",
    title: "Así será la noche",
    items: [
      { time: "18:00", title: "Misa de acción de gracias" },
      { time: "19:30", title: "Recepción", description: "Bienvenida y fotos" },
      { time: "20:15", title: "Vals", description: "Con papá y mi corte de honor" },
      { time: "21:00", title: "Brindis y cena" },
      { time: "22:00", title: "¡A la pista!" },
    ],
  },

  details: {
    eyebrow: "Información",
    title: "Lo que debes saber",
    notice: {
      label: "Importante",
      title: "La fiesta empieza *puntual* con el vals.",
      body: "Habrá *parqueo* disponible en el salón.",
    },
    dressCode: {
      title: "Formal",
      description: "Vestido largo o de cóctel; traje o saco y corbata.",
      avoidLabel: "Colores reservados para la quinceañera",
      avoidColors: [
        { name: "Aguamarina", hex: "#7fd6d0" },
        { name: "Blanco", hex: "#ffffff" },
      ],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Tu presencia es mi mejor regalo",
    message: "Si deseas tener un detalle conmigo, habrá una cajita para sobres en el salón o puedes hacerlo por:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "RSVP",
    title: "¿Vienes?",
    deadline: "2027-10-01",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 6,
    allowDecline: true,
  },

  gallery: { eyebrow: "Galería", title: "Una noche para recordar" },

  closingQuote: null,

  footer: { message: "Te espero para celebrar" },

  music: {
    src: "/audio/demo/debussy-clair-de-lune.mp3",
    title: "Clair de lune",
    artist: "Claude Debussy · Laurens Goedhart",
    credit: "Grabación de dominio público (vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/camelia/fotos/vestido-aguamarina.jpg", alt: "Renata con su vestido aguamarina en el salón", position: "50% 20%" },
    historia: { src: "/plantillas/camelia/fotos/vestido-blanco.jpg", alt: "Renata con su vestido blanco, sentada en el salón", position: "50% 30%" },
    galeria1: { src: "/plantillas/camelia/fotos/salon-de-fiesta.jpg", alt: "Renata bajo las lámparas del salón", position: "50% 35%" },
    galeria2: { src: "/plantillas/camelia/fotos/retrato.jpg", alt: "Retrato de Renata con su tiara", position: "50% 35%" },
    galeria3: { src: "/plantillas/camelia/fotos/mirada.jpg", alt: "Renata mira hacia atrás con su vestido blanco", position: "50% 30%" },
    galeria4: { src: "/plantillas/camelia/fotos/hacia-el-salon.jpg", alt: "Renata con su vestido aguamarina en la pista", position: "50% 30%" },
  },
};
