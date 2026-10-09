# Project Log

Historial del proyecto (lo más reciente primero). El historial de la boda
de la que nació (sesiones 2026-09-13 a 2026-09-29) queda en el proyecto
original; sus lecciones vigentes están en `PROJECT-CONTEXT.md`.

## 2026-10-08 (9) — Repositorio privado en GitHub

- Repositorio **privado** https://github.com/dreiklx/invitaciones-digitales-catalogo
  creado con GitHub CLI; remoto `origin`, rama `main` con seguimiento de
  `origin/main`. Push del commit inicial `25a10c7` (sin `--force`); GitHub
  tiene un solo commit y 181 archivos, sin `.env.local`, `.vercel/`,
  `_anterior/`, `node_modules/` ni `.next/`.
- El historial antiguo de la boda sigue solo en local, fuera del proyecto.
- Vercel sin cambios: el catálogo se sigue desplegando con la CLI, sin
  conexión a GitHub (sin despliegues automáticos por push).

## 2026-10-08 (8) — Repositorio Git nuevo y limpio

- El `.git` anterior (42 commits: la boda original + el commit del
  catálogo) se **movió** fuera de la carpeta del proyecto, a una carpeta
  privada del dueño, sin borrarlo; verificado con `git log` y `git fsck`.
- `git init -b main` en el árbol actual y **un único commit inicial** con
  los mismos 181 archivos del commit anterior (siete diseños, catálogo,
  compartidos, imágenes de demostración, logos, scripts, documentación).
  No se reutilizó ni recuperó nada del historial antiguo.
- Revisado antes: sin datos de la boda (nombres, teléfonos, lugar, canción,
  panel, base de datos), sin secretos, imágenes sin metadatos (EXIF/XMP).
  Se quitó de este log el nombre del equipo de Vercel (dato personal).
- Fuera del repositorio (ignorados): `.env.local`, `.vercel/`,
  `_anterior/`, `node_modules/`, `.next/`, `.claude/`, `next-env.d.ts`,
  `tsconfig.tsbuildinfo`.
- Sin remoto, sin push, sin despliegue nuevo. Rama `main`.

## 2026-10-08 (7) — Primer commit del catálogo

- A pedido del dueño, commit de todo el trabajo de las sesiones del
  2026-10-08 (catálogo, 7 diseños, documentación), encima del historial de
  la boda. Sin push ni despliegue.
- Revisado antes: sin `.env*`, `.vercel/`, `_anterior/` (los tres en
  `.gitignore`), sin datos de la boda en los archivos nuevos o cambiados
  (nombres, teléfonos, lugar, URL) y sin secretos.
- **Riesgo que sigue abierto:** los commits anteriores contienen datos
  privados de la boda. Antes de publicar el repositorio, preparar un
  historial limpio (ver "Riesgos conocidos" en PROJECT-CONTEXT).

## 2026-10-08 (6) — Revisión final "teléfono primero", con 320×568

### Qué se hizo
- Auditoría medida y visual (local y producción) a 320×568, 320×600,
  360×740, 390×844, 430×932 y 1440, en el catálogo y los 7 diseños.
- **iPhone SE antiguo (320×568):** "Desliza hacia abajo" quedaba cortado en
  Tierra, Gala, Riviera y Borgoña. Variante `short:` (alto ≤ 640 px) con
  recomposición por diseño (ver "Teléfono primero" en PROJECT-CONTEXT).
- **"Confirmar por WhatsApp" se salía del botón** en Tierra, Gala y Borgoña
  a 320-430 px (mayúsculas espaciadas; no lo había detectado la revisión
  anterior porque medía el desborde de la página, no el de cada botón).
  Ahora el texto va en dos líneas equilibradas y con menos espaciado
  entre letras bajo 640 px.
- **Visor:** la foto podía quedar debajo de "Cerrar" en pantallas bajas;
  ahora empieza debajo y respeta la zona segura.
- **Catálogo:** etiqueta "Abrir →" a medio salir del borde de cada
  miniatura en teléfono (sin hover no se sabía que se toca).
- Revisado sin cambios: reducir movimiento (todas las animaciones se
  detienen), zonas táctiles ≥ 44 px, logos (uno solo, pie del catálogo).

### Verificación
- `check`, `typecheck`, `lint`, `build`. RSVP completo (incluido "No podré
  asistir") a 320×568 en los 7. Escritorio de control sin cambios.

### Pendiente (teléfono físico)
- WhatsApp real, audio, transición catálogo → diseño, zona segura con
  muesca, y encuadre con fotos reales.

## 2026-10-08 (5) — Segunda revisión "teléfono primero" (7 diseños)

### Qué se hizo
- Auditoría medida (no solo visual) en local y producción, a 320×600,
  360×740, 390×844, 430×932 y 1440: si "Desliza hacia abajo" cabe en la
  primera pantalla, zonas táctiles < 44 px, texto fuera de pantalla,
  imágenes rotas y desborde horizontal.
- Encontrado y corregido:
  - "Desliza hacia abajo" quedaba fuera de la primera pantalla en Gala,
    Riviera (también a 360 px), Tierra y Borgoña a 320 px. Se compactaron
    sus portadas solo en teléfono (foto mínima más chica, márgenes); en
    Gala el "&" va junto al segundo nombre (dos líneas, no tres).
  - En Tierra el texto de "Desliza hacia abajo" se partía en dos líneas
    sobre la foto: `ScrollCue` ahora es de una línea, con menos espaciado
    a 320 px.
  - "o agregar en Google Calendar" (7 diseños) y el número de WhatsApp del
    RSVP medían 40 px de alto: ahora 44 px.
  - Catálogo, "También creamos invitaciones para:": las píldoras parecían
    botones sin serlo; ahora es una lista tipográfica con filetes (una
    columna en teléfono, dos desde 480 px).
- Logos: sin cambios (sigue uno solo, en el pie del catálogo).

### Verificación
- `check`, `typecheck`, `lint`, `build`. Escritorio de Gala, Riviera y
  Tierra sin cambios. Producción: los 7 diseños a 4 anchos y el catálogo
  sin problemas en la auditoría.

## 2026-10-08 (4) — Quinceaños y cumpleaños de bebé: Aurora y Nube

### Qué se hizo
- **Dos diseños nuevos, completos** (guías en `docs/templates/`):
  - **06 Aurora**, quinceaños:
    - Paleta lila, violeta y rosa cuarzo.
    - Portada con espejo ovalado y "XV" gigante de contorno.
    - Nombre en caligrafía (Pinyon Script) y destellos que titilan.
    - Programa de la noche en línea de tiempo.
    - Tira de fotos de cabina.
  - **07 Nube**, cumpleaños de bebé o infantil:
    - Paleta crema, celeste, mantequilla y durazno.
    - Nubes que flotan y globos.
    - Edad en una insignia sobre la foto circular.
    - Bordes ondulados, cuenta regresiva en bloques de juguete.
    - Programa en tarjetas, galería en burbujas.
- **Modelo de datos.** Detalle en "Arquitectura" de `PROJECT-CONTEXT.md`.
  - Las bodas siguen con `couple`; Aurora y Nube usan `honoree` (`name`,
    `age`, `ageLabel?`), y TypeScript exige el correcto según `template`.
  - Campo opcional `schedule` (programa) y `kind` en cada `meta.ts`.
  - `resolve.ts` arma títulos, WhatsApp y calendario con el nombre solo
    ("Fiesta de quince años de Mariana", "Primer cumpleaños de Mateo").
  - Con un solo festejado, el RSVP no pregunta "¿de parte de quién?".
  - `validate.ts` revisa `honoree`, `ageLabel` y las horas del programa, y
    detecta el nombre de la demo olvidado.
- **Catálogo:**
  - Encabezado "Bodas · Quinceaños · Cumpleaños / Siete maneras de
    celebrar".
  - Diseños agrupados en "Bodas" (01–05) y "Quinceaños y cumpleaños"
    (06–07).
  - Sección nueva "**También creamos invitaciones para:**" (bodas,
    quinceaños, cumpleaños, celebraciones infantiles, baby showers, otros
    eventos), sin precios ni paquetes.
  - Título, descripción y tarjeta al compartir del catálogo actualizados.
- **Sin cambios en los cinco diseños de boda.** La única modificación
  compartida que los toca es la línea de `apple-icon` y la tarjeta al
  compartir, que ahora omiten el "&" cuando hay un solo nombre.
- **Marca:** el logo de FARLEY SYSTEMS sigue solo en el pie del catálogo.

### Verificación
- `check` (7 demos sin problemas), `typecheck`, `lint` y `build` (29
  rutas estáticas) sin errores.
- **Fuentes precargadas:** Aurora 3, Nube 2, Olivo 3 (sin cambios);
  catálogo 22.
- **Capturas con emulación móvil** de Aurora y Nube a 320/360/390/430 y
  1440 px:
  - Portada de entrada, primera pantalla y página completa.
  - RSVP completo a 320 px: grupo, validación, vista previa con "la fiesta
    de quince años de Mariana" / "el primer cumpleaños de Mateo", y "No
    podré asistir".
  - Visor de fotos a 320 px.
- **Las siete demos a 320 y 390 px:** sin desbordamiento horizontal, sin
  imágenes rotas y todas las apariciones visibles. Los nombres de las
  bodas siguen intactos.
- **Modo cliente:** `npm run nueva -- nube` + `check` detecta los datos de
  la demo (incluido `honoree.name`); `tsc` aceptó el config. Se restauró
  el catálogo.
- **Ajustes tras la revisión visual:**
  - Fechas y horas de Aurora en Figtree (los números de Italiana se leían
    mal).
  - Botones Maps/Waze de Aurora y Nube uno debajo del otro hasta 640 px.
  - Programa centrado en escritorio.
  - Más aire bajo los títulos de grupo del catálogo.
- **Desplegado** en `invitaciones-digitales-catalogo` y revisado en
  https://invitaciones-digitales-catalogo.vercel.app:
  - Rutas, `.ics` y tarjetas al compartir: 200.
  - Siete demos y catálogo a 320/430 px sin desbordamiento ni imágenes
    rotas.
- **Pendiente de revisión manual:** transición catálogo → Aurora/Nube en
  un navegador visible; fotos reales en el óvalo de Aurora y los círculos
  de Nube.

## 2026-10-08 (3) — Revisión "teléfono primero" y logos

### Hallazgo grave (estaba en producción)
- Las fotos con efecto cortina de **Tierra y Borgoña no aparecían nunca
  en Chrome**: portada, historia, galería y cierre quedaban en blanco.
  `clip-path: inset(100% …)` en el elemento observado hace que Chrome no
  avise la intersección. Ahora el recorte va en un hijo
  (`.reveal-curtain`). En producción: 7/7 y 4/4 visibles (la octava de
  Tierra es el retrato que en teléfono está oculto a propósito).

### Problemas responsive encontrados y corregidos
- **Portadas más altas que la pantalla** (Tierra, Gala, Riviera,
  Borgoña): "Desliza hacia abajo" quedaba fuera. El ancho de la foto en
  teléfono ahora sale del alto de la pantalla (misma proporción).
  Borgoña se recompuso en teléfono: una pantalla vino con la foto a la
  derecha y los nombres debajo.
- **Nombres pegados a los bordes o mal partidos** ("Valeria & Andrés" en
  Olivo; "Camila & / Diego" en los pies): ahora van uno por línea en
  teléfono.
- **"NOS CASAMOS"** de Olivo era ilegible sobre la foto clara.
- **Botones Maps/Waze** de anchos dispares: ahora del mismo ancho y
  ≥ 52 px.
- **Barra "Confirmar asistencia"** tapaba el pie: se oculta sobre el
  `<footer>`.
- **"← Diseños"** tapaba títulos todo el tiempo: se esconde al bajar.
- **Botón de WhatsApp a 320 px:** el ícono se comprimía hasta ser un
  punto.
- **Asterisco de "obligatorio"** solo en una línea.
- **Gala:** "Ver mesa de regalos" partido en dos líneas a 320 px.
- **Borgoña:** horas, minutos y segundos se partían; ahora van en 3
  columnas.
- **Imágenes de demostración:** la etiqueta se cortaba en arcos, círculos
  y recortes; ahora va centrada (`npm run placeholders`).
- **Catálogo en teléfono:**
  - Hero más corto.
  - Índice tocable de los cinco diseños.
  - Nombre y número antes de cada miniatura.
  - Botón lleno a todo lo ancho ("Ver Olivo").
  - Lista "En todos los diseños" más compacta.
- Animaciones de aparición más cortas y con menos desplazamiento.

### Logos
Tres PNG en `public/logos/`, sin modificar:
- `farley-systems-and-icon-logo.png`: horizontal, ícono + nombre.
- `farley-systems-logo.png`: solo nombre.
- `farley-icon.png`: la "F", cuadrado.

Están hechos para fondo oscuro. Uso:
- **Se usa el horizontal una sola vez:** pie del catálogo, en franja
  oscura con "Creado por".
- **No se usan:** en las invitaciones, las demos y el ícono de pestaña.

Razones en "Marca del estudio" de `PROJECT-CONTEXT.md`.

### Verificación
- `check`, `typecheck`, `lint` y `build` sin errores.
- **Capturas con Chrome headless y emulación móvil** (táctil, DPR 2):
  catálogo y cinco diseños a 320/360/390/430 y 1440 px, antes y después.
  Incluyen las portadas "Abrir invitación", el flujo RSVP completo a
  320 px (grupo, validación, nombres, vista previa, "No podré asistir") y
  el visor a 320/390.
- Sin desbordamiento horizontal en ningún ancho.
- Desplegado en el mismo proyecto nuevo (`invitaciones-digitales-catalogo`)
  y revisado en https://invitaciones-digitales-catalogo.vercel.app:
  rutas 200, cortinas visibles, sin imágenes rotas.
- **Pendiente de revisión manual:**
  - La transición catálogo → diseño, vista en un navegador visible.
  - Audio y WhatsApp en un teléfono real.
  - Gala: el visor muestra la foto a color (decidir si debe ser en
    blanco y negro).

## 2026-10-08 (2) — Catálogo de cinco diseños + despliegue

### Qué se hizo
- **Arquitectura** (detalle y razones en `PROJECT-CONTEXT.md`):
  - `lib/invitation/` con tipos, resolución, fechas con zona horaria,
    WhatsApp, calendario, imágenes y validación.
  - `templates/` con lógica compartida (`shared/`) y un diseño por carpeta.
  - `app/plantillas/<diseño>/` estáticas.
  - Modo catálogo/invitación según `config/invitation.ts`, con reescritura
    de `/` en `next.config.ts`.
- **Cinco diseños:**
  - 01 Olivo: el original, con la galería rediseñada.
  - 02 Tierra: revista, café.
  - 03 Gala: negro, dorado y plata, fotos en B/N.
  - 04 Riviera: cobalto, porcelana y limón.
  - 05 Borgoña: vino y rosa, tipográfico.

  Paletas nuevas: Riviera y Borgoña. Una guía por diseño en `docs/templates/`.
- **Catálogo** en `/`, con transición de View Transitions de la tarjeta a
  la portada del diseño. En las demos, el RSVP muestra el mensaje en vez de
  abrir WhatsApp.
- **Imágenes de demostración abstractas** (`npm run placeholders`). No se
  usó ningún asset de la boda.
- **Problemas de la auditoría resueltos:**
  - Galería en teléfono: marcos con proporción fija igual a la guía
    (`Frame.tsx`).
  - Después del evento: mensajes de "hoy" y "gracias"; el RSVP y la barra
    flotante desaparecen; aviso al pasar la fecha límite.
  - `date` + `time` + `timeZone` en vez del desfase escrito a mano.
  - `npm run check`, que corre antes de cada build.
  - Detalles de 320 px.
  - "boda" configurable (`event`).
  - Ícono y tarjeta para compartir generados con la paleta. Se quitaron
    `icon.svg`, los PNG y `generate-icons.mjs`.
  - Copiar con método alternativo y mensaje si falla.
  - Calendario con todos los lugares y líneas de 75 bytes (RFC 5545).
  - `optimize-images` endereza por EXIF antes de redimensionar.
  - Comentarios heredados y `.gitignore` limpios.
- **Otros:**
  - `npm run nueva -- <diseño>`.
  - Protección contra el modo oscuro forzado (Dark Reader lo invertía todo).
- Archivos de la arquitectura anterior movidos a `_anterior/`: no hubo
  permiso para borrarlos; quedan para que el dueño los borre.

### Hallazgos técnicos (no obvios)
- Con imports de los cinco diseños en una página, **todas** precargaban
  las 17 fuentes. Ni el import dinámico ni una ruta estática bastaban:
  Turbopack junta el CSS de fuentes en un solo archivo. Solución: una
  carpeta de ruta por diseño + `experimental.cssChunking: { type: "graph",
  requestCost: 2000 }`. Resultado: 2-3 fuentes por diseño; el catálogo, 17
  (las necesita).
- `clip-path` en todas las variantes de `Reveal` recortaba lo que
  sobresalía (sol de Riviera). Ahora solo lo usa la variante "cortina".
- Rejillas sin `grid-cols-1` en móvil se ensanchaban con el contenido a
  320 px.
- En pestañas automatizadas en segundo plano, View Transitions se cancela
  ("Document hidden") y las capturas fallan a veces. Se verificó que React
  llama a `startViewTransition` al tocar una tarjeta; la animación en sí
  hay que verla en un navegador normal.

### Verificación
- `npm run check`, `typecheck`, `lint` y `build`: sin errores (23 rutas
  estáticas).
- Modo cliente probado con `npm run nueva -- riviera`:
  - `check` detecta los datos de la demo.
  - `/` muestra la invitación (título, imagen al compartir, `.ics` del
    cliente) y las otras demos dan 404.
  - Se restauró el modo catálogo.
- Navegador (build local):
  - Cinco diseños a 390, 360 y 320 px sin desbordamiento ni botones
    recortados.
  - RSVP (validación, grupo, vista previa de demo, "no podré asistir").
  - Visor (Escape, foco de vuelta).
  - Después del evento: "Gracias por estar."; el RSVP y la barra se ocultan.
- **Vercel:**
  - Proyecto nuevo `invitaciones-digitales-catalogo` (en el equipo
    personal de Vercel del dueño), sin nada de la boda.
  - Se configuró el framework `nextjs`: sin él, el primer despliegue daba
    NOT_FOUND.
  - URL: https://invitaciones-digitales-catalogo.vercel.app
  - Todas las rutas responden 200. Revisados la metadata, las imágenes al
    compartir y los `.ics`.
- No probado: audio real y WhatsApp real en un teléfono.

### Repositorio limpio para GitHub (cuando el dueño lo decida)
*(Hecho el 2026-10-08, ver la entrada "(8)".)* No se borró el historial.
Pasos propuestos:

1. Borrar `_anterior/`.
2. Copiar el proyecto sin `.git`, `node_modules`, `.next`, `.vercel` ni
   `.env*` a una carpeta nueva.
3. `git init`, primer commit y crear el repositorio.

El `.git` actual (historial de la boda) queda solo en local o archivado en
privado. `.env.local` lo creó `vercel link` (token OIDC temporal), está
ignorado por git y por Vercel, y se puede borrar.

## 2026-10-08 — Retomar el proyecto: auditoría completa (sin cambios de código)

### Qué se hizo
- Lectura de toda la documentación y del código; typecheck, lint y build
  (los tres sin errores; no hay tests). Build de producción revisado en
  Claude in Chrome: escritorio y iframes de 390 y 320 px — sin
  desbordamiento horizontal ni errores de consola. RSVP individual/grupo y
  "no podré asistir" generan mensajes correctos; `/calendario.ics`,
  `/opengraph-image`, metadata y manifest correctos. No probado: audio real
  (no hay archivo en la plantilla y el entorno no reproduce sonido), Waze
  (no configurado en el ejemplo).
- Historial Git revisado sin modificarlo: 41 commits de la boda original
  con lista real de invitados, fotos personales, la canción, teléfonos y la
  URL de producción. Sin credenciales de base de datos. Sin remoto.
- Docs: precios hipotéticos eliminados de `PROJECT-CONTEXT.md`, `README.md`
  y de este log (nunca fueron decisiones; todo lo comercial quedó como
  "PENDIENTE DE DEFINICIÓN"). `PROJECT-CONTEXT.md` reorganizado (estado,
  stack, estructura, centralizado/no centralizado, limitaciones, riesgos,
  pendientes). `README.md`: copiar sin `.git`; aviso de galería en teléfono;
  la cuenta regresiva cambia a la *hora* del evento, no "el día".
  `photo-map.md`: proporciones reales de los marcos. `CLAUDE.md`: reglas
  de trabajo y documentación viva. Ruta del panel de la boda original
  quitada de este log.

### Hallazgos principales (detalle en el informe de la sesión)
1. Galería: en teléfono los marcos no tienen la orientación pedida.
2. Después del evento siguen activos el RSVP, la barra flotante y la fecha
   límite; `afterMessage` queda para siempre.
3. `dateISO` (offset propio) y `site.timeZone` pueden contradecirse.
4. Sin validación del config (`REEMPLAZAR`, `site.url`, WhatsApp).
5. "Boda" fijo fuera del config; favicon con colores de `botanico` fijos.
6. Detalles a 320 px: "HORAS" toca el borde de su caja, el ✓ del RSVP
   roza "Individual", "Confirmar por WhatsApp" en dos renglones.
7. Contenido de ejemplo contradictorio: el aviso dice que la recepción es
   "inmediatamente después" pero el ejemplo pone otra hora y otro lugar.
8. `optimize-images` calcula el lado largo antes de rotar por EXIF;
   `npm run icons` crea `preview-16/32.png` que nadie usa.

### Propuestas técnicas (priorizadas, pendientes de aprobación)
- Necesarias: decidir el repositorio limpio; resolver la galería en
  teléfono; comportamiento posterior al evento.
- Convenientes: `npm run check` que falle si queda `REEMPLAZAR`, `site.url`
  de ejemplo o número `0000`; derivar el offset de `site.timeZone`;
  ajustes de 320 px; ícono desde el tema.
- Opcionales: `site.url` desde `VERCEL_PROJECT_PRODUCTION_URL`; tipo de
  evento configurable; portada sin música opcional.

## 2026-10-03 (2) — Auditoría comercial del producto Plantilla

### Conclusión de la auditoría
Base sólida y completa. Le faltaban, por orden de impacto para el cliente:
la vista previa al compartir por WhatsApp (usaba la foto vertical del Hero,
que WhatsApp recorta), una forma de decir "no podré asistir", un recordatorio
de calendario, padres/padrinos (pedido muy común; sin él sería la primera
solicitud de cambio) y qué pasa después de la fecha (la cuenta regresiva
quedaba en ceros). En la documentación faltaban los límites escritos del
producto, la lista de datos a pedir al cliente y la revisión antes de
entregar. No se eliminó ninguna funcionalidad.

### Cambios
- `app/opengraph-image.tsx`: tarjeta 1200×630 igual a la portada (eyebrow,
  nombres, fecha, colores del tema), con Playfair/Jost descargadas de Google
  Fonts en el build y respaldo sin esas tipografías si no hay internet. Los
  nombres largos reducen su tamaño. Se quitó `images` de la metadata del
  layout. PNG de ~48 KB.
- `app/calendario.ics/route.ts` (`force-static`) + `buildCalendarFile()` y
  `googleCalendarUrl` en `lib/invitation.ts`: "Agregar a mi calendario" bajo
  la fecha, con recordatorio un día antes; duración = `durationHours`.
- `components/Family.tsx` + `family` en el config: padres/padrinos,
  tipográfico, sin foto, comparte fondo con Story.
- RSVP: "¿No podrás asistir? Avísanos aquí" (`allowDecline`) abre un campo
  de nombre → WhatsApp con mensaje amable (`buildDeclineUrl`). El número
  suelto bajo el formulario pasó a "¿Tienes alguna duda? Escríbenos al
  WhatsApp …".
- Countdown: desde la fecha del evento muestra `countdown.afterMessage`
  ("¡Llegó el gran día!").
- Encabezado de "Antes de venir" ya no repite "Importante" (eyebrow
  "Detalles"; la tarjeta conserva su etiqueta "Importante").
- Docs: `README.md` (datos a pedir al cliente, lista antes de entregar,
  campos nuevos), `PROJECT-CONTEXT.md` (precios hipotéticos — retirados el 2026-10-08,
  límites del producto, riesgos de producción, demo comercial).

### Decidido NO agregar (y por qué)
Mapa embebido (el botón ya cumple, y un iframe de Maps pesa y confunde en
teléfono), itinerario del día, hospedaje, video, más fotos en galería,
navegación anterior/siguiente en el visor (son 4 fotos y "Cerrar" es más
claro para personas mayores), invitaciones con nombre por invitado, RSVP con
base de datos, dominio propio, multi-idioma, más paletas o selector de
tipografías: todo eso aumenta el trabajo o las solicitudes de cambio por
cliente; queda para Personalizada o como extra cotizado.

### Verificación
- `npm run typecheck`, `npm run lint`, `npm run build`: sin errores. Rutas
  nuevas estáticas: `/calendario.ics` (`text/calendar`, 22:00Z = 4:00 p. m.
  de CR, fin según `durationHours`) y `/opengraph-image` (`image/png`); las
  meta `og:image` apuntan a ella con 1200×630 y su `alt`.
- Navegador: escritorio y iframes de 390/320 px — bloque de padres, botón
  de calendario (a 320 px se partía en dos renglones: se dejó en uno con
  menos relleno por debajo de 360 px), RSVP con "no podré asistir"
  (validación de nombre vacío y mensaje generado correcto), línea de
  contacto. Con una fecha pasada temporal se vio "¡Llegó el gran día!" en
  lugar de los números; luego se restauró la fecha de ejemplo.

## 2026-10-03 — Conversión de la invitación de boda en plantilla comercial

### Qué se encontró
- Ya existía una fuente de datos (`lib/wedding.ts`), pero muchos datos de la
  boda estaban fuera: metadata/Open Graph/manifest, fechas escritas a mano
  en Footer y StickyRSVP, textos (hija de la pareja, "solo ceremonia
  religiosa", versículos, regalos), `alt` con nombres, zona horaria
  repetida en 5 componentes.
- Panel privado de invitados (ruta oculta `app/panel-…/`) acoplado a la pareja y a su
  base de datos Neon, con la lista real de invitados en
  `scripts/seed-real-guests.mjs`.
- En la copia: `.env.local` con credenciales reales de la base de datos y
  contraseña del panel; `.vercel/` enlazado al proyecto de Vercel de la
  boda; 12 fotos personales en `img/` y `public/images/`; la canción de la
  boda en `public/audio/`.

### Qué se cambió
- **Eliminado**: `.env.local`, `.vercel/`, `img/`, fotos y audio de la boda,
  `photo-recommendations.md`, todo el panel (`app/panel-…/`,
  `lib/admin-*`, `lib/db.ts`, `lib/guests.ts`, `proxy.ts`,
  `AdminGateTrigger.tsx`, scripts de base de datos y el seed de invitados) y
  sus dependencias (`@dnd-kit/*`, `@neondatabase/serverless`). Cómo
  reutilizar el panel: `PROJECT-CONTEXT.md`.
- **Nuevo `config/invitation.ts`**: único archivo de datos del cliente, con
  contenido de ejemplo identificable ("Novia & Novio", `0000 0000`,
  "Nombre del lugar") y marcas `REEMPLAZAR`. Secciones opcionales con `null`.
- **`lib/types.ts`** (forma documentada de los datos), **`lib/themes.ts`**
  (paletas `botanico`, `noche`, `rosa`), **`lib/invitation.ts`** (antes
  `lib/wedding.ts`: fechas formateadas con `Intl` + zona horaria del config,
  título/descripción, variables de color, mensaje de WhatsApp).
- Colores: ya no están en `globals.css`; `layout.tsx` los inyecta desde el
  tema como variables CSS. Metadata, Open Graph, `themeColor` y manifest
  salen del config.
- Componentes: todos leen del config. `Family.tsx` → `Story.tsx` (foto +
  pie + cita, sin referencias familiares fijas). `VerseMoment` recibe
  `quote`. `CountdownSection` admite varios lugares con etiqueta, hora y
  Waze opcional. `Details` con aviso configurable (`*resaltado*` vía nuevo
  `Emphasis.tsx`) y colores a evitar con su `hex`. `Gifts` con método/valor
  opcionales y enlace a mesa de regalos. `RSVP` con paso "¿de parte de
  quién?" opcional (los números de paso se recorren) y fecha límite.
  `MusicPlayer` recibe la canción por props y solo se monta si hay música.
- Imágenes placeholder generadas (`scripts/generate-placeholders.mjs`, 9
  espacios con su orientación). En Hero y cierre el rótulo va arriba y más
  pequeño: con el recorte `cover` en escritorio chocaba con los nombres.
- `scripts/optimize-images.mjs` acepta `.jpg` además de `.jpeg`. Nuevos
  scripts npm: `typecheck` (`next typegen && tsc --noEmit`, porque
  `LayoutProps` se genera en `.next/types`), `placeholders`,
  `optimize-images`, `icons`. Paquete renombrado a `invitacion-plantilla`.
- Documentación: `README.md` (guía para crear una invitación),
  `PROJECT-CONTEXT.md` (producto, arquitectura, reglas
  heredadas, panel), `photo-map.md` (espacios de fotos), este log.

### Verificación
- `npm run typecheck`, `npm run lint`, `npm run build`: sin errores. Rutas
  generadas: `/`, `/_not-found`, `/icon.svg`, `/apple-icon.png`,
  `/manifest.webmanifest` (ya no existe ninguna ruta de panel).
- Navegador (build de producción, Claude in Chrome): portada, Hero y todas
  las secciones en escritorio (1536px) y en iframes de 390px y 320px; sin
  desbordamiento horizontal. Título de la pestaña "Novia & Novio — 17 de
  abril de 2027".
- RSVP: error de validación con nombres vacíos, "Paso 4 de 4" en grupo, y
  mensaje generado correcto hacia `wa.me/50600000000`.
- Configuración alternativa (tema `rosa`, `referrerOptions: []`, sin aviso
  ni galería, un lugar con Waze, enlace de mesa de regalos, música con un
  WAV de prueba): las secciones ocultas desaparecen, el RSVP empieza en
  "Paso 1 de 2", el reproductor pasa a "Pausar…" con un clic real. Luego se
  restauró el config de ejemplo y se borró el audio de prueba.
- Búsqueda de los nombres de la pareja y su hija, el lugar, los números de
  teléfono y la URL de la boda en código y documentación: sin resultados.
- No verificado: sonido audible real (el entorno de automatización no
  reproduce audio) — probar en un teléfono al entregar la primera invitación.
