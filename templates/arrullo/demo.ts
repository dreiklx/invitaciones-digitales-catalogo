// Demo del diseño 06 · Arrullo (baby shower ficticio de Natalia y Joaquín;
// el nombre del bebé no se muestra). También es el punto de partida de una
// invitación nueva: `npm run nueva -- arrullo`. Guía: docs/templates/06-arrullo.md.
// Fotos: una sola sesión de baby shower de stock (Pexels; licencia de
// Pexels) en public/plantillas/arrullo/fotos/. Fuentes: photo-map.md.

import type { InvitationOf } from "@/lib/invitation/types";
import { catalog } from "@/config/catalog";

export const demo: InvitationOf<"arrullo"> = {
  template: "arrullo",

  site: {
    url: `${catalog.url}/plantillas/arrullo`,
    locale: "es-CR",
    timeZone: "America/Costa_Rica",
  },
  event: { name: "baby shower", article: "el" },
  // Nombre del bebé opcional: agregar `babyName: "…"` dentro de `shower`
  // solo si la familia quiere mostrarlo (sin él, la portada usa hero.title).
  shower: { parents: ["Natalia", "Joaquín"] },
  date: "2027-05-15",
  time: "15:00",
  durationHours: 4,

  // Solo los colores que se quieran cambiar de la paleta del diseño, p. ej.:
  // colors: { primary: "#6b7fa8" },

  welcome: { eyebrow: "Baby shower", buttonLabel: "Abrir invitación" },
  hero: { eyebrow: "Baby shower", title: "Un bebé en camino" },

  openingQuote: {
    text: "Nuestra familia está por crecer, y queremos celebrarlo con las personas que más queremos.",
    reference: "Natalia y Joaquín",
  },

  story: {
    caption: "Faltan pocas semanas para conocer a nuestro bebé. Mientras tanto, queremos llenar esta espera de abrazos, risas y buenos deseos.",
    quote: { text: "El amor más grande llega en tamaño pequeño." },
  },

  family: {
    intro: "Con el cariño de",
    groups: [
      { label: "Futuros abuelos", names: ["Lorena Campos Ruiz", "Héctor Méndez Araya", "Silvia Ortiz Leiva"] },
      { label: "Padrinos", names: ["Karla Méndez Campos", "Federico Ortiz Leiva"] },
    ],
  },

  countdown: {
    eyebrow: "Falta poco",
    title: "Contamos los días",
    todayMessage: "¡Hoy celebramos!",
    afterMessage: "Gracias por acompañarnos",
  },

  locations: [
    {
      label: "Celebración",
      name: "Jardín Los Robles",
      address: "San Pablo, Heredia",
      mapsUrl: "https://maps.google.com/?q=San+Pablo,+Heredia,+Costa+Rica",
      wazeUrl: "https://waze.com/ul?q=San%20Pablo%20Heredia",
    },
  ],

  details: {
    eyebrow: "Detalles",
    title: "Para que lo sepas",
    notice: {
      label: "Una sorpresa",
      title: "Trae *un mensaje escrito* para el bebé.",
      body: "Lo guardaremos en una caja para que lo lea cuando crezca.",
    },
    dressCode: {
      title: "Cómodo y casual",
      description: "Será al aire libre, en un jardín: ven como te sientas a gusto.",
      avoidColors: [],
    },
  },

  gifts: {
    eyebrow: "Regalos",
    title: "Lista de regalos",
    message: "Tu compañía es lo más importante. Si quieres traer un detalle, preparamos una lista con lo que el bebé va a necesitar:",
    link: { label: "Ver la lista de regalos", url: "https://example.com/lista-de-regalos" },
    method: "También por SINPE Móvil",
    value: "8888 0000",
    copyLabel: "Copiar número",
    copiedLabel: "Número copiado",
  },

  rsvp: {
    eyebrow: "Confirmación",
    title: "¿Nos acompañas?",
    deadline: "2027-05-01",
    whatsappNumber: "50600000000",
    minGroupSize: 2,
    maxGroupSize: 5,
    allowDecline: true,
  },

  gallery: { eyebrow: "Detalles del día", title: "Todo listo para recibirte" },

  closingQuote: { text: "Te esperamos con los brazos abiertos." },

  footer: { message: "Con cariño" },

  music: {
    src: "/audio/demo/satie-gymnopedie-1.mp3",
    title: "Gymnopédie n.º 1",
    artist: "Erik Satie · Robin Alciatore",
    credit: "Grabación de dominio público (Musopen, vía Wikimedia Commons)",
  },

  photos: {
    portada: { src: "/plantillas/arrullo/fotos/futuros-padres.jpg", alt: "Natalia y Joaquín junto a la torta de ositos", position: "50% 25%" },
    historia: { src: "/plantillas/arrullo/fotos/beso-en-la-frente.jpg", alt: "Joaquín le da un beso a Natalia", position: "50% 30%" },
    galeria1: { src: "/plantillas/arrullo/fotos/mesa-dulce.jpg", alt: "Mesa de dulces con flores blancas y ositos", position: "50% 40%" },
    galeria2: { src: "/plantillas/arrullo/fotos/ositos.jpg", alt: "Tres ositos de azúcar sobre un plato", position: "50% 50%" },
    galeria3: { src: "/plantillas/arrullo/fotos/oso-de-peluche.jpg", alt: "Un oso de peluche blanco entre flores", position: "50% 40%" },
    galeria4: { src: "/plantillas/arrullo/fotos/mesa-de-postres.jpg", alt: "Postres y flores de la celebración", position: "50% 50%" },
  },
};
