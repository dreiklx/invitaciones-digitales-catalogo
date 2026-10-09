# Plantilla 05 · Borgoña

**Id en el config:** `template: "borgona"` · **Demo:** `/plantillas/borgona` ·
**Código:** `templates/borgona/` · **Datos de ejemplo:** `templates/borgona/demo.ts`

## Concepto
Contemporáneo, romántico y tipográfico, en vino, rosa empolvado y marfil.
Los nombres van monumentales en cursiva, con bloques de color a sangre.
La información se presenta en formato de **ficha** (filas con filetes, al
estilo suizo), la cuenta regresiva es un número gigante, el RSVP aparece
temprano y con mucha presencia, y casi no hay ornamentos. Para parejas
urbanas y modernas, bodas de cóctel o de galería.

**Por qué esta paleta:** es la única romántica y moderna a la vez. El vino
profundo con rosa empolvado no se parece a ninguna de las otras cuatro, y
la tipografía grande en cursiva la aleja del resto.

## Paleta predeterminada (`templates/borgona/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f7f0ea` | Marfil rosado |
| `surface` | `#efdcd6` | Rosa empolvado: cuenta regresiva, RSVP, regalos |
| `text` | `#2b1117` | Texto |
| `textMuted` | `#6f4c52` | Etiquetas de la ficha y texto secundario |
| `primary` | `#5c1a2b` | Vino: portada, hero, aviso, pie, botones |
| `onPrimary` | `#f7ebe6` | Texto sobre vino |
| `secondary` | `#e2b4b0` | Rosa: nombres sobre el vino, botón de la portada |
| `accent` | `#8f2337` | Rojo vino: etiquetas, errores, hover |
| `onAccent` | `#fbf2ee` | Texto sobre el acento |
| `line` | `#ddc6c0` | Bordes |

## Tipografías
Instrument Serif (cursiva protagonista) + Hanken Grotesk (texto, estilo suizo).

## Estructura (orden)
Portada (bloque vino a pantalla completa, nombres gigantes, fecha
abreviada, botón rosa) → hero: foto 4:5 + bloque vino con nombres (en
escritorio, dos columnas) → frase grande → **cuenta regresiva gigante**
(días enormes, resto en una línea) → **ficha** (Fecha + calendario / cada
lugar + Maps/Waze / Vestimenta) → aviso a pantalla completa en vino →
**RSVP** (título gigante "¿Vienes?") → historia (foto cuadrada + texto) →
padres → galería → regalos → frase de cierre → pie vino con nombres gigantes.

## Fotos (5) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 4:5 vertical | Hero (en teléfono arriba, a todo lo ancho) | `50% 30%` |
| `historia` | 1:1 cuadrada | Historia | `50% 40%` |
| `galeria1` | 3:4 vertical | Galería, izquierda | `50% 35%` |
| `galeria2` | 3:4 vertical | Galería, derecha (más abajo) | `50% 35%` |
| `galeria3` | 21:9 panorámica | Galería, ancho completo | `50% 45%` |

## Rasgos propios
- La sección de detalles no es una sección propia: la vestimenta va en la ficha y el aviso en un bloque vino a pantalla completa.
- `details.eyebrow`/`title` titulan la ficha (si `details` es `null`, dice "Información").
- El RSVP va antes de la historia y la galería, a propósito.

## En el teléfono
- Portada en una sola pantalla color vino: foto a la derecha (asimétrica,
  con ancho según el alto de la pantalla), nombres debajo, montados un
  poco sobre la foto, y fecha, lugar y "Desliza hacia abajo" al pie. En
  escritorio vuelve a ser mitad texto y mitad foto a sangre.
- La cuenta regresiva muestra horas, minutos y segundos en tres columnas
  iguales.

## Uso
`npm run nueva -- borgona` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- Nombres muy largos: el segundo nombre no se parte (va con "&" en una línea); probar a 320 px.
- `countdown.title` es una palabra corta ("Faltan"): el número va debajo en gigante.
