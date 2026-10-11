# Auditoría (2026-10-11) y propuestas para una siguiente fase

Estado real al cierre de la sesión del 2026-10-11 (tarde). Lo que dice
"corregido" se verificó en esta sesión. Las propuestas **no** están
implementadas. Precios y acuerdos comerciales: **PENDIENTE DE DEFINICIÓN
CON FOTOLAB** (fuera de esta auditoría).

## Hallazgos

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
| 9 | Legibilidad | Tierra usa "22.05.27" (`dates.dotted`) como antetítulo; la fecha completa aparece en otros lugares. Es un adorno, no la única fecha. | baja | Sin cambio (no se tocan otros diseños); P7. |
| 10 | Arquitectura | Renombrar o agregar un diseño toca unos 12 archivos: tipos, registro, demos, miniaturas, 3 rutas, `nueva`, `placeholders` y catálogo. TypeScript avisa de casi todos, pero no de `scripts/*.mjs`. | media | Hecho a mano para Aguamarina y verificado. P3. |
| 11 | Flujo | `npm run nueva -- aguamarina` copia la frase de la demo con `reference: "Renata"`. `npm run check` lo marca como error (nombre de la demo), así que no llega a publicarse, pero hace ruido. | baja | Abierto; P2. |
| 12 | Rutas | Las 7 rutas coinciden con el catálogo. Redirecciones 308 en un solo salto: `camelia`, `borgona` → `aguamarina` y `arrullo` → `riviera`, incluidas sus subrutas. | — | Verificado. |
| 13 | Responsive | Sin desplazamiento horizontal en el catálogo y los 7 diseños: 320/360/390/430 px con gestos táctiles reales, 320 px con letra al 125 %, y 1024/1366/1440/1920 px con barra de desplazamiento visible y rueda lateral. | — | Verificado (72 de 72 casos). |
| 14 | Música | Los 7 diseños: no suena antes de "Abrir invitación"; suena al abrir; sigue sonando al desplazarse; pausa y reanuda; un solo `<audio>`. | — | Verificado. |
| 15 | Rendimiento | El MP3 no se descarga hasta abrir la invitación (verificado). Aun así, las pistas pesan 1,3–8,2 MB (26 MB en total); en datos móviles, Pachelbel (8,2 MB) y Debussy (7,6 MB) son pesadas. | media | P4. |
| 16 | Rendimiento | Las fotos de las demos ocupan 1–2,2 MB por diseño y se sirven con `next/image` (tamaños por ancho). Las de Olivo están a su resolución original (1024–1536 px), sin agrandar. | baja | Bien. |
| 17 | Limpieza | `_anterior/` (arquitectura vieja) sigue en el disco. Git la ignora y no está en el repositorio. | baja | Pendiente de borrar con confirmación del dueño. |
| 18 | Secretos | Ni `.env*` ni `.vercel/` están en Git (están en `.gitignore`); el código no lee variables de entorno; no hay `vercel.json`. | — | Verificado. |
| 19 | Accesibilidad | El logo de Farley Systems ahora es un enlace: nombre accesible "Farley Systems en Instagram (se abre en una pestaña nueva)", `rel="noopener noreferrer"`, alto de 56/64 px como área táctil, opacidad al pasar el cursor y anillo de foco de 2 px con separación (comprobado con la tecla Tab). | — | Verificado. |
| 20 | Dependencias | Hay versiones más nuevas: Next 16.4, React 19.3, TypeScript 7 y ESLint 10. No se actualizaron (fuera de alcance; algunos son cambios mayores). | baja | P5. |

## PROPUESTAS PARA UNA SIGUIENTE FASE

Ninguna está implementada.

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

### P2 · `nueva` también limpia las referencias de las citas
- **Problema:** la frase de la demo de Aguamarina se copia con "Renata"
  como autora.
- **Por qué sirve / beneficio:** una invitación nueva sale sin errores
  falsos en `check`.
- **Archivos:** `scripts/new-invitation.mjs`.
- **Esfuerzo:** bajo.
- **Riesgos:** mínimos.
- **¿Ahora?:** sí, en la próxima sesión técnica.

### P3 · Un solo lugar para registrar un diseño
- **Problema:** agregar o renombrar un diseño exige tocar unos 12 archivos.
- **Por qué sirve / beneficio:** menos errores al crecer el catálogo.
- **Archivos:** `templates/registry.ts`, `demos.ts`, `previews.tsx`,
  `scripts/new-invitation.mjs` (que podría leer los ids del registro) y
  `scripts/placeholders.ts`.
- **Esfuerzo:** medio.
- **Riesgos:** las rutas de `app/plantillas/` deben seguir siendo estáticas
  y separadas por diseño (por las tipografías); no convertirlas en ruta
  dinámica.
- **¿Ahora?:** no. Solo si se van a agregar más diseños.

### P4 · Comprimir la música
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

### P6 · Pruebas automáticas dentro del repositorio
- **Problema:** las pruebas de desplazamiento lateral y de música viven
  fuera del repositorio, como scripts temporales.
- **Por qué sirve / beneficio:** repetir las verificaciones con un solo
  comando (`npm run verify`) antes de cada despliegue.
- **Archivos:** `scripts/verify/*.mjs` y `package.json`.
- **Esfuerzo:** medio.
- **Riesgos:** dependen de Chrome instalado. No convertirlo en una
  infraestructura grande.
- **¿Ahora?:** opcional; útil cuando haya clientes reales.

### P7 · Fecha legible también en el antetítulo de Tierra
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
