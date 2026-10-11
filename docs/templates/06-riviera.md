# Plantilla 06 · Riviera (baby shower)

**Id en el config:** `template: "riviera"` · **Demo:** `/plantillas/riviera` ·
**Código:** `templates/riviera/` · **Datos de ejemplo:** `templates/riviera/demo.ts`

## Historia
Riviera nació como diseño de boda (2026-10-08, "mediterráneo"). El
2026-10-10 su lugar se convirtió en Arrullo (baby shower en crema y
salvia) y perdió su identidad. El **2026-10-11 se recuperó Riviera**
desde el historial de este repositorio (commit `6c9d245`, nunca del
historial privado de la boda original): `ornaments.tsx`, `fonts.ts` y
`Countdown.tsx` volvieron **idénticos**, `Template.tsx` y `Preview.tsx` se
restauraron desde ese commit y solo se adaptaron los textos y los nombres
al baby shower, y la paleta, las tipografías y el reproductor `sello` son
los originales. Arrullo dejó de existir (`/plantillas/arrullo` redirige
aquí); se conservaron su modelo de datos (`shower`) y sus fotos.

## Concepto
Mediterráneo, luminoso y elegante, en porcelana, azul cobalto y limón,
ahora para un **baby shower**. Las fotos van dentro de arcos, círculos y
postales; bandas de azulejo, un sol de limón que gira muy despacio, la
cuenta regresiva en "sellos" y los lugares como postales con sello.
**Nada supone el sexo del bebé** y **el nombre del bebé es opcional**.

## Quién invita (`shower` en el config)
```ts
shower: { parents: ["Natalia", "Joaquín"] },            // uno o dos nombres
shower: { parents: ["Sofía"], babyName: "Emilia" },     // con el nombre del bebé
```
- Sin `babyName`: la frase grande es `hero.title` ("Un bebé en camino") y
  debajo "Te invitan Natalia y Joaquín". La invitación se ve completa.
- Con `babyName`: el nombre del bebé va en grande, `hero.title` encima
  ("Celebremos la llegada de"), "Con cariño, …" y en el pie "Esperando a …".
- Título, vista previa al compartir, calendario y WhatsApp: "Baby shower de
  Natalia y Joaquín". El RSVP no pregunta "¿de parte de quién?".

## Paleta predeterminada (`templates/riviera/meta.ts`, la original)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#f8f6f0` | Porcelana |
| `surface` | `#e8eef6` | Azul muy pálido: secciones alternas, sellos |
| `text` | `#14264f` | Azul marino: texto y frase grande |
| `textMuted` | `#4b5b7d` | Texto secundario |
| `primary` | `#1f4fa3` | Cobalto: azulejos, botones, bloque RSVP, pie |
| `onPrimary` | `#f8f6f0` | Texto sobre cobalto |
| `secondary` | `#e8c440` | Limón: sol, botón "Confirmar" (sobre cobalto), barra flotante |
| `accent` | `#1f4fa3` | Igual al cobalto |
| `onAccent` | `#f8f6f0` | Texto sobre el acento |
| `line` | `#c8d3e5` | Bordes |

El cobalto no presupone el sexo del bebé: es la identidad del diseño. Una
familia puede cambiarlo con `colors`.

## Tipografías
Gloock (titulares con carácter) + DM Sans (texto).

## Estructura (orden)
Portada (bandas de azulejo, arco con foto y sol, frase o nombre del bebé,
quién invita, botón) → arco principal + frase + "Te invitan…" + fecha en
píldora → frase de apertura → **cuenta regresiva en sellos** + calendario
+ lugares como **postales** (sello con sol) → "Nuestra espera" en arco →
familia (futuros abuelos, padrinos) → "Para que lo sepas" (aviso cobalto
+ vestimenta) → galería (arco + 2 círculos + postal inclinada) → **RSVP
cobalto entre azulejos** → lista de regalos (enlace + SINPE) → frase de
cierre → pie cobalto con azulejos, sol y quién invita.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 3:4 vertical | Arco principal (la parte de arriba se redondea) | `50% 30%` |
| `historia` | 4:5 vertical | Arco de "Nuestra espera" | `50% 35%` |
| `galeria1` | 4:5 vertical | Galería, arco grande | `50% 35%` |
| `galeria2` | 1:1 | Galería, círculo superior | `50% 40%` |
| `galeria3` | 1:1 | Galería, círculo inferior | `50% 40%` |
| `galeria4` | 3:2 horizontal | Galería, postal con borde blanco | `50% 45%` |

En arcos y círculos se pierden las esquinas: el sujeto debe ir al centro.

**Demo — Natalia y Joaquín** (`public/plantillas/riviera/fotos/`, una sola
sesión de baby shower de Pexels, Larissa Teixeira Fotografia): la pareja
con la torta de ositos, un beso, la mesa dulce, ositos de azúcar, un oso
de peluche y la mesa de postres. Auditoría en `photo-map.md`.

## Rasgos propios
- `TileBand`, `Sun` y `Wave` en `templates/riviera/ornaments.tsx` (SVG,
  toman el color del texto; los originales).
- El sol gira en 60 s (`slow-spin`, se detiene con reducir movimiento).
- **Reproductor `sello`:** sello postal redondo con borde perforado que
  gira despacio al sonar y un punto limón; en escritorio, píldora con el
  título en Gloock.

## En el teléfono
- El arco de la portada se achica según el alto de la pantalla.
- La cuenta regresiva usa sellos en 2×2 y pasa a 4 en línea desde 640 px.
- Una sola postal de lugar se centra; dos van en dos columnas en escritorio.

## Música
- **Demo:** Gymnopédie n.º 1 (Satie · Robin Alciatore, dominio público;
  la misma pista que Tierra).

## Uso
`npm run nueva -- riviera` → editar `config/invitation.ts` (`parents` en
"REEMPLAZAR"; `babyName` solo si la familia quiere) → fotos → `npm run check`.

## Advertencias
- Si se cambia `secondary` (limón), elegir un color claro: el texto encima es `text` (azul marino).
- Los arcos recortan las esquinas superiores: evitar fotos con caras cerca de los bordes.
