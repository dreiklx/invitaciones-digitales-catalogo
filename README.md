# Invitaciones digitales — catálogo de diseños

Proyecto interno para producir invitaciones digitales de bodas,
quinceaños y cumpleaños. Contiene **siete diseños** distintos (cinco de
boda, uno de quinceaños y uno de cumpleaños infantil) que comparten las
mismas funciones (portada,
cuenta regresiva, lugares con Maps/Waze, calendario, aviso, vestimenta,
regalos, galería, música, confirmación por WhatsApp…) y un **catálogo**
público para mostrarlos. No es un CMS ni un SaaS: nosotros editamos los
datos y desplegamos una copia por cliente.

Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, en
Vercel. Sin base de datos ni variables de entorno.

Contexto, arquitectura y decisiones: `PROJECT-CONTEXT.md`. Historial:
`project-log.md`. Cada diseño: `docs/templates/`. Fotos: `photo-map.md`.

## Los diseños

| N.º | Id | Nombre | Evento | Concepto | Guía |
|---|---|---|---|---|---|
| 01 | `olivo` | Olivo | Boda | Botánico y cálido (diseño original) | `docs/templates/01-olivo.md` |
| 02 | `tierra` | Tierra | Boda | Editorial de revista, café y arcilla | `docs/templates/02-tierra.md` |
| 03 | `gala` | Gala | Boda | Noche de etiqueta, negro/dorado/plata | `docs/templates/03-gala.md` |
| 04 | `riviera` | Riviera | Boda | Mediterráneo: cobalto, porcelana, limón | `docs/templates/04-riviera.md` |
| 05 | `borgona` | Borgoña | Boda | Contemporáneo y tipográfico: vino y rosa | `docs/templates/05-borgona.md` |
| 06 | `aurora` | Aurora | Quinceaños | Lila, violeta y rosa cuarzo, con destellos | `docs/templates/06-aurora.md` |
| 07 | `nube` | Nube | Cumpleaños de bebé / infantil | Crema, celeste empolvado y amarillo mantequilla | `docs/templates/07-nube.md` |

**Quién celebra:** las bodas usan `couple` (dos nombres); Aurora y Nube
usan `honoree` (`name`, `age` y opcional `ageLabel`, p. ej. "6 meses").
Aurora y Nube muestran además el **programa** del evento (`schedule`:
vals, brindis, pastel…), que es opcional y las bodas ignoran.

## Dos modos del mismo proyecto

`config/invitation.ts` decide qué se publica:

- `export const invitation: Invitation | null = null;` → **catálogo**:
  `/` muestra los diseños y `/plantillas/<id>` cada demo.
- Con los datos de una invitación → **invitación**: `/` muestra su invitación
  con el diseño elegido; las demás demos dan 404.

## Ver el catálogo localmente

```bash
npm install
npm run dev            # http://localhost:3000
```

## Crear una invitación nueva

1. **Copiar el proyecto** a una carpeta nueva (`invitacion-ana-luis`),
   **sin `.git`**, `node_modules`, `.next`, `.vercel` ni `_anterior`. Si se
   usa git: `git init` nuevo.
2. `npm install`
3. **Elegir el diseño** y crear el archivo de datos:
   ```bash
   npm run nueva -- riviera     # olivo | tierra | gala | riviera | borgona | aurora | nube
   ```
   Copia la demo de ese diseño a `config/invitation.ts`, con las fotos
   apuntando a `public/images/<espacio>.jpg` (`galeria1` → `galeria-1.jpg`).
   Los nombres de la pareja y los textos alternativos de las fotos quedan
   en "REEMPLAZAR" (nunca se heredan de la demo: la de Olivo es Ramón y
   Florinda).
4. **Editar `config/invitation.ts`**: nombres (`couple` o `honoree`), `date`/`time`, lugares
   (enlaces "Compartir" de Google Maps, Waze opcional), textos, padres,
   aviso, vestimenta, regalos, RSVP (WhatsApp, fecha límite), colores
   (`colors`), música. Cada campo está explicado en `lib/invitation/types.ts`.
5. **Fotos** en `public/images/` con los nombres del archivo, en la
   proporción que pide la guía del diseño. Luego `npm run optimize-images`.
6. **Música** (opcional) en `public/audio/` + `music` en el config.
7. `npm run check` — señala todo lo que falta o sigue siendo de la demo.
8. `npm run dev` y revisar en escritorio, 390 px y 320 px.
9. `npm run typecheck && npm run lint && npm run build`.
10. Proyecto de Vercel **nuevo** → desplegar → poner la URL final en
    `site.url` → volver a desplegar.

**Archivos que se tocan para una invitación:** `config/invitation.ts`,
`public/images/*`, `public/audio/*` (opcional). Nada más. Cambiar
`templates/`, `app/`, `lib/` o `components/` ya es trabajo personalizado.

## Fechas y hora

`date: "2027-04-17"`, `time: "16:00"` (24 h) y `site.timeZone:
"America/Costa_Rica"`. El desfase horario sale de la zona: no se escribe a
mano. Los lugares pueden tener su propia hora (`time: "18:00"`).

**Antes, durante y después:** desde la hora de inicio la cuenta regresiva
muestra `countdown.todayMessage`; al terminar (`durationHours`) muestra
`countdown.afterMessage`. Desde el inicio desaparecen el formulario de
confirmación y la barra "Confirmar asistencia". Pasada `rsvp.deadline`, el
formulario se reemplaza por un aviso con el WhatsApp de contacto.

## Colores

Cada diseño trae su paleta (en su `meta.ts`). Para cambiar colores, solo
los necesarios:

```ts
colors: { primary: "#5b6b3a", accent: "#8a5a3c" },
```

Qué hace cada color en cada diseño: tabla en `docs/templates/`. Mantener
texto claro sobre `primary` y oscuro sobre `background` (salvo Gala, que es
oscuro). El ícono de la pestaña y la tarjeta al compartir usan la paleta.

## Confirmación de asistencia (RSVP)

No guarda datos: arma el mensaje y abre WhatsApp al número de
`rsvp.whatsappNumber` (`506` + número, sin espacios ni `+`); el invitado
solo presiona Enviar. Pregunta "¿de parte de quién?" (en bodas, por
defecto los dos nombres; `referrerOptions: []` lo quita; con un solo
festejado no se pregunta salvo que se den opciones), individual o grupo
(`minGroupSize`/`maxGroupSize`) y nombres. `allowDecline` agrega "¿No
podrás asistir?". En las demos del catálogo no abre WhatsApp: muestra el
mensaje que llegaría.

## Música

Opcional. **Empieza al tocar "Abrir invitación"** (ese toque es el permiso
que piden los navegadores) y después el reproductor la pausa y la reanuda.
Antes de ese toque no suena ni se descarga nada. Si el navegador no la deja
sonar, el reproductor queda en "Toca para escuchar".

```ts
music: {
  src: "/audio/nuestra-cancion.mp3", // archivo en public/audio/ (mp3, idealmente < 5 MB)
  title: "Clair de lune",
  artist: "Claude Debussy · Laurens Goedhart", // opcional
  credit: "Grabación de dominio público",      // licencia o atribución (se muestra en el pie)
  player: "deco",                               // opcional: otro estilo de reproductor
},
```

- **Sin música:** `music: null` (no hay reproductor ni créditos).
- **Estilo del reproductor:** cada diseño trae el suyo (`musicPlayer` en
  su `meta.ts`): Olivo `rama`, Tierra `ficha`, Gala `deco`, Riviera
  `sello`, Borgoña `etiqueta`, Aurora `destello`, Nube `globo`. `player`
  usa otro; toma los colores y letras del diseño.
- **Licencia, antes de publicar:** solo audio que el cliente pueda usar en
  una web. Comprar una canción o tenerla en Spotify/YouTube **no** da ese
  derecho; una canción comercial necesita licencia de sincronización. Lo
  seguro: dominio público, CC0, CC BY (con `credit`) o música con
  licencia comprada para web. Guardar en `credit` lo que pida la licencia.
- **Pistas de demostración** (`public/audio/demo/`, verificadas en
  Wikimedia Commons, 2026-10-09):

| Archivo | Obra · intérprete | Licencia | Demo |
|---|---|---|---|
| `pachelbel-canon-macleod.mp3` | Pachelbel, Canon en re · Kevin MacLeod | CC BY 3.0 (atribución obligatoria) | Olivo |
| `satie-gymnopedie-1.mp3` | Satie, Gymnopédie n.º 1 · Robin Alciatore (Musopen) | Dominio público | Tierra, Riviera |
| `debussy-clair-de-lune.mp3` | Debussy, Clair de lune · Laurens Goedhart | Dominio público | Gala, Borgoña |
| `chopin-vals-op69-1.mp3` | Chopin, Vals op. 69 n.º 1 (Musopen) | CC0 | Aurora |
| `cajita-musical-cuna.mp3` | Brahms, Canción de cuna (cajita musical, pdsounds.org) | Dominio público | Nube |

  Un cliente puede quedarse con una de estas (`npm run check` lo avisa
  para confirmarlo) manteniendo su `credit`.

## Citas y versículos

`openingQuote`, `story.quote` y `closingQuote` aceptan una cita, un
versículo o `null` (la sección no aparece):

```ts
openingQuote: {
  kind: "verse",                     // "quote" (por defecto) o "verse"
  text: "Así que, no son ya más dos, sino una carne: por tanto, lo que Dios juntó, no lo aparte el hombre.",
  reference: "Mateo 19:6",
  translation: "Reina-Valera 1909",  // se muestra junto a la referencia
  align: "center",                   // opcional: "center" o "start"
},
```

- Cada diseño presenta el versículo a su manera (Olivo, Gala y Tierra
  tienen una composición propia para `"verse"`); cambiar el texto no exige
  tocar componentes.
- **Traducción:** usar el texto exacto de una de dominio público
  (**Reina-Valera 1909**) o de una cuya licencia permita este uso (la
  Reina-Valera 1960, NVI o NTV tienen derechos y piden su aviso de
  copyright). `npm run check` avisa si a un versículo le falta la
  referencia o la traducción.
- Demos: Olivo, Colosenses 3:14; Tierra, Cantares 8:7; Gala, Mateo 19:6
  (Reina-Valera 1909). Riviera, Borgoña, Aurora y Nube usan frases.

## Datos a pedir al cliente (todo de una vez)

1. Diseño elegido (01–07) y, si quieren, ajuste de colores.
2. Nombres como deben aparecer y en qué orden (bodas), o nombre y edad de
   quien celebra (quinceaños, cumpleaños).
3. Fecha, hora de inicio y duración aproximada (`event.name`: "boda",
   "fiesta de quince años", "primer cumpleaños"…).
4. Lugar(es): nombre, dirección corta, enlace de Google Maps (y Waze), hora de cada uno.
5. Fotos según la guía del diseño (cantidad y orientación de cada espacio).
6. Frases de apertura/cierre (o las del diseño) y pie de foto.
7. Padres / padrinos (o "no incluir").
8. Aviso importante (solo adultos, puntualidad…) o ninguno.
9. Vestimenta y colores a evitar.
10. Regalos: método, número/cuenta, enlace de mesa de regalos, o "no incluir".
11. WhatsApp que recibe las confirmaciones, fecha límite, "¿de parte de quién?".
12. Música con permiso de uso para web (y su licencia o atribución), o
    sin música.
13. Aurora y Nube: programa del evento (hora y momento: vals, pastel…), o
    "no incluir".
14. Cita, versículo (con referencia y traducción) o nada, para la apertura
    y el cierre.

## Antes de entregar

- [ ] `npm run check` sin errores (y avisos revisados).
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` sin errores.
- [ ] Escritorio, 390 px y 320 px: rostros bien encuadrados (`position`), sin nada cortado.
- [ ] Confirmación probada: llega a WhatsApp el mensaje con los nombres.
- [ ] "Cómo llegar" abre el lugar correcto; el calendario tiene fecha, hora y lugares correctos.
- [ ] `site.url` con la URL final; al pegar el enlace en WhatsApp aparece la tarjeta.
- [ ] Teléfono real: tocar "Abrir invitación" y confirmar que suena la
      música; pausarla y reanudarla desde el reproductor.

## Despliegue (Vercel)

Cada invitación es un **proyecto de Vercel nuevo**; el catálogo es otro
proyecto (`invitaciones-digitales-catalogo`,
https://invitaciones-digitales-catalogo.vercel.app). El catálogo está
conectado a https://github.com/dreiklx/invitaciones-digitales-catalogo
(privado): `git push origin main` despliega a producción y las demás ramas
crean vistas previas. Los commits deben salir con la identidad de Git
local del repositorio (cuenta `dreiklx`); con otra, Vercel bloquea el
despliegue (ver PROJECT-CONTEXT, "Identidad de Git del repositorio").
Nunca copiar ni reutilizar `.vercel/` (enlazaría y sobrescribiría el
proyecto de otro).

```bash
npm i -g vercel
vercel link        # crear proyecto nuevo, p. ej. "ana-y-luis"
vercel --prod
```

`npm run build` corre `npm run check` antes: si la configuración tiene
errores, el despliegue se detiene. WhatsApp guarda en caché la vista previa
de un enlace: compartirlo solo después del despliegue final.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local |
| `npm run nueva -- <diseño>` | Crea `config/invitation.ts` a partir de la demo del diseño |
| `npm run check` | Revisa la configuración (y corre antes de cada build) |
| `npm run typecheck` | Tipos de rutas + TypeScript |
| `npm run lint` | ESLint |
| `npm run build` | Build de producción (incluye `check`) |
| `npm run optimize-images` | Comprime y endereza (EXIF) las fotos de `public/images/` |
| `npm run placeholders` | Regenera las imágenes de demostración del catálogo |

## Qué no tocar en una invitación de diseño existente

`templates/`, `app/`, `lib/`, `components/` son el diseño y la lógica
compartidos. Reglas que no se deben revertir (portada, música sin
reproducción automática, usabilidad para personas mayores,
"teléfono primero"): `PROJECT-CONTEXT.md`.

Las invitaciones de clientes no llevan el logo del estudio. Los logos de
`public/logos/` solo aparecen en el pie del catálogo; ver "Marca del
estudio" en `PROJECT-CONTEXT.md`.
