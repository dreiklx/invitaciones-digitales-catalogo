# Plantilla 08 · Riviera (aniversario y renovación de votos)

**Id en el config:** `template: "riviera"` · **Demo:** `/plantillas/riviera` ·
**Código:** `templates/riviera/` · **Datos de ejemplo:** `templates/riviera/demo.ts`

## Historia
- 2026-10-08: nace como diseño de boda ("mediterráneo").
- 2026-10-10: su lugar pasa a Arrullo (baby shower en crema y salvia) y
  pierde su identidad.
- 2026-10-11: se recupera desde el historial de este repositorio (commit
  `6c9d245`, nunca del historial privado de la boda original), como baby
  shower en el lugar de Arrullo.
- **2026-10-12:** el dueño pide que el baby shower vuelva a la paleta
  crema, salvia y mantequilla (vuelve **Arrullo**, guía 06, con la demo y
  las fotos del baby shower) **sin perder Riviera**. Riviera pasa a una
  categoría propia, **Aniversarios** (aniversario de bodas o renovación de
  votos), con el modelo de datos de pareja (`couple`) del diseño original.

Por qué aniversarios: la estética mediterránea (azulejos, limón, postales
de viaje) nació para una pareja; un aniversario se entiende sin
explicación en el catálogo, no compite con las tres bodas ni con los
bebés, y no obliga a cambiar nada del diseño. Es el número 08 para no
renumerar los demás. Paleta, tipografías, ornamentos, cuenta regresiva y
reproductor son los originales.

## Concepto
Mediterráneo, luminoso y elegante, en porcelana, azul cobalto y limón,
para celebrar **los años juntos**. Las fotos van dentro de arcos, círculos
y postales; bandas de azulejo, un sol de limón que gira muy despacio, la
cuenta regresiva en "sellos" y los lugares como postales con sello.

## Quién celebra (`couple` en el config, como las bodas)
```ts
event: { name: "renovación de votos", article: "la" },   // o
event: { name: "aniversario de bodas", article: "el" },
couple: { partnerOne: "Elena", partnerTwo: "Tomás" },
hero: { eyebrow: "Renovamos nuestros votos", title: "Diez años después" },
```
- Los nombres van en grande ("Elena & Tomás"); `hero.title` es opcional y
  va debajo ("Diez años después", "Bodas de plata").
- Título, vista previa al compartir, calendario y WhatsApp: "Renovación de
  votos de Elena y Tomás". El RSVP pregunta "¿de parte de quién?" con los
  dos nombres, como en las bodas.

## Paleta predeterminada (`templates/riviera/meta.ts`, la original)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f8f6f0` | Porcelana |
| `surface` | `#e8eef6` | Azul muy pálido: secciones alternas, sellos |
| `text` | `#14264f` | Azul marino: texto y nombres |
| `textMuted` | `#4b5b7d` | Texto secundario |
| `primary` | `#1f4fa3` | Cobalto: azulejos, botones, bloque RSVP, pie |
| `onPrimary` | `#f8f6f0` | Texto sobre cobalto |
| `secondary` | `#e8c440` | Limón: sol, botón "Confirmar" (sobre cobalto y en la barra de navegación) |
| `accent` | `#1f4fa3` | Igual al cobalto |
| `onAccent` | `#f8f6f0` | Texto sobre el acento |
| `line` | `#c8d3e5` | Bordes |

## Tipografías
Gloock (titulares con carácter) + DM Sans (texto).
Archivos locales en `fonts/gloock/`, `fonts/dm-sans/` (licencia OFL, `next/font/local` en `templates/riviera/fonts.ts`): el build no usa Google Fonts (PROJECT-CONTEXT, "Tipografías locales").

## Estructura (orden)
Portada (bandas de azulejo, arco con foto y sol, nombres, línea de
`hero.title`, fecha, botón) → arco principal + nombres + fecha en píldora
→ frase de apertura → **cuenta regresiva en sellos** + calendario + lugares
como **postales** (sello con sol) → historia en arco → familia (hijos,
padrinos…) → "Antes de venir" (aviso cobalto + vestimenta) → galería (arco
+ 2 círculos + postal inclinada) → **RSVP cobalto entre azulejos** →
regalos → frase de cierre → pie cobalto con azulejos, sol y los nombres.

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

**Demo — Elena y Tomás** (`public/plantillas/riviera/fotos/`): la sesión
de pareja en un olivar de Igor La Prado (Pexels) que Olivo usó el
2026-10-11 y que quedó en el historial (commit `f3569cf`) cuando Olivo
volvió a Don Ramón y Doña Florinda. No es una búsqueda nueva: son las
mismas fotos auditadas, recortadas a las proporciones de Riviera. Cuatro
son en blanco y negro (caminata, retrato, manos) y tres en color (portada,
historia, postal). Auditoría en `photo-map.md`.

## Rasgos propios
- `TileBand`, `Sun` y `Wave` en `templates/riviera/ornaments.tsx` (SVG,
  toman el color del texto; los originales).
- El sol gira en 60 s (`slow-spin`, se detiene con reducir movimiento).
- **Reproductor `sello`:** sello postal redondo con borde perforado que
  gira despacio al sonar y un punto limón; en escritorio, píldora con el
  título en Gloock.

## En el teléfono
- El arco de la portada se achica según el alto de la pantalla para que
  nombres, fecha y "Desliza hacia arriba" quepan en la primera pantalla.
- La cuenta regresiva usa sellos en 2×2 y pasa a 4 en línea desde 640 px.
- Una sola postal de lugar se centra; dos van en dos columnas en escritorio.

## Música
- **Demo:** Gymnopédie n.º 1 (Satie · Robin Alciatore, dominio público; la
  misma pista que Tierra y Arrullo).

## Uso
`npm run nueva -- riviera` → editar `config/invitation.ts` (nombres de la
pareja, evento, lugares…: todo lo que diga "REEMPLAZAR") → fotos →
`npm run check`.

## Advertencias
- Si se cambia `secondary` (limón), elegir un color claro: el texto encima es `text` (azul marino).
- Los arcos recortan las esquinas superiores: evitar fotos con caras cerca de los bordes.
- Los errores del formulario usan `red-100`/`red-300` sobre el cobalto (del
  diseño original); si se cambia `primary` a un tono rojizo, revisarlos.

## Navegación
- Barra de secciones (`PageNav`, ver PROJECT-CONTEXT, "Navegación"): píldora cobalto con "Confirmar" limón.
  En escritorio, la misma paleta en la pastilla de arriba a la derecha.
- Las secciones llevan los `id` comunes (`historia`, `fecha`, `lugares`,
  `detalles`, `galeria`, `regalos`, `confirmar`); el menú
  muestra solo las que existen según la configuración.
- "Inicio" lleva a la portada de esta invitación. Solo en la demo: "←
  Catálogo | Otros diseños" arriba a la izquierda y el bloque
  "Demostración" al final del menú ("Ver otros diseños", "Volver al
  catálogo"); la invitación de un cliente no los tiene.
