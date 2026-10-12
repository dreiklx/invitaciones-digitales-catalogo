# Project Log

Historial del proyecto (lo más reciente primero). El historial de la boda
de la que nació (sesiones 2026-09-13 a 2026-09-29) queda en el proyecto
original; sus lecciones vigentes están en `PROJECT-CONTEXT.md`.

## 2026-10-12 (tarde) — Navegación permanente y "Otros diseños"

### Qué se hizo
- **Barra de navegación** (`templates/shared/PageNav.tsx`) en los ocho
  diseños y el catálogo: abajo en el teléfono ("Inicio", "Secciones",
  "Confirmar"; panel con todas las secciones y la actual marcada), arriba a
  la derecha en escritorio ("Inicio", "Secciones: <actual>" con menú y
  "Confirmar asistencia"). Aparece al empezar a bajar, se aparta al
  escribir y sobre el formulario de confirmación (en el teléfono), salto
  suave con el foco en la sección. Reemplaza a `StickyRsvp`. Cada diseño
  la pinta con los colores que tenía su barra de confirmar.
- **Secciones centralizadas:** `navSections()` (`lib/invitation/sections.ts`)
  desde la configuración (lo que está en `null` no aparece); `id` comunes
  en los ocho diseños (`historia`, `fecha`, `lugares`, `programa`,
  `detalles`, `galeria`, `regalos`, `confirmar`; antes `ceremonia`
  cambiaba de significado); `navLabels` en meta para "Nuestra espera",
  "Mi mensaje" y "Sobre mí".
- **"Otros diseños"** (`templates/shared/DesignsMenu.tsx`), solo en demos:
  arriba a la izquierda (reemplaza a "← Diseños") y desde el panel del
  teléfono; los ocho diseños por categoría con foto, número, tipo de
  evento y colores; vuelve al catálogo. `designsMenuFor()` devuelve null
  en una invitación de cliente.
- El catálogo usa la misma barra para sus cuatro categorías.

### Verificación
- `npm run verify` limpio: `npm test` 131/131; `npm run test:e2e` 296
  pasadas y 8 omitidas a propósito (304), 22 min. Nuevas:
  `tests/unit/sections.test.ts` y `tests/e2e/navigation.spec.ts` (salto a
  cada sección de cada diseño con el título visible, teclado, reducir
  movimiento, RSVP y música con la barra, cambio de diseño y regreso).
- Las pruebas encontraron y se corrigió: la barra tapaba "Confirmar por
  WhatsApp" cuando quedaba al pie de la pantalla, y "Otros diseños"
  chocaba con el aviso de música a 320 px.
- Revisión visual de la barra en los ocho diseños (360 px), del panel, del
  selector (390 y 1366) y del menú de escritorio.
- Pendiente manual: probar la barra con una mano en teléfonos reales
  (zona segura de iPhone, teclado abierto en el RSVP).

## 2026-10-12 — Arrullo vuelve, Riviera pasa a aniversarios y auditoría de usabilidad

### Qué se hizo
- **Baby shower = Arrullo otra vez** (crema, salvia y mantequilla):
  `templates/arrullo/` restaurado del commit `d19a084` (paleta, luna,
  banderines, puntadas, sellos, cuenta regresiva, miniatura), con la demo
  y las fotos que tenía Riviera como baby shower (movidas sin cambios a
  `public/plantillas/arrullo/fotos/`). Reproductor propio `puntada`.
  `/plantillas/arrullo` vuelve a ser una página.
- **Riviera se conserva** con su identidad original (cobalto, porcelana,
  limón, arcos, sellos, Gloock, reproductor `sello`) como diseño **08 de
  Aniversarios** (aniversario de bodas o renovación de votos), con
  `couple`. Demo: Elena y Tomás renuevan sus votos; fotos: la sesión del
  olivar (Igor La Prado, Pexels) que Olivo usó el 2026-10-11, tomada del
  historial y recortada (no se buscaron fotos nuevas). Motivo y
  alternativas: PROJECT-CONTEXT. Catálogo: ocho diseños, cuatro
  categorías (`components/catalog/groups.ts`).
- **Indicador para seguir leyendo:** "Desliza hacia abajo" → "Desliza
  hacia arriba" con una mano que sube (táctil) y "Desplázate hacia abajo"
  (mouse); en escritorio queda fijo al pie de la pantalla hasta su lugar.
- **Usabilidad** (tabla U1–U16 en `docs/auditoria.md`): aviso de música
  en la portada y junto al reproductor; "Toca una foto para verla en
  grande"; "Abrir en Google Maps" / "Abrir en Waze"; RSVP con "Solo yo" /
  "Varias personas", aviso de no asistir más claro y "¿No se abrió? Toca
  aquí"; logo del estudio con "Ver en Instagram". Fallos encontrados por
  las pruebas nuevas y corregidos: Tierra a 320×568 tenía "Abrir
  invitación" cortado; Olivo dejaba el indicador fuera de la pantalla a
  360–430 px y partía "Florinda" a 1024 px.
- **Pruebas:** tamaños con alto (320×568, 320×600…); `scroll-cue.spec.ts`
  (indicador y portada en los ocho diseños); categorías e identidad propia
  de cada diseño en `config.test.ts`; RSVP, galería y música ampliadas.

### Verificación
- `npm run verify` limpio: lint, tipos, `check` y build sin errores;
  `npm test` 111/111; `npm run test:e2e` 256 pasadas y 8 omitidas a
  propósito (264), en 14,6 min. Dos corridas anteriores tuvieron fallas de
  tiempos en las pruebas (aviso de música buscado después de que se
  ocultara; regreso al catálogo lento con carga); se corrigió la prueba,
  no se quitó la comprobación. La prueba de la galería encontró que
  `focus()` al cerrar el visor podía mover la página: corregido con
  `preventScroll`.
- Revisión visual: portadas a 320×568, 390×844, 1024×768 y 1366×768;
  Arrullo y Riviera completos; catálogo a 1440.
- Pendiente manual: el gesto real de deslizar, el audio y WhatsApp
  ("¿No se abrió?") en un teléfono físico; el `.ics` en Android.

## 2026-10-11 (noche) — Datos de demo en `nueva`, música más liviana, fecha de Tierra y pruebas

### Qué se hizo
- **`npm run nueva` reescrito** (`scripts/new-invitation.ts` +
  `scripts/lib/new-invitation.ts`): transforma la demo como datos en vez
  de editar su texto. Además de los nombres, deja en "REEMPLAZAR"
  familiares, lugares, WhatsApp, regalos, URL, pie de la historia y frases
  firmadas por la demo (la causa de "Renata" en Aguamarina), y reemplaza
  cualquier texto que nombre a una persona o un lugar de la demo
  (`demoMarkers`, `lib/invitation/names.ts`, que también usa `check`).
- **Música:** 26,6 MB → 17,6 MB re-codificando en MP3 VBR con un umbral
  medido por pista (tabla en README); la cajita de Nube quedó igual.
- **Tierra:** "22 de mayo de 2027" en la cabecera de la portada inicial,
  la portada y la miniatura (antes "22.05.27").
- **Pruebas:** `npm test` (97 pruebas de configuración y generación),
  `npm run test:e2e` (146 pruebas de Playwright con el Chrome instalado),
  `npm run verify`. `@playwright/test` como dependencia de desarrollo.
- Fotos sin cambios en los siete diseños.

### Verificación
- `check`, `typecheck`, `lint`, `build`, `npm test` y `npm run test:e2e`
  sin errores. Se comprobó que las pruebas fallan ante errores reales:
  generador sin limpiar citas o regalos (12 fallos), y un elemento más
  ancho que la pantalla sin el recorte del layout (falla en 390 y 1366).
- Revisión visual de Tierra (320, 390, 1440) y de su miniatura.
- Dos builds locales fallaron por la red al bajar tipografías de Google
  Fonts (problema previo, registrado en `docs/auditoria.md`, P9); al
  repetir, pasaron.
- Pendiente manual: escuchar las pistas en un teléfono real.

## 2026-10-11 (tarde) — Don Ramón y Doña Florinda, Aguamarina, fecha de Gala y auditoría

### Qué se hizo
- **Olivo:** vuelve a **Don Ramón y Doña Florinda** con las 7 fotos
  originales de la carpeta del Escritorio (copiadas a JPG sin agrandar,
  originales intactos), integradas en el diseño editorial actual. Derechos
  de imagen y de los personajes **PENDIENTES DE AUTORIZACIÓN**
  (photo-map.md). El monograma quita el tratamiento ("R · F").
- **Avisos de demostración** (cada demo y pie del catálogo): ya no afirman
  una licencia de Pexels; dicen que las personas o personajes no son
  clientes ni respaldan el servicio.
- **Gala:** fecha legible ("13 de noviembre de 2027", `dates.long`) en
  portada inicial, portada, pie y miniatura, en lugar de números romanos.
- **Camelia → Aguamarina:** nombre visible e id (`aguamarina`), carpetas,
  ruta, fotos, guía `05-aguamarina.md`; `/plantillas/camelia` y
  `/plantillas/borgona` redirigen (308) a `/plantillas/aguamarina`.
- **Catálogo:** "Creamos invitaciones para:"; el logo de Farley Systems
  enlaza a su Instagram (pestaña nueva, `noopener noreferrer`, nombre
  accesible y foco visible).
- **Seguridad:** `next` 16.3.8 (avisos, uno crítico en `next/og`),
  `sharp` 0.35.5, `npm audit fix`. Producción: 0 vulnerabilidades.
- **Auditoría y propuestas** (no implementadas): `docs/auditoria.md`.

### Verificación
- `check`, `typecheck`, `lint`, `build` sin errores.
- Sin desplazamiento lateral: 320/360/390/430 (toques reales), 320 con
  letra al 125 % y 1024/1366/1440/1920 (barra visible y rueda lateral):
  72/72. Música en los 7. Foco del enlace de Instagram con Tab.
- `npm run nueva -- olivo` y `-- aguamarina`: nombres y fotos en
  "REEMPLAZAR"; `config/invitation.ts` restaurado a `null`.

## 2026-10-11 — Auditoría de fotos, Camelia "Aguamarina" y regreso de Riviera

### Qué se hizo
- **Auditoría de fotos y derechos** (photo-map.md): las 46 fotos de las
  siete demos comprobadas una por una en Pexels (autor, enlace, licencia).
  Documentado que la licencia de Pexels no garantiza autorizaciones de las
  personas (términos del 15-11-2024). Aviso visible en cada demo
  (`Shell.tsx`) y en el pie del catálogo: nombres ficticios, fotos de
  stock, las personas no son clientes ni recomiendan el servicio.
- **Olivo:** las fotos de "Ramón y Florinda" (procedencia no verificable,
  personajes reconocibles de una serie de TV) se reemplazaron por una
  sesión de Pexels en un olivar (Igor La Prado); la pareja de la demo es
  ahora **Elena y Tomás**. Los originales del Escritorio no se tocaron.
- **Nube:** Pexels describe a la bebé de la sesión como niña; la demo pasó
  de "Mateo" a **Emma**.
- **Camelia rediseñada ("Aguamarina"):** azul petróleo, perla, aguamarina
  y oro champán; marcos tallados como una esmeralda, tiara de línea fina,
  Cormorant cursiva, cuenta regresiva en gemas, tarjetas talladas,
  programa con línea y rombos; reproductor `broche` en forma de gema.
  Nueva sesión de fotos en un salón de fiesta (Juliano Astc). Diagnóstico
  frente a Aurora en `docs/templates/05-camelia.md`.
- **Riviera recuperada** desde el commit `6c9d245` de este repositorio:
  ornamentos, tipografías, cuenta regresiva, paleta y reproductor
  originales; plantilla y miniatura restauradas y adaptadas solo en textos
  al **baby shower**, en el lugar de Arrullo (que deja de existir;
  `/plantillas/arrullo` redirige a `/plantillas/riviera`).
- **Catálogo:** la categoría se llama **Quinceaños** (una palabra) en el
  índice, los encabezados y las tarjetas; siguen siendo siete diseños.

### Verificación
- `check`, `typecheck`, `lint`, `build` sin errores.
- Sin red de seguridad: escritorio (1024, 1366, 1440, 1920) y móvil (320,
  360, 390, 430, más 320 con letra al 125 %) con toques/clics reales,
  música, visor y RSVP; música con pausa y reanudación en los 7.
- `npm run nueva` probado con Olivo, Camelia y Riviera.
- Revisión visual de Camelia, Riviera y Olivo a 390 y 1440 px.

### Pendiente
- Reemplazar las fotos de menores (Aurora, Camelia, Nube) por sesiones con
  autorización firmada antes de una campaña comercial.

## 2026-10-10 — Tres categorías, Olivo nuevo, Camelia, Arrullo y Nube festiva

### Qué se hizo
- **Catálogo en tres categorías** (exactamente 7 diseños): Bodas (01
  Olivo, 02 Tierra, 03 Gala) · Quince años (04 Aurora, 05 Camelia) ·
  Bebés (06 Arrullo, baby shower; 07 Nube, primer cumpleaños). Cada
  categoría con título, descripción e índice; cada tarjeta dice su tipo de
  evento. `kind` nuevo: `baby-shower`.
- **Renombres:** `riviera` → `arrullo` y `borgona` → `camelia` (carpetas,
  rutas, guías `docs/templates/04-aurora`, `05-camelia`, `06-arrullo`);
  `/plantillas/riviera` y `/plantillas/borgona` redirigen (308).
- **Olivo rediseñado por completo** (misma paleta olivo/lino): portada a
  dos columnas, nombres en columna ("Ramón / y Florinda"), fecha como
  ficha de tres cifras, díptico, cuenta regresiva en franja, itinerario con
  línea de tiempo, mosaico a sangre, Newsreader + Manrope, reproductor
  `lino` (marcapáginas). Espacios de foto: 7 (uno por foto de la sesión).
- **Camelia** (quince años, sobre la base de Borgoña): nombre monumental,
  medallón XV, programa de la noche, corte de honor; reproductor `broche`.
- **Arrullo** (baby shower, sobre la base de Riviera): crema, salvia y
  mantequilla; luna, banderines y puntadas; nuevo `shower` en el config
  (`parents`, `babyName` opcional) y `hero.title`; nada supone el sexo
  del bebé.
- **Nube** más festiva: banderines, globos, estrellas que titilan,
  confeti que cae despacio, velita sobre la edad ("1 añito"), bloques de la
  cuenta regresiva que botan; todo quieto con "reducir movimiento".
- **Aurora:** la quinceañera de la demo pasa a ser **Valentina**.
- **Fotos:** sesiones de stock de Pexels, una por diseño, para Aurora,
  Camelia, Arrullo y Nube (fuentes en photo-map.md); sin imágenes
  abstractas en ninguna demo. No se generó ninguna imagen.
- **Demos separadas de los clientes:** `npm run nueva` deja en
  "REEMPLAZAR" `couple`, `honoree.name` y `shower.parents`; `npm run
  check` da error si cualquier texto de un cliente nombra a la persona de
  la demo.

### Verificación
- `check`, `typecheck`, `lint`, `build` sin errores.
- Sin red de seguridad: escritorio (barra de 15 px, clic y rueda real,
  rueda lateral) a 1024×768, 1366×768, 1440×900 y 1920×1080 → 32 casos;
  móvil (toques reales) a 320×568, 360×740, 390×844 y 430×932 → 32 casos,
  más 320×568 al 125 % → 8: sin desbordamiento ni desplazamiento lateral,
  visor y RSVP recorridos, música sonando en todos.
- Música con pausa/reanudación en los 7. `npm run nueva` probado con
  Olivo, Aurora, Camelia, Arrullo y Nube.
- Revisión visual: los 7 diseños y el catálogo a 320, 390 y 1440.

### Pendiente
- Teléfono físico: animaciones de Nube y música al abrir.
- Derechos de imagen de las fotos de Olivo (personajes de TV).

## 2026-10-09 (7) — Desplazamiento lateral en escritorio y fotos de Gala

### Qué se hizo
- **Escritorio, investigado en Chrome real y con barra visible:** no hay
  ningún desbordamiento (ni con la red de seguridad quitada) en 640-2560
  px. Lo que movía la página de lado:
  - la barra vertical desaparecía al bloquear el desplazamiento (portada
    "Abrir invitación", visor de fotos) y todo saltaba ~7,6 px al abrir y
    cerrar → `html { scrollbar-gutter: stable }` + `scroll-lock.ts`, que
    pinta el hueco reservado con el fondo de la capa;
  - el gesto horizontal del trackpad deslizaba la página entera →
    `html { overscroll-behavior-x: none }`.
- **Gala con fotos reales:** 6 fotos de una sola sesión de boda de Pexels
  (Li Chunyu, licencia de Pexels): salón clásico con lámparas de araña,
  encaje y esmoquin; recortadas a 3:4 y 16:9 en
  `public/plantillas/gala/fotos/`. Gala las muestra en blanco y negro. Se
  borraron las 6 imágenes abstractas de Gala. Sin generador de imágenes.

### Verificación
- Escritorio (barra de 15 px, clics reales, rueda vertical y horizontal
  en 5 puntos por pantalla, portada, música, reproductor, visor, RSVP):
  catálogo + 7 diseños a 1024×768, 1280×720, 1366×768, 1440×900,
  1600×900 y 1920×1080 → 48 casos sin desbordamiento, sin
  desplazamiento lateral y sin salto (ancho de `body` constante); 16 más
  sin la red de seguridad; antes, a 640-1000 y 2560, 64 casos sin
  desbordamiento. En Chrome real (1536 px): antes la miniatura se movía
  7,6 px al abrir el visor; ahora 0.
- Regresión móvil (toques reales, sin red): 320×568, 390×844 y 360×740
  al 125 %: 24 casos limpios. Música con pausa/reanudación en los 7.
  `npm run nueva -- gala`: sin nombres ni fotos de la demo.

### Pendiente
- Confirmar en un Mac con trackpad (Safari y Chrome) que el gesto lateral
  ya no desliza la página.

## 2026-10-09 (6) — Desplazamiento horizontal (causa real) y fotos de Tierra

### Qué se hizo
- **Desplazamiento horizontal, investigado de cero** (el dueño todavía
  podía mover la página de lado en su teléfono):
  - La red `body{overflow-x:clip}` no recortaba: el `overflow` de `<body>`
    se traslada a la ventana, donde vale como `hidden`, e iOS Safari no lo
    respeta frente al dedo. Ahora el `clip` está en un `<div>` envoltorio
    (`app/layout.tsx`) y `body` lleva `overflow-wrap: break-word`.
  - Causa concreta en los 7 diseños: la portada "Abrir invitación" se
    escalaba (1,03) siendo una capa fija → 4-6 px fuera de la pantalla por
    lado durante 0,7 s, justo al empezar. El scale pasa a un hijo dentro de
    la capa (`Gate.tsx`), que recorta.
  - Prueba nueva (detalle en PROJECT-CONTEXT, "Cómo medir"): gestos
    táctiles reales, monitor por fotograma, red de seguridad desactivada.
- **Tierra con fotos reales:** 8 fotos de una sola sesión de pareja de
  Pexels (Alexander Mass / Reborn Filmes, licencia de Pexels), recortadas
  a la proporción de cada marco en `public/plantillas/tierra/fotos/`. Se
  borraron las 8 imágenes abstractas de Tierra. No hay generador de
  imágenes en este entorno: no se generó ninguna.

### Verificación
- Matriz sin red de seguridad: catálogo y 7 diseños × 280×600, 320×568,
  320×600, 360×740, 390×844, 430×932 y 1440×900 × letra normal y 125 %
  (112 casos): abrir con toque real (la música sonó en los 98 casos de
  invitación), bajar con el dedo hasta el final deslizando de lado,
  pausar/reanudar, abrir y cerrar el visor, completar el RSVP. Ningún
  elemento fuera de la pantalla, `scrollWidth` = ancho, ningún
  deslizamiento lateral movió la página. Con la red puesta, 16 casos más
  (320 y 390): igual.
- Antes del arreglo, la misma prueba solo detectaba la portada escalada;
  Chrome nunca llegó a mover la página de lado (no reproduce el
  comportamiento táctil de iOS Safari).
- Música con pausa y reanudación en los 7 (sin cambios).
  `npm run nueva -- tierra`: sin nombres, fotos ni créditos de la demo.

### Pendiente
- Confirmar en un iPhone real (Safari) y en Android con letra grande que
  la página ya no se mueve de lado.

## 2026-10-09 (5) — Autorización de Vercel con GitHub

- Causa del bloqueo `TEAM_ACCESS_REQUIRED`: los commits salían con el
  correo global del equipo, que GitHub asocia a la cuenta `dreik0`; la
  cuenta de Vercel (Hobby) no tenía ninguna cuenta de GitHub vinculada.
- El dueño vinculó **`dreiklx`** a la cuenta de Vercel (inicio de sesión
  con GitHub; verificado en Account Settings → Authentication). El
  proyecto sigue conectado a `dreiklx/invitaciones-digitales-catalogo`,
  producción `main`.
- El repositorio fija su identidad de Git en `.git/config` (`dreiklx` +
  su dirección noreply); la global no cambia y los commits antiguos no se
  reescriben (siguen bloqueados en Vercel, sin efecto). Documentado en
  PROJECT-CONTEXT, README, AGENTS.md y CLAUDE.md.
- Verificado: el push de `2ae20c5` (autor `dreiklx` según GitHub) creó
  desde GitHub el despliegue de producción y llegó a **READY**; el dominio
  público apunta a él. Catálogo, las 7 demos, calendario, vista previa,
  fotos de Olivo y audio responden; la música arranca al abrir en los 7
  diseños en producción (Chrome automatizado). El despliegue de `198b96c`
  (autor `dreik0`) queda bloqueado en el historial de Vercel, sin efecto.

## 2026-10-09 (4) — Olivo es "Ramón & Florinda" y flujo de trabajo permanente

### Qué se hizo
- Demo de Olivo: la pareja pasa a **Ramón & Florinda** (los de las fotos)
  en `couple` y en los 9 textos alternativos; portada, título, vista
  previa al compartir y calendario salen de ahí. Padres, lugares y textos
  siguen siendo ficticios. Las demás demos no cambian.
- `npm run nueva`: ya no hereda nombres de pareja ni `alt` de la demo
  (quedan en "REEMPLAZAR") y nombra las fotos por espacio
  (`/images/galeria-1.jpg`), aunque la demo use otros nombres de archivo.
  `validate.ts`: error si un `alt` de cliente nombra a la persona de la
  demo.
- CLAUDE.md y AGENTS.md: regla permanente de flujo (leer contexto y
  estado real → trabajar de principio a fin → actualizar `.md` → revisar
  diff → commit y push a `origin/main` en la misma tarea; no afirmar
  despliegues sin comprobarlos).

### Verificación
- `npm run nueva -- olivo` en una copia: `couple` y `alt` en
  "REEMPLAZAR", fotos en `/images/<espacio>.jpg`; `npm run check` los
  marca. `config/invitation.ts` restaurado a `null`.

## 2026-10-09 (3) — Sin desplazamiento horizontal, fotos reales en Olivo y música al abrir

### Qué se hizo
- **Desplazamiento horizontal:** las auditorías anteriores no lo veían
  porque `body{overflow-x:clip}` lo ocultaba en Chrome y se comparaba con
  `innerWidth`. Midiendo sin el `clip`, contra `screen.width`, con letra
  al 125 % y nombres largos: textos `whitespace-nowrap` que se salían
  (calendario ×7, regalos de Gala, "Desliza hacia abajo", botón de la
  barra de confirmar) y nombres largos en Borgoña. Corregido en el origen
  (detalle en PROJECT-CONTEXT, "Sin desplazamiento horizontal").
- **Olivo con fotos reales:** 7 fotos de "fotos plantilla olivo" (copias
  web de 156-179 KB; originales intactos), asignadas como una sesión; el
  espacio `regalos` pasa a 4:5. Se borraron las 9 imágenes abstractas de
  Olivo (ya no se usaban). `placeholders.ts` salta las carpetas `fotos/`.
- **Música al abrir:** "Abrir invitación" inicia la música de su diseño
  dentro del mismo clic (`music-start.ts`); el reproductor de cada diseño
  (sin cambios de forma) pasa a "Sonando" y pausa/reanuda. Estado
  `blocked` si el navegador lo rechaza.
- El reproductor, en teléfono, va arriba a la derecha mientras se ve la
  portada (abajo tapaba texto en 320×568 ahora que suena desde el inicio).
  Borgoña lleva un filete rosa en teléfono (se perdía vino sobre vino).
- Cuenta regresiva de Gala y nombres largos de Borgoña con tope en `vw`.

### Verificación
- Música, con clics reales (CDP Input) y la política de autoplay normal
  de Chrome, en los 7: antes de abrir no suena ni se descarga; al abrir,
  el audio avanza (~3 s) y el reproductor dice "Pausar"; sigue al
  desplazarse; la pausa congela el tiempo; reanuda sin reiniciar; un solo
  `<audio>`. Con un clic sin gesto real: queda "Escuchar música" y arranca
  al tocar el reproductor.
- Desplazamiento: catálogo y 7 diseños a 320×568, 320×600, 360×740,
  390×844, 430×932 y 1440, con música activa, recorriendo la página y con
  el visor abierto: sin elementos fuera de la pantalla.

### Pendiente
- Derechos de imagen de las fotos de Olivo (personajes de TV) antes de
  publicarlas en el catálogo.
- Teléfono físico: música al abrir en iPhone (Safari) y Android.

## 2026-10-09 (2) — Música con reproductor propio por diseño y versículos

### Qué se hizo
- **Música sin reproducción automática:** `MusicPlayer.tsx` reescrito: suena
  solo al tocar el reproductor, `preload="none"`, estado desde eventos
  nativos. Reemplaza la regla heredada de autoplay (pedido del dueño).
- **Siete reproductores** en `templates/shared/players.tsx` (una lógica,
  siete formas): Olivo `rama`, Tierra `ficha`, Gala `deco`, Riviera
  `sello`, Borgoña `etiqueta`, Aurora `destello`, Nube `globo`. Default en
  `meta.musicPlayer`; `music.player` lo cambia. `music` suma `artist`,
  `credit` y `player`; los créditos van al pie (`MusicCredit`). En teléfono
  el reproductor se oculta sobre el RSVP y sobre los créditos.
- **Canción de la boda original:** se consultó solo de lectura el
  historial privado: "La Bondad de Dios" (instrumental) no tiene licencia
  para web (investigación de entonces). **No se usó.**
- **Pistas de demostración** con licencia verificada en Wikimedia Commons
  (`public/audio/demo/`, ~26 MB): Pachelbel/MacLeod (CC BY 3.0), Satie y
  Debussy (dominio público), Chopin (CC0), Brahms en cajita musical
  (dominio público). Tabla en README, "Música".
- **Versículos:** `Quote` suma `kind: "verse"`, `translation` y `align`;
  `quoteCitation()` en `resolve.ts`. Olivo (Colosenses 3:14), Tierra
  (Cantares 8:7) y Gala (Mateo 19:6), en Reina-Valera 1909 (dominio
  público, verificada); Olivo, Tierra y Gala tienen composición propia
  para versículos. Riviera, Borgoña, Aurora y Nube siguen con frases.
- `npm run check` avisa: música sin `credit`, pista de demo en una
  invitación de cliente, versículo sin referencia o traducción.

### Verificación
- `check`, `typecheck`, `lint`, `build`. Auditoría (desborde, botones
  < 44 px, imágenes rotas) de los 7 a 320/360/390/430/1440: sin problemas.
- En Chrome automatizado: nada se descarga antes del toque; al tocar, el
  audio avanza (~3 s) y el botón pasa a "Pausar" en los 7. Capturas de los
  reproductores en reposo y sonando, en teléfono y escritorio.
- Modo cliente (Gala con `music`, `openingQuote` y `closingQuote` en
  `null`): sin reproductor, sin créditos, sin sección de cita, sin huecos.

### Pendiente (teléfono físico)
- Escuchar el audio de verdad (volumen, calidad, bucle) y la pausa en iOS
  y Android.
- En teléfono el reproductor flotante pasa por encima de contenido al
  desplazarse (como antes); se oculta sobre el RSVP y los créditos.

## 2026-10-09 — Despliegue automático desde GitHub

- El proyecto de Vercel existente `invitaciones-digitales-catalogo` se
  conectó al repositorio privado `dreiklx/invitaciones-digitales-catalogo`
  (`vercel git connect`). Rama de producción: `main`; las demás ramas
  crean vistas previas. Sin cambios de dominio, variables ni comandos de
  build (Next.js, raíz `.`, `npm run build` con `check` como prebuild).
- La prueba del flujo automático fue el push de este mismo commit de
  documentación (sin `vercel --prod`): Vercel creó el despliegue desde
  GitHub pero lo **bloqueó** (`TEAM_ACCESS_REQUIRED`: el autor de los
  commits no está vinculado a la cuenta de Vercel). Pendiente del dueño.

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
