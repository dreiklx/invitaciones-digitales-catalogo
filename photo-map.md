# Photo Map

Cada diseño tiene sus propios espacios de foto, con proporción fija. La
tabla de cada uno (espacio, proporción, dónde aparece, recorte sugerido) está
en su guía: `docs/templates/01-olivo.md` … `05-borgona.md`. La fuente de
verdad en el código es `photoSlots` en `templates/<diseño>/meta.ts`; el
componente `templates/shared/Frame.tsx` aplica esa proporción, así que **lo
que dice la guía es exactamente lo que se ve, en teléfono y en escritorio**.

Resumen de cantidades: Olivo 9 · Tierra 8 · Gala 6 · Riviera 6 · Borgoña 5 ·
Aurora 7 · Nube 6.

## Dónde van los archivos
- Invitación de cliente: `public/images/` (nombres que indique
  `config/invitation.ts`; `npm run nueva` propone `portada.jpg`,
  `galeria-1.jpg`…).
- Demos del catálogo: `public/plantillas/<diseño>/`. **Olivo** usa fotos
  reales de una sesión de pareja (`public/plantillas/olivo/fotos/`, copias
  web; los originales quedan fuera del proyecto): `npm run placeholders`
  nunca toca una carpeta `fotos/`. **Tierra** usa una sesión de stock de
  una misma pareja (`public/plantillas/tierra/fotos/`; tabla abajo). El
  resto son imágenes
  abstractas generadas (`npm run placeholders`, `scripts/placeholders.ts`):
  luz desenfocada con el ambiente de cada diseño y una etiqueta
  "Foto · Espacio · proporción". No son fotos reales ni de ningún cliente.
  `npm run check` da error si una invitación de cliente las sigue usando.

## Reglas
- Respetar la orientación de cada espacio (las fotos se recortan con
  `object-fit: cover`). `npm run check` avisa si una foto horizontal va en
  un marco vertical o al revés, y si mide menos de 1000 px.
- Ajustar `position` (p. ej. `"50% 30%"`) a donde están los rostros,
  revisando primero en teléfono.
- Las demos usan imágenes abstractas salvo Olivo y Tierra: el encuadre
  con fotos reales está revisado en esos dos (280–1440 px); en los demás
  diseños **no está validado**. Revisarlo con las fotos de cada cliente a 320 y 390 px. Las
  proporciones y la orientación de cada espacio están en la guía de cada
  diseño (`docs/templates/`).
- Arcos, óvalos y círculos (Riviera, Aurora, Nube) recortan esquinas: sujeto al centro.
- Gala muestra todas las fotos en blanco y negro.
- Optimizar con `npm run optimize-images` (endereza por EXIF, lado largo
  máx. 2400 px). Guardar los originales aparte (`/img`, en `.gitignore`).
- Al reemplazar una foto ya publicada, usar un nombre nuevo (caché).
- `alt` descriptivo con los nombres reales.
- Nunca usar fotos de un cliente como demo de otro.

## Fotos de la demo de Tierra (stock)
Sesión de una misma pareja de Alexander Mass (Reborn Filmes) en Pexels,
bajo la licencia de Pexels (uso comercial y en plantillas permitido, sin
atribución obligatoria; https://www.pexels.com/license/). Copias recortadas
a la proporción de cada marco y optimizadas (76–206 KB).

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `abrazo-flores.jpg` | `portada` 4:5 | Abrazo mirando a cámara entre flores secas | pexels.com/photo/32195272 |
| `beso.jpg` | `historia` 3:4 | Beso entre la hierba | pexels.com/photo/32195266 |
| `abrazo-atardecer.jpg` | `retrato` 3:4 | Abrazo riendo al atardecer | pexels.com/photo/32195300 |
| `caminata.jpg` | `galeria1` 4:5 | Caminan de la mano colina arriba | pexels.com/photo/32195267 |
| `detalle-vestido.jpg` | `galeria2` 1:1 | Detalle del vestido y las manos | pexels.com/photo/32195287 |
| `lago.jpg` | `galeria3` 1:1 | Él la levanta junto al lago | pexels.com/photo/32195270 |
| `horizonte.jpg` | `galeria4` 16:9 | Siluetas en el horizonte al atardecer | pexels.com/photo/32195290 |
| `baile-atardecer.jpg` | `cierre` 3:2 | Se toman las manos al atardecer | pexels.com/photo/32195293 |
