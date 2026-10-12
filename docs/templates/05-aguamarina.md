# Plantilla 05 · Aguamarina (quinceaños)

**Id en el config:** `template: "aguamarina"` · **Demo:** `/plantillas/aguamarina` ·
**Código:** `templates/aguamarina/` · **Datos de ejemplo:** `templates/aguamarina/demo.ts`

**Nombre:** hasta el 2026-10-11 se llamaba **Camelia** (y antes, en su
lugar, estaba el diseño de boda Borgoña). El nombre visible y el id
interno son iguales: `aguamarina`. `/plantillas/camelia` y
`/plantillas/borgona` (y sus subrutas, como el calendario) redirigen de
forma permanente a `/plantillas/aguamarina` en un solo salto
(`next.config.ts`). Un `config/invitation.ts` viejo con
`template: "camelia"` ya no compila: cambiarlo a `"aguamarina"`.

## Concepto (rediseño del 2026-10-11)
Un quinceaños de joyería: azul petróleo profundo, perla, bruma aguamarina
y oro champán. Las fotos van en **marcos tallados como una esmeralda**
(esquinas biseladas con doble filete champán), una **tiara de línea fina**
corona la portada y el pie, el nombre va en **Cormorant cursiva** y los XV
entre filetes con rombos. Composición simétrica y con aire en el
teléfono; en escritorio, retrato y texto a dos columnas.

**Por qué se rediseñó** (comparada con Aurora en el navegador): la versión
anterior (vino frambuesa, nombre gigante en bloque, información en filas
de ficha, fotos en fucsia contra una pared de piedra) se sentía pesada y
plana. Aurora se ve más refinada por su simetría, su único marco
protagonista con doble filete, la luz suave de fondo, la letra delicada y
los adornos finos. La nueva versión toma esas **virtudes** (aire, un marco
protagonista, detalles finos) con una **identidad propia**: paleta de
joyería, marco tallado en vez de óvalo, tiara en vez de estrellas, letra
romana cursiva en vez de caligrafía, fondos azul petróleo con halo
aguamarina. No se parece a Aurora (lila), Gala (negro y dorado) ni Riviera
(cobalto y limón).

## Paleta predeterminada (`templates/aguamarina/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f7f6f1` | Perla: fondo de la página |
| `surface` | `#e6f0ed` | Bruma aguamarina: portada, programa, familia, galería |
| `text` | `#15302f` | Texto |
| `textMuted` | `#4f6967` | Texto secundario |
| `primary` | `#13505a` | Azul petróleo: portada inicial, cuenta regresiva, pie, botones, nombre |
| `onPrimary` | `#f7f6f1` | Texto sobre el azul petróleo |
| `secondary` | `#d4b880` | Oro champán: filetes de los marcos, tiara, XV, destellos |
| `accent` | `#2a8a84` | Aguamarina: antetítulos, halos de fondo |
| `onAccent` | `#08201f` | Texto sobre la aguamarina |
| `line` | `#cfe0dc` | Bordes |

## Tipografías
Cormorant Garamond (nombre, titulares en cursiva y cifras) + Jost (texto).

## Estructura (orden)
Portada "Abrir invitación" (azul petróleo con halo, marco fino, tiara,
nombre, XV, fecha y botón de filete champán) → portada: **retrato tallado**
+ tiara, "Mis XV años", nombre, XV, fecha y lugar → frase de apertura →
**cuenta regresiva en gemas talladas** + calendario → "Dónde celebraremos"
(tarjetas talladas por lugar) → **programa** (línea vertical con rombos) →
"Sobre mí" (foto tallada) → familia y **corte de honor** (hasta tres
columnas) → detalles (aviso en azul petróleo + vestimenta) → galería en dos
columnas que se cruzan → confirmación en una tarjeta tallada → regalos →
pie azul petróleo con tiara, nombre y XV.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 4:5 vertical | Portada, marco tallado con doble filete | `50% 25%` |
| `historia` | 4:5 vertical | Sobre mí, marco tallado | `50% 30%` |
| `galeria1` | 3:4 vertical | Galería, izquierda arriba | `50% 30%` |
| `galeria2` | 1:1 | Galería, derecha arriba | `50% 40%` |
| `galeria3` | 1:1 | Galería, izquierda abajo | `50% 40%` |
| `galeria4` | 3:4 vertical | Galería, derecha abajo | `50% 30%` |

Los marcos tallados recortan las esquinas: rostro lejos de los bordes.
Pedir al cliente: 4 verticales (retratos de cuerpo entero y medio cuerpo)
y 2 cuadradas (o verticales con el rostro al centro).

**Demo — Renata** (`public/plantillas/aguamarina/fotos/`, una sola sesión de
Pexels de Juliano Astc: vestido aguamarina y vestido blanco en un salón de
fiesta con lámparas de araña). Personas identificables (probablemente una
menor): ver la auditoría en `photo-map.md`.

## Rasgos propios
- `Gem` (marco tallado con `clip-path`; `gap` = aire entre los dos
  filetes), `Tiara`, `Sparkle` y `XvRule` en `templates/aguamarina/ornaments.tsx`.
- El nombre tiene tamaño solo en `vw` y baja un escalón si pasa de 8
  letras: no ensancha la página ni con la letra del sistema agrandada.
- Cuenta regresiva: cuatro gemas con filete champán; las cifras con tope
  en `vw`.
- **Reproductor `broche`:** gema tallada azul petróleo con filete champán y
  un destello que titila al sonar; en escritorio, estado, título en
  cursiva e intérprete.

## En el teléfono
- El ancho del retrato de la portada sale del alto de la pantalla: nombre,
  XV, fecha y "Desliza hacia arriba" caben sin desplazar.
- Programa: la hora a la izquierda de la línea (sin partirse), el momento
  a la derecha.

## Música y cita
- **Demo:** Clair de lune (Debussy · Laurens Goedhart, dominio público;
  la misma pista que Gala).
- Frase de apertura propia de la quinceañera (no un versículo).

## Uso
`npm run nueva -- aguamarina` → editar `config/invitation.ts` (nombre en
"REEMPLAZAR", edad, programa, corte de honor) → fotos → `npm run check`.

## Navegación
- Barra de secciones (`PageNav`, ver PROJECT-CONTEXT, "Navegación"): píldora azul petróleo con "Confirmar" champán.
  En escritorio, la misma paleta en la pastilla de arriba a la derecha.
- Las secciones llevan los `id` comunes (`historia`, `fecha`, `lugares`,
  `detalles`, `galeria`, `regalos`, `confirmar`, `programa`); el menú
  muestra solo las que existen según la configuración.
