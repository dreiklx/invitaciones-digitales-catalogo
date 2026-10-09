# Plantilla 04 · Riviera

**Id en el config:** `template: "riviera"` · **Demo:** `/plantillas/riviera` ·
**Código:** `templates/riviera/` · **Datos de ejemplo:** `templates/riviera/demo.ts`

## Concepto
Mediterráneo, luminoso y alegre sin perder la elegancia, en porcelana,
azul cobalto y limón. Las fotos van dentro de arcos, círculos y postales.
Hay bandas de azulejo, un sol de limón que gira muy despacio, la cuenta
regresiva en "sellos" y los lugares como postales. Para bodas de playa,
de día, de destino o al aire libre.

**Por qué esta paleta:** es la única fría y diurna del catálogo. Se
diferencia claramente del verde (Olivo), el café (Tierra), el negro
(Gala) y el vino (Borgoña).

## Paleta predeterminada (`templates/riviera/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f8f6f0` | Porcelana |
| `surface` | `#e8eef6` | Azul muy pálido: secciones alternas, sellos |
| `text` | `#14264f` | Azul marino: texto y nombres |
| `textMuted` | `#4b5b7d` | Texto secundario |
| `primary` | `#1f4fa3` | Cobalto: azulejos, botones, bloque RSVP, pie |
| `onPrimary` | `#f8f6f0` | Texto sobre cobalto |
| `secondary` | `#e8c440` | Limón: sol, botón "Confirmar" (sobre cobalto), barra flotante |
| `accent` | `#1f4fa3` | Igual al cobalto |
| `onAccent` | `#f8f6f0` | Texto sobre el acento |
| `line` | `#c8d3e5` | Bordes |

## Tipografías
Gloock (títulos con carácter) + DM Sans (texto).

## Estructura (orden)
Portada (bandas de azulejo, arco con foto y sol, nombres, botón) → arco
principal + nombres + fecha en píldora → frase → **cuenta regresiva en
sellos** + calendario + lugares como **postales** (sello con sol) →
historia en arco + texto → padres (recuadro redondeado) → "Antes de venir"
(aviso cobalto + vestimenta) → galería (arco + 2 círculos + postal
inclinada) → **RSVP cobalto entre azulejos** → regalos → frase de cierre →
pie cobalto con azulejos y sol.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 3:4 vertical | Arco principal (la parte de arriba se redondea) | `50% 30%` |
| `historia` | 4:5 vertical | Arco de la historia | `50% 35%` |
| `galeria1` | 4:5 vertical | Galería, arco grande | `50% 35%` |
| `galeria2` | 1:1 | Galería, círculo superior | `50% 40%` |
| `galeria3` | 1:1 | Galería, círculo inferior | `50% 40%` |
| `galeria4` | 3:2 horizontal | Galería, postal con borde blanco | `50% 45%` |

En arcos y círculos se pierden las esquinas: el sujeto debe ir al centro.

## Rasgos propios
- `TileBand`, `Sun` y `Wave` en `templates/riviera/ornaments.tsx` (SVG, toman el color del texto).
- El sol gira en 60 s (`slow-spin`, se detiene con reducir movimiento).
- Botón de confirmar en limón sobre cobalto: el más visible de los cinco diseños.

## En el teléfono
- El arco de la portada se achica según el alto de la pantalla; el sol
  queda un poco más pequeño.
- La cuenta regresiva usa sellos en 2×2 y pasa a 4 en línea desde 640 px.
- Postales de lugar con borde más fino y botones a todo lo ancho.

## Música y cita
- **Reproductor `sello`:** sello postal redondo con borde perforado que
  gira despacio al sonar y un punto limón; en escritorio, píldora con el
  título en la letra del diseño.
- **Demo:** Gymnopédie n.º 1 (Satie · Robin Alciatore, dominio público).
- **Citas:** frases de la pareja (sin versículo en la demo). Un versículo
  se muestra con su referencia y traducción.

## Uso
`npm run nueva -- riviera` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- Si se cambia `secondary` (limón), elegir un color claro: el texto encima es `text` (azul marino).
- Los arcos recortan las esquinas superiores: evitar fotos con caras cerca de los bordes.
