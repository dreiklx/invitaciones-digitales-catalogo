# Plantilla 07 · Nube (cumpleaños de bebé / infantil)

**Id en el config:** `template: "nube"` · **Demo:** `/plantillas/nube` ·
**Código:** `templates/nube/` · **Datos de ejemplo:** `templates/nube/demo.ts`

## Concepto
Tierno, limpio y moderno: un cielo celeste empolvado con nubes que flotan
despacio, globos de trazo suave y un poco de confeti. La **edad es la
protagonista** (insignia amarilla sobre la foto circular), todo es
redondeado y las secciones se unen con **bordes ondulados**. El color va en
las formas y el texto siempre es oscuro, así se lee bien y no satura. La
cuenta regresiva son **bloques de juguete** de colores suaves y el
programa de la fiesta va en tarjetas.

**Por qué esta paleta:** crema, celeste empolvado, amarillo mantequilla y
durazno son claros, neutros (sirven para niño o niña) y no se parecen a
ningún otro diseño del catálogo.

## Paleta predeterminada (`templates/nube/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#fffaf2` | Crema |
| `surface` | `#f6eee2` | Avena: tarjetas, programa, regalos |
| `text` | `#33354c` | Texto (siempre oscuro) y botones oscuros |
| `textMuted` | `#6c6d85` | Texto secundario |
| `primary` | `#86b1d3` | Celeste empolvado: cielo de la portada, RSVP, lugar, opción elegida |
| `onPrimary` | `#1d283d` | Texto sobre celeste (oscuro) |
| `secondary` | `#f6cc72` | Amarillo mantequilla: insignia de edad, etiquetas, horas, pie |
| `accent` | `#ef936f` | Durazno: "Abrir invitación", "Confirmar asistencia", globos |
| `onAccent` | `#2c1a12` | Texto sobre durazno (oscuro) |
| `line` | `#ebe0d0` | Bordes |

Para una niña, por ejemplo: `colors: { primary: "#e7a9bd", onPrimary: "#3a1f2a" }`.
`onPrimary` y `onAccent` son **oscuros**: si se cambian los colores,
mantenerlos así (los fondos son claros).

## Tipografías
Fredoka (títulos, nombre, números) + Nunito (texto).

## Estructura (orden)
Portada (cielo con nubes, foto circular con la edad, "¡Estás invitado!",
nombre, fecha, botón durazno) → cielo con foto, insignia de edad, nombre,
"Cumple 1 año", fecha → frase → **"Sobre mí"** (tarjeta con foto y
mensaje firmado por los papás) → papás y padrinos (tarjetas de color) →
**cuenta regresiva en bloques** + calendario → **programa** (`schedule`, la
hora en una píldora amarilla) → lugar (tarjeta celeste con nube) → detalles
(aviso + vestimenta) → galería en **burbujas** (rectángulos redondeados y
círculos cruzados) → regalos → RSVP sobre cielo con nubes → pie amarillo
con globos.

## Datos propios
- `honoree: { name: "Mateo", age: 1 }` → "Cumple 1 año" e insignia "1 AÑO".
  Para meses: `age: 0, ageLabel: "6 meses"` (`ageLabel` debe empezar con el
  número; `npm run check` lo revisa).
- `event: { name: "primer cumpleaños", article: "el" }` → "Primer
  cumpleaños de Mateo". Para otras edades: `"cumpleaños"`, `"fiesta de
  cumpleaños"`.
- `schedule` opcional; `closingQuote` suele ir en `null`.
- El RSVP no pregunta "¿de parte de quién?" salvo que se den `referrerOptions`.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 1:1 | Círculo de la portada (y de la entrada) | `50% 40%` |
| `historia` | 4:5 vertical | "Sobre mí" | `50% 35%` |
| `galeria1` | 4:5 vertical | Galería, arriba a la izquierda | `50% 35%` |
| `galeria2` | 1:1 | Galería, círculo arriba a la derecha | `50% 40%` |
| `galeria3` | 1:1 | Galería, círculo abajo a la izquierda | `50% 40%` |
| `galeria4` | 4:5 vertical | Galería, abajo a la derecha | `50% 35%` |

Los círculos recortan las esquinas: la carita al centro.

## En el teléfono
- La foto circular de la portada se achica según el alto de la pantalla
  para que nombre, edad, fecha y "Desliza hacia abajo" quepan sin desplazar.
- La insignia de edad queda sobre el borde de la foto, abajo a la derecha.
- Botones de lugar uno debajo del otro hasta 640 px.
- La galería en burbujas es la misma en todos los tamaños (dos columnas).

## Rasgos propios
- `Cloud`, `Balloon`, `CloudEdge` (borde ondulado; `id` único por uso) y
  `Confetti` en `templates/nube/ornaments.tsx`.
- `.float-soft` en `app/globals.css` (las nubes y los globos se detienen
  con "reducir movimiento").

## Uso
`npm run nueva -- nube` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- No usar texto de color claro: el diseño pone el color en las formas.
- Si se agregan más lugares, se muestran en dos columnas en escritorio.
