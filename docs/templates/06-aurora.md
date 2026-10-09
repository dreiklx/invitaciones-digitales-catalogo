# Plantilla 06 · Aurora (quinceaños)

**Id en el config:** `template: "aurora"` · **Demo:** `/plantillas/aurora` ·
**Código:** `templates/aurora/` · **Datos de ejemplo:** `templates/aurora/demo.ts`

## Concepto
Un amanecer lila para una quinceañera: elegante y juvenil, sin coronas ni
brillos recargados. Luces suaves de color en el fondo (`.aurora-glow`),
destellos de cuatro puntas que titilan, el retrato dentro de un **espejo
ovalado** con un **"XV" gigante de contorno** detrás y el nombre en
**caligrafía**. La noche se cuenta como una **línea de tiempo** (misa,
vals, brindis, fiesta) y la galería termina en una **tira de fotos de
cabina**.

**Por qué esta paleta:** lila, violeta profundo y rosa cuarzo no se
parecen a ninguna de las bodas (verde, café, negro, cobalto, vino) y
evitan el rosa chicle típico de los quinceaños.

## Paleta predeterminada (`templates/aurora/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#faf7fd` | Fondo lila casi blanco |
| `surface` | `#f0e9f8` | Secciones alternas, tarjeta de padres |
| `text` | `#2a2140` | Texto principal |
| `textMuted` | `#665d80` | Texto secundario |
| `primary` | `#553a88` | Violeta: nombre, bloque de la cuenta regresiva, botones, pie |
| `onPrimary` | `#fbf8ff` | Texto sobre violeta |
| `secondary` | `#c8b4ea` | Lavanda: luces del fondo, destellos, filetes |
| `accent` | `#bf567c` | Rosa cuarzo: "Confirmar asistencia", etiquetas, avisos |
| `onAccent` | `#ffffff` | Texto sobre el rosa |
| `line` | `#e2d9f0` | Bordes de tarjetas |

## Tipografías
Italiana (títulos y "XV") + Pinyon Script (el nombre, clase `font-script`)
+ Figtree (texto, fechas y horas: los números de Italiana se leen mal).

## Estructura (orden)
Portada (luces, destellos, "XV" de contorno, "Mis XV años", nombre en
caligrafía, fecha, botón) → espejo ovalado con el retrato + nombre + fecha
→ frase → **"Mi mensaje"** (foto con tarjeta lavanda detrás y firma en
caligrafía) → padres y padrinos → **cuenta regresiva en cristales sobre
violeta** + calendario → **programa de la noche** (`schedule`, línea de
tiempo con destellos) → lugares (tarjetas con Maps/Waze) → detalles (aviso
+ vestimenta y color reservado) → galería (foto grande + **tira de cabina**
de 3 fotos) → regalos ("lluvia de sobres") → RSVP en tarjeta translúcida →
frase de cierre → foto horizontal → pie violeta con el "XV".

## Datos propios
- `honoree: { name: "Mariana", age: 15 }` (el "XV" sale de `age`).
- `event: { name: "fiesta de quince años", article: "la" }` → "Fiesta de
  quince años de Mariana" en el título, el calendario y WhatsApp.
- `schedule` opcional (sin él, la sección no aparece).
- El RSVP no pregunta "¿de parte de quién?" (un solo festejado), salvo que
  se den `rsvp.referrerOptions` (p. ej. ["Familia Rojas", "Familia Solano"]).

## Fotos (7) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 3:4 vertical | Espejo ovalado de la portada (se recortan las esquinas) | `50% 30%` |
| `historia` | 4:5 vertical | Junto a "Mi mensaje" | `50% 30%` |
| `galeria1` | 4:5 vertical | Galería, foto grande | `50% 30%` |
| `galeria2` | 4:3 horizontal | Tira de cabina, 1.ª | `50% 40%` |
| `galeria3` | 4:3 horizontal | Tira de cabina, 2.ª | `50% 40%` |
| `galeria4` | 4:3 horizontal | Tira de cabina, 3.ª | `50% 40%` |
| `cierre` | 3:2 horizontal | Antes del pie, esquinas redondeadas | `50% 40%` |

En el óvalo se pierden las esquinas: el rostro debe ir centrado.

## En el teléfono
- El óvalo de la portada se achica según el alto de la pantalla para que
  nombre, fecha y "Desliza hacia abajo" quepan sin desplazar.
- La tira de cabina va debajo de la foto grande, centrada e inclinada; en
  escritorio, al lado.
- Botones de lugar uno debajo del otro hasta 640 px (en dos columnas
  "Cómo llegar" se partía en dos líneas).

## Rasgos propios
- `Sparkle`, `SparkleField` y `SparkleRule` en `templates/aurora/ornaments.tsx`.
- `.aurora-glow`, `.xv-outline` y `.twinkle` en `app/globals.css` (los
  destellos se detienen con "reducir movimiento").

## Música y cita
- **Reproductor `destello`:** cristal lila translúcido con dos destellos
  que titilan al sonar y un halo rosa; el título en Figtree (los números
  de Italiana se leen mal).
- **Demo:** Vals op. 69 n.º 1 (Chopin, Musopen, CC0): un vals para la
  noche de los quince.
- **Citas:** frases de la quinceañera; sin versículos matrimoniales.

## Uso
`npm run nueva -- aurora` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- Nombres largos ("María Fernanda") ocupan dos líneas en caligrafía: se ve
  bien, pero conviene revisarlo a 320 px.
- Si se cambia `accent`, mantener contraste con texto blanco (el botón de
  confirmar es blanco sobre `accent`).
