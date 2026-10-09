# Plantilla 02 · Tierra

**Id en el config:** `template: "tierra"` · **Demo:** `/plantillas/tierra` ·
**Código:** `templates/tierra/` · **Datos de ejemplo:** `templates/tierra/demo.ts`

## Concepto
Una revista impresa en papel cálido, en café, arcilla y caramelo. Lleva
titulares gigantes alineados a la izquierda, capítulos numerados (I, II,
III), filetes finos, letra capital, fotos que se descubren como una cortina
y una galería en doble página. Sin sombras ni adornos. Para parejas
editoriales, de campo, de bodas al aire libre o en fincas.

## Paleta predeterminada (`templates/tierra/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f1e9de` | Papel de revista |
| `surface` | `#e6d8c6` | Bloques alternos (familia, detalles, recuadro de regalos) |
| `text` | `#2a1c13` | Texto y titulares |
| `textMuted` | `#6a5444` | Etiquetas y texto secundario |
| `primary` | `#4e3222` | Café espresso: bloque "El día", pie, botón de la portada, opciones elegidas |
| `onPrimary` | `#f4ece1` | Texto sobre el café |
| `secondary` | `#b68a5f` | Caramelo: comillas grandes, etiquetas de los lugares, "&" del pie |
| `accent` | `#9a4b2b` | Arcilla: "& nombre", letra capital, botón "Confirmar", avisos |
| `onAccent` | `#f8f0e7` | Texto sobre la arcilla |
| `line` | `#cfbca6` | Bordes |

## Tipografías
Fraunces (titulares; usa sus ejes `opsz` y `SOFT`) + Instrument Sans (texto).

## Estructura (orden)
Portada de revista (cabecera, nombres gigantes, foto pequeña, botón) →
portada de la invitación (cabecera, nombres, ficha Fecha/Lugar y foto
grande con "Desliza hacia abajo") → cita grande → **Capítulo I** historia
(foto + letra capital + cita) → familias en tres columnas → **El día**
(bloque café: fecha monumental, calendario, cuenta regresiva con filetes,
lugares en filas) → **Capítulo II** galería → **Capítulo III** detalles
(aviso + vestimenta) → regalos (recuadro) → RSVP con retrato (escritorio)
→ cita de cierre → foto de cierre → pie café con nombres gigantes.

## Fotos (8) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 4:5 vertical | Portada (también la miniatura de la portada inicial) | `50% 35%` |
| `historia` | 3:4 vertical | Capítulo I | `50% 35%` |
| `retrato` | 3:4 vertical | Junto al RSVP (**solo en escritorio**) | `50% 30%` |
| `galeria1` | 4:5 vertical | Galería, la grande | `50% 35%` |
| `galeria2` | 1:1 cuadrada | Galería, cuadrada izquierda | `50% 40%` |
| `galeria3` | 1:1 cuadrada | Galería, cuadrada derecha | `50% 40%` |
| `galeria4` | 16:9 panorámica | Galería, ancha | `50% 45%` |
| `cierre` | 3:2 horizontal | Antes del pie de página | `50% 40%` |

Pedir al cliente: 4 verticales, 2 cuadradas (o verticales con el sujeto centrado), 1 panorámica, 1 horizontal.

## Rasgos propios
- Titulares con `font-variation-settings` de Fraunces (suavidad y óptica).
- Revelado "cortina" en todas las fotos (`Reveal variant="curtain"`).
- Lugares en formato tabla (etiqueta y hora | nombre y dirección | botones).
- La cuenta regresiva usa abreviaturas en teléfono (min/seg) y palabras completas en escritorio.

## En el teléfono
- La foto de portada se alinea a la derecha y su ancho sale del alto de la
  pantalla, para que "Desliza hacia abajo" (sobre la foto) se vea sin
  desplazar. En teléfonos altos ocupa todo el ancho. En teléfonos bajos
  (320×568) la foto pasa el borde de la pantalla a propósito y la flecha
  sube a la mitad de la foto: con fotos reales, revisar que no tape el
  rostro (subir el rostro con `position`).
- Las fotos se descubren como una cortina; el recorte va en un elemento
  interno (ver "Teléfono primero" en `PROJECT-CONTEXT.md`).
- El retrato junto al RSVP solo se muestra en escritorio.

## Música y cita
- **Reproductor `ficha`:** ficha de revista de esquinas rectas con filete
  de arcilla arriba, ▶/❚❚ y tres barras de ecualizador que se mueven al
  sonar; en escritorio, "Pista · estado", título en cursiva e intérprete.
- **Demo:** Gymnopédie n.º 1 (Satie · Robin Alciatore, dominio público).
- **Versículo:** epígrafe de capítulo: la referencia y la traducción
  arriba sobre un filete, el texto grande en cursiva entre comillas
  latinas de color. Demo: Cantares 8:7 (Reina-Valera 1909). Las citas
  normales conservan la gran comilla de revista.

## Uso
`npm run nueva -- tierra` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- Los nombres van muy grandes: con nombres largos ("María Fernanda") conviene probar a 320 px.
- `story.caption` es un párrafo; la primera letra se vuelve capital, así que debe empezar con letra.
- La foto `retrato` no aparece en teléfono (se dejó así para no alargar el formulario).
