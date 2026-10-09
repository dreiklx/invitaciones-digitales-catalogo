// Demo del diseño 03 · Gala (pareja ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- gala`.
// Guía: docs/templates/03-gala.md.
// Fotos: una sola sesión de boda de stock (Pexels, Li Chunyu; licencia de
// Pexels) en public/plantillas/gala/fotos/, recortada a la proporción de
// cada marco. Fuentes: photo-map.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"gala"> = {
  template: "gala",

  site: {
    url: `${catalog.url}/plantillas/gala`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "boda", article: "la" },
  couple: { partnerOne: "Isabella", partnerTwo: "Sebastián" },
  date: "2027-11-13",
  time: "19:00",
  durationHours: 6,

  welcome: { eyebrow: "Tienen el honor de invitarle", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Celebremos juntos" },

  openingQuote: {
    kind: "verse",
    text: "Así que, no son ya más dos, sino una carne: por tanto, lo que Dios juntó, no lo aparte el hombre.",
    reference: "Mateo 19:6",
    translation: "Reina-Valera 1909",
  },

  story: {
    caption: "Una noche para celebrar el amor, la familia y los amigos que nos han acompañado.",
  },

  family: {
    intro: "Con la bendición de nuestros padres",
    groups: [
      { label: "Padres de la novia", names: ["Gabriela Montero Sáenz", "Federico Arias Lobo"] },
      { label: "Padres del novio", names: ["Carolina Pacheco Ruiz", "Mauricio Salas Ortiz"] },
    ],
  },

  countdown: {
    eyebrow: "La cuenta regresiva",
    title: "Hasta la gran noche",
    todayMessage: "Esta noche celebramos",
    afterMessage: "Gracias por una noche inolvidable",
  },

  locations: [
    {
      label: "Ceremonia",
      name: "Catedral Metropolitana",
      address: "Avenida 2, San José centro",
      mapsUrl: "https://maps.google.com/?q=Catedral+Metropolitana+San+Jos%C3%A9+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Catedral%20Metropolitana%20San%20Jose",
    },
    {
      label: "Recepción",
      name: "Salón Imperial",
      address: "Hotel Aurelia, Escazú, San José",
      time: "20:30",
      mapsUrl: "https://maps.google.com/?q=Escaz%C3%BA,+San+Jos%C3%A9,+Costa+Rica",
    },
  ],

  details: {
    eyebrow: "Protocolo",
    title: "Detalles de la noche",
    notice: {
      label: "Aviso",
      title: "Evento *solo para adultos*.",
      body: "Agradecemos su *puntualidad*: la ceremonia iniciará a la hora indicada.",
    },
    dressCode: {
      title: "Etiqueta rigurosa",
      description: "Caballeros de esmoquin o traje oscuro; damas de vestido largo.",
      avoidLabel: "Colores reservados",
      avoidColors: [
        { name: "Blanco", hex: "#ffffff" },
        { name: "Dorado", hex: "#c9a45c" },
      ],
    },
  },

  gifts: {
    eyebrow: "Obsequios",
    title: "Su presencia es nuestro regalo",
    message: "Si desean honrarnos con un obsequio, pueden encontrar nuestra mesa de regalos aquí:",
    link: { label: "Ver mesa de regalos", url: "https://example.com/mesa-de-regalos" },
  },

  rsvp: {
    eyebrow: "R.S.V.P.",
    title: "Confirme su asistencia",
    deadline: "2027-10-15",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 6,
    allowDecline: true,
  },

  gallery: { eyebrow: "Retratos", title: "Isabella & Sebastián" },

  closingQuote: { text: "Dos almas con un solo pensamiento; dos corazones que laten como uno.", reference: "John Keats" },

  footer: { message: "Les esperamos" },

  music: {
    src: "/audio/demo/debussy-clair-de-lune.mp3",
    title: "Clair de lune",
    artist: "Claude Debussy · Laurens Goedhart",
    credit: "Grabación de dominio público (vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/gala/fotos/retrato-ramo.jpg", alt: "Sebastián besa la mejilla de Isabella bajo una lámpara de araña", position: "50% 35%" },
    historia: { src: "/plantillas/gala/fotos/abrazo-petalos.jpg", alt: "Isabella y Sebastián se abrazan entre pétalos en el salón", position: "50% 45%" },
    galeria1: { src: "/plantillas/gala/fotos/abrazo-risas.jpg", alt: "Isabella abraza a Sebastián riendo", position: "50% 30%" },
    galeria2: { src: "/plantillas/gala/fotos/mirada-salon.jpg", alt: "Isabella mira atrás mientras camina de la mano de Sebastián", position: "50% 35%" },
    galeria3: { src: "/plantillas/gala/fotos/baile-escalera.jpg", alt: "Isabella y Sebastián bailan junto a la escalera", position: "50% 45%" },
    galeria4: { src: "/plantillas/gala/fotos/sofa-camara.jpg", alt: "Isabella y Sebastián miran juntos las fotos en el sofá", position: "50% 30%" },
  },
};
