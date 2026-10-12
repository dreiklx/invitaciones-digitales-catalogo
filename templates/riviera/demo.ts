// Demo del diseño 08 · Riviera (renovación de votos ficticia de Elena y
// Tomás por sus diez años de casados). También es el punto de partida de
// una invitación nueva: `npm run nueva -- riviera`. Guía:
// docs/templates/08-riviera.md.
// Fotos: una sola sesión de pareja de stock en un olivar (Pexels; licencia
// de Pexels) en public/plantillas/riviera/fotos/. Fuentes: photo-map.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"riviera"> = {
  template: "riviera",

  site: {
    url: `${catalog.url}/plantillas/riviera`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  // Aniversario sin renovación: { name: "aniversario de bodas", article: "el" }.
  event: { name: "renovación de votos", article: "la" },
  couple: { partnerOne: "Elena", partnerTwo: "Tomás" },
  date: "2027-09-18",
  time: "17:00",
  durationHours: 6,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { primary: "#2e6f5e" },

  welcome: { eyebrow: "Diez años juntos", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Renovamos nuestros votos", title: "Diez años después" },

  openingQuote: {
    text: "Diez años después, volveríamos a decir que sí. Y queremos hacerlo con ustedes.",
    reference: "Elena y Tomás",
  },

  story: {
    caption: "Nos casamos un domingo de septiembre, entre olivos y con muy pocos invitados. Diez años, dos mudanzas y muchas sobremesas después, queremos celebrarlo en grande.",
    quote: { text: "Lo mejor de nuestra historia es que la seguimos escribiendo juntos." },
  },

  family: {
    intro: "Con el cariño de",
    groups: [
      { label: "Nuestros hijos", names: ["Lucía Arce Montero", "Mateo Arce Montero"] },
      { label: "Padrinos de la renovación", names: ["Gabriela Montero Solís", "Ricardo Arce Brenes"] },
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
      label: "Renovación de votos",
      name: "Quinta El Limonar",
      address: "Santa Ana, San José",
      mapsUrl: "https://maps.google.com/?q=Santa+Ana,+San+Jos%C3%A9,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Santa%20Ana%20San%20Jose",
    },
    {
      label: "Cena",
      name: "Terraza El Limonar",
      address: "Santa Ana, San José",
      time: "18:30",
      mapsUrl: "https://maps.google.com/?q=Santa+Ana,+San+Jos%C3%A9,+Costa+Rica",
    },
  ],

  details: {
    eyebrow: "Para que disfrutes",
    title: "Antes de venir",
    notice: {
      label: "Un detalle",
      title: "Trae *una foto* de estos diez años.",
      body: "Armaremos un mural con las fotos de todos durante la cena.",
    },
    dressCode: {
      title: "Formal de verano",
      description: "Colores claros y telas frescas: la ceremonia será al aire libre, al atardecer.",
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
    deadline: "2027-09-01",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 6,
    allowDecline: true,
  },

  gallery: { eyebrow: "Postales", title: "Diez años de días de sol" },

  closingQuote: { text: "Gracias por ser parte de nuestra historia." },

  footer: { message: "Te esperamos" },

  music: {
    src: "/audio/demo/satie-gymnopedie-1.mp3",
    title: "Gymnopédie n.º 1",
    artist: "Erik Satie · Robin Alciatore",
    credit: "Grabación de dominio público (Musopen, vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/riviera/fotos/en-el-pasto.jpg", alt: "Elena y Tomás recostados en el pasto, sonriendo", position: "50% 40%" },
    historia: { src: "/plantillas/riviera/fotos/abrazo-olivar.jpg", alt: "Tomás abraza a Elena entre los olivos", position: "50% 20%" },
    galeria1: { src: "/plantillas/riviera/fotos/caminata-olivar.jpg", alt: "Elena y Tomás caminan por el olivar", position: "50% 30%" },
    galeria2: { src: "/plantillas/riviera/fotos/retrato-novia.jpg", alt: "Retrato de Elena sonriendo con el pelo al viento", position: "40% 40%" },
    galeria3: { src: "/plantillas/riviera/fotos/manos.jpg", alt: "Las manos de Elena y Tomás con sus anillos", position: "50% 50%" },
    galeria4: { src: "/plantillas/riviera/fotos/en-brazos.jpg", alt: "Tomás lleva a Elena en brazos por la colina", position: "45% 40%" },
  },
};
