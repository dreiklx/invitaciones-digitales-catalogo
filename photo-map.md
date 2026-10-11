# Photo Map

Cada diseño tiene sus propios espacios de foto, con proporción fija. La
tabla de cada uno (espacio, proporción, dónde aparece, recorte sugerido) está
en su guía: `docs/templates/01-olivo.md` … `07-nube.md`. La fuente de
verdad en el código es `photoSlots` en `templates/<diseño>/meta.ts`; el
componente `templates/shared/Frame.tsx` aplica esa proporción, así que **lo
que dice la guía es exactamente lo que se ve, en teléfono y en escritorio**.

Resumen de cantidades: Olivo 7 · Tierra 8 · Gala 6 · Aurora 7 · Camelia 5 ·
Arrullo 6 · Nube 6.

## Dónde van los archivos
- Invitación de cliente: `public/images/` (nombres que indique
  `config/invitation.ts`; `npm run nueva` propone `portada.jpg`,
  `galeria-1.jpg`…).
- Demos del catálogo: `public/plantillas/<diseño>/fotos/`, **todas con
  fotos reales**. **Olivo** usa las de una sesión de pareja aportada por el
  dueño (copias web; los originales quedan fuera del proyecto); las otras
  seis, una sesión de stock de Pexels cada una (tablas abajo).
  `npm run placeholders` (imágenes abstractas para un diseño nuevo) nunca
  toca una carpeta `fotos/`. `npm run check` da error si una invitación de
  cliente sigue usando una foto de `/plantillas/`.

## Reglas
- Respetar la orientación de cada espacio (las fotos se recortan con
  `object-fit: cover`). `npm run check` avisa si una foto horizontal va en
  un marco vertical o al revés, y si mide menos de 1000 px.
- Ajustar `position` (p. ej. `"50% 30%"`) a donde están los rostros,
  revisando primero en teléfono.
- El encuadre de las fotos de las siete demos está revisado (320–1920
  px). Con las fotos de cada cliente hay que revisarlo otra vez a 320 y
  390 px. Las
  proporciones y la orientación de cada espacio están en la guía de cada
  diseño (`docs/templates/`).
- Arcos, óvalos y círculos (Arrullo, Aurora, Nube, el "Sobre mí" de Camelia) recortan esquinas: sujeto al centro.
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

## Fotos de la demo de Gala (stock)
Sesión de boda de una misma pareja de Li Chunyu en Pexels (vestido de
encaje, esmoquin con pajarita, salón clásico con lámparas de araña,
apliques y pétalos), bajo la licencia de Pexels (mismas condiciones que
Tierra). Archivos a color: Gala los muestra en **blanco y negro** con un
filtro CSS. Recortadas a la proporción de cada marco (148–268 KB).

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `retrato-ramo.jpg` | `portada` 3:4 | Él le besa la mejilla; ramo y lámpara de araña | pexels.com/photo/39944197 |
| `abrazo-petalos.jpg` | `historia` 16:9 | Abrazo entre pétalos, apliques a los lados | pexels.com/photo/39944195 |
| `abrazo-risas.jpg` | `galeria1` 3:4 | Ella lo abraza riendo | pexels.com/photo/39944194 |
| `mirada-salon.jpg` | `galeria2` 3:4 | Ella mira atrás, de la mano, bajo las lámparas | pexels.com/photo/39944196 |
| `baile-escalera.jpg` | `galeria3` 3:4 | Bailan junto a la escalera, el velo al aire | pexels.com/photo/39944190 |
| `sofa-camara.jpg` | `galeria4` 3:4 | Miran juntos las fotos en el sofá | pexels.com/photo/39944198 |

## Demos de quince años y bebés (stock, 2026-10-10)
Una sola sesión por diseño, de Pexels, bajo la licencia de Pexels (uso
comercial y en plantillas permitido, sin atribución obligatoria; prohíbe
mostrar a las personas de forma ofensiva o insinuar que respaldan el
producto; https://www.pexels.com/license/). Recortadas a la proporción de
cada marco y optimizadas; los originales descargados quedaron fuera del
proyecto. No se generó ninguna imagen (no hay generador en este entorno).

**Aurora — Valentina** (quinceañera de vestido lila y tiara, jardín y casa)

| Archivo | Espacio | Original |
|---|---|---|
| `jardin-palmeras.jpg` | `portada` 3:4 | pexels.com/photo/31482011 |
| `retrato-vestido.jpg` | `historia` 4:5 | pexels.com/photo/31482016 |
| `casa-jardin.jpg` | `galeria1` 4:5 | pexels.com/photo/31482012 |
| `retrato-tiara.jpg` | `galeria2` 4:3 | pexels.com/photo/31482010 |
| `sobre-el-vestido.jpg` | `galeria3` 4:3 | pexels.com/photo/31482017 |
| `salon.jpg` | `galeria4` 4:3 | pexels.com/photo/31482023 |
| `con-sus-padres.jpg` | `cierre` 3:2 | pexels.com/photo/31482022 |

**Camelia — Renata** (quinceañera de vestido fucsia, globos rosa y plata)

| Archivo | Espacio | Original |
|---|---|---|
| `retrato-tiara.jpg` | `portada` 4:5 | pexels.com/photo/32274284 |
| `jardin.jpg` | `historia` 1:1 | pexels.com/photo/32274277 |
| `vestido-completo.jpg` | `galeria1` 3:4 | pexels.com/photo/32274276 |
| `mis-xv.jpg` | `galeria2` 3:4 | pexels.com/photo/32274275 |
| `con-sus-amigas.jpg` | `galeria3` 21:9 | pexels.com/photo/32274293 |

**Arrullo — Natalia y Joaquín** (baby shower en crema y blanco, ositos;
Larissa Teixeira Fotografia). Se descartaron las fotos de la sesión con el
letrero "Girl or Boy?" (no suponer el sexo del bebé).

| Archivo | Espacio | Original |
|---|---|---|
| `futuros-padres.jpg` | `portada` 3:4 | pexels.com/photo/29964272 |
| `beso-en-la-frente.jpg` | `historia` 4:5 | pexels.com/photo/29964268 |
| `mesa-dulce.jpg` | `galeria1` 4:5 | pexels.com/photo/29964260 |
| `ositos.jpg` | `galeria2` 1:1 | pexels.com/photo/29964258 |
| `oso-de-peluche.jpg` | `galeria3` 1:1 | pexels.com/photo/29964271 |
| `mesa-de-postres.jpg` | `galeria4` 3:2 | pexels.com/photo/29964257 |

**Nube — Mateo** (primer cumpleaños con globos y letras "ONE" en un
parque; Hasan Albari). Se evitaron las fotos con la silueta de Mickey.

| Archivo | Espacio | Original |
|---|---|---|
| `globos.jpg` | `portada` 1:1 | pexels.com/photo/1131497 |
| `globos-amarillos.jpg` | `historia` 4:5 | pexels.com/photo/1131489 |
| `letras-one.jpg` | `galeria1` 4:5 | pexels.com/photo/1131495 |
| `en-su-cajon.jpg` | `galeria2` 1:1 | pexels.com/photo/1131492 |
| `en-el-pasto.jpg` | `galeria3` 1:1 | pexels.com/photo/1131500 |
| `puente-rojo.jpg` | `galeria4` 4:5 | pexels.com/photo/1131490 |

**Olivo** conserva sus 7 fotos (Ramón y Florinda), ahora una por espacio
(ver `docs/templates/01-olivo.md`).
