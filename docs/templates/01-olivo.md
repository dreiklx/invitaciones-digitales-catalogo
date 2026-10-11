# Plantilla 01 · Olivo (boda)

**Id en el config:** `template: "olivo"` · **Demo:** `/plantillas/olivo` ·
**Código:** `templates/olivo/` · **Datos de ejemplo:** `templates/olivo/demo.ts`

## Concepto
Rediseñado por completo el 2026-10-10 (del diseño botánico original solo
quedan los colores). Una revista de arquitectura en verde olivo y lino:
portada a dos columnas (bloque olivo | fotografía a toda la altura),
nombres en una columna tipográfica alineada a la izquierda con el segundo
en cursiva ("Elena / y Tomás"), la fecha como **ficha de tres cifras**
(día · mes · año, con su rótulo), díptico de fotos, cuenta regresiva en
franja, itinerario con línea de tiempo y un mosaico de fotos a sangre.
Sin sombras, sin tarjetas, casi sin filetes; el único adorno es una hoja
mínima junto a los antetítulos. Para parejas que buscan algo sereno,
natural y contemporáneo, no rústico.

## Paleta predeterminada (`templates/olivo/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f4efe4` | Lino: papel de la página y de la portada inicial |
| `surface` | `#e8e0cf` | Díptico de la historia, detalles y confirmación |
| `text` | `#23271c` | Texto y titulares |
| `textMuted` | `#5c5f4e` | Texto secundario |
| `primary` | `#4a5433` | Verde olivo: portada, cuenta regresiva, pie, botones |
| `onPrimary` | `#f4efe4` | Texto sobre el olivo |
| `secondary` | `#c8bd97` | Paja: segundo nombre, rótulos sobre olivo, botón de la barra |
| `accent` | `#8a5d36` | Coñac: antetítulos, aviso importante |
| `onAccent` | `#f8f3ea` | Texto sobre el coñac |
| `line` | `#d5cbb4` | Filetes |

## Tipografías
Newsreader (titulares, ligera y en cursiva) + Manrope (texto).

## Estructura (orden)
Portada "Abrir invitación" (lino, monograma, nombres en columna, ficha de
la fecha y botón olivo a todo el ancho) → **portada a dos columnas** →
cita o versículo (fuente a la izquierda como nota al margen, texto grande
en cursiva) → **díptico** de la historia (foto horizontal grande + retrato,
con el texto entre las dos) → familia (columnas numeradas I, II) →
**cuenta regresiva en franja** olivo + calendario → **itinerario** (hora |
línea de tiempo | lugar) → detalles (aviso con borde coñac + vestimenta) →
**mosaico** de fotos → regalos → confirmación → cita de cierre → pie olivo
con los nombres y la ficha de la fecha.

## Fotos (7) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 2:3 vertical | Columna derecha a toda la altura (en teléfono, arriba, con alto que sale de la pantalla) | `50% 25%` |
| `historia` | 3:2 horizontal | Díptico, foto grande | `50% 45%` |
| `retrato` | 4:5 vertical | Díptico, foto pequeña | `50% 35%` |
| `galeria1` | 2:3 vertical | Mosaico, columna izquierda (la alta) | `50% 30%` |
| `galeria2` | 4:5 vertical | Mosaico, arriba a la derecha | `50% 35%` |
| `galeria3` | 3:2 horizontal | Mosaico, abajo a la derecha | `50% 40%` |
| `galeria4` | 16:9 panorámica | Mosaico, a todo el ancho | `50% 35%` |

Pedir al cliente: 4 verticales, 2 horizontales y 1 panorámica (o
horizontal con aire arriba y abajo).

**Demo — Elena & Tomás** (pareja ficticia; `public/plantillas/olivo/fotos/`,
una sola sesión de Pexels en un olivar, de Igor La Prado, en color y en
blanco y negro): portada = recostados en el pasto; díptico = las manos con
el anillo + retrato de ella; mosaico = caminata por el olivar (alta), el
abrazo entre olivos, el vestido al viento y él la lleva en brazos
(panorámica). Hasta el 2026-10-10 la demo era "Ramón y Florinda" con
fotos sin procedencia verificable que reproducían personajes de una serie
de TV: se retiraron (ver la auditoría en `photo-map.md`). `npm run nueva`
no copia los nombres (quedan en "REEMPLAZAR") y `npm run check` marca
error si un texto de un cliente nombra a la pareja de la demo.

## Rasgos propios
- La fecha como ficha de tres cifras (`DateSheet`): portada inicial,
  portada y pie. Las cifras tienen tamaño solo en `vw` (no crecen con la
  letra del sistema).
- Itinerario con línea de tiempo: en escritorio la hora va en su columna;
  en teléfono, dentro del lugar (en una columna angosta se partía).
- Botones rectos (sin pastillas): olivo lleno para "Cómo llegar", borde
  fino para Waze.
- **Reproductor `lino`:** marcapáginas de tela olivo con ▶/❚❚ y tres barras
  que se mueven al sonar; en escritorio, estado, título en cursiva e
  intérprete.

## En el teléfono
- Portada: foto arriba (alto = pantalla − 25 rem, mínimo 11 rem) y el
  bloque olivo con nombres, ficha y "Desliza hacia abajo" visibles sin
  desplazar; en teléfonos bajos (`short:`) los nombres bajan un escalón.
- El díptico pone la cita y el retrato lado a lado (7/12 y 5/12).
- Mosaico igual que en escritorio, más compacto (separación de 8 px).

## Música y cita
- **Demo:** Canon en re mayor (Pachelbel · Kevin MacLeod, CC BY 3.0 con
  atribución en el pie).
- **Versículo:** nota al margen con la referencia y la traducción; el
  texto en cursiva grande entre comillas latinas. Demo: Colosenses 3:14
  (Reina-Valera 1909).

## Uso
`npm run nueva -- olivo` → editar `config/invitation.ts` → fotos en
`public/images/` con los nombres del archivo → `npm run check`.

## Advertencias
- La portada recorta la foto a lo alto en escritorio (columna de media
  pantalla): rostros en el tercio superior.
- Nombres muy largos bajan de tamaño solos (todo en `vw`), pero conviene
  revisarlos a 320 px.
- Las fotos de la demo son de stock con personas identificables: ver la
  auditoría en `photo-map.md`.
