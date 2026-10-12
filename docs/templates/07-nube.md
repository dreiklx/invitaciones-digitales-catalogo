# Plantilla 07 · Nube (primer cumpleaños)

**Id en el config:** `template: "nube"` · **Demo:** `/plantillas/nube` ·
**Código:** `templates/nube/` · **Datos de ejemplo:** `templates/nube/demo.ts`

## Concepto
La invitación más alegre del catálogo (más festiva desde 2026-10-10): el
primer cumpleaños de un bebé (sirve también para otros cumpleaños
infantiles). Cielo celeste con nubes que flotan, **banderines de colores**,
racimos de globos, **estrellas que titilan** y **confeti que cae despacio**.
La **edad es la protagonista**: insignia amarilla con **su velita** (la
llama titila) sobre la foto circular, "¡Cumple 1 añito!". Todo es
redondeado y las secciones se unen con **bordes ondulados**; la cuenta
regresiva son **bloques de juguete** que botan muy suave. Festivo pero
ordenado: el color va en las formas, el texto siempre es oscuro, los
movimientos son lentos y cortos, todo queda quieto con "reducir
movimiento" y cada adorno vive dentro de una sección con `overflow-hidden`
(no crean ancho extra).

**Por qué esta paleta:** celeste cielo, amarillo sol y coral son alegres y
neutros (sirven para niño o niña) y no se parecen a ningún otro diseño.

## Paleta predeterminada (`templates/nube/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#fffcf5` | Crema |
| `surface` | `#e9f5fc` | Cielo muy claro: tarjetas, programa, regalos |
| `text` | `#2e3250` | Texto (siempre oscuro) y botones oscuros |
| `textMuted` | `#62668a` | Texto secundario |
| `primary` | `#7cc1e8` | Celeste cielo: portada, RSVP, lugar, banderines, opción elegida |
| `onPrimary` | `#16304a` | Texto sobre celeste (oscuro) |
| `secondary` | `#ffd35e` | Amarillo sol: insignia de edad, etiquetas, horas, pie, banderines |
| `accent` | `#ff8b69` | Coral: "Abrir invitación", "Confirmar asistencia", globos, velita |
| `onAccent` | `#2c1a12` | Texto sobre coral (oscuro) |
| `line` | `#dfe9ef` | Bordes |

Para una niña, por ejemplo: `colors: { primary: "#e7a9bd", onPrimary: "#3a1f2a" }`.
`onPrimary` y `onAccent` son **oscuros**: si se cambian los colores,
mantenerlos así (los fondos son claros).

## Tipografías
Fredoka (títulos, nombre, números) + Nunito (texto).

## Estructura (orden)
Portada (banderines, confeti, foto circular con la edad y su velita,
"¡Estás invitado a mi fiesta!", nombre, fecha, botón coral) → cielo con
banderines, globos, estrellas y confeti; foto, insignia, nombre, "¡Cumple
1 añito!", fecha → frase → **"Sobre mí"** (tarjeta con foto y
mensaje firmado por los papás) → papás y padrinos (tarjetas de color) →
**cuenta regresiva en bloques** + calendario → **programa** (`schedule`, la
hora en una píldora amarilla) → lugar (tarjeta celeste con nube) → detalles
(aviso + vestimenta) → galería en **burbujas** (rectángulos redondeados y
círculos cruzados) → regalos → RSVP sobre cielo con nubes → pie amarillo
con globos.

## Datos propios
- `honoree: { name: "Emma", age: 1, ageLabel: "1 añito" }` → "¡Cumple 1
  añito!" e insignia "1 AÑITO". Sin `ageLabel`: "1 año". Para meses:
  `age: 0, ageLabel: "6 meses"` (`ageLabel` debe empezar con el número;
  `npm run check` lo revisa).
- `event: { name: "primer cumpleaños", article: "el" }` → "Primer
  cumpleaños de Emma". Para otras edades: `"cumpleaños"`, `"fiesta de
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

**Demo — Emma** (`public/plantillas/nube/fotos/`, una sola sesión de
primer cumpleaños de stock de Pexels; fuentes en `photo-map.md`): globos
amarillos, turquesa y blancos y las letras "ONE" en un parque. Portada = en
su cajón con los globos; sobre mí = junto a los globos amarillos; galería =
con las letras y los globos, en el parque, sonriendo en el pasto y con las
letras en el puente rojo. Se evitaron las fotos con la silueta de Mickey
(marca registrada). Pexels describe a la bebé como niña: la demo se
llamaba "Mateo" y pasó a **Emma** (2026-10-11) por coherencia.

## En el teléfono
- La foto circular de la portada se achica según el alto de la pantalla
  para que nombre, edad, fecha y "Desliza hacia arriba" quepan sin desplazar.
- La insignia de edad queda sobre el borde de la foto, abajo a la derecha.
- Botones de lugar uno debajo del otro hasta 640 px.
- La galería en burbujas es la misma en todos los tamaños (dos columnas).

## Rasgos propios
- `Cloud`, `Balloon`, `CloudEdge` (borde ondulado; `id` único por uso),
  `Confetti`, `Bunting` (banderines, patrón que no se estira), `Star`,
  `Flame` (velita) y `FallingConfetti` en `templates/nube/ornaments.tsx`.
- Animaciones en `app/globals.css`: `.float-soft` (nubes, globos),
  `.twinkle` (estrellas), `.confetti-fall` (confeti, 9-12 s por pieza),
  `.bob` (bloques de la cuenta regresiva) y `.flicker` (llama). Todas se
  detienen con "reducir movimiento".

## Música y cita
- **Reproductor `globo`:** globo coral (con uno amarillo detrás) y su
  hilo, que flota al sonar; en escritorio, píldora con el título en Fredoka.
- **Demo:** Canción de cuna de Brahms en cajita musical (pdsounds.org,
  dominio público).
- **Citas:** frases de la familia; sin versículos matrimoniales.

## Uso
`npm run nueva -- nube` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- No usar texto de color claro: el diseño pone el color en las formas.
- Si se agregan más lugares, se muestran en dos columnas en escritorio.
