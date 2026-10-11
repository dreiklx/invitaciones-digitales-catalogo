# Contexto del proyecto — LEER ANTES DE CAMBIAR NADA

Punto de partida de cualquier sesión. Después: `project-log.md`
(historial), `docs/templates/<n>-<diseño>.md` (el diseño con el que se va a
trabajar) y `photo-map.md`. La guía práctica está en `README.md`. No
duplicar esta información en otros `.md`; actualizar estos archivos.

## Propósito y origen

Proyecto interno para producir invitaciones digitales (bodas, quinceaños
y bebés) para un posible servicio. Nació como **copia** de la
invitación que el autor hizo para su propia boda (proyecto aparte, ya
publicado):

- **2026-10-03:** se limpió de todo dato de esa boda.
- **2026-10-08:** se convirtió en un **catálogo de cinco diseños** de boda.
- **2026-10-08 (4):** se agregaron Aurora (quinceaños) y Nube (cumpleaños
  de bebé/infantil): **siete diseños**.
- **2026-10-10:** reorganización definitiva en **tres categorías**: Bodas
  (Olivo, Tierra, Gala) · Quince años (Aurora, Camelia, hoy Aguamarina) · Bebés (Arrullo,
  baby shower; Nube, primer cumpleaños). Camelia (hoy Aguamarina) y Arrullo ocupan los
  lugares de los antiguos diseños de boda Borgoña y Riviera; Olivo se
  rediseñó por completo.
- **2026-10-11:** auditoría de fotos y derechos de imagen; Camelia
  rediseñada en azul petróleo y aguamarina;
  **Riviera recuperada** del historial del catálogo como baby shower en
  el lugar de Arrullo; la categoría se llama **Quinceaños** (una palabra).
- **2026-10-11 (2):** Olivo vuelve a **Don Ramón y Doña Florinda** con
  las fotos originales del dueño (derechos **pendientes de autorización**);
  **Camelia pasa a llamarse Aguamarina** (id `aguamarina`, redirecciones
  permanentes desde `camelia` y `borgona`); Gala muestra la fecha legible;
  el logo de Farley Systems enlaza a su Instagram.

**No recuperar ni reintroducir datos de la boda original**, tampoco desde
su historial Git antiguo (archivado fuera del proyecto; ver "Riesgos").

**No es un CMS ni un SaaS.** No hay login, editor visual, base de datos,
panel, cuentas ni pagos. Nosotros editamos un archivo de datos y
desplegamos una copia del proyecto por cliente. El catálogo es solo un
escaparate.

## Estado (2026-10-11)

- Siete diseños completos en tres categorías: Bodas (Olivo, Tierra,
  Gala), Quinceaños (Aurora, Aguamarina) y Bebés (Riviera, baby shower; Nube,
  primer cumpleaños), un catálogo en `/` con una sección por categoría (título,
  descripción, tipo de evento en cada tarjeta), transición hacia cada demo
  y validación `npm run check`. Cada demo usa una sesión coherente: seis
  de stock de Pexels con nombres ficticios y **Olivo con Don Ramón y Doña
  Florinda, fotos aportadas por el dueño con derechos de imagen y de los
  personajes PENDIENTES DE AUTORIZACIÓN**; todas con un aviso visible de
  que son demostraciones (auditoría en photo-map.md).
- **Pruebas automáticas** (2026-10-11): `npm test` (configuración de los
  siete diseños y `npm run nueva`, sin navegador) y `npm run test:e2e`
  (Playwright con el Chrome instalado: desplazamiento lateral en 8 anchos,
  música real, fecha, calendario, galería, RSVP, regreso y catálogo);
  `npm run verify` corre todo. Detalle en README, "Pruebas".
- typecheck, lint, check y build sin errores. Revisión visual "teléfono
  primero" del catálogo y los siete diseños a 320, 360, 390 y 430 px y en
  escritorio (composición, no solo desbordamientos); ver "Teléfono primero".
- Logo del estudio solo en el pie del catálogo (ver "Marca del estudio").
- **Git y GitHub:** repositorio **privado**
  https://github.com/dreiklx/invitaciones-digitales-catalogo, remoto
  `origin`, rama principal `main`. El historial nuevo empieza en el commit
  inicial `25a10c7e15b91fc67209cc677968b070c872ad83` (2026-10-08). El
  historial antiguo (con datos privados de la boda) no está en este
  repositorio: se conserva fuera del proyecto, en una ubicación privada
  local del dueño, solo para recuperación, y **nunca debe subirse a
  GitHub**. `.env.local`, `.vercel/`, `_anterior/`, `node_modules/` y
  `.next/` quedan fuera del repositorio (`.gitignore`).
- Archivos de la arquitectura anterior movidos a `_anterior/` (ignorada
  por git, TypeScript, ESLint y Vercel), pendientes de que el dueño los borre.
- **Despliegue del catálogo:** https://invitaciones-digitales-catalogo.vercel.app
  (proyecto de Vercel `invitaciones-digitales-catalogo`). **Conectado a
  GitHub** (2026-10-09): cada push a `main` despliega a producción y cada
  push a otra rama crea un despliegue de vista previa. No hace falta
  `vercel --prod`. El build corre `npm run check` (prebuild) y la
  verificación de tipos de `next build`; si fallan, no se publica.
- **Identidad de Git del repositorio (no cambiar):** en plan Hobby,
  Vercel solo acepta despliegues de commits cuyo autor de GitHub sea la
  cuenta vinculada al usuario de Vercel; si no, los bloquea
  (`TEAM_ACCESS_REQUIRED`). La cuenta de Vercel tiene vinculada la cuenta
  de GitHub **`dreiklx`** (Account Settings → Authentication), así que los
  commits deben salir con un correo de `dreiklx`. El repositorio lo fija
  en su configuración **local** (`.git/config`, no global):
  `user.name = dreiklx` y `user.email` = la dirección *noreply* de
  `dreiklx` (`<id>+dreiklx@users.noreply.github.com`). La configuración
  global del equipo usa otro correo, que GitHub asocia a otra cuenta
  (`dreik0`): los commits hechos con él hasta `198b96c` quedaron
  bloqueados en Vercel y no se reescriben. En un clon nuevo hay que
  volver a poner la identidad local antes del primer commit
  (`git config user.email` debe mostrar la dirección noreply).

## Stack

Next.js 16.3.8 (App Router, Turbopack) · React 19.2 · TypeScript 5 ·
Tailwind CSS v4 · `sharp` (imágenes) · `tsx` (scripts y `npm test` con
el corredor de Node) · Playwright (solo desarrollo: `npm run test:e2e`) ·
Vercel. Todo se
prerenderiza estático. Next 16 cambia APIs: leer `node_modules/next/dist/docs/`
antes de usar APIs de Next (ver `AGENTS.md`).

## Estructura

```
config/invitation.ts      ← null = catálogo; o los datos de UNA invitación
config/catalog.ts         ← URL, título y descripción del catálogo
lib/invitation/
  types.ts                ← forma de los datos (contenido común + fotos por diseño)
  resolve.ts              ← invitación → valores listos (fechas, paleta, textos, enlaces)
  time.ts                 ← fecha/hora con zona horaria, formatos, números romanos (solo el "XV")
  whatsapp.ts             ← mensajes del RSVP
  calendar.ts             ← archivo .ics
  share-image.tsx         ← tarjeta al compartir e ícono (next/og)
  validate.ts             ← reglas de `npm run check`
  names.ts                ← tratamientos, palabra completa y `demoMarkers`
  active.ts, routes.tsx   ← qué se muestra en cada ruta según el modo
templates/
  registry.ts             ← metas de los 7 diseños (solo datos; orden del catálogo)
  demos.ts, previews.tsx  ← demos (datos) y miniaturas del catálogo
  shared/                 ← lógica común: Gate, MusicPlayer, RsvpForm, Lightbox,
                            CopyValue, StickyRsvp, Reveal, ScrollCue, Frame,
                            Shell, event-phase, icons…
  <diseño>/               ← meta.ts, fonts.ts, demo.ts, Template.tsx,
                            Countdown.tsx, Preview.tsx (+ ornamentos propios)
app/
  page.tsx                ← catálogo
  plantillas/<diseño>/    ← página, imagen al compartir y .ics de cada diseño
  layout.tsx, icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts,
  calendario.ics/         ← metadatos y calendario de la invitación del cliente
components/catalog/       ← página del catálogo
scripts/                  ← check.ts, new-invitation.ts (+ lib/new-invitation.ts), placeholders.ts, optimize-images.mjs
tests/unit/, tests/e2e/   ← `npm test` (Node) y `npm run test:e2e` (Playwright); playwright.config.ts
docs/templates/           ← una guía por diseño
public/plantillas/<diseño>/ ← imágenes de demostración · public/images/, public/audio/ ← cliente
public/logos/             ← logos del estudio (originales, sin modificar)
next.config.ts            ← reescritura "/" → diseño del cliente; cssChunking
```

## Arquitectura (decisiones)

- **Contenido común, diseño libre.** Todos los diseños usan el mismo tipo
  de contenido (`InvitationContent`). Cada diseño define sus espacios de
  foto (`PhotoSlots`), su paleta, sus tipografías y sus componentes. Los
  componentes reciben la invitación ya resuelta (`ResolvedInvitation`) por
  props; ninguno lee el config ni formatea fechas por su cuenta.
- **Lógica compartida, aspecto propio.** Portada, música (con siete
  presentaciones en `templates/shared/players.tsx`),
  RSVP, visor, copiar y barra flotante se comparten y cada diseño los
  estiliza con clases. La cuenta regresiva comparte el hook
  (`useCountdown`) pero cada diseño dibuja la suya. No se forzó compartir
  marcado de secciones: cada `Template.tsx` es libre.
- **Quién celebra según el diseño** (`types.ts`): los diseños de boda
  (`WeddingTemplateId`) exigen `couple`; Aurora y Nube (`HonoreeTemplateId`)
  exigen `honoree` (`name`, `age`, `ageLabel?`). TypeScript obliga a
  elegir el correcto según `template`. `resolve.ts` lo unifica: `names.one`
  es la persona que celebra y `names.two` queda vacío; `inv.honoree` trae
  `ageText` ("15 años", "1 año", "6 meses"). Título, descripción, mensaje
  de WhatsApp y calendario se arman con "Ana y Luis" o con el nombre solo
  ("Fiesta de quince años de Mariana"). Con un solo festejado el RSVP no
  pregunta "¿de parte de quién?" salvo que se den `referrerOptions`.
- **`kind` en cada `meta.ts`** (`boda` · `quinceanos` · `baby-shower` ·
  `cumpleanos-infantil`): el catálogo arma sus tres categorías (Bodas =
  `boda`; Quinceaños = `quinceanos`, nombre en una palabra por decisión
  del dueño; Bebés = `baby-shower` +
  `cumpleanos-infantil`) y muestra el tipo de evento en cada tarjeta.
- **Baby shower** (`ShowerTemplateId`, hoy solo Riviera) exige `shower`:
  `parents` (uno o dos nombres) y `babyName` opcional (muchas familias no
  lo revelan). `resolve.ts` lo unifica: `names.one`/`two` son quienes
  invitan ("Baby shower de Natalia y Joaquín" en título, calendario y
  WhatsApp) e `inv.shower` trae `parentsText` y `babyName`. Ningún texto
  del diseño supone el sexo del bebé. `hero.title` (opcional, común) es la
  frase grande de la portada cuando no se muestra el nombre del bebé.
- **Las demos no se filtran a los clientes** (rehecho el 2026-10-11:
  `nueva -- aguamarina` copiaba "Renata" como firma de dos frases).
  `npm run nueva` ya no edita el texto de `demo.ts` con expresiones
  regulares: importa la demo, la transforma
  (`scripts/lib/new-invitation.ts`, función pura) y escribe el archivo.
  Se conserva la estructura (secciones, rótulos, programa, vestimenta,
  música, versículos y citas de autores conocidos); van a "REEMPLAZAR"
  quién celebra (sin `babyName`), familiares, lugares, WhatsApp, cuenta y
  enlace de regalos, `site.url`, `story.caption`, las frases firmadas por
  alguien de la demo y los textos alternativos; las fotos apuntan a
  `/images/<espacio>.jpg`. Red de seguridad: cualquier texto que nombre a
  una persona o un lugar de la demo (`demoMarkers` en
  `lib/invitation/names.ts`: quién celebra con y sin tratamiento,
  familiares y lugares) se reemplaza, y `npm run check` da error si
  aparece en una invitación de cliente. `tests/unit/nueva.test.ts` lo
  comprueba con los siete diseños contra los datos de TODAS las demos.
- **`schedule` (programa del evento)**: opcional en el contenido común;
  lo muestran Aurora (línea de tiempo), Aguamarina (línea con rombos) y Nube
  (tarjetas). Horas en
  24 h, validadas por `npm run check`.
- **Tercera tipografía opcional** `--f-script` → clase `font-script`
  (`globals.css`): la usa Aurora para el nombre en caligrafía.
- **Colores centralizados.** Diez tokens (`Palette`): cada diseño trae los
  suyos y el config los reemplaza con `colors`. Se aplican como variables
  `--c-*` en el contenedor del diseño. En Tailwind se usan como `bg-paper`,
  `bg-surface`, `text-ink`, `text-muted`, `bg-primary`,
  `text-on-primary`, `text-secondary`, `bg-accent`, `text-on-accent` y
  `border-line` (`app/globals.css`). Ningún color de diseño está escrito en
  los componentes.
- **Un modo por despliegue** (`config/invitation.ts`). Si es `null`, es el
  catálogo: `/` más `/plantillas/<id>`. Si tiene datos, es una invitación:
  `next.config.ts` reescribe `/` hacia `/plantillas/<diseño>` (la URL
  sigue siendo `/`) y los demás diseños dan 404.
- **Una carpeta de ruta por diseño** (no una ruta dinámica). Así cada
  página solo incluye y precarga las tipografías de su diseño (2-3 en vez
  de 17). Requiere `experimental.cssChunking: { type: "graph" }` en
  `next.config.ts`; sin eso, Turbopack junta el CSS de las fuentes de todo
  el sitio en un solo archivo.
- **Rutas en español con nombre** (`/plantillas/olivo`, no `/plantillas/01`):
  más fáciles de recordar y dictar; el número (01–05) aparece en el
  catálogo, en la metadata y en los nombres de `docs/templates/`.
- **Transición catálogo → diseño:** View Transitions de React
  (`<ViewTransition name="cover-<id>" share="cover-morph">` en la tarjeta y
  en la portada del diseño). La miniatura se transforma en la portada
  (620 ms) y el resto hace un fundido. Sin soporte del navegador, la
  navegación es normal. Respeta "reducir movimiento".
- **Demos sin WhatsApp real:** en las demos, el RSVP muestra el mensaje que
  llegaría en vez de abrir WhatsApp.
- **Modo oscuro forzado bloqueado** (`color-scheme: only light` +
  `<meta name="darkreader-lock">`). Las extensiones y el modo oscuro de
  Chrome invertían los diseños; se detectó en la revisión visual.
- **Fotos de las siete demos** (ver photo-map.md, "Auditoría de fotos y
  derechos"): **una sola sesión coherente de stock de Pexels por diseño**,
  con autor, enlace y licencia comprobados foto por foto (2026-10-11). La
  licencia de Pexels permite el uso comercial y en plantillas, pero
  **Pexels no garantiza autorizaciones de las personas fotografiadas**
  (términos del 15-11-2024): licencia de la foto ≠ derechos de imagen
  resueltos. Por eso: nombres ficticios, ningún uso como testimonio y un
  aviso visible en cada demo (`Shell.tsx`, solo con `isDemo`) y en el pie
  del catálogo. Aurora, Aguamarina (quinceañeras) y Nube (bebé) muestran
  menores identificables: riesgo medio documentado; antes de una campaña
  comercial conviene reemplazarlas por sesiones propias con autorización
  firmada de los padres o tutores. No se usó ninguna imagen generada.
  `npm run placeholders` (imágenes abstractas) queda para un diseño nuevo
  sin fotos y nunca toca una carpeta `fotos/`.

## Funcionalidades comunes (cuando el diseño las muestra)

Portada "Abrir invitación" · nombres y fecha · frase de apertura y de
cierre · historia con foto · padres/padrinos · cuenta regresiva (con
mensajes "hoy" y "después") · calendario `.ics` (todos los lugares en la
descripción, recordatorio un día antes) y Google Calendar · uno o más
lugares con Google Maps y Waze opcional · aviso importante (`*resaltado*`)
· vestimenta con colores a evitar · regalos (copiar con alternativa si el
navegador lo bloquea, enlace a mesa de regalos) · RSVP por WhatsApp guiado
+ "no podré asistir" + fecha límite · galería con visor · música · barra
flotante "Confirmar asistencia" · tarjeta al compartir e ícono con la paleta.
Todas las secciones opcionales se ocultan con `null`.

## Plantilla vs. invitación personalizada (conceptual)

| | Plantilla (uno de los 7 diseños) | Personalizada |
|---|---|---|
| Base | Un diseño del catálogo, tal cual | Copia del proyecto que se modifica |
| Qué se cambia | Contenido, fotos, música, colores (`colors`), ocultar secciones | Además: secciones nuevas, otro orden, otro diseño, animaciones, funciones a medida |
| Archivos | `config/invitation.ts`, `public/images/`, `public/audio/` | También `templates/`, `app/`, `lib/` |

Regla de alcance: si se resuelve en `config/invitation.ts` o `public/`, es
plantilla; si exige tocar código, es personalizada o un extra. Ejemplos
fuera de la plantilla: secciones nuevas (itinerario, hospedaje, video),
más fotos o galería distinta, fotos a color en Gala, otra tipografía,
cambiar el orden, mapa embebido, integraciones, lista de invitados/panel,
invitación con nombre por invitado, dominio propio, varios idiomas,
licencias de música.

### Decisiones comerciales — PENDIENTE DE DEFINICIÓN CON FOTOLAB
No hay precios, paquetes, rondas de cambios, extras, duración del servicio,
permanencia en línea, comisiones ni acuerdos aprobados. **No documentar
precios como decisión.** Todo eso se definirá con la persona relacionada
con Fotolab.

### Riesgos de alcance con clientes
Datos que llegan a cuentagotas (pedir todo de una vez, lista en
`README.md`). Fotos con orientación equivocada (guía por diseño + `npm run
check`). "Quiero exactamente mi color" (`colors` cubre ajustes; un rediseño
es personalizado). Textos reescritos muchas veces. Música sin licencia.
"Una sección más". Cambios después de publicar y tiempo en línea
(pendientes).

## Reglas heredadas (probadas en una boda real — no revertir)

### Portada "Abrir invitación" (`templates/shared/Gate.tsx`)
- Pantalla completa antes de todo; bloquea la página con `inert` y
  `overflow: hidden` hasta tocar el botón.
- **Inicia la música**: su `onClick` llama a `startMusicFromGesture()`
  (`templates/shared/music-start.ts`) de forma síncrona, ANTES de cambiar
  de estado. Safari en iPhone solo permite `audio.play()` dentro del
  gesto: si la llamada pasa por un estado, un efecto o un `setTimeout`, se
  pierde el permiso. Sin música no hay nada registrado y solo abre.
- Salida: fundido + escala 700 ms, se desmonta; respeta reducir movimiento.

### Música (`templates/shared/MusicPlayer.tsx` + `players.tsx`)
- **Empieza al tocar "Abrir invitación"** y solo así (decisión del dueño,
  2026-10-09): nada de autoplay al cargar ni de "primer toque en cualquier
  parte". El reproductor registra su `play()` en `music-start.ts`; la
  portada lo llama dentro del clic. Después, el reproductor pausa y
  reanuda (no reinicia).
- Si el navegador rechaza ese `play()` (`NotAllowedError`), el estado es
  `blocked` y el reproductor muestra "Toca para escuchar"; cualquier otro
  fallo es `error` ("No disponible").
- `preload="none"`: el archivo no se descarga hasta ese toque.
- **Una sola lógica, siete presentaciones**: `players.tsx` define la forma
  de cada diseño (`lino` Olivo, `ficha` Tierra, `deco` Gala, `destello`
  Aurora, `broche` Aguamarina, `sello` Riviera, `globo` Nube); el diseño trae
  la suya en `meta.musicPlayer` y
  `music.player` la cambia.
- Estado visual solo desde eventos nativos del `<audio>` (`playing`,
  `pause`, `waiting`, `error`) + timeout de 12 s. Nunca un "Sonando"
  optimista. **No reintroducir** trucos de `muted`, ciclos
  `pause()→play()` ni listeners globales de primera interacción.
- Teléfono: solo la forma (≥ 48 px). Mientras se ve la portada (justo al
  abrir, cuando empieza a sonar) va **arriba a la derecha**: abajo tapaba
  fecha, nombres o "Desliza hacia abajo" en 320×568. Al bajar pasa abajo a
  la derecha, sobre la barra de confirmar. < `lg` se oculta sobre
  `#confirmar` y sobre los créditos del pie (`MusicCredit`). Escritorio:
  forma + título + estado, abajo a la derecha.
- Créditos de la pista (obra, intérprete, licencia) en el pie de cada
  diseño (`MusicCredit`), siempre que haya música.
- Las animaciones del reproductor solo corren mientras suena y se detienen
  con "reducir movimiento".
- La prueba definitiva del sonido es un teléfono real (las pruebas
  automáticas solo confirman que el audio avanza).

### Usabilidad para personas mayores (60-70+), en todos los diseños
- "Desliza hacia abajo" con palabras + flecha (`ScrollCue`); tocarla avanza.
- Botones con forma de botón y ≥ 48 px ("Cómo llegar" + "Se abre en Google Maps").
- "Confirmar por WhatsApp" puede ir en dos líneas equilibradas (Tierra,
  Gala y Aguamarina, con mayúsculas espaciadas, no cabían en una a 320-430 px
  y el texto se salía del botón). No achicar la letra para forzar una línea.
- Visor: la foto empieza debajo de "Cerrar" y ambos respetan la zona segura
  del teléfono.
  Enlaces secundarios (Google Calendar, WhatsApp del RSVP) ≥ 44 px de alto.
- RSVP: opciones con borde visible, "Toca una opción en cada paso" y
  "Solo falta presionar Enviar" bajo el botón.
- Barra flotante: se oculta sobre el formulario; < 375 px solo el botón.
- Visor: botón "Cerrar" con texto, sin anterior/siguiente; Escape cierra y
  el foco vuelve a la foto.
- Fechas romanas (Gala) siempre acompañadas de la fecha normal.
- Nada se corta ni se desborda a 320 px (revisar al tocar diseño).

### Sin desplazamiento horizontal (2026-10-09, no revertir)
- **Por qué seguía pasando (2026-10-09, sesión 6):** la red de seguridad
  `body { overflow-x: clip }` no recortaba nada. CSS traslada el `overflow`
  de `<body>` a la ventana (si `<html>` no tiene uno propio), y en la
  ventana `clip` equivale a `hidden`, que **iOS Safari no respeta frente al
  gesto táctil**: cualquier cosa que sobresaliera, aunque fuera un
  instante, dejaba mover la página de lado en el iPhone, mientras Chrome
  de escritorio (y las auditorías) no lo mostraban.
- Lo que sobresalía en los 7 diseños: la **portada "Abrir invitación"**
  (`Gate.tsx`). Al abrir, la capa `fixed inset-0` se escalaba a 1,03
  durante 0,7 s: 4-6 px fuera de la pantalla por cada lado. Ahora el
  scale va en un hijo dentro de la capa fija (que recorta) y la capa solo
  se desvanece. Mismo efecto visual.
- Red de seguridad que sí funciona: `overflow-x: clip` en un `<div>`
  envoltorio dentro de `<body>` (`app/layout.tsx`), que no se traslada a
  la ventana y recorta de verdad (no rompe `position: sticky`, porque
  `clip` no crea contenedor de desplazamiento). `body` lleva
  `overflow-wrap: break-word` para que una palabra larga (nombre, correo)
  pase de línea. **No volver a poner el `clip` en `body` o `html`.**
- Las causas se corrigen en su origen; el envoltorio no debe esconder
  defectos (al medir, se desactiva).
- **Escritorio (2026-10-09, sesión 7):** con barra de desplazamiento real
  (15 px en Windows), clic y rueda horizontal en 1024-1920 px (y 640-1000
  y 2560) **no hay ningún desbordamiento**, ni en `<html>` ni en elementos
  interiores, en ningún estado. Lo que sí movía la página de lado:
  1. **Salto de la barra:** la portada "Abrir invitación" y el visor de
     fotos bloquean el desplazamiento (`overflow: hidden`); la barra
     vertical desaparecía y el contenido se ensanchaba 15 px y se volvía
     a estrechar al abrir/cerrar: todo lo centrado saltaba ~7,6 px
     (medido en Chrome real). Solución: `html { scrollbar-gutter:
     stable }` (hueco de la barra siempre reservado) y
     `templates/shared/scroll-lock.ts` (usado por la portada y el visor),
     que mientras dura el bloqueo pinta ese hueco con el fondo de la capa
     (si no, se veía una franja de 15 px del color de la página). Ojo al medir:
     Chrome sigue informando `documentElement.clientWidth` sin el hueco
     mientras está bloqueado; el ancho real del contenido
     (`body.getBoundingClientRect().width`) ya no cambia.
  2. **Gesto horizontal del trackpad:** deslizaba la página entera
     (navegación atrás/adelante o rebote elástico). Solución: `html {
     overscroll-behavior-x: none }`. Efecto secundario aceptado: en
     estas páginas el gesto de dos dedos no navega atrás (el botón y el
     teclado sí).
- Prueba de escritorio: Chrome sin ocultar barras, clics reales de
  ratón, rueda vertical para recorrer y rueda **horizontal** (deltaX) en
  5 puntos de cada pantalla, en carga, al abrir, durante el recorrido,
  con el reproductor, el visor y el RSVP; comprobar `scrollX`, el
  `scrollLeft` de todos los elementos, los elementos fuera del área útil
  (comparar con `clientWidth`, no con `innerWidth`) y que el ancho de
  `body` no cambie.
- Causas encontradas (con datos de clientes reales, no con las demos):
  textos de una sola línea (`whitespace-nowrap`) que con la **letra del
  sistema agrandada** (Android, personas mayores) se salían: "Agregar a mi
  calendario" (7 diseños), "Ver mesa de regalos" (Gala), "Desliza hacia
  abajo", y el botón de la barra "Confirmar asistencia" (quedaba cortado);
  y en el antiguo Borgoña los **nombres largos** ("& Bartolomeo", sin
  poder partirse) ensanchaban la página o se cortaban en el pie.
- Solución: esos textos pueden pasar a dos líneas (`text-center`,
  `text-balance`, `max-w-full`, `min-w-0`); los nombres gigantes tienen
  tamaño solo en `vw` y bajan un escalón si son largos (hoy: `longName` de
  Aguamarina, más de 8 letras; Olivo, todo en `vw`); las cifras
  de la cuenta regresiva de Gala llevan tope en `vw` (`min(rem, vw)`), así
  la letra agrandada no las saca de la fila.
- Regla: un texto que no puede partirse (`whitespace-nowrap`, nombres
  gigantes) necesita un tamaño que no crezca con la letra del sistema
  (`vw`) o poder pasar a dos líneas.
- Cómo medir: Chrome en modo móvil con `screenWidth` fijado y **gestos
  táctiles reales** (CDP `Input.synthesizeScrollGesture`), sin desactivar
  animaciones y con el envoltorio sin `clip` (`body>.overflow-x-clip
  {overflow-x:visible}`). Un monitor por `requestAnimationFrame` guarda
  durante todo el recorrido el máximo de `documentElement.scrollWidth`,
  `body.scrollWidth`, `innerWidth`, `visualViewport` y los elementos fuera
  de la pantalla (también los fijos y los transitorios). Recorrido: abrir
  la invitación (toque real, la música debe sonar), bajar con el dedo
  hasta el final deslizando de lado cada pocas pantallas, pausar y
  reanudar la música, abrir y cerrar el visor, completar el RSVP. Anchos
  280 (teléfonos con letra grande: Chrome Android aplica el tamaño de
  letra del sistema como zoom y la pantalla útil baja de 320), 320×568,
  320×600, 360, 390, 430 y 1440, con letra normal y con
  `html{font-size:125%}`.

### Teléfono primero (revisión 2026-10-08, no revertir)
Las invitaciones se abren casi siempre desde WhatsApp en un teléfono.
- **La portada cabe en la primera pantalla** con "Desliza hacia abajo"
  visible. En Tierra, Gala, Aguamarina y Riviera el ancho de la foto de
  portada en teléfono sale del alto de la pantalla
  (`w-[min(…,max(…,calc((100svh-Xrem)*ratio)))]`): la proporción sigue
  siendo la de `meta.ts`, solo cambia el tamaño. En Olivo, el alto de la
  foto (arriba) sale de la pantalla. Medido en los 7 diseños a 320×600, 360×740, 390×844 y
  430×932: "Desliza hacia abajo" entero y en una línea (a 320 px el texto
  usa menos espaciado).
- **Teléfonos bajos (variante `short:`** en `globals.css`: alto ≤ 640 px y
  ancho < 1024 px; 320×568, o un teléfono con la barra del navegador
  abierta): las portadas se recomponen en vez de encogerse. "Desliza hacia
  abajo" pasa a una fila (flecha al lado del texto, mismo tamaño) y cada
  diseño ajusta lo suyo: Gala y Riviera, márgenes; Aguamarina, la fecha en una
  línea; Olivo, nombres un escalón más chicos; Tierra deja la foto pasar el borde (invita a bajar) y sube la
  flecha a la mitad de la foto (`ScrollCue stacked`). Medido a 320×568: el
  indicador queda a 20-60 px del borde en los 7 diseños.
- **Nombres:** en teléfono, uno por línea ("Nombre / & Nombre") en portadas
  y pies (también Gala desde 2026-10-08 (5); Olivo deja el "&" solo); en
  escritorio, en una línea o con el "&" aparte.
- **Cortina (`Reveal variant="curtain"`):** el `clip-path` va en un hijo
  (`.reveal-curtain`), nunca en el elemento observado. Chrome no avisa la
  intersección de un elemento recortado por completo y las fotos de
  Tierra y del antiguo Borgoña **no aparecían nunca** (estaba en producción).
- **Botones de lugar:** mismo ancho, ≥ 52 px de alto, uno debajo del otro
  o en dos columnas según el ancho.
- **Barra flotante:** también se oculta sobre el `<footer>` (tapaba los
  nombres del cierre).
- **"← Diseños" (demos):** se esconde al bajar y vuelve al subir.
- Botón "Confirmar por WhatsApp": el ícono no se encoge (`shrink-0`) y el
  texto baja a 17 px por debajo de 360 px.
- Animaciones de aparición más cortas en teléfono (0.8 s, 16 px).
- Cómo revisar: Claude in Chrome trabaja en una pestaña oculta (las
  animaciones no avanzan y las capturas fallan). Funciona mejor Chrome
  headless con emulación móvil por CDP, capturando la página por
  pantallas. El script es temporal, no está en el repo.

## Marca del estudio (logos)

`public/logos/` (originales, sin modificar; PNG con transparencia, hechos
para **fondo oscuro**: letras blancas con brillo azul):
| Archivo | Tamaño | Forma | Uso |
|---|---|---|---|
| `farley-systems-and-icon-logo.png` | 1983×793 (contenido ≈ 3,2:1) | Horizontal: ícono + nombre | **Pie del catálogo**, sobre franja oscura, "Creado por", 56–64 px de alto; enlaza a https://www.instagram.com/farley.systems/ en otra pestaña (`rel="noopener noreferrer"`, nombre accesible "Farley Systems en Instagram (se abre en una pestaña nueva)", foco visible) |
| `farley-systems-logo.png` | 1983×793 (contenido ≈ 5:1) | Solo nombre | No se usa (repite al anterior) |
| `farley-icon.png` | 1254×1254 (contenido ≈ 1,3:1) | Ícono "F" | No se usa |

Decisiones:
- **Un solo lugar:** el pie del catálogo. Prioridad del catálogo: diseños,
  calidad, navegación y, al final, marca.
- **Ni en las invitaciones ni en las demos:** son de los novios. El estilo
  tecnológico azul choca con las paletas de los diseños, y los logos necesitan
  fondo oscuro. Si se quiere un crédito en invitaciones de clientes,
  decidirlo antes, porque es un acuerdo comercial (PENDIENTE DE DEFINICIÓN
  CON FOTOLAB).
- **No como ícono de pestaña:** el ícono del catálogo es el "&" del
  catálogo. A 32 px la "F" con degradados y brillo pierde detalle.
- Mostrarlos con `next/image` (los PNG pesan 250–650 KB; Next los optimiza).

### Ancla `#confirmar`
La usan la barra flotante y el reproductor para ocultarse sobre el
formulario. Cada diseño la pone en su sección de RSVP. No renombrarla.

## Panel de invitados (no incluido)

La boda original tenía un panel privado con Neon Postgres. Se quitó porque
contenía datos reales y exige base de datos y autenticación por cliente.
Si un cliente lo pide (extra, pendiente de definición), reutilizar **solo
el código** del proyecto original (`app/panel-*/`, `lib/guests.ts`,
`lib/admin-*.ts`, `lib/db.ts`, `proxy.ts`,
`components/AdminGateTrigger.tsx`, `scripts/init-guests-db.mjs`).
**Nunca** su `.env.local`, su base de datos ni la lista de invitados.
Generalizar la columna `side` a dos valores genéricos. Por cliente: base
Neon nueva, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET` nuevos en Vercel.
Lecciones: `SERIAL`, `router.refresh()` tras Server Actions fuera de
`<form>`, `id` fijo en `<DndContext>`, cada acción verifica la sesión.

## Limitaciones conocidas

- Bodas, quinceaños, baby shower y primer cumpleaños, en español (el
  nombre del evento es configurable: `event.name`/`article`; los textos de
  interfaz están en español). Otros eventos se harían como personalizados.
- Música de las demos: solo hay 5 pistas con licencia verificada para 7
  diseños; Tierra y Riviera comparten la de Satie, Gala y Aguamarina la de
  Debussy. Cambiarlas requiere otra pista con licencia comprobada.
- Microtextos de interfaz fijos en los componentes ("Cómo llegar",
  "Desliza hacia abajo", textos del RSVP…).
- Antes/durante/después se calcula en el navegador: el HTML estático
  siempre sale como "antes" y se corrige al cargar.
- `site.url` se conoce después de crear el proyecto en Vercel (dos despliegues).
- Sin tests automatizados (la validación es `npm run check`).
- El catálogo precarga las fuentes de todos los diseños (22 archivos; las
  necesita para las miniaturas). Cada demo precarga solo las suyas (2-3).
- Las siete demos usan fotos de stock (Pexels) con personas
  identificables, incluidos menores (quinceañeras, una bebé): no
  usarlas como testimonios ni en contextos que sugieran que esas personas
  son clientes o recomiendan el servicio. Las fotos de Olivo hasta el
  2026-10-10 (procedencia no verificable, personajes de una serie de TV)
  siguen en el historial Git de este repositorio privado; no se reescribe
  el historial.

## Riesgos conocidos

- **Historial Git antiguo (archivado fuera del proyecto):** 41 commits de
  la boda original (lista real de invitados, fotos personales, canción,
  teléfonos, URL de producción) más el primer commit del catálogo. Se
  conserva solo para recuperación, en una carpeta privada fuera de este
  proyecto. **Nunca** copiarlo de vuelta, subirlo ni usarlo como remoto.
  El repositorio actual empieza en un commit inicial limpio (2026-10-08).
- Antes de cada push: revisar que no entren `.env*`, `.vercel/` ni
  `_anterior/`, ni datos de clientes (los datos de una invitación real van
  en su propia copia del proyecto, no en este repositorio).
- Fotos del cliente con orientación distinta al marco: `npm run check` avisa.
- Música sin licencia aportada por el cliente. La canción de la boda
  original ("La Bondad de Dios", instrumental) **no** tiene licencia para
  uso web (investigado entonces): no usarla en demos ni en el catálogo.
- Las pistas de demostración son de dominio público o CC (ver README,
  "Música"); la de Kevin MacLeod (CC BY 3.0) exige mostrar la atribución.
- Versículos: las demos usan la Reina-Valera 1909 (dominio público). La
  Reina-Valera 1960, NVI, NTV, etc. tienen derechos: usarlas solo con su
  aviso de copyright y si su permiso cubre el uso.
- `experimental.cssChunking` es experimental en Next 16: revisar al actualizar Next.

## Pendientes

- Decisiones comerciales con Fotolab (ver arriba).
- Borrar `_anterior/` (ignorada por git; no está en el repositorio).
- **Derechos de las fotos de Olivo (Don Ramón y Doña Florinda): PENDIENTES
  DE AUTORIZACIÓN.** Las demos con menores (Aurora, Aguamarina, Nube):
  reemplazar por sesiones con autorización antes de una campaña.
- Auditoría completa y propuestas no implementadas: `docs/auditoria.md`.
- Probar audio y WhatsApp en un teléfono real con la primera invitación
  (las pruebas automáticas usan Chrome de escritorio con emulación) y
  escuchar una vez las pistas comprimidas en un teléfono.
- Si se ofrecerán otros eventos (baby showers, bautizos), revisar textos fijos.
