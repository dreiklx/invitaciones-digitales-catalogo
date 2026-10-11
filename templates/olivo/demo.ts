// Demo del diseño 01 · Olivo: Don Ramón y Doña Florinda, con las fotos de
// la carpeta "fotos plantilla olivo" que aportó el dueño (copias web en
// public/plantillas/olivo/fotos/). Reproducen personajes de una serie de
// TV: derechos de imagen y de los personajes PENDIENTES DE AUTORIZACIÓN
// (ver photo-map.md). Estos datos nunca se copian a una invitación nueva:
// `npm run nueva -- olivo` deja los nombres y los `alt` en "REEMPLAZAR".

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
  couple: { partnerOne: "Don Ramón", partnerTwo: "Doña Florinda" },
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
    portada: { src: "/plantillas/olivo/fotos/abrazo.jpg", alt: "Don Ramón y Doña Florinda abrazados en el patio", position: "54% 12%" },
    historia: { src: "/plantillas/olivo/fotos/propuesta.jpg", alt: "Don Ramón, de rodillas, le propone matrimonio a Doña Florinda", position: "50% 45%" },
    retrato: { src: "/plantillas/olivo/fotos/rosa.jpg", alt: "Don Ramón le lanza una rosa a Doña Florinda", position: "50% 40%" },
    galeria1: { src: "/plantillas/olivo/fotos/anillo-vertical.jpg", alt: "Doña Florinda enseña el anillo junto a Don Ramón", position: "50% 28%" },
    galeria2: { src: "/plantillas/olivo/fotos/patio.jpg", alt: "Don Ramón le ofrece una rosa a Doña Florinda", position: "50% 30%" },
    galeria3: { src: "/plantillas/olivo/fotos/sentados.jpg", alt: "Don Ramón y Doña Florinda sentados en el patio, felices", position: "50% 35%" },
    galeria4: { src: "/plantillas/olivo/fotos/anillo-horizontal.jpg", alt: "Doña Florinda enseña el anillo y Don Ramón celebra", position: "50% 30%" },
  },
};
