// Demo del diseño 02 · Tierra (pareja ficticia). También es el punto de
// partida de una invitación nueva: `npm run nueva -- tierra`.
// Guía: docs/templates/02-tierra.md.
// Fotos: una sola sesión de pareja de stock (Pexels, Alexander Mass /
// Reborn Filmes; licencia de Pexels) en public/plantillas/tierra/fotos/,
// recortada a la proporción de cada marco. Fuentes: photo-map.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"tierra"> = {
  template: "tierra",

  site: {
    url: `${catalog.url}/plantillas/tierra`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "boda", article: "la" },
  couple: { partnerOne: "Camila", partnerTwo: "Diego" },
  date: "2027-05-22",
  time: "15:30",
  durationHours: 7,

  welcome: { eyebrow: "Una invitación para ti", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Nos casamos" },

  openingQuote: {
    kind: "verse",
    text: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.",
    reference: "Cantares 8:7",
    translation: "Reina-Valera 1909",
  },

  story: {
    caption:
      "Nos conocimos una tarde de lluvia en Atenas y desde entonces cada camino nos ha llevado al mismo lugar. Queremos celebrar este nuevo comienzo con las personas que más queremos.",
    quote: { text: "El amor no se busca; se reconoce.", reference: "Camila y Diego" },
  },

  family: {
    intro: "Con la bendición de nuestras familias",
    groups: [
      { label: "Padres de la novia", names: ["Mariela Chaves Ulate", "Óscar Herrera Mena"] },
      { label: "Padres del novio", names: ["Ana Lucía Vega Soto", "Jorge Alfaro Campos"] },
      { label: "Padrinos", names: ["Daniela Herrera Chaves", "Pablo Alfaro Vega"] },
    ],
  },

  countdown: {
    eyebrow: "Cuenta regresiva",
    title: "El día",
    todayMessage: "Hoy celebramos juntos",
    afterMessage: "Gracias por ser parte de nuestra historia",
  },

  locations: [
    {
      label: "Ceremonia",
      name: "Capilla del Bosque",
      address: "Finca La Tierra Roja, Atenas, Alajuela",
      mapsUrl: "https://maps.google.com/?q=Atenas,+Alajuela,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=Atenas%20Alajuela%20Costa%20Rica",
    },
    {
      label: "Recepción",
      name: "Terraza de la Finca",
      address: "Finca La Tierra Roja, Atenas, Alajuela",
      time: "17:30",
      mapsUrl: "https://maps.google.com/?q=Atenas,+Alajuela,+Costa+Rica",
    },
  ],

  details: {
    eyebrow: "Capítulo III",
    title: "Detalles",
    notice: {
      label: "Ten en cuenta",
      title: "La ceremonia será *al aire libre*.",
      body: "Recomendamos *zapatos cómodos* para caminar sobre zacate y llevar un abrigo ligero para la noche.",
    },
    dressCode: {
      title: "Formal de campo",
      description: "Tonos tierra, lino y telas ligeras.",
      avoidLabel: "Por favor evita",
      avoidColors: [
        { name: "Blanco", hex: "#ffffff" },
        { name: "Terracota", hex: "#9a4b2b" },
      ],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Lo más valioso es su compañía",
    message: "Si desean hacernos un obsequio, les agradeceríamos un aporte para nuestra luna de miel.",
    method: "Transferencia (IBAN)",
    value: "CR05 0152 0200 1026 2840 66",
    copyLabel: "Copiar cuenta",
    copiedLabel: "Cuenta copiada",
  },

  rsvp: {
    eyebrow: "R.S.V.P.",
    title: "Confirma tu asistencia",
    deadline: "2027-04-30",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 8,
    allowDecline: true,
  },

  gallery: { eyebrow: "Capítulo II", title: "Nosotros" },

  closingQuote: { text: "Y al final, lo que importa es con quién compartimos el camino.", reference: "Camila y Diego" },

  footer: { message: "Los esperamos" },

  music: {
    src: "/audio/demo/satie-gymnopedie-1.mp3",
    title: "Gymnopédie n.º 1",
    artist: "Erik Satie · Robin Alciatore",
    credit: "Grabación de dominio público (Musopen, vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/tierra/fotos/abrazo-flores.jpg", alt: "Camila y Diego abrazados entre flores silvestres", position: "50% 40%" },
    historia: { src: "/plantillas/tierra/fotos/beso.jpg", alt: "Diego besa a Camila en el campo", position: "50% 45%" },
    retrato: { src: "/plantillas/tierra/fotos/abrazo-atardecer.jpg", alt: "Camila y Diego se abrazan riendo al atardecer", position: "50% 35%" },
    galeria1: { src: "/plantillas/tierra/fotos/caminata.jpg", alt: "Camila y Diego caminan de la mano por la colina", position: "50% 50%" },
    galeria2: { src: "/plantillas/tierra/fotos/detalle-vestido.jpg", alt: "Detalle del vestido de Camila y sus manos unidas", position: "50% 40%" },
    galeria3: { src: "/plantillas/tierra/fotos/lago.jpg", alt: "Diego levanta a Camila a la orilla del lago", position: "55% 50%" },
    galeria4: { src: "/plantillas/tierra/fotos/horizonte.jpg", alt: "Camila y Diego en el horizonte al atardecer", position: "50% 60%" },
    cierre: { src: "/plantillas/tierra/fotos/baile-atardecer.jpg", alt: "Camila y Diego toman sus manos al atardecer", position: "50% 50%" },
  },
};
