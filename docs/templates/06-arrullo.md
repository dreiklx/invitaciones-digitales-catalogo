# Plantilla 06 · Arrullo (baby shower)

**Id en el config:** `template: "arrullo"` · **Demo:** `/plantillas/arrullo` ·
**Código:** `templates/arrullo/` · **Datos de ejemplo:** `templates/arrullo/demo.ts`

## Concepto
Baby shower delicado y cálido (2026-10-10; ocupa el lugar del antiguo
diseño de boda Riviera, del que conserva la papelería: fotos en arcos,
círculos y postales con sello). Crema, salvia y mantequilla; una **luna
con estrellas** que flota muy despacio (el "arrullo"), una guirnalda de
banderines y líneas de puntada. Pensado para cualquier familia: **nada
supone el sexo del bebé** (sin rosa/celeste por defecto, textos neutros) y
**el nombre del bebé es opcional**.

## Quién invita (`shower` en el config)
```ts
shower: { parents: ["Natalia", "Joaquín"] },            // uno o dos nombres
shower: { parents: ["Sofía"], babyName: "Emilia" },     // con el nombre del bebé
```
- Sin `babyName`: la frase grande de la portada es `hero.title` ("Un bebé
  en camino") y debajo "Te invitan Natalia y Joaquín".
- Con `babyName`: el nombre del bebé va en grande, `hero.title` encima
  como antetítulo ("Celebremos la llegada de") y "Con cariño, …".
- Título, vista previa al compartir, calendario y WhatsApp: "Baby shower de
  Natalia y Joaquín". El RSVP no pregunta "¿de parte de quién?".

## Paleta predeterminada (`templates/arrullo/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#fbf7f0` | Crema: fondo de la página |
| `surface` | `#eef0e5` | Salvia muy clara: cuenta regresiva, familia, detalles, pie |
| `text` | `#3f362e` | Cacao: texto |
| `textMuted` | `#74675a` | Texto secundario |
| `primary` | `#5f7859` | Salvia: botones, aviso, confirmación, filete del arco |
| `onPrimary` | `#fbf7f0` | Texto sobre la salvia |
| `secondary` | `#ecd49a` | Mantequilla: luna, botón de confirmar, círculo de la galería |
| `accent` | `#c4805f` | Arcilla rosada: banderines y puntadas |
| `onAccent` | `#fffaf5` | Texto sobre la arcilla |
| `line` | `#e1dbcc` | Bordes |

Para un tono distinto basta `colors` en el config (p. ej. `primary`).

## Tipografías
Gilda Display (titulares y cifras) + DM Sans (texto).

## Estructura (orden)
Portada "Abrir invitación" (guirnalda, arco con la luna, frase o nombre,
quién invita, fecha) → portada: arco grande con la luna → frase de apertura
→ **sellos de la cuenta regresiva** + calendario + **postales** de los
lugares (sello con la luna) → "Nuestra espera" (foto en arco) → familia
(futuros abuelos, padrinos) → detalles (aviso + vestimenta) → galería
(arco + dos círculos + postal) → **lista de regalos** (enlace + SINPE) →
confirmación sobre salvia → cita de cierre → pie con la luna y los nombres.

## Fotos (6) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 3:4 vertical | Portada, dentro del arco | `50% 30%` |
| `historia` | 4:5 vertical | Nuestra espera, dentro del arco | `50% 35%` |
| `galeria1` | 4:5 vertical | Galería, arco grande | `50% 35%` |
| `galeria2` | 1:1 | Galería, círculo de arriba (borde de puntada) | `50% 50%` |
| `galeria3` | 1:1 | Galería, círculo de abajo | `50% 40%` |
| `galeria4` | 3:2 horizontal | Galería, postal con sello | `50% 50%` |

Pedir al cliente: fotos de la pareja (o de quien espera), una ecografía o
detalles (ropa, decoración, la mesa) y una horizontal; los arcos y
círculos recortan esquinas: sujeto al centro.

**Demo — Natalia y Joaquín** (`public/plantillas/arrullo/fotos/`, una sola
sesión de baby shower de stock de Pexels; fuentes en `photo-map.md`):
portada = la pareja con la torta de ositos; nuestra espera = él le da un
beso; galería = la mesa dulce, ositos de azúcar, el oso de peluche y la
mesa de postres. Se descartaron las fotos de la sesión con el letrero
"Girl or Boy?".

## Rasgos propios
- `Garland`, `Moon` y `Stitch` en `templates/arrullo/ornaments.tsx` (SVG
  que toman el color del texto; la guirnalda es un patrón: no se estira).
- **Reproductor `sello`:** sello redondo con borde de puntada que gira al
  sonar y un punto mantequilla.

## Música
- **Demo:** Gymnopédie n.º 1 (Satie · Robin Alciatore, dominio público; la
  misma pista que Tierra).

## Uso
`npm run nueva -- arrullo` → editar `config/invitation.ts` (`parents` en
"REEMPLAZAR"; `babyName` solo si la familia quiere) → fotos → `npm run check`.
