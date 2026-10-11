# Plantilla 03 · Gala (boda)

**Id en el config:** `template: "gala"` · **Demo:** `/plantillas/gala` ·
**Código:** `templates/gala/` · **Datos de ejemplo:** `templates/gala/demo.ts`

## Concepto
Una noche de etiqueta en negro profundo, dorado y plata. Lleva monograma
con las iniciales, abanicos art déco, marcos dorados dobles, fecha en
números romanos, retratos en **blanco y negro** y un programa en línea de
tiempo. Todo va centrado y simétrico. Para bodas de noche, de salón, de
hotel o con etiqueta rigurosa.

## Paleta predeterminada (`templates/gala/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#0c0c0e` | Negro de fondo |
| `surface` | `#151518` | Secciones alternas |
| `text` | `#efeae0` | Marfil: texto y nombres |
| `textMuted` | `#a8a49b` | Texto secundario |
| `primary` | `#c9a45c` | Dorado: marcos, monograma (con brillo), botones, separadores |
| `onPrimary` | `#0c0c0e` | Texto sobre el dorado |
| `secondary` | `#bcc0c6` | Plata: etiquetas en versalitas |
| `accent` | `#c9a45c` | Igual al dorado |
| `onAccent` | `#0c0c0e` | Texto sobre el acento |
| `line` | `#3b3832` | Bordes oscuros |

Es el único diseño de fondo oscuro. Si se cambia `background`, mantenerlo muy oscuro.

## Tipografías
Bodoni Moda (didona de alto contraste) + Tenor Sans (versalitas y texto).

## Estructura (orden)
Portada (marco doble, abanico, monograma, nombres en mayúsculas, fecha
romana) → retrato B/N enmarcado + nombres + fecha romana y fecha normal →
cita con abanico → cuenta regresiva (cifras finas con ":" dorados) +
calendario + **programa** (cada lugar con hora, rombo y línea dorada) →
"Protocolo" (vestimenta y aviso en marcos dorados) → historia panorámica B/N
+ padres → retratos (2×2) → obsequios → R.S.V.P. en marco dorado → cita de
cierre → pie con monograma y fecha romana.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 3:4 vertical | Retrato principal con marco dorado | `50% 30%` |
| `historia` | 16:9 panorámica | Foto "de cine" de la historia | `50% 40%` |
| `galeria1`…`galeria4` | 3:4 vertical | Retratos en cuadrícula 2×2 (la columna derecha va desplazada) | `50% 35%` |

Todas se muestran en **blanco y negro** (filtro CSS); los archivos pueden ser a color.

**Demo con fotos reales** (`public/plantillas/gala/fotos/`, stock de
Pexels; fuentes y licencia en `photo-map.md`): una sola sesión de boda de
noche en un salón clásico con lámparas de araña, vestido de encaje y
esmoquin, que en blanco y negro acompaña el dorado art déco. Portada =
retrato con el ramo bajo la lámpara (formal); historia = abrazo entre
pétalos con los apliques a los lados (panorámica "de cine"); galería =
abrazo riendo, ella mira atrás bajo las lámparas, el baile junto a la
escalera y los dos mirando las fotos en el sofá (espontáneas). Ya vienen
recortadas a la proporción de cada marco.

## Rasgos propios
- Monograma con las iniciales (`names.initials`) y brillo dorado lento (`gold-sheen`, respeta reducir movimiento).
- Fecha en números romanos (`toRoman`) siempre acompañada de la fecha normal (para personas mayores).
- Programa en línea de tiempo: un bloque por cada lugar de `locations`.

## En el teléfono
- El retrato enmarcado de la portada se achica según el alto de la
  pantalla, para que nombres, fechas y "Desliza hacia abajo" quepan sin
  desplazar (también en 320×600).
- Nombres en dos líneas: "Isabella" / "& Sebastián". Desde 640 px el "&"
  va en su propia línea.
- En el visor, la foto se ve **a color**: el blanco y negro solo se aplica
  en la página.

## Música y cita
- **Reproductor `deco`:** rombo negro con doble filete dorado (art déco);
  al sonar, un rombo exterior late y "Música" brilla en dorado. En
  escritorio, marco dorado con "MÚSICA", título en cursiva y estado.
- **Demo:** Clair de lune (Debussy · Laurens Goedhart, dominio público).
- **Versículo:** bajo el abanico, texto en cursiva entre comillas latinas,
  la referencia entre filetes dorados y la traducción debajo. Demo:
  Mateo 19:6 (Reina-Valera 1909); la cita de cierre (Keats) sigue siendo
  literaria.

## Uso
`npm run nueva -- gala` → editar `config/invitation.ts` → fotos → `npm run check`.

## Advertencias
- Fotos en B/N fijas: si el cliente las quiere a color es un cambio de diseño (personalizada).
- El monograma usa la primera letra de cada nombre.
- Con fotos muy oscuras el B/N pierde detalle: preferir fotos con buena luz.
