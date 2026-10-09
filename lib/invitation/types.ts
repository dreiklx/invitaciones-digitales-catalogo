// Forma de los datos de una invitación. Los valores de cada cliente viven en
// `config/invitation.ts`; los de las demos del catálogo en
// `templates/<diseño>/demo.ts`. Este archivo solo describe qué campos existen.
// Un campo `| null` es una sección opcional: con `null` no se muestra.

// ─── Diseños disponibles ─────────────────────────────────────────────────

// Bodas: celebra una pareja (`couple`).
export type WeddingTemplateId = "olivo" | "tierra" | "gala" | "riviera" | "borgona";
// Quinceaños y cumpleaños: celebra una persona (`honoree`).
export type HonoreeTemplateId = "aurora" | "nube";
export type TemplateId = WeddingTemplateId | HonoreeTemplateId;

// Tipo de celebración de cada diseño (catálogo y textos armados).
export type EventKind = "boda" | "quinceanos" | "cumpleanos-infantil";

// Espacios de fotografía de cada diseño. Cada uno tiene una proporción fija
// (ver `templates/<diseño>/meta.ts` y `docs/templates/`).
export type PhotoSlots = {
  olivo:
    | "portada"
    | "historia"
    | "cuentaRegresiva"
    | "regalos"
    | "galeria1"
    | "galeria2"
    | "galeria3"
    | "galeria4"
    | "cierre";
  tierra: "portada" | "historia" | "retrato" | "galeria1" | "galeria2" | "galeria3" | "galeria4" | "cierre";
  gala: "portada" | "historia" | "galeria1" | "galeria2" | "galeria3" | "galeria4";
  riviera: "portada" | "historia" | "galeria1" | "galeria2" | "galeria3" | "galeria4";
  borgona: "portada" | "historia" | "galeria1" | "galeria2" | "galeria3";
  aurora: "portada" | "historia" | "galeria1" | "galeria2" | "galeria3" | "galeria4" | "cierre";
  nube: "portada" | "historia" | "galeria1" | "galeria2" | "galeria3" | "galeria4";
};

// ─── Piezas ──────────────────────────────────────────────────────────────

export type Photo = {
  // Ruta pública, p. ej. "/images/portada.jpg" (archivo en public/images/).
  src: string;
  // Descripción para lectores de pantalla ("Ana y Luis frente al mar").
  alt: string;
  // Punto que se mantiene visible al recortar (CSS object-position).
  // Ajustarlo a donde están los rostros. Por defecto "50% 50%".
  position?: string;
};

export type Quote = {
  text: string;
  // Autor, referencia bíblica ("Colosenses 3:14") o fuente. Opcional.
  reference?: string;
  // "verse" = pasaje bíblico: el diseño lo presenta como tal (sin comillas,
  // con la referencia y la traducción). Por defecto "quote" (cita o frase).
  kind?: "quote" | "verse";
  // Traducción del versículo, se muestra junto a la referencia. Usar una de
  // dominio público (p. ej. "Reina-Valera 1909") o una cuya licencia permita
  // este uso (ver README, "Versículos").
  translation?: string;
  // Alineación del bloque; por defecto la del diseño.
  align?: "center" | "start";
};

// Colores de un diseño. Cada diseño trae su paleta predeterminada (en su
// `meta.ts`); `colors` en la configuración reemplaza solo los que se indiquen.
// Qué hace cada color en cada diseño: `docs/templates/<diseño>.md`.
export type Palette = {
  // Fondo principal de la página.
  background: string;
  // Fondo alterno (secciones, tarjetas).
  surface: string;
  // Texto principal.
  text: string;
  // Texto secundario.
  textMuted: string;
  // Color principal del diseño (bloques de color, títulos fuertes).
  primary: string;
  // Texto sobre `primary`.
  onPrimary: string;
  // Color secundario (ornamentos, líneas, detalles).
  secondary: string;
  // Acento (botón de confirmar, avisos importantes).
  accent: string;
  // Texto sobre `accent`.
  onAccent: string;
  // Bordes finos.
  line: string;
};

export type Location = {
  // "Ceremonia", "Recepción"… Útil cuando hay más de un lugar.
  label?: string;
  name: string;
  address: string;
  // Hora de este lugar en formato 24 h ("18:00"). Sin ella se usa la hora
  // principal del evento para el primer lugar.
  time?: string;
  // Enlace "Compartir" de Google Maps.
  mapsUrl: string;
  // Enlace de Waze (opcional).
  wazeUrl?: string;
};

// Pareja (bodas), en el orden en que se muestra ("Uno & Dos").
export type Couple = {
  partnerOne: string;
  partnerTwo: string;
};

// Persona que celebra (quinceaños, cumpleaños).
export type Honoree = {
  // Nombre como se muestra en grande ("Mariana", "Mateo").
  name: string;
  // Años que cumple (15 en quinceaños, 1 en un primer cumpleaños).
  age: number;
  // Texto de la edad si no son años cumplidos ("6 meses"). Si falta:
  // "1 año", "2 años"…
  ageLabel?: string;
};

// ─── Contenido común a todos los diseños ─────────────────────────────────

export type InvitationContent = {
  site: {
    // URL pública final, sin "/" al final. Vista previa al compartir y calendario.
    url: string;
    // Título de la pestaña y de la vista previa. Si falta: "Ana & Luis — fecha".
    title?: string;
    // Si falta, se arma con el evento, la fecha y el primer lugar.
    description?: string;
    // Idioma y formato de fechas ("es-CR").
    locale: string;
    // Zona horaria del evento ("America/Costa_Rica"). La hora de `time` se
    // interpreta en esta zona: no hay que escribir el desfase a mano.
    timeZone: string;
  };

  // Cómo se nombra el evento en títulos, calendario y mensajes de WhatsApp:
  // "Boda de Ana y Luis", "confirmar mi asistencia a la boda…",
  // "la fiesta de quince años de Mariana", "el primer cumpleaños de Mateo".
  event: {
    name: string; // "boda", "fiesta de quince años", "primer cumpleaños"
    article: "la" | "el";
  };

  // Quién celebra: `couple` en las bodas, `honoree` en quinceaños y
  // cumpleaños (ver InvitationOf, más abajo).

  // Fecha y hora de inicio (hora local del evento, 24 h).
  date: string; // "2027-04-17"
  time: string; // "16:00"
  // Duración aproximada en horas: fin del evento en el calendario y momento
  // en que la invitación pasa a "después del evento".
  durationHours: number;

  // Cambios a la paleta del diseño. Solo los colores que se quieran cambiar.
  colors?: Partial<Palette>;

  // Portada "Abrir invitación" (existe por el audio: ver PROJECT-CONTEXT.md).
  welcome: {
    eyebrow: string;
    buttonLabel: string;
  };

  hero: {
    eyebrow: string;
  };

  openingQuote: Quote | null;

  // Foto de la pareja con pie y cita breve (la foto es el espacio "historia").
  story: {
    caption?: string;
    quote?: Quote;
  } | null;

  // Padres, padrinos u otras personas que la pareja quiere nombrar.
  family: {
    intro: string;
    groups: { label: string; names: string[] }[];
  } | null;

  countdown: {
    eyebrow: string;
    title: string;
    // Desde la hora de inicio hasta el fin del evento.
    todayMessage: string;
    // Después del evento (en lugar de los números).
    afterMessage: string;
  };

  // Uno o más lugares (ceremonia, recepción…).
  locations: Location[];

  // Programa del día (vals, brindis, pastel…). Opcional: solo lo muestran
  // los diseños que tienen esa sección (hoy Aurora y Nube).
  schedule?: {
    eyebrow: string;
    title: string;
    // Hora en formato 24 h ("19:30").
    items: { time: string; title: string; description?: string }[];
  } | null;

  details: {
    eyebrow: string;
    title: string;
    // En `title` y `body`, el texto entre *asteriscos* se resalta.
    notice: {
      label: string;
      title: string;
      body?: string;
      note?: string;
    } | null;
    dressCode: {
      title: string;
      description?: string;
      avoidLabel?: string;
      // Colores que no se deben usar; `hex` es el color de la muestra.
      avoidColors: { name: string; hex: string }[];
      notice?: string;
    } | null;
  } | null;

  gifts: {
    eyebrow: string;
    title: string;
    message: string;
    // "SINPE Móvil", "Transferencia (IBAN)".
    method?: string;
    // Número o cuenta que se copia con un botón.
    value?: string;
    copyLabel?: string;
    copiedLabel?: string;
    link?: { label: string; url: string };
  } | null;

  rsvp: {
    eyebrow: string;
    title: string;
    // Fecha límite para confirmar ("2027-03-01"). Se muestra formateada y,
    // pasada esa fecha, el formulario se reemplaza por un aviso.
    deadline?: string;
    // Número que recibe las confirmaciones: código de país + número, sin
    // espacios ni "+" ("50688887777").
    whatsappNumber: string;
    // Cómo se muestra el número. Si falta, se arma solo ("8888 7777").
    phoneDisplay?: string;
    // "¿De parte de quién recibiste la invitación?". Sin definir = los dos
    // nombres de la pareja; [] = no se pregunta.
    referrerOptions?: string[];
    minGroupSize: number;
    maxGroupSize: number;
    // Muestra "¿No podrás asistir? Avísanos aquí".
    allowDecline: boolean;
  } | null;

  gallery: {
    eyebrow: string;
    title: string;
  } | null;

  closingQuote: Quote | null;

  footer: {
    message: string;
  };

  // Música de fondo (opcional): suena solo cuando el invitado toca el
  // reproductor. `null` = sin reproductor. Solo audio con licencia para uso
  // en una web (ver README, "Música").
  music: {
    // Archivo en public/audio/, p. ej. "/audio/cancion.mp3".
    src: string;
    title: string;
    // Compositor o intérprete.
    artist?: string;
    // Atribución o licencia que se muestra en el pie (obligatoria si la
    // licencia la exige, p. ej. CC BY).
    credit?: string;
    // Estilo del reproductor; por defecto el del diseño (`musicPlayer` en
    // su meta.ts).
    player?: MusicPlayerStyle;
  } | null;
};

// Una invitación = contenido común + quién celebra + diseño elegido + sus fotos.
export type InvitationOf<T extends TemplateId> = InvitationContent &
  (T extends WeddingTemplateId ? { couple: Couple } : { honoree: Honoree }) & {
    template: T;
    photos: Record<PhotoSlots[T], Photo>;
  };

export type Invitation = { [T in TemplateId]: InvitationOf<T> }[TemplateId];

// ─── Descripción de un diseño (templates/<diseño>/meta.ts) ───────────────

export type PhotoSlotSpec = {
  // Proporción ancho:alto del marco, igual en teléfono y escritorio.
  ratio: [number, number];
  // Dónde aparece.
  where: string;
  // Recorte sugerido.
  position?: string;
};

// Presentaciones del reproductor de música (templates/shared/players.tsx).
// Cada diseño trae la suya; `music.player` la reemplaza.
export type MusicPlayerStyle = "rama" | "ficha" | "deco" | "sello" | "etiqueta" | "destello" | "globo";

export type TemplateMeta<T extends TemplateId = TemplateId> = {
  id: T;
  number: string; // "01"
  name: string;
  kind: EventKind;
  // Una línea para el catálogo.
  concept: string;
  // Tres rasgos que distinguen al diseño (catálogo).
  highlights: [string, string, string];
  palette: Palette;
  // Familias de Google Fonts (también para la tarjeta al compartir).
  fonts: { display: string; body: string };
  photoSlots: Record<PhotoSlots[T], PhotoSlotSpec>;
  // Reproductor de música del diseño.
  musicPlayer: MusicPlayerStyle;
};
