# Auditorías y propuestas para una siguiente fase

Tres auditorías: 2026-10-11 (técnica, fotos y derechos), 2026-10-12
(usabilidad) y 2026-10-12, noche (**integral**: catálogo, navegación,
separación demo/cliente, experiencia de invitado, responsive, ocho
diseños, técnica, seguridad y privacidad). "Corregido" = implementado y
verificado en esa sesión (casi siempre con una prueba automática). Las
propuestas **no** están implementadas salvo que digan "HECHA". Precios y
acuerdos comerciales: **PENDIENTE DE DEFINICIÓN CON FOTOLAB** (fuera de
estas auditorías).

## Auditoría integral (2026-10-12, noche)

Cómo se hizo: lectura del código y la documentación; recorridos con
Chrome real (Playwright) en el catálogo y los ocho diseños a 320×568,
320×600, 360×740, 390×844, 430×932, 1024×768, 1366×768, 1440×900 y
1920×1080, más 320 y 360 con la letra al 125 %, con el selector de
diseños, el panel o menú de secciones y el visor abiertos; teclado
(Tab, Shift+Tab, Enter, Escape); una invitación de cliente REAL generada
con `npm run nueva -- nube`, compilada y servida (no solo el código);
rutas y redirecciones con `curl`; contenido de las ocho demos (horas,
plazos, lugares, nombres del menú); `.ics`; metadatos; peso de la página
en un teléfono; `npm audit`. Sin errores de consola en las ocho demos.

| # | Área | Hallazgo | Severidad | Estado |
|---|---|---|---|---|
| A1 | Navegación | En las ocho demos, el botón "Otros diseños" (z-80) quedaba **encima del visor de fotos** (z-60) y del **panel de secciones** del teléfono (z-65): flotaba sobre la foto ampliada y se podía tocar, abriendo otra capa encima. Causa: el orden de capas se pensó para que el botón se viera sobre la portada (z-70), sin contar las otras capas. | alta | **Corregido:** visor y panel a z-85 (orden documentado en PROJECT-CONTEXT, "Capas"). Prueba en los ocho diseños. |
| A2 | Accesibilidad | En el panel de secciones, el selector de diseños y el visor, **Tab sacaba el foco a la página tapada** (botones de copiar, del RSVP, el reproductor): con teclado se perdía la ubicación. | media | **Corregido:** `templates/shared/focus-trap.ts` en las tres capas (Tab y Shift+Tab dan la vuelta). Prueba en los ocho diseños. |
| A3 | Navegación (escritorio) | Al abrir "Secciones: …" con el teclado, el foco se quedaba en el botón y Tab iba primero a "Confirmar asistencia"; el menú seguía abierto al sacar el foco. | media | **Corregido:** el foco entra en la sección actual de la lista; sacar el foco lo cierra. La prueba de teclado ya no fuerza el foco: llega con Tab. |
| A4 | Responsive | Con la letra del sistema al 125 % a 320 px, "Aguamarina" salía de su tarjeta en el selector "Otros diseños" y el panel se desplazaba de lado. | media (personas mayores) | **Corregido:** el nombre tiene tope en `vw` y el número puede pasar arriba. Prueba nueva. |
| A5 | Privacidad y derechos | En la **invitación de un cliente**, las fotos de las ocho demos (incluidas las de Olivo, con derechos **pendientes**, y las de menores) se podían abrir por su URL desde el dominio del cliente (`/plantillas/<diseño>/fotos/*` y `/_next/image`). La página no las mostraba ni enlazaba. | alta | **Corregido** en `next.config.ts` (solo con invitación): 404 para esas rutas y optimizador limitado a `/images/**`. Comprobado con una invitación compilada: fotos de demo 404/400, fotos del cliente 200. |
| A6 | Privacidad | Las invitaciones de clientes **se podían indexar** en buscadores (nombres, lugares, teléfono, a veces una cuenta bancaria). | alta | **Corregido:** `robots: noindex, nofollow` solo para clientes (`app/layout.tsx`); la vista previa en WhatsApp no cambia. El catálogo sigue indexable. |
| A7 | RSVP | Con "Varias personas", si faltaba un nombre el error aparecía pero no se anunciaba a lectores de pantalla y el cursor no iba al campo vacío. | media | **Corregido:** errores con `role="alert"`; el cursor va al primer nombre que falta. Prueba nueva de "Varias personas" en los ocho diseños (antes solo se probaba "Solo yo"). |
| A8 | RSVP | Al tocar "¿No podrás asistir? Avísanos aquí" el botón desaparece y el foco se perdía. | baja | **Corregido:** el cursor pasa al campo del nombre. |
| A9 | Limpieza | `FromEvent` (event-phase.tsx) no se usaba. | baja | **Corregido:** eliminado. |
| A10 | Documentación | Textos desactualizados: "bodas, quinceaños y bebés" (faltaban aniversarios), "el número (01–05)", "barra flotante" y "barra de confirmar" (ya no existen), "Desliza hacia abajo" en "Teléfono primero", "seis" demos de Pexels (son siete), "baby showers" como evento futuro, y el hallazgo 12 de abajo (rutas de siete diseños y `arrullo → riviera`, que ya no existe). | baja | **Corregido** en PROJECT-CONTEXT, photo-map y este archivo. |
| A11 | Rutas | `/plantillas/camelia/` (con barra final) hace dos saltos: Next quita la barra y después redirige. Sin barra (los enlaces reales), un salto. | baja | Documentado; no se cambió (la regla de la barra final es de Next). |
| A12 | Errores | La página 404 es la de Next, en inglés ("This page could not be found"), también en una invitación de cliente. | baja-media | Propuesta P12. |
| A13 | Dependencias | `npm audit`: 0 vulnerabilidades en producción; siguen los 5 avisos altos solo de desarrollo (`micromatch` vía `eslint-config-next`). | baja | Sin cambio (hallazgo 3). |
| A14 | Rendimiento | Primera carga del catálogo en un teléfono: ~1,7 MB, de ellos **~790 KB de tipografías** (22 archivos: las miniaturas usan las de los ocho diseños). Una demo: 0,9–1,1 MB, 67–144 KB de fuentes. | media | Propuesta P13. |

Verificado sin defectos (no se cambió): rutas de los ocho diseños (200);
`camelia` y `borgona` (y sus subrutas) → `aguamarina` en un salto; catálogo
con barra de categorías y sin selector de diseños; enlace de Instagram;
transición tarjeta → portada; contenido de las demos coherente (horas de
lugares y programa, plazo del RSVP antes del evento, nombres del menú);
`.ics` con hora UTC correcta, todos los lugares y aviso un día antes;
sin desbordes ni saltos de ancho con capas abiertas en los 9 tamaños;
una invitación de cliente sin selector, sin aviso de demostración, sin
enlaces a `/plantillas/` ni nombres de demos, con su propia barra. Las
pruebas automáticas existentes (música, galería, RSVP "Solo yo",
indicador, desbordes) pasaron completas antes y después.

**Requiere un teléfono físico** (no se puede afirmar con emulación): el
sonido real y el gesto de deslizar; el teclado del teléfono sobre el
RSVP y la zona segura del iPhone con la barra; WhatsApp ("¿No se abrió?")
y el navegador interno de WhatsApp; el `.ics` en Android.

## Hallazgos (2026-10-11)

Severidad: crítica · alta · media · baja.

| # | Área | Hallazgo | Severidad | Estado |
|---|---|---|---|---|
| 1 | Seguridad | `next` 16.3.5 tenía avisos de seguridad (16.0.0–16.3.7), uno crítico en `next/og` (`ImageResponse`), que este sitio usa para las imágenes al compartir. Aquí todas las rutas son estáticas, lo que baja la exposición, pero no la elimina. | crítica | **Corregido:** `next` y `eslint-config-next` 16.3.8 (parche de la misma versión menor). |
| 2 | Seguridad | `sharp` < 0.35.5 (librsvg) y `source-map-js` con avisos altos. | alta | **Corregido:** `sharp` 0.35.5 y `npm audit fix`. `npm audit --omit=dev`: 0 vulnerabilidades. |
| 3 | Seguridad | Quedan 5 avisos altos solo en herramientas de desarrollo (`braces`/`micromatch` vía `@next/eslint-plugin-next`). La única corrección que ofrece npm baja `eslint-config-next` a la 14 (rompe el lint). No llegan al sitio publicado. | baja | Abierto; revisar al actualizar Next. |
| 4 | Derechos de imagen | Olivo muestra a Don Ramón y Doña Florinda (personajes de TV reconocibles) con fotos sin autor ni licencia verificados. No hay autorización comercial verificada. | alta | Conservadas por decisión del dueño, con el riesgo documentado en `photo-map.md`. El aviso no afirma ninguna licencia ni respaldo. |
| 5 | Derechos de imagen | Aurora, Aguamarina y Nube muestran (probablemente) a menores; la licencia de Pexels no incluye autorizaciones de modelo. | media | Documentado; reemplazo propuesto (P1). |
| 6 | Textos | El aviso de las demos y el del pie del catálogo decían "fotos de stock con licencia de Pexels", lo que era falso para Olivo. | media | **Corregido:** ahora dicen "datos y fotos de ejemplo; las personas o personajes no son clientes ni respaldan el servicio". |
| 7 | Monograma | Con "Don Ramón" / "Doña Florinda" el monograma salía "D · D". | media | **Corregido:** `initial()` en `resolve.ts` quita el tratamiento (Don, Doña, Sr., Dra.…): "R · F". |
| 8 | Legibilidad | Gala mostraba la fecha solo en números romanos ("XIII · XI · MMXXVII") en la portada inicial, el pie y la miniatura. | alta (personas mayores) | **Corregido:** `dates.long` ("13 de noviembre de 2027") en las 4 apariciones. |
| 9 | Legibilidad | Tierra usaba "22.05.27" (`dates.dotted`) como antetítulo; la fecha completa aparecía en otros lugares. | baja | **Corregido el 2026-10-11 (noche):** "22 de mayo de 2027" (`dates.long`) en la portada inicial, la portada y la miniatura. Olivo todavía muestra "17.04.27" en su portada inicial, junto a su ficha día · mes · año (no se tocó: otro diseño). |
| 10 | Arquitectura | Renombrar o agregar un diseño toca unos 12 archivos: tipos, registro, demos, miniaturas, 3 rutas, `nueva`, `placeholders` y catálogo. TypeScript avisa de casi todos, pero no de `scripts/*.mjs`. | media | Hecho a mano para Aguamarina y verificado. P3. |
| 11 | Flujo | `npm run nueva -- aguamarina` copiaba dos frases firmadas por "Renata" (y otras demos copiaban familiares, lugares, número de regalos o textos personales). `check` lo marcaba, pero la causa era el generador. | media | **Corregido el 2026-10-11 (noche):** generador nuevo basado en datos con `demoMarkers` y pruebas con los siete diseños (ver PROJECT-CONTEXT). |
| 12 | Rutas | Las rutas coinciden con el catálogo. Redirecciones 308 en un solo salto: `camelia`, `borgona` → `aguamarina`, incluidas sus subrutas. (Hasta el 2026-10-12 también `arrullo` → `riviera`; hoy Arrullo es una página. Revisado de nuevo con ocho diseños: A11.) | — | Verificado. |
| 13 | Responsive | Sin desplazamiento horizontal en el catálogo y los 7 diseños: 320/360/390/430 px con gestos táctiles reales, 320 px con letra al 125 %, y 1024/1366/1440/1920 px con barra de desplazamiento visible y rueda lateral. | — | Verificado (72 de 72 casos). |
| 14 | Música | Los 7 diseños: no suena antes de "Abrir invitación"; suena al abrir; sigue sonando al desplazarse; pausa y reanuda; un solo `<audio>`. | — | Verificado. |
| 15 | Rendimiento | El MP3 no se descarga hasta abrir la invitación (verificado). Las pistas pesaban 1,3–8,2 MB (26,6 MB en total). | media | **Corregido el 2026-10-11 (noche):** 17,6 MB (−34 %); Pachelbel 6,7 MB, Debussy 4,4 MB, Chopin 3,5 MB, Satie 1,8 MB, la cajita sin cambios (tabla y método en README, "Música"). |
| 16 | Rendimiento | Las fotos de las demos ocupan 1–2,2 MB por diseño y se sirven con `next/image` (tamaños por ancho). Las de Olivo están a su resolución original (1024–1536 px), sin agrandar. | baja | Bien. |
| 17 | Limpieza | `_anterior/` (arquitectura vieja) sigue en el disco. Git la ignora y no está en el repositorio. | baja | Pendiente de borrar con confirmación del dueño. |
| 18 | Secretos | Ni `.env*` ni `.vercel/` están en Git (están en `.gitignore`); el código no lee variables de entorno; no hay `vercel.json`. | — | Verificado. |
| 19 | Accesibilidad | El logo de Farley Systems ahora es un enlace: nombre accesible "Farley Systems en Instagram (se abre en una pestaña nueva)", `rel="noopener noreferrer"`, alto de 56/64 px como área táctil, opacidad al pasar el cursor y anillo de foco de 2 px con separación (comprobado con la tecla Tab). | — | Verificado. |
| 20 | Dependencias | Hay versiones más nuevas: Next 16.4, React 19.3, TypeScript 7 y ESLint 10. No se actualizaron (fuera de alcance; algunos son cambios mayores). | baja | P5. |
| 21 | Build | El build descarga tipografías de Google Fonts en dos lugares: `next/font/google` (cada diseño) y las imágenes para compartir (`lib/invitation/share-image.tsx`). Si la red falla en ese momento, el build se detiene ("No fonts are loaded" en `/opengraph-image`, o "Can't resolve …/font/google/font"). Pasó dos veces el 2026-10-11 (noche) en local, sin relación con los cambios; repetido el build, pasó. En Vercel no se ha visto. | media | Abierto; P9. |

## Auditoría de usabilidad (2026-10-12)

Recorrido de un invitado que abre el enlace desde WhatsApp en un teléfono,
en los ocho diseños y el catálogo (320×568 a 1920×1080). "Corregido" =
implementado y cubierto por pruebas automáticas (`tests/e2e/`), salvo que
se diga otra cosa.

| # | Área | Hallazgo | Severidad | Estado |
|---|---|---|---|---|
| U1 | Desplazamiento | "Desliza hacia abajo" + flecha hacia abajo: describía dónde está el contenido, pero se leía como el gesto; quien arrastra el dedo hacia abajo no avanza. | alta | **Corregido:** el texto dice el gesto ("Desliza hacia arriba" con una mano que sube en pantallas táctiles; "Desplázate hacia abajo" con mouse). Texto y animación coinciden; quieto con "reducir movimiento". |
| U2 | Primera pantalla | Olivo a 360–430 px: con nombres de tres líneas el indicador quedaba debajo de la primera pantalla. | media | **Corregido** (foto de portada − 30 rem). |
| U3 | Portada | Tierra a 320×568 y 320×600: "Abrir invitación" terminaba a 599 px; la portada no se desplaza, así que el botón quedaba cortado. Las pruebas anteriores usaban 320×640 y no lo veían. | alta | **Corregido** (variante `short:`) y probado en 9 tamaños. |
| U4 | Escritorio | En 1024–1920 px varias portadas son más altas que la pantalla: el indicador quedaba fuera de la vista. | media | **Corregido:** en escritorio es `sticky` al pie de la pantalla hasta llegar a su lugar. En Gala y Riviera los nombres siguen debajo de la foto en 1366×768 (composición del diseño, no se cambió; ver P10). |
| U5 | Escritorio | Olivo a 1024 px partía "Florinda" en dos ("Florin-da"). | media | **Corregido** (tamaño de los nombres según la columna). |
| U6 | Música | En el teléfono el reproductor es solo ▶/❚❚: no decía que era música ni cómo pausarla; tampoco se avisaba antes de abrir que iba a sonar. | media | **Corregido:** "Con música: podrás pausarla cuando quieras" bajo el botón de abrir y "Música: toca para pausar" unos segundos al empezar. |
| U7 | Galería | En el teléfono nada indicaba que las fotos se abren (solo Olivo lo decía). | baja | **Corregido:** "Toca una foto para verla en grande" en los ocho diseños. Al cerrar, el foco vuelve a la foto **sin desplazar la página** (`focus({ preventScroll: true })`: con una foto más alta que la pantalla, `focus()` podía moverla); probado con Escape y "Cerrar". |
| U8 | Lugares | "Cómo llegar" (Google Maps) y "Abrir en Waze": dos botones parecidos y el primero no decía qué abría. | media | **Corregido:** "Abrir en Google Maps" / "Abrir en Waze" y "Las dos aplicaciones te llevan al mismo lugar". |
| U9 | RSVP | "Individual" / "Grupo" se prestaba a dudas (¿grupo de quién?, ¿me incluye?). | media | **Corregido:** "¿Quiénes van a asistir?" → "Solo yo" / "Varias personas", "Cuéntate a ti también", "Tu nombre y apellido", "Persona 2: nombre y apellido". |
| U10 | RSVP | El botón de no asistir ("Avisar por WhatsApp") no decía qué avisaba ni que faltaba presionar Enviar. | media | **Corregido:** "Avisar por WhatsApp que no asistiré" + aviso de Enviar; el mensaje dice "no podré asistir" (probado). |
| U11 | RSVP | Tras abrir WhatsApp, la invitación no mostraba nada: si WhatsApp no se abría (navegador interno, bloqueo), el invitado no sabía qué hacer. | media | **Corregido:** "¡Gracias! Ya casi está… ¿No se abrió? Toca aquí". Solo en invitaciones reales (las demos muestran el mensaje): **probar en un teléfono físico**. |
| U12 | Catálogo | El logo del estudio no parecía un enlace. | baja | **Corregido:** "Ver en Instagram ↗" visible bajo el logo. |
| U13 | Catálogo | Con Aniversarios (una sola tarjeta) el encabezado decía "08 — 08 · 1 diseños". | baja | **Corregido:** "08 · 1 diseño". |
| U14 | Calendario | "Agregar a mi calendario" descarga un `.ics`: en Android algunos teléfonos lo guardan como archivo en vez de abrir el calendario. El enlace "o agregar en Google Calendar" está justo debajo. | baja | Sin cambio; revisar en teléfonos Android reales. |
| U15 | Foco | Botones y enlaces usan el anillo de foco del navegador; los campos del RSVP tienen el suyo. | — | Verificado; sin cambio. |
| U16 | Toque | Controles principales ≥ 44 px (abrir ≥ 48, confirmar ≥ 64, música ≥ 48, mapas ≥ 52). | — | Verificado ("Abrir invitación" por prueba). |

## PROPUESTAS PARA UNA SIGUIENTE FASE

El 2026-10-11 (noche) se implementaron P2, P4, P6 y P7 (marcadas abajo).
Las demás siguen sin implementar. P11–P18 salen de la auditoría integral
del 2026-10-12 (noche).

### Orden recomendado (2026-10-12, noche)

**Prioridad alta** (antes de mostrar el catálogo a más personas):
P11 (probar en teléfonos reales), P1 (fotos con autorización), P9
(tipografías del build sin depender de la red).

**Prioridad media:** P14 (prueba automática de una invitación de
cliente), P12 (página 404 en español), P13 (peso de las tipografías del
catálogo), P15 (opciones del RSVP con flechas del teclado), P10 (nombres
en la primera pantalla de escritorio: decide el dueño).

**Prioridad baja:** P16 (Waze en todos los lugares de las demos), P5
(actualizar Next/React), P3 (registro único de diseños), P8 (borrar
`_anterior/`), P17 y P18.

### P1 · Fotos de demostración con autorización
- **Problema:** Olivo (personajes de TV) y las demos con menores (Aurora,
  Aguamarina, Nube) no tienen autorización de imagen verificada.
- **Por qué sirve / beneficio:** el catálogo podría usarse en publicidad sin
  riesgo legal ni de reputación.
- **Archivos:** `public/plantillas/<diseño>/fotos/`, `templates/<diseño>/demo.ts`,
  `photo-map.md` y las guías.
- **Esfuerzo:** medio: hay que conseguir las sesiones (p. ej., con Fotolab),
  aunque el código casi no cambia.
- **Riesgos:** que los encuadres no coincidan con las proporciones de cada
  marco.
- **¿Ahora?:** antes de cualquier campaña comercial. Para Olivo decide el
  dueño del proyecto.

### P2 · `nueva` también limpia las referencias de las citas — HECHA (2026-10-11)
- **Problema:** la frase de la demo de Aguamarina se copia con "Renata"
  como autora.
- **Por qué sirve / beneficio:** una invitación nueva sale sin errores
  falsos en `check`.
- **Archivos:** `scripts/new-invitation.ts` y `scripts/lib/new-invitation.ts`.
- **Esfuerzo:** bajo.
- **Riesgos:** mínimos.
- **¿Ahora?:** sí, en la próxima sesión técnica.

### P3 · Un solo lugar para registrar un diseño
- **Problema:** agregar o renombrar un diseño exige tocar unos 12 archivos.
- **Por qué sirve / beneficio:** menos errores al crecer el catálogo.
- **Archivos:** `templates/registry.ts`, `demos.ts`, `previews.tsx`,
  `scripts/new-invitation.ts` (ya lee los ids del registro desde 2026-10-11) y
  `scripts/placeholders.ts`.
- **Esfuerzo:** medio.
- **Riesgos:** las rutas de `app/plantillas/` deben seguir siendo estáticas
  y separadas por diseño (por las tipografías); no convertirlas en ruta
  dinámica.
- **¿Ahora?:** no. Solo si se van a agregar más diseños.

### P4 · Comprimir la música — HECHA (2026-10-11)
- **Problema:** 26 MB de MP3, con pistas de hasta 8 MB.
- **Por qué sirve / beneficio:** reproducción más rápida y menos datos
  móviles para los invitados (a menudo, personas mayores con planes
  limitados).
- **Archivos:** `public/audio/demo/*.mp3`, más una nota en el README.
- **Esfuerzo:** bajo (volver a codificar a 96–128 kbps en mono o estéreo).
- **Riesgos:** pérdida de calidad audible si se baja demasiado. Mantener
  la atribución.
- **¿Ahora?:** sí, conviene; es de bajo riesgo.

### P5 · Actualizar Next 16.4 / React 19.3
- **Problema:** hay versiones menores nuevas, y `experimental.cssChunking`
  es experimental.
- **Por qué sirve / beneficio:** correcciones futuras y quitar los avisos
  de las herramientas de desarrollo.
- **Archivos:** `package.json`, `package-lock.json` y `next.config.ts`.
- **Esfuerzo:** bajo-medio (actualizar y repetir todas las pruebas).
- **Riesgos:** cambios de comportamiento (leer `node_modules/next/dist/docs/`).
- **¿Ahora?:** en una sesión aparte, no mezclada con cambios visuales.

### P6 · Pruebas automáticas dentro del repositorio — HECHA (2026-10-11: `npm test`, `npm run test:e2e`, `npm run verify`)
- **Problema:** las pruebas de desplazamiento lateral y de música viven
  fuera del repositorio, como scripts temporales.
- **Por qué sirve / beneficio:** repetir las verificaciones con un solo
  comando (`npm run verify`) antes de cada despliegue.
- **Archivos:** `scripts/verify/*.mjs` y `package.json`.
- **Esfuerzo:** medio.
- **Riesgos:** dependen de Chrome instalado. No convertirlo en una
  infraestructura grande.
- **¿Ahora?:** opcional; útil cuando haya clientes reales.

### P7 · Fecha legible también en el antetítulo de Tierra — HECHA (2026-10-11)
- **Problema:** "22.05.27" puede leerse como otra fecha en otros países.
- **Por qué sirve / beneficio:** coherencia con la regla de usabilidad
  para personas mayores.
- **Archivos:** `templates/tierra/Template.tsx`.
- **Esfuerzo:** bajo.
- **Riesgos:** cambia el carácter editorial del diseño.
- **¿Ahora?:** no es urgente; la fecha completa ya está visible.

### P8 · Borrar `_anterior/`
- **Problema:** quedan archivos viejos en el disco (Git los ignora).
- **Por qué sirve / beneficio:** orden y menos confusión.
- **Archivos:** solo la carpeta local.
- **Esfuerzo:** mínimo.
- **Riesgos:** perder algo que se quisiera consultar.
- **¿Ahora?:** cuando el dueño lo confirme.

### P9 · Tipografías de las imágenes para compartir sin depender de la red
- **Problema:** si Google Fonts no responde durante el build, el build (y
  el despliegue) falla.
- **Por qué sirve / beneficio:** despliegues más predecibles.
- **Archivos:** `lib/invitation/share-image.tsx` (reintentar la descarga o
  usar archivos de fuente locales) y, si se quiere ir más lejos,
  `templates/<diseño>/fonts.ts` con `next/font/local`.
- **Esfuerzo:** bajo-medio.
- **Riesgos:** agregar archivos de fuentes al repositorio (revisar sus
  licencias OFL).
- **¿Ahora?:** conviene pronto; es poco frecuente pero bloquea un
  despliegue.

### P10 · Nombres en la primera pantalla de escritorio (Gala y Riviera)
En 1366×768, Gala y Riviera muestran la foto de portada completa y los
nombres empiezan debajo. Con el indicador fijo al pie se entiende que hay
que bajar, pero un invitado en una laptop no ve los nombres sin
desplazarse. Opción: limitar el alto de la foto por el alto de la
pantalla también en escritorio (como en el teléfono). Es una decisión de
composición: revisarla con el dueño antes de cambiarla.

### P11 · Prueba en teléfonos reales antes de mostrar el catálogo a más gente — prioridad ALTA
- **Problema observado:** todo lo automático corre en Chrome de escritorio
  con emulación. No se ha comprobado en un iPhone (Safari) ni en un
  Android (Chrome), ni dentro del navegador interno de WhatsApp, que es
  donde se abren casi todas las invitaciones: sonido real, gesto de
  deslizar, barra inferior con la zona segura del iPhone, teclado abierto
  sobre el RSVP, "¿No se abrió?" de WhatsApp y el `.ics` en Android (U14).
- **Solución:** una lista corta (15 min por teléfono) en el README
  ("Antes de entregar" ya tiene parte) y hacerla con 2 teléfonos (uno
  iPhone, uno Android) abriendo el enlace DESDE WhatsApp; anotar el
  resultado en project-log.
- **Beneficio:** es la única forma de confirmar lo que más importa al
  invitado (que suene, que se pueda confirmar).
- **Afecta:** README ("Antes de entregar"), project-log.
- **Esfuerzo:** bajo.
- **Riesgos:** ninguno; si algo falla, aparece trabajo nuevo.
- **¿Ahora?:** sí, antes de enviar el catálogo a más personas.

### P12 · Página "no encontrada" en español — prioridad media
- **Problema observado:** un enlace mal copiado muestra la página 404 de
  Next en inglés, también en la invitación de un cliente (A12).
- **Solución:** `app/not-found.tsx` sencillo, neutro (sin paleta de
  diseño): "No encontramos esta página" + un botón "Ir al inicio" (en un
  cliente lleva a su invitación; en el catálogo, a los diseños).
- **Beneficio:** un invitado mayor no queda ante un mensaje en inglés sin
  salida.
- **Afecta:** `app/not-found.tsx` (nuevo), una prueba e2e.
- **Esfuerzo:** bajo.
- **Riesgos:** mínimos (no tocar las rutas de los diseños).
- **¿Ahora?:** sí, en la próxima sesión.

### P13 · Menos tipografías en la primera carga del catálogo — prioridad media
- **Problema observado:** el catálogo descarga ~790 KB de tipografías (22
  archivos) en la primera pantalla de un teléfono, aunque arriba solo se
  ven dos (A14). Las miniaturas de abajo necesitan las de su diseño.
- **Solución:** medir primero; luego cargar las tipografías de cada
  miniatura solo cuando se acerca a la pantalla (o con `preload: false`
  en las del catálogo y `font-display: swap`), sin tocar las páginas de
  los diseños.
- **Beneficio:** el catálogo se abre más rápido con datos móviles.
- **Afecta:** `components/catalog/fonts.ts`, `templates/previews.tsx`.
- **Esfuerzo:** medio.
- **Riesgos:** un parpadeo de letra en las miniaturas; romper la regla de
  una carpeta por diseño (no hacerlo con una ruta dinámica).
- **¿Ahora?:** después de P11 y P12.

### P14 · Prueba automática de una invitación de cliente compilada — prioridad media
- **Problema observado:** la separación demo/cliente (sin selector, sin
  aviso, fotos de demo en 404, `noindex`, vista sin música y sin secciones
  opcionales) se comprobó a mano el 2026-10-12 con `nueva -- nube`. Las
  pruebas automáticas solo compilan el catálogo; README lo marca como "sin
  cubrir aún".
- **Solución:** un comando `npm run test:cliente` que genere una
  invitación de ejemplo en una carpeta temporal (`nueva --salida`), la
  compile con otra `distDir` y revise con Playwright esas reglas (y una
  variante con `music: null` y secciones en `null`). No entra en
  `verify` si alarga demasiado.
- **Beneficio:** un cambio futuro no puede volver a mostrar las demos en
  la invitación de un cliente sin que una prueba lo avise.
- **Afecta:** `scripts/`, `tests/e2e/`, `package.json`, README.
- **Esfuerzo:** medio (un segundo build, ~2 min).
- **Riesgos:** más tiempo de pruebas; no tocar `config/invitation.ts`
  real.
- **¿Ahora?:** pronto, antes de la primera invitación real.

### P15 · Opciones del RSVP con las flechas del teclado — prioridad media
- **Problema observado:** "Solo yo" / "Varias personas" y "¿de parte de
  quién?" son botones con `role="radio"`: se eligen con Tab y Enter, pero
  un lector de pantalla anuncia un grupo de opciones y espera las flechas,
  que no hacen nada.
- **Solución:** flechas izquierda/derecha para moverse dentro del grupo
  (un solo Tab por grupo), o `<input type="radio">` reales con el mismo
  aspecto.
- **Beneficio:** accesibilidad completa del paso más importante.
- **Afecta:** `templates/shared/RsvpForm.tsx` y su prueba.
- **Esfuerzo:** bajo-medio.
- **Riesgos:** cambiar el orden del foco; probar en los ocho diseños.
- **¿Ahora?:** cuando se toque el RSVP.

### P16 · Waze en todos los lugares de las demos — prioridad baja
- **Problema observado:** en las demos, unas ubicaciones tienen Waze y
  otras no (p. ej. Aguamarina: la misa no, la fiesta sí; las recepciones
  de las bodas no). Funciona bien, pero el catálogo no muestra la función
  de forma pareja.
- **Solución:** agregar `wazeUrl` a las ubicaciones de las demos que no lo
  tienen (solo datos de `demo.ts`).
- **Beneficio:** demos coherentes.
- **Afecta:** `templates/<diseño>/demo.ts`.
- **Esfuerzo:** bajo.
- **Riesgos:** ninguno (nombres de lugares ficticios o públicos).
- **¿Ahora?:** cuando convenga.

### P17 · Cerrar la vista de las demos en Google (opcional) — prioridad baja
- **Problema observado:** las ocho demos se indexan con fotos de personas
  reales (stock) y de Don Ramón y Doña Florinda (derechos pendientes).
- **Solución:** `noindex` también en `/plantillas/*` del catálogo; el
  catálogo `/` seguiría indexado.
- **Beneficio:** menos exposición de las fotos con derechos pendientes.
- **Afecta:** `lib/invitation/routes.tsx` (`metadataFor`).
- **Esfuerzo:** bajo.
- **Riesgos:** las demos dejan de aparecer en búsquedas (decisión de
  marketing del dueño).
- **¿Ahora?:** lo decide el dueño; automático si P1 se demora.

### P18 · Redirección con barra final en un salto — prioridad baja
- **Problema observado:** `/plantillas/camelia/` hace dos saltos (A11).
- **Solución:** ninguna por ahora: los enlaces reales nunca tuvieron la
  barra. Revisar solo si aparecen enlaces así.
- **Beneficio / Afecta / Esfuerzo / Riesgos:** mínimo; `next.config.ts`;
  bajo; tocar la normalización de Next.
- **¿Ahora?:** no.
