# Plantilla 01 · Olivo

**Id en el config:** `template: "olivo"` · **Demo:** `/plantillas/olivo` ·
**Código:** `templates/olivo/` · **Datos de ejemplo:** `templates/olivo/demo.ts`

## Concepto
Botánico, cálido y clásico. Es el diseño original de la plantilla, probado
en una boda real con invitados de todas las edades, en verde olivo y lino.
Portada de papel con una ramita de línea fina. La foto principal ocupa toda
la pantalla, hay un bloque verde con la cuenta regresiva y los lugares, y
una galería tipo collage con una foto inclinada. Para parejas que quieren
algo elegante, tradicional y cercano.

## Paleta predeterminada (`templates/olivo/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f7f2e8` | Papel/lino: fondo general, cajas de la cuenta regresiva |
| `surface` | `#eee6d4` | Secciones alternas (historia, detalles, galería) |
| `text` | `#262b1d` | Texto; también pie de página, botón de la portada, barra flotante |
| `textMuted` | `#575c48` | Texto secundario |
| `primary` | `#4a5432` | Verde olivo: bloque de cuenta regresiva/lugares y del RSVP, títulos |
| `onPrimary` | `#f7f2e8` | Texto sobre el verde |
| `secondary` | `#bfa26a` | Dorado: ornamentos, "Cómo llegar", opciones elegidas del RSVP |
| `accent` | `#a5643c` | Botón "Confirmar por WhatsApp", aviso importante, etiquetas |
| `onAccent` | `#fbf6ee` | Texto sobre el acento |
| `line` | `#dbd0b6` | Bordes finos |

Cambiar colores: `colors: { primary: "#5b6b3a" }` en `config/invitation.ts`.
Mantener texto claro sobre `primary`/`text` y oscuro sobre `background`.

## Tipografías
Playfair Display (títulos, nombres, cursivas) + Jost (texto). En `templates/olivo/fonts.ts`.

## Estructura (orden)
Portada (tarjeta de papel) → Hero a pantalla completa con nombres, fecha y
"Desliza hacia abajo" → frase de apertura → foto de la pareja + pie + cita
→ padres → **bloque verde**: cuenta regresiva en cajas + calendario + lugares
con Maps/Waze → "Antes de venir" (aviso + vestimenta) → regalos con foto →
**RSVP verde** → galería collage → frase de cierre → pie sobre foto al 30 %.
Barra flotante "Confirmar asistencia" y botón de música.

## Fotos (9) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 2:3 vertical | Pantalla completa. En teléfono se recorta a los lados; en escritorio se ve horizontal (recorte arriba/abajo): rostros en el tercio superior | `54% 10%` |
| `historia` | 3:2 horizontal | Foto de la pareja tras la frase de apertura | `50% 45%` |
| `cuentaRegresiva` | 2:3 vertical | Junto a la cuenta regresiva | `50% 28%` |
| `regalos` | **4:5** vertical | Sección de regalos (antes 2:3) | `50% 40%` |
| `galeria1` | 3:2 horizontal | Galería, arriba izquierda (la grande) | `50% 35%` |
| `galeria2` | 4:5 vertical | Galería, arriba derecha | `50% 30%` |
| `galeria3` | 4:5 vertical | Galería, abajo izquierda | `50% 22%` |
| `galeria4` | 3:2 horizontal | Galería, abajo derecha, inclinada −2,5° | `50% 35%` |
| `cierre` | 2:3 vertical | Fondo del pie de página, al 30 % de opacidad | `50% 25%` |

Pedir al cliente: 6 verticales (2:3 o 4:5) y 3 horizontales (3:2).

**Demo con fotos reales** (`public/plantillas/olivo/fotos/`), contada como
una sesión: portada = el abrazo; historia = la propuesta; cuenta regresiva
= ella enseña el anillo; regalos = la rosa lanzada; galería = sentados
felices, la rosa en el patio, el abrazo y el anillo celebrado; cierre = el
anillo (al 30 %). Son 7 fotos para 9 espacios: el abrazo y el anillo
vertical se repiten (galería y fondo del pie, donde menos se nota).

## Rasgos propios
- Hero a pantalla completa con degradado oscuro y sombra en el texto (legible sobre cualquier foto).
- Cuenta regresiva en cajas color papel con sombra difusa.
- Collage: horizontal + vertical desplazada; vertical + horizontal inclinada y superpuesta.
- Es la referencia de las reglas de usabilidad para personas mayores (ver `PROJECT-CONTEXT.md`).

## En el teléfono
- Portada: foto a pantalla completa con los nombres uno por línea, y
  "Desliza hacia abajo" siempre visible.
- Botones de lugar del mismo ancho: uno debajo del otro por debajo de
  400 px y en dos columnas a partir de ahí.
- Galería collage: igual que en escritorio, con fotos de 130–220 px de
  ancho. La foto 4 va inclinada; en ella no conviene un sujeto pegado a
  los bordes.

## Música y cita
- **Reproductor `rama`:** círculo verde olivo con una rama de olivo dorada
  que se mece mientras suena; en teléfono, con borde de lino (se ve sobre
  las secciones verdes). En escritorio, píldora de lino con el título en
  cursiva.
- **Demo:** Canon en re (Pachelbel · Kevin MacLeod, CC BY 3.0, con
  atribución en el pie).
- **Versículo** (`kind: "verse"`): entre filetes botánicos, comillas
  latinas, referencia en terracota y la traducción debajo. Demo:
  Colosenses 3:14 (Reina-Valera 1909). La frase de la historia y la de
  cierre siguen siendo citas literarias.

## Uso
`npm run nueva -- olivo` → editar `config/invitation.ts` → fotos en
`public/images/` con los nombres del archivo → `npm run check`.

La demo es **Ramón & Florinda** (los de las fotos): nombres, textos
alternativos, título, vista previa al compartir y calendario salen de
`templates/olivo/demo.ts`. `npm run nueva` no los copia (quedan en
"REEMPLAZAR") y `npm run check` marca error si un `alt` de un cliente
nombra a la pareja de la demo.

## Advertencias
- La portada a pantalla completa necesita una foto con espacio libre abajo (los nombres van encima).
- El pie usa la foto `cierre` muy tenue: casi cualquier foto sirve.
- `story` y `gifts` en `null` ocultan también sus fotos (el espacio debe existir igual en `photos`).
