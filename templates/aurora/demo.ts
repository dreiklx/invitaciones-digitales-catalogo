// Demo del diseño 06 · Aurora (quinceañera ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- aurora` copia este
// archivo a config/invitation.ts. Guía: docs/templates/06-aurora.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"aurora"> = {
  template: "aurora",

  site: {
    url: `${catalog.url}/plantillas/aurora`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "fiesta de quince años", article: "la" },
  honoree: { name: "Mariana", age: 15 },
  date: "2027-08-14",
  time: "17:00",
  durationHours: 7,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { accent: "#a8466c" },

  welcome: { eyebrow: "Mis XV años", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Mis XV años" },

  openingQuote: {
    text: "Hay noches que se quedan para siempre en el corazón.",
  },

  story: {
    caption:
      "Quince años de sueños, risas y aprendizajes. Quiero celebrar este momento tan especial con las personas que han sido parte de mi historia.",
    quote: { text: "Gracias por acompañarme en cada paso.", reference: "Mariana" },
  },

  family: {
    intro: "Con la bendición de",
    groups: [
      { label: "Mis padres", names: ["Andrea Solano Mena", "Javier Rojas Arias"] },
      { label: "Mis padrinos", names: ["Daniela Mora Castro", "Luis Fernando Vargas"] },
    ],
  },

  countdown: {
    eyebrow: "La noche se acerca",
    title: "Cuenta regresiva",
    todayMessage: "¡Hoy es la gran noche!",
    afterMessage: "Gracias por celebrar conmigo",
  },

  locations: [
    {
      label: "Misa",
      name: "Parroquia San Rafael",
      address: "San Rafael, Heredia",
      mapsUrl: "https://maps.google.com/?q=Parroquia+San+Rafael,+Heredia,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Parroquia%20San%20Rafael%20Heredia",
    },
    {
      label: "Recepción",
      name: "Salón Las Magnolias",
      address: "Santa Bárbara, Heredia",
      time: "19:00",
      mapsUrl: "https://maps.google.com/?q=Santa+B%C3%A1rbara,+Heredia,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Santa%20Barbara%20Heredia",
    },
  ],

  schedule: {
    eyebrow: "Programa",
    title: "Así será la noche",
    items: [
      { time: "17:00", title: "Misa de acción de gracias" },
      { time: "19:00", title: "Recepción", description: "Bienvenida y fotos" },
      { time: "19:45", title: "Vals", description: "Con papá y los chambelanes" },
      { time: "20:30", title: "Brindis y cena" },
      { time: "21:30", title: "¡A bailar!" },
    ],
  },

  details: {
    eyebrow: "Detalles",
    title: "Antes de la fiesta",
    notice: {
      label: "Importante",
      title: "Te pido llegar *puntual* a la misa.",
      body: "La entrada al salón será a partir de las *7:00 p. m.*",
    },
    dressCode: {
      title: "Formal",
      description: "Vestido largo o de cóctel; traje o saco y corbata.",
      avoidLabel: "Color reservado para la quinceañera",
      avoidColors: [{ name: "Lila", hex: "#c8b4ea" }],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Lluvia de sobres",
    message:
      "Tu compañía es mi mejor regalo. Si deseas tener un detalle conmigo, habrá una cajita para sobres en la recepción, o puedes hacerlo por:",
    method: "SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "Confirmación",
    title: "¿Me acompañas?",
    deadline: "2027-07-31",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 6,
    allowDecline: true,
  },

  gallery: { eyebrow: "Recuerdos", title: "Momentos que me trajeron hasta aquí" },

  closingQuote: { text: "Gracias por ser parte de mi historia." },

  footer: { message: "Te espero para celebrar" },

  music: {
    src: "/audio/demo/chopin-vals-op69-1.mp3",
    title: "Vals op. 69 n.º 1",
    artist: "Frédéric Chopin",
    credit: "Grabación de Musopen, dedicada al dominio público (CC0, vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/aurora/portada.jpg", alt: "Mariana", position: "50% 30%" },
    historia: { src: "/plantillas/aurora/historia.jpg", alt: "Mariana", position: "50% 30%" },
    galeria1: { src: "/plantillas/aurora/galeria-1.jpg", alt: "Mariana", position: "50% 30%" },
    galeria2: { src: "/plantillas/aurora/galeria-2.jpg", alt: "Mariana", position: "50% 40%" },
    galeria3: { src: "/plantillas/aurora/galeria-3.jpg", alt: "Mariana", position: "50% 40%" },
    galeria4: { src: "/plantillas/aurora/galeria-4.jpg", alt: "Mariana", position: "50% 40%" },
    cierre: { src: "/plantillas/aurora/cierre.jpg", alt: "Mariana", position: "50% 40%" },
  },
};
